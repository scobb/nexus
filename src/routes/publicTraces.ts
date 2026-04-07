import { Hono } from 'hono'
import type { Env, HonoVariables } from '../types'
import { publicTracePage } from '../pages/publicTrace'
import type { TraceRow, SpanRow } from '../pages/traces'

const router = new Hono<{ Bindings: Env; Variables: HonoVariables }>()

router.get('/traces/:shareToken', async (c) => {
  const shareToken = c.req.param('shareToken')

  const trace = await c.env.NEXUS_DB.prepare(`
    SELECT t.id, t.name, a.name as agent_name, a.id as agent_id, t.status, t.started_at, t.ended_at
    FROM traces t
    JOIN agents a ON t.agent_id = a.id
    WHERE t.share_token = ?
  `).bind(shareToken).first<TraceRow>()

  if (!trace) {
    return c.html(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Not Found — Nexus</title><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-gray-950 text-white min-h-screen flex items-center justify-center">
  <div class="text-center">
    <p class="text-gray-400 mb-4">This shared trace link is invalid or has been removed.</p>
    <a href="/" class="text-indigo-400 hover:underline">Back to Nexus</a>
  </div>
</body>
</html>`, 404)
  }

  const spansResult = await c.env.NEXUS_DB.prepare(`
    SELECT id, name, status, started_at, ended_at, input, output, error, parent_span_id
    FROM spans
    WHERE trace_id = ?
    ORDER BY started_at ASC
  `).bind(trace.id).all<SpanRow>()

  return c.html(publicTracePage(trace, spansResult.results))
})

export default router
