export async function generateApiKey(): Promise<{ plaintext: string; hash: string; prefix: string }> {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
  const plaintext = `nxs_${hex}`
  const hash = await hashApiKey(plaintext)
  const prefix = plaintext.substring(0, 8) // "nxs_" + 4 hex chars
  return { plaintext, hash, prefix }
}

export async function hashApiKey(key: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(key)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}
