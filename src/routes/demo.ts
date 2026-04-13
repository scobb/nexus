import { Hono } from 'hono'
import type { Env } from '../types'
import {
  demoOverviewPage,
  demoTraceDetailPage,
  DEMO_TRACES,
  DEMO_SPANS,
  DEMO_AGENT_CARDS,
  type DemoTrace,
  type DemoSpan,
  type DemoAgentCard,
} from '../pages/demo'

const demoRoutes = new Hono<{ Bindings: Env }>()

const DEMO_USER_ID = 'demo-user-seed-001'

demoRoutes.get('/', async (c) => {
  const db = c.env.NEXUS_DB

  try {
    const [tracesResult, agentCardsResult, monthlyResult] = await Promise.all([
      db.prepare(`
        SELECT t.id, t.agent_id, a.name as agent_name, t.name, t.status, t.started_at, t.ended_at
        FROM traces t JOIN agents a ON t.agent_id = a.id
        WHERE t.user_id = ?
        ORDER BY t.started_at DESC
        LIMIT 25
      `).bind(DEMO_USER_ID).all<DemoTrace>(),

      db.prepare(`
        SELECT
          a.id,
          a.name,
          (SELECT status FROM traces WHERE agent_id = a.id ORDER BY started_at DESC LIMIT 1) as lastStatus,
          (SELECT started_at FROM traces WHERE agent_id = a.id ORDER BY started_at DESC LIMIT 1) as lastTraceAt,
          CAST(IFNULL((SELECT COUNT(*) FROM traces WHERE agent_id = a.id AND started_at >= datetime('now','-24 hours')), 0) AS INTEGER) as total24h,
          CAST(IFNULL((SELECT COUNT(*) FROM traces WHERE agent_id = a.id AND started_at >= datetime('now','-24 hours') AND status IN ('error','timeout')), 0) AS INTEGER) as errors24h
        FROM agents a
        WHERE a.user_id = ?
        ORDER BY a.created_at ASC
      `).bind(DEMO_USER_ID).all<DemoAgentCard>(),

      db.prepare(`
        SELECT COUNT(*) as total
        FROM traces
        WHERE user_id = ?
          AND started_at >= datetime('now', 'start of month')
      `).bind(DEMO_USER_ID).first<{ total: number }>(),
    ])

    const traces = tracesResult.results?.length ? tracesResult.results : DEMO_TRACES
    const agentCards = agentCardsResult.results?.length ? agentCardsResult.results : DEMO_AGENT_CARDS
    const monthlyTotal = monthlyResult?.total ?? traces.length

    return c.html(demoOverviewPage({ traces, agentCards, monthlyTotal }))
  } catch {
    return c.html(demoOverviewPage())
  }
})

demoRoutes.get('/traces/:id', async (c) => {
  const id = c.req.param('id')
  const db = c.env.NEXUS_DB

  try {
    const [traceRow, spansResult] = await Promise.all([
      db.prepare(`
        SELECT t.id, t.agent_id, a.name as agent_name, t.name, t.status, t.started_at, t.ended_at
        FROM traces t JOIN agents a ON t.agent_id = a.id
        WHERE t.id = ? AND t.user_id = ?
      `).bind(id, DEMO_USER_ID).first<DemoTrace>(),

      db.prepare(`
        SELECT id, name, status, started_at, ended_at, input, output, error, parent_span_id
        FROM spans
        WHERE trace_id = ?
        ORDER BY started_at ASC
      `).bind(id).all<DemoSpan>(),
    ])

    if (traceRow) {
      return c.html(demoTraceDetailPage(id, {
        trace: traceRow,
        spans: spansResult.results ?? [],
      }))
    }
  } catch {
    // fall through to hardcoded
  }

  return c.html(demoTraceDetailPage(id))
})

export default demoRoutes
