import { createMiddleware } from 'hono/factory'
import type { Env, HonoVariables } from '../types'
import { hashApiKey } from '../lib/apiKeys'

export const apiKeyAuth = createMiddleware<{ Bindings: Env; Variables: HonoVariables }>(async (c, next) => {
  const authorization = c.req.header('Authorization')
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return c.json({ error: 'Invalid API key' }, 401)
  }

  const key = authorization.slice(7).trim()
  if (!key) {
    return c.json({ error: 'Invalid API key' }, 401)
  }

  const hash = await hashApiKey(key)

  const apiKey = await c.env.NEXUS_DB.prepare(
    'SELECT id, user_id FROM api_keys WHERE key_hash = ? AND deleted_at IS NULL'
  ).bind(hash).first<{ id: string; user_id: string }>()

  if (!apiKey) {
    return c.json({ error: 'Invalid API key' }, 401)
  }

  // Update last_used_at asynchronously
  await c.env.NEXUS_DB.prepare(
    "UPDATE api_keys SET last_used_at = datetime('now') WHERE id = ?"
  ).bind(apiKey.id).run()

  c.set('userId', apiKey.user_id)
  await next()
})
