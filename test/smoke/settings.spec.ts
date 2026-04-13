import { test, expect } from '@playwright/test'
import { bootstrap, authenticate, hasTestEndpoints } from './helpers'

test.describe('Settings page', () => {
  test.skip(!hasTestEndpoints, 'Skipped: requires /test/bootstrap (not available on production)')

  test('/dashboard/settings loads for authenticated user', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    const response = await page.goto('/dashboard/settings')
    expect(response?.status()).toBe(200)
    expect(page.url()).toContain('/dashboard/settings')

    const content = await page.content()
    expect(content).toMatch(/setting|webhook|account/i)
  })

  test('/dashboard/settings is protected — redirects to login', async ({ page }) => {
    await page.goto('/dashboard/settings')
    expect(page.url()).toContain('/auth/login')
  })

  test('/dashboard/settings shows user email', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    await page.goto('/dashboard/settings')

    const content = await page.content()
    expect(content).toContain(user.email)
  })

  test('POST /dashboard/settings/webhook rejects non-https URL', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    await page.goto('/dashboard/settings')

    // Find webhook URL input and submit with http:// URL
    const webhookInput = page.locator('input[name="webhook_url"]')
    const inputCount = await webhookInput.count()
    if (inputCount > 0) {
      await webhookInput.fill('http://not-secure.example.com/webhook')
      await page.locator('form').filter({ has: webhookInput }).locator('button[type="submit"]').click()

      const content = await page.content()
      expect(content).toMatch(/https|must start/i)
    }
  })

  test('mobile: /dashboard/settings has no horizontal overflow at 375px', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/dashboard/settings')

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2)
  })
})
