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
  <title>Nexus — AI Agent Observability for Indie Developers</title>
  <meta name="description" content="Simple, affordable AI agent observability. Drop in the SDK. See your traces. Get alerts when agents fail. No self-hosting, no enterprise contracts. $9/mo.">
  <link rel="canonical" href="https://nexus.keylightdigital.dev">
  <!-- Open Graph -->
  <meta property="og:title" content="Nexus — AI Agent Observability for Indie Developers">
  <meta property="og:description" content="Simple, affordable AI agent observability. Drop in the SDK. See your traces. Get alerts when agents fail. No self-hosting, no enterprise contracts. $9/mo.">
  <meta property="og:url" content="https://nexus.keylightdigital.dev">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <meta property="og:site_name" content="Nexus">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Nexus — AI Agent Observability for Indie Developers">
  <meta name="twitter:description" content="Simple, affordable AI agent observability. Drop in the SDK. See your traces. Get alerts when agents fail. No self-hosting, no enterprise contracts. $9/mo.">
  <meta name="twitter:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <!-- Google Search Console verification — replace PLACEHOLDER with your actual verification code from https://search.google.com/search-console -->
  <meta name="google-site-verification" content="PLACEHOLDER_REPLACE_WITH_GOOGLE_VERIFICATION_CODE">
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
  [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Keylight Digital LLC",
      "url": "https://nexus.keylightdigital.dev",
      "description": "Keylight Digital LLC builds developer tools for indie developers and small teams.",
      "brand": {
        "@type": "Brand",
        "name": "Nexus"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Nexus",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Any",
      "description": "Simple, affordable AI agent observability for indie developers. Drop in the SDK, see your traces, get alerts when agents fail.",
      "url": "https://nexus.keylightdigital.dev",
      "offers": [
        {
          "@type": "Offer",
          "name": "Free",
          "price": "0",
          "priceCurrency": "USD",
          "description": "1 agent, 1,000 traces/month, 30-day retention"
        },
        {
          "@type": "Offer",
          "name": "Pro",
          "price": "9",
          "priceCurrency": "USD",
          "description": "Unlimited agents, 50,000 traces/month, 90-day retention, email alerts"
        }
      ]
    }
  ]
  </script>
  <link rel="stylesheet" href="/styles.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    body { font-family: 'Inter', sans-serif; }
  </style>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <!-- Beam Analytics (dogfooding) -->
  <script defer src="https://beam.keylightdigital.dev/js/beam.js" data-site-id="dee2fad9-ca65-4746-aa74-6480534507ef"></script>
</head>
<body class="bg-gray-950 text-gray-100 antialiased">
  ${deletedBanner}
  <!-- Nav -->
  <nav class="border-b border-gray-800 px-4 py-4">
    <div class="max-w-5xl mx-auto flex items-center justify-between">
      <span class="text-lg font-bold text-white">Nexus</span>
      <div class="hidden sm:flex items-center gap-3">
        <a href="/blog" class="text-sm text-gray-400 hover:text-white transition-colors">Blog</a>
        <a href="/docs" class="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
        <a href="/auth/login" class="text-sm text-gray-400 hover:text-white transition-colors">Sign in</a>
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">Start free</a>
      </div>
      <div class="flex sm:hidden items-center gap-2">
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-medium transition-colors">Start free</a>
        <button onclick="var m=document.getElementById('land-mnav');m.classList.toggle('hidden')" class="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Open navigation menu">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
    <div id="land-mnav" class="hidden sm:hidden max-w-5xl mx-auto border-t border-gray-800 mt-3 pt-2 pb-1 space-y-0.5">
      <a href="/blog" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Blog</a>
      <a href="/docs" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Docs</a>
      <a href="/auth/login" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Sign in</a>
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
        <p class="text-sm text-gray-400">Open-source TypeScript and Python SDKs. Drop into any agent — Claude, GPT-4, LangChain, custom. Start seeing traces in under 5 minutes.</p>
      </div>
    </div>
  </section>

  <!-- How it works -->
  <section class="px-4 pb-16">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-2xl sm:text-3xl font-bold text-white text-center mb-3">How it works</h2>
      <p class="text-gray-400 text-center mb-10">From zero to first trace in under 5 minutes.</p>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="relative">
          <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold text-white mb-4">1</div>
            <h3 class="font-semibold text-white mb-2">Install the SDK</h3>
            <p class="text-sm text-gray-400 mb-2">TypeScript or Python — one install in your agent project.</p>
            <code class="text-xs bg-gray-950 text-indigo-300 px-3 py-1.5 rounded-lg block font-mono mb-1">npm install @keylightdigital/nexus</code>
            <code class="text-xs bg-gray-950 text-indigo-300 px-3 py-1.5 rounded-lg block font-mono">pip install keylightdigital-nexus</code>
          </div>
          <div class="hidden sm:block absolute top-1/2 -right-3 text-gray-700 text-xl font-bold z-10">›</div>
        </div>
        <div class="relative">
          <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold text-white mb-4">2</div>
            <h3 class="font-semibold text-white mb-2">Add 3 lines of code</h3>
            <p class="text-sm text-gray-400">Wrap your agent run in a trace. Spans auto-capture timing.</p>
          </div>
          <div class="hidden sm:block absolute top-1/2 -right-3 text-gray-700 text-xl font-bold z-10">›</div>
        </div>
        <div>
          <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold text-white mb-4">3</div>
            <h3 class="font-semibold text-white mb-2">See traces in dashboard</h3>
            <p class="text-sm text-gray-400">Every run shows up at nexus.keylightdigital.dev — waterfall view, error rates, timing.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Code example -->
  <section class="px-4 pb-16">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-2xl font-bold text-white text-center mb-3">6 lines to full observability</h2>
      <p class="text-gray-400 text-center mb-8">Works with Claude, GPT-4, LangChain, or raw fetch calls — in TypeScript or Python.</p>
      <!-- TypeScript example -->
      <div class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-4">
        <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-950">
          <span class="w-3 h-3 rounded-full bg-red-500/60"></span>
          <span class="w-3 h-3 rounded-full bg-yellow-500/60"></span>
          <span class="w-3 h-3 rounded-full bg-green-500/60"></span>
          <span class="ml-2 text-xs text-gray-500 font-mono">my-agent.ts</span>
          <span class="ml-auto text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded">TypeScript</span>
        </div>
        <pre class="p-6 text-sm font-mono leading-relaxed overflow-x-auto"><code><span class="text-indigo-400">import</span> <span class="text-gray-100">{ NexusClient }</span> <span class="text-indigo-400">from</span> <span class="text-green-400">'@keylightdigital/nexus'</span>

<span class="text-indigo-400">const</span> <span class="text-gray-100">nexus</span> <span class="text-gray-500">=</span> <span class="text-indigo-400">new</span> <span class="text-yellow-300">NexusClient</span><span class="text-gray-100">({</span>
  <span class="text-blue-300">apiKey</span><span class="text-gray-500">:</span> <span class="text-green-400">'nxs_your_key_here'</span><span class="text-gray-100">,</span>
  <span class="text-blue-300">agentId</span><span class="text-gray-500">:</span> <span class="text-green-400">'my-assistant'</span>
<span class="text-gray-100">})</span>

<span class="text-gray-500">// Start a trace when your agent begins</span>
<span class="text-indigo-400">const</span> <span class="text-gray-100">trace</span> <span class="text-gray-500">=</span> <span class="text-indigo-400">await</span> <span class="text-gray-100">nexus.</span><span class="text-yellow-300">startTrace</span><span class="text-gray-100">({</span> <span class="text-blue-300">name</span><span class="text-gray-500">:</span> <span class="text-green-400">'process-request'</span> <span class="text-gray-100">})</span>
<span class="text-indigo-400">await</span> <span class="text-gray-100">trace.</span><span class="text-yellow-300">addSpan</span><span class="text-gray-100">({</span> <span class="text-blue-300">name</span><span class="text-gray-500">:</span> <span class="text-green-400">'call-llm'</span><span class="text-gray-100">,</span> <span class="text-blue-300">output</span><span class="text-gray-500">:</span> <span class="text-gray-100">llmResponse</span> <span class="text-gray-100">})</span>
<span class="text-indigo-400">await</span> <span class="text-gray-100">trace.</span><span class="text-yellow-300">end</span><span class="text-gray-100">({</span> <span class="text-blue-300">status</span><span class="text-gray-500">:</span> <span class="text-green-400">'success'</span> <span class="text-gray-100">})</span></code></pre>
      </div>
      <!-- Python example -->
      <div class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-950">
          <span class="w-3 h-3 rounded-full bg-red-500/60"></span>
          <span class="w-3 h-3 rounded-full bg-yellow-500/60"></span>
          <span class="w-3 h-3 rounded-full bg-green-500/60"></span>
          <span class="ml-2 text-xs text-gray-500 font-mono">my_agent.py</span>
          <span class="ml-auto text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded">Python</span>
        </div>
        <pre class="p-6 text-sm font-mono leading-relaxed overflow-x-auto"><code><span class="text-indigo-400">from</span> <span class="text-gray-100">nexus_agent</span> <span class="text-indigo-400">import</span> <span class="text-gray-100">NexusClient</span>

<span class="text-gray-100">nexus</span> <span class="text-gray-500">=</span> <span class="text-yellow-300">NexusClient</span><span class="text-gray-100">(</span>
  <span class="text-blue-300">api_key</span><span class="text-gray-500">=</span><span class="text-green-400">'nxs_your_key_here'</span><span class="text-gray-100">,</span>
  <span class="text-blue-300">agent_id</span><span class="text-gray-500">=</span><span class="text-green-400">'my-assistant'</span>
<span class="text-gray-100">)</span>

<span class="text-gray-500"># Start a trace when your agent begins</span>
<span class="text-gray-100">trace</span> <span class="text-gray-500">=</span> <span class="text-gray-100">nexus.</span><span class="text-yellow-300">start_trace</span><span class="text-gray-100">(</span><span class="text-blue-300">name</span><span class="text-gray-500">=</span><span class="text-green-400">'process-request'</span><span class="text-gray-100">)</span>
<span class="text-gray-100">trace.</span><span class="text-yellow-300">add_span</span><span class="text-gray-100">(</span><span class="text-blue-300">name</span><span class="text-gray-500">=</span><span class="text-green-400">'call-llm'</span><span class="text-gray-100">,</span> <span class="text-blue-300">output</span><span class="text-gray-500">=</span><span class="text-gray-100">llm_response</span><span class="text-gray-100">)</span>
<span class="text-gray-100">trace.</span><span class="text-yellow-300">end</span><span class="text-gray-100">(</span><span class="text-blue-300">status</span><span class="text-gray-500">=</span><span class="text-green-400">'success'</span><span class="text-gray-100">)</span></code></pre>
      </div>
      <div class="mt-4 text-center">
        <a href="/demo" class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">See what this looks like in the dashboard →</a>
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
          <a href="/register" class="block text-center bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm">
            Start free — no card required
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
          <a href="/register" class="block text-center bg-gray-800 hover:bg-gray-700 border border-indigo-600 text-indigo-300 px-4 py-2.5 rounded-lg font-medium transition-colors text-sm">
            Start free · upgrade to Pro anytime →
          </a>
        </div>
      </div>
      <p class="text-center text-sm text-gray-500 mt-6">Start with the free tier. Upgrade when you need more traces, more agents, or email alerts.</p>
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

  <!-- FAQ -->
  <section class="px-4 pb-16">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-2xl sm:text-3xl font-bold text-white text-center mb-10">Frequently asked questions</h2>
      <div class="space-y-4">

        <details class="bg-gray-900 border border-gray-800 rounded-xl group">
          <summary class="px-6 py-4 cursor-pointer font-medium text-white flex items-center justify-between select-none">
            Why not Langfuse or LangSmith?
            <span class="text-gray-500 group-open:rotate-180 transition-transform text-lg">›</span>
          </summary>
          <div class="px-6 pb-4 text-sm text-gray-400 leading-relaxed">
            LangSmith is excellent if you're deep in the LangChain ecosystem. Langfuse is great if you want to self-host. But both are built for teams with engineering resources. Nexus is built for indie developers and small teams who want a hosted solution that just works — no Docker, no infra, no $39/mo minimum. If you're building with Claude, GPT-4, or raw API calls (not LangChain), Nexus fits better.
          </div>
        </details>

        <details class="bg-gray-900 border border-gray-800 rounded-xl group">
          <summary class="px-6 py-4 cursor-pointer font-medium text-white flex items-center justify-between select-none">
            Where is my data stored?
            <span class="text-gray-500 group-open:rotate-180 transition-transform text-lg">›</span>
          </summary>
          <div class="px-6 pb-4 text-sm text-gray-400 leading-relaxed">
            Traces are stored in Cloudflare D1 (SQLite at the edge), globally distributed across Cloudflare's network. Your data never leaves Cloudflare's infrastructure. Free plan data is retained for 30 days; Pro plan for 90 days. You can delete your account and all data at any time from Settings.
          </div>
        </details>

        <details class="bg-gray-900 border border-gray-800 rounded-xl group">
          <summary class="px-6 py-4 cursor-pointer font-medium text-white flex items-center justify-between select-none">
            Can I use this with Python?
            <span class="text-gray-500 group-open:rotate-180 transition-transform text-lg">›</span>
          </summary>
          <div class="px-6 pb-4 text-sm text-gray-400 leading-relaxed">
            Yes! The Python SDK is available now: <code class="text-indigo-400 bg-gray-950 px-1.5 py-0.5 rounded text-xs">pip install keylightdigital-nexus</code>. It mirrors the TypeScript SDK's API surface with <code class="text-indigo-400 bg-gray-950 px-1.5 py-0.5 rounded text-xs">NexusClient</code>, <code class="text-indigo-400 bg-gray-950 px-1.5 py-0.5 rounded text-xs">start_trace()</code>, <code class="text-indigo-400 bg-gray-950 px-1.5 py-0.5 rounded text-xs">add_span()</code>, and <code class="text-indigo-400 bg-gray-950 px-1.5 py-0.5 rounded text-xs">end()</code>. Works with any Python agent framework — LangChain, AutoGen, CrewAI, or custom agents. See the <a href="/docs" class="text-indigo-400 hover:text-indigo-300">docs</a> for the full Python quickstart.
          </div>
        </details>

        <details class="bg-gray-900 border border-gray-800 rounded-xl group">
          <summary class="px-6 py-4 cursor-pointer font-medium text-white flex items-center justify-between select-none">
            What happens when I hit the free limit?
            <span class="text-gray-500 group-open:rotate-180 transition-transform text-lg">›</span>
          </summary>
          <div class="px-6 pb-4 text-sm text-gray-400 leading-relaxed">
            When you hit 1,000 traces on the Free plan, the API returns a <code class="text-indigo-400 bg-gray-950 px-1.5 py-0.5 rounded text-xs">429</code> with a clear error message and a link to upgrade. Your existing traces are never deleted — they stay visible in your dashboard until the 30-day retention window. Upgrading to Pro ($9/mo) instantly raises the limit to 50,000 traces.
          </div>
        </details>

        <details class="bg-gray-900 border border-gray-800 rounded-xl group">
          <summary class="px-6 py-4 cursor-pointer font-medium text-white flex items-center justify-between select-none">
            Is there a self-hosted option?
            <span class="text-gray-500 group-open:rotate-180 transition-transform text-lg">›</span>
          </summary>
          <div class="px-6 pb-4 text-sm text-gray-400 leading-relaxed">
            Nexus is open-source (MIT license) at <a href="https://github.com/scobb/nexus" class="text-indigo-400 hover:text-indigo-300">github.com/scobb/nexus</a>. You can deploy it to your own Cloudflare account using the included <code class="text-indigo-400 bg-gray-950 px-1.5 py-0.5 rounded text-xs">deploy.sh</code> script. The hosted version at nexus.keylightdigital.dev is the easiest option — but self-hosting is fully supported.
          </div>
        </details>

        <details class="bg-gray-900 border border-gray-800 rounded-xl group">
          <summary class="px-6 py-4 cursor-pointer font-medium text-white flex items-center justify-between select-none">
            Who built this?
            <span class="text-gray-500 group-open:rotate-180 transition-transform text-lg">›</span>
          </summary>
          <div class="px-6 pb-4 text-sm text-gray-400 leading-relaxed">
            Nexus was built by <strong class="text-gray-200">Ralph</strong>, an autonomous AI agent employed by <strong class="text-gray-200">Keylight Digital LLC</strong>. Ralph built the product he needed to monitor his own agent runs. The project is maintained by Keylight Digital — a small software shop building tools for developers. Questions? Email <a href="mailto:ralph@keylightdigital.dev" class="text-indigo-400 hover:text-indigo-300">ralph@keylightdigital.dev</a>.
          </div>
        </details>

      </div>
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
