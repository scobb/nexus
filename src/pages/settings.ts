import type { ApiKeyRow } from './keys'

export interface SettingsData {
  email: string
  plan: 'free' | 'pro'
  keys: ApiKeyRow[]
  webhookUrl?: string | null
  webhookSaved?: boolean
  webhookError?: string
  webhookTestSent?: boolean
  webhookTestError?: string
  newKey?: { name: string; plaintext: string }
  keyError?: string
  deleteError?: string
}

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function formatDate(iso: string): string {
  return new Date(iso + 'Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function navBar(email: string): string {
  return `
  <nav class="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
    <a href="/dashboard" class="text-xl font-bold text-indigo-400">Nexus</a>
    <div class="flex items-center gap-4 flex-wrap">
      <a href="/dashboard" class="text-sm text-gray-400 hover:text-white transition-colors">Overview</a>
      <a href="/dashboard/traces" class="text-sm text-gray-400 hover:text-white transition-colors">Traces</a>
      <a href="/dashboard/agents" class="text-sm text-gray-400 hover:text-white transition-colors">Agents</a>
      <a href="/dashboard/keys" class="text-sm text-gray-400 hover:text-white transition-colors">API Keys</a>
      <a href="/dashboard/billing" class="text-sm text-gray-400 hover:text-white transition-colors">Billing</a>
      <a href="/dashboard/settings" class="text-sm text-white font-medium">Settings</a>
      <a href="/docs" class="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
      <span class="text-gray-600">|</span>
      <span class="text-sm text-gray-400">${escHtml(email)}</span>
      <form method="POST" action="/auth/logout">
        <button type="submit" class="text-sm text-gray-400 hover:text-white transition-colors">Sign out</button>
      </form>
    </div>
  </nav>`
}

export function settingsPage(data: SettingsData): string {
  const { email, plan, keys, webhookUrl, webhookSaved, webhookError, webhookTestSent, webhookTestError, newKey, keyError, deleteError } = data

  const planBadge = plan === 'pro'
    ? `<span class="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">Pro</span>`
    : `<span class="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">Free</span>`

  const newKeyBanner = newKey ? `
  <div class="bg-green-950 border border-green-700 rounded-xl p-4 mb-6">
    <p class="text-green-400 font-semibold mb-1">API key created: ${escHtml(newKey.name)}</p>
    <p class="text-sm text-green-300 mb-2">Copy this key now — it will not be shown again.</p>
    <code class="block bg-gray-900 rounded px-3 py-2 text-green-300 text-sm font-mono break-all">${escHtml(newKey.plaintext)}</code>
  </div>` : ''

  const keyErrorBanner = keyError ? `
  <div class="bg-red-950 border border-red-700 rounded-xl p-4 mb-4">
    <p class="text-red-400 text-sm">${escHtml(keyError)}</p>
  </div>` : ''

  const deleteErrorBanner = deleteError ? `
  <div class="bg-red-950 border border-red-700 rounded-xl p-4 mb-4">
    <p class="text-red-400 text-sm">${escHtml(deleteError)}</p>
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
  <div class="text-center py-6 text-gray-400">
    <p class="mb-1">No API keys yet.</p>
    <p class="text-sm text-gray-500">Create a key below to start sending traces from your agents.</p>
  </div>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Settings — Nexus</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${navBar(email)}

  <main class="max-w-4xl mx-auto px-6 py-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold mb-1">Settings</h1>
      <p class="text-gray-400 text-sm">Manage your account, API keys, and preferences.</p>
    </div>

    <!-- Account info -->
    <div class="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
      <h2 class="text-base font-semibold mb-4">Account</h2>
      <div class="flex flex-col sm:flex-row sm:items-center gap-3">
        <div>
          <p class="text-sm text-gray-400 mb-0.5">Email</p>
          <p class="text-white">${escHtml(email)}</p>
        </div>
        <div class="sm:ml-8">
          <p class="text-sm text-gray-400 mb-0.5">Plan</p>
          <div class="mt-0.5">${planBadge}</div>
        </div>
        ${plan === 'free' ? `
        <div class="sm:ml-auto">
          <a href="/dashboard/billing"
             class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            Upgrade to Pro
          </a>
        </div>` : `
        <div class="sm:ml-auto">
          <a href="/dashboard/billing"
             class="inline-block text-sm text-gray-400 hover:text-white transition-colors border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-lg">
            Manage billing
          </a>
        </div>`}
      </div>
    </div>

    <!-- API Keys -->
    <div class="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
      <h2 class="text-base font-semibold mb-4">API Keys</h2>
      <p class="text-sm text-gray-400 mb-4">Keys authenticate your agents when sending traces. Store them securely.</p>

      ${newKeyBanner}
      ${keyErrorBanner}
      ${keysTable}

      <div class="mt-6 pt-5 border-t border-gray-800">
        <h3 class="text-sm font-medium mb-3">Create new key</h3>
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
    </div>

    <!-- Webhook Notifications -->
    <div class="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
      <h2 class="text-base font-semibold mb-1">Webhook Notifications</h2>
      <p class="text-sm text-gray-400 mb-4">Receive a POST request when a trace errors. Use this to connect Slack, Discord, PagerDuty, or any custom integration.</p>

      ${webhookSaved ? `
      <div class="bg-green-950 border border-green-700 rounded-xl p-3 mb-4">
        <p class="text-green-400 text-sm">Webhook URL saved.</p>
      </div>` : ''}
      ${webhookError ? `
      <div class="bg-red-950 border border-red-700 rounded-xl p-3 mb-4">
        <p class="text-red-400 text-sm">${escHtml(webhookError)}</p>
      </div>` : ''}
      ${webhookTestSent ? `
      <div class="bg-green-950 border border-green-700 rounded-xl p-3 mb-4">
        <p class="text-green-400 text-sm">Test payload sent to your webhook URL.</p>
      </div>` : ''}
      ${webhookTestError ? `
      <div class="bg-red-950 border border-red-700 rounded-xl p-3 mb-4">
        <p class="text-red-400 text-sm">${escHtml(webhookTestError)}</p>
      </div>` : ''}

      <form method="POST" action="/dashboard/settings/webhook" class="mb-4">
        <label for="webhookUrl" class="block text-sm text-gray-400 mb-1">Webhook URL</label>
        <div class="flex gap-3 items-center flex-wrap">
          <input type="url" id="webhookUrl" name="webhook_url"
                 placeholder="https://hooks.slack.com/services/..."
                 value="${escHtml(webhookUrl ?? '')}"
                 class="flex-1 min-w-64 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
          <button type="submit"
                  class="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
            Save
          </button>
        </div>
        <p class="text-xs text-gray-500 mt-1.5">Must start with <span class="font-mono">https://</span>. Leave blank to disable.</p>
      </form>

      ${webhookUrl ? `
      <form method="POST" action="/dashboard/settings/webhook/test">
        <button type="submit"
                class="text-sm text-gray-400 hover:text-white transition-colors border border-gray-700 hover:border-gray-500 px-3 py-1.5 rounded-lg">
          Send test payload
        </button>
      </form>

      <div class="mt-4 bg-gray-800 rounded-lg p-4">
        <p class="text-xs text-gray-400 font-semibold mb-2">Example payload</p>
        <pre class="text-xs text-gray-300 font-mono overflow-x-auto">${escHtml(JSON.stringify({
          event: 'trace.error',
          trace_id: 'abc123',
          agent_name: 'my-agent',
          error_message: 'LLM call timed out after 30s',
          started_at: '2026-04-06T12:00:00.000Z',
          dashboard_url: 'https://nexus.keylightdigital.dev/dashboard/traces/abc123',
        }, null, 2))}</pre>
      </div>` : ''}
    </div>

    <!-- Danger zone -->
    <div class="bg-gray-900 rounded-xl border border-red-900 p-6">
      <h2 class="text-base font-semibold text-red-400 mb-1">Danger zone</h2>
      <p class="text-sm text-gray-400 mb-5">These actions are permanent and cannot be undone.</p>

      ${deleteErrorBanner}

      <div class="border border-red-900 rounded-lg p-4">
        <h3 class="text-sm font-semibold mb-1">Delete account</h3>
        <p class="text-sm text-gray-400 mb-1">This will permanently delete:</p>
        <ul class="text-sm text-gray-400 list-disc list-inside mb-4 space-y-0.5">
          <li>Your account and profile</li>
          <li>All agents and their trace history</li>
          <li>All API keys</li>
          ${plan === 'pro' ? '<li>Your active Pro subscription (will be cancelled)</li>' : ''}
        </ul>
        <p class="text-sm text-yellow-400 font-medium mb-4">This action cannot be reversed. All data will be lost forever.</p>

        <form method="POST" action="/dashboard/account/delete"
              onsubmit="return document.getElementById('confirmText').value === 'delete my account' || (alert('Type \\'delete my account\\' to confirm.'), false)">
          <div class="mb-3">
            <label for="confirmText" class="block text-sm text-gray-400 mb-1">
              Type <span class="font-mono text-gray-300">delete my account</span> to confirm
            </label>
            <input type="text" id="confirmText" name="confirm"
                   placeholder="delete my account"
                   autocomplete="off"
                   class="w-full sm:w-72 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500">
          </div>
          <button type="submit"
                  class="bg-red-700 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            Delete my account
          </button>
        </form>
      </div>
    </div>
  </main>
</body>
</html>`
}
