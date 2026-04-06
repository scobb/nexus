import { Hono } from 'hono'
import type { Env, HonoVariables } from '../types'
import { tracesListPage, traceDetailPage, type TraceRow, type SpanRow } from '../pages/traces'

const router = new Hono<{ Bindings: Env; Variables: HonoVariables }>()

const PAGE_SIZE = 20

router.get('/', async (c) => {
  const userId = c.get('userId')

  const user = await c.env.NEXUS_DB.prepare(
    'SELECT email FROM users WHERE id = ?'
  ).bind(userId).first<{ email: string }>()

  const pageParam = c.req.query('page')
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1)
  const offset = (page - 1) * PAGE_SIZE

  // Fetch PAGE_SIZE+1 to detect if there's a next page
  const result = await c.env.NEXUS_DB.prepare(`
    SELECT t.id, t.name, a.name as agent_name, a.id as agent_id, t.status, t.started_at, t.ended_at
    FROM traces t
    JOIN agents a ON t.agent_id = a.id
    WHERE t.user_id = ?
    ORDER BY t.started_at DESC
    LIMIT ? OFFSET ?
  `).bind(userId, PAGE_SIZE + 1, offset).all<TraceRow>()

  const hasMore = result.results.length > PAGE_SIZE
  const traces = hasMore ? result.results.slice(0, PAGE_SIZE) : result.results

  return c.html(tracesListPage(user?.email ?? '', traces, page, hasMore))
})

router.get('/:id', async (c) => {
  const userId = c.get('userId')
  const traceId = c.req.param('id')

  const user = await c.env.NEXUS_DB.prepare(
    'SELECT email FROM users WHERE id = ?'
  ).bind(userId).first<{ email: string }>()

  const trace = await c.env.NEXUS_DB.prepare(`
    SELECT t.id, t.name, a.name as agent_name, a.id as agent_id, t.status, t.started_at, t.ended_at
    FROM traces t
    JOIN agents a ON t.agent_id = a.id
    WHERE t.id = ? AND t.user_id = ?
  `).bind(traceId, userId).first<TraceRow>()

  if (!trace) {
    return c.text('Trace not found', 404)
  }

  const spansResult = await c.env.NEXUS_DB.prepare(`
    SELECT id, name, status, started_at, ended_at, input, output, error, parent_span_id
    FROM spans
    WHERE trace_id = ?
    ORDER BY started_at ASC
  `).bind(traceId).all<SpanRow>()

  return c.html(traceDetailPage(user?.email ?? '', trace, spansResult.results))
})

export default router
