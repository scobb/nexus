import { test, expect } from '@playwright/test'
import { bootstrap, authenticate } from './helpers'

test.describe('Billing page', () => {
  test('/dashboard/billing loads for Free user', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    const response = await page.goto('/dashboard/billing')
    expect(response?.status()).toBe(200)
    expect(page.url()).toContain('/dashboard/billing')

    // Free user should see upgrade CTA
    const content = await page.content()
    expect(content).toContain('Free')
    expect(content).toMatch(/upgrade|pro/i)
  })

  test('/dashboard/billing loads for Pro user', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'pro' })
    await authenticate(context, user.sessionId)

    const response = await page.goto('/dashboard/billing')
    expect(response?.status()).toBe(200)
    expect(page.url()).toContain('/dashboard/billing')

    // Pro user should see their plan status
    const content = await page.content()
    expect(content).toMatch(/pro|billing|manage/i)
  })

  test('/dashboard/billing is protected — redirects to login if not authenticated', async ({ page }) => {
    await page.goto('/dashboard/billing')
    expect(page.url()).toContain('/auth/login')
  })
})
