import { liveRefreshBar, liveRefreshScript } from '../lib/liveRefresh'

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

export interface HourCount {
  hour: string  // '00' to '23'
  total: number
  errors: number
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
  hourlyVolume: HourCount[]
  hasApiKey: boolean
  hasTrace: boolean
  onboardingDismissed: boolean
}

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
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

function formatHourLabel(hour: string): string {
  const h = parseInt(hour, 10)
  if (h === 0) return '12am'
  if (h < 12) return `${h}am`
  if (h === 12) return '12pm'
  return `${h - 12}pm`
}

function hourlyBarChart(hourlyVolume: HourCount[]): string {
  const totalTraces = hourlyVolume.reduce((sum, h) => sum + h.total, 0)

  if (totalTraces === 0) {
    return `<div class="flex items-center justify-center h-20 text-gray-500 text-sm">No trace data yet in the last 24 hours</div>`
  }

  const hourMap = new Map<string, { total: number; errors: number }>()
  for (const h of hourlyVolume) {
    hourMap.set(h.hour, { total: h.total, errors: h.errors })
  }
  // Rolling 24h window: start from (currentHour + 1) so the rightmost bar is "now"
  const currentHour = new Date().getUTCHours()
  const hours = Array.from({ length: 24 }, (_, i) => {
    const h = ((currentHour + 1 + i) % 24).toString().padStart(2, '0')
    return { hour: h, ...(hourMap.get(h) ?? { total: 0, errors: 0 }) }
  })

  const maxTotal = Math.max(...hours.map(h => h.total), 1)

  const svgW = 720
  const svgH = 130
  const mL = 32
  const mR = 4
  const mT = 8
  const mB = 22
  const chartW = svgW - mL - mR
  const chartH = svgH - mT - mB
  const slotW = chartW / 24
  const barW = Math.max(slotW - 4, 2)
  const bottomY = mT + chartH

  // Y-axis guide lines + labels at 0, midpoint, max
  const yLevels = [0, Math.round(maxTotal / 2), maxTotal]
  const yGuides = yLevels.map(val => {
    const y = bottomY - (val / maxTotal) * chartH
    return `<line x1="${mL}" y1="${y.toFixed(1)}" x2="${(svgW - mR).toFixed(1)}" y2="${y.toFixed(1)}" stroke="#374151" stroke-width="0.5" stroke-dasharray="3 3"/>
<text x="${(mL - 4).toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="10" fill="#6b7280">${val}</text>`
  }).join('\n')

  // Bars (green = success at bottom, red = errors stacked on top)
  const bars = hours.map(({ total, errors }, i) => {
    if (total === 0) return ''
    const x = mL + i * slotW + (slotW - barW) / 2
    const totalH = (total / maxTotal) * chartH
    const errorH = errors > 0 ? (errors / maxTotal) * chartH : 0
    const successH = totalH - errorH
    const parts: string[] = []
    if (successH > 0.5) {
      parts.push(`<rect x="${x.toFixed(1)}" y="${(bottomY - successH).toFixed(1)}" width="${barW.toFixed(1)}" height="${successH.toFixed(1)}" fill="#22c55e" rx="1"/>`)
    }
    if (errorH > 0.5) {
      parts.push(`<rect x="${x.toFixed(1)}" y="${(bottomY - totalH).toFixed(1)}" width="${barW.toFixed(1)}" height="${errorH.toFixed(1)}" fill="#ef4444" rx="1"/>`)
    }
    const hourLabel = formatHourLabel(hours[i]?.hour ?? i.toString().padStart(2, '0'))
    return `<g><title>${total} trace${total !== 1 ? 's' : ''}${errors > 0 ? ` (${errors} error${errors !== 1 ? 's' : ''})` : ''} at ${hourLabel}</title>${parts.join('')}</g>`
  }).join('\n')

  // X-axis labels every 3 hours
  const xLabels = Array.from({ length: 8 }, (_, i) => {
    const idx = i * 3
    const x = mL + idx * slotW + slotW / 2
    const hEntry = hours[idx]
    const label = hEntry ? formatHourLabel(hEntry.hour) : formatHourLabel(idx.toString().padStart(2, '0'))
    return `<text x="${x.toFixed(1)}" y="${(svgH - 4).toFixed(1)}" text-anchor="middle" font-size="10" fill="#6b7280">${label}</text>`
  }).join('\n')

  return `
    <div class="flex items-center gap-4 mb-2 text-xs text-gray-500">
      <span class="flex items-center gap-1.5"><span class="inline-block w-3 h-3 rounded-sm bg-green-500"></span>Success</span>
      <span class="flex items-center gap-1.5"><span class="inline-block w-3 h-3 rounded-sm bg-red-500"></span>Error</span>
    </div>
    <div class="w-full">
      <svg viewBox="0 0 ${svgW} ${svgH}" width="100%" height="${svgH}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        ${yGuides}
        ${bars}
        ${xLabels}
      </svg>
    </div>`
}

function onboardingChecklist(hasApiKey: boolean, hasTrace: boolean): string {
  const step = (num: number, done: boolean, title: string, desc: string, href?: string) => {
    const circle = done
      ? `<div class="flex-shrink-0 w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white text-sm">✓</div>`
      : `<div class="flex-shrink-0 w-7 h-7 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center text-gray-400 text-sm font-medium">${num}</div>`
    const titleEl = href
      ? `<a href="${escHtml(href)}" class="font-medium ${done ? 'text-gray-400 line-through' : 'text-white hover:text-indigo-300 transition-colors'}">${title}</a>`
      : `<p class="font-medium ${done ? 'text-gray-400 line-through' : 'text-white'}">${title}</p>`
    return `
      <div class="flex items-start gap-3">
        ${circle}
        <div>
          ${titleEl}
          <p class="text-sm text-gray-500 mt-0.5">${desc}</p>
        </div>
      </div>`
  }

  return `
    <div class="bg-gray-900 rounded-xl border border-indigo-900 p-5 mb-8">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-base font-semibold text-white">Get started with Nexus</h2>
          <p class="text-sm text-gray-400 mt-0.5">Complete these steps to start monitoring your agents</p>
        </div>
        <form method="POST" action="/dashboard/onboarding/dismiss">
          <button type="submit" class="text-gray-500 hover:text-gray-300 transition-colors text-lg leading-none" aria-label="Dismiss onboarding">&times;</button>
        </form>
      </div>
      <div class="space-y-4">
        ${step(1, hasApiKey, 'Create an API key', 'Generate a key to authenticate your agents with Nexus', '/dashboard/keys')}
        ${step(2, false, 'Install the SDK', 'Run: <code class="bg-gray-800 px-1.5 py-0.5 rounded text-indigo-300 text-xs">npm install @keylightdigital/nexus</code> or <code class="bg-gray-800 px-1.5 py-0.5 rounded text-indigo-300 text-xs">pip install keylightdigital-nexus</code>')}
        ${step(3, hasTrace, 'Send your first trace', 'Instrument your agent and call <code class="bg-gray-800 px-1.5 py-0.5 rounded text-indigo-300 text-xs">client.startTrace()</code>', '/docs')}
        ${step(4, false, 'Explore your data', 'View traces, spans, and agent health in your dashboard', '/dashboard/traces')}
      </div>
    </div>`
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
    const errorRatePct = a.total24h > 0 ? Math.round((a.errors24h / a.total24h) * 100) : 0
    const successRatePct = a.total24h > 0 ? (100 - errorRatePct) : null
    const isUnhealthy = errorRatePct > 10
    const borderClass = isUnhealthy ? 'border-red-700 border-l-4' : 'border-gray-800'
    const tracesUrl = `/dashboard/traces?agent=${encodeURIComponent(a.id)}`
    return `
      <a href="${escHtml(tracesUrl)}" class="block bg-gray-900 rounded-xl border ${borderClass} p-5 hover:bg-gray-800/60 transition-colors">
        <div class="flex items-start justify-between mb-3">
          <span class="font-semibold text-white">${escHtml(a.name)}</span>
          ${a.lastStatus ? statusBadge(a.lastStatus) : '<span class="text-xs text-gray-500">no traces</span>'}
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
            <p class="text-gray-300 text-xs">${a.lastTraceAt ? formatDate(a.lastTraceAt) : '—'}</p>
          </div>
        </div>
      </a>`
  }).join('') : `
    <div class="col-span-full text-center py-10">
      <p class="text-gray-400 mb-2">No agents yet.</p>
      <p class="text-sm text-gray-500 mb-3">
        Add the SDK to your agent to start tracking.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-3 mt-2">
        <a href="/docs" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors">Read the docs →</a>
        <a href="/dashboard/keys" class="inline-block bg-gray-800 hover:bg-gray-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors">Create an API key</a>
      </div>
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
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="bg-gray-950 text-white min-h-screen">
  <nav class="border-b border-gray-800 px-4 py-3">
    <div class="flex items-center justify-between">
      <a href="/dashboard" class="text-xl font-bold text-indigo-400">Nexus</a>
      <div class="hidden md:flex items-center gap-4 flex-wrap">
        <a href="/dashboard" class="text-sm text-white font-medium">Overview</a>
        <a href="/dashboard/traces" class="text-sm text-gray-400 hover:text-white transition-colors">Traces</a>
        <a href="/dashboard/agents" class="text-sm text-gray-400 hover:text-white transition-colors">Agents</a>
        <a href="/dashboard/keys" class="text-sm text-gray-400 hover:text-white transition-colors">API Keys</a>
        <a href="/dashboard/billing" class="text-sm text-gray-400 hover:text-white transition-colors">Billing</a>
        <a href="/dashboard/settings" class="text-sm text-gray-400 hover:text-white transition-colors">Settings</a>
        <a href="/docs" class="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
        <span class="text-gray-600">|</span>
        <span class="text-sm text-gray-400">${escHtml(metrics.email)}</span>
        <form method="POST" action="/auth/logout">
          <button type="submit" class="text-sm text-gray-400 hover:text-white transition-colors">Sign out</button>
        </form>
      </div>
      <button onclick="var m=document.getElementById('mnav');m.classList.toggle('hidden')" class="md:hidden p-2 text-gray-400 hover:text-white transition-colors" aria-label="Open navigation menu">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
    <div id="mnav" class="hidden md:hidden border-t border-gray-800 mt-3 pt-2 pb-1 space-y-0.5">
      <a href="/dashboard" class="block px-2 py-2.5 text-sm text-white font-medium bg-gray-800 rounded-lg">Overview</a>
      <a href="/dashboard/traces" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Traces</a>
      <a href="/dashboard/agents" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Agents</a>
      <a href="/dashboard/keys" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">API Keys</a>
      <a href="/dashboard/billing" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Billing</a>
      <a href="/dashboard/settings" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Settings</a>
      <a href="/docs" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Docs</a>
      <div class="border-t border-gray-800 mt-2 pt-2">
        <span class="block px-2 py-1.5 text-xs text-gray-500 truncate">${escHtml(metrics.email)}</span>
        <form method="POST" action="/auth/logout">
          <button type="submit" class="block w-full text-left px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Sign out</button>
        </form>
      </div>
    </div>
  </nav>

  <main class="max-w-6xl mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
      <h1 class="text-2xl font-bold">Overview</h1>
      <div class="flex items-center gap-3">
        ${liveRefreshBar()}
        <a href="/dashboard/traces" class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">View all traces &rarr;</a>
        <a href="/dashboard/keys" class="text-sm bg-indigo-600 hover:bg-indigo-500 transition-colors text-white px-3 py-1.5 rounded-lg">+ Create API key</a>
      </div>
    </div>

    ${usageBanner}

    ${(!metrics.onboardingDismissed && !(metrics.hasApiKey && metrics.hasTrace)) ? onboardingChecklist(metrics.hasApiKey, metrics.hasTrace) : ''}

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

    <!-- 24-hour trace volume (hourly chart) -->
    <div class="bg-gray-900 rounded-xl border border-gray-800 p-5 mb-6">
      <p class="text-sm font-medium text-gray-300 mb-4">Traces — last 24 hours <span class="text-xs text-gray-500 font-normal">(UTC)</span></p>
      ${hourlyBarChart(metrics.hourlyVolume)}
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
  ${liveRefreshScript()}
</body>
</html>`
}
