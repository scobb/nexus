function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

function formatDate(iso: string): string {
  const d = new Date(iso.endsWith('Z') ? iso : iso + 'Z')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

function formatDuration(startedAt: string, endedAt: string | null): string {
  if (!endedAt) return '—'
  const ms = new Date(endedAt).getTime() - new Date(startedAt).getTime()
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(2)}s`
}

function statusBadge(status: string): string {
  const colors: Record<string, string> = {
    success: 'bg-green-900 text-green-300 border-green-700',
    error: 'bg-red-900 text-red-300 border-red-700',
    running: 'bg-yellow-900 text-yellow-300 border-yellow-700',
    timeout: 'bg-orange-900 text-orange-300 border-orange-700',
    ok: 'bg-green-900 text-green-300 border-green-700',
  }
  const cls = colors[status] ?? 'bg-gray-800 text-gray-300 border-gray-700'
  return `<span class="inline-block text-xs font-medium px-2 py-0.5 rounded border ${cls}">${escHtml(status)}</span>`
}

function tryPretty(json: string): string {
  try {
    return JSON.stringify(JSON.parse(json), null, 2)
  } catch {
    return json
  }
}

// --- Hardcoded demo data ---

interface DemoTrace {
  id: string
  agent_id: string
  agent_name: string
  name: string
  status: string
  started_at: string
  ended_at: string | null
}

interface DemoSpan {
  id: string
  name: string
  status: string
  started_at: string
  ended_at: string | null
  input: string | null
  output: string | null
  error: string | null
  parent_span_id: string | null
}

export const DEMO_TRACES: DemoTrace[] = [
  // email-assistant (4 traces: 3 success, 1 error)
  { id: 'demo-t1', agent_id: 'demo-a1', agent_name: 'email-assistant', name: 'Draft reply to quarterly review', status: 'success', started_at: '2026-04-06T13:45:00Z', ended_at: '2026-04-06T13:45:01.900Z' },
  { id: 'demo-t2', agent_id: 'demo-a1', agent_name: 'email-assistant', name: 'Summarize inbox digest', status: 'success', started_at: '2026-04-06T12:30:00Z', ended_at: '2026-04-06T12:30:02.800Z' },
  { id: 'demo-t3', agent_id: 'demo-a1', agent_name: 'email-assistant', name: 'Auto-label: project update thread', status: 'error', started_at: '2026-04-06T11:15:00Z', ended_at: '2026-04-06T11:15:00.950Z' },
  { id: 'demo-t4', agent_id: 'demo-a1', agent_name: 'email-assistant', name: 'Schedule meeting follow-up', status: 'success', started_at: '2026-04-06T09:00:00Z', ended_at: '2026-04-06T09:00:01.240Z' },

  // code-review-bot (3 traces: 2 success, 1 timeout)
  { id: 'demo-t5', agent_id: 'demo-a2', agent_name: 'code-review-bot', name: 'Review PR #142 (auth module)', status: 'success', started_at: '2026-04-06T13:20:00Z', ended_at: '2026-04-06T13:20:03.900Z' },
  { id: 'demo-t6', agent_id: 'demo-a2', agent_name: 'code-review-bot', name: 'Review PR #141 (rate limiting)', status: 'success', started_at: '2026-04-06T10:45:00Z', ended_at: '2026-04-06T10:45:07.210Z' },
  { id: 'demo-t7', agent_id: 'demo-a2', agent_name: 'code-review-bot', name: 'Review PR #140 (migration fix)', status: 'timeout', started_at: '2026-04-06T08:30:00Z', ended_at: '2026-04-06T08:30:30.000Z' },

  // customer-support-agent (5 traces: 3 success, 1 error, 1 running)
  { id: 'demo-t8', agent_id: 'demo-a3', agent_name: 'customer-support-agent', name: 'Handle ticket #4821 (billing issue)', status: 'success', started_at: '2026-04-06T14:00:00Z', ended_at: '2026-04-06T14:00:02.340Z' },
  { id: 'demo-t9', agent_id: 'demo-a3', agent_name: 'customer-support-agent', name: 'Handle ticket #4820 (password reset)', status: 'success', started_at: '2026-04-06T13:50:00Z', ended_at: '2026-04-06T13:50:01.680Z' },
  { id: 'demo-t10', agent_id: 'demo-a3', agent_name: 'customer-support-agent', name: 'Handle ticket #4819 (refund request)', status: 'error', started_at: '2026-04-06T13:10:00Z', ended_at: '2026-04-06T13:10:02.990Z' },
  { id: 'demo-t11', agent_id: 'demo-a3', agent_name: 'customer-support-agent', name: 'Handle ticket #4818 (integration help)', status: 'running', started_at: '2026-04-06T14:05:00Z', ended_at: null },
  { id: 'demo-t12', agent_id: 'demo-a3', agent_name: 'customer-support-agent', name: 'Handle ticket #4817 (upgrade question)', status: 'success', started_at: '2026-04-06T11:30:00Z', ended_at: '2026-04-06T11:30:01.990Z' },
]

export const DEMO_SPANS: Record<string, DemoSpan[]> = {
  'demo-t1': [
    { id: 's1-1', name: 'classify-intent', status: 'ok', started_at: '2026-04-06T13:45:00.000Z', ended_at: '2026-04-06T13:45:00.340Z', input: JSON.stringify({ message: 'Re: Q4 review session — can we move to Thursday?' }), output: JSON.stringify({ intent: 'meeting_reschedule', priority: 'medium', requires_reply: true }), error: null, parent_span_id: null },
    { id: 's1-2', name: 'fetch-calendar-context', status: 'ok', started_at: '2026-04-06T13:45:00.350Z', ended_at: '2026-04-06T13:45:00.440Z', input: JSON.stringify({ date_range: '2026-04-06 to 2026-04-10', calendar: 'primary' }), output: JSON.stringify({ available_slots: ['Thu Apr 10 2pm', 'Thu Apr 10 3pm', 'Thu Apr 10 4pm'] }), error: null, parent_span_id: null },
    { id: 's1-3', name: 'draft-reply', status: 'ok', started_at: '2026-04-06T13:45:00.450Z', ended_at: '2026-04-06T13:45:01.680Z', input: JSON.stringify({ intent: 'meeting_reschedule', slots: ['Thu Apr 10 2pm', 'Thu Apr 10 3pm'] }), output: JSON.stringify({ subject: 'Re: Q4 review session', body: "Hi — Thursday works great. I'm free at 2pm or 3pm. Let me know which you prefer!" }), error: null, parent_span_id: null },
    { id: 's1-4', name: 'send-email', status: 'ok', started_at: '2026-04-06T13:45:01.690Z', ended_at: '2026-04-06T13:45:01.900Z', input: JSON.stringify({ to: 'john@example.com', subject: 'Re: Q4 review session' }), output: JSON.stringify({ message_id: 'msg_abc123', status: 'sent' }), error: null, parent_span_id: null },
  ],
  'demo-t3': [
    { id: 's3-1', name: 'classify-thread', status: 'ok', started_at: '2026-04-06T11:15:00.000Z', ended_at: '2026-04-06T11:15:00.320Z', input: JSON.stringify({ subject: 'Project Nexus — week 2 update', sender: 'team@acme.com' }), output: JSON.stringify({ category: 'project_update', suggested_label: 'nexus-updates' }), error: null, parent_span_id: null },
    { id: 's3-2', name: 'apply-label', status: 'error', started_at: '2026-04-06T11:15:00.330Z', ended_at: '2026-04-06T11:15:00.950Z', input: JSON.stringify({ label: 'nexus-updates', message_id: 'msg_xyz789' }), output: null, error: 'Gmail API error: Label "nexus-updates" not found. Available labels: inbox, starred, important', parent_span_id: null },
  ],
  'demo-t5': [
    { id: 's5-1', name: 'fetch-pr-diff', status: 'ok', started_at: '2026-04-06T13:20:00.000Z', ended_at: '2026-04-06T13:20:00.450Z', input: JSON.stringify({ repo: 'acme/api', pr: 142 }), output: JSON.stringify({ files_changed: 4, additions: 87, deletions: 23, languages: ['TypeScript'] }), error: null, parent_span_id: null },
    { id: 's5-2', name: 'analyze-security', status: 'ok', started_at: '2026-04-06T13:20:00.460Z', ended_at: '2026-04-06T13:20:01.820Z', input: JSON.stringify({ focus: 'auth module', checklist: ['injection', 'auth bypass', 'session fixation'] }), output: JSON.stringify({ issues: [], notes: 'Token validation correct. bcrypt cost factor 12 is acceptable.' }), error: null, parent_span_id: 's5-1' },
    { id: 's5-3', name: 'analyze-code-quality', status: 'ok', started_at: '2026-04-06T13:20:01.830Z', ended_at: '2026-04-06T13:20:03.210Z', input: JSON.stringify({ style: 'strict', complexity_threshold: 10 }), output: JSON.stringify({ suggestions: ['Extract token refresh logic (complexity: 12)', 'Add JSDoc to validateSession()'] }), error: null, parent_span_id: 's5-1' },
    { id: 's5-4', name: 'post-review-comment', status: 'ok', started_at: '2026-04-06T13:20:03.220Z', ended_at: '2026-04-06T13:20:03.900Z', input: JSON.stringify({ summary: 'LGTM with 2 minor suggestions', approved: false }), output: JSON.stringify({ comment_id: 987654, url: 'https://github.com/acme/api/pull/142#issuecomment-987654' }), error: null, parent_span_id: null },
  ],
  'demo-t7': [
    { id: 's7-1', name: 'fetch-pr-diff', status: 'ok', started_at: '2026-04-06T08:30:00.000Z', ended_at: '2026-04-06T08:30:00.380Z', input: JSON.stringify({ repo: 'acme/api', pr: 140 }), output: JSON.stringify({ files_changed: 12, additions: 340, deletions: 89 }), error: null, parent_span_id: null },
    { id: 's7-2', name: 'analyze-migration', status: 'error', started_at: '2026-04-06T08:30:00.390Z', ended_at: '2026-04-06T08:30:30.000Z', input: JSON.stringify({ migration_files: ['0012_add_indexes.sql', '0013_cascade_deletes.sql'] }), output: null, error: 'LLM request timed out after 30s — model context limit likely exceeded for large diff', parent_span_id: null },
  ],
  'demo-t8': [
    { id: 's8-1', name: 'fetch-ticket', status: 'ok', started_at: '2026-04-06T14:00:00.000Z', ended_at: '2026-04-06T14:00:00.120Z', input: JSON.stringify({ ticket_id: 4821, system: 'zendesk' }), output: JSON.stringify({ subject: 'Incorrect charge on invoice #2024-03', priority: 'high', customer_tier: 'pro' }), error: null, parent_span_id: null },
    { id: 's8-2', name: 'lookup-billing-history', status: 'ok', started_at: '2026-04-06T14:00:00.130Z', ended_at: '2026-04-06T14:00:00.510Z', input: JSON.stringify({ customer_id: 'cus_abc123', months: 3 }), output: JSON.stringify({ invoices: [{ id: '2024-03', amount: 9.00, status: 'paid' }], discrepancy: 'Charged $18 instead of $9 — duplicate subscription event' }), error: null, parent_span_id: null },
    { id: 's8-3', name: 'generate-response', status: 'ok', started_at: '2026-04-06T14:00:00.520Z', ended_at: '2026-04-06T14:00:01.740Z', input: JSON.stringify({ tone: 'empathetic', action: 'refund', amount: 9.00 }), output: JSON.stringify({ response: "Hi! I can see there was a billing error. I've issued a $9 refund — you should see it in 3-5 business days." }), error: null, parent_span_id: null },
    { id: 's8-4', name: 'issue-refund', status: 'ok', started_at: '2026-04-06T14:00:01.750Z', ended_at: '2026-04-06T14:00:02.120Z', input: JSON.stringify({ customer_id: 'cus_abc123', amount: 9.00, reason: 'duplicate_charge' }), output: JSON.stringify({ refund_id: 're_xyz456', status: 'succeeded' }), error: null, parent_span_id: null },
    { id: 's8-5', name: 'close-ticket', status: 'ok', started_at: '2026-04-06T14:00:02.130Z', ended_at: '2026-04-06T14:00:02.340Z', input: JSON.stringify({ ticket_id: 4821, status: 'solved' }), output: JSON.stringify({ updated: true }), error: null, parent_span_id: null },
  ],
  'demo-t10': [
    { id: 's10-1', name: 'fetch-ticket', status: 'ok', started_at: '2026-04-06T13:10:00.000Z', ended_at: '2026-04-06T13:10:00.110Z', input: JSON.stringify({ ticket_id: 4819 }), output: JSON.stringify({ subject: 'Refund for annual plan — changed my mind', customer_id: 'cus_def456' }), error: null, parent_span_id: null },
    { id: 's10-2', name: 'check-refund-eligibility', status: 'ok', started_at: '2026-04-06T13:10:00.120Z', ended_at: '2026-04-06T13:10:00.480Z', input: JSON.stringify({ customer_id: 'cus_def456', plan: 'annual' }), output: JSON.stringify({ eligible: false, reason: 'Outside 30-day refund window (subscription is 45 days old)' }), error: null, parent_span_id: null },
    { id: 's10-3', name: 'generate-response', status: 'error', started_at: '2026-04-06T13:10:00.490Z', ended_at: '2026-04-06T13:10:02.990Z', input: JSON.stringify({ outcome: 'denied', policy: 'outside_window', empathy_level: 'high' }), output: null, error: 'Anthropic API error: 529 Overloaded — model capacity exceeded, retry after 30s', parent_span_id: null },
  ],
}

// ---- Computed demo stats ----

function computeDemoStats() {
  const total = DEMO_TRACES.length // 12
  const errors = DEMO_TRACES.filter(t => t.status === 'error' || t.status === 'timeout').length // 3
  const errorRate = Math.round((errors / total) * 100) // 25%

  const durations = DEMO_TRACES
    .filter(t => t.ended_at)
    .map(t => new Date(t.ended_at!).getTime() - new Date(t.started_at).getTime())
  const avgMs = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)

  return { total, errorRate, avgMs }
}

function demoWeeklyBars(): string {
  // Fixed counts per day-slot (oldest → newest), always relative to today
  const counts = [3, 5, 7, 4, 6, 8, 12]
  const today = new Date()
  const days = counts.map((count, i) => {
    const d = new Date(today)
    d.setUTCDate(d.getUTCDate() - (6 - i))
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
    return { label, count }
  })
  const maxCount = Math.max(...days.map(d => d.count), 1)
  const bars = days.map(({ label, count }) => {
    const heightPct = Math.round((count / maxCount) * 100)
    return `
      <div class="flex flex-col items-center gap-1 flex-1">
        <span class="text-xs text-gray-400 font-mono">${count}</span>
        <div class="w-full flex items-end" style="height:60px">
          <div class="bg-indigo-500 w-full rounded-t transition-all" style="height:${Math.max(heightPct, 4)}%"></div>
        </div>
        <span class="text-xs text-gray-500 text-center leading-tight">${escHtml(label)}</span>
      </div>`
  }).join('')
  return `<div class="flex items-end gap-1">${bars}</div>`
}

const DEMO_AGENT_CARDS = [
  { id: 'demo-a1', name: 'email-assistant', lastStatus: 'success', lastTraceAt: '2026-04-06T13:45:00Z', errors24h: 1, total24h: 4 },
  { id: 'demo-a2', name: 'code-review-bot', lastStatus: 'success', lastTraceAt: '2026-04-06T13:20:00Z', errors24h: 1, total24h: 3 },
  { id: 'demo-a3', name: 'customer-support-agent', lastStatus: 'running', lastTraceAt: '2026-04-06T14:05:00Z', errors24h: 1, total24h: 5 },
]

const DEMO_BANNER = `
  <div class="bg-indigo-950 border-b border-indigo-700 px-6 py-3 flex items-center justify-between flex-wrap gap-2">
    <span class="text-sm text-indigo-200">
      <span class="font-semibold text-white">Demo mode</span> — sample data only.
      This is what Nexus looks like when your agents are running.
    </span>
    <a href="/register" class="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors px-4 py-1.5 rounded-lg whitespace-nowrap">
      Sign up free &rarr;
    </a>
  </div>`

const DEMO_NAV = `
  <nav class="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
    <a href="/" class="text-xl font-bold text-indigo-400">Nexus</a>
    <div class="flex items-center gap-4">
      <a href="/demo" class="text-sm text-white font-medium">Overview</a>
      <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 transition-colors text-white px-3 py-1.5 rounded-lg">Get started free</a>
    </div>
  </nav>`

export function demoOverviewPage(): string {
  const { total, errorRate, avgMs } = computeDemoStats()
  const avgDuration = avgMs < 1000 ? `${avgMs}ms` : `${(avgMs / 1000).toFixed(2)}s`

  const agentCards = DEMO_AGENT_CARDS.map(a => {
    const errorRatePct = a.total24h > 0 ? Math.round((a.errors24h / a.total24h) * 100) : 0
    const successRatePct = a.total24h > 0 ? (100 - errorRatePct) : null
    const isUnhealthy = errorRatePct > 10
    const borderClass = isUnhealthy ? 'border-red-700 border-l-4' : 'border-gray-800'
    return `
      <div class="bg-gray-900 rounded-xl border ${borderClass} p-5">
        <div class="flex items-start justify-between mb-3">
          <span class="font-semibold text-white">${escHtml(a.name)}</span>
          ${statusBadge(a.lastStatus ?? '')}
        </div>
        <div class="grid grid-cols-3 gap-2 text-sm">
          <div>
            <p class="text-xs text-gray-500 mb-0.5">Traces (24h)</p>
            <p class="text-gray-300">${a.total24h}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-0.5">Success rate</p>
            <p class="${isUnhealthy ? 'text-red-400' : 'text-gray-300'}">${successRatePct !== null ? successRatePct + '%' : '—'}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-0.5">Last active</p>
            <p class="text-gray-300 text-xs">${formatDate(a.lastTraceAt)}</p>
          </div>
        </div>
      </div>`
  }).join('')

  const traceRows = DEMO_TRACES.map(t => `
    <tr class="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
      <td class="py-3 pr-4">
        <a href="/demo/traces/${escHtml(t.id)}" class="text-indigo-400 hover:text-indigo-300 transition-colors font-medium text-sm">${escHtml(t.name)}</a>
      </td>
      <td class="py-3 pr-4 text-sm text-gray-300">${escHtml(t.agent_name)}</td>
      <td class="py-3 pr-4">${statusBadge(t.status)}</td>
      <td class="py-3 pr-4 text-sm text-gray-400 font-mono">${formatDuration(t.started_at, t.ended_at)}</td>
      <td class="py-3 text-sm text-gray-500">${formatDate(t.started_at)}</td>
    </tr>`).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Live Demo — Nexus AI Agent Observability</title>
  <meta name="description" content="See Nexus in action — browse sample AI agent traces, spans, and a live dashboard. No sign-up required.">
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <!-- Beam Analytics (dogfooding) -->
  <script defer src="https://beam.keylightdigital.dev/js/beam.js" data-site-id="dee2fad9-ca65-4746-aa74-6480534507ef"></script>
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${DEMO_BANNER}
  ${DEMO_NAV}

  <main class="max-w-6xl mx-auto px-6 py-8">
    <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
      <div>
        <h1 class="text-2xl font-bold">Overview</h1>
        <p class="text-sm text-gray-500 mt-0.5">3 agents · sample data from a typical day</p>
      </div>
      <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 transition-colors text-white px-4 py-2 rounded-lg font-medium">
        Instrument your own agents &rarr;
      </a>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <div class="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <p class="text-xs text-gray-400 mb-1 uppercase tracking-wide">Traces this month</p>
        <p class="text-3xl font-bold">${total}</p>
        <p class="text-xs text-gray-500 mt-1">of 1,000 (Free)</p>
      </div>
      <div class="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <p class="text-xs text-gray-400 mb-1 uppercase tracking-wide">Error rate</p>
        <p class="text-3xl font-bold text-red-400">${errorRate}%</p>
        <p class="text-xs text-gray-500 mt-1">this month</p>
      </div>
      <div class="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <p class="text-xs text-gray-400 mb-1 uppercase tracking-wide">Avg duration</p>
        <p class="text-3xl font-bold">${escHtml(avgDuration)}</p>
        <p class="text-xs text-gray-500 mt-1">this month</p>
      </div>
      <div class="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <p class="text-xs text-gray-400 mb-1 uppercase tracking-wide">Agents</p>
        <p class="text-3xl font-bold">3</p>
        <p class="text-xs text-gray-500 mt-1">of 1 (Free)</p>
      </div>
    </div>

    <!-- 7-day volume -->
    <div class="bg-gray-900 rounded-xl border border-gray-800 p-5 mb-8">
      <p class="text-sm font-medium text-gray-300 mb-4">7-day trace volume</p>
      ${demoWeeklyBars()}
    </div>

    <!-- Agent health -->
    <div class="mb-8">
      <h2 class="text-lg font-semibold mb-4">Agent health</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        ${agentCards}
      </div>
    </div>

    <!-- Recent traces -->
    <div class="mb-4">
      <h2 class="text-lg font-semibold mb-4">Recent traces</h2>
      <div class="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div class="overflow-x-auto">
          <table class="w-full text-sm min-w-[600px]">
            <thead>
              <tr class="border-b border-gray-800 text-left text-gray-400">
                <th class="pb-3 pr-4 font-medium">Trace</th>
                <th class="pb-3 pr-4 font-medium">Agent</th>
                <th class="pb-3 pr-4 font-medium">Status</th>
                <th class="pb-3 pr-4 font-medium">Duration</th>
                <th class="pb-3 font-medium">Started</th>
              </tr>
            </thead>
            <tbody>${traceRows}</tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="mt-12 text-center bg-gray-900 rounded-2xl border border-gray-800 px-8 py-10">
      <h2 class="text-2xl font-bold mb-2">Ready to monitor your agents?</h2>
      <p class="text-gray-400 mb-6">Drop in 3 lines of code. See traces in seconds. Free to start.</p>
      <a href="/register" class="inline-block bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold px-8 py-3 rounded-xl text-lg">
        Start free &rarr;
      </a>
      <p class="text-xs text-gray-600 mt-4">No credit card required · 1,000 traces/month free forever</p>
    </div>
  </main>
</body>
</html>`
}

export function demoTraceDetailPage(traceId: string): string {
  const trace = DEMO_TRACES.find(t => t.id === traceId)
  if (!trace) {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Not Found — Nexus</title><link rel="stylesheet" href="/styles.css"></head>
<body class="bg-gray-950 text-white min-h-screen flex items-center justify-center">
  <div class="text-center">
    <p class="text-gray-400 mb-4">Trace not found.</p>
    <a href="/demo" class="text-indigo-400 hover:underline">Back to demo</a>
  </div>
</body>
</html>`
  }

  const spans = DEMO_SPANS[traceId] ?? []

  const spanRows = spans.map((s, i) => {
    const indent = s.parent_span_id ? 'pl-8' : 'pl-0'
    const inputSection = s.input ? `
      <details class="mt-2">
        <summary class="text-xs text-gray-500 cursor-pointer hover:text-gray-300 transition-colors select-none">Input</summary>
        <pre class="mt-1 bg-gray-800 rounded p-2 text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap break-words">${escHtml(tryPretty(s.input))}</pre>
      </details>` : ''
    const outputSection = s.output ? `
      <details class="mt-2">
        <summary class="text-xs text-gray-500 cursor-pointer hover:text-gray-300 transition-colors select-none">Output</summary>
        <pre class="mt-1 bg-gray-800 rounded p-2 text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap break-words">${escHtml(tryPretty(s.output))}</pre>
      </details>` : ''
    const errorSection = s.error ? `
      <details class="mt-2" open>
        <summary class="text-xs text-red-400 cursor-pointer hover:text-red-300 transition-colors select-none">Error</summary>
        <pre class="mt-1 bg-red-950 border border-red-900 rounded p-2 text-xs text-red-300 overflow-x-auto whitespace-pre-wrap break-words">${escHtml(s.error)}</pre>
      </details>` : ''
    const hasDetails = s.input || s.output || s.error

    return `
    <div class="border border-gray-800 rounded-lg p-4 ${indent} ${i > 0 ? 'mt-3' : ''}">
      <div class="flex items-center gap-3 flex-wrap">
        <span class="font-medium text-sm text-white">${escHtml(s.name)}</span>
        ${statusBadge(s.status)}
        <span class="text-xs text-gray-500 font-mono">${formatDuration(s.started_at, s.ended_at)}</span>
        ${s.parent_span_id ? '<span class="text-xs text-gray-600">nested</span>' : ''}
      </div>
      ${hasDetails ? `<div class="mt-1">${inputSection}${outputSection}${errorSection}</div>` : ''}
    </div>`
  }).join('')

  const emptySpans = spans.length === 0 ? `
    <div class="text-center py-8 text-gray-500 text-sm">No spans recorded for this trace.</div>` : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escHtml(trace.name)} — Nexus Demo</title>
  <meta name="description" content="Sample trace: ${escHtml(trace.name)} from ${escHtml(trace.agent_name)}. See how Nexus visualizes AI agent traces and spans.">
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <!-- Beam Analytics (dogfooding) -->
  <script defer src="https://beam.keylightdigital.dev/js/beam.js" data-site-id="dee2fad9-ca65-4746-aa74-6480534507ef"></script>
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${DEMO_BANNER}
  ${DEMO_NAV}

  <main class="max-w-4xl mx-auto px-6 py-8">
    <div class="mb-6">
      <nav class="text-sm text-gray-500">
        <a href="/demo" class="hover:text-indigo-400 transition-colors">Demo</a>
        <span class="mx-2">/</span>
        <span class="text-gray-300">${escHtml(trace.agent_name)}</span>
        <span class="mx-2">/</span>
        <span class="text-gray-300">${escHtml(trace.name)}</span>
      </nav>
    </div>

    <!-- Trace header -->
    <div class="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
      <div class="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 class="text-xl font-bold mb-1">${escHtml(trace.name)}</h1>
          <p class="text-sm text-gray-400">Agent: <span class="text-gray-300">${escHtml(trace.agent_name)}</span></p>
        </div>
        <div class="flex items-center gap-3">
          ${statusBadge(trace.status)}
          <span class="text-sm text-gray-400 font-mono">${formatDuration(trace.started_at, trace.ended_at)}</span>
        </div>
      </div>
      <div class="mt-4 pt-4 border-t border-gray-800 flex gap-6 text-sm text-gray-500 flex-wrap">
        <span>Started: <span class="text-gray-400">${formatDate(trace.started_at)}</span></span>
        ${trace.ended_at ? `<span>Ended: <span class="text-gray-400">${formatDate(trace.ended_at)}</span></span>` : ''}
        <span>Spans: <span class="text-gray-400">${spans.length}</span></span>
      </div>
    </div>

    <!-- Spans waterfall -->
    <div class="mb-4">
      <h2 class="text-base font-semibold text-gray-300">Spans</h2>
    </div>

    <div>
      ${spanRows}
      ${emptySpans}
    </div>

    <!-- CTA -->
    <div class="mt-10 bg-gray-900 border border-indigo-800 rounded-xl px-6 py-6 text-center">
      <p class="text-gray-300 mb-4">
        <span class="font-semibold text-white">Like what you see?</span>
        Instrument your own agents with 3 lines of code.
      </p>
      <a href="/register" class="inline-block bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold px-6 py-2.5 rounded-lg">
        Start free — no credit card required
      </a>
    </div>
  </main>
</body>
</html>`
}
