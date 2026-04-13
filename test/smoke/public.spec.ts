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

  test('GET /demo returns 200 with demo trace viewer', async ({ page }) => {
    const response = await page.goto('/demo')
    expect(response?.status()).toBe(200)

    const content = await page.content()
    expect(content).toMatch(/demo|trace/i)
  })

  test('GET /demo/traces/demo-t1 returns 200 with trace detail', async ({ page }) => {
    const response = await page.goto('/demo/traces/demo-t1')
    expect(response?.status()).toBe(200)

    const content = await page.content()
    expect(content).toMatch(/trace|span/i)
  })

  test('GET /blog returns 200 with blog listing', async ({ page }) => {
    const response = await page.goto('/blog')
    expect(response?.status()).toBe(200)

    const content = await page.content()
    expect(content).toMatch(/blog|article|post/i)
  })

  test('GET /changelog returns 200', async ({ request }) => {
    const response = await request.get('/changelog')
    expect(response.status()).toBe(200)
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
