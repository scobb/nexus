import { liveRefreshBar, liveRefreshStyle, liveRefreshScript } from '../lib/liveRefresh'

export interface TraceRow {
  id: string
  name: string
  agent_name: string
  agent_id: string
  status: string
  started_at: string
  ended_at: string | null
}

export interface AgentOption {
  id: string
  name: string
}

export interface FilterState {
  status: string   // 'all' | 'ok' | 'error'
  agent: string    // 'all' | agent UUID
  range: string    // 'today' | '7d' | '30d' | 'all'
  search: string   // free-text search term
}

export interface SpanRow {
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

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

function formatDate(iso: string): string {
  const d = new Date(iso.endsWith('Z') ? iso : iso + 'Z')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

function formatDuration(startedAt: string, endedAt: string | null): string {
  if (!endedAt) return '—'
  const start = new Date(startedAt.endsWith('Z') ? startedAt : startedAt + 'Z').getTime()
  const end = new Date(endedAt.endsWith('Z') ? endedAt : endedAt + 'Z').getTime()
  const ms = end - start
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

function navBar(email: string, activePage: 'traces' | 'keys' | 'dashboard' | 'agents' | 'billing' | 'settings'): string {
  const link = (href: string, label: string, active: boolean) =>
    `<a href="${href}" class="text-sm ${active ? 'text-white font-medium' : 'text-gray-400 hover:text-white transition-colors'}">${label}</a>`
  const mobileLink = (href: string, label: string, active: boolean) =>
    `<a href="${href}" class="block px-2 py-2.5 text-sm rounded-lg transition-colors ${active ? 'text-white font-medium bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-800'}">${label}</a>`
  return `
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <nav class="border-b border-gray-800 px-4 py-3">
    <div class="flex items-center justify-between">
      <a href="/dashboard" class="text-xl font-bold text-indigo-400">Nexus</a>
      <div class="hidden md:flex items-center gap-4 flex-wrap">
        ${link('/dashboard', 'Overview', activePage === 'dashboard')}
        ${link('/dashboard/traces', 'Traces', activePage === 'traces')}
        ${link('/dashboard/agents', 'Agents', activePage === 'agents')}
        ${link('/dashboard/keys', 'API Keys', activePage === 'keys')}
        ${link('/dashboard/billing', 'Billing', activePage === 'billing')}
        ${link('/dashboard/settings', 'Settings', activePage === 'settings')}
        <a href="/docs" class="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
        <span class="text-gray-600">|</span>
        <span class="text-sm text-gray-400">${escHtml(email)}</span>
        <form method="POST" action="/auth/logout">
          <button type="submit" class="text-sm text-gray-400 hover:text-white transition-colors">Sign out</button>
        </form>
      </div>
      <button onclick="var m=document.getElementById('mnav');m.classList.toggle('hidden')" class="md:hidden p-2 text-gray-400 hover:text-white transition-colors" aria-label="Open navigation menu">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
    <div id="mnav" class="hidden md:hidden border-t border-gray-800 mt-3 pt-2 pb-1 space-y-0.5">
      ${mobileLink('/dashboard', 'Overview', activePage === 'dashboard')}
      ${mobileLink('/dashboard/traces', 'Traces', activePage === 'traces')}
      ${mobileLink('/dashboard/agents', 'Agents', activePage === 'agents')}
      ${mobileLink('/dashboard/keys', 'API Keys', activePage === 'keys')}
      ${mobileLink('/dashboard/billing', 'Billing', activePage === 'billing')}
      ${mobileLink('/dashboard/settings', 'Settings', activePage === 'settings')}
      <a href="/docs" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Docs</a>
      <div class="border-t border-gray-800 mt-2 pt-2">
        <span class="block px-2 py-1.5 text-xs text-gray-500 truncate">${escHtml(email)}</span>
        <form method="POST" action="/auth/logout">
          <button type="submit" class="block w-full text-left px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Sign out</button>
        </form>
      </div>
    </div>
  </nav>`
}

export function tracesListPage(
  email: string,
  traces: TraceRow[],
  page: number,
  hasMore: boolean,
  totalCount: number,
  filters: FilterState,
  agents: AgentOption[]
): string {
  const rows = traces.length > 0 ? traces.map(t => `
    <tr data-trace-id="${escHtml(t.id)}" class="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
      <td class="py-3 pr-4">
        <a href="/dashboard/traces/${escHtml(t.id)}" class="text-indigo-400 hover:text-indigo-300 transition-colors font-medium text-sm">${escHtml(t.name)}</a>
      </td>
      <td class="py-3 pr-4 text-sm text-gray-300">${escHtml(t.agent_name)}</td>
      <td class="py-3 pr-4">${statusBadge(t.status)}</td>
      <td class="py-3 pr-4 text-sm text-gray-400 font-mono">${formatDuration(t.started_at, t.ended_at)}</td>
      <td class="py-3 text-sm text-gray-500">${formatDate(t.started_at)}</td>
    </tr>`).join('') : ''

  const isFiltered = filters.status !== 'all' || filters.agent !== 'all' || filters.range !== '7d' || filters.search !== ''
  const emptyState = traces.length === 0 ? `
    <div class="text-center py-16">
      ${isFiltered ? `
        <p class="text-gray-400 text-lg mb-2">No traces match your filters.</p>
        <p class="text-sm text-gray-500">Try adjusting the status, agent, date range, or search term above.</p>
      ` : `
        <p class="text-gray-400 text-lg mb-3">No traces yet.</p>
        <p class="text-sm text-gray-500 mb-4">Add the SDK to your agent to start tracking.</p>
        <div class="flex flex-col sm:flex-row justify-center gap-3">
          <a href="/docs" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-5 py-2 rounded-lg font-medium transition-colors">Read the docs →</a>
          <a href="/dashboard/keys" class="inline-block bg-gray-800 hover:bg-gray-700 text-white text-sm px-5 py-2 rounded-lg font-medium transition-colors">Create an API key</a>
        </div>
      `}
    </div>` : ''

  // Build query string preserving filters for pagination
  function filterQS(extra: Record<string, string | number> = {}): string {
    const p: Record<string, string> = {}
    if (filters.status !== 'all') p['status'] = filters.status
    if (filters.agent !== 'all') p['agent'] = filters.agent
    if (filters.range !== '7d') p['range'] = filters.range
    if (filters.search !== '') p['q'] = filters.search
    Object.assign(p, Object.fromEntries(Object.entries(extra).map(([k, v]) => [k, String(v)])))
    const qs = new URLSearchParams(p).toString()
    return qs ? '?' + qs : ''
  }

  const pagination = traces.length > 0 || page > 1 ? `
    <div class="flex items-center justify-between mt-6">
      <div>
        ${page > 1 ? `<a href="/dashboard/traces${filterQS({ page: page - 1 })}" class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">&larr; Previous</a>` : '<span class="text-sm text-gray-600">&larr; Previous</span>'}
      </div>
      <span class="text-sm text-gray-500">Page ${page}</span>
      <div>
        ${hasMore ? `<a href="/dashboard/traces${filterQS({ page: page + 1 })}" class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">Next &rarr;</a>` : '<span class="text-sm text-gray-600">Next &rarr;</span>'}
      </div>
    </div>` : ''

  const table = traces.length > 0 ? `
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
        <tbody>${rows}</tbody>
      </table>
    </div>` : ''

  const agentOptions = agents.map(a =>
    `<option value="${escHtml(a.id)}" ${filters.agent === a.id ? 'selected' : ''}>${escHtml(a.name)}</option>`
  ).join('')

  const selectCls = 'bg-gray-800 border border-gray-700 text-sm text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500'

  const filterBar = `
    <form id="trace-filters" method="GET" action="/dashboard/traces" class="mb-6">
      <div class="flex items-center gap-2 mb-3">
        <input type="text" name="q" value="${escHtml(filters.search)}"
          placeholder="Search by trace name, agent, or metadata…"
          class="flex-1 bg-gray-800 border border-gray-700 text-sm text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500 placeholder-gray-600"
        />
        <button type="submit" class="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors">Search</button>
      </div>
      <div class="flex items-center gap-3 flex-wrap">
        <select name="status" class="${selectCls}" onchange="this.form.submit()">
          <option value="all" ${filters.status === 'all' ? 'selected' : ''}>All statuses</option>
          <option value="ok" ${filters.status === 'ok' ? 'selected' : ''}>Success</option>
          <option value="error" ${filters.status === 'error' ? 'selected' : ''}>Error / Timeout</option>
        </select>
        <select name="agent" class="${selectCls}" onchange="this.form.submit()">
          <option value="all" ${filters.agent === 'all' ? 'selected' : ''}>All agents</option>
          ${agentOptions}
        </select>
        <select name="range" class="${selectCls}" onchange="this.form.submit()">
          <option value="today" ${filters.range === 'today' ? 'selected' : ''}>Today</option>
          <option value="7d" ${filters.range === '7d' ? 'selected' : ''}>Last 7 days</option>
          <option value="30d" ${filters.range === '30d' ? 'selected' : ''}>Last 30 days</option>
          <option value="all" ${filters.range === 'all' ? 'selected' : ''}>All time</option>
        </select>
        ${isFiltered ? `<a href="/dashboard/traces" class="text-sm text-gray-400 hover:text-gray-300 transition-colors">Clear</a>` : ''}
      </div>
    </form>
    <div class="text-sm text-gray-500 mb-4">${totalCount === 0 ? 'No traces' : `${totalCount.toLocaleString()} trace${totalCount === 1 ? '' : 's'}`} found</div>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Traces — Nexus</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/styles.css">
  ${liveRefreshStyle()}
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${navBar(email, 'traces')}

  <main id="main-content" class="max-w-6xl mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
      <div>
        <h1 class="text-2xl font-bold mb-1">Traces</h1>
        <p class="text-gray-400 text-sm">Agent traces across all your agents.</p>
      </div>
      ${liveRefreshBar()}
    </div>

    ${filterBar}

    <div class="bg-gray-900 rounded-xl border border-gray-800 p-6">
      ${table}
      ${emptyState}
    </div>

    ${pagination}
  </main>
  ${liveRefreshScript()}
</body>
</html>`
}

export function traceDetailPage(
  email: string,
  trace: TraceRow,
  spans: SpanRow[],
  shareToken: string | null = null,
  metadata: string | null = null
): string {
  // --- Timeline calculation ---
  const toMs = (iso: string) => new Date(iso.endsWith('Z') ? iso : iso + 'Z').getTime()
  const traceStart = toMs(trace.started_at)
  const traceEndRaw = trace.ended_at ? toMs(trace.ended_at) : null
  const spanEnds = spans.filter(s => s.ended_at).map(s => toMs(s.ended_at!))
  const maxSpanEnd = spanEnds.length > 0 ? Math.max(...spanEnds) : traceStart + 1
  const traceEnd = traceEndRaw ? Math.max(traceEndRaw, maxSpanEnd) : maxSpanEnd
  const totalDuration = Math.max(traceEnd - traceStart, 1)

  // --- Depth map (parent-child nesting) ---
  const depthMap = new Map<string, number>()
  for (const s of spans) {
    if (!s.parent_span_id) depthMap.set(s.id, 0)
  }
  for (let pass = 0; pass < 10; pass++) {
    for (const s of spans) {
      if (s.parent_span_id && !depthMap.has(s.id)) {
        const pd = depthMap.get(s.parent_span_id)
        if (pd !== undefined) depthMap.set(s.id, pd + 1)
      }
    }
  }

  // --- Timeline tick labels (5 markers) ---
  const LABEL_COL = 192 // px for span name column
  const ticks = [0, 25, 50, 75, 100].map((pct, i, arr) => {
    const ms = Math.round(totalDuration * pct / 100)
    const label = ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`
    const transform = i === 0 ? 'translateX(0)' : i === arr.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)'
    return `<span class="absolute text-xs text-gray-500 select-none" style="left:${pct}%;transform:${transform}">${label}</span>`
  }).join('')

  const tickLines = [0, 25, 50, 75, 100].map(pct =>
    `<div class="absolute inset-y-0 border-l border-gray-800/60" style="left:${pct}%"></div>`
  ).join('')

  // --- Span bar rows ---
  const spanBars = spans.map((s, i) => {
    const depth = depthMap.get(s.id) ?? 0
    const indent = depth * 16
    const spanStartMs = toMs(s.started_at)
    const spanEndMs = s.ended_at ? toMs(s.ended_at) : traceEnd
    const leftPct = Math.max(0, ((spanStartMs - traceStart) / totalDuration) * 100)
    const rawWidthPct = ((spanEndMs - spanStartMs) / totalDuration) * 100
    const widthPct = Math.max(0.3, Math.min(rawWidthPct, 100 - leftPct))

    const barColor = s.status === 'ok' ? '#22c55e' : s.status === 'error' ? '#ef4444' : '#6b7280'
    const dur = formatDuration(s.started_at, s.ended_at)
    const detailId = `sd-${i}`

    const inputSec = s.input ? `
        <div class="mb-2">
          <div class="text-xs text-gray-500 mb-1 font-medium">Input</div>
          <pre class="bg-gray-800 rounded p-2 text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap break-words">${escHtml(tryPretty(s.input))}</pre>
        </div>` : ''
    const outputSec = s.output ? `
        <div class="mb-2">
          <div class="text-xs text-gray-500 mb-1 font-medium">Output</div>
          <pre class="bg-gray-800 rounded p-2 text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap break-words">${escHtml(tryPretty(s.output))}</pre>
        </div>` : ''
    const hasError = s.error && s.error !== 'null'
    const errorSec = hasError ? `
        <div class="mb-2">
          <div class="text-xs text-red-400 mb-1 font-medium">Error</div>
          <pre class="bg-red-950 border border-red-900 rounded p-2 text-xs text-red-300 overflow-x-auto whitespace-pre-wrap break-words">${escHtml(s.error!)}</pre>
        </div>` : ''
    const hasDetails = !!(s.input || s.output || hasError)

    return `
    <div>
      <div class="flex items-center hover:bg-gray-800/40 transition-colors cursor-pointer border-b border-gray-800/50 py-1"
           onclick="(function(el){el.classList.toggle('hidden')})(document.getElementById('${detailId}'))"
           title="Click to ${hasDetails ? 'view details' : 'expand'}">
        <!-- Label column -->
        <div class="flex-shrink-0 flex items-center gap-1.5 overflow-hidden pr-2" style="width:${LABEL_COL}px;padding-left:${indent + 8}px">
          ${depth > 0 ? `<span class="text-gray-700 text-xs flex-shrink-0">└</span>` : ''}
          <span class="text-xs text-white truncate">${escHtml(s.name)}</span>
          <span class="flex-shrink-0 inline-block text-xs font-medium px-1.5 py-0.5 rounded border ${
            s.status === 'ok' ? 'bg-green-900 text-green-300 border-green-700' :
            s.status === 'error' ? 'bg-red-900 text-red-300 border-red-700' :
            'bg-gray-800 text-gray-400 border-gray-700'
          }">${escHtml(s.status)}</span>
        </div>
        <!-- Timeline bar -->
        <div class="flex-1 relative" style="height:26px">
          ${tickLines}
          <div class="absolute top-1/2 rounded flex items-center px-1 overflow-hidden"
               style="left:${leftPct.toFixed(2)}%;width:${widthPct.toFixed(2)}%;height:18px;background:${barColor};transform:translateY(-50%);min-width:4px">
            <span class="text-white text-xs font-mono whitespace-nowrap overflow-hidden leading-none" style="text-overflow:ellipsis;font-size:10px">${dur}</span>
          </div>
        </div>
      </div>
      <div id="${detailId}" class="${hasDetails ? '' : 'hidden '}border-b border-gray-800/50 bg-gray-900/50 px-6 py-3">
        ${hasDetails ? inputSec + outputSec + errorSec : '<span class="text-xs text-gray-600">No input, output, or error recorded.</span>'}
      </div>
    </div>`
  }).join('')

  const emptySpans = spans.length === 0 ? `
    <div class="text-center py-10">
      <p class="text-gray-400 mb-2">No spans recorded for this trace.</p>
      <p class="text-sm text-gray-500">
        Use <code class="bg-gray-900 text-indigo-300 px-1.5 rounded">trace.addSpan()</code> in your agent to capture individual steps.
        <a href="/docs#spans" class="text-indigo-400 hover:underline ml-1">See the docs →</a>
      </p>
    </div>` : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escHtml(trace.name)} — Nexus</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${navBar(email, 'traces')}

  <main id="main-content" class="max-w-6xl mx-auto px-4 py-8">
    <div class="mb-6">
      <nav class="text-sm text-gray-500">
        <a href="/dashboard/agents" class="hover:text-indigo-400 transition-colors">Agents</a>
        <span class="mx-2">/</span>
        <a href="/dashboard/agents/${escHtml(trace.agent_id)}" class="hover:text-indigo-400 transition-colors">${escHtml(trace.agent_name)}</a>
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
        <div class="flex items-center gap-3 flex-wrap">
          ${statusBadge(trace.status)}
          <span class="text-sm text-gray-400 font-mono">${formatDuration(trace.started_at, trace.ended_at)}</span>
          ${shareToken
            ? `<a href="/public/traces/${escHtml(shareToken)}" target="_blank" class="inline-flex items-center gap-1.5 text-xs font-medium bg-indigo-900 text-indigo-300 border border-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-800 transition-colors">&#128279; Public link</a>`
            : `<form method="POST" action="/dashboard/traces/${escHtml(trace.id)}/share">
                <button type="submit" class="inline-flex items-center gap-1.5 text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors">&#128279; Share</button>
               </form>`
          }
        </div>
      </div>
      <div class="mt-4 pt-4 border-t border-gray-800 flex gap-6 text-sm text-gray-500 flex-wrap">
        <span>Started: <span class="text-gray-400">${formatDate(trace.started_at)}</span></span>
        ${trace.ended_at ? `<span>Ended: <span class="text-gray-400">${formatDate(trace.ended_at)}</span></span>` : ''}
        <span>Spans: <span class="text-gray-400">${spans.length}</span></span>
      </div>
      ${metadata && metadata !== 'null' ? `
      <div class="mt-4 pt-4 border-t border-gray-800">
        <div class="text-xs text-gray-500 mb-2 font-medium">Metadata</div>
        <pre class="bg-gray-800 rounded p-3 text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap break-words">${escHtml(tryPretty(metadata))}</pre>
      </div>` : ''}
    </div>

    <!-- Span waterfall -->
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-base font-semibold text-gray-300">Span Waterfall</h2>
      <span class="text-xs text-gray-600">Click a row to view span details</span>
    </div>

    <div class="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      <div class="overflow-x-auto" style="min-width:0">
        ${spans.length > 0 ? `
        <div style="min-width:${LABEL_COL + 200}px">
        <!-- Timeline header -->
        <div class="flex items-end border-b border-gray-700 py-2">
          <div class="flex-shrink-0" style="width:${LABEL_COL}px">
            <span class="text-xs text-gray-500 font-medium pl-2">Span</span>
          </div>
          <div class="flex-1 relative" style="height:20px">
            ${ticks}
          </div>
        </div>
        <!-- Rows -->
        ${spanBars}
        </div>
        ` : ''}
        ${emptySpans}
      </div>
    </div>
  </main>
</body>
</html>`
}

function tryPretty(json: string): string {
  try {
    return JSON.stringify(JSON.parse(json), null, 2)
  } catch {
    return json
  }
}
