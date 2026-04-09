export interface BillingData {
  email: string
  plan: 'free' | 'pro'
  tracesThisMonth: number
  subscriptionStatus: string | null
  currentPeriodEnd: string | null
  cancelAt: string | null
  successMessage?: string
  errorMessage?: string
}

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

function formatDate(iso: string): string {
  const d = new Date(iso.endsWith('Z') ? iso : iso + 'Z')
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export function billingPage(data: BillingData): string {
  const { email, plan, tracesThisMonth, subscriptionStatus, currentPeriodEnd, cancelAt, successMessage, errorMessage } = data
  const limit = plan === 'pro' ? 50000 : 1000
  const limitLabel = plan === 'pro' ? '50,000' : '1,000'
  const usagePct = Math.min(Math.round((tracesThisMonth / limit) * 100), 100)
  const usageBarColor = usagePct >= 80 ? 'bg-red-500' : 'bg-indigo-500'

  const successBanner = successMessage ? `
  <div class="bg-green-950 border border-green-700 rounded-xl px-5 py-4 mb-6 flex items-center gap-3">
    <span class="text-green-400 text-lg">✓</span>
    <p class="text-green-300 text-sm font-medium">${escHtml(successMessage)}</p>
  </div>` : ''

  const errorBanner = errorMessage ? `
  <div class="bg-red-950 border border-red-700 rounded-xl px-5 py-4 mb-6">
    <p class="text-red-400 text-sm font-medium mb-1">Billing error</p>
    <p class="text-red-300 text-sm">${escHtml(errorMessage)}</p>
    <p class="text-red-400 text-xs mt-2">If this persists, email <a href="mailto:ralph@keylightdigital.dev" class="underline">ralph@keylightdigital.dev</a></p>
  </div>` : ''

  const planBadge = plan === 'pro'
    ? `<span class="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-900 text-indigo-300 border border-indigo-700">Pro</span>`
    : `<span class="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">Free</span>`

  const billingAction = plan === 'free' ? `
    <div class="mt-6">
      <h3 class="text-base font-semibold mb-2">Upgrade to Pro</h3>
      <p class="text-sm text-gray-400 mb-4">Get 50× more traces, unlimited agents, email alerts, and 90-day retention.</p>
      <form method="POST" action="/dashboard/billing/checkout">
        <button type="submit"
                class="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm">
          Upgrade to Pro &mdash; $9/mo &rarr;
        </button>
      </form>
    </div>` : `
    <div class="mt-6">
      <h3 class="text-base font-semibold mb-2">Manage subscription</h3>
      ${cancelAt
        ? `<p class="text-sm text-yellow-400 mb-1">Cancels: <span class="text-yellow-300">${escHtml(formatDate(cancelAt))}</span></p>
           <p class="text-xs text-gray-500 mb-4">Your Pro features remain active until this date.</p>`
        : `<p class="text-sm text-gray-400 mb-1">Status: <span class="text-white capitalize">${escHtml(subscriptionStatus ?? 'active')}</span></p>
           ${currentPeriodEnd ? `<p class="text-sm text-gray-400 mb-4">Renews: <span class="text-white">${escHtml(formatDate(currentPeriodEnd))}</span></p>` : ''}`
      }
      <form method="POST" action="/dashboard/billing/portal">
        <button type="submit"
                class="bg-gray-700 hover:bg-gray-600 text-white font-medium px-5 py-2 rounded-lg transition-colors text-sm">
          Manage billing &rarr;
        </button>
      </form>
    </div>`

  const freeFeatures = [
    '1 agent',
    '1,000 traces/month',
    '30-day retention',
    'Trace viewer',
    'Community support',
  ]
  const proFeatures = [
    'Unlimited agents',
    '50,000 traces/month',
    '90-day retention',
    'Email alerts',
    'Team access (up to 5)',
    'Priority support',
  ]

  const featureItem = (text: string, active: boolean) =>
    `<li class="flex items-center gap-2 text-sm ${active ? 'text-gray-200' : 'text-gray-500'}">
      <span class="${active ? 'text-indigo-400' : 'text-gray-700'}">✓</span>
      ${escHtml(text)}
    </li>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Billing — Nexus</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="bg-gray-950 text-white min-h-screen">
  <nav class="border-b border-gray-800 px-4 py-3">
    <div class="flex items-center justify-between">
      <a href="/dashboard" class="text-xl font-bold text-indigo-400">Nexus</a>
      <div class="hidden md:flex items-center gap-4 flex-wrap">
        <a href="/dashboard" class="text-sm text-gray-400 hover:text-white transition-colors">Overview</a>
        <a href="/dashboard/traces" class="text-sm text-gray-400 hover:text-white transition-colors">Traces</a>
        <a href="/dashboard/agents" class="text-sm text-gray-400 hover:text-white transition-colors">Agents</a>
        <a href="/dashboard/keys" class="text-sm text-gray-400 hover:text-white transition-colors">API Keys</a>
        <a href="/dashboard/billing" class="text-sm text-white font-medium">Billing</a>
        <a href="/dashboard/settings" class="text-sm text-gray-400 hover:text-white transition-colors">Settings</a>
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
      <a href="/dashboard" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Overview</a>
      <a href="/dashboard/traces" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Traces</a>
      <a href="/dashboard/agents" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Agents</a>
      <a href="/dashboard/keys" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">API Keys</a>
      <a href="/dashboard/billing" class="block px-2 py-2.5 text-sm text-white font-medium bg-gray-800 rounded-lg">Billing</a>
      <a href="/dashboard/settings" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Settings</a>
      <a href="/docs" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Docs</a>
      <div class="border-t border-gray-800 mt-2 pt-2">
        <span class="block px-2 py-1.5 text-xs text-gray-500 truncate">${escHtml(email)}</span>
        <form method="POST" action="/auth/logout">
          <button type="submit" class="block w-full text-left px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Sign out</button>
        </form>
      </div>
    </div>
  </nav>

  <main class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Billing</h1>

    ${successBanner}
    ${errorBanner}

    <!-- Current plan card -->
    <div class="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <h2 class="text-lg font-semibold">Current plan</h2>
          ${planBadge}
        </div>
      </div>

      <!-- Usage -->
      <div class="mb-4">
        <div class="flex items-center justify-between text-sm mb-1.5">
          <span class="text-gray-400">Traces this month</span>
          <span class="text-gray-300">${tracesThisMonth.toLocaleString()} / ${limitLabel}</span>
        </div>
        <div class="w-full bg-gray-800 rounded-full h-2">
          <div class="${usageBarColor} h-2 rounded-full transition-all" style="width:${usagePct}%"></div>
        </div>
      </div>

      ${billingAction}
    </div>

    <!-- Plan comparison -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Free plan -->
      <div class="bg-gray-900 rounded-xl border ${plan === 'free' ? 'border-indigo-600' : 'border-gray-800'} p-6">
        <div class="flex items-center justify-between mb-1">
          <h3 class="font-semibold">Free</h3>
          ${plan === 'free' ? '<span class="text-xs text-indigo-400 font-medium">Current plan</span>' : ''}
        </div>
        <p class="text-3xl font-bold mb-4">$0 <span class="text-sm font-normal text-gray-400">/mo</span></p>
        <ul class="space-y-2">
          ${freeFeatures.map(f => featureItem(f, plan === 'free')).join('')}
        </ul>
      </div>

      <!-- Pro plan -->
      <div class="bg-gray-900 rounded-xl border ${plan === 'pro' ? 'border-indigo-600' : 'border-gray-800'} p-6">
        <div class="flex items-center justify-between mb-1">
          <h3 class="font-semibold">Pro</h3>
          ${plan === 'pro' ? '<span class="text-xs text-indigo-400 font-medium">Current plan</span>' : ''}
        </div>
        <p class="text-3xl font-bold mb-4">$9 <span class="text-sm font-normal text-gray-400">/mo</span></p>
        <ul class="space-y-2">
          ${proFeatures.map(f => featureItem(f, true)).join('')}
        </ul>
      </div>
    </div>
  </main>
</body>
</html>`
}
