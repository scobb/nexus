const navBar = `
  <nav class="border-b border-gray-800 px-4 py-4">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <a href="/" class="text-lg font-bold text-indigo-400">Nexus</a>
      <div class="flex items-center gap-4">
        <a href="/docs" class="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
        <a href="/demo" class="text-sm text-gray-400 hover:text-white transition-colors">Demo</a>
        <a href="/auth/login" class="text-sm text-gray-400 hover:text-white transition-colors">Sign in</a>
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">Start free</a>
      </div>
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
  <script defer src="https://beam.keylightdigital.dev/js/beam.js" data-site-id="dee2fad9-ca65-4746-aa74-6480534507ef"></script>
</head>`
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

  <div class="max-w-4xl mx-auto px-4 py-12">

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

  <div class="max-w-4xl mx-auto px-4 py-12">

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

  <div class="max-w-4xl mx-auto px-4 py-12">

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

  <div class="max-w-4xl mx-auto px-4 py-12">

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

    ${ctaSection()}
  </div>

  ${footer()}
</body>
</html>`
}

export function alternativesPage(): string {
  return `${comparisonHead(
    'Best AI Agent Monitoring Alternatives — Nexus vs Langfuse vs LangSmith vs AgentOps',
    'Comparing the top AI agent monitoring and observability tools: Nexus, Langfuse, LangSmith, Arize Phoenix, and AgentOps. Pricing, features, and honest tradeoffs for indie developers.',
    'https://nexus.keylightdigital.dev/alternatives',
  )}
<body class="bg-gray-950 text-white min-h-screen">
${navBar}

  <div class="max-w-4xl mx-auto px-4 py-12">

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
              <td class="px-4 py-3 text-green-400">✓ Hosted</td>
              <td class="px-4 py-3 text-gray-600">— No</td>
              <td class="px-4 py-3 text-gray-300">CrewAI/AutoGen users, cost tracking</td>
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

    </section>

    ${ctaSection()}
  </div>

  ${footer()}
</body>
</html>`
}
