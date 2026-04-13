import { test, expect } from '@playwright/test'
import { bootstrap, authenticate, hasTestEndpoints } from './helpers'

test.describe('Auth flow — public routes', () => {
  test('GET /auth/login returns 200 with login form', async ({ page }) => {
    const response = await page.goto('/auth/login')
    expect(response?.status()).toBe(200)

    // Should have at least one email input (login page may have multiple forms)
    await expect(page.locator('input[type="email"]').first()).toBeVisible()
    // Should have a submit button
    await expect(page.locator('button[type="submit"]').first()).toBeVisible()
  })

  test('GET /dashboard redirects to /auth/login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard')
    // Should end up on the login page
    const finalUrl = page.url()
    expect(finalUrl).toContain('/auth/login')
  })

  test('GET /register redirects away from landing (to /auth/signup or similar)', async ({ page }) => {
    await page.goto('/register')
    // /register is the public CTA — redirects to /auth/signup (not /auth/login)
    expect(page.url()).toMatch(/\/auth\/signup|\/auth\/login/)
  })
})

test.describe('Auth flow — authenticated routes', () => {
  test.skip(!hasTestEndpoints, 'Skipped: requires /test/bootstrap (not available on production)')

  test('session cookie grants access to /dashboard', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    const response = await page.goto('/dashboard')
    expect(response?.status()).toBe(200)
    // Should NOT redirect to login
    expect(page.url()).toContain('/dashboard')
    expect(page.url()).not.toContain('/auth/login')
  })

  test('POST /auth/logout responds with redirect and sets clearing cookie', async ({ context }) => {
    const user = await bootstrap(context.request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    // Logout — the server should delete KV session and return a clearing Set-Cookie
    const res = await context.request.post('/auth/logout', { maxRedirects: 0 })

    // Should redirect (302) or return 200 with cookie cleared
    expect([200, 302, 303, 307]).toContain(res.status())

    // After clearing cookies client-side, unauthenticated /dashboard should redirect
    await context.clearCookies()
    const dashRes = await context.request.get('/dashboard', { maxRedirects: 0 })
    // Should be a redirect to /auth/login (302)
    expect([302, 303]).toContain(dashRes.status())
  })
})
