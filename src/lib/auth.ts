const SESSION_TTL = 60 * 60 * 24 * 7 // 7 days
const MAGIC_TOKEN_TTL = 60 * 15 // 15 minutes
const RATE_LIMIT_WINDOW = 60 * 60 // 1 hour
const RATE_LIMIT_MAX = 5

export async function createMagicToken(kv: KVNamespace, email: string): Promise<string | null> {
  const rateKey = `rate:magic:${email}`
  const countStr = await kv.get(rateKey)
  const count = countStr ? parseInt(countStr) : 0

  if (count >= RATE_LIMIT_MAX) {
    return null
  }

  await kv.put(rateKey, String(count + 1), { expirationTtl: RATE_LIMIT_WINDOW })

  const token = crypto.randomUUID()
  await kv.put(`magic:${token}`, email, { expirationTtl: MAGIC_TOKEN_TTL })
  return token
}

export async function verifyMagicToken(kv: KVNamespace, token: string): Promise<string | null> {
  const email = await kv.get(`magic:${token}`)
  if (!email) return null
  await kv.delete(`magic:${token}`)
  return email
}

export async function createSession(kv: KVNamespace, userId: string): Promise<string> {
  const sessionId = crypto.randomUUID()
  await kv.put(`session:${sessionId}`, userId, { expirationTtl: SESSION_TTL })
  return sessionId
}

export async function getSessionUserId(kv: KVNamespace, sessionId: string): Promise<string | null> {
  return await kv.get(`session:${sessionId}`)
}

export async function deleteSession(kv: KVNamespace, sessionId: string): Promise<void> {
  await kv.delete(`session:${sessionId}`)
}
