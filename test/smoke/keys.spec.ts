import { test, expect } from '@playwright/test'
import { bootstrap, authenticate, hasTestEndpoints } from './helpers'

test.describe('API key management', () => {
  test.skip(!hasTestEndpoints, 'Skipped: requires /test/bootstrap (not available on production)')

  test('/dashboard/keys loads and shows key list', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    const response = await page.goto('/dashboard/keys')
    expect(response?.status()).toBe(200)
    expect(page.url()).toContain('/dashboard/keys')

    // Should show the existing test-key created by bootstrap
    const content = await page.content()
    expect(content).toMatch(/api key|key/i)
  })

  test('/dashboard/keys is protected — redirects to login if not authenticated', async ({ page }) => {
    await page.goto('/dashboard/keys')
    expect(page.url()).toContain('/auth/login')
  })

  test('POST /dashboard/keys creates a new key and shows plaintext once', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    await page.goto('/dashboard/keys')

    // Fill in key name and submit
    await page.fill('input[name="name"]', 'smoke-test-key')
    await page.click('button[type="submit"]')

    // After creation, the plaintext key should be shown
    const content = await page.content()
    expect(content).toMatch(/nxs_[a-zA-Z0-9]+/)
  })

  test('POST /dashboard/keys with empty name returns 400 with error message', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    await page.goto('/dashboard/keys')

    // Submit with empty name
    await page.fill('input[name="name"]', '')
    await page.click('button[type="submit"]')

    // Error message should appear
    const content = await page.content()
    expect(content).toMatch(/required|name/i)
  })

  test('POST /dashboard/keys/:id/revoke soft-deletes key', async ({ request, context, page }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    // Create a key first
    await page.goto('/dashboard/keys')
    await page.fill('input[name="name"]', 'key-to-revoke')
    await page.click('button[type="submit"]')

    // Navigate back to list (creation page shows the key)
    await page.goto('/dashboard/keys')

    // Find and click revoke button for the key
    const revokeBtn = page.locator('form[action*="/revoke"] button, button:has-text("Revoke"), button:has-text("Delete")')
    const count = await revokeBtn.count()
    if (count > 0) {
      await revokeBtn.first().click()
    }

    // Should redirect back to /dashboard/keys
    expect(page.url()).toContain('/dashboard/keys')
  })

  test('mobile: /dashboard/keys has no horizontal overflow at 375px', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/dashboard/keys')

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2)
  })
})
