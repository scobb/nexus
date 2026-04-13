import type { APIRequestContext, BrowserContext } from '@playwright/test'

export interface TestUser {
  email: string
  userId: string
  sessionId: string
  apiKey: string
}

/** Derive the cookie domain from the BASE_URL env var (or default to localhost). */
function cookieDomain(): string {
  const base = process.env.BASE_URL
  if (!base) return 'localhost'
  try {
    return new URL(base).hostname
  } catch {
    return 'localhost'
  }
}

/**
 * Bootstrap a test user via POST /test/bootstrap.
 * Returns {email, userId, sessionId, apiKey} for use in tests.
 */
export async function bootstrap(
  request: APIRequestContext,
  options?: { plan?: 'free' | 'pro'; email?: string }
): Promise<TestUser> {
  const response = await request.post('/test/bootstrap', {
    data: options ?? {},
  })
  if (!response.ok()) {
    throw new Error(`bootstrap failed: ${response.status()} ${await response.text()}`)
  }
  return response.json() as Promise<TestUser>
}

/**
 * Set the session cookie in a browser context so the page is authenticated.
 */
export async function authenticate(context: BrowserContext, sessionId: string): Promise<void> {
  const domain = cookieDomain()
  const isLocalhost = domain === 'localhost'
  await context.addCookies([
    {
      name: 'session',
      value: sessionId,
      domain,
      path: '/',
      httpOnly: true,
      secure: !isLocalhost,
      sameSite: 'Lax',
    },
  ])
}

/**
 * Set the KV trace count for a user to a given value (for testing plan limits).
 */
export async function setTraceCount(
  request: APIRequestContext,
  userId: string,
  count: number
): Promise<void> {
  const response = await request.post('/test/set-trace-count', {
    data: { userId, count },
  })
  if (!response.ok()) {
    throw new Error(`set-trace-count failed: ${response.status()} ${await response.text()}`)
  }
}

/** True when running against a remote URL (staging or prod), not localhost. */
export const isRemote = !!process.env.BASE_URL

/** True when /test/bootstrap is available (non-production environments). */
export const hasTestEndpoints = !process.env.SKIP_AUTH_TESTS && (
  !process.env.BASE_URL || process.env.BASE_URL.includes('staging')
)
