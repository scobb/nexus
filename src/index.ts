import { Hono } from 'hono'
import type { Env, HonoVariables } from './types'
import { TAILWIND_CSS } from './generated-styles'
import * as Sentry from '@sentry/cloudflare'
import { landingPage } from './pages/landing'
import { changelogPage } from './pages/changelog'
import { docsPage } from './pages/docs'
import { docsLangchainPage, docsCrewAIPage, docsAnthropicSDKPage, docsOpenAIAgentsPage, docsAutoGenPage, docsPydanticAIPage } from './pages/guides'
import { pricingPage } from './pages/pricing'
import { vsLangfusePage, vsLangsmithPage, vsArizePhoenixPage, vsAgentopsPage, alternativesPage } from './pages/comparison'
import { dashboardPage, type DashboardMetrics, type AgentHealth, type DayCount, type HourCount } from './pages/dashboard'
import { requireAuth } from './middleware/requireAuth'
import authRoutes from './routes/auth'
import keysRoutes from './routes/keys'
import tracesRoutes from './routes/traces'
import apiRoutes from './routes/api'
import agentsRoutes from './routes/agents'
import billingRoutes from './routes/billing'
import webhookRoutes from './routes/webhooks'
import settingsRoutes from './routes/settings'
import demoRoutes from './routes/demo'
import blogRoutes from './routes/blog'
import testRoutes from './routes/test'
import otelRoutes from './routes/otel'
import publicTracesRoutes from './routes/publicTraces'

const BATCH_LIMIT = 1000

const HEALTH_URL = 'https://nexus.keylightdigital.dev/health'
const ALERT_TO = 'steve@keylightdigital.dev'

async function sendUptimeEmail(env: Env, subject: string, text: string): Promise<void> {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Ralph <ralph@keylightdigital.com>',
      to: ALERT_TO,
      subject,
      text,
    }),
  })
}

async function runUptimeCheck(env: Env): Promise<void> {
  const now = new Date().toISOString()
  let isHealthy = false

  try {
    const res = await fetch(HEALTH_URL, { signal: AbortSignal.timeout(10000) })
    if (res.ok) {
      const body = await res.json<{ status?: string }>()
      isHealthy = body?.status === 'ok'
    }
  } catch {
    isHealthy = false
  }

  const lastStatus = await env.NEXUS_KV.get('uptime:last_status')
  await env.NEXUS_KV.put('uptime:last_checked', now)

  if (!isHealthy) {
    await env.NEXUS_KV.put('uptime:last_status', 'down')
    // Only send email on first failure (not repeated down checks)
    if (lastStatus !== 'down') {
      await sendUptimeEmail(
        env,
        'Nexus production is DOWN',
        `Nexus health check failed at ${now}.\n\nURL checked: ${HEALTH_URL}\n\nPlease investigate at https://dash.cloudflare.com`
      )
      console.log(`[uptime] DOWN — alert sent to ${ALERT_TO}`)
    } else {
      console.log('[uptime] DOWN — alert already sent, skipping')
    }
  } else {
    await env.NEXUS_KV.put('uptime:last_status', 'ok')
    // Send recovery email only if we were previously down
    if (lastStatus === 'down') {
      await sendUptimeEmail(
        env,
        'Nexus production recovered',
        `Nexus health check recovered at ${now}.\n\nURL checked: ${HEALTH_URL}\n\nService is back online.`
      )
      console.log(`[uptime] RECOVERED — alert sent to ${ALERT_TO}`)
    } else {
      console.log('[uptime] OK')
    }
  }
}

async function runRetention(env: Env): Promise<void> {
  let totalDeleted = 0

  const users = await env.NEXUS_DB.prepare(
    `SELECT u.id,
       COALESCE(
         (SELECT s.plan FROM subscriptions s
          WHERE s.user_id = u.id AND s.status = 'active'
          ORDER BY s.created_at DESC LIMIT 1),
         'free'
       ) as plan
     FROM users u`
  ).all<{ id: string; plan: string }>()

  for (const user of users.results ?? []) {
    if (totalDeleted >= BATCH_LIMIT) break

    const retentionDays = user.plan === 'pro' ? 90 : 30
    const remaining = BATCH_LIMIT - totalDeleted

    const result = await env.NEXUS_DB.prepare(
      `DELETE FROM traces
       WHERE id IN (
         SELECT id FROM traces
         WHERE user_id = ? AND started_at < datetime('now', '-${retentionDays} days')
         LIMIT ?
       )`
    ).bind(user.id, remaining).run()

    totalDeleted += result.meta.changes ?? 0
  }

  console.log(`[retention] deleted ${totalDeleted} expired traces`)
}

const app = new Hono<{ Bindings: Env; Variables: HonoVariables }>()

// Security headers on all responses
app.use('*', async (c, next) => {
  await next()
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('X-Frame-Options', 'DENY')
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
})

// Cache-Control and performance headers
app.use('*', async (c, next) => {
  await next()
  const path = c.req.path

  // API responses: never cache
  if (path.startsWith('/api/')) {
    c.header('Cache-Control', 'no-store')
    return
  }

  // Dashboard and auth: private, no cache
  if (path.startsWith('/dashboard/') || path.startsWith('/auth/')) {
    c.header('Cache-Control', 'no-store, private')
    return
  }

  // Only touch HTML responses below (CSS/images manage their own caching)
  const ct = c.res.headers.get('Content-Type') ?? ''
  if (!ct.includes('text/html')) return

  // Preload critical CSS for all HTML pages
  c.header('Link', '</styles.css>; rel=preload; as=style')

  // Landing page: short browser cache, moderate edge cache
  if (path === '/') {
    c.header('Cache-Control', 'public, max-age=300, s-maxage=3600')
    return
  }

  // Static content pages: 1-hour browser, 1-day edge
  const staticPrefixes = ['/blog', '/vs/', '/docs', '/pricing', '/alternatives', '/changelog', '/demo']
  if (staticPrefixes.some(p => path === p || path.startsWith(p + '/') || path === p.replace('/', ''))) {
    c.header('Cache-Control', 'public, max-age=3600, s-maxage=86400')
  }
})

// Serve build-time generated Tailwind CSS — long-lived immutable cache (content changes only on deploy)
app.get('/styles.css', (c) => {
  return new Response(TAILWIND_CSS, {
    headers: {
      'Content-Type': 'text/css; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
})

// Favicon — indigo circuit-board node representing agent observability
const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#4f46e5"/>
  <circle cx="16" cy="16" r="4" fill="#fff"/>
  <circle cx="16" cy="6" r="2.5" fill="#c7d2fe"/>
  <circle cx="16" cy="26" r="2.5" fill="#c7d2fe"/>
  <circle cx="6" cy="16" r="2.5" fill="#c7d2fe"/>
  <circle cx="26" cy="16" r="2.5" fill="#c7d2fe"/>
  <line x1="16" y1="12" x2="16" y2="8.5" stroke="#c7d2fe" stroke-width="1.5"/>
  <line x1="16" y1="20" x2="16" y2="23.5" stroke="#c7d2fe" stroke-width="1.5"/>
  <line x1="12" y1="16" x2="8.5" y2="16" stroke="#c7d2fe" stroke-width="1.5"/>
  <line x1="20" y1="16" x2="23.5" y2="16" stroke="#c7d2fe" stroke-width="1.5"/>
</svg>`

app.get('/favicon.svg', (c) => {
  return new Response(FAVICON_SVG, {
    headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=604800' },
  })
})

app.get('/favicon.ico', (c) => {
  return c.redirect('/favicon.svg', 301)
})

app.get('/health', (c) => {
  return c.json({ status: 'ok', version: '0.1.0' })
})

app.get('/robots.txt', (c) => {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /dashboard/',
    'Disallow: /auth/',
    'Disallow: /test/',
    '',
    'Sitemap: https://nexus.keylightdigital.dev/sitemap.xml',
  ].join('\n')
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
})

app.get('/BingSiteAuth.xml', (c) => {
  // Bing Webmaster Tools verification — replace PLACEHOLDER with actual key from https://www.bing.com/webmasters
  const xml = `<?xml version="1.0"?>\n<users>\n  <user>PLACEHOLDER_REPLACE_WITH_BING_VERIFICATION_CODE</user>\n</users>`
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
})

app.get('/sitemap.xml', async (c) => {
  const base = 'https://nexus.keylightdigital.dev'
  const today = new Date().toISOString().split('T')[0]

  // Public pages (dynamically generated from all known routes)
  const urls = [
    { loc: `${base}/`, priority: '1.0', changefreq: 'weekly' },
    { loc: `${base}/pricing`, priority: '0.9', changefreq: 'monthly' },
    { loc: `${base}/demo`, priority: '0.9', changefreq: 'monthly' },
    { loc: `${base}/alternatives`, priority: '0.9', changefreq: 'monthly' },
    { loc: `${base}/docs`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/docs/anthropic-sdk`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/docs/langchain`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/docs/crewai`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/docs/openai-agents`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/docs/autogen`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/docs/pydantic-ai`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/vs/langfuse`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/vs/langsmith`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/vs/arize-phoenix`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/vs/agentops`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/blog`, priority: '0.7', changefreq: 'weekly' },
    { loc: `${base}/blog/autonomous-agent-observability`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/blog/monitor-ai-agents-production`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${base}/blog/introducing-nexus`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${base}/changelog`, priority: '0.7', changefreq: 'weekly' },
    { loc: `${base}/demo/traces/demo-t1`, priority: '0.6', changefreq: 'monthly' },
    { loc: `${base}/demo/traces/demo-t3`, priority: '0.6', changefreq: 'monthly' },
    { loc: `${base}/demo/traces/demo-t5`, priority: '0.6', changefreq: 'monthly' },
    { loc: `${base}/demo/traces/demo-t7`, priority: '0.6', changefreq: 'monthly' },
    { loc: `${base}/demo/traces/demo-t8`, priority: '0.6', changefreq: 'monthly' },
    { loc: `${base}/demo/traces/demo-t10`, priority: '0.6', changefreq: 'monthly' },
  ]

  const urlEntries = urls.map(u =>
    `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  ).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`

  // Ping search engines at most once per day (KV-backed dedup)
  const pingKey = `sitemap:last_ping:${today}`
  const alreadyPinged = await c.env.NEXUS_KV.get(pingKey)
  if (!alreadyPinged) {
    const sitemapUrl = encodeURIComponent(`${base}/sitemap.xml`)
    c.executionCtx.waitUntil(
      Promise.all([
        fetch(`https://www.google.com/ping?sitemap=${sitemapUrl}`).catch(() => {}),
        fetch(`https://www.bing.com/ping?sitemap=${sitemapUrl}`).catch(() => {}),
        c.env.NEXUS_KV.put(pingKey, '1', { expirationTtl: 86400 }),
      ])
    )
  }

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
})

app.get('/', (c) => {
  const deleted = c.req.query('deleted') === '1'
  return c.html(landingPage(deleted))
})

app.get('/og-image.png', (c) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#030712"/>
  <rect x="0" y="0" width="1200" height="630" fill="url(#grad)"/>
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e1b4b;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#030712;stop-opacity:1"/>
    </linearGradient>
  </defs>
  <circle cx="900" cy="150" r="300" fill="#4f46e5" opacity="0.08"/>
  <circle cx="200" cy="500" r="200" fill="#4f46e5" opacity="0.05"/>
  <text x="100" y="240" font-family="system-ui,-apple-system,sans-serif" font-size="96" font-weight="800" fill="white">Nexus</text>
  <text x="100" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="36" fill="#a5b4fc">Plausible for AI Agents</text>
  <text x="100" y="390" font-family="system-ui,-apple-system,sans-serif" font-size="28" fill="#6b7280">Simple observability for indie developers · $9/mo</text>
  <rect x="100" y="450" width="220" height="56" rx="10" fill="#4f46e5"/>
  <text x="210" y="484" font-family="system-ui,-apple-system,sans-serif" font-size="22" fill="white" text-anchor="middle" font-weight="600">Start free</text>
  <text x="100" y="570" font-family="system-ui,-apple-system,sans-serif" font-size="20" fill="#374151">nexus.keylightdigital.dev</text>
</svg>`
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  })
})

// Changelog
app.get('/changelog', (c) => c.html(changelogPage()))

// API documentation and integration guides
app.get('/docs', (c) => c.html(docsPage()))
app.get('/docs/langchain', (c) => c.html(docsLangchainPage()))
app.get('/docs/crewai', (c) => c.html(docsCrewAIPage()))

// Standalone pricing page
app.get('/pricing', (c) => c.html(pricingPage()))
app.get('/docs/anthropic-sdk', (c) => c.html(docsAnthropicSDKPage()))
app.get('/docs/openai-agents', (c) => c.html(docsOpenAIAgentsPage()))
app.get('/docs/autogen', (c) => c.html(docsAutoGenPage()))
app.get('/docs/pydantic-ai', (c) => c.html(docsPydanticAIPage()))

// SEO comparison pages
app.get('/vs/langfuse', (c) => c.html(vsLangfusePage()))
app.get('/vs/langsmith', (c) => c.html(vsLangsmithPage()))
app.get('/vs/arize-phoenix', (c) => c.html(vsArizePhoenixPage()))
app.get('/vs/agentops', (c) => c.html(vsAgentopsPage()))
app.get('/alternatives', (c) => c.html(alternativesPage()))

// /register is the public CTA — redirect to signup page
app.get('/register', (c) => c.redirect('/auth/signup'))

// Admin: search console setup instructions — auth-protected
app.get('/admin/search-console-setup', requireAuth, (c) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Search Console Setup — Nexus Admin</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
</head>
<body class="bg-gray-950 text-gray-100 antialiased">
  <nav class="border-b border-gray-800 px-4 py-4">
    <div class="max-w-3xl mx-auto flex items-center justify-between">
      <span class="text-lg font-bold text-white">Nexus <span class="text-xs text-gray-500 font-normal ml-2">Admin</span></span>
      <a href="/dashboard" class="text-sm text-gray-400 hover:text-white">← Dashboard</a>
    </div>
  </nav>
  <main class="max-w-3xl mx-auto px-4 py-12">
    <h1 class="text-2xl font-bold text-white mb-2">Search Console Verification</h1>
    <p class="text-gray-400 mb-8">Follow these steps to verify nexus.keylightdigital.dev in Google Search Console and Bing Webmaster Tools.</p>

    <section class="mb-10">
      <h2 class="text-lg font-semibold text-white mb-4">Google Search Console</h2>
      <ol class="space-y-4 text-gray-300 text-sm list-decimal list-inside">
        <li>Go to <strong class="text-white">https://search.google.com/search-console</strong> and click <em>Add property</em>.</li>
        <li>Enter <code class="bg-gray-800 px-1 rounded">https://nexus.keylightdigital.dev</code> as the URL-prefix property.</li>
        <li>Choose <strong class="text-white">HTML tag</strong> verification method.</li>
        <li>Copy the <code class="bg-gray-800 px-1 rounded">content</code> value from the meta tag Google provides (looks like <code class="bg-gray-800 px-1 rounded">abc123def456...</code>).</li>
        <li>In <code class="bg-gray-800 px-1 rounded">nexus/src/pages/landing.ts</code>, find the line:<br>
          <pre class="bg-gray-900 rounded p-3 mt-2 text-xs overflow-x-auto">&lt;meta name="google-site-verification" content="PLACEHOLDER_REPLACE_WITH_GOOGLE_VERIFICATION_CODE"&gt;</pre>
          Replace <code class="bg-gray-800 px-1 rounded">PLACEHOLDER_REPLACE_WITH_GOOGLE_VERIFICATION_CODE</code> with your actual code.
        </li>
        <li>Deploy: run <code class="bg-gray-800 px-1 rounded">npm run deploy</code> from the <code class="bg-gray-800 px-1 rounded">nexus/</code> directory.</li>
        <li>Return to Search Console and click <strong class="text-white">Verify</strong>.</li>
        <li>Once verified, go to <strong>Sitemaps</strong> and submit: <code class="bg-gray-800 px-1 rounded">https://nexus.keylightdigital.dev/sitemap.xml</code></li>
        <li>Click <strong>Request indexing</strong> for the homepage and key pages.</li>
      </ol>
    </section>

    <section class="mb-10">
      <h2 class="text-lg font-semibold text-white mb-4">Bing Webmaster Tools</h2>
      <ol class="space-y-4 text-gray-300 text-sm list-decimal list-inside">
        <li>Go to <strong class="text-white">https://www.bing.com/webmasters</strong> and add your site.</li>
        <li>Choose <strong class="text-white">XML file</strong> verification method.</li>
        <li>Bing will give you a verification code (looks like a long alphanumeric string).</li>
        <li>In <code class="bg-gray-800 px-1 rounded">nexus/src/index.ts</code>, find the <code class="bg-gray-800 px-1 rounded">/BingSiteAuth.xml</code> route and replace <code class="bg-gray-800 px-1 rounded">PLACEHOLDER_REPLACE_WITH_BING_VERIFICATION_CODE</code> with your actual code.</li>
        <li>Deploy: run <code class="bg-gray-800 px-1 rounded">npm run deploy</code> from the <code class="bg-gray-800 px-1 rounded">nexus/</code> directory.</li>
        <li>Verify that <code class="bg-gray-800 px-1 rounded">https://nexus.keylightdigital.dev/BingSiteAuth.xml</code> serves the file correctly.</li>
        <li>Return to Bing Webmaster Tools and click <strong class="text-white">Verify</strong>.</li>
        <li>Submit your sitemap: <code class="bg-gray-800 px-1 rounded">https://nexus.keylightdigital.dev/sitemap.xml</code></li>
      </ol>
    </section>

    <section class="bg-gray-900 border border-gray-800 rounded-lg p-4 text-sm text-gray-400">
      <p class="font-medium text-white mb-1">Sitemap URL (already in robots.txt)</p>
      <code class="text-indigo-400">https://nexus.keylightdigital.dev/sitemap.xml</code>
      <p class="mt-2">The sitemap is automatically referenced in <code class="bg-gray-800 px-1 rounded">/robots.txt</code>. No changes needed there.</p>
    </section>
  </main>
</body>
</html>`
  return c.html(html)
})

// Public shared trace pages — no auth required
app.route('/public', publicTracesRoutes)

// Demo page — no auth required
app.route('/demo', demoRoutes)

// Blog — no auth required
app.route('/blog', blogRoutes)

// Test helper routes — only available in non-production environments
app.use('/test/*', async (c, next) => {
  if (c.env.ENVIRONMENT === 'production') {
    return c.json({ error: 'Not found' }, 404)
  }
  return next()
})
app.route('/test', testRoutes)

// OTEL OTLP/HTTP ingestion — standard path POST /v1/traces
app.route('/v1', otelRoutes)

// API routes (API key authenticated) and webhooks (no auth)
app.route('/api/webhooks', webhookRoutes)
app.route('/api', apiRoutes)

// Auth routes
app.route('/auth', authRoutes)

// Protected dashboard
app.use('/dashboard/*', requireAuth)
app.post('/dashboard/onboarding/dismiss', async (c) => {
  const userId = c.get('userId')
  await c.env.NEXUS_KV.put(`onboarding_dismissed:${userId}`, '1')
  return c.redirect('/dashboard')
})

app.route('/dashboard/keys', keysRoutes)
app.route('/dashboard/traces', tracesRoutes)
app.route('/dashboard/agents', agentsRoutes)
app.route('/dashboard/billing', billingRoutes)
app.route('/dashboard/settings', settingsRoutes)
// Cached dashboard metrics shape stored in KV
interface DashboardStatsCache {
  statsRow: { total: number; errors: number; avg_ms: number | null }
  agentRows: { id: string; name: string; last_status: string | null; last_trace_at: string | null; errors_24h: number; total_24h: number }[]
  volumeRows: { day: string; count: number }[]
  hourlyRows: { hour: string; total: number; errors: number }[]
}

const DASHBOARD_STATS_TTL = 300 // 5 minutes

async function getDashboardStats(db: D1Database, kv: KVNamespace, userId: string): Promise<DashboardStatsCache> {
  const cacheKey = `dashboard_stats:${userId}`
  const cached = await kv.get(cacheKey)
  if (cached) {
    try {
      return JSON.parse(cached) as DashboardStatsCache
    } catch {
      // Fall through to fetch fresh
    }
  }

  const [statsRow, agentRows, volumeRows, hourlyRows] = await Promise.all([
    db.prepare(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status IN ('error','timeout') THEN 1 ELSE 0 END) as errors,
        AVG(CASE WHEN ended_at IS NOT NULL
          THEN (julianday(ended_at) - julianday(started_at)) * 86400000
          ELSE NULL END) as avg_ms
      FROM traces
      WHERE user_id = ? AND started_at >= datetime('now','start of month')
    `).bind(userId).first<{ total: number; errors: number; avg_ms: number | null }>(),
    db.prepare(`
      SELECT a.id, a.name,
        t.status as last_status,
        t.started_at as last_trace_at,
        (SELECT COUNT(*) FROM traces t2
          WHERE t2.agent_id = a.id AND t2.status IN ('error','timeout')
            AND t2.started_at >= datetime('now','-24 hours')) as errors_24h,
        (SELECT COUNT(*) FROM traces t2
          WHERE t2.agent_id = a.id AND t2.status IN ('success','error','timeout')
            AND t2.started_at >= datetime('now','-24 hours')) as total_24h
      FROM agents a
      LEFT JOIN traces t ON t.id = (
        SELECT id FROM traces WHERE agent_id = a.id ORDER BY started_at DESC LIMIT 1
      )
      WHERE a.user_id = ?
      ORDER BY a.created_at ASC
    `).bind(userId).all<{ id: string; name: string; last_status: string | null; last_trace_at: string | null; errors_24h: number; total_24h: number }>(),
    db.prepare(`
      SELECT date(started_at) as day, COUNT(*) as count
      FROM traces
      WHERE user_id = ? AND started_at >= datetime('now','-6 days')
      GROUP BY date(started_at)
      ORDER BY day ASC
    `).bind(userId).all<{ day: string; count: number }>(),
    db.prepare(`
      SELECT strftime('%H', started_at) as hour,
             COUNT(*) as total,
             SUM(CASE WHEN status IN ('error','timeout') THEN 1 ELSE 0 END) as errors
      FROM traces
      WHERE user_id = ? AND started_at >= datetime('now','-24 hours')
      GROUP BY strftime('%H', started_at)
      ORDER BY hour ASC
    `).bind(userId).all<{ hour: string; total: number; errors: number }>(),
  ])

  const result: DashboardStatsCache = {
    statsRow: statsRow ?? { total: 0, errors: 0, avg_ms: null },
    agentRows: agentRows.results ?? [],
    volumeRows: volumeRows.results ?? [],
    hourlyRows: hourlyRows.results ?? [],
  }

  // Cache result — fire-and-forget, don't block response
  kv.put(cacheKey, JSON.stringify(result), { expirationTtl: DASHBOARD_STATS_TTL }).catch(() => {})

  return result
}

app.get('/dashboard', async (c) => {
  const userId = c.get('userId')
  const db = c.env.NEXUS_DB

  const [userRow, planRow, apiKeyRow, traceRow, onboardingDismissedVal, statsCache] = await Promise.all([
    db.prepare('SELECT email, plan FROM users WHERE id = ?').bind(userId).first<{ email: string; plan: string }>(),
    db.prepare(
      "SELECT plan FROM subscriptions WHERE user_id = ? AND status IN ('active','trialing') ORDER BY created_at DESC LIMIT 1"
    ).bind(userId).first<{ plan: string }>(),
    db.prepare("SELECT 1 FROM api_keys WHERE user_id = ? AND deleted_at IS NULL LIMIT 1").bind(userId).first<{ '1': number }>(),
    db.prepare("SELECT 1 FROM traces WHERE user_id = ? LIMIT 1").bind(userId).first<{ '1': number }>(),
    c.env.NEXUS_KV.get(`onboarding_dismissed:${userId}`),
    getDashboardStats(db, c.env.NEXUS_KV, userId),
  ])

  // Plan: check subscriptions first, fall back to users.plan field set by webhook
  const plan: 'free' | 'pro' = (planRow?.plan === 'pro' || userRow?.plan === 'pro') ? 'pro' : 'free'
  const total = statsCache.statsRow.total ?? 0
  const errors = statsCache.statsRow.errors ?? 0

  const metrics: DashboardMetrics = {
    email: userRow?.email ?? '',
    plan,
    tracesThisMonth: total,
    totalThisMonth: total,
    errorsThisMonth: errors,
    avgDurationMs: statsCache.statsRow.avg_ms ?? null,
    agentCount: statsCache.agentRows.length,
    agents: statsCache.agentRows.map(a => ({
      id: a.id,
      name: a.name,
      lastStatus: a.last_status,
      lastTraceAt: a.last_trace_at,
      errors24h: a.errors_24h,
      total24h: a.total_24h,
    } satisfies AgentHealth)),
    weeklyVolume: statsCache.volumeRows.map(r => ({ day: r.day, count: r.count } satisfies DayCount)),
    hourlyVolume: statsCache.hourlyRows.map(r => ({ hour: r.hour, total: r.total, errors: r.errors } satisfies HourCount)),
    hasApiKey: apiKeyRow != null,
    hasTrace: traceRow != null,
    onboardingDismissed: onboardingDismissedVal != null,
  }

  return c.html(dashboardPage(metrics))
})

// Sentry options factory — only activates if SENTRY_DSN is set
function sentryOptions(env: unknown) {
  const e = env as Env
  return {
    dsn: e.SENTRY_DSN ?? '',
    environment: e.ENVIRONMENT ?? 'development',
    tracesSampleRate: 0.1,
    // Scrub PII from Sentry events before sending
    beforeSend(event: Sentry.ErrorEvent) {
      if (!event.request) return event
      // Remove Authorization header (contains API keys)
      if (event.request.headers) {
        const h = event.request.headers as Record<string, string>
        delete h['Authorization']
        delete h['Cookie']
      }
      // Scrub query strings that might contain tokens
      if (event.request.query_string) {
        event.request.query_string = '[scrubbed]'
      }
      return event
    },
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const workerHandler: ExportedHandler<any> = {
  fetch: app.fetch,
  async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
    if (controller.cron === '*/5 * * * *') {
      ctx.waitUntil(runUptimeCheck(env))
    } else {
      ctx.waitUntil(runRetention(env))
    }
  },
}

export default Sentry.withSentry(sentryOptions, workerHandler)
