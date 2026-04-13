import { test, expect } from '@playwright/test'
import { bootstrap, setTraceCount, hasTestEndpoints } from './helpers'

test.describe('Trace ingestion API — public', () => {
  test('POST /api/v1/traces with invalid key returns 401', async ({ request }) => {
    const response = await request.post('/api/v1/traces', {
      headers: { Authorization: 'Bearer nxs_invalid_key_that_does_not_exist' },
      data: {
        agent_id: 'test',
        name: 'test',
        status: 'success',
        started_at: new Date().toISOString(),
      },
    })

    expect(response.status()).toBe(401)
    const body = await response.json()
    expect(body.error).toBeTruthy()
  })
})

test.describe('Trace ingestion API — authenticated', () => {
  test.skip(!hasTestEndpoints, 'Skipped: requires /test/bootstrap (not available on production)')

  test('POST /api/v1/traces with valid key returns 201 with trace_id', async ({ request }) => {
    const user = await bootstrap(request)

    const response = await request.post('/api/v1/traces', {
      headers: { Authorization: `Bearer ${user.apiKey}` },
      data: {
        agent_id: 'smoke-test-agent',
        name: 'smoke-test-trace',
        status: 'success',
        started_at: new Date().toISOString(),
        ended_at: new Date().toISOString(),
      },
    })

    expect(response.status()).toBe(201)
    const body = await response.json()
    expect(typeof body.trace_id).toBe('string')
    expect(body.trace_id).toMatch(/^[0-9a-f-]{36}$/)
  })

  test('POST /api/v1/traces missing required fields returns 400', async ({ request }) => {
    const user = await bootstrap(request)

    const response = await request.post('/api/v1/traces', {
      headers: { Authorization: `Bearer ${user.apiKey}` },
      data: { name: 'missing-fields' }, // missing agent_id, status, started_at
    })

    expect(response.status()).toBe(400)
    const body = await response.json()
    expect(body.fields).toBeTruthy()
  })

  test('Free user over trace limit returns 429 with upgrade_url', async ({ request }) => {
    const user = await bootstrap(request, { plan: 'free' })

    // Set trace count to the limit (1000)
    await setTraceCount(request, user.userId, 1000)

    const response = await request.post('/api/v1/traces', {
      headers: { Authorization: `Bearer ${user.apiKey}` },
      data: {
        agent_id: 'test-agent',
        name: 'over-limit-trace',
        status: 'success',
        started_at: new Date().toISOString(),
      },
    })

    expect(response.status()).toBe(429)
    const body = await response.json()
    expect(body.error).toContain('limit')
    expect(body.upgrade_url).toBe('/dashboard/billing')
  })

  test('POST /api/v1/traces/:id/spans returns 201 with span_id', async ({ request }) => {
    const user = await bootstrap(request)

    // Create a trace first
    const traceRes = await request.post('/api/v1/traces', {
      headers: { Authorization: `Bearer ${user.apiKey}` },
      data: {
        agent_id: 'span-test-agent',
        name: 'span-test-trace',
        status: 'running',
        started_at: new Date().toISOString(),
      },
    })
    expect(traceRes.status()).toBe(201)
    const { trace_id } = await traceRes.json()

    // Add a span
    const spanRes = await request.post(`/api/v1/traces/${trace_id}/spans`, {
      headers: { Authorization: `Bearer ${user.apiKey}` },
      data: {
        name: 'llm-call',
        status: 'ok',
        started_at: new Date().toISOString(),
        ended_at: new Date().toISOString(),
        input: { prompt: 'hello' },
        output: { completion: 'world' },
      },
    })

    expect(spanRes.status()).toBe(201)
    const spanBody = await spanRes.json()
    expect(typeof spanBody.span_id).toBe('string')
  })

  test('POST /api/v1/traces/:id/spans with invalid trace_id returns 404', async ({ request }) => {
    const user = await bootstrap(request)

    const response = await request.post('/api/v1/traces/nonexistent-id/spans', {
      headers: { Authorization: `Bearer ${user.apiKey}` },
      data: {
        name: 'test-span',
        status: 'ok',
        started_at: new Date().toISOString(),
      },
    })

    expect(response.status()).toBe(404)
  })
})
