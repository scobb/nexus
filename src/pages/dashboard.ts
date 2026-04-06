export interface AgentHealth {
  id: string
  name: string
  lastStatus: string | null
  lastTraceAt: string | null
  errors24h: number
  total24h: number
}

export interface DayCount {
  day: string // YYYY-MM-DD
  count: number
}

export interface DashboardMetrics {
  email: string
  plan: 'free' | 'pro'
  tracesThisMonth: number
  totalThisMonth: number
  errorsThisMonth: number
  avgDurationMs: number | null
  agentCount: number
  agents: AgentHealth[]
  weeklyVolume: DayCount[]
}

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function formatDate(iso: string): string {
  const d = new Date(iso.endsWith('Z') ? iso : iso + 'Z')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

function statusBadge(status: string): string {
  const colors: Record<string, string> = {
    success: 'bg-green-900 text-green-300 border-green-700',
    error: 'bg-red-900 text-red-300 border-red-700',
    running: 'bg-yellow-900 text-yellow-300 border-yellow-700',
    timeout: 'bg-orange-900 text-orange-300 border-orange-700',
  }
  const cls = colors[status] ?? 'bg-gray-800 text-gray-300 border-gray-700'
  return `<span class="inline-block text-xs font-medium px-2 py-0.5 rounded border ${cls}">${escHtml(status)}</span>`
}

function weeklyBarChart(weeklyVolume: DayCount[]): string {
  // Build a map of day → count for the last 7 days
  const today = new Date()
  const days: { label: string; day: string; count: number }[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setUTCDate(d.getUTCDate() - i)
    const dayStr = d.toISOString().slice(0, 10)
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
    days.push({ label, day: dayStr, count: 0 })
  }
  for (const { day, count } of weeklyVolume) {
    const entry = days.find(d => d.day === day)
    if (entry) entry.count = count
  }

  const maxCount = Math.max(...days.map(d => d.count), 1)

  const bars = days.map(({ label, count }) => {
    const heightPct = Math.round((count / maxCount) * 100)
    const barColor = count > 0 ? 'bg-indigo-500' : 'bg-gray-700'
    return `
      <div class="flex flex-col items-center gap-1 flex-1">
        <span class="text-xs text-gray-400 font-mono">${count > 0 ? count : ''}</span>
        <div class="w-full flex items-end" style="height:60px">
          <div class="${barColor} w-full rounded-t transition-all" style="height:${Math.max(heightPct, count > 0 ? 4 : 2)}%"></div>
        </div>
        <span class="text-xs text-gray-500 text-center leading-tight">${escHtml(label)}</span>
      </div>`
  }).join('')

  return `<div class="flex items-end gap-1">${bars}</div>`
}

export function dashboardPage(metrics: DashboardMetrics): string {
  const limit = metrics.plan === 'pro' ? 50000 : 1000
  const limitLabel = metrics.plan === 'pro' ? '50,000' : '1,000'
  const usagePct = Math.min(Math.round((metrics.tracesThisMonth / limit) * 100), 100)
  const usageBarColor = usagePct >= 80 ? 'bg-red-500' : 'bg-indigo-500'
  const errorRate = metrics.totalThisMonth > 0
    ? Math.round((metrics.errorsThisMonth / metrics.totalThisMonth) * 100)
    : null
  const avgDuration = metrics.avgDurationMs != null
    ? (metrics.avgDurationMs < 1000 ? `${Math.round(metrics.avgDurationMs)}ms` : `${(metrics.avgDurationMs / 1000).toFixed(2)}s`)
    : '—'

  const agentCards = metrics.agents.length > 0 ? metrics.agents.map(a => {
    const errorRate24h = a.total24h > 0
      ? `${Math.round((a.errors24h / a.total24h) * 100)}%`
      : '—'
    return `
      <div class="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <div class="flex items-start justify-between mb-3">
          <a href="/dashboard/agents/${escHtml(a.id)}" class="font-semibold text-white hover:text-indigo-300 transition-colors">${escHtml(a.name)}</a>
          ${a.lastStatus ? statusBadge(a.lastStatus) : '<span class="text-xs text-gray-500">no traces</span>'}
        </div>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p class="text-xs text-gray-500 mb-0.5">Last trace</p>
            <p class="text-gray-300">${a.lastTraceAt ? formatDate(a.lastTraceAt) : '—'}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-0.5">24h error rate</p>
            <p class="${a.errors24h > 0 ? 'text-red-400' : 'text-gray-300'}">${errorRate24h}</p>
          </div>
        </div>
      </div>`
  }).join('') : `
    <div class="col-span-full text-center py-10">
      <p class="text-gray-400 mb-2">No agents yet.</p>
      <p class="text-sm text-gray-500">
        Add the SDK to your agent to start tracking.
        <a href="/dashboard/keys" class="text-indigo-400 hover:underline ml-1">Create an API key</a> to get started.
      </p>
    </div>`

  const usageBanner = usagePct >= 80 ? `
    <div class="mb-6 bg-red-900/30 border border-red-700 rounded-xl px-5 py-3 flex items-center justify-between">
      <span class="text-sm text-red-300">You've used ${usagePct}% of your monthly trace limit.</span>
      <a href="/dashboard/billing" class="text-sm font-medium text-red-200 hover:text-white underline ml-4">Upgrade to Pro &rarr;</a>
    </div>` : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard — Nexus</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-950 text-white min-h-screen">
  <nav class="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
    <a href="/dashboard" class="text-xl font-bold text-indigo-400">Nexus</a>
    <div class="flex items-center gap-4 flex-wrap">
      <a href="/dashboard" class="text-sm text-white font-medium">Overview</a>
      <a href="/dashboard/traces" class="text-sm text-gray-400 hover:text-white transition-colors">Traces</a>
      <a href="/dashboard/agents" class="text-sm text-gray-400 hover:text-white transition-colors">Agents</a>
      <a href="/dashboard/keys" class="text-sm text-gray-400 hover:text-white transition-colors">API Keys</a>
      <a href="/dashboard/billing" class="text-sm text-gray-400 hover:text-white transition-colors">Billing</a>
      <a href="/dashboard/settings" class="text-sm text-gray-400 hover:text-white transition-colors">Settings</a>
      <span class="text-gray-600">|</span>
      <span class="text-sm text-gray-400">${escHtml(metrics.email)}</span>
      <form method="POST" action="/auth/logout">
        <button type="submit" class="text-sm text-gray-400 hover:text-white transition-colors">Sign out</button>
      </form>
    </div>
  </nav>

  <main class="max-w-6xl mx-auto px-6 py-8">
    <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
      <h1 class="text-2xl font-bold">Overview</h1>
      <div class="flex items-center gap-3">
        <a href="/dashboard/traces" class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">View all traces &rarr;</a>
        <a href="/dashboard/keys" class="text-sm bg-indigo-600 hover:bg-indigo-500 transition-colors text-white px-3 py-1.5 rounded-lg">+ Create API key</a>
      </div>
    </div>

    ${usageBanner}

    <!-- Summary stat cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <div class="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <p class="text-xs text-gray-400 mb-1 uppercase tracking-wide">Traces this month</p>
        <p class="text-3xl font-bold">${metrics.tracesThisMonth.toLocaleString()}</p>
        <p class="text-xs text-gray-500 mt-1">of ${limitLabel} ${metrics.plan === 'pro' ? '(Pro)' : '(Free)'}</p>
      </div>
      <div class="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <p class="text-xs text-gray-400 mb-1 uppercase tracking-wide">Error rate</p>
        <p class="text-3xl font-bold ${errorRate != null && errorRate > 0 ? 'text-red-400' : ''}">${errorRate != null ? errorRate + '%' : '—'}</p>
        <p class="text-xs text-gray-500 mt-1">this month</p>
      </div>
      <div class="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <p class="text-xs text-gray-400 mb-1 uppercase tracking-wide">Avg duration</p>
        <p class="text-3xl font-bold">${avgDuration}</p>
        <p class="text-xs text-gray-500 mt-1">this month</p>
      </div>
      <div class="bg-gray-900 rounded-xl border border-gray-800 p-5">
        <p class="text-xs text-gray-400 mb-1 uppercase tracking-wide">Agents</p>
        <p class="text-3xl font-bold">${metrics.agentCount}</p>
        <p class="text-xs text-gray-500 mt-1">${metrics.plan === 'free' ? 'of 1 (Free)' : 'unlimited'}</p>
      </div>
    </div>

    <!-- Plan usage bar -->
    <div class="bg-gray-900 rounded-xl border border-gray-800 p-5 mb-8">
      <div class="flex items-center justify-between mb-2">
        <p class="text-sm font-medium text-gray-300">Monthly trace usage</p>
        <p class="text-sm text-gray-400">${metrics.tracesThisMonth.toLocaleString()} of ${limitLabel}</p>
      </div>
      <div class="w-full bg-gray-800 rounded-full h-2.5">
        <div class="${usageBarColor} h-2.5 rounded-full transition-all" style="width:${usagePct}%"></div>
      </div>
      ${usagePct >= 80 ? `<p class="text-xs text-red-400 mt-1.5"><a href="/dashboard/billing" class="hover:underline">Upgrade to Pro</a> for 50,000 traces/month.</p>` : ''}
    </div>

    <!-- 7-day trace volume -->
    <div class="bg-gray-900 rounded-xl border border-gray-800 p-5 mb-8">
      <p class="text-sm font-medium text-gray-300 mb-4">7-day trace volume</p>
      ${weeklyBarChart(metrics.weeklyVolume)}
    </div>

    <!-- Per-agent health cards -->
    <div class="mb-4">
      <h2 class="text-lg font-semibold mb-4">Agent health</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${agentCards}
      </div>
    </div>
  </main>
</body>
</html>`
}
