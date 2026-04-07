const PBKDF2_ITERATIONS = 100_000

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' }, key, 256)
  const hash = new Uint8Array(bits)
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('')
  const hashHex = Array.from(hash).map(b => b.toString(16).padStart(2, '0')).join('')
  return `${saltHex}:${hashHex}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(':')
  if (!saltHex || !hashHex) return false
  const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map(b => parseInt(b, 16)))
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' }, key, 256)
  const computed = Array.from(new Uint8Array(bits)).map(b => b.toString(16).padStart(2, '0')).join('')
  return computed === hashHex
}

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
