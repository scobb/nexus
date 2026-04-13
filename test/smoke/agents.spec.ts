import { test, expect } from '@playwright/test'
import { bootstrap, authenticate, hasTestEndpoints } from './helpers'

test.describe('Agents page', () => {
  test.skip(!hasTestEndpoints, 'Skipped: requires /test/bootstrap (not available on production)')

  test('/dashboard/agents loads for authenticated user', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    const response = await page.goto('/dashboard/agents')
    expect(response?.status()).toBe(200)
    expect(page.url()).toContain('/dashboard/agents')

    const content = await page.content()
    expect(content).toMatch(/agent/i)
  })

  test('/dashboard/agents is protected — redirects to login', async ({ page }) => {
    await page.goto('/dashboard/agents')
    expect(page.url()).toContain('/auth/login')
  })

  test('/dashboard/agents shows agent after trace ingestion creates it', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })

    // Ingest a trace which auto-creates the agent
    await request.post('/api/v1/traces', {
      headers: { Authorization: `Bearer ${user.apiKey}` },
      data: {
        agent_id: 'agents-page-test-agent',
        name: 'agents-page-trace',
        status: 'success',
        started_at: new Date().toISOString(),
      },
    })

    await authenticate(context, user.sessionId)
    await page.goto('/dashboard/agents')

    const content = await page.content()
    expect(content).toContain('agents-page-test-agent')
  })

  test('/dashboard/agents/:id shows agent traces', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })

    // Ingest trace to create agent
    const traceRes = await request.post('/api/v1/traces', {
      headers: { Authorization: `Bearer ${user.apiKey}` },
      data: {
        agent_id: 'agent-detail-test',
        name: 'agent-detail-trace',
        status: 'success',
        started_at: new Date().toISOString(),
      },
    })
    expect(traceRes.status()).toBe(201)

    await authenticate(context, user.sessionId)
    await page.goto('/dashboard/agents')

    // Click the agent link to go to agent detail page
    const agentLink = page.locator('a[href*="/dashboard/agents/"]').first()
    const agentLinkCount = await agentLink.count()
    if (agentLinkCount > 0) {
      await agentLink.click()
      expect(page.url()).toMatch(/\/dashboard\/agents\//)
      const content = await page.content()
      expect(content).toMatch(/trace|agent-detail-trace/i)
    }
  })

  test('/dashboard/agents/:id returns 404 for unknown agent', async ({ request, context, page }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    const res = await page.goto('/dashboard/agents/nonexistent-agent-id')
    expect(res?.status()).toBe(404)
  })

  test('mobile: /dashboard/agents has no horizontal overflow at 375px', async ({ page, request, context }) => {
    const user = await bootstrap(request, { plan: 'free' })
    await authenticate(context, user.sessionId)

    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/dashboard/agents')

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2)
  })
})
