import { test, expect } from '@playwright/test'

/**
 * Public page smoke tests — no authentication required.
 * These tests run against any environment (local, staging, or production).
 */
test.describe('Public pages', () => {
  test('GET /pricing returns 200 with pricing tiers', async ({ page }) => {
    const response = await page.goto('/pricing')
    expect(response?.status()).toBe(200)

    const content = await page.content()
    expect(content).toContain('Free')
    expect(content).toContain('Pro')
    expect(content).toContain('$9')
  })

  test('GET /docs returns 200 with SDK documentation', async ({ page }) => {
    const response = await page.goto('/docs')
    expect(response?.status()).toBe(200)

    const content = await page.content()
    expect(content).toMatch(/install|sdk|npm|pip/i)
  })

  test('GET /docs/anthropic-sdk returns 200', async ({ request }) => {
    const response = await request.get('/docs/anthropic-sdk')
    expect(response.status()).toBe(200)
  })

  test('GET /docs/langchain returns 200', async ({ request }) => {
    const response = await request.get('/docs/langchain')
    expect(response.status()).toBe(200)
  })

  test('GET /docs/openai-agents returns 200', async ({ request }) => {
    const response = await request.get('/docs/openai-agents')
    expect(response.status()).toBe(200)
  })

  test('GET /demo returns 200 — Demo Dashboard with agents, traces, and CTAs', async ({ page }) => {
    const response = await page.goto('/demo')
    expect(response?.status()).toBe(200)

    const content = await page.content()
    // ACP-161: Demo Dashboard header
    expect(content).toContain('Demo Dashboard')
    // ACP-161: trace list present
    expect(content).toMatch(/trace/i)
    // ACP-161: prominent CTA at top (banner) and bottom
    expect(content).toContain('Start monitoring your agents')
    // ACP-161: demo-specific nav (no settings or billing links in nav)
    expect(content).not.toMatch(/<a[^>]+href="\/settings"/)
    expect(content).not.toMatch(/<a[^>]+href="\/billing"/)
    // ACP-161: sign-up CTA present
    expect(content).toContain('/register')
  })

  test('GET /demo/traces/demo-t1 returns 200 with trace detail (fallback data)', async ({ page }) => {
    const response = await page.goto('/demo/traces/demo-t1')
    expect(response?.status()).toBe(200)

    const content = await page.content()
    expect(content).toMatch(/trace|span/i)
  })

  test('GET /demo/traces/demo-tr-cs-001 returns 200 with trace detail (D1 seed data)', async ({ page }) => {
    const response = await page.goto('/demo/traces/demo-tr-cs-001')
    expect(response?.status()).toBe(200)

    const content = await page.content()
    expect(content).toMatch(/trace|span/i)
    // Should show the Customer Support Bot trace from seed
    expect(content).toContain('ticket')
  })

  test('GET / landing page includes "See a live demo" CTA linking to /demo', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)

    const content = await page.content()
    expect(content).toContain('live demo')
    expect(content).toContain('/demo')
  })

  test('GET /blog returns 200 with blog listing', async ({ page }) => {
    const response = await page.goto('/blog')
    expect(response?.status()).toBe(200)

    const content = await page.content()
    expect(content).toMatch(/blog|article|post/i)
  })

  // ACP-163: Changelog page smoke tests
  test('GET /changelog returns 200 with entries, category badges, and RSS link', async ({ page }) => {
    const response = await page.goto('/changelog')
    expect(response?.status()).toBe(200)

    const content = await page.content()
    // Has a title
    expect(content).toContain('Changelog')
    // Entries present (newest first — Apr 13 should appear before Apr 5)
    expect(content).toContain('Apr 13')
    expect(content).toContain('Apr 5')
    // Category badges present
    expect(content).toContain('Feature')
    expect(content).toContain('Improvement')
    expect(content).toContain('Fix')
    expect(content).toContain('Content')
    // RSS link present
    expect(content).toContain('/blog/rss.xml')
    // OG meta tags
    expect(content).toContain('og:title')
    expect(content).toContain('og:description')
    expect(content).toContain('og:image')
    expect(content).toContain('twitter:card')
  })

  test('ACP-163: changelog linked from /docs sidebar', async ({ page }) => {
    await page.goto('/docs')
    const content = await page.content()
    expect(content).toContain('/changelog')
  })

  test('ACP-163: changelog linked from landing page footer', async ({ page }) => {
    await page.goto('/')
    const content = await page.content()
    // Footer contains /changelog link
    expect(content).toMatch(/href="\/changelog"/)
  })

  test('ACP-163: mobile /changelog has no horizontal overflow at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/changelog')

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2)
  })

  test('GET /privacy returns 200', async ({ request }) => {
    const response = await request.get('/privacy')
    expect(response.status()).toBe(200)
  })

  test('GET /terms returns 200', async ({ request }) => {
    const response = await request.get('/terms')
    expect(response.status()).toBe(200)
  })

  test('GET /vs/langfuse returns 200', async ({ request }) => {
    const response = await request.get('/vs/langfuse')
    expect(response.status()).toBe(200)
  })

  test('GET /alternatives returns 200', async ({ request }) => {
    const response = await request.get('/alternatives')
    expect(response.status()).toBe(200)
  })

  test('GET /sitemap.xml returns 200 with valid XML', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    expect(response.status()).toBe(200)
    const body = await response.text()
    expect(body).toContain('<?xml')
    expect(body).toContain('<urlset')
    expect(body).toContain('<loc>')
  })

  test('GET /robots.txt returns 200 and disallows dashboard', async ({ request }) => {
    const response = await request.get('/robots.txt')
    expect(response.status()).toBe(200)
    const body = await response.text()
    expect(body).toContain('Disallow: /dashboard/')
    expect(body).toContain('Sitemap:')
  })

  // ACP-164: API reference page smoke tests
  test('ACP-164: GET /docs/api-reference returns 200 with full endpoint coverage', async ({ page }) => {
    const response = await page.goto('/docs/api-reference')
    expect(response?.status()).toBe(200)

    const content = await page.content()
    // Page title and header
    expect(content).toContain('API Reference')
    // All four endpoints present
    expect(content).toContain('/api/v1/traces')
    expect(content).toContain('/api/v1/traces/:trace_id/spans')
    expect(content).toContain('/api/v1/traces/:trace_id')
    expect(content).toContain('/health')
    // HTTP method badges
    expect(content).toContain('POST')
    expect(content).toContain('PATCH')
    expect(content).toContain('GET')
    // Auth section
    expect(content).toContain('Authentication')
    expect(content).toContain('Authorization')
    expect(content).toContain('Bearer')
    // Rate limits section
    expect(content).toContain('Rate Limit')
    // Error codes section
    expect(content).toContain('Error Code')
    // curl examples present
    expect(content).toContain('curl')
    expect(content).toContain('NEXUS_API_KEY')
  })

  test('ACP-164: /docs/api-reference has error codes table with 400, 401, 403, 404, 429, 500', async ({ page }) => {
    await page.goto('/docs/api-reference')
    const content = await page.content()
    expect(content).toContain('400')
    expect(content).toContain('401')
    expect(content).toContain('403')
    expect(content).toContain('404')
    expect(content).toContain('429')
    expect(content).toContain('500')
  })

  test('ACP-164: /docs/api-reference has anchor links for each endpoint section', async ({ page }) => {
    await page.goto('/docs/api-reference')
    const content = await page.content()
    expect(content).toContain('id="post-traces"')
    expect(content).toContain('id="post-spans"')
    expect(content).toContain('id="patch-trace"')
    expect(content).toContain('id="get-trace"')
    expect(content).toContain('id="get-health"')
    expect(content).toContain('id="authentication"')
    expect(content).toContain('id="rate-limits"')
    expect(content).toContain('id="errors"')
  })

  test('ACP-164: /docs/api-reference linked from /docs sidebar', async ({ page }) => {
    await page.goto('/docs')
    const content = await page.content()
    expect(content).toContain('/docs/api-reference')
  })

  test('ACP-164: /docs/api-reference has OG meta tags', async ({ page }) => {
    await page.goto('/docs/api-reference')
    const content = await page.content()
    expect(content).toContain('og:title')
    expect(content).toContain('og:description')
    expect(content).toContain('og:url')
  })

  test('ACP-164: mobile /docs/api-reference has no horizontal overflow at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/docs/api-reference')

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2)
  })

  test('ACP-165: /docs/api-reference has playground section with endpoint selector and send button', async ({ page }) => {
    await page.goto('/docs/api-reference')
    const content = await page.content()
    // Playground section
    expect(content).toContain('id="playground"')
    expect(content).toContain('API Playground')
    expect(content).toContain('pg-api-key')
    expect(content).toContain('pg-endpoint')
    expect(content).toContain('pg-send-btn')
    expect(content).toContain('pg-curl')
    expect(content).toContain('pg-response-area')
    // Endpoint options
    expect(content).toContain('get-health')
    expect(content).toContain('post-trace')
    expect(content).toContain('post-span')
    expect(content).toContain('patch-trace')
    expect(content).toContain('get-trace')
    // sessionStorage mention
    expect(content).toContain('sessionStorage')
    // Sidebar link
    expect(content).toContain('href="#playground"')
  })

  test('ACP-165: playground sidebar link and GET /health visible', async ({ page }) => {
    await page.goto('/docs/api-reference')
    // The sidebar should have a Playground anchor
    const sidebarLink = await page.locator('a[href="#playground"]').first()
    await expect(sidebarLink).toBeVisible()
    // Health endpoint option present
    const endpointSel = await page.locator('#pg-endpoint')
    await expect(endpointSel).toBeVisible()
    const opts = await endpointSel.locator('option').allTextContents()
    expect(opts.some(o => o.includes('health'))).toBeTruthy()
  })

  test('ACP-165: playground curl command updates on endpoint change', async ({ page }) => {
    await page.goto('/docs/api-reference')
    await page.waitForFunction(() => document.getElementById('pg-curl')?.textContent?.includes('curl'))
    // Select POST /traces
    await page.selectOption('#pg-endpoint', 'post-trace')
    const curl1 = await page.locator('#pg-curl').textContent()
    expect(curl1).toContain('/api/v1/traces')
    // Select GET /health
    await page.selectOption('#pg-endpoint', 'get-health')
    const curl2 = await page.locator('#pg-curl').textContent()
    expect(curl2).toContain('/health')
  })

  test('ACP-165: playground GET /health send returns 200 ok', async ({ page }) => {
    await page.goto('/docs/api-reference')
    await page.waitForFunction(() => typeof window.pgSend === 'function')
    await page.selectOption('#pg-endpoint', 'get-health')
    await page.click('#pg-send-btn')
    // Wait for response area to appear
    await page.waitForSelector('#pg-response-area:not(.hidden)', { timeout: 10000 })
    const badge = await page.locator('#pg-status-badge').textContent()
    expect(badge?.trim()).toBe('200')
    const body = await page.locator('#pg-response-body').textContent()
    expect(body).toContain('"status"')
    expect(body).toContain('"ok"')
  })

  test('ACP-165: playground API key stored in sessionStorage', async ({ page }) => {
    await page.goto('/docs/api-reference')
    await page.waitForFunction(() => typeof window.pgSaveKey === 'function')
    // Type a fake key
    await page.fill('#pg-api-key', 'nxs_test_key_abc123')
    await page.dispatchEvent('#pg-api-key', 'input')
    // Verify sessionStorage
    const stored = await page.evaluate(() => sessionStorage.getItem('nexus_pg_key'))
    expect(stored).toBe('nxs_test_key_abc123')
  })

  test('ACP-165: mobile /docs/api-reference playground has no horizontal overflow at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/docs/api-reference')
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2)
  })

  test('mobile: /pricing has no horizontal overflow at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/pricing')

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2)
  })

  test('mobile: /demo has no horizontal overflow at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/demo')

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2)
  })
})
