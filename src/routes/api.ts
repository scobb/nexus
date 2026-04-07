import { Hono } from 'hono'
import type { Env, HonoVariables } from '../types'
import { apiKeyAuth } from '../middleware/apiKeyAuth'
import { sendAlertIfNeeded } from '../lib/alerts'

const api = new Hono<{ Bindings: Env; Variables: HonoVariables }>()

api.use('/*', apiKeyAuth)

const VALID_STATUSES = ['running', 'success', 'error', 'timeout'] as const
type TraceStatus = typeof VALID_STATUSES[number]

function isISO8601(s: string): boolean {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(s)
}

function currentMonthStart(): string {
  const now = new Date()
  const y = now.getUTCFullYear()
  const m = String(now.getUTCMonth() + 1).padStart(2, '0')
  return `${y}-${m}-01T00:00:00Z`
}

function traceCountKey(userId: string): string {
  const now = new Date()
  const y = now.getUTCFullYear()
  const m = String(now.getUTCMonth() + 1).padStart(2, '0')
  return `trace_count:${userId}:${y}-${m}`
}

api.post('/v1/traces', async (c) => {
  const userId = c.get('userId')

  let body: unknown
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400)
  }

  if (!body || typeof body !== 'object') {
    return c.json({ error: 'Body must be a JSON object' }, 400)
  }

  const b = body as Record<string, unknown>
  const { agent_id, name, status, started_at, ended_at, metadata } = b

  // Validate required fields
  const errors: Record<string, string> = {}

  if (!agent_id || typeof agent_id !== 'string') {
    errors.agent_id = 'Required, must be a string'
  }
  if (!name || typeof name !== 'string') {
    errors.name = 'Required, must be a string'
  }
  if (!status || typeof status !== 'string') {
    errors.status = 'Required, must be a string'
  } else if (!VALID_STATUSES.includes(status as TraceStatus)) {
    errors.status = `Must be one of: ${VALID_STATUSES.join(', ')}`
  }
  if (!started_at || typeof started_at !== 'string') {
    errors.started_at = 'Required, must be a string'
  } else if (!isISO8601(started_at)) {
    errors.started_at = 'Must be ISO 8601 format (e.g. 2026-04-05T12:00:00Z)'
  }
  if (ended_at !== undefined && ended_at !== null) {
    if (typeof ended_at !== 'string' || !isISO8601(ended_at)) {
      errors.ended_at = 'Must be ISO 8601 format if provided'
    }
  }

  if (Object.keys(errors).length > 0) {
    return c.json({ error: 'Validation failed', fields: errors }, 400)
  }

  const agentIdStr = agent_id as string
  const nameStr = name as string
  const statusStr = status as TraceStatus
  const startedAtStr = started_at as string
  const endedAtStr = (ended_at as string | undefined) ?? null
  const metadataStr = metadata !== undefined ? JSON.stringify(metadata) : null

  // Check plan and enforce Free limits
  const user = await c.env.NEXUS_DB.prepare(
    'SELECT plan FROM users WHERE id = ?'
  ).bind(userId).first<{ plan: string }>()

  if (!user) {
    return c.json({ error: 'Invalid API key' }, 401)
  }

  if (user.plan === 'free') {
    const kvKey = traceCountKey(userId)
    let traceCount: number

    const cached = await c.env.NEXUS_KV.get(kvKey)
    if (cached !== null) {
      traceCount = parseInt(cached, 10)
    } else {
      const result = await c.env.NEXUS_DB.prepare(
        'SELECT COUNT(*) as count FROM traces WHERE user_id = ? AND started_at >= ?'
      ).bind(userId, currentMonthStart()).first<{ count: number }>()
      traceCount = result?.count ?? 0
      await c.env.NEXUS_KV.put(kvKey, String(traceCount), { expirationTtl: 3600 })
    }

    if (traceCount >= 1000) {
      return c.json({
        error: 'Monthly trace limit reached',
        limit: 1000,
        current: traceCount,
        upgrade_url: '/dashboard/billing',
      }, 429)
    }

    // Update KV count optimistically after we proceed
    // (done after successful insert below)
  }

  // Find or create agent (by user_id + name)
  const existingAgent = await c.env.NEXUS_DB.prepare(
    'SELECT id FROM agents WHERE user_id = ? AND name = ?'
  ).bind(userId, agentIdStr).first<{ id: string }>()

  let dbAgentId: string
  if (existingAgent) {
    dbAgentId = existingAgent.id
  } else {
    // Free plan: max 1 agent
    if (user.plan === 'free') {
      const agentCountResult = await c.env.NEXUS_DB.prepare(
        'SELECT COUNT(*) as count FROM agents WHERE user_id = ?'
      ).bind(userId).first<{ count: number }>()
      if ((agentCountResult?.count ?? 0) >= 1) {
        return c.json({
          error: 'Free plan limited to 1 agent',
          upgrade_url: '/dashboard/billing',
        }, 403)
      }
    }

    dbAgentId = crypto.randomUUID()
    await c.env.NEXUS_DB.prepare(
      "INSERT OR IGNORE INTO agents (id, user_id, name, created_at) VALUES (?, ?, ?, datetime('now'))"
    ).bind(dbAgentId, userId, agentIdStr).run()
    // Fetch the actual id in case of a race (INSERT OR IGNORE may have been a no-op)
    const agent = await c.env.NEXUS_DB.prepare(
      'SELECT id FROM agents WHERE user_id = ? AND name = ?'
    ).bind(userId, agentIdStr).first<{ id: string }>()
    dbAgentId = agent!.id
  }

  // Insert trace
  const traceId = crypto.randomUUID()
  await c.env.NEXUS_DB.prepare(
    `INSERT INTO traces (id, agent_id, user_id, name, status, started_at, ended_at, metadata)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(traceId, dbAgentId, userId, nameStr, statusStr, startedAtStr, endedAtStr, metadataStr).run()

  // Increment cached trace count for Free users
  if (user.plan === 'free') {
    const kvKey = traceCountKey(userId)
    const cached = await c.env.NEXUS_KV.get(kvKey)
    if (cached !== null) {
      await c.env.NEXUS_KV.put(kvKey, String(parseInt(cached, 10) + 1), { expirationTtl: 3600 })
    }
  }

  // Send alert if trace is a failure (non-blocking)
  sendAlertIfNeeded({
    env: c.env,
    userId,
    agentId: dbAgentId,
    agentName: agentIdStr,
    traceId,
    traceName: nameStr,
    traceStatus: statusStr,
    metadata: metadataStr,
  }).catch(err => console.error('sendAlertIfNeeded error:', err))

  return c.json({ trace_id: traceId }, 201)
})

api.patch('/v1/traces/:id', async (c) => {
  const userId = c.get('userId')
  const traceId = c.req.param('id')

  const trace = await c.env.NEXUS_DB.prepare(
    'SELECT id, name, agent_id, metadata FROM traces WHERE id = ? AND user_id = ?'
  ).bind(traceId, userId).first<{ id: string; name: string; agent_id: string; metadata: string | null }>()

  if (!trace) {
    return c.json({ error: 'Trace not found' }, 404)
  }

  let body: unknown
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400)
  }

  if (!body || typeof body !== 'object') {
    return c.json({ error: 'Body must be a JSON object' }, 400)
  }

  const b = body as Record<string, unknown>
  const { status, ended_at } = b

  const errors: Record<string, string> = {}

  if (status !== undefined) {
    if (typeof status !== 'string' || !VALID_STATUSES.includes(status as TraceStatus)) {
      errors.status = `Must be one of: ${VALID_STATUSES.join(', ')}`
    }
  }
  if (ended_at !== undefined && ended_at !== null) {
    if (typeof ended_at !== 'string' || !isISO8601(ended_at)) {
      errors.ended_at = 'Must be ISO 8601 format if provided'
    }
  }

  if (Object.keys(errors).length > 0) {
    return c.json({ error: 'Validation failed', fields: errors }, 400)
  }

  const updates: string[] = []
  const params: unknown[] = []

  if (status !== undefined) {
    updates.push('status = ?')
    params.push(status)
  }
  if (ended_at !== undefined && ended_at !== null) {
    updates.push('ended_at = ?')
    params.push(ended_at as string)
  }

  if (updates.length === 0) {
    return c.json({ error: 'No fields to update' }, 400)
  }

  params.push(traceId)
  await c.env.NEXUS_DB.prepare(
    `UPDATE traces SET ${updates.join(', ')} WHERE id = ?`
  ).bind(...params).run()

  // Send alert if the new status is a failure
  if (status === 'error' || status === 'timeout') {
    const agent = await c.env.NEXUS_DB.prepare(
      'SELECT name FROM agents WHERE id = ?'
    ).bind(trace.agent_id).first<{ name: string }>()

    sendAlertIfNeeded({
      env: c.env,
      userId,
      agentId: trace.agent_id,
      agentName: agent?.name ?? 'unknown',
      traceId,
      traceName: trace.name,
      traceStatus: status as string,
      metadata: trace.metadata,
    }).catch(err => console.error('sendAlertIfNeeded error:', err))
  }

  return c.json({ trace_id: traceId })
})

const VALID_SPAN_STATUSES = ['ok', 'error'] as const
type SpanStatus = typeof VALID_SPAN_STATUSES[number]

api.post('/v1/traces/:id/spans', async (c) => {
  const userId = c.get('userId')
  const traceId = c.req.param('id')

  // Verify trace exists and belongs to this user
  const trace = await c.env.NEXUS_DB.prepare(
    'SELECT id FROM traces WHERE id = ? AND user_id = ?'
  ).bind(traceId, userId).first<{ id: string }>()

  if (!trace) {
    return c.json({ error: 'Trace not found' }, 404)
  }

  let body: unknown
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400)
  }

  if (!body || typeof body !== 'object') {
    return c.json({ error: 'Body must be a JSON object' }, 400)
  }

  const b = body as Record<string, unknown>
  const { name, parent_span_id, status, started_at, ended_at, input, output, error: errorField } = b

  const errors: Record<string, string> = {}

  if (!name || typeof name !== 'string') {
    errors.name = 'Required, must be a string'
  }
  if (!status || typeof status !== 'string') {
    errors.status = 'Required, must be a string'
  } else if (!VALID_SPAN_STATUSES.includes(status as SpanStatus)) {
    errors.status = `Must be one of: ${VALID_SPAN_STATUSES.join(', ')}`
  }
  if (!started_at || typeof started_at !== 'string') {
    errors.started_at = 'Required, must be a string'
  } else if (!isISO8601(started_at)) {
    errors.started_at = 'Must be ISO 8601 format (e.g. 2026-04-05T12:00:00Z)'
  }
  if (ended_at !== undefined && ended_at !== null) {
    if (typeof ended_at !== 'string' || !isISO8601(ended_at)) {
      errors.ended_at = 'Must be ISO 8601 format if provided'
    }
  }
  if (parent_span_id !== undefined && parent_span_id !== null && typeof parent_span_id !== 'string') {
    errors.parent_span_id = 'Must be a string if provided'
  }

  if (Object.keys(errors).length > 0) {
    return c.json({ error: 'Validation failed', fields: errors }, 400)
  }

  const spanId = crypto.randomUUID()
  const inputStr = input !== undefined ? JSON.stringify(input) : null
  const outputStr = output !== undefined ? JSON.stringify(output) : null
  const errorStr = errorField !== undefined ? String(errorField) : null
  const endedAtStr = (ended_at as string | undefined) ?? null
  const parentSpanIdStr = (parent_span_id as string | undefined) ?? null

  await c.env.NEXUS_DB.prepare(
    `INSERT INTO spans (id, trace_id, parent_span_id, name, status, started_at, ended_at, input, output, error)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    spanId, traceId, parentSpanIdStr,
    name as string, status as string,
    started_at as string, endedAtStr,
    inputStr, outputStr, errorStr
  ).run()

  return c.json({ span_id: spanId }, 201)
})

interface TraceApiRow {
  id: string
  agent_name: string
  status: string
  started_at: string
  ended_at: string | null
  duration_ms: number | null
  span_count: number
  metadata: string | null
}

interface SpanApiRow {
  id: string
  name: string
  parent_span_id: string | null
  status: string
  started_at: string
  ended_at: string | null
  input: string | null
  output: string | null
  error: string | null
}

function formatTrace(row: TraceApiRow): object {
  return {
    id: row.id,
    agent_name: row.agent_name,
    status: row.status,
    started_at: row.started_at,
    ended_at: row.ended_at,
    duration_ms: row.duration_ms,
    span_count: row.span_count,
    metadata: row.metadata ? (() => { try { return JSON.parse(row.metadata!) } catch { return row.metadata } })() : null,
  }
}

api.get('/v1/traces', async (c) => {
  const userId = c.get('userId')

  // Parse and validate query params
  const agentName = c.req.query('agent_id')
  const statusParam = c.req.query('status')
  const sinceParam = c.req.query('since')
  const untilParam = c.req.query('until')
  const limitParam = c.req.query('limit') ?? '50'
  const afterParam = c.req.query('after')

  const errors: Record<string, string> = {}

  const VALID_GET_STATUSES = ['ok', 'error'] as const
  if (statusParam !== undefined && !VALID_GET_STATUSES.includes(statusParam as typeof VALID_GET_STATUSES[number])) {
    errors.status = 'Must be one of: ok, error'
  }
  if (sinceParam !== undefined && !isISO8601(sinceParam)) {
    errors.since = 'Must be ISO 8601 format (e.g. 2026-04-05T12:00:00Z)'
  }
  if (untilParam !== undefined && !isISO8601(untilParam)) {
    errors.until = 'Must be ISO 8601 format (e.g. 2026-04-05T12:00:00Z)'
  }
  const limit = parseInt(limitParam, 10)
  if (isNaN(limit) || limit < 1 || limit > 200) {
    errors.limit = 'Must be an integer between 1 and 200'
  }

  if (Object.keys(errors).length > 0) {
    return c.json({ error: 'Invalid query parameters', fields: errors }, 400)
  }

  const effectiveLimit = Math.min(Math.max(1, limit), 200)

  // Build WHERE clause
  const whereParts: string[] = ['t.user_id = ?']
  const params: unknown[] = [userId]

  if (agentName) {
    whereParts.push('a.name = ?')
    params.push(agentName)
  }
  if (statusParam === 'ok') {
    whereParts.push("t.status = 'success'")
  } else if (statusParam === 'error') {
    whereParts.push("t.status IN ('error', 'timeout')")
  }
  if (sinceParam) {
    whereParts.push('t.started_at >= ?')
    params.push(sinceParam)
  }
  if (untilParam) {
    whereParts.push('t.started_at <= ?')
    params.push(untilParam)
  }
  if (afterParam) {
    // Cursor pagination: get traces started_at older than the cursor trace
    const cursorTrace = await c.env.NEXUS_DB.prepare(
      'SELECT started_at FROM traces WHERE id = ? AND user_id = ?'
    ).bind(afterParam, userId).first<{ started_at: string }>()
    if (!cursorTrace) {
      return c.json({ error: 'Invalid cursor: trace not found' }, 400)
    }
    whereParts.push('(t.started_at < ? OR (t.started_at = ? AND t.id < ?))')
    params.push(cursorTrace.started_at, cursorTrace.started_at, afterParam)
  }

  const whereClause = whereParts.join(' AND ')

  const [countResult, tracesResult] = await Promise.all([
    c.env.NEXUS_DB.prepare(
      `SELECT COUNT(*) as total FROM traces t JOIN agents a ON t.agent_id = a.id WHERE ${whereClause}`
    ).bind(...params).first<{ total: number }>(),
    c.env.NEXUS_DB.prepare(
      `SELECT t.id, a.name as agent_name, t.status, t.started_at, t.ended_at,
              CASE WHEN t.ended_at IS NOT NULL THEN CAST((julianday(t.ended_at) - julianday(t.started_at)) * 86400000 AS INTEGER) ELSE NULL END as duration_ms,
              (SELECT COUNT(*) FROM spans s WHERE s.trace_id = t.id) as span_count,
              t.metadata
       FROM traces t JOIN agents a ON t.agent_id = a.id
       WHERE ${whereClause}
       ORDER BY t.started_at DESC, t.id DESC
       LIMIT ?`
    ).bind(...params, effectiveLimit).all<TraceApiRow>(),
  ])

  const total = countResult?.total ?? 0
  const traces = tracesResult.results.map(formatTrace)

  return c.json(traces, 200, { 'X-Total-Count': String(total) })
})

api.get('/v1/traces/:id', async (c) => {
  const userId = c.get('userId')
  const traceId = c.req.param('id')

  const trace = await c.env.NEXUS_DB.prepare(`
    SELECT t.id, a.name as agent_name, t.status, t.started_at, t.ended_at,
           CASE WHEN t.ended_at IS NOT NULL THEN CAST((julianday(t.ended_at) - julianday(t.started_at)) * 86400000 AS INTEGER) ELSE NULL END as duration_ms,
           (SELECT COUNT(*) FROM spans s WHERE s.trace_id = t.id) as span_count,
           t.metadata
    FROM traces t JOIN agents a ON t.agent_id = a.id
    WHERE t.id = ? AND t.user_id = ?
  `).bind(traceId, userId).first<TraceApiRow>()

  if (!trace) {
    return c.json({ error: 'Trace not found' }, 404)
  }

  const spansResult = await c.env.NEXUS_DB.prepare(`
    SELECT id, name, parent_span_id, status, started_at, ended_at, input, output, error
    FROM spans WHERE trace_id = ? ORDER BY started_at ASC
  `).bind(traceId).all<SpanApiRow>()

  const spans = spansResult.results.map(span => ({
    id: span.id,
    name: span.name,
    parent_span_id: span.parent_span_id,
    status: span.status,
    started_at: span.started_at,
    ended_at: span.ended_at,
    input: span.input ? (() => { try { return JSON.parse(span.input!) } catch { return span.input } })() : null,
    output: span.output ? (() => { try { return JSON.parse(span.output!) } catch { return span.output } })() : null,
    error: span.error,
  }))

  return c.json({ ...formatTrace(trace), spans })
})

export default api
