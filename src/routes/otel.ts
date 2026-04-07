import { Hono } from 'hono'
import type { Env, HonoVariables } from '../types'
import { hashApiKey } from '../lib/apiKeys'

const otel = new Hono<{ Bindings: Env; Variables: HonoVariables }>()

// ---- OTLP type definitions ----

interface AnyValue {
  stringValue?: string
  intValue?: string | number
  doubleValue?: number
  boolValue?: boolean
}

interface OtelAttribute {
  key: string
  value: AnyValue
}

interface OtelStatus {
  code?: number // 0=UNSET, 1=OK, 2=ERROR
  message?: string
}

interface OtelSpan {
  traceId: string
  spanId: string
  parentSpanId?: string
  name: string
  kind?: number
  startTimeUnixNano: string
  endTimeUnixNano?: string
  attributes?: OtelAttribute[]
  status?: OtelStatus
}

interface OtelScopeSpans {
  scope?: unknown
  spans?: OtelSpan[]
}

interface OtelResource {
  attributes?: OtelAttribute[]
}

interface OtelResourceSpans {
  resource?: OtelResource
  scopeSpans?: OtelScopeSpans[]
}

interface ExportTraceServiceRequest {
  resourceSpans?: OtelResourceSpans[]
}

// ---- Helpers ----

function nanoToISO(nano: string | undefined): string {
  if (!nano) return new Date().toISOString()
  const ms = Math.floor(Number(nano) / 1_000_000)
  return new Date(ms).toISOString()
}

function getStrAttr(attrs: OtelAttribute[] | undefined, key: string): string | undefined {
  const attr = attrs?.find(a => a.key === key)
  if (!attr) return undefined
  const v = attr.value
  if (v.stringValue !== undefined) return v.stringValue
  if (v.intValue !== undefined) return String(v.intValue)
  if (v.doubleValue !== undefined) return String(v.doubleValue)
  if (v.boolValue !== undefined) return String(v.boolValue)
  return undefined
}

function attrsToRecord(attrs: OtelAttribute[] | undefined): Record<string, string> {
  const out: Record<string, string> = {}
  for (const attr of attrs ?? []) {
    const v = getStrAttr([attr], attr.key)
    if (v !== undefined) out[attr.key] = v
  }
  return out
}

function otelCodeToTraceStatus(code?: number): string {
  return code === 2 ? 'error' : 'success'
}

function otelCodeToSpanStatus(code?: number): string {
  return code === 2 ? 'error' : 'ok'
}

function isRootSpan(span: OtelSpan): boolean {
  return (
    !span.parentSpanId ||
    span.parentSpanId === '' ||
    span.parentSpanId === '0000000000000000'
  )
}

function traceCountKey(userId: string): string {
  const now = new Date()
  const y = now.getUTCFullYear()
  const m = String(now.getUTCMonth() + 1).padStart(2, '0')
  return `trace_count:${userId}:${y}-${m}`
}

function currentMonthStart(): string {
  const now = new Date()
  const y = now.getUTCFullYear()
  const m = String(now.getUTCMonth() + 1).padStart(2, '0')
  return `${y}-${m}-01T00:00:00Z`
}

// ---- OTEL API key auth (x-api-key header, falls back to Authorization: Bearer) ----

otel.use('/*', async (c, next) => {
  let key = c.req.header('x-api-key')
  if (!key) {
    const authorization = c.req.header('Authorization')
    if (authorization?.startsWith('Bearer ')) {
      key = authorization.slice(7).trim()
    }
  }
  if (!key) {
    return c.json({ error: 'Invalid API key' }, 401)
  }

  const hash = await hashApiKey(key)
  const apiKey = await c.env.NEXUS_DB.prepare(
    'SELECT id, user_id FROM api_keys WHERE key_hash = ? AND deleted_at IS NULL'
  ).bind(hash).first<{ id: string; user_id: string }>()

  if (!apiKey) {
    return c.json({ error: 'Invalid API key' }, 401)
  }

  await c.env.NEXUS_DB.prepare(
    "UPDATE api_keys SET last_used_at = datetime('now') WHERE id = ?"
  ).bind(apiKey.id).run()

  c.set('userId', apiKey.user_id)
  await next()
})

// ---- POST /v1/traces — OTLP/HTTP JSON ingestion ----

otel.post('/traces', async (c) => {
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

  const req = body as ExportTraceServiceRequest
  if (!Array.isArray(req.resourceSpans)) {
    return c.json({ error: 'Missing resourceSpans array' }, 400)
  }

  // Fetch user plan
  const user = await c.env.NEXUS_DB.prepare(
    'SELECT plan FROM users WHERE id = ?'
  ).bind(userId).first<{ plan: string }>()

  if (!user) {
    return c.json({ error: 'Invalid API key' }, 401)
  }

  // Get current trace count for free plan enforcement
  let currentTraceCount = 0
  if (user.plan === 'free') {
    const kvKey = traceCountKey(userId)
    const cached = await c.env.NEXUS_KV.get(kvKey)
    if (cached !== null) {
      currentTraceCount = parseInt(cached, 10)
    } else {
      const result = await c.env.NEXUS_DB.prepare(
        'SELECT COUNT(*) as count FROM traces WHERE user_id = ? AND started_at >= ?'
      ).bind(userId, currentMonthStart()).first<{ count: number }>()
      currentTraceCount = result?.count ?? 0
      await c.env.NEXUS_KV.put(kvKey, String(currentTraceCount), { expirationTtl: 3600 })
    }

    if (currentTraceCount >= 1000) {
      return c.json({
        error: 'Monthly trace limit reached',
        limit: 1000,
        current: currentTraceCount,
        upgrade_url: '/dashboard/billing',
      }, 429)
    }
  }

  let tracesCreated = 0

  for (const rs of req.resourceSpans) {
    const serviceName = getStrAttr(rs.resource?.attributes, 'service.name') ?? 'unknown'

    // Find or create agent
    let dbAgentId: string
    const existingAgent = await c.env.NEXUS_DB.prepare(
      'SELECT id FROM agents WHERE user_id = ? AND name = ?'
    ).bind(userId, serviceName).first<{ id: string }>()

    if (existingAgent) {
      dbAgentId = existingAgent.id
    } else {
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
      ).bind(dbAgentId, userId, serviceName).run()
      const agent = await c.env.NEXUS_DB.prepare(
        'SELECT id FROM agents WHERE user_id = ? AND name = ?'
      ).bind(userId, serviceName).first<{ id: string }>()
      dbAgentId = agent!.id
    }

    // Collect all spans across scopeSpans
    const allSpans: OtelSpan[] = []
    for (const ss of rs.scopeSpans ?? []) {
      for (const span of ss.spans ?? []) {
        allSpans.push(span)
      }
    }

    // Group by OTEL traceId
    const byTraceId = new Map<string, OtelSpan[]>()
    for (const span of allSpans) {
      if (!span.traceId) continue
      if (!byTraceId.has(span.traceId)) byTraceId.set(span.traceId, [])
      byTraceId.get(span.traceId)!.push(span)
    }

    for (const [, spans] of byTraceId) {
      if (user.plan === 'free' && currentTraceCount >= 1000) break
      if (spans.length === 0) continue

      // Root span becomes the Nexus trace
      const rootSpan = (spans.find(isRootSpan) ?? spans[0])!

      const traceName = rootSpan.name
      const traceStatus = otelCodeToTraceStatus(rootSpan.status?.code)
      const startedAt = nanoToISO(rootSpan.startTimeUnixNano)
      const endedAt = rootSpan.endTimeUnixNano ? nanoToISO(rootSpan.endTimeUnixNano) : null

      const rootAttrs = attrsToRecord(rootSpan.attributes)
      if (rootSpan.status?.message) rootAttrs['error'] = rootSpan.status.message
      const metadataStr = Object.keys(rootAttrs).length > 0 ? JSON.stringify(rootAttrs) : null

      const nexusTraceId = crypto.randomUUID()
      await c.env.NEXUS_DB.prepare(
        `INSERT INTO traces (id, agent_id, user_id, name, status, started_at, ended_at, metadata)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(nexusTraceId, dbAgentId, userId, traceName, traceStatus, startedAt, endedAt, metadataStr).run()

      tracesCreated++
      currentTraceCount++

      // Map OTEL spanId → Nexus span UUID for parent resolution
      const otelToNexus = new Map<string, string>()
      for (const span of spans) {
        otelToNexus.set(span.spanId, crypto.randomUUID())
      }

      // Insert all spans
      for (const span of spans) {
        const nexusSpanId = otelToNexus.get(span.spanId)!
        const spanStatus = otelCodeToSpanStatus(span.status?.code)
        const spanStartedAt = nanoToISO(span.startTimeUnixNano)
        const spanEndedAt = span.endTimeUnixNano ? nanoToISO(span.endTimeUnixNano) : null

        const parentNexusId =
          !isRootSpan(span) && span.parentSpanId
            ? (otelToNexus.get(span.parentSpanId) ?? null)
            : null

        const spanAttrs = attrsToRecord(span.attributes)
        const inputStr = Object.keys(spanAttrs).length > 0 ? JSON.stringify(spanAttrs) : null
        const errorStr =
          span.status?.code === 2 ? (span.status.message ?? 'error') : null

        await c.env.NEXUS_DB.prepare(
          `INSERT INTO spans (id, trace_id, parent_span_id, name, status, started_at, ended_at, input, output, error)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          nexusSpanId, nexusTraceId, parentNexusId,
          span.name, spanStatus,
          spanStartedAt, spanEndedAt,
          inputStr, null, errorStr
        ).run()
      }
    }
  }

  // Update KV count for free users
  if (user.plan === 'free' && tracesCreated > 0) {
    const kvKey = traceCountKey(userId)
    const cached = await c.env.NEXUS_KV.get(kvKey)
    if (cached !== null) {
      await c.env.NEXUS_KV.put(
        kvKey,
        String(parseInt(cached, 10) + tracesCreated),
        { expirationTtl: 3600 }
      )
    }
  }

  // OTLP standard success response
  return c.json({})
})

export default otel
