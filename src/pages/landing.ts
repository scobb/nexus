export function landingPage(deletedMessage?: boolean): string {
  const deletedBanner = deletedMessage ? `
  <div class="bg-gray-900 border-b border-gray-800 px-4 py-3 text-center">
    <p class="text-sm text-gray-300">Your account has been deleted. All data has been permanently removed.</p>
  </div>` : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nexus — Plausible for AI Agents</title>
  <meta name="description" content="Simple, affordable agent observability for indie developers. Drop in the SDK. See your traces. Get alerts when agents fail. $9/mo.">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    body { font-family: 'Inter', sans-serif; }
  </style>
</head>
<body class="bg-gray-950 text-gray-100 antialiased">
  ${deletedBanner}
  <!-- Nav -->
  <nav class="border-b border-gray-800 px-4 py-4">
    <div class="max-w-5xl mx-auto flex items-center justify-between">
      <span class="text-lg font-bold text-white">Nexus</span>
      <div class="flex items-center gap-3">
        <a href="/auth/login" class="text-sm text-gray-400 hover:text-white transition-colors">Sign in</a>
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">Start free</a>
      </div>
    </div>
  </nav>

  <!-- Hero -->
  <section class="px-4 pt-20 pb-16 text-center">
    <div class="max-w-3xl mx-auto">
      <div class="inline-flex items-center gap-2 bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
        <span class="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
        Built by an AI agent, for AI agents
      </div>
      <h1 class="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
        Plausible for AI Agents
      </h1>
      <p class="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
        Simple, affordable observability for your AI agents. Drop in the SDK. See your traces. Get alerts when agents fail. No self-hosting, no enterprise contracts.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a href="/register" class="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold text-base transition-colors">
          Start free — no card required
        </a>
        <a href="/demo" class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-gray-100 px-6 py-3 rounded-lg font-semibold text-base transition-colors">
          View demo
        </a>
      </div>
      <p class="mt-4 text-sm text-gray-500">Free forever up to 1,000 traces/month</p>
    </div>
  </section>

  <!-- 3 Key Benefits -->
  <section class="px-4 pb-16">
    <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div class="text-2xl mb-3">🔍</div>
        <h3 class="font-semibold text-white mb-2">See every trace</h3>
        <p class="text-sm text-gray-400">Full waterfall view of your agent's steps — LLM calls, tool uses, sub-agent invocations. Know exactly what happened and when.</p>
      </div>
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div class="text-2xl mb-3">🚨</div>
        <h3 class="font-semibold text-white mb-2">Alerts when agents fail</h3>
        <p class="text-sm text-gray-400">Email alerts the moment a trace errors or times out. With rate limiting to prevent alert fatigue. Know before your users do.</p>
      </div>
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div class="text-2xl mb-3">⚡</div>
        <h3 class="font-semibold text-white mb-2">One SDK, 10 lines</h3>
        <p class="text-sm text-gray-400">Open-source TypeScript SDK. Drop it into any agent — Claude, GPT-4, LangChain, custom. Start seeing traces in under 5 minutes.</p>
      </div>
    </div>
  </section>

  <!-- Pricing -->
  <section class="px-4 pb-16" id="pricing">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-2xl sm:text-3xl font-bold text-white text-center mb-3">Simple pricing</h2>
      <p class="text-gray-400 text-center mb-10">No enterprise tiers. No seats. No surprises.</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <!-- Free tier -->
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div class="mb-4">
            <span class="text-sm font-medium text-gray-400 uppercase tracking-wide">Free</span>
            <div class="mt-1">
              <span class="text-4xl font-extrabold text-white">$0</span>
              <span class="text-gray-400 text-sm"> / month</span>
            </div>
          </div>
          <ul class="space-y-2 mb-6 text-sm text-gray-300">
            <li class="flex items-center gap-2"><span class="text-green-400">✓</span> 1 agent</li>
            <li class="flex items-center gap-2"><span class="text-green-400">✓</span> 1,000 traces / month</li>
            <li class="flex items-center gap-2"><span class="text-green-400">✓</span> 30-day retention</li>
            <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Trace viewer</li>
            <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Community support</li>
          </ul>
          <a href="/register" class="block text-center bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm">
            Get started
          </a>
        </div>

        <!-- Pro tier -->
        <div class="bg-indigo-950 border border-indigo-700 rounded-xl p-6 relative">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2">
            <span class="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Most popular</span>
          </div>
          <div class="mb-4">
            <span class="text-sm font-medium text-indigo-300 uppercase tracking-wide">Pro</span>
            <div class="mt-1">
              <span class="text-4xl font-extrabold text-white">$9</span>
              <span class="text-gray-400 text-sm"> / month</span>
            </div>
          </div>
          <ul class="space-y-2 mb-6 text-sm text-gray-200">
            <li class="flex items-center gap-2"><span class="text-green-400">✓</span> <strong>Unlimited agents</strong></li>
            <li class="flex items-center gap-2"><span class="text-green-400">✓</span> 50,000 traces / month</li>
            <li class="flex items-center gap-2"><span class="text-green-400">✓</span> 90-day retention</li>
            <li class="flex items-center gap-2"><span class="text-green-400">✓</span> <strong>Email alerts on failure</strong></li>
            <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Team access (up to 5)</li>
            <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Priority support</li>
          </ul>
          <a href="/register" class="block text-center bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm">
            Start free, upgrade anytime
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Feature comparison table -->
  <section class="px-4 pb-16">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-xl font-bold text-white text-center mb-8">Feature comparison</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800">
              <th class="text-left py-3 text-gray-400 font-medium w-1/2">Feature</th>
              <th class="text-center py-3 text-gray-400 font-medium w-1/4">Free</th>
              <th class="text-center py-3 text-indigo-400 font-medium w-1/4">Pro</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800/50">
            <tr>
              <td class="py-3 text-gray-300">Trace viewer</td>
              <td class="py-3 text-center text-green-400">✓</td>
              <td class="py-3 text-center text-green-400">✓</td>
            </tr>
            <tr>
              <td class="py-3 text-gray-300">Span waterfall</td>
              <td class="py-3 text-center text-green-400">✓</td>
              <td class="py-3 text-center text-green-400">✓</td>
            </tr>
            <tr>
              <td class="py-3 text-gray-300">Dashboard &amp; metrics</td>
              <td class="py-3 text-center text-green-400">✓</td>
              <td class="py-3 text-center text-green-400">✓</td>
            </tr>
            <tr>
              <td class="py-3 text-gray-300">Data retention</td>
              <td class="py-3 text-center text-gray-400">30 days</td>
              <td class="py-3 text-center text-indigo-300">90 days</td>
            </tr>
            <tr>
              <td class="py-3 text-gray-300">Agents</td>
              <td class="py-3 text-center text-gray-400">1</td>
              <td class="py-3 text-center text-indigo-300">Unlimited</td>
            </tr>
            <tr>
              <td class="py-3 text-gray-300">Monthly traces</td>
              <td class="py-3 text-center text-gray-400">1,000</td>
              <td class="py-3 text-center text-indigo-300">50,000</td>
            </tr>
            <tr>
              <td class="py-3 text-gray-300">Email alerts on failure</td>
              <td class="py-3 text-center text-gray-500">—</td>
              <td class="py-3 text-center text-green-400">✓</td>
            </tr>
            <tr>
              <td class="py-3 text-gray-300">Team access</td>
              <td class="py-3 text-center text-gray-500">—</td>
              <td class="py-3 text-center text-indigo-300">Up to 5</td>
            </tr>
            <tr>
              <td class="py-3 text-gray-300">Support</td>
              <td class="py-3 text-center text-gray-400">Community</td>
              <td class="py-3 text-center text-indigo-300">Priority</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Meta narrative -->
  <section class="px-4 pb-16">
    <div class="max-w-3xl mx-auto bg-gray-900 border border-gray-800 rounded-xl p-8">
      <div class="text-3xl mb-4">🤖</div>
      <h2 class="text-xl font-bold text-white mb-3">Built by an AI agent, for AI agents</h2>
      <p class="text-gray-400 text-sm leading-relaxed mb-3">
        Nexus was designed and built by <strong class="text-gray-200">Ralph</strong>, an autonomous AI agent employed by <strong class="text-gray-200">Keylight Digital LLC</strong>. Ralph needed a way to monitor his own agent runs — so he built the tool he wished existed.
      </p>
      <p class="text-gray-400 text-sm leading-relaxed">
        Every feature in Nexus was motivated by a real problem Ralph encountered managing AI workflows: knowing when a trace failed, understanding why an agent stalled, tracking performance over time. If you're building with AI agents, you have the same problems. Nexus is for you.
      </p>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="px-4 pb-20 text-center">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to see inside your agents?</h2>
      <p class="text-gray-400 mb-8">Start free. No credit card. Under 5 minutes to first trace.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a href="/register" class="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold text-base transition-colors">
          Start free
        </a>
        <a href="/demo" class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-gray-100 px-6 py-3 rounded-lg font-semibold text-base transition-colors">
          View demo
        </a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-gray-800 px-4 py-8">
    <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
      <span><strong class="text-gray-400">Nexus</strong> by Keylight Digital LLC</span>
      <span>ralph@keylightdigital.dev</span>
    </div>
  </footer>

</body>
</html>`
}
