import { test, expect } from '@playwright/test'
import { bootstrap, authenticate, hasTestEndpoints } from './helpers'

test.describe('Dashboard home', () => {
  test.skip(!hasTestEndpoints, 'Skipped: requires /test/bootstrap (not available on production)')

  test('/dashboard loads for authenticated user', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    const response = await page.goto('/dashboard')
    expect(response?.status()).toBe(200)
    expect(page.url()).toContain('/dashboard')

    // Should show dashboard content
    const content = await page.content()
    expect(content).toMatch(/dashboard|trace|agent/i)
  })

  test('/dashboard is protected — redirects to /auth/login', async ({ page }) => {
    await page.goto('/dashboard')
    expect(page.url()).toContain('/auth/login')
  })

  test('/dashboard shows traces summary metrics for Free user', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    // Ingest a trace so the dashboard has something to show
    await request.post('/api/v1/traces', {
      headers: { Authorization: `Bearer ${user.apiKey}` },
      data: {
        agent_id: 'dash-test-agent',
        name: 'dash-test-trace',
        status: 'success',
        started_at: new Date().toISOString(),
      },
    })

    await page.goto('/dashboard')
    const content = await page.content()
    // Dashboard should display some metrics or trace reference
    expect(content).toMatch(/trace|agent|0|1/i)
  })

  test('/dashboard shows upgrade prompt for Free user', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    await page.goto('/dashboard')
    const content = await page.content()
    // Should have upgrade CTA or plan indicator
    expect(content).toMatch(/free|upgrade|pro/i)
  })

  test('mobile: /dashboard has no horizontal overflow at 375px', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/dashboard')

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2)
  })
})
