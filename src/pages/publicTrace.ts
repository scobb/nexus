import type { TraceRow, SpanRow } from './traces'

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

function tryPretty(json: string): string {
  try {
    return JSON.stringify(JSON.parse(json), null, 2)
  } catch {
    return json
  }
}

export function publicTracePage(trace: TraceRow, spans: SpanRow[]): string {
  // --- Timeline calculation ---
  const toMs = (iso: string) => new Date(iso.endsWith('Z') ? iso : iso + 'Z').getTime()
  const traceStart = toMs(trace.started_at)
  const traceEndRaw = trace.ended_at ? toMs(trace.ended_at) : null
  const spanEnds = spans.filter(s => s.ended_at).map(s => toMs(s.ended_at!))
  const maxSpanEnd = spanEnds.length > 0 ? Math.max(...spanEnds) : traceStart + 1
  const traceEnd = traceEndRaw ? Math.max(traceEndRaw, maxSpanEnd) : maxSpanEnd
  const totalDuration = Math.max(traceEnd - traceStart, 1)

  // --- Depth map ---
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

  // --- Timeline tick labels ---
  const LABEL_COL = 192
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
    const errorSec = s.error ? `
        <div class="mb-2">
          <div class="text-xs text-red-400 mb-1 font-medium">Error</div>
          <pre class="bg-red-950 border border-red-900 rounded p-2 text-xs text-red-300 overflow-x-auto whitespace-pre-wrap break-words">${escHtml(s.error)}</pre>
        </div>` : ''
    const hasDetails = !!(s.input || s.output || s.error)

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
      <div id="${detailId}" class="hidden border-b border-gray-800/50 bg-gray-900/50 px-6 py-3">
        ${hasDetails ? inputSec + outputSec + errorSec : '<span class="text-xs text-gray-600">No input, output, or error recorded.</span>'}
      </div>
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
  <meta name="description" content="Shared agent trace: ${escHtml(trace.name)} — monitored by Nexus">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-950 text-white min-h-screen">
  <!-- Public header -->
  <nav class="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
    <a href="/" class="text-xl font-bold text-indigo-400">Nexus</a>
    <span class="text-xs text-gray-500 bg-gray-800 border border-gray-700 px-2 py-1 rounded">Read-only shared trace</span>
  </nav>

  <main class="max-w-6xl mx-auto px-6 py-8">
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

    <!-- Span waterfall -->
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-base font-semibold text-gray-300">Span Waterfall</h2>
      <span class="text-xs text-gray-600">Click a row to view span details</span>
    </div>

    <div class="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden mb-8">
      ${spans.length > 0 ? `
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
      ` : ''}
      ${emptySpans}
    </div>

    <!-- Nexus branding CTA -->
    <div class="bg-indigo-950 border border-indigo-800 rounded-xl p-6 text-center">
      <p class="text-sm text-indigo-300 mb-1">Monitored by <span class="font-semibold text-indigo-200">Nexus</span></p>
      <p class="text-gray-400 text-sm mb-4">Simple, affordable agent observability for indie developers. $9/mo. No self-hosting.</p>
      <a href="/register" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors">
        Start monitoring your agents — free
      </a>
    </div>
  </main>
</body>
</html>`
}
