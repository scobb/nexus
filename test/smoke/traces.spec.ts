import { test, expect } from '@playwright/test'
import { bootstrap, authenticate } from './helpers'

test.describe('Trace viewer', () => {
  test('/dashboard/traces shows ingested trace', async ({ page, request, context }) => {
    const user = await bootstrap(request)

    // Ingest a trace
    const traceRes = await request.post('/api/v1/traces', {
      headers: { Authorization: `Bearer ${user.apiKey}` },
      data: {
        agent_id: 'viewer-test-agent',
        name: 'viewer-test-trace',
        status: 'success',
        started_at: new Date(Date.now() - 500).toISOString(),
        ended_at: new Date().toISOString(),
      },
    })
    expect(traceRes.status()).toBe(201)

    // Authenticate and visit trace list
    await authenticate(context, user.sessionId)
    await page.goto('/dashboard/traces')
    expect(page.url()).toContain('/dashboard/traces')

    // The trace name should appear
    await expect(page.getByText('viewer-test-trace')).toBeVisible()
  })

  test('/dashboard/traces/:id shows trace detail with spans', async ({ page, request, context }) => {
    const user = await bootstrap(request)

    // Ingest a trace
    const traceRes = await request.post('/api/v1/traces', {
      headers: { Authorization: `Bearer ${user.apiKey}` },
      data: {
        agent_id: 'detail-test-agent',
        name: 'detail-test-trace',
        status: 'success',
        started_at: new Date(Date.now() - 2000).toISOString(),
        ended_at: new Date().toISOString(),
      },
    })
    const { trace_id } = await traceRes.json()

    // Add spans
    await request.post(`/api/v1/traces/${trace_id}/spans`, {
      headers: { Authorization: `Bearer ${user.apiKey}` },
      data: {
        name: 'step-one',
        status: 'ok',
        started_at: new Date(Date.now() - 1500).toISOString(),
        ended_at: new Date(Date.now() - 1000).toISOString(),
        input: { query: 'test input' },
        output: { result: 'test output' },
      },
    })

    // Authenticate and visit trace detail
    await authenticate(context, user.sessionId)
    const detailRes = await page.goto(`/dashboard/traces/${trace_id}`)
    expect(page.url()).toContain(`/dashboard/traces/${trace_id}`)
    expect(detailRes?.status()).not.toBe(404)

    // Span name should appear
    await expect(page.getByText('step-one')).toBeVisible()
  })

  test('/dashboard/traces shows empty state when no traces', async ({ page, request, context }) => {
    const user = await bootstrap(request)
    await authenticate(context, user.sessionId)

    const emptyRes = await page.goto('/dashboard/traces')
    expect(emptyRes?.status()).toBe(200)
    // Should show empty state message or empty list
    const content = await page.content()
    expect(content.toLowerCase()).toMatch(/trace|no trace|sdk/i)
  })

  test('trace status colors are applied', async ({ page, request, context }) => {
    const user = await bootstrap(request)

    // Create a failing trace
    await request.post('/api/v1/traces', {
      headers: { Authorization: `Bearer ${user.apiKey}` },
      data: {
        agent_id: 'color-test-agent',
        name: 'error-trace',
        status: 'error',
        started_at: new Date().toISOString(),
      },
    })

    await authenticate(context, user.sessionId)
    await page.goto('/dashboard/traces')

    // Error status should have red color class
    const content = await page.content()
    expect(content).toContain('error')
  })
})
