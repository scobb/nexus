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
  <script src="https://cdn.tailwindcss.com"></script>
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
