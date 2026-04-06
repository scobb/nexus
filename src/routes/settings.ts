import { Hono } from 'hono'
import { deleteCookie } from 'hono/cookie'
import type { Env, HonoVariables } from '../types'
import { settingsPage } from '../pages/settings'
import type { ApiKeyRow } from '../pages/keys'

const router = new Hono<{ Bindings: Env; Variables: HonoVariables }>()

async function fetchSettingsData(userId: string, db: D1Database) {
  const [userRow, planRow, keyRows] = await Promise.all([
    db.prepare('SELECT email FROM users WHERE id = ?').bind(userId).first<{ email: string }>(),
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
    keys: keyRows.results ?? [],
  }
}

router.get('/', async (c) => {
  const userId = c.get('userId')
  const { email, plan, keys } = await fetchSettingsData(userId, c.env.NEXUS_DB)
  return c.html(settingsPage({ email, plan, keys }))
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
