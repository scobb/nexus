import { Hono } from 'hono'
import { deleteCookie } from 'hono/cookie'
import type { Env, HonoVariables } from '../types'
import { settingsPage } from '../pages/settings'
import type { ApiKeyRow } from '../pages/keys'
import { buildTestPayload } from '../lib/webhooks'

const router = new Hono<{ Bindings: Env; Variables: HonoVariables }>()

async function fetchSettingsData(userId: string, db: D1Database) {
  const [userRow, planRow, keyRows] = await Promise.all([
    db.prepare('SELECT email, webhook_url FROM users WHERE id = ?').bind(userId).first<{ email: string; webhook_url: string | null }>(),
    db.prepare(
      "SELECT plan FROM subscriptions WHERE user_id = ? AND status = 'active' ORDER BY created_at DESC LIMIT 1"
    ).bind(userId).first<{ plan: string }>(),
    db.prepare(
      'SELECT id, name, key_prefix, created_at, last_used_at FROM api_keys WHERE user_id = ? AND deleted_at IS NULL ORDER BY created_at DESC'
    ).bind(userId).all<ApiKeyRow>(),
  ])
  return {
    email: userRow?.email ?? '',
    plan: (planRow?.plan === 'pro' ? 'pro' : 'free') as 'free' | 'pro',
    webhookUrl: userRow?.webhook_url ?? null,
    keys: keyRows.results ?? [],
  }
}

router.get('/', async (c) => {
  const userId = c.get('userId')
  const { email, plan, keys, webhookUrl } = await fetchSettingsData(userId, c.env.NEXUS_DB)
  return c.html(settingsPage({ email, plan, keys, webhookUrl }))
})

// Save webhook URL
router.post('/webhook', async (c) => {
  const userId = c.get('userId')
  const db = c.env.NEXUS_DB

  const body = await c.req.parseBody()
  const rawUrl = ((body['webhook_url'] as string | undefined) ?? '').trim()

  // Allow blank to clear the webhook
  if (rawUrl !== '' && !rawUrl.startsWith('https://')) {
    const { email, plan, keys, webhookUrl } = await fetchSettingsData(userId, db)
    return c.html(settingsPage({
      email, plan, keys, webhookUrl,
      webhookError: 'Webhook URL must start with https://',
    }), 400)
  }

  const urlToStore = rawUrl === '' ? null : rawUrl
  await db.prepare('UPDATE users SET webhook_url = ? WHERE id = ?').bind(urlToStore, userId).run()

  const { email, plan, keys } = await fetchSettingsData(userId, db)
  return c.html(settingsPage({ email, plan, keys, webhookUrl: urlToStore, webhookSaved: true }))
})

// Send test webhook payload
router.post('/webhook/test', async (c) => {
  const userId = c.get('userId')
  const db = c.env.NEXUS_DB

  const { email, plan, keys, webhookUrl } = await fetchSettingsData(userId, db)

  if (!webhookUrl) {
    return c.html(settingsPage({
      email, plan, keys, webhookUrl,
      webhookTestError: 'No webhook URL configured. Save a URL first.',
    }), 400)
  }

  const payload = buildTestPayload()
  let testError: string | undefined

  try {
    const resp = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!resp.ok) {
      testError = `Webhook returned HTTP ${resp.status}. Check that the URL accepts POST requests with JSON bodies.`
    }
  } catch (err) {
    testError = `Failed to reach webhook URL: ${String(err)}`
  }

  return c.html(settingsPage({
    email, plan, keys, webhookUrl,
    webhookTestSent: !testError,
    webhookTestError: testError,
  }))
})

// Account deletion — HTML forms only support POST
router.post('/account/delete', async (c) => {
  const userId = c.get('userId')
  const db = c.env.NEXUS_DB

  const body = await c.req.parseBody()
  const confirm = (body['confirm'] as string | undefined)?.trim() ?? ''

  if (confirm !== 'delete my account') {
    const { email, plan, keys } = await fetchSettingsData(userId, db)
    return c.html(settingsPage({ email, plan, keys, deleteError: "Type 'delete my account' exactly to confirm." }), 400)
  }

  // Cancel active Stripe subscription if present
  const subRow = await db.prepare(
    "SELECT stripe_subscription_id FROM subscriptions WHERE user_id = ? AND status = 'active' LIMIT 1"
  ).bind(userId).first<{ stripe_subscription_id: string }>()

  if (subRow?.stripe_subscription_id) {
    try {
      await fetch(`https://api.stripe.com/v1/subscriptions/${subRow.stripe_subscription_id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${c.env.STRIPE_SECRET_KEY}` },
      })
    } catch {
      // Non-fatal — proceed with deletion even if Stripe cancel fails
    }
  }

  // Delete user (cascades to api_keys, agents, traces, spans, subscriptions)
  await db.prepare('DELETE FROM users WHERE id = ?').bind(userId).run()

  // Clear session cookie
  deleteCookie(c, 'session', { path: '/' })

  return c.redirect('/?deleted=1')
})

export default router
