import { test, expect } from '@playwright/test'

test.describe('Landing page', () => {
  test('GET / returns 200 and shows headline', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)

    // Headline and subheadline
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const h1 = await page.getByRole('heading', { level: 1 }).textContent()
    expect(h1).toBeTruthy()
  })

  test('pricing table is present with Free and Pro tiers', async ({ page }) => {
    await page.goto('/')

    // Look for pricing section content
    const content = await page.content()
    expect(content).toContain('Free')
    expect(content).toContain('Pro')
    expect(content).toContain('$9')
    expect(content).toContain('1,000')
    expect(content).toContain('50,000')
  })

  test('CTAs link to /register and /demo or a demo route', async ({ page }) => {
    await page.goto('/')
    const links = await page.locator('a').all()
    const hrefs = await Promise.all(links.map(l => l.getAttribute('href')))
    expect(hrefs.some(h => h === '/register' || h?.includes('/register'))).toBe(true)
  })

  test('meta-narrative section is present', async ({ page }) => {
    await page.goto('/')
    const content = await page.content()
    expect(content.toLowerCase()).toContain('ralph')
  })

  test('GET /health returns {status: ok}', async ({ request }) => {
    const response = await request.get('/health')
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body.status).toBe('ok')
  })

  test('no horizontal overflow at 375px width', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2) // 2px tolerance
  })
})
