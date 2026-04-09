import { Hono } from 'hono'
import type { Env, HonoVariables } from '../types'
import { billingPage } from '../pages/billing'

const billing = new Hono<{ Bindings: Env; Variables: HonoVariables }>()

async function stripePost(endpoint: string, params: Record<string, string>, secretKey: string): Promise<Record<string, unknown>> {
  const body = new URLSearchParams(params).toString()
  const res = await fetch(`https://api.stripe.com/v1/${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
  return res.json() as Promise<Record<string, unknown>>
}

billing.get('/', async (c) => {
  const userId = c.get('userId')
  const db = c.env.NEXUS_DB

  const [userRow, subRow, statsRow] = await Promise.all([
    db.prepare('SELECT email FROM users WHERE id = ?').bind(userId).first<{ email: string }>(),
    db.prepare(
      "SELECT plan, status, current_period_end, cancel_at FROM subscriptions WHERE user_id = ? AND status != 'canceled' ORDER BY rowid DESC LIMIT 1"
    ).bind(userId).first<{ plan: string; status: string; current_period_end: string; cancel_at: string | null }>(),
    db.prepare(
      "SELECT COUNT(*) as total FROM traces WHERE user_id = ? AND started_at >= strftime('%Y-%m-%dT%H:%M:%SZ','now','start of month')"
    ).bind(userId).first<{ total: number }>(),
  ])

  const plan: 'free' | 'pro' = subRow?.plan === 'pro' ? 'pro' : 'free'

  // Surface error from redirect (e.g. after failed Stripe call)
  const errorCode = c.req.query('error')
  let errorMessage: string | undefined
  if (errorCode === 'stripe_customer_failed') {
    errorMessage = 'Failed to create a Stripe customer. Please check that STRIPE_SECRET_KEY is correctly configured.'
  } else if (errorCode === 'stripe_session_failed') {
    errorMessage = 'Failed to create a Stripe Checkout session. Please check that STRIPE_PRICE_ID is set correctly.'
  } else if (errorCode === 'portal_failed') {
    errorMessage = 'Failed to open the billing portal. Please try again or contact support.'
  } else if (errorCode) {
    errorMessage = `An error occurred: ${errorCode}`
  }

  return c.html(billingPage({
    email: userRow?.email ?? '',
    plan,
    tracesThisMonth: statsRow?.total ?? 0,
    subscriptionStatus: subRow?.status ?? null,
    currentPeriodEnd: subRow?.current_period_end ?? null,
    cancelAt: subRow?.cancel_at ?? null,
    errorMessage,
  }))
})

billing.get('/success', async (c) => {
  const userId = c.get('userId')
  const db = c.env.NEXUS_DB

  const [userRow, subRow, statsRow] = await Promise.all([
    db.prepare('SELECT email FROM users WHERE id = ?').bind(userId).first<{ email: string }>(),
    db.prepare(
      "SELECT plan, status, current_period_end, cancel_at FROM subscriptions WHERE user_id = ? AND status != 'canceled' ORDER BY rowid DESC LIMIT 1"
    ).bind(userId).first<{ plan: string; status: string; current_period_end: string; cancel_at: string | null }>(),
    db.prepare(
      "SELECT COUNT(*) as total FROM traces WHERE user_id = ? AND started_at >= strftime('%Y-%m-%dT%H:%M:%SZ','now','start of month')"
    ).bind(userId).first<{ total: number }>(),
  ])

  const plan: 'free' | 'pro' = subRow?.plan === 'pro' ? 'pro' : 'free'

  return c.html(billingPage({
    email: userRow?.email ?? '',
    plan,
    tracesThisMonth: statsRow?.total ?? 0,
    subscriptionStatus: subRow?.status ?? null,
    currentPeriodEnd: subRow?.current_period_end ?? null,
    cancelAt: subRow?.cancel_at ?? null,
    successMessage: 'Welcome to Pro! Your subscription is now active.',
  }))
})

billing.post('/checkout', async (c) => {
  const userId = c.get('userId')
  const db = c.env.NEXUS_DB

  // Guard: STRIPE_SECRET_KEY must be set
  if (!c.env.STRIPE_SECRET_KEY) {
    console.error('Stripe checkout failed: STRIPE_SECRET_KEY is not set')
    return c.redirect('/dashboard/billing?error=stripe_customer_failed')
  }

  const userRow = await db.prepare(
    'SELECT email, stripe_customer_id FROM users WHERE id = ?'
  ).bind(userId).first<{ email: string; stripe_customer_id: string | null }>()

  if (!userRow) {
    return c.json({ error: 'User not found' }, 404)
  }

  let customerId = userRow.stripe_customer_id

  // Create Stripe customer if they don't have one
  if (!customerId) {
    const customer = await stripePost('customers', { email: userRow.email }, c.env.STRIPE_SECRET_KEY)
    if (typeof customer.id !== 'string') {
      console.error('Stripe customer creation failed:', JSON.stringify(customer))
      return c.redirect('/dashboard/billing?error=stripe_customer_failed')
    }
    customerId = customer.id
    await db.prepare(
      'UPDATE users SET stripe_customer_id = ? WHERE id = ?'
    ).bind(customerId, userId).run()
  }

  const origin = new URL(c.req.url).origin
  const session = await stripePost('checkout/sessions', {
    customer: customerId,
    mode: 'subscription',
    'line_items[0][price]': c.env.STRIPE_PRICE_ID,
    'line_items[0][quantity]': '1',
    allow_promotion_codes: 'true',
    success_url: `${origin}/dashboard/billing/success`,
    cancel_url: `${origin}/dashboard/billing`,
  }, c.env.STRIPE_SECRET_KEY)

  if (typeof session.url !== 'string') {
    console.error('Stripe checkout session creation failed:', JSON.stringify(session))
    return c.redirect('/dashboard/billing?error=stripe_session_failed')
  }

  return c.redirect(session.url as string)
})

billing.post('/portal', async (c) => {
  const userId = c.get('userId')
  const db = c.env.NEXUS_DB

  const userRow = await db.prepare(
    'SELECT stripe_customer_id FROM users WHERE id = ?'
  ).bind(userId).first<{ stripe_customer_id: string | null }>()

  if (!userRow?.stripe_customer_id) {
    return c.redirect('/dashboard/billing')
  }

  const origin = new URL(c.req.url).origin
  const portalSession = await stripePost('billing_portal/sessions', {
    customer: userRow.stripe_customer_id,
    return_url: `${origin}/dashboard/billing`,
  }, c.env.STRIPE_SECRET_KEY)

  if (typeof portalSession.url !== 'string') {
    return c.redirect('/dashboard/billing?error=portal_failed')
  }

  return c.redirect(portalSession.url as string)
})

export default billing
