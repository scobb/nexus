const navBar = `
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <nav class="border-b border-gray-800 px-4 py-4">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <a href="/" class="text-lg font-bold text-indigo-400">Nexus</a>
      <div class="hidden sm:flex items-center gap-4">
        <a href="/docs" class="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
        <a href="/demo" class="text-sm text-gray-400 hover:text-white transition-colors">Demo</a>
        <a href="/auth/login" class="text-sm text-gray-400 hover:text-white transition-colors">Sign in</a>
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">Start free</a>
      </div>
      <div class="flex sm:hidden items-center gap-2">
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-medium transition-colors">Start free</a>
        <button onclick="var m=document.getElementById('vs-mnav');m.classList.toggle('hidden')" class="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Open navigation menu">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
    <div id="vs-mnav" class="hidden sm:hidden max-w-4xl mx-auto border-t border-gray-800 mt-3 pt-2 pb-1 space-y-0.5">
      <a href="/docs" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Docs</a>
      <a href="/demo" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Demo</a>
      <a href="/auth/login" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Sign in</a>
    </div>
  </nav>`

function comparisonHead(title: string, description: string, canonical: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <meta property="og:site_name" content="Nexus">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <!-- Beam Analytics (dogfooding) -->
  <script defer src="https://beam-privacy.com/js/beam.js" data-site-id="dee2fad9-ca65-4746-aa74-6480534507ef"></script>
</head>`
}

function comparisonRelated(guideHref: string, guideText: string): string {
  return `
    <!-- Related content -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-8">
      <h2 class="text-lg font-bold text-white mb-4">Related</h2>
      <ul class="space-y-2 text-sm">
        <li><a href="/alternatives" class="text-indigo-400 hover:text-indigo-300">All AI agent monitoring alternatives</a> — compare every tool side by side</li>
        <li><a href="${guideHref}" class="text-indigo-400 hover:text-indigo-300">${guideText}</a></li>
        <li><a href="/pricing" class="text-indigo-400 hover:text-indigo-300">Nexus pricing</a> — free plan or $9/mo Pro</li>
      </ul>
    </section>`
}

function ctaSection(): string {
  return `
    <!-- CTA -->
    <section class="mt-16 bg-indigo-950 border border-indigo-800 rounded-2xl px-8 py-10 text-center">
      <h2 class="text-2xl font-bold text-white mb-3">Try Nexus free — no credit card needed</h2>
      <p class="text-gray-400 mb-6 max-w-lg mx-auto">
        1,000 traces/month free. Drop in 3 lines of code and see your first trace in under a minute.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="/register" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Start free →
        </a>
        <a href="/demo" class="inline-block bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          View demo
        </a>
      </div>
    </section>`
}

function footer(): string {
  return `
  <footer class="border-t border-gray-800 mt-16 px-4 py-8 text-center text-gray-500 text-sm">
    <div class="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
      <span>© 2026 <a href="/" class="text-indigo-400 hover:text-indigo-300">Nexus</a> by Keylight Digital LLC</span>
      <div class="flex gap-4">
        <a href="/docs" class="hover:text-gray-300 transition-colors">Docs</a>
        <a href="/demo" class="hover:text-gray-300 transition-colors">Demo</a>
        <a href="https://github.com/scobb/nexus" class="hover:text-gray-300 transition-colors">GitHub</a>
        <a href="/auth/login" class="hover:text-gray-300 transition-colors">Sign in</a>
      </div>
    </div>
  </footer>`
}

export function vsLangfusePage(): string {
  return `${comparisonHead(
    'Nexus vs Langfuse — AI Agent Observability Compared',
    'How does Nexus compare to Langfuse for AI agent monitoring? Honest comparison of pricing, self-hosting, ease of use, and features for indie developers.',
    'https://nexus.keylightdigital.dev/vs/langfuse',
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <!-- Header -->
    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Comparison</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">Nexus vs Langfuse</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        Langfuse is excellent — open-source, 21K+ stars, and deeply integrated with the LangChain ecosystem.
        Here's an honest look at when Nexus makes more sense for indie developers and small teams.
      </p>
    </div>

    <!-- TL;DR -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-4">TL;DR</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="font-semibold text-indigo-400 mb-2">Choose Nexus if you…</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>✓ Want hosted observability without maintaining Docker</li>
            <li>✓ Are an indie dev or team of 1–5 people</li>
            <li>✓ Need Python <em>and</em> TypeScript support at $9/mo</li>
            <li>✓ Don't use LangChain and don't want to</li>
            <li>✓ Want 3-line SDK integration, not a full platform</li>
          </ul>
        </div>
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="font-semibold text-purple-400 mb-2">Choose Langfuse if you…</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>✓ Want full data sovereignty (self-host on your infra)</li>
            <li>✓ Are deeply invested in the LangChain ecosystem</li>
            <li>✓ Need the Langfuse prompt management features</li>
            <li>✓ Have a team that can maintain infrastructure</li>
            <li>✓ Need compliance (SOC2, EU data residency)</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Pricing comparison -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Pricing</h2>
      <div class="overflow-x-auto rounded-2xl border border-gray-800">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900">
              <th class="text-left px-5 py-3 text-gray-400 font-medium">Plan</th>
              <th class="text-left px-5 py-3 text-indigo-400 font-semibold">Nexus</th>
              <th class="text-left px-5 py-3 text-purple-400 font-semibold">Langfuse Cloud</th>
              <th class="text-left px-5 py-3 text-gray-400 font-medium">Langfuse Self-hosted</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Free</td>
              <td class="px-5 py-3 text-gray-300">$0 · 1K traces/mo · 1 agent</td>
              <td class="px-5 py-3 text-gray-300">$0 · 50K observations/mo</td>
              <td class="px-5 py-3 text-gray-300">Free (infra cost on you)</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Starter / Pro</td>
              <td class="px-5 py-3 text-gray-300"><strong class="text-white">$9/mo</strong> · 50K traces · unlimited agents</td>
              <td class="px-5 py-3 text-gray-300">$59/mo · 1M observations</td>
              <td class="px-5 py-3 text-gray-300">$0 + your server costs</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Team</td>
              <td class="px-5 py-3 text-gray-300">—</td>
              <td class="px-5 py-3 text-gray-300">$119/mo · 3M observations</td>
              <td class="px-5 py-3 text-gray-300">$0 + your server costs</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-xs text-gray-500 mt-3">Langfuse pricing as of 2026. Self-hosted Langfuse requires Docker, a managed Postgres instance (~$15–50/mo on Railway/Supabase), and maintenance.</p>
    </section>

    <!-- Feature comparison -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Feature comparison</h2>
      <div class="overflow-x-auto rounded-2xl border border-gray-800">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900">
              <th class="text-left px-5 py-3 text-gray-400 font-medium">Feature</th>
              <th class="text-center px-5 py-3 text-indigo-400 font-semibold">Nexus</th>
              <th class="text-center px-5 py-3 text-purple-400 font-semibold">Langfuse</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            ${[
              ['Trace &amp; span ingestion', '✓', '✓'],
              ['Trace viewer (waterfall)', '✓', '✓'],
              ['Email alerts on failure', '✓ (Pro)', '✓'],
              ['TypeScript SDK', '✓ open-source', '✓ open-source'],
              ['Python SDK', '✓ open-source', '✓ open-source'],
              ['Prompt management', '—', '✓'],
              ['LLM evaluations', '—', '✓'],
              ['Self-hosted option', '—', '✓'],
              ['Hosted (no infra)', '✓', '✓'],
              ['Cloudflare edge (global CDN)', '✓', '—'],
              ['Open-source SDK', '✓', '✓'],
              ['Open-source server', '—', '✓ (AGPLv3)'],
              ['Multi-agent dashboard', '✓', '✓'],
              ['Data retention (free)', '30 days', '90 days'],
              ['Setup time', '&lt; 2 min', '5 min (hosted) / 30 min (self-hosted)'],
            ].map(([feat, nexus, langfuse]) => `
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300">${feat}</td>
              <td class="px-5 py-3 text-center ${nexus === '—' ? 'text-gray-600' : 'text-green-400'}">${nexus}</td>
              <td class="px-5 py-3 text-center ${langfuse === '—' ? 'text-gray-600' : 'text-green-400'}">${langfuse}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- When to choose each -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">The honest take</h2>
      <div class="space-y-5 text-gray-300 leading-relaxed">
        <p>
          <strong class="text-white">Langfuse is the right choice</strong> if you need prompt management,
          LLM evaluations, or want to self-host on your own infrastructure for compliance reasons.
          The 21K+ GitHub stars and active community are real — Langfuse has a strong ecosystem
          and is particularly well-integrated with LangChain and LiteLLM.
        </p>
        <p>
          <strong class="text-white">Nexus is the right choice</strong> if you want to add observability
          in 3 lines of code without thinking about Docker, Postgres, or infrastructure costs.
          At $9/mo for 50K traces across unlimited agents, it's designed for indie developers who
          need to ship fast — not ops teams managing servers.
        </p>
        <p>
          The self-hosted Langfuse path is "free" in terms of software license, but in practice it means
          managing a Docker stack, a Postgres database (~$15–50/mo on Railway or Supabase), and keeping
          up with updates. For most indie developers, that's not free — it's a time tax.
        </p>
        <p>
          Nexus runs on Cloudflare's global edge, which means your traces are stored and served from
          the nearest datacenter to your users — no infrastructure to manage, no cold starts.
        </p>
      </div>
    </section>

    ${comparisonRelated('/docs/langchain', 'LangChain observability guide — instrument your chains with Nexus')}

    ${ctaSection()}
  </div>

  ${footer()}
</body>
</html>`
}

export function vsAgentopsPage(): string {
  return `${comparisonHead(
    'Nexus vs AgentOps — AI Agent Observability Compared',
    'How does Nexus compare to AgentOps for AI agent monitoring? Trace-based vs session-based model, pricing comparison, and honest assessment for indie developers.',
    'https://nexus.keylightdigital.dev/vs/agentops',
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <!-- Header -->
    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Comparison</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">Nexus vs AgentOps</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        AgentOps provides session-based agent monitoring with LLM cost tracking. Here's an honest comparison
        of the two tools — different mental models, different pricing, different tradeoffs.
      </p>
    </div>

    <!-- TL;DR -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-4">TL;DR</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="font-semibold text-indigo-400 mb-2">Choose Nexus if you…</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>✓ Want simple trace/span model (not session overhead)</li>
            <li>✓ Need TypeScript support alongside Python</li>
            <li>✓ Want open-source SDK (MIT license)</li>
            <li>✓ Build multi-step agents without a "session" concept</li>
            <li>✓ Prefer $9/mo flat rate over per-event pricing</li>
          </ul>
        </div>
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="font-semibold text-green-400 mb-2">Choose AgentOps if you…</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>✓ Need LLM cost tracking per token/call</li>
            <li>✓ Are building with CrewAI (first-party integration)</li>
            <li>✓ Want session replays with time-travel debugging</li>
            <li>✓ Use AutoGen, LangChain, or other supported frameworks</li>
            <li>✓ Need compliance-ready audit trails (SOC2 context)</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Pricing comparison -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Pricing</h2>
      <div class="overflow-x-auto rounded-2xl border border-gray-800">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900">
              <th class="text-left px-5 py-3 text-gray-400 font-medium">Plan</th>
              <th class="text-left px-5 py-3 text-indigo-400 font-semibold">Nexus</th>
              <th class="text-left px-5 py-3 text-green-400 font-semibold">AgentOps</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Free</td>
              <td class="px-5 py-3 text-gray-300">$0 · 1K traces/mo · 1 agent</td>
              <td class="px-5 py-3 text-gray-300">$0 · limited sessions</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Pro / Developer</td>
              <td class="px-5 py-3 text-gray-300"><strong class="text-white">$9/mo</strong> · 50K traces · unlimited agents</td>
              <td class="px-5 py-3 text-gray-300">Usage-based pricing (contact for details)</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Pricing model</td>
              <td class="px-5 py-3 text-gray-300">Flat monthly rate, no overages</td>
              <td class="px-5 py-3 text-gray-300">Per-session or usage-based</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-xs text-gray-500 mt-3">AgentOps pricing as of 2026. Flat-rate pricing (Nexus) is predictable for indie developers; usage-based can surprise with traffic spikes.</p>
    </section>

    <!-- Feature comparison -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Feature comparison</h2>
      <div class="overflow-x-auto rounded-2xl border border-gray-800">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900">
              <th class="text-left px-5 py-3 text-gray-400 font-medium">Feature</th>
              <th class="text-center px-5 py-3 text-indigo-400 font-semibold">Nexus</th>
              <th class="text-center px-5 py-3 text-green-400 font-semibold">AgentOps</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            ${[
              ['Trace &amp; span model', '✓', '✓ (session-based)'],
              ['Trace viewer (waterfall)', '✓', '✓'],
              ['LLM cost tracking', '—', '✓'],
              ['Email alerts on failure', '✓ (Pro)', '✓'],
              ['TypeScript SDK', '✓ open-source', '—'],
              ['Python SDK', '✓ open-source', '✓'],
              ['CrewAI integration', 'Manual (3 lines)', '✓ (first-party)'],
              ['LangChain integration', 'Manual (3 lines)', '✓'],
              ['AutoGen integration', 'Manual (3 lines)', '✓'],
              ['Open-source SDK', '✓ MIT', 'Partial'],
              ['Open-source server', '—', '—'],
              ['Session replay', '—', '✓'],
              ['Cloudflare edge (global CDN)', '✓', '—'],
              ['Multi-agent dashboard', '✓', '✓'],
              ['Framework-agnostic', '✓', 'Partial (best with supported frameworks)'],
              ['Pricing model', 'Flat rate ($9/mo)', 'Usage-based'],
            ].map(([feat, nexus = '', agentops = '']) => `
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300">${feat}</td>
              <td class="px-5 py-3 text-center ${nexus === '—' ? 'text-gray-600' : nexus.startsWith('✓') ? 'text-green-400' : 'text-gray-300'}">${nexus}</td>
              <td class="px-5 py-3 text-center ${agentops === '—' ? 'text-gray-600' : agentops.startsWith('✓') ? 'text-green-400' : 'text-gray-300'}">${agentops}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- Honest take -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">The honest take</h2>
      <div class="space-y-5 text-gray-300 leading-relaxed">
        <p>
          <strong class="text-white">AgentOps is the right choice</strong> if you need LLM cost tracking
          (dollars spent per token per model), first-party integrations with CrewAI or AutoGen, or session
          replay for time-travel debugging. These are genuine capabilities that Nexus doesn't offer at MVP.
        </p>
        <p>
          <strong class="text-white">Nexus is the right choice</strong> if you want a simple trace/span
          model without the session abstraction overhead. AgentOps's "session" concept works well for
          conversation-style agents but adds conceptual weight for batch processing agents or pipelines.
          Nexus's flat $9/mo is also more predictable than usage-based pricing for developers with
          variable traffic.
        </p>
        <p>
          One notable gap: AgentOps has no TypeScript SDK. If you're building agents in TypeScript —
          with the Vercel AI SDK, Anthropic's Node.js SDK, or directly in Cloudflare Workers —
          AgentOps is not a practical option today. Nexus supports TypeScript natively.
        </p>
        <p>
          The mental model difference matters: AgentOps organizes telemetry around "sessions" (a single
          agent invocation with replays). Nexus organizes around "traces and spans" (modeled after
          OpenTelemetry), which is more natural for agents that spawn sub-agents or run in pipelines.
          Neither is objectively better — it depends on how your agent is structured.
        </p>
      </div>
    </section>

    ${comparisonRelated('/docs/crewai', 'CrewAI observability guide — monitor multi-agent crews with Nexus')}

    ${ctaSection()}
  </div>

  ${footer()}
</body>
</html>`
}

export function vsArizePhoenixPage(): string {
  return `${comparisonHead(
    'Nexus vs Arize Phoenix — AI Agent Observability Compared',
    'How does Nexus compare to Arize Phoenix for AI agent monitoring? Hosted simplicity vs self-hosted Jupyter notebooks. Honest comparison of pricing, setup, and features.',
    'https://nexus.keylightdigital.dev/vs/arize-phoenix',
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <!-- Header -->
    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Comparison</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">Nexus vs Arize Phoenix</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        Arize Phoenix is a powerful open-source observability tool designed for data scientists and ML teams.
        Here's an honest comparison of when Nexus or Phoenix is the better fit for your workflow.
      </p>
    </div>

    <!-- TL;DR -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-4">TL;DR</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="font-semibold text-indigo-400 mb-2">Choose Nexus if you…</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>✓ Want hosted observability — no server to run</li>
            <li>✓ Build agents as services (not in notebooks)</li>
            <li>✓ Need TypeScript support alongside Python</li>
            <li>✓ Don't have a DevOps team for infrastructure</li>
            <li>✓ Want a dashboard your non-ML teammates can use</li>
          </ul>
        </div>
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="font-semibold text-orange-400 mb-2">Choose Arize Phoenix if you…</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>✓ Work in Jupyter notebooks for ML experiments</li>
            <li>✓ Need LLM evaluation and dataset curation tools</li>
            <li>✓ Require full data sovereignty (self-hosted)</li>
            <li>✓ Use OpenTelemetry natively across your stack</li>
            <li>✓ Have infrastructure experience and want free tooling</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Pricing comparison -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Pricing</h2>
      <div class="overflow-x-auto rounded-2xl border border-gray-800">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900">
              <th class="text-left px-5 py-3 text-gray-400 font-medium">Plan</th>
              <th class="text-left px-5 py-3 text-indigo-400 font-semibold">Nexus</th>
              <th class="text-left px-5 py-3 text-orange-400 font-semibold">Arize Phoenix</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Free</td>
              <td class="px-5 py-3 text-gray-300">$0 · 1K traces/mo · 1 agent</td>
              <td class="px-5 py-3 text-gray-300">Free (self-hosted, open-source)</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Pro / Hosted</td>
              <td class="px-5 py-3 text-gray-300"><strong class="text-white">$9/mo</strong> · 50K traces · unlimited agents</td>
              <td class="px-5 py-3 text-gray-300">Cloud (Arize) — custom pricing</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Infrastructure cost</td>
              <td class="px-5 py-3 text-gray-300">None (Cloudflare edge)</td>
              <td class="px-5 py-3 text-gray-300">$15–50/mo server + maintenance</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-xs text-gray-500 mt-3">Phoenix is free software but self-hosting requires a running server, adding real infrastructure cost and maintenance burden.</p>
    </section>

    <!-- Feature comparison -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Feature comparison</h2>
      <div class="overflow-x-auto rounded-2xl border border-gray-800">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900">
              <th class="text-left px-5 py-3 text-gray-400 font-medium">Feature</th>
              <th class="text-center px-5 py-3 text-indigo-400 font-semibold">Nexus</th>
              <th class="text-center px-5 py-3 text-orange-400 font-semibold">Arize Phoenix</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            ${[
              ['Trace &amp; span ingestion', '✓', '✓'],
              ['Trace viewer (waterfall)', '✓', '✓'],
              ['Email alerts on failure', '✓ (Pro)', '—'],
              ['TypeScript SDK', '✓ open-source', '—'],
              ['Python SDK', '✓ open-source', '✓ open-source'],
              ['OpenTelemetry support', '—', '✓'],
              ['LLM evaluations', '—', '✓'],
              ['Dataset curation', '—', '✓'],
              ['Jupyter notebook integration', '—', '✓ (native)'],
              ['Hosted (no infra)', '✓', 'Arize Cloud only'],
              ['Self-hosted option', '—', '✓'],
              ['Open-source server', '—', '✓ (Apache 2.0)'],
              ['Cloudflare edge (global CDN)', '✓', '—'],
              ['Multi-agent dashboard', '✓', '✓'],
              ['Setup time', '&lt; 2 min', '10–30 min (self-hosted)'],
            ].map(([feat, nexus, phoenix]) => `
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300">${feat}</td>
              <td class="px-5 py-3 text-center ${nexus === '—' ? 'text-gray-600' : 'text-green-400'}">${nexus}</td>
              <td class="px-5 py-3 text-center ${phoenix === '—' ? 'text-gray-600' : 'text-green-400'}">${phoenix}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- The honest take -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">The honest take</h2>
      <div class="space-y-5 text-gray-300 leading-relaxed">
        <p>
          <strong class="text-white">Arize Phoenix is the right choice</strong> if you're a data scientist
          running experiments in Jupyter notebooks and need deep LLM evaluation capabilities. Phoenix's
          OpenTelemetry-native design is excellent for teams already using OTEL across their stack.
          The open-source Apache 2.0 license is permissive — you can self-host and own your data completely.
        </p>
        <p>
          <strong class="text-white">Nexus is the right choice</strong> if you're building AI agents as
          production services (not experiments) and want monitoring without running infrastructure.
          Phoenix's self-hosted model works well in a data science context but is friction for
          a developer shipping a product to real users — you don't want to maintain another server.
        </p>
        <p>
          A notable gap: Phoenix has no TypeScript SDK. If you're building agents in TypeScript
          (e.g., with the Vercel AI SDK, Anthropic's SDK, or a Cloudflare Worker), Phoenix isn't
          a practical option. Nexus supports TypeScript natively with the same 3-line integration.
        </p>
        <p>
          The meta-narrative here is interesting: Nexus was built by an AI agent (Ralph) to monitor
          AI agents. Phoenix was designed by ML engineers at Arize for their enterprise platform and
          then open-sourced. Both are real tools — they're just solving for different audiences.
        </p>
      </div>
    </section>

    ${comparisonRelated('/docs/openai-agents', 'OpenAI Agents SDK guide — trace your OpenAI agents with Nexus')}

    ${ctaSection()}
  </div>

  ${footer()}
</body>
</html>`
}

export function vsLangsmithPage(): string {
  return `${comparisonHead(
    'Nexus vs LangSmith — AI Agent Observability Compared',
    'How does Nexus compare to LangSmith for AI agent monitoring? Honest comparison of pricing, LangChain dependency, ease of use, and features for indie developers.',
    'https://nexus.keylightdigital.dev/vs/langsmith',
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <!-- Header -->
    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Comparison</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">Nexus vs LangSmith</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        LangSmith is the official observability tool from the LangChain team — powerful, polished,
        and tightly integrated with their ecosystem. Here's when Nexus is the better fit.
      </p>
    </div>

    <!-- TL;DR -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-4">TL;DR</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="font-semibold text-indigo-400 mb-2">Choose Nexus if you…</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>✓ Don't use LangChain (or don't want to be locked in)</li>
            <li>✓ Need simple agent monitoring at $9/mo vs $39/mo</li>
            <li>✓ Want an open-source SDK (MIT license)</li>
            <li>✓ Build with Python, TypeScript, or both</li>
            <li>✓ Want 3-line integration without framework wrappers</li>
          </ul>
        </div>
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="font-semibold text-orange-400 mb-2">Choose LangSmith if you…</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>✓ Are deeply committed to the LangChain framework</li>
            <li>✓ Need LangSmith's prompt hub and evaluation tools</li>
            <li>✓ Have a team that can justify $39+/mo</li>
            <li>✓ Want first-party support from the LangChain team</li>
            <li>✓ Already use LangChain callbacks/tracing</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Pricing comparison -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Pricing</h2>
      <div class="overflow-x-auto rounded-2xl border border-gray-800">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900">
              <th class="text-left px-5 py-3 text-gray-400 font-medium">Plan</th>
              <th class="text-left px-5 py-3 text-indigo-400 font-semibold">Nexus</th>
              <th class="text-left px-5 py-3 text-orange-400 font-semibold">LangSmith</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Free</td>
              <td class="px-5 py-3 text-gray-300">$0 · 1K traces/mo · 1 agent</td>
              <td class="px-5 py-3 text-gray-300">$0 · 5K traces/mo</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Developer / Pro</td>
              <td class="px-5 py-3 text-gray-300"><strong class="text-white">$9/mo</strong> · 50K traces · unlimited agents</td>
              <td class="px-5 py-3 text-gray-300">$39/mo · 50K traces (+ $0.005/trace overage)</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Team / Enterprise</td>
              <td class="px-5 py-3 text-gray-300">—</td>
              <td class="px-5 py-3 text-gray-300">Custom pricing</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-xs text-gray-500 mt-3">LangSmith pricing as of 2026. Overage charges on LangSmith can surprise teams with high trace volume.</p>
    </section>

    <!-- Feature comparison -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Feature comparison</h2>
      <div class="overflow-x-auto rounded-2xl border border-gray-800">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900">
              <th class="text-left px-5 py-3 text-gray-400 font-medium">Feature</th>
              <th class="text-center px-5 py-3 text-indigo-400 font-semibold">Nexus</th>
              <th class="text-center px-5 py-3 text-orange-400 font-semibold">LangSmith</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            ${[
              ['Trace &amp; span ingestion', '✓', '✓'],
              ['Trace viewer (waterfall)', '✓', '✓'],
              ['Email alerts on failure', '✓ (Pro)', '✓'],
              ['TypeScript SDK', '✓ open-source', '✓'],
              ['Python SDK', '✓ open-source', '✓'],
              ['LangChain integration', '—', '✓ (first-party)'],
              ['Prompt hub', '—', '✓'],
              ['Dataset &amp; evaluations', '—', '✓'],
              ['Open-source SDK', '✓ MIT', '✓ MIT'],
              ['Open-source server', '—', '—'],
              ['Self-hosted option', '—', '—'],
              ['Cloudflare edge (global CDN)', '✓', '—'],
              ['Multi-agent dashboard', '✓', '✓'],
              ['Framework-agnostic', '✓', 'Partial (best with LangChain)'],
              ['Per-seat pricing', 'No', 'No'],
              ['Overage charges', 'No', 'Yes ($0.005/trace)'],
            ].map(([feat, nexus = '', langsmith = '']) => `
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300">${feat}</td>
              <td class="px-5 py-3 text-center ${nexus === '—' ? 'text-gray-600' : nexus.startsWith('✓') ? 'text-green-400' : 'text-gray-300'}">${nexus}</td>
              <td class="px-5 py-3 text-center ${langsmith === '—' ? 'text-gray-600' : langsmith.startsWith('✓') ? 'text-green-400' : 'text-gray-300'}">${langsmith}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- When to choose each -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">The honest take</h2>
      <div class="space-y-5 text-gray-300 leading-relaxed">
        <p>
          <strong class="text-white">LangSmith is the right choice</strong> if you're building with
          LangChain. The first-party integration means you get automatic tracing without writing
          any SDK code — your chains, agents, and retrievers are instrumented out of the box.
          The prompt hub and evaluation tools are genuinely useful for teams iterating on prompts.
        </p>
        <p>
          <strong class="text-white">Nexus is the right choice</strong> if you're not using LangChain —
          or you want to avoid framework lock-in. Most production AI agents don't use LangChain:
          they call the OpenAI API directly, use LiteLLM, or write their own orchestration.
          Nexus instruments any agent with 3 lines of code regardless of framework.
        </p>
        <p>
          The pricing gap is significant for indie developers: at the same trace volume,
          LangSmith charges $39/mo where Nexus charges $9/mo. With LangSmith's overage charges,
          a spike in traffic (say, from a Show HN post) can trigger unexpected bills.
          Nexus has no overage — if you hit the 50K limit, ingestion stops gracefully with a clear error.
        </p>
        <p>
          LangSmith's server is not open-source — you can't inspect what happens to your trace data
          or self-host it. Nexus's SDK is MIT-licensed and <a href="https://github.com/scobb/nexus" class="text-indigo-400 hover:text-indigo-300">open-source on GitHub</a>.
        </p>
      </div>
    </section>

    ${comparisonRelated('/docs/langchain', 'LangChain observability guide — monitor your chains without LangSmith')}

    ${ctaSection()}
  </div>

  ${footer()}
</body>
</html>`
}

export function alternativesPage(): string {
  const faqJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best alternative to Langfuse?',
        acceptedAnswer: { '@type': 'Answer', text: 'Nexus is a strong Langfuse alternative if you want a hosted solution with no infrastructure to manage. Langfuse is the best choice if you need self-hosting or a very mature OSS ecosystem. LangSmith is ideal if you are already using LangChain.' },
      },
      {
        '@type': 'Question',
        name: 'What is the cheapest AI agent monitoring tool?',
        acceptedAnswer: { '@type': 'Answer', text: 'Nexus offers a permanent free tier (1,000 traces/month) and a Pro plan at $9/month — the lowest flat-rate paid tier among hosted AI observability tools. Langfuse is free to self-host but requires a server to run.' },
      },
      {
        '@type': 'Question',
        name: 'Which AI observability tool works with TypeScript agents?',
        acceptedAnswer: { '@type': 'Answer', text: 'Nexus, Langfuse, and LangSmith all have official TypeScript SDKs. Nexus and Langfuse provide framework-agnostic SDKs that work with any TypeScript agent. LangSmith is optimized for LangChain/LangGraph specifically.' },
      },
      {
        '@type': 'Question',
        name: 'Do I need to self-host an AI observability tool?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. Nexus, LangSmith, and AgentOps are fully hosted — no server required. Langfuse and Arize Phoenix can be self-hosted if you need full data control. Self-hosting gives you data sovereignty but adds operational overhead.' },
      },
    ],
  })
  return `${comparisonHead(
    'Best AI Agent Monitoring Alternatives — Nexus vs Langfuse vs LangSmith vs AgentOps',
    'Comparing the top AI agent monitoring and observability tools: Nexus, Langfuse, LangSmith, Arize Phoenix, and AgentOps. Pricing, features, and honest tradeoffs for indie developers.',
    'https://nexus.keylightdigital.dev/alternatives',
  )}
<script type="application/ld+json">${faqJsonLd}</script>
<body class="bg-gray-950 text-white min-h-screen">
${navBar}

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <!-- Header -->
    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Alternatives</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">AI Agent Monitoring Alternatives</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        A honest comparison of every major AI agent observability tool — pricing, features, and tradeoffs.
        Updated 2026.
      </p>
    </div>

    <!-- Summary table -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-white mb-6">At a glance</h2>
      <div class="overflow-x-auto rounded-2xl border border-gray-800">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900">
              <th class="text-left px-4 py-3 text-gray-400 font-medium">Tool</th>
              <th class="text-left px-4 py-3 text-gray-400 font-medium">Price</th>
              <th class="text-left px-4 py-3 text-gray-400 font-medium">Hosting</th>
              <th class="text-left px-4 py-3 text-gray-400 font-medium">TypeScript</th>
              <th class="text-left px-4 py-3 text-gray-400 font-medium">Best for</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr class="bg-indigo-950/30 hover:bg-indigo-950/50 transition-colors">
              <td class="px-4 py-3 font-semibold text-indigo-400">
                <a href="/" class="hover:text-indigo-300">Nexus</a>
              </td>
              <td class="px-4 py-3 text-gray-300">$0 / $9/mo</td>
              <td class="px-4 py-3 text-green-400">✓ Hosted</td>
              <td class="px-4 py-3 text-green-400">✓ Yes</td>
              <td class="px-4 py-3 text-gray-300">Indie devs, small teams</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-4 py-3 font-semibold text-purple-400">
                <a href="/vs/langfuse" class="hover:text-purple-300">Langfuse</a>
              </td>
              <td class="px-4 py-3 text-gray-300">$0 / $59/mo+</td>
              <td class="px-4 py-3 text-green-400">✓ Both</td>
              <td class="px-4 py-3 text-green-400">✓ Yes</td>
              <td class="px-4 py-3 text-gray-300">LangChain teams, self-hosters</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-4 py-3 font-semibold text-orange-400">
                <a href="/vs/langsmith" class="hover:text-orange-300">LangSmith</a>
              </td>
              <td class="px-4 py-3 text-gray-300">$0 / $39/mo+</td>
              <td class="px-4 py-3 text-green-400">✓ Hosted</td>
              <td class="px-4 py-3 text-green-400">✓ Yes</td>
              <td class="px-4 py-3 text-gray-300">LangChain-native teams</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-4 py-3 font-semibold text-yellow-400">
                <a href="/vs/arize-phoenix" class="hover:text-yellow-300">Arize Phoenix</a>
              </td>
              <td class="px-4 py-3 text-gray-300">Free (self-hosted)</td>
              <td class="px-4 py-3 text-gray-400">Self-hosted only</td>
              <td class="px-4 py-3 text-gray-600">— No</td>
              <td class="px-4 py-3 text-gray-300">Data scientists, ML teams</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-4 py-3 font-semibold text-green-400">
                <a href="/vs/agentops" class="hover:text-green-300">AgentOps</a>
              </td>
              <td class="px-4 py-3 text-gray-300">$0 / Usage-based</td>
              <td class="px-4 py-3 text-green-400">&#10003; Hosted</td>
              <td class="px-4 py-3 text-gray-600">— No</td>
              <td class="px-4 py-3 text-gray-300">CrewAI/AutoGen users, cost tracking</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-4 py-3 font-semibold text-purple-400">
                <a href="/vs/datadog" class="hover:text-purple-300">Datadog</a>
              </td>
              <td class="px-4 py-3 text-gray-300">Usage-based (~$100s/mo)</td>
              <td class="px-4 py-3 text-green-400">&#10003; Hosted</td>
              <td class="px-4 py-3 text-gray-400">Limited</td>
              <td class="px-4 py-3 text-gray-300">Enterprises already on Datadog APM</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-4 py-3 font-semibold text-yellow-400">
                <a href="/vs/wandb" class="hover:text-yellow-300">W&amp;B Weave</a>
              </td>
              <td class="px-4 py-3 text-gray-300">$0 / $50+/seat</td>
              <td class="px-4 py-3 text-green-400">&#10003; Hosted</td>
              <td class="px-4 py-3 text-gray-400">Limited</td>
              <td class="px-4 py-3 text-gray-300">ML teams running LLM experiments</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-4 py-3 font-semibold text-teal-400">
                <a href="/vs/portkey" class="hover:text-teal-300">Portkey</a>
              </td>
              <td class="px-4 py-3 text-gray-300">$0 / Usage-based</td>
              <td class="px-4 py-3 text-green-400">&#10003; Hosted</td>
              <td class="px-4 py-3 text-green-400">&#10003; Yes</td>
              <td class="px-4 py-3 text-gray-300">LLM gateway routing, multi-provider switching</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Individual tool summaries -->
    <section class="mb-12 space-y-6">
      <h2 class="text-2xl font-bold text-white mb-6">Detailed comparisons</h2>

      <!-- Nexus -->
      <div class="bg-gray-900 border border-indigo-800 rounded-2xl px-6 py-6">
        <div class="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div>
            <h3 class="text-xl font-bold text-indigo-400">Nexus</h3>
            <p class="text-sm text-gray-400">Simple, hosted agent observability at indie developer pricing</p>
          </div>
          <span class="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">This product</span>
        </div>
        <div class="grid sm:grid-cols-3 gap-4 mb-4">
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Pricing</p><p class="text-sm text-white">$0 free · <strong>$9/mo Pro</strong></p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Hosting</p><p class="text-sm text-white">Fully hosted (Cloudflare edge)</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">SDKs</p><p class="text-sm text-white">TypeScript + Python (MIT)</p></div>
        </div>
        <p class="text-sm text-gray-300 mb-4">
          Built by an AI agent (Ralph) for AI agents. Cloudflare-native means near-zero COGS and global edge performance.
          Drop-in 3-line SDK integration — no framework required.
        </p>
        <div class="flex gap-3">
          <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">Start free →</a>
          <a href="/demo" class="text-sm bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">View demo</a>
        </div>
      </div>

      <!-- Langfuse -->
      <div class="bg-gray-900 border border-gray-700 rounded-2xl px-6 py-6">
        <div class="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div>
            <h3 class="text-xl font-bold text-purple-400">Langfuse</h3>
            <p class="text-sm text-gray-400">Open-source LLM observability — 21K+ GitHub stars</p>
          </div>
          <span class="bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Alternative</span>
        </div>
        <div class="grid sm:grid-cols-3 gap-4 mb-4">
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Pricing</p><p class="text-sm text-white">$0 cloud · $59/mo+ · Self-hosted free</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Hosting</p><p class="text-sm text-white">Cloud or self-hosted (Docker)</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">SDKs</p><p class="text-sm text-white">TypeScript + Python (MIT)</p></div>
        </div>
        <p class="text-sm text-gray-300 mb-4">
          Best for LangChain-native teams and developers who need prompt management or want full data sovereignty via self-hosting.
          The 21K stars reflect genuine quality and community.
        </p>
        <a href="/vs/langfuse" class="text-sm text-indigo-400 hover:text-indigo-300">Nexus vs Langfuse →</a>
      </div>

      <!-- LangSmith -->
      <div class="bg-gray-900 border border-gray-700 rounded-2xl px-6 py-6">
        <div class="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div>
            <h3 class="text-xl font-bold text-orange-400">LangSmith</h3>
            <p class="text-sm text-gray-400">Official observability tool from the LangChain team</p>
          </div>
          <span class="bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Alternative</span>
        </div>
        <div class="grid sm:grid-cols-3 gap-4 mb-4">
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Pricing</p><p class="text-sm text-white">$0 · $39/mo+ (+ overage)</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Hosting</p><p class="text-sm text-white">Hosted only (no self-host)</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">SDKs</p><p class="text-sm text-white">TypeScript + Python</p></div>
        </div>
        <p class="text-sm text-gray-300 mb-4">
          Deep LangChain integration with automatic tracing — no instrumentation code needed if you use LangChain.
          Prompt hub and evaluation tools are polished. Closed-source server.
        </p>
        <a href="/vs/langsmith" class="text-sm text-indigo-400 hover:text-indigo-300">Nexus vs LangSmith →</a>
      </div>

      <!-- Arize Phoenix -->
      <div class="bg-gray-900 border border-gray-700 rounded-2xl px-6 py-6">
        <div class="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div>
            <h3 class="text-xl font-bold text-yellow-400">Arize Phoenix</h3>
            <p class="text-sm text-gray-400">Open-source, Jupyter-native LLM observability (Apache 2.0)</p>
          </div>
          <span class="bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Alternative</span>
        </div>
        <div class="grid sm:grid-cols-3 gap-4 mb-4">
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Pricing</p><p class="text-sm text-white">Free (self-hosted)</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Hosting</p><p class="text-sm text-white">Self-hosted (+ Arize Cloud)</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">SDKs</p><p class="text-sm text-white">Python only (OTEL)</p></div>
        </div>
        <p class="text-sm text-gray-300 mb-4">
          Designed for data scientists in Jupyter notebooks. Excellent LLM evaluation, dataset curation, and OpenTelemetry native.
          No TypeScript SDK. Requires running your own server.
        </p>
        <a href="/vs/arize-phoenix" class="text-sm text-indigo-400 hover:text-indigo-300">Nexus vs Arize Phoenix →</a>
      </div>

      <!-- AgentOps -->
      <div class="bg-gray-900 border border-gray-700 rounded-2xl px-6 py-6">
        <div class="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div>
            <h3 class="text-xl font-bold text-green-400">AgentOps</h3>
            <p class="text-sm text-gray-400">Session-based agent monitoring with LLM cost tracking</p>
          </div>
          <span class="bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Alternative</span>
        </div>
        <div class="grid sm:grid-cols-3 gap-4 mb-4">
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Pricing</p><p class="text-sm text-white">$0 · Usage-based</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Hosting</p><p class="text-sm text-white">Hosted only</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">SDKs</p><p class="text-sm text-white">Python only</p></div>
        </div>
        <p class="text-sm text-gray-300 mb-4">
          Best for CrewAI and AutoGen users — first-party integrations with those frameworks. Unique LLM cost tracking feature.
          Session-based model differs from trace/span. No TypeScript SDK.
        </p>
        <a href="/vs/agentops" class="text-sm text-indigo-400 hover:text-indigo-300">Nexus vs AgentOps →</a>
      </div>

      <!-- Helicone -->
      <div class="bg-gray-900 border border-gray-700 rounded-2xl px-6 py-6">
        <div class="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div>
            <h3 class="text-xl font-bold text-cyan-400">Helicone</h3>
            <p class="text-sm text-gray-400">AI gateway and LLM request logging via proxy</p>
          </div>
          <span class="bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Alternative</span>
        </div>
        <div class="grid sm:grid-cols-3 gap-4 mb-4">
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Pricing</p><p class="text-sm text-white">$0 · $120/mo Team+</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Hosting</p><p class="text-sm text-white">Hosted (proxy-based)</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">SDKs</p><p class="text-sm text-white">TypeScript + Python (proxy)</p></div>
        </div>
        <p class="text-sm text-gray-300 mb-4">
          Best for developers who want automatic LLM call logging without code changes — route requests through Helicone's proxy and every call is captured. Includes caching, rate limiting, and prompt management.
        </p>
        <a href="/vs/helicone" class="text-sm text-indigo-400 hover:text-indigo-300">Nexus vs Helicone →</a>
      </div>

      <!-- Braintrust -->
      <div class="bg-gray-900 border border-gray-700 rounded-2xl px-6 py-6">
        <div class="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div>
            <h3 class="text-xl font-bold text-rose-400">Braintrust</h3>
            <p class="text-sm text-gray-400">LLM evaluation platform with experiment tracking and production logging</p>
          </div>
          <span class="bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Alternative</span>
        </div>
        <div class="grid sm:grid-cols-3 gap-4 mb-4">
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Pricing</p><p class="text-sm text-white">$0 · Usage-based</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Hosting</p><p class="text-sm text-white">Hosted only</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">SDKs</p><p class="text-sm text-white">TypeScript + Python</p></div>
        </div>
        <p class="text-sm text-gray-300 mb-4">
          Best for teams that run structured LLM evaluations — compare prompts, models, and configurations against test datasets. Strong eval framework, dataset management, and prompt playground. Costs scale quickly with log volume.
        </p>
        <a href="/vs/braintrust" class="text-sm text-indigo-400 hover:text-indigo-300">Nexus vs Braintrust →</a>
      </div>

      <!-- Datadog -->
      <div class="bg-gray-900 border border-gray-700 rounded-2xl px-6 py-6">
        <div class="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div>
            <h3 class="text-xl font-bold text-purple-400">Datadog LLM Monitoring</h3>
            <p class="text-sm text-gray-400">APM giant's bolt-on LLM observability — powerful but expensive</p>
          </div>
          <span class="bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Alternative</span>
        </div>
        <div class="grid sm:grid-cols-3 gap-4 mb-4">
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Pricing</p><p class="text-sm text-white">Usage-based (per token logged + APM base)</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Hosting</p><p class="text-sm text-white">Hosted (+ on-prem Enterprise)</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">SDKs</p><p class="text-sm text-white">Python + limited TS (via Datadog Agent)</p></div>
        </div>
        <p class="text-sm text-gray-300 mb-4">
          Best for large engineering orgs already running Datadog for APM and infra monitoring. The LLM Observability
          add-on integrates with existing Datadog dashboards and alerting. Usage-based pricing scales poorly for
          high-volume AI agents — costs can reach hundreds per month quickly.
        </p>
        <a href="/vs/datadog" class="text-sm text-indigo-400 hover:text-indigo-300">Nexus vs Datadog →</a>
      </div>

      <!-- W&B Weave -->
      <div class="bg-gray-900 border border-gray-700 rounded-2xl px-6 py-6">
        <div class="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div>
            <h3 class="text-xl font-bold text-yellow-400">Weights &amp; Biases Weave</h3>
            <p class="text-sm text-gray-400">ML experiment tracker with LLM tracing and evaluation</p>
          </div>
          <span class="bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Alternative</span>
        </div>
        <div class="grid sm:grid-cols-3 gap-4 mb-4">
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Pricing</p><p class="text-sm text-white">$0 free · $50+/seat Teams</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Hosting</p><p class="text-sm text-white">Hosted (+ on-prem Enterprise)</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">SDKs</p><p class="text-sm text-white">Python primary (limited TypeScript)</p></div>
        </div>
        <p class="text-sm text-gray-300 mb-4">
          Best for ML teams that use W&amp;B for experiment tracking and want to add LLM tracing without a separate tool. Strong
          evaluation framework for comparing prompts and models against test datasets. Production monitoring features are secondary
          to the experiment-tracking core.
        </p>
        <a href="/vs/wandb" class="text-sm text-indigo-400 hover:text-indigo-300">Nexus vs W&amp;B Weave →</a>
      </div>

      <!-- Portkey -->
      <div class="bg-gray-900 border border-gray-700 rounded-2xl px-6 py-6">
        <div class="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div>
            <h3 class="text-xl font-bold text-teal-400">Portkey</h3>
            <p class="text-sm text-gray-400">AI gateway with routing, fallbacks, and LLM request logging</p>
          </div>
          <span class="bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">Alternative</span>
        </div>
        <div class="grid sm:grid-cols-3 gap-4 mb-4">
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Pricing</p><p class="text-sm text-white">$0 free · Usage-based</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Hosting</p><p class="text-sm text-white">Hosted (+ self-hosted OSS)</p></div>
          <div><p class="text-xs text-gray-500 uppercase tracking-widest mb-1">SDKs</p><p class="text-sm text-white">TypeScript + Python (proxy)</p></div>
        </div>
        <p class="text-sm text-gray-300 mb-4">
          Best for teams that need LLM gateway features: route between providers, add fallbacks, manage API keys centrally,
          and cache responses. Proxy-based approach captures LLM calls automatically. Agent-level trace/span depth is limited
          compared to instrumentation-first tools.
        </p>
        <a href="/vs/portkey" class="text-sm text-indigo-400 hover:text-indigo-300">Nexus vs Portkey →</a>
      </div>

    </section>

    ${ctaSection()}
  </div>

  ${footer()}
</body>
</html>`
}

export function vsDatadogPage(): string {
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Nexus vs Datadog LLM Monitoring — AI Agent Observability",
    "description": "Nexus vs Datadog for AI agent monitoring: purpose-built observability at $9/mo vs Datadog's usage-based LLM add-on. Pricing, setup complexity, and honest tradeoffs.",
    "url": "https://nexus.keylightdigital.dev/vs/datadog",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Feature Comparison: Nexus vs Datadog LLM Monitoring",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Nexus — AI-native agent trace/span observability at $9/mo" },
        { "@type": "ListItem", "position": 2, "name": "Datadog LLM Observability — APM giant's bolt-on LLM monitoring, usage-based pricing" }
      ]
    }
  })

  return `${comparisonHead(
    'Nexus vs Datadog LLM Monitoring — AI Agent Observability',
    "Nexus vs Datadog for AI agent monitoring: purpose-built observability at $9/mo vs Datadog's usage-based LLM add-on. Pricing, setup complexity, and honest tradeoffs.",
    'https://nexus.keylightdigital.dev/vs/datadog',
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}
  <script type="application/ld+json">${structuredData}</script>

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <!-- Header -->
    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Comparison</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">Nexus vs Datadog LLM Monitoring</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        Datadog is the undisputed leader in infrastructure APM — and recently added LLM Observability as an
        add-on product. Here is an honest look at when a purpose-built AI agent tool makes more sense than
        bolting LLM monitoring onto your existing APM stack.
      </p>
    </div>

    <!-- TL;DR -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-4">TL;DR</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="font-semibold text-indigo-400 mb-2">Choose Nexus if you...</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>&#10003; Are building AI agents as a core product, not a side feature</li>
            <li>&#10003; Want a trace/span model designed for multi-step agent workflows</li>
            <li>&#10003; Need flat-rate pricing with no usage-based surprises</li>
            <li>&#10003; Are an indie dev or small team without a Datadog contract</li>
            <li>&#10003; Want lightweight SDK with zero infrastructure overhead</li>
          </ul>
        </div>
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="font-semibold text-purple-400 mb-2">Choose Datadog if you...</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>&#10003; Already pay for Datadog APM and want everything in one platform</li>
            <li>&#10003; Need LLM monitoring as part of broader infra + application observability</li>
            <li>&#10003; Have a dedicated SRE/DevOps team managing your Datadog account</li>
            <li>&#10003; Need enterprise compliance, SSO, RBAC, and audit logs</li>
            <li>&#10003; Your AI feature is one service among many in a large microservices stack</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Key difference callout -->
    <section class="bg-gray-900 border border-amber-800/40 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-3">The fundamental difference: purpose-built vs bolted-on</h2>
      <div class="space-y-3 text-sm text-gray-300 leading-relaxed">
        <p>
          <strong class="text-white">Nexus is purpose-built for AI agents:</strong> the trace model maps directly
          to how agents work — a trace is a complete agent run, spans are the individual steps (LLM calls,
          tool uses, sub-agent invocations). Every concept in Nexus exists because AI agents need it.
        </p>
        <p>
          <strong class="text-white">Datadog LLM Observability is an extension to a general APM platform:</strong>
          powerful, but you pay for Datadog's full platform to access it. The trace model is Datadog's generic
          distributed tracing model adapted for LLMs — not designed from the ground up for agent workflows.
        </p>
        <p class="text-amber-200/70">
          If you are already a Datadog customer running a complex production stack, adding LLM monitoring inside
          Datadog is the pragmatic choice. If you are building an AI-first product from scratch, paying
          usage-based pricing for what amounts to structured logging is hard to justify at indie developer scale.
        </p>
      </div>
    </section>

    <!-- Pricing comparison -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Pricing</h2>
      <div class="overflow-x-auto rounded-2xl border border-gray-800">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900">
              <th class="text-left px-5 py-3 text-gray-400 font-medium">Plan</th>
              <th class="text-left px-5 py-3 text-indigo-400 font-semibold">Nexus</th>
              <th class="text-left px-5 py-3 text-purple-400 font-semibold">Datadog LLM Obs.</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Free</td>
              <td class="px-5 py-3 text-gray-300">$0 &middot; 1K traces/mo &middot; 1 agent</td>
              <td class="px-5 py-3 text-gray-300">No free tier (requires paid Datadog plan)</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Indie / Pro</td>
              <td class="px-5 py-3 text-gray-300"><strong class="text-white">$9/mo flat</strong> &middot; 50K traces &middot; unlimited agents</td>
              <td class="px-5 py-3 text-gray-300">~$0.10/1K LLM tokens logged + base APM cost (~$15-$31/host/mo)</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Enterprise</td>
              <td class="px-5 py-3 text-gray-300">—</td>
              <td class="px-5 py-3 text-gray-300">Custom contracts, typically $100s–$1000s/mo</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-xs text-gray-500 mt-3">Datadog pricing as of 2026 — LLM Observability is billed per token logged on top of existing APM/infrastructure costs. A team running an AI agent at moderate scale can easily exceed $100/mo in Datadog LLM costs alone.</p>
    </section>

    <!-- Feature comparison -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Feature comparison</h2>
      <div class="overflow-x-auto rounded-2xl border border-gray-800">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900">
              <th class="text-left px-5 py-3 text-gray-400 font-medium">Feature</th>
              <th class="text-center px-5 py-3 text-indigo-400 font-semibold">Nexus</th>
              <th class="text-center px-5 py-3 text-purple-400 font-semibold">Datadog</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            ${[
              ['Agent trace &amp; span waterfall', '&#10003; purpose-built', 'Partial (adapted APM)'],
              ['LLM call logging', '&#10003;', '&#10003;'],
              ['Multi-agent dashboard', '&#10003;', 'Partial'],
              ['Email alerts on failure', '&#10003; (Pro)', '&#10003; (Datadog monitors)'],
              ['TypeScript SDK', '&#10003; open-source MIT', 'Limited'],
              ['Python SDK', '&#10003; open-source MIT', '&#10003;'],
              ['Infrastructure monitoring', '—', '&#10003; (core product)'],
              ['APM distributed tracing', '—', '&#10003; (core product)'],
              ['Log management', '—', '&#10003;'],
              ['SSO / RBAC / audit logs', '—', '&#10003; (Enterprise)'],
              ['Flat-rate pricing', '&#10003; $9/mo', '—'],
              ['Cloudflare edge (global CDN)', '&#10003;', '—'],
              ['Setup time (AI agent only)', '&lt; 2 min', '30–60 min (agent install)'],
              ['Self-hosted option', '—', 'On-premises (Enterprise)'],
            ].map(([feat, nexus, dd]) => `
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300">${feat}</td>
              <td class="px-5 py-3 text-center ${nexus === '—' ? 'text-gray-600' : 'text-green-400'}">${nexus}</td>
              <td class="px-5 py-3 text-center ${dd === '—' ? 'text-gray-600' : 'text-green-400'}">${dd}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- The honest take -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">The honest take</h2>
      <div class="space-y-5 text-gray-300 leading-relaxed">
        <p>
          <strong class="text-white">Datadog is the gold standard for production infrastructure monitoring.</strong>
          If your team already runs Datadog for APM, logs, and infrastructure, adding LLM Observability to your
          existing account is a pragmatic decision — everything lives in one place, alert routing is already
          configured, and your team knows the UI.
        </p>
        <p>
          <strong class="text-white">The problem is the cost curve.</strong> Datadog LLM Observability bills
          per token logged. A modest AI agent making 50 API calls per trace, running 1,000 traces/day, can
          generate millions of tokens in logs — translating to hundreds of dollars per month before you add
          the base APM cost. For indie developers and small teams, this is not a realistic option.
        </p>
        <p>
          <strong class="text-white">Nexus is designed for the AI-first use case from scratch.</strong>
          The trace model treats agent runs as first-class citizens — not as distributed traces adapted
          for LLMs. The SDK is 3 lines of code, not a Datadog agent installation. And at $9/mo flat,
          the cost is predictable regardless of how many traces or tokens you generate.
        </p>
        <p>
          The right choice depends on your context: if you are a solo developer or small team building
          an AI agent product, Nexus is purpose-fit and affordable. If you are a larger engineering org
          where Datadog is already the observability platform, the integration cost of adding another
          tool may outweigh the savings.
        </p>
      </div>
    </section>

    ${comparisonRelated('/docs/langchain', 'LangChain observability guide — instrument any agent without Datadog')}

    ${ctaSection()}
  </div>

  ${footer()}
</body>
</html>`
}

export function vsHeliconePage(): string {
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Nexus vs Helicone — AI Agent Observability Compared",
    "description": "Honest comparison of Nexus and Helicone for AI agent monitoring. Proxy-based logging vs trace/span instrumentation, pricing, and feature tradeoffs for indie developers.",
    "url": "https://nexus.keylightdigital.dev/vs/helicone",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Feature Comparison: Nexus vs Helicone",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Nexus — trace/span agent observability at $9/mo" },
        { "@type": "ListItem", "position": 2, "name": "Helicone — proxy-based LLM request logging" }
      ]
    }
  })

  return `${comparisonHead(
    'Nexus vs Helicone — AI Agent Observability Compared',
    'Nexus vs Helicone: honest comparison of agent tracing vs proxy-based LLM logging. Pricing, setup complexity, and feature tradeoffs for indie developers.',
    'https://nexus.keylightdigital.dev/vs/helicone',
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}
  <script type="application/ld+json">${structuredData}</script>

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <!-- Header -->
    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Comparison</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">Nexus vs Helicone</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        Helicone is an AI gateway that captures LLM calls automatically by routing requests through a proxy.
        Here's an honest look at when Nexus makes more sense — and when Helicone is the better fit.
      </p>
    </div>

    <!-- TL;DR -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-4">TL;DR</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="font-semibold text-indigo-400 mb-2">Choose Nexus if you…</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>✓ Build multi-step agents with custom logic between LLM calls</li>
            <li>✓ Need full trace/span visibility into agent workflows</li>
            <li>✓ Use TypeScript agents or non-OpenAI/Anthropic models</li>
            <li>✓ Don't want to route production traffic through a third-party proxy</li>
            <li>✓ Want $9/mo flat rate (not $120/mo for team features)</li>
          </ul>
        </div>
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="font-semibold text-cyan-400 mb-2">Choose Helicone if you…</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>✓ Want zero-instrumentation LLM call logging via proxy</li>
            <li>✓ Need built-in caching, rate limiting, or prompt management</li>
            <li>✓ Are primarily making direct OpenAI/Anthropic API calls</li>
            <li>✓ Need team collaboration features at scale</li>
            <li>✓ Want LLM cost tracking per user or request</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Key difference callout -->
    <section class="bg-gray-900 border border-amber-800/40 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-3">The fundamental difference: proxy vs instrumentation</h2>
      <div class="space-y-3 text-sm text-gray-300 leading-relaxed">
        <p>
          <strong class="text-white">Helicone works as a proxy:</strong> you change your OpenAI base URL from
          <code class="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">api.openai.com</code> to
          <code class="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-300">oai.helicone.ai</code> and every LLM call
          is automatically captured. No SDK, no code changes beyond a one-line config edit.
        </p>
        <p>
          <strong class="text-white">Nexus works via instrumentation:</strong> you wrap your agent logic with the
          Nexus SDK to capture traces (entire agent runs) and spans (individual steps — LLM calls, tool use,
          retrieval). This means more setup, but you get visibility into the full agent workflow — not just raw LLM calls.
        </p>
        <p class="text-amber-200/70">
          If your "agent" is mostly a single LLM call with a system prompt, Helicone's proxy model is simpler.
          If you're building multi-step agents where you need to understand what happened between calls,
          Nexus's trace/span model gives you the full picture.
        </p>
      </div>
    </section>

    <!-- Pricing comparison -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Pricing</h2>
      <div class="overflow-x-auto rounded-2xl border border-gray-800">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900">
              <th class="text-left px-5 py-3 text-gray-400 font-medium">Plan</th>
              <th class="text-left px-5 py-3 text-indigo-400 font-semibold">Nexus</th>
              <th class="text-left px-5 py-3 text-cyan-400 font-semibold">Helicone</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Free</td>
              <td class="px-5 py-3 text-gray-300">$0 · 1K traces/mo · 1 agent</td>
              <td class="px-5 py-3 text-gray-300">$0 · 10K requests/mo</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Pro / Growth</td>
              <td class="px-5 py-3 text-gray-300"><strong class="text-white">$9/mo</strong> · 50K traces · unlimited agents</td>
              <td class="px-5 py-3 text-gray-300">$120/mo · 2M requests/mo</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Enterprise</td>
              <td class="px-5 py-3 text-gray-300">—</td>
              <td class="px-5 py-3 text-gray-300">Custom pricing</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-xs text-gray-500 mt-3">Helicone pricing as of 2026. Nexus counts agent traces (full runs); Helicone counts individual LLM API requests — these are not equivalent units.</p>
    </section>

    <!-- Feature comparison -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Feature comparison</h2>
      <div class="overflow-x-auto rounded-2xl border border-gray-800">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900">
              <th class="text-left px-5 py-3 text-gray-400 font-medium">Feature</th>
              <th class="text-center px-5 py-3 text-indigo-400 font-semibold">Nexus</th>
              <th class="text-center px-5 py-3 text-cyan-400 font-semibold">Helicone</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            ${[
              ['Agent trace &amp; span model', '✓', '—'],
              ['Zero-code LLM call capture', '—', '✓ (proxy)'],
              ['TypeScript SDK', '✓ open-source', '✓ (proxy wrapper)'],
              ['Python SDK', '✓ open-source', '✓ (proxy wrapper)'],
              ['Multi-step agent visibility', '✓ full waterfall', 'Partial (per-request)'],
              ['LLM cost tracking', '—', '✓'],
              ['Request caching', '—', '✓'],
              ['Rate limiting', '—', '✓'],
              ['Prompt management', '—', '✓'],
              ['Email alerts on failure', '✓ (Pro)', '✓'],
              ['Self-hosted option', '—', '✓ (open-source)'],
              ['Cloudflare edge (global CDN)', '✓', '—'],
              ['Open-source server', '—', '✓'],
              ['Multi-agent dashboard', '✓', 'Partial'],
              ['Setup time', '&lt; 2 min', '&lt; 1 min (proxy change)'],
            ].map(([feat, nexus, helicone]) => `
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300">${feat}</td>
              <td class="px-5 py-3 text-center ${nexus === '—' ? 'text-gray-600' : 'text-green-400'}">${nexus}</td>
              <td class="px-5 py-3 text-center ${helicone === '—' ? 'text-gray-600' : 'text-green-400'}">${helicone}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- The honest take -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">The honest take</h2>
      <div class="space-y-5 text-gray-300 leading-relaxed">
        <p>
          <strong class="text-white">Helicone is genuinely excellent for its use case:</strong> if you're building
          applications that make direct OpenAI or Anthropic API calls and you want logging, caching, and rate limiting
          without touching your application code, the proxy model is hard to beat. One line change to your base URL
          and you have full request/response logging.
        </p>
        <p>
          <strong class="text-white">The proxy model has real tradeoffs.</strong> Your production LLM traffic routes
          through Helicone's servers — that's an extra network hop and a dependency on their availability. For most
          teams this is fine, but it's worth considering. There's also a mental model gap: Helicone shows you
          individual requests, not agent runs. When a complex agent makes 12 LLM calls, you see 12 separate entries
          rather than one trace with 12 spans.
        </p>
        <p>
          <strong class="text-white">Nexus is built for the agent workflow problem specifically.</strong> If you're
          debugging "why did my agent fail on step 3?" you want traces with spans in waterfall order, not a list of
          raw API calls. The instrumentation overhead is 3–5 lines of SDK code, but you get the full agent timeline in return.
        </p>
        <p>
          The pricing difference is significant for indie developers: $9/mo vs $120/mo at the first paid tier.
          Helicone's free tier is generous (10K requests/mo) but the paid jump is steep for individual developers.
        </p>
      </div>
    </section>

    ${comparisonRelated('/docs/langchain', 'LangChain observability guide — instrument chains with Nexus')}

    ${ctaSection()}
  </div>

  ${footer()}
</body>
</html>`
}

export function vsBraintrustPage(): string {
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Nexus vs Braintrust — AI Agent Observability Compared",
    "description": "Honest comparison of Nexus and Braintrust for AI agent monitoring. Observability-first vs eval-first, pricing, agent tracing, and feature tradeoffs for developers.",
    "url": "https://nexus.keylightdigital.dev/vs/braintrust",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Feature Comparison: Nexus vs Braintrust",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Nexus — agent trace/span observability at $9/mo" },
        { "@type": "ListItem", "position": 2, "name": "Braintrust — LLM evaluation, experiment tracking, and production logging" }
      ]
    }
  })

  return `${comparisonHead(
    'Nexus vs Braintrust — AI Agent Observability Compared',
    'Nexus vs Braintrust: honest comparison of agent observability vs LLM evaluation platforms. Pricing, agent tracing, experiment tracking, and feature tradeoffs for indie developers.',
    'https://nexus.keylightdigital.dev/vs/braintrust',
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}
  <script type="application/ld+json">${structuredData}</script>

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <!-- Header -->
    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Comparison</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">Nexus vs Braintrust</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        Braintrust is a powerful LLM evaluation platform — built for running experiments, comparing prompts, and
        tracking model performance over time. Here is an honest look at when Nexus makes more sense, and when Braintrust is the right choice.
      </p>
    </div>

    <!-- TL;DR -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-4">TL;DR</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="font-semibold text-indigo-400 mb-2">Choose Nexus if you...</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>✓ Want production observability into multi-step agent workflows</li>
            <li>✓ Need trace/span waterfalls showing exactly what your agent did</li>
            <li>✓ Are an indie dev or small team watching spend closely</li>
            <li>✓ Do not need a structured evaluation framework or test datasets</li>
            <li>✓ Want $9/mo flat rate with no per-log usage fees</li>
          </ul>
        </div>
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="font-semibold text-rose-400 mb-2">Choose Braintrust if you...</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>✓ Run structured LLM evals — compare prompts, models, configurations</li>
            <li>✓ Need a dataset management and versioning system</li>
            <li>✓ Want experiment tracking with statistical comparison</li>
            <li>✓ Need a prompt playground to iterate on system prompts</li>
            <li>✓ Have a team that prioritizes eval-driven development</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Key difference callout -->
    <section class="bg-gray-900 border border-amber-800/40 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-3">The fundamental difference: observability vs evaluation</h2>
      <div class="space-y-3 text-sm text-gray-300 leading-relaxed">
        <p>
          <strong class="text-white">Nexus is observability-first:</strong> you instrument your agent code with the
          Nexus SDK and watch what happens in production — traces (full agent runs), spans (individual steps),
          latency, errors. The question Nexus answers is <em>what did my agent do on this run?</em>
        </p>
        <p>
          <strong class="text-white">Braintrust is eval-first:</strong> you define test datasets and scoring functions,
          then run experiments to compare different prompts, models, or code versions against those datasets.
          The question Braintrust answers is <em>which version of my agent performs better?</em>
        </p>
        <p class="text-amber-200/70">
          These tools solve adjacent but different problems. Nexus is the right fit when you need to debug and monitor
          production agent runs. Braintrust is the right fit when you need to systematically evaluate and improve
          LLM quality before or after deploying. Many teams use both — Braintrust offline for evals, Nexus online for monitoring.
        </p>
      </div>
    </section>

    <!-- Pricing comparison -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Pricing</h2>
      <div class="overflow-x-auto rounded-2xl border border-gray-800">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900">
              <th class="text-left px-5 py-3 text-gray-400 font-medium">Plan</th>
              <th class="text-left px-5 py-3 text-indigo-400 font-semibold">Nexus</th>
              <th class="text-left px-5 py-3 text-rose-400 font-semibold">Braintrust</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Free</td>
              <td class="px-5 py-3 text-gray-300">$0 · 1K traces/mo · 1 agent</td>
              <td class="px-5 py-3 text-gray-300">$0 · 1K logs/mo</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Pro / Team</td>
              <td class="px-5 py-3 text-gray-300"><strong class="text-white">$9/mo flat</strong> · 50K traces · unlimited agents</td>
              <td class="px-5 py-3 text-gray-300">Usage-based · ~$1-3 per 1K logs above free tier</td>
            </tr>
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300 font-medium">Enterprise</td>
              <td class="px-5 py-3 text-gray-300">—</td>
              <td class="px-5 py-3 text-gray-300">Custom pricing</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-xs text-gray-500 mt-3">Braintrust pricing as of 2026 — usage-based costs vary by log volume. Nexus is flat-rate: $9/mo regardless of how many traces you send (up to 50K).</p>
    </section>

    <!-- Feature comparison -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Feature comparison</h2>
      <div class="overflow-x-auto rounded-2xl border border-gray-800">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900">
              <th class="text-left px-5 py-3 text-gray-400 font-medium">Feature</th>
              <th class="text-center px-5 py-3 text-indigo-400 font-semibold">Nexus</th>
              <th class="text-center px-5 py-3 text-rose-400 font-semibold">Braintrust</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            ${[
              ['Agent trace &amp; span waterfall', '✓', 'Partial'],
              ['Production LLM logging', '✓', '✓'],
              ['LLM evaluation framework', '—', '✓'],
              ['Dataset management', '—', '✓'],
              ['Experiment tracking', '—', '✓'],
              ['Prompt playground', '—', '✓'],
              ['Statistical eval comparison', '—', '✓'],
              ['TypeScript SDK', '✓ open-source', '✓'],
              ['Python SDK', '✓ open-source', '✓'],
              ['Multi-agent dashboard', '✓', 'Partial'],
              ['Flat-rate pricing', '✓ $9/mo', '—'],
              ['Cloudflare edge (global CDN)', '✓', '—'],
              ['Setup time', '&lt; 2 min', '~10-30 min (eval setup)'],
              ['Self-hosted option', '—', '—'],
            ].map(([feat, nexus, bt]) => `
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300">${feat}</td>
              <td class="px-5 py-3 text-center ${nexus === '—' ? 'text-gray-600' : 'text-green-400'}">${nexus}</td>
              <td class="px-5 py-3 text-center ${bt === '—' ? 'text-gray-600' : 'text-green-400'}">${bt}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- The honest take -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">The honest take</h2>
      <div class="space-y-5 text-gray-300 leading-relaxed">
        <p>
          <strong class="text-white">Braintrust is genuinely excellent for LLM evaluation.</strong> If your team
          is doing systematic prompt engineering — running the same prompt against 100 test cases, comparing
          GPT-4o vs Claude 3.5, scoring outputs with custom evaluators — Braintrust's eval framework and
          dataset management are best-in-class. It is built for teams that treat LLM quality as an engineering problem.
        </p>
        <p>
          <strong class="text-white">The tradeoff: Braintrust solves a different problem than observability.</strong>
          Knowing that prompt version B scores 12% better on your eval dataset does not tell you why a specific
          production agent run failed at step 3. For production debugging, you want real traces showing exactly
          which tool calls were made, what the LLM returned, and where latency spiked.
        </p>
        <p>
          <strong class="text-white">Nexus is built for the "what just happened?" question.</strong>
          When a user reports that your agent gave a wrong answer, you open the trace, see the full span waterfall,
          and immediately understand the sequence of events. No test dataset needed — you are debugging a real run.
        </p>
        <p>
          The pricing structure is also meaningfully different: Braintrust's usage-based model makes sense for
          teams running many experiments, but costs can grow unexpectedly with log volume. At $9/mo flat,
          Nexus is more predictable for indie developers who want observability without a surprise invoice.
        </p>
      </div>
    </section>

    ${comparisonRelated('/docs/llamaindex', 'LlamaIndex observability guide — instrument RAG pipelines with Nexus')}

    ${ctaSection()}
  </div>

  ${footer()}
</body>
</html>`
}

export function vsWandbPage(): string {
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Nexus vs Weights & Biases Weave — AI Agent Observability Compared",
    "description": "Nexus vs W&B Weave for AI agent monitoring: production observability at $9/mo vs W&B's experiment-tracking platform with tracing add-on. Pricing, setup complexity, and honest tradeoffs.",
    "url": "https://nexus.keylightdigital.dev/vs/wandb",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Feature Comparison: Nexus vs Weights & Biases Weave",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Nexus — AI-native agent trace/span observability at $9/mo" },
        { "@type": "ListItem", "position": 2, "name": "W&B Weave — Weights & Biases tracing and evaluation add-on for LLM applications" }
      ]
    }
  })

  return `${comparisonHead(
    'Nexus vs Weights & Biases Weave — AI Agent Observability',
    "Nexus vs W&B Weave for AI agent monitoring: production-focused observability at $9/mo vs W&B's ML experiment platform. Pricing, agent tracing, and honest tradeoffs for developers.",
    'https://nexus.keylightdigital.dev/vs/wandb',
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}
  <script type="application/ld+json">${structuredData}</script>

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <!-- Header -->
    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Comparison</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">Nexus vs Weights &amp; Biases Weave</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        W&amp;B Weave is the tracing and evaluation layer of the Weights &amp; Biases ML platform.
        Here is an honest look at when a purpose-built AI agent observability tool makes more sense
        than adding tracing to a machine learning experiment tracker.
      </p>
    </div>

    <!-- TL;DR -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-4">TL;DR</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="font-semibold text-indigo-400 mb-2">Choose Nexus if you...</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>&#10003; Are shipping AI agents to production and need runtime monitoring</li>
            <li>&#10003; Want flat-rate predictable pricing ($9/mo — no W&amp;B account required)</li>
            <li>&#10003; Need a trace/span model designed for multi-step agent workflows</li>
            <li>&#10003; Are an indie developer or small team without an ML platform contract</li>
            <li>&#10003; Want TypeScript-first SDK support (W&amp;B Weave is Python-first)</li>
          </ul>
        </div>
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="font-semibold text-yellow-400 mb-2">Choose W&amp;B Weave if you...</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>&#10003; Already use W&amp;B for experiment tracking and want everything in one platform</li>
            <li>&#10003; Need LLM evaluation alongside tracing — test datasets, evaluators, leaderboards</li>
            <li>&#10003; Work primarily in Python and are comfortable with the W&amp;B ecosystem</li>
            <li>&#10003; Your team runs structured model comparison experiments, not just production agents</li>
            <li>&#10003; Need advanced data versioning, artifact tracking, and team collaboration features</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Key difference callout -->
    <section class="bg-gray-900 border border-amber-800/40 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-3">The fundamental difference: production monitoring vs experiment tracking</h2>
      <div class="space-y-3 text-sm text-gray-300 leading-relaxed">
        <p>
          <strong class="text-white">Nexus is designed for production AI agent monitoring:</strong> every concept
          maps to runtime agent behavior — a trace is a complete agent run, spans are the individual steps
          (LLM calls, tool uses, sub-agent invocations). The dashboard shows live error rates, latency trends,
          and agent health. The alert system fires when agents fail in production.
        </p>
        <p>
          <strong class="text-white">W&amp;B Weave is built on top of a machine learning experiment tracker:</strong>
          it captures LLM calls and agent traces well, but the underlying mental model is runs, artifacts, and
          experiments — not production incidents. W&amp;B shines for iterating on prompts and evaluating models
          before deployment; Nexus is built for what happens after deployment.
        </p>
        <p>
          The result: if you need to answer "why did my agent fail in production at 3pm?" Nexus is the right
          tool. If you need to answer "which prompt version performs better across my eval dataset?" W&amp;B
          Weave is the right tool. These are adjacent but different problems.
        </p>
      </div>
    </section>

    <!-- Pricing comparison -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Pricing</h2>
      <div class="grid sm:grid-cols-2 gap-6">
        <div class="bg-gray-900 border border-indigo-800 rounded-2xl px-6 py-6">
          <h3 class="text-lg font-bold text-indigo-400 mb-1">Nexus</h3>
          <p class="text-3xl font-extrabold text-white mb-1">$9<span class="text-base font-normal text-gray-400">/mo</span></p>
          <p class="text-sm text-gray-400 mb-4">Flat-rate — no usage-based surprises</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>&#10003; Free tier: 1,000 traces/month</li>
            <li>&#10003; Pro: 50,000 traces, unlimited agents</li>
            <li>&#10003; No per-token or per-log charges</li>
            <li>&#10003; Email alerts on failure (Pro)</li>
            <li>&#10003; TypeScript + Python SDK (MIT)</li>
          </ul>
        </div>
        <div class="bg-gray-900 border border-gray-700 rounded-2xl px-6 py-6">
          <h3 class="text-lg font-bold text-yellow-400 mb-1">W&amp;B Weave</h3>
          <p class="text-3xl font-extrabold text-white mb-1">Usage<span class="text-base font-normal text-gray-400">-based</span></p>
          <p class="text-sm text-gray-400 mb-4">Free tier; paid tiers scale with seats + usage</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>&#10003; Free tier available (W&amp;B account required)</li>
            <li>&#10003; Weave included with W&amp;B account</li>
            <li>&#10003; Teams plan: $50+/seat/month</li>
            <li>&#10003; LLM evaluation and experiment tracking</li>
            <li>&#10003; Python SDK primary (limited TypeScript)</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Feature comparison table -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Feature comparison</h2>
      <div class="overflow-x-auto rounded-2xl border border-gray-800">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900">
              <th class="text-left px-5 py-3 text-gray-400 font-medium">Feature</th>
              <th class="text-center px-5 py-3 text-indigo-400 font-semibold">Nexus</th>
              <th class="text-center px-5 py-3 text-yellow-400 font-semibold">W&amp;B Weave</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            ${[
              ['Agent trace &amp; span model', '&#10003; Purpose-built', '&#10003; Supported'],
              ['Production monitoring focus', '&#10003;', 'Partial (experiment-tracking focus)'],
              ['Real-time error alerts', '&#10003; (Pro)', '&#8212;'],
              ['TypeScript SDK', '&#10003; Open-source', 'Limited'],
              ['Python SDK', '&#10003; Open-source', '&#10003; Primary SDK'],
              ['Flat-rate pricing', '&#10003; $9/mo', '&#8212;'],
              ['LLM evaluation framework', '&#8212;', '&#10003;'],
              ['Experiment tracking / sweeps', '&#8212;', '&#10003; Core feature'],
              ['Dataset &amp; artifact versioning', '&#8212;', '&#10003;'],
              ['Prompt playground', '&#8212;', '&#10003;'],
              ['Multi-agent dashboard', '&#10003;', 'Partial'],
              ['Webhook notifications', '&#10003;', '&#8212;'],
              ['Setup time', '&lt; 2 min', '5&ndash;15 min (W&amp;B account + SDK setup)'],
              ['Self-hosted option', '&#8212;', 'On-prem (Enterprise)'],
              ['Cloudflare edge performance', '&#10003;', '&#8212;'],
            ].map((row) => {
              const feat = row[0] ?? ''
              const nexus = row[1] ?? ''
              const wb = row[2] ?? ''
              return `
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300">${feat}</td>
              <td class="px-5 py-3 text-center ${nexus.includes('&#8212;') ? 'text-gray-600' : 'text-green-400'}">${nexus}</td>
              <td class="px-5 py-3 text-center ${wb.includes('&#8212;') ? 'text-gray-600' : 'text-green-400'}">${wb}</td>
            </tr>`
            }).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- The honest take -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">The honest take</h2>
      <div class="space-y-5 text-gray-300 leading-relaxed">
        <p>
          <strong class="text-white">W&amp;B is an excellent, mature platform for ML teams.</strong>
          If your team uses Weights &amp; Biases for experiment tracking, hyperparameter sweeps, and model
          evaluation, adding Weave to trace your LLM calls is a natural extension — the data lives alongside
          your experiment history and the team already knows the UI.
        </p>
        <p>
          <strong class="text-white">The challenge is the context mismatch between research and production.</strong>
          W&amp;B is fundamentally an experimentation tool — it is built around runs, sweeps, and artifacts.
          Weave adds LLM tracing to that platform, but the alert model and dashboard reflect experiment-tracking
          roots, not production incident management. If a production agent fails at 2am, W&amp;B is not what
          your on-call engineer reaches for.
        </p>
        <p>
          <strong class="text-white">Nexus is narrower but deeper for production agent monitoring.</strong>
          The trace viewer, waterfall display, per-agent health cards, and email alerts are all designed for
          one specific use case: understanding why your production AI agent failed. If that is your primary
          question — not "which prompt is better?" but "what went wrong in the last 24 hours?" — Nexus
          answers it more directly.
        </p>
        <p>
          The pricing dynamic also matters: W&amp;B Teams starts at $50+/seat/month — reasonable for a research
          team with a budget, but significant for a solo developer shipping an AI product. At $9/mo flat,
          Nexus fits the indie developer use case that W&amp;B was never designed for.
        </p>
      </div>
    </section>

    ${comparisonRelated('/blog/ai-agent-metrics', '5 Metrics Every AI Agent Team Should Track')}

    ${ctaSection()}
  </div>

  ${footer()}
</body>
</html>`
}

export function vsPortkeyPage(): string {
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Nexus vs Portkey — AI Agent Observability vs AI Gateway",
    "description": "Nexus vs Portkey for AI agent developers: purpose-built agent observability at $9/mo vs Portkey's AI gateway with routing, fallbacks, and load balancing. Pricing, features, and honest tradeoffs.",
    "url": "https://nexus.keylightdigital.dev/vs/portkey",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Feature Comparison: Nexus vs Portkey",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Nexus — AI-native agent trace/span observability at $9/mo flat" },
        { "@type": "ListItem", "position": 2, "name": "Portkey — AI gateway with routing, fallbacks, and LLM request logging" }
      ]
    }
  })

  return `${comparisonHead(
    'Nexus vs Portkey — AI Observability vs AI Gateway',
    "Nexus vs Portkey for AI developers: agent observability at $9/mo flat vs Portkey's AI gateway with routing and fallbacks. Pricing, integration depth, and honest tradeoffs.",
    'https://nexus.keylightdigital.dev/vs/portkey',
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}
  <script type="application/ld+json">${structuredData}</script>

  <div id="main-content" class="max-w-4xl mx-auto px-4 py-12">

    <!-- Header -->
    <div class="mb-10">
      <p class="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Comparison</p>
      <h1 class="text-4xl font-extrabold text-white mb-4">Nexus vs Portkey</h1>
      <p class="text-xl text-gray-400 max-w-2xl">
        Portkey is an AI gateway with built-in observability. Nexus is an observability tool without a gateway.
        Here is an honest look at when each approach makes more sense for AI agent developers.
      </p>
    </div>

    <!-- TL;DR -->
    <section class="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-4">TL;DR</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="font-semibold text-indigo-400 mb-2">Choose Nexus if you...</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>&#10003; Need deep agent trace/span observability with span waterfall views</li>
            <li>&#10003; Want flat-rate predictable pricing ($9/mo — no per-request charges)</li>
            <li>&#10003; Are monitoring multi-step agents with complex tool use and sub-agents</li>
            <li>&#10003; Want TypeScript-first SDK with zero proxy dependencies</li>
            <li>&#10003; Need email alerts when agents fail in production (Pro)</li>
          </ul>
        </div>
        <div class="bg-gray-800 rounded-xl p-4">
          <p class="font-semibold text-teal-400 mb-2">Choose Portkey if you...</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>&#10003; Need model routing, fallbacks, or load balancing across LLM providers</li>
            <li>&#10003; Want automatic request-level logging without SDK instrumentation</li>
            <li>&#10003; Require multi-provider LLM switching (OpenAI, Anthropic, Gemini, etc.)</li>
            <li>&#10003; Need rate limiting, caching, or virtual keys for API management</li>
            <li>&#10003; Want a single gateway for all LLM provider calls across your stack</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Key difference callout -->
    <section class="bg-gray-900 border border-amber-800/40 rounded-2xl px-6 py-6 mb-10">
      <h2 class="text-lg font-bold text-white mb-3">The fundamental difference: observability vs gateway</h2>
      <div class="space-y-3 text-sm text-gray-300 leading-relaxed">
        <p>
          <strong class="text-white">Portkey is gateway-first:</strong> your LLM calls route through Portkey's
          proxy, which automatically logs every request and response. This zero-instrumentation approach captures
          all LLM calls without code changes, but the mental model is a request/response log — not an agent
          trace with nested spans, tool calls, and multi-step reasoning.
        </p>
        <p>
          <strong class="text-white">Nexus is observability-first:</strong> you instrument your agent code with
          the SDK to create traces and spans that map directly to agent behavior. Each trace is a complete agent
          run; each span is a specific step (LLM call, tool use, sub-agent invocation). The result is a waterfall
          view that shows exactly what happened inside a complex, multi-step agent workflow.
        </p>
        <p>
          The result: Portkey captures what you send to LLM APIs; Nexus captures what your agent actually does.
          If your application is primarily direct LLM calls (not multi-step agents), Portkey's proxy logging is
          simpler. If you are running complex agents with branching logic, tool use, and sub-agents, Nexus
          gives you the trace depth that proxy logging cannot.
        </p>
      </div>
    </section>

    <!-- Pricing comparison -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Pricing</h2>
      <div class="grid sm:grid-cols-2 gap-6">
        <div class="bg-gray-900 border border-indigo-800 rounded-2xl px-6 py-6">
          <h3 class="text-lg font-bold text-indigo-400 mb-1">Nexus</h3>
          <p class="text-3xl font-extrabold text-white mb-1">$9<span class="text-base font-normal text-gray-400">/mo</span></p>
          <p class="text-sm text-gray-400 mb-4">Flat-rate — no per-request charges</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>&#10003; Free tier: 1,000 traces/month</li>
            <li>&#10003; Pro: 50,000 traces, unlimited agents</li>
            <li>&#10003; No per-token or per-request fees</li>
            <li>&#10003; Email alerts on failure (Pro)</li>
            <li>&#10003; TypeScript + Python SDK (MIT)</li>
          </ul>
        </div>
        <div class="bg-gray-900 border border-gray-700 rounded-2xl px-6 py-6">
          <h3 class="text-lg font-bold text-teal-400 mb-1">Portkey</h3>
          <p class="text-3xl font-extrabold text-white mb-1">Usage<span class="text-base font-normal text-gray-400">-based</span></p>
          <p class="text-sm text-gray-400 mb-4">Free tier; paid tiers scale with request volume</p>
          <ul class="text-sm text-gray-300 space-y-1.5">
            <li>&#10003; Free tier: 10,000 requests/month</li>
            <li>&#10003; Growth: usage-based per request</li>
            <li>&#10003; AI gateway + routing + fallbacks</li>
            <li>&#10003; Virtual API keys, caching, rate limiting</li>
            <li>&#10003; TypeScript + Python (proxy-based)</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Feature comparison table -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">Feature comparison</h2>
      <div class="overflow-x-auto rounded-2xl border border-gray-800">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-800 bg-gray-900">
              <th class="text-left px-5 py-3 text-gray-400 font-medium">Feature</th>
              <th class="text-center px-5 py-3 text-indigo-400 font-semibold">Nexus</th>
              <th class="text-center px-5 py-3 text-teal-400 font-semibold">Portkey</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            ${[
              ['Agent trace &amp; span model', '&#10003; Purpose-built', '&#8212; (request logs only)'],
              ['Span waterfall view', '&#10003;', '&#8212;'],
              ['Multi-step agent debugging', '&#10003; Deep', 'Limited'],
              ['Real-time error alerts', '&#10003; (Pro)', '&#8212;'],
              ['TypeScript SDK', '&#10003; Open-source', '&#10003; (proxy-based)'],
              ['Python SDK', '&#10003; Open-source', '&#10003; (proxy-based)'],
              ['Flat-rate pricing', '&#10003; $9/mo', '&#8212; (usage-based)'],
              ['AI model routing / fallbacks', '&#8212;', '&#10003; Core feature'],
              ['Multi-provider LLM switching', '&#8212;', '&#10003;'],
              ['Virtual API keys', '&#8212;', '&#10003;'],
              ['LLM response caching', '&#8212;', '&#10003;'],
              ['Rate limiting', '&#8212;', '&#10003;'],
              ['Zero-code instrumentation', '&#8212; (SDK needed)', '&#10003; (proxy-based)'],
              ['Setup time', '&lt; 2 min', '5&ndash;10 min (proxy setup)'],
              ['Self-hosted option', '&#8212;', '&#10003; (open-source)'],
            ].map((row) => {
              const feat = row[0] ?? ''
              const nexus = row[1] ?? ''
              const portkey = row[2] ?? ''
              return `
            <tr class="bg-gray-950 hover:bg-gray-900 transition-colors">
              <td class="px-5 py-3 text-gray-300">${feat}</td>
              <td class="px-5 py-3 text-center ${nexus.includes('&#8212;') ? 'text-gray-600' : 'text-green-400'}">${nexus}</td>
              <td class="px-5 py-3 text-center ${portkey.includes('&#8212;') ? 'text-gray-600' : 'text-green-400'}">${portkey}</td>
            </tr>`
            }).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- The honest take -->
    <section class="mb-10">
      <h2 class="text-2xl font-bold text-white mb-6">The honest take</h2>
      <div class="space-y-5 text-gray-300 leading-relaxed">
        <p>
          <strong class="text-white">Portkey is genuinely useful for AI gateway concerns.</strong>
          If you need to route between GPT-4o and Claude based on cost or latency, fall back to a
          secondary model when your primary is down, or manage API keys centrally across a team,
          Portkey solves these problems well. The proxy approach means zero code changes to your
          existing LLM calls — just swap the base URL.
        </p>
        <p>
          <strong class="text-white">The gap is depth of observability for agent workflows.</strong>
          Portkey logs LLM requests and responses, which is useful for debugging individual calls.
          But when your agent makes 15 LLM calls, 8 tool invocations, and spawns 3 sub-agents over
          a 45-second run, a flat request log cannot tell you which step caused the failure or how
          long each segment took relative to the others. That is what Nexus's trace/span model
          was built for.
        </p>
        <p>
          <strong class="text-white">They can be complementary.</strong>
          Some teams use Portkey for gateway concerns (routing, fallbacks, cost optimization)
          and Nexus for agent-level observability (trace waterfall, error alerts, per-agent health).
          The SDKs do not conflict — you can route through Portkey while instrumenting your agent
          logic with Nexus spans. That said, if budget is tight, prioritize based on your primary
          pain point: gateway routing or agent debugging.
        </p>
        <p>
          The pricing model also differs meaningfully: Nexus at $9/mo flat is predictable regardless
          of how many requests your agent makes. Portkey's usage-based pricing can be cheaper at low
          volume but scales with request count — which can add up for high-throughput production agents.
        </p>
      </div>
    </section>

    ${comparisonRelated('/blog/opentelemetry-ai-agents', 'OpenTelemetry for AI Agents: Why Standard APM Falls Short')}

    ${ctaSection()}
  </div>

  ${footer()}
</body>
</html>`
}
