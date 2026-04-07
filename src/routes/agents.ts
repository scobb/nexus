import { Hono } from 'hono'
import type { Env, HonoVariables } from '../types'
import { agentsListPage, agentTracesPage, type AgentRow } from '../pages/agents'
import type { TraceRow } from '../pages/traces'

const router = new Hono<{ Bindings: Env; Variables: HonoVariables }>()

const PAGE_SIZE = 20
const AGENTS_LIST_TTL = 3600 // 1 hour

export function agentsListCacheKey(userId: string): string {
  return `agents_list:${userId}`
}

async function getAgentsList(db: D1Database, kv: KVNamespace, userId: string): Promise<AgentRow[]> {
  const cacheKey = agentsListCacheKey(userId)
  const cached = await kv.get(cacheKey)
  if (cached) {
    try {
      return JSON.parse(cached) as AgentRow[]
    } catch {
      // Fall through to fetch fresh
    }
  }

  const agentRows = await db.prepare(`
    SELECT
      a.id,
      a.name,
      a.created_at,
      t.status as last_status,
      t.started_at as last_trace_at,
      (SELECT COUNT(*) FROM traces t2
        WHERE t2.agent_id = a.id
          AND t2.started_at >= strftime('%Y-%m-%dT%H:%M:%SZ','now','-24 hours')) as trace_count_24h
    FROM agents a
    LEFT JOIN traces t ON t.id = (
      SELECT id FROM traces WHERE agent_id = a.id ORDER BY started_at DESC LIMIT 1
    )
    WHERE a.user_id = ?
    ORDER BY a.created_at ASC
  `).bind(userId).all<AgentRow>()

  const agents = agentRows.results ?? []
  kv.put(cacheKey, JSON.stringify(agents), { expirationTtl: AGENTS_LIST_TTL }).catch(() => {})
  return agents
}

router.get('/', async (c) => {
  const userId = c.get('userId')
  const db = c.env.NEXUS_DB

  const [userRow, planRow, agents] = await Promise.all([
    db.prepare('SELECT email FROM users WHERE id = ?').bind(userId).first<{ email: string }>(),
    db.prepare(
      "SELECT plan FROM subscriptions WHERE user_id = ? AND status = 'active' ORDER BY created_at DESC LIMIT 1"
    ).bind(userId).first<{ plan: string }>(),
    getAgentsList(db, c.env.NEXUS_KV, userId),
  ])

  const plan: 'free' | 'pro' = planRow?.plan === 'pro' ? 'pro' : 'free'

  return c.html(agentsListPage(userRow?.email ?? '', agents, plan))
})

router.get('/:id', async (c) => {
  const userId = c.get('userId')
  const agentId = c.req.param('id')
  const db = c.env.NEXUS_DB

  const [userRow, agentRow] = await Promise.all([
    db.prepare('SELECT email FROM users WHERE id = ?').bind(userId).first<{ email: string }>(),
    db.prepare('SELECT id, name FROM agents WHERE id = ? AND user_id = ?')
      .bind(agentId, userId)
      .first<{ id: string; name: string }>(),
  ])

  if (!agentRow) {
    return c.text('Agent not found', 404)
  }

  const pageParam = c.req.query('page')
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1)
  const offset = (page - 1) * PAGE_SIZE

  // Fetch PAGE_SIZE+1 to detect if there's a next page
  const result = await db.prepare(`
    SELECT t.id, t.name, a.name as agent_name, a.id as agent_id, t.status, t.started_at, t.ended_at
    FROM traces t
    JOIN agents a ON t.agent_id = a.id
    WHERE t.agent_id = ? AND t.user_id = ?
    ORDER BY t.started_at DESC
    LIMIT ? OFFSET ?
  `).bind(agentId, userId, PAGE_SIZE + 1, offset).all<TraceRow>()

  const hasMore = result.results.length > PAGE_SIZE
  const traces = hasMore ? result.results.slice(0, PAGE_SIZE) : result.results

  return c.html(agentTracesPage(userRow?.email ?? '', agentRow, traces, page, hasMore))
})

export default router
