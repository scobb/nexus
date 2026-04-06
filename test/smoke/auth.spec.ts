import { test, expect } from '@playwright/test'
import { bootstrap, authenticate } from './helpers'

test.describe('Auth flow', () => {
  test('GET /auth/login returns 200 with login form', async ({ page }) => {
    const response = await page.goto('/auth/login')
    expect(response?.status()).toBe(200)

    // Should have an email input
    await expect(page.locator('input[type="email"]')).toBeVisible()
    // Should have a submit button
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('GET /dashboard redirects to /auth/login when not authenticated', async ({ page }) => {
    const response = await page.goto('/dashboard')
    // Should end up on the login page (either 200 after redirect or redirect status)
    const finalUrl = page.url()
    expect(finalUrl).toContain('/auth/login')
  })

  test('session cookie grants access to /dashboard', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    const response = await page.goto('/dashboard')
    expect(response?.status()).toBe(200)
    // Should NOT redirect to login
    expect(page.url()).toContain('/dashboard')
    expect(page.url()).not.toContain('/auth/login')
  })

  test('POST /auth/logout clears session and /dashboard redirects', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    // Confirm we're logged in
    await page.goto('/dashboard')
    expect(page.url()).toContain('/dashboard')

    // Log out via context.request (shares cookies with the browser context)
    await context.request.post('/auth/logout')

    // Now /dashboard should redirect to login (session deleted from KV)
    await page.goto('/dashboard')
    expect(page.url()).toContain('/auth/login')
  })

  test('GET /register redirects to /auth/login', async ({ page }) => {
    await page.goto('/register')
    expect(page.url()).toContain('/auth/login')
  })
})
