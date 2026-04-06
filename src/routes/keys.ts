import { Hono } from 'hono'
import type { Env, HonoVariables } from '../types'
import { generateApiKey } from '../lib/apiKeys'
import { keysPage, type ApiKeyRow } from '../pages/keys'

const router = new Hono<{ Bindings: Env; Variables: HonoVariables }>()

router.get('/', async (c) => {
  const userId = c.get('userId')
  const user = await c.env.NEXUS_DB.prepare(
    'SELECT email FROM users WHERE id = ?'
  ).bind(userId).first<{ email: string }>()

  const result = await c.env.NEXUS_DB.prepare(
    'SELECT id, name, key_prefix, created_at, last_used_at FROM api_keys WHERE user_id = ? AND deleted_at IS NULL ORDER BY created_at DESC'
  ).bind(userId).all<ApiKeyRow>()

  return c.html(keysPage(user?.email ?? '', result.results))
})

router.post('/', async (c) => {
  const userId = c.get('userId')
  const user = await c.env.NEXUS_DB.prepare(
    'SELECT email FROM users WHERE id = ?'
  ).bind(userId).first<{ email: string }>()

  const body = await c.req.parseBody()
  const name = (body['name'] as string | undefined)?.trim() ?? ''

  if (!name) {
    const result = await c.env.NEXUS_DB.prepare(
      'SELECT id, name, key_prefix, created_at, last_used_at FROM api_keys WHERE user_id = ? AND deleted_at IS NULL ORDER BY created_at DESC'
    ).bind(userId).all<ApiKeyRow>()
    return c.html(keysPage(user?.email ?? '', result.results, undefined, 'Key name is required'), 400)
  }

  const { plaintext, hash, prefix } = await generateApiKey()
  const id = crypto.randomUUID()

  await c.env.NEXUS_DB.prepare(
    "INSERT INTO api_keys (id, user_id, key_hash, key_prefix, name, created_at) VALUES (?, ?, ?, ?, ?, datetime('now'))"
  ).bind(id, userId, hash, prefix, name).run()

  const result = await c.env.NEXUS_DB.prepare(
    'SELECT id, name, key_prefix, created_at, last_used_at FROM api_keys WHERE user_id = ? AND deleted_at IS NULL ORDER BY created_at DESC'
  ).bind(userId).all<ApiKeyRow>()

  return c.html(keysPage(user?.email ?? '', result.results, { name, plaintext }))
})

// Form-based revocation (HTML forms only support GET/POST)
router.post('/:id/revoke', async (c) => {
  const userId = c.get('userId')
  const keyId = c.req.param('id')

  await c.env.NEXUS_DB.prepare(
    "UPDATE api_keys SET deleted_at = datetime('now') WHERE id = ? AND user_id = ?"
  ).bind(keyId, userId).run()

  return c.redirect('/dashboard/keys')
})

// REST DELETE for programmatic use
router.delete('/:id', async (c) => {
  const userId = c.get('userId')
  const keyId = c.req.param('id')

  await c.env.NEXUS_DB.prepare(
    "UPDATE api_keys SET deleted_at = datetime('now') WHERE id = ? AND user_id = ?"
  ).bind(keyId, userId).run()

  return c.json({ success: true })
})

export default router
