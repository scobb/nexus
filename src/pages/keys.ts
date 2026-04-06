export interface ApiKeyRow {
  id: string
  name: string
  key_prefix: string
  created_at: string
  last_used_at: string | null
}

function navBar(email: string): string {
  return `
  <nav class="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
    <a href="/dashboard" class="text-xl font-bold text-indigo-400">Nexus</a>
    <div class="flex items-center gap-4 flex-wrap">
      <a href="/dashboard" class="text-sm text-gray-400 hover:text-white transition-colors">Overview</a>
      <a href="/dashboard/traces" class="text-sm text-gray-400 hover:text-white transition-colors">Traces</a>
      <a href="/dashboard/agents" class="text-sm text-gray-400 hover:text-white transition-colors">Agents</a>
      <a href="/dashboard/keys" class="text-sm text-white font-medium">API Keys</a>
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

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function formatDate(iso: string): string {
  return new Date(iso + 'Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function keysPage(
  email: string,
  keys: ApiKeyRow[],
  newKey?: { name: string; plaintext: string },
  error?: string
): string {
  const newKeyBanner = newKey ? `
  <div class="bg-green-950 border border-green-700 rounded-xl p-4 mb-6">
    <p class="text-green-400 font-semibold mb-1">API key created: ${escHtml(newKey.name)}</p>
    <p class="text-sm text-green-300 mb-2">Copy this key now — it will not be shown again.</p>
    <code class="block bg-gray-900 rounded px-3 py-2 text-green-300 text-sm font-mono break-all">${escHtml(newKey.plaintext)}</code>
  </div>` : ''

  const errorBanner = error ? `
  <div class="bg-red-950 border border-red-700 rounded-xl p-4 mb-6">
    <p class="text-red-400 text-sm">${escHtml(error)}</p>
  </div>` : ''

  const keysTable = keys.length > 0 ? `
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-gray-800 text-left text-gray-400">
          <th class="pb-3 pr-4 font-medium">Name</th>
          <th class="pb-3 pr-4 font-medium">Key</th>
          <th class="pb-3 pr-4 font-medium">Created</th>
          <th class="pb-3 pr-4 font-medium">Last used</th>
          <th class="pb-3 font-medium"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-800">
        ${keys.map(k => `
        <tr>
          <td class="py-3 pr-4 text-white">${escHtml(k.name)}</td>
          <td class="py-3 pr-4 font-mono text-gray-300">${escHtml(k.key_prefix)}...</td>
          <td class="py-3 pr-4 text-gray-400">${formatDate(k.created_at)}</td>
          <td class="py-3 pr-4 text-gray-400">${k.last_used_at ? formatDate(k.last_used_at) : 'Never'}</td>
          <td class="py-3">
            <form method="POST" action="/dashboard/keys/${escHtml(k.id)}/revoke"
                  onsubmit="return confirm('Revoke this API key? Agents using it will stop working.')">
              <button type="submit"
                      class="text-xs text-red-400 hover:text-red-300 transition-colors border border-red-800 hover:border-red-600 rounded px-2 py-1">
                Revoke
              </button>
            </form>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>` : `
  <div class="text-center py-8 text-gray-400">
    <p class="mb-2">No API keys yet.</p>
    <p class="text-sm text-gray-500">Create a key below to start sending traces from your agents.</p>
  </div>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Keys — Nexus</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${navBar(email)}

  <main class="max-w-4xl mx-auto px-6 py-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold mb-1">API Keys</h1>
      <p class="text-gray-400 text-sm">Keys authenticate your agents when sending traces. Store them securely.</p>
    </div>

    ${newKeyBanner}
    ${errorBanner}

    <!-- Existing keys -->
    <div class="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
      <h2 class="text-base font-semibold mb-4">Active keys</h2>
      ${keysTable}
    </div>

    <!-- Create new key -->
    <div class="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <h2 class="text-base font-semibold mb-4">Create new key</h2>
      <form method="POST" action="/dashboard/keys" class="flex gap-3 items-end flex-wrap">
        <div class="flex-1 min-w-48">
          <label for="name" class="block text-sm text-gray-400 mb-1">Key name</label>
          <input type="text" id="name" name="name" required
                 placeholder="e.g. my-agent-prod"
                 class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
        </div>
        <button type="submit"
                class="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
          Create key
        </button>
      </form>
    </div>
  </main>
</body>
</html>`
}
