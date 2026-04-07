import { Hono } from 'hono'
import type { Env, HonoVariables } from '../types'
import { tracesListPage, traceDetailPage, type TraceRow, type SpanRow, type AgentOption, type FilterState } from '../pages/traces'

const router = new Hono<{ Bindings: Env; Variables: HonoVariables }>()

const PAGE_SIZE = 20

function rangeToISO(range: string): string | null {
  const now = new Date()
  if (range === 'today') {
    const start = new Date(now)
    start.setUTCHours(0, 0, 0, 0)
    return start.toISOString()
  } else if (range === '7d') {
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
  } else if (range === '30d') {
    return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
  }
  return null // 'all' = no date filter
}

router.get('/', async (c) => {
  const userId = c.get('userId')

  const pageParam = c.req.query('page')
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1)
  const offset = (page - 1) * PAGE_SIZE

  // Parse filter params
  const statusParam = c.req.query('status') ?? 'all'
  const agentParam = c.req.query('agent') ?? 'all'
  const rangeParam = c.req.query('range') ?? '7d'

  const filters: FilterState = {
    status: ['all', 'ok', 'error'].includes(statusParam) ? statusParam : 'all',
    agent: agentParam,
    range: ['today', '7d', '30d', 'all'].includes(rangeParam) ? rangeParam : '7d',
  }

  // Build WHERE clause dynamically
  const whereParts: string[] = ['t.user_id = ?']
  const params: unknown[] = [userId]

  if (filters.status === 'ok') {
    whereParts.push("t.status = 'success'")
  } else if (filters.status === 'error') {
    whereParts.push("t.status IN ('error', 'timeout')")
  }

  if (filters.agent !== 'all' && filters.agent) {
    whereParts.push('a.id = ?')
    params.push(filters.agent)
  }

  const sinceISO = rangeToISO(filters.range)
  if (sinceISO) {
    whereParts.push('t.started_at >= ?')
    params.push(sinceISO)
  }

  const whereClause = whereParts.join(' AND ')

  const [user, agentsResult, countResult, tracesResult] = await Promise.all([
    c.env.NEXUS_DB.prepare('SELECT email FROM users WHERE id = ?').bind(userId).first<{ email: string }>(),
    c.env.NEXUS_DB.prepare('SELECT id, name FROM agents WHERE user_id = ? ORDER BY name ASC').bind(userId).all<AgentOption>(),
    c.env.NEXUS_DB.prepare(
      `SELECT COUNT(*) as total FROM traces t JOIN agents a ON t.agent_id = a.id WHERE ${whereClause}`
    ).bind(...params).first<{ total: number }>(),
    c.env.NEXUS_DB.prepare(
      `SELECT t.id, t.name, a.name as agent_name, a.id as agent_id, t.status, t.started_at, t.ended_at
       FROM traces t JOIN agents a ON t.agent_id = a.id
       WHERE ${whereClause}
       ORDER BY t.started_at DESC
       LIMIT ? OFFSET ?`
    ).bind(...params, PAGE_SIZE + 1, offset).all<TraceRow>(),
  ])

  const hasMore = tracesResult.results.length > PAGE_SIZE
  const traces = hasMore ? tracesResult.results.slice(0, PAGE_SIZE) : tracesResult.results
  const totalCount = countResult?.total ?? 0

  return c.html(tracesListPage(
    user?.email ?? '',
    traces,
    page,
    hasMore,
    totalCount,
    filters,
    agentsResult.results
  ))
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
