/**
 * Test-only helper endpoints — only mounted when ENVIRONMENT !== 'production'
 * Used by Playwright smoke tests to bootstrap users, sessions, and API keys.
 */
import { Hono } from 'hono'
import type { Env, HonoVariables } from '../types'
import { createSession } from '../lib/auth'
import { generateApiKey } from '../lib/apiKeys'

const test = new Hono<{ Bindings: Env; Variables: HonoVariables }>()

/**
 * POST /test/bootstrap
 * Creates a test user, session, and API key in one shot.
 * Body: { email?: string, plan?: 'free' | 'pro' }
 * Returns: { email, userId, sessionId, apiKey }
 */
test.post('/bootstrap', async (c) => {
  const body = await c.req.json().catch(() => ({})) as {
    email?: string
    plan?: 'free' | 'pro'
  }

  const email = body.email ?? `test-${crypto.randomUUID().slice(0, 8)}@nexus-test.local`
  const plan = body.plan ?? 'free'

  // Create or find user
  let user = await c.env.NEXUS_DB.prepare(
    'SELECT id FROM users WHERE email = ?'
  ).bind(email).first<{ id: string }>()

  let userId: string
  if (!user) {
    userId = crypto.randomUUID()
    await c.env.NEXUS_DB.prepare(
      "INSERT INTO users (id, email, created_at, plan) VALUES (?, ?, datetime('now'), 'free')"
    ).bind(userId, email).run()
  } else {
    userId = user.id
  }

  // Create Pro subscription if requested
  if (plan === 'pro') {
    const subId = crypto.randomUUID()
    await c.env.NEXUS_DB.prepare(`
      INSERT OR REPLACE INTO subscriptions (id, user_id, stripe_subscription_id, plan, status, current_period_end, created_at)
      VALUES (?, ?, ?, 'pro', 'active', datetime('now', '+30 days'), datetime('now'))
    `).bind(subId, userId, `sub_test_${subId.slice(0, 8)}`).run()
  }

  // Create session
  const sessionId = await createSession(c.env.NEXUS_KV, userId)

  // Create API key
  const { plaintext, hash, prefix } = await generateApiKey()
  const keyId = crypto.randomUUID()
  await c.env.NEXUS_DB.prepare(
    "INSERT INTO api_keys (id, user_id, key_hash, key_prefix, name, created_at) VALUES (?, ?, ?, ?, ?, datetime('now'))"
  ).bind(keyId, userId, hash, prefix, 'test-key').run()

  return c.json({ email, userId, sessionId, apiKey: plaintext })
})

/**
 * POST /test/set-trace-count
 * Sets the KV monthly trace count for a user (used to test plan limit enforcement).
 * Body: { userId, count }
 */
test.post('/set-trace-count', async (c) => {
  const body = await c.req.json() as { userId: string; count: number }
  const now = new Date()
  const key = `trace_count:${body.userId}:${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  await c.env.NEXUS_KV.put(key, String(body.count), { expirationTtl: 3600 })
  return c.json({ ok: true })
})

export default test
