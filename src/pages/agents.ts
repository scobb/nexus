import type { TraceRow } from './traces'

export interface AgentRow {
  id: string
  name: string
  created_at: string
  last_status: string | null
  last_trace_at: string | null
  trace_count_24h: number
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

function navBar(email: string): string {
  return `
  <nav class="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
    <a href="/dashboard" class="text-xl font-bold text-indigo-400">Nexus</a>
    <div class="flex items-center gap-4 flex-wrap">
      <a href="/dashboard" class="text-sm text-gray-400 hover:text-white transition-colors">Overview</a>
      <a href="/dashboard/traces" class="text-sm text-gray-400 hover:text-white transition-colors">Traces</a>
      <a href="/dashboard/agents" class="text-sm text-white font-medium">Agents</a>
      <a href="/dashboard/keys" class="text-sm text-gray-400 hover:text-white transition-colors">API Keys</a>
      <a href="/dashboard/billing" class="text-sm text-gray-400 hover:text-white transition-colors">Billing</a>
      <a href="/dashboard/settings" class="text-sm text-gray-400 hover:text-white transition-colors">Settings</a>
      <a href="/docs" class="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
      <span class="text-gray-600">|</span>
      <span class="text-sm text-gray-400">${escHtml(email)}</span>
      <form method="POST" action="/auth/logout">
        <button type="submit" class="text-sm text-gray-400 hover:text-white transition-colors">Sign out</button>
      </form>
    </div>
  </nav>`
}

export function agentsListPage(
  email: string,
  agents: AgentRow[],
  plan: 'free' | 'pro'
): string {
  const showUpgradePrompt = plan === 'free' && agents.length > 1

  const upgradePrompt = showUpgradePrompt ? `
    <div class="mb-6 bg-yellow-900/30 border border-yellow-700 rounded-xl px-5 py-3 flex items-center justify-between flex-wrap gap-3">
      <span class="text-sm text-yellow-300">Free plan is limited to 1 agent. You have ${agents.length} agents.</span>
      <a href="/dashboard/billing" class="text-sm font-medium text-yellow-200 hover:text-white underline">Upgrade to Pro &rarr;</a>
    </div>` : ''

  const rows = agents.length > 0 ? agents.map(a => {
    const errorRate = a.trace_count_24h > 0 ? '' : ''
    return `
    <tr class="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
      <td class="py-3 pr-4">
        <a href="/dashboard/agents/${escHtml(a.id)}" class="text-indigo-400 hover:text-indigo-300 transition-colors font-medium text-sm">${escHtml(a.name)}</a>
      </td>
      <td class="py-3 pr-4">
        ${a.last_status ? statusBadge(a.last_status) : '<span class="text-xs text-gray-600">no traces</span>'}
      </td>
      <td class="py-3 pr-4 text-sm text-gray-400">
        ${a.last_trace_at ? formatDate(a.last_trace_at) : '<span class="text-gray-600">—</span>'}
      </td>
      <td class="py-3 pr-4 text-sm text-gray-400 font-mono">
        ${a.trace_count_24h > 0 ? a.trace_count_24h : '<span class="text-gray-600">0</span>'}
      </td>
      <td class="py-3 text-sm text-gray-500">${formatDate(a.created_at)}</td>
    </tr>`
  }).join('') : ''

  const emptyState = agents.length === 0 ? `
    <div class="text-center py-16">
      <p class="text-gray-400 text-lg mb-2">No agents yet.</p>
      <p class="text-sm text-gray-500">
        Agents are created automatically when your first trace arrives.
        <a href="/dashboard/keys" class="text-indigo-400 hover:underline ml-1">Create an API key</a> to get started.
      </p>
    </div>` : ''

  const table = agents.length > 0 ? `
    <div class="overflow-x-auto">
      <table class="w-full text-sm min-w-[600px]">
        <thead>
          <tr class="border-b border-gray-800 text-left text-gray-400">
            <th class="pb-3 pr-4 font-medium">Agent</th>
            <th class="pb-3 pr-4 font-medium">Last Status</th>
            <th class="pb-3 pr-4 font-medium">Last Trace</th>
            <th class="pb-3 pr-4 font-medium">24h Traces</th>
            <th class="pb-3 font-medium">Created</th>
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
  <title>Agents — Nexus</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${navBar(email)}

  <main class="max-w-6xl mx-auto px-6 py-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold mb-1">Agents</h1>
      <p class="text-gray-400 text-sm">All registered agents and their health status.</p>
    </div>

    ${upgradePrompt}

    <div class="bg-gray-900 rounded-xl border border-gray-800 p-6">
      ${table}
      ${emptyState}
    </div>
  </main>
</body>
</html>`
}

export function agentTracesPage(
  email: string,
  agent: { id: string; name: string },
  traces: TraceRow[],
  page: number,
  hasMore: boolean
): string {
  const PAGE_SIZE = 20

  const rows = traces.length > 0 ? traces.map(t => `
    <tr class="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
      <td class="py-3 pr-4">
        <a href="/dashboard/traces/${escHtml(t.id)}" class="text-indigo-400 hover:text-indigo-300 transition-colors font-medium text-sm">${escHtml(t.name)}</a>
      </td>
      <td class="py-3 pr-4">${statusBadge(t.status)}</td>
      <td class="py-3 pr-4 text-sm text-gray-400 font-mono">${formatDuration(t.started_at, t.ended_at)}</td>
      <td class="py-3 text-sm text-gray-500">${formatDate(t.started_at)}</td>
    </tr>`).join('') : ''

  const emptyState = traces.length === 0 ? `
    <div class="text-center py-16">
      <p class="text-gray-400 text-lg mb-2">No traces yet for this agent.</p>
      <p class="text-sm text-gray-500">Traces will appear here as your agent runs.</p>
    </div>` : ''

  const pagination = traces.length > 0 ? `
    <div class="flex items-center justify-between mt-6">
      <div>
        ${page > 1
          ? `<a href="/dashboard/agents/${escHtml(agent.id)}?page=${page - 1}" class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">&larr; Previous</a>`
          : '<span class="text-sm text-gray-600">&larr; Previous</span>'}
      </div>
      <span class="text-sm text-gray-500">Page ${page}</span>
      <div>
        ${hasMore
          ? `<a href="/dashboard/agents/${escHtml(agent.id)}?page=${page + 1}" class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">Next &rarr;</a>`
          : '<span class="text-sm text-gray-600">Next &rarr;</span>'}
      </div>
    </div>` : ''

  const table = traces.length > 0 ? `
    <div class="overflow-x-auto">
      <table class="w-full text-sm min-w-[500px]">
        <thead>
          <tr class="border-b border-gray-800 text-left text-gray-400">
            <th class="pb-3 pr-4 font-medium">Trace</th>
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
  <title>${escHtml(agent.name)} — Agents — Nexus</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${navBar(email)}

  <main class="max-w-6xl mx-auto px-6 py-8">
    <div class="mb-6">
      <nav class="text-sm text-gray-500 mb-4">
        <a href="/dashboard/agents" class="hover:text-indigo-400 transition-colors">Agents</a>
        <span class="mx-2">/</span>
        <span class="text-gray-300">${escHtml(agent.name)}</span>
      </nav>
      <h1 class="text-2xl font-bold">${escHtml(agent.name)}</h1>
      <p class="text-gray-400 text-sm mt-1">Trace history for this agent.</p>
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
