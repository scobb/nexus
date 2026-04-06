export interface TraceRow {
  id: string
  name: string
  agent_name: string
  agent_id: string
  status: string
  started_at: string
  ended_at: string | null
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
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
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
  return `
  <nav class="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
    <a href="/dashboard" class="text-xl font-bold text-indigo-400">Nexus</a>
    <div class="flex items-center gap-4 flex-wrap">
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
  </nav>`
}

export function tracesListPage(
  email: string,
  traces: TraceRow[],
  page: number,
  hasMore: boolean
): string {
  const rows = traces.length > 0 ? traces.map(t => `
    <tr class="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
      <td class="py-3 pr-4">
        <a href="/dashboard/traces/${escHtml(t.id)}" class="text-indigo-400 hover:text-indigo-300 transition-colors font-medium text-sm">${escHtml(t.name)}</a>
      </td>
      <td class="py-3 pr-4 text-sm text-gray-300">${escHtml(t.agent_name)}</td>
      <td class="py-3 pr-4">${statusBadge(t.status)}</td>
      <td class="py-3 pr-4 text-sm text-gray-400 font-mono">${formatDuration(t.started_at, t.ended_at)}</td>
      <td class="py-3 text-sm text-gray-500">${formatDate(t.started_at)}</td>
    </tr>`).join('') : ''

  const emptyState = traces.length === 0 ? `
    <div class="text-center py-16">
      <p class="text-gray-400 text-lg mb-2">No traces yet.</p>
      <p class="text-sm text-gray-500">
        Add the SDK to your agent to start tracking.
        <a href="/dashboard/keys" class="text-indigo-400 hover:underline ml-1">Create an API key</a> to get started.
      </p>
    </div>` : ''

  const pagination = traces.length > 0 ? `
    <div class="flex items-center justify-between mt-6">
      <div>
        ${page > 1 ? `<a href="/dashboard/traces?page=${page - 1}" class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">&larr; Previous</a>` : '<span class="text-sm text-gray-600">&larr; Previous</span>'}
      </div>
      <span class="text-sm text-gray-500">Page ${page}</span>
      <div>
        ${hasMore ? `<a href="/dashboard/traces?page=${page + 1}" class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">Next &rarr;</a>` : '<span class="text-sm text-gray-600">Next &rarr;</span>'}
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

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Traces — Nexus</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${navBar(email, 'traces')}

  <main class="max-w-6xl mx-auto px-6 py-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold mb-1">Traces</h1>
      <p class="text-gray-400 text-sm">Recent agent traces across all your agents.</p>
    </div>

    <div class="bg-gray-900 rounded-xl border border-gray-800 p-6">
      ${table}
      ${emptyState}
    </div>

    ${pagination}
  </main>
</body>
</html>`
}

export function traceDetailPage(
  email: string,
  trace: TraceRow,
  spans: SpanRow[]
): string {
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
  <title>${escHtml(trace.name)} — Nexus</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${navBar(email, 'traces')}

  <main class="max-w-4xl mx-auto px-6 py-8">
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
