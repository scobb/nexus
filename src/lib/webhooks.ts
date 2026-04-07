import type { Env } from '../types'

interface WebhookPayload {
  event: 'trace.error'
  trace_id: string
  agent_name: string
  error_message: string
  started_at: string
  dashboard_url: string
}

/**
 * Fire webhook for a trace error, async and non-blocking.
 * Failures are logged but not retried (keep simple).
 */
export async function fireWebhookIfConfigured({
  env,
  userId,
  traceId,
  agentName,
  errorMessage,
  startedAt,
}: {
  env: Env
  userId: string
  traceId: string
  agentName: string
  errorMessage: string
  startedAt: string
}): Promise<void> {
  const userRow = await env.NEXUS_DB.prepare(
    'SELECT webhook_url FROM users WHERE id = ?'
  ).bind(userId).first<{ webhook_url: string | null }>()

  const webhookUrl = userRow?.webhook_url
  if (!webhookUrl) return

  const payload: WebhookPayload = {
    event: 'trace.error',
    trace_id: traceId,
    agent_name: agentName,
    error_message: errorMessage,
    started_at: startedAt,
    dashboard_url: `https://nexus.keylightdigital.dev/dashboard/traces/${traceId}`,
  }

  try {
    const resp = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!resp.ok) {
      console.error(`[webhook] POST ${webhookUrl} returned ${resp.status}`)
    }
  } catch (err) {
    console.error(`[webhook] Failed to POST ${webhookUrl}:`, err)
  }
}

/**
 * Build a sample test webhook payload for a given user.
 */
export function buildTestPayload(traceId = 'test-trace-id'): WebhookPayload {
  return {
    event: 'trace.error',
    trace_id: traceId,
    agent_name: 'my-agent',
    error_message: 'This is a test webhook from Nexus.',
    started_at: new Date().toISOString(),
    dashboard_url: `https://nexus.keylightdigital.dev/dashboard/traces/${traceId}`,
  }
}
