import { Hono } from 'hono'
import type { Env, HonoVariables } from '../types'

const webhooks = new Hono<{ Bindings: Env; Variables: HonoVariables }>()

async function verifyStripeSignature(
  rawBody: string,
  sigHeader: string,
  secret: string,
): Promise<boolean> {
  const parts = sigHeader.split(',')
  const tPart = parts.find(p => p.startsWith('t='))
  const v1Parts = parts.filter(p => p.startsWith('v1='))

  if (!tPart || v1Parts.length === 0) return false

  const timestamp = tPart.slice(2)
  const payload = `${timestamp}.${rawBody}`

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  const expectedHex = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  return v1Parts.some(p => p.slice(3) === expectedHex)
}

function unixToDatetime(ts: number): string {
  return new Date(ts * 1000).toISOString().replace('T', ' ').replace(/\.\d+Z$/, '')
}

webhooks.post('/stripe', async (c) => {
  const sigHeader = c.req.header('stripe-signature')
  if (!sigHeader) {
    return c.json({ error: 'Missing Stripe-Signature' }, 400)
  }

  // Read raw body for signature verification
  const rawBody = await c.req.text()

  const valid = await verifyStripeSignature(rawBody, sigHeader, c.env.STRIPE_WEBHOOK_SECRET)
  if (!valid) {
    return c.json({ error: 'Invalid signature' }, 400)
  }

  let event: Record<string, unknown>
  try {
    event = JSON.parse(rawBody) as Record<string, unknown>
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400)
  }

  const eventType = event.type as string
  const sub = (event.data as Record<string, unknown>)?.object as Record<string, unknown> | undefined

  if (!sub) {
    return c.json({ received: true })
  }

  const db = c.env.NEXUS_DB

  if (eventType === 'customer.subscription.created' || eventType === 'customer.subscription.updated') {
    const customerId = sub.customer as string
    const subscriptionId = sub.id as string
    const status = sub.status as string
    const periodEnd = sub.current_period_end ? unixToDatetime(sub.current_period_end as number) : null
    const cancelAt = sub.cancel_at ? unixToDatetime(sub.cancel_at as number) : null
    const plan = status === 'active' || status === 'trialing' ? 'pro' : 'free'

    // Find user by stripe_customer_id
    const userRow = await db.prepare(
      'SELECT id FROM users WHERE stripe_customer_id = ?'
    ).bind(customerId).first<{ id: string }>()

    if (!userRow) {
      console.error(`Stripe webhook: no user found for customer ${customerId}`)
      return c.json({ received: true })
    }

    const userId = userRow.id

    // Upsert subscription record
    await db.prepare(`
      INSERT INTO subscriptions (id, user_id, stripe_subscription_id, plan, status, current_period_end, cancel_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(stripe_subscription_id) DO UPDATE SET
        plan = excluded.plan,
        status = excluded.status,
        current_period_end = excluded.current_period_end,
        cancel_at = excluded.cancel_at
    `).bind(crypto.randomUUID(), userId, subscriptionId, plan, status, periodEnd, cancelAt).run()

    // Update user's plan
    await db.prepare(
      'UPDATE users SET plan = ? WHERE id = ?'
    ).bind(plan, userId).run()
  }

  if (eventType === 'customer.subscription.deleted') {
    const subscriptionId = sub.id as string

    // Find subscription record
    const subRow = await db.prepare(
      'SELECT user_id FROM subscriptions WHERE stripe_subscription_id = ?'
    ).bind(subscriptionId).first<{ user_id: string }>()

    if (subRow) {
      // Update subscription status
      await db.prepare(
        "UPDATE subscriptions SET status = 'canceled', plan = 'free' WHERE stripe_subscription_id = ?"
      ).bind(subscriptionId).run()

      // Downgrade user to free
      await db.prepare(
        "UPDATE users SET plan = 'free' WHERE id = ?"
      ).bind(subRow.user_id).run()
    }
  }

  return c.json({ received: true })
})

export default webhooks
