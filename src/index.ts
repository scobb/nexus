import { Hono } from 'hono'
import type { Env, HonoVariables } from './types'
import { landingPage } from './pages/landing'
import { dashboardPage, type DashboardMetrics, type AgentHealth, type DayCount } from './pages/dashboard'
import { requireAuth } from './middleware/requireAuth'
import authRoutes from './routes/auth'
import keysRoutes from './routes/keys'
import tracesRoutes from './routes/traces'
import apiRoutes from './routes/api'
import agentsRoutes from './routes/agents'
import billingRoutes from './routes/billing'
import webhookRoutes from './routes/webhooks'
import settingsRoutes from './routes/settings'
import testRoutes from './routes/test'

const BATCH_LIMIT = 1000

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

app.get('/health', (c) => {
  return c.json({ status: 'ok', version: '0.1.0' })
})

app.get('/', (c) => {
  const deleted = c.req.query('deleted') === '1'
  return c.html(landingPage(deleted))
})

// /register is the public CTA — serve same login page
app.get('/register', (c) => c.redirect('/auth/login'))

// Test helper routes — only available in non-production environments
app.use('/test/*', async (c, next) => {
  if (c.env.ENVIRONMENT === 'production') {
    return c.json({ error: 'Not found' }, 404)
  }
  return next()
})
app.route('/test', testRoutes)

// API routes (API key authenticated) and webhooks (no auth)
app.route('/api/webhooks', webhookRoutes)
app.route('/api', apiRoutes)

// Auth routes
app.route('/auth', authRoutes)

// Protected dashboard
app.use('/dashboard/*', requireAuth)
app.route('/dashboard/keys', keysRoutes)
app.route('/dashboard/traces', tracesRoutes)
app.route('/dashboard/agents', agentsRoutes)
app.route('/dashboard/billing', billingRoutes)
app.route('/dashboard/settings', settingsRoutes)
app.get('/dashboard', async (c) => {
  const userId = c.get('userId')
  const db = c.env.NEXUS_DB

  const [userRow, planRow, statsRow, agentCountRow, agentRows, volumeRows] = await Promise.all([
    db.prepare('SELECT email FROM users WHERE id = ?').bind(userId).first<{ email: string }>(),
    db.prepare(
      "SELECT plan FROM subscriptions WHERE user_id = ? AND status = 'active' ORDER BY created_at DESC LIMIT 1"
    ).bind(userId).first<{ plan: string }>(),
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
    db.prepare('SELECT COUNT(*) as count FROM agents WHERE user_id = ?').bind(userId).first<{ count: number }>(),
    db.prepare(`
      SELECT a.id, a.name,
        t.status as last_status,
        t.started_at as last_trace_at,
        (SELECT COUNT(*) FROM traces t2
          WHERE t2.agent_id = a.id AND t2.status IN ('error','timeout')
            AND t2.started_at >= datetime('now','-24 hours')) as errors_24h,
        (SELECT COUNT(*) FROM traces t2
          WHERE t2.agent_id = a.id
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
  ])

  const plan: 'free' | 'pro' = planRow?.plan === 'pro' ? 'pro' : 'free'
  const total = statsRow?.total ?? 0
  const errors = statsRow?.errors ?? 0

  const metrics: DashboardMetrics = {
    email: userRow?.email ?? '',
    plan,
    tracesThisMonth: total,
    totalThisMonth: total,
    errorsThisMonth: errors,
    avgDurationMs: statsRow?.avg_ms ?? null,
    agentCount: agentCountRow?.count ?? 0,
    agents: (agentRows.results ?? []).map(a => ({
      id: a.id,
      name: a.name,
      lastStatus: a.last_status,
      lastTraceAt: a.last_trace_at,
      errors24h: a.errors_24h,
      total24h: a.total_24h,
    } satisfies AgentHealth)),
    weeklyVolume: (volumeRows.results ?? []).map(r => ({ day: r.day, count: r.count } satisfies DayCount)),
  }

  return c.html(dashboardPage(metrics))
})

export default {
  fetch: app.fetch,
  async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(runRetention(env))
  },
}
