import type { APIRequestContext, BrowserContext } from '@playwright/test'

export interface TestUser {
  email: string
  userId: string
  sessionId: string
  apiKey: string
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
  await context.addCookies([
    {
      name: 'session',
      value: sessionId,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      secure: false,
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
