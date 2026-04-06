import type { Env } from '../types'

interface AlertParams {
  env: Env
  userId: string
  agentId: string    // DB UUID
  agentName: string
  traceId: string
  traceName: string
  traceStatus: string
  metadata: string | null  // JSON string
}

/** KV key for per-agent alert rate limiting (TTL 300s = 5 minutes) */
function alertRateLimitKey(agentId: string): string {
  return `alert:${agentId}`
}

/**
 * Sends an email alert when a trace ends with 'error' or 'timeout'.
 * Only fires for Pro users. Rate-limited to 1 alert per agent per 5 minutes.
 */
export async function sendAlertIfNeeded(params: AlertParams): Promise<void> {
  const { env, userId, agentId, agentName, traceId, traceName, traceStatus, metadata } = params

  // Only alert on failure statuses
  if (traceStatus !== 'error' && traceStatus !== 'timeout') return

  // Check Pro plan
  const sub = await env.NEXUS_DB.prepare(
    "SELECT plan FROM subscriptions WHERE user_id = ? AND status = 'active' ORDER BY created_at DESC LIMIT 1"
  ).bind(userId).first<{ plan: string }>()

  if (!sub || sub.plan !== 'pro') return

  // Rate limit: 1 alert per agent per 5 minutes
  const rlKey = alertRateLimitKey(agentId)
  const existing = await env.NEXUS_KV.get(rlKey)
  if (existing !== null) return  // Already alerted recently

  // Fetch user email
  const user = await env.NEXUS_DB.prepare(
    'SELECT email FROM users WHERE id = ?'
  ).bind(userId).first<{ email: string }>()

  if (!user?.email) return

  // Extract error message from metadata if available
  let errorMessage = ''
  if (metadata) {
    try {
      const meta = JSON.parse(metadata) as Record<string, unknown>
      if (meta.error && typeof meta.error === 'string') {
        errorMessage = meta.error
      }
    } catch {
      // ignore parse errors
    }
  }

  const dashboardUrl = 'https://nexus.keylightdigital.dev'
  const traceUrl = `${dashboardUrl}/dashboard/traces/${traceId}`

  const subject = `Agent alert: ${agentName} trace failed`
  const body = [
    `Your agent "${agentName}" had a trace failure.`,
    '',
    `Trace: ${traceName}`,
    `Status: ${traceStatus}`,
    errorMessage ? `Error: ${errorMessage}` : '',
    '',
    `View trace: ${traceUrl}`,
  ].filter(line => line !== undefined).join('\n')

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Nexus Alerts <alerts@keylightdigital.dev>',
        to: user.email,
        subject,
        text: body,
      }),
    })

    if (!resp.ok) {
      console.error(`Alert email failed: ${resp.status} ${await resp.text()}`)
      return
    }

    // Set rate limit key only after successful send
    await env.NEXUS_KV.put(rlKey, '1', { expirationTtl: 300 })
  } catch (err) {
    console.error('Alert email error:', err)
  }
}
