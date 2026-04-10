export function changelogPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Changelog — Nexus AI Agent Observability</title>
  <meta name="description" content="Nexus product changelog — track the development milestones of the AI agent observability platform built by Ralph, an AI agent, for AI agents.">
  <link rel="canonical" href="https://nexus.keylightdigital.dev/changelog">
  <!-- Open Graph -->
  <meta property="og:title" content="Changelog — Nexus AI Agent Observability">
  <meta property="og:description" content="Nexus product changelog — AI agent observability built by an AI agent.">
  <meta property="og:url" content="https://nexus.keylightdigital.dev/changelog">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <meta property="og:site_name" content="Nexus">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Changelog — Nexus AI Agent Observability">
  <meta name="twitter:description" content="Nexus product changelog — AI agent observability built by an AI agent.">
  <meta name="twitter:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <link rel="stylesheet" href="/styles.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    body { font-family: 'Inter', sans-serif; }
  </style>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <!-- Beam Analytics (dogfooding) -->
  <script defer src="https://beam-privacy.com/js/beam.js" data-site-id="dee2fad9-ca65-4746-aa74-6480534507ef"></script>
</head>
<body class="bg-gray-950 text-gray-100 antialiased">
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <!-- Nav -->
  <nav class="border-b border-gray-800 px-4 py-4">
    <div class="max-w-5xl mx-auto flex items-center justify-between">
      <a href="/" class="text-lg font-bold text-white">Nexus</a>
      <div class="hidden sm:flex items-center gap-3">
        <a href="/blog" class="text-sm text-gray-400 hover:text-white transition-colors">Blog</a>
        <a href="/docs" class="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
        <a href="/auth/login" class="text-sm text-gray-400 hover:text-white transition-colors">Sign in</a>
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">Start free</a>
      </div>
      <div class="flex sm:hidden items-center gap-2">
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-medium transition-colors">Start free</a>
        <button onclick="var m=document.getElementById('cl-mnav');m.classList.toggle('hidden')" class="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Open navigation menu">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
    <div id="cl-mnav" class="hidden sm:hidden max-w-5xl mx-auto border-t border-gray-800 mt-3 pt-2 pb-1 space-y-0.5">
      <a href="/blog" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Blog</a>
      <a href="/docs" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Docs</a>
      <a href="/auth/login" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Sign in</a>
    </div>
  </nav>

  <!-- Header -->
  <section id="main-content" class="px-4 pt-16 pb-8 text-center">
    <div class="max-w-2xl mx-auto">
      <div class="inline-flex items-center gap-2 bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
        <span class="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
        Built by an AI agent, for AI agents
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-white mb-4">Changelog</h1>
      <p class="text-gray-400 text-lg">
        The full development history of Nexus — shipped in days, not months.
        Every milestone here was implemented by <strong class="text-gray-200">Ralph</strong>, an AI agent at Keylight Digital.
      </p>
    </div>
  </section>

  <!-- Changelog entries -->
  <section class="px-4 pb-24">
    <div class="max-w-2xl mx-auto">
      <!-- Timeline line -->
      <div class="relative">
        <div class="absolute left-4 top-0 bottom-0 w-px bg-gray-800"></div>

        <!-- April 6 entries -->
        <div class="mb-2 ml-12">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">April 6, 2026</span>
        </div>

        ${entry('Apr 6', 'OpenTelemetry-compatible trace ingestion', 'Accept OTLP/HTTP JSON format at POST /v1/traces. Any developer with existing OpenTelemetry instrumentation can point their exporter at Nexus with a one-line config change — no SDK required.', 'new')}
        ${entry('Apr 6', 'Dashboard trace filtering and search', 'Filter traces by status, agent, and date range on the traces page. Supports query parameters so filters persist across page loads. Default view: last 7 days.', 'new')}
        ${entry('Apr 6', 'Python SDK — pip install nexus-agent', 'Full Python SDK for AI agent developers. Mirrors the TypeScript API: NexusClient, start_trace(), add_span(), end(). Zero external dependencies — pure stdlib only.', 'new')}
        ${entry('Apr 6', 'SEO comparison pages — /vs/langfuse and /vs/langsmith', 'Honest, technical comparison pages targeting developer search queries. Acknowledges competitor strengths while positioning Nexus for its niche: indie developers who need simplicity, not enterprise features.', 'improvement')}
        ${entry('Apr 6', 'Interactive demo at /demo', 'Explore the full trace viewer and dashboard with realistic sample data — no sign-up required. Three sample agents with spans, waterfall views, and error cases.', 'new')}
        ${entry('Apr 6', 'API documentation at /docs', 'Full REST API reference with request/response examples, authentication guide, and SDK quickstarts for both TypeScript and Python. Linked from the nav and landing page.', 'new')}
        ${entry('Apr 6', 'Blog and Dev.to article draft', 'Published "How I Monitor My AI Agents for $9/Month" — a technical, honest walkthrough of the Nexus architecture, SDK integration, and pricing rationale.', 'new')}
        ${entry('Apr 6', 'Open Graph social cards and SEO meta tags', 'Every public page now has og:title, og:description, og:image, twitter:card. GET /og-image.png returns a branded SVG card for rich link previews on HN, Twitter, and Slack.', 'improvement')}
        ${entry('Apr 6', 'robots.txt, sitemap.xml, and JSON-LD structured data', 'SEO foundations: robots.txt allows all crawlers, sitemap.xml lists all public pages with priority weights, landing page includes Organization + SoftwareApplication JSON-LD.', 'improvement')}

        <!-- April 5 entries -->
        <div class="mb-2 ml-12 mt-8">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">April 5, 2026</span>
        </div>

        ${entry('Apr 5', 'Settings page — account info, API keys, danger zone', 'Manage your API keys, view account plan, and delete your account. Account deletion cascades to all data and cancels any active Stripe subscription.', 'new')}
        ${entry('Apr 5', 'Stripe billing — Free/Pro Checkout and webhook handling', 'Upgrade to Pro ($9/mo) via Stripe Checkout. Webhooks handle subscription lifecycle events to keep plan status current. Billing portal lets Pro users manage their subscription.', 'new')}
        ${entry('Apr 5', 'Email alerts for agent failures', 'Pro users receive email alerts via Resend when a trace ends with status error or timeout. Rate-limited to 1 alert per agent per 5 minutes to prevent alert fatigue.', 'new')}
        ${entry('Apr 5', 'Multi-agent management', 'See all registered agents, their health status, and per-agent trace history. Agents are auto-created on first trace ingestion — no manual setup required.', 'new')}
        ${entry('Apr 5', 'Dashboard with agent health overview and trace volume chart', 'Overview page showing traces this month, error rate, average latency, per-agent health cards, and a 7-day CSS bar chart. All metrics from live D1 queries.', 'new')}
        ${entry('Apr 5', 'Trace viewer — browse traces, expand spans', 'Browse your traces with status color-coding, durations, and pagination. Trace detail shows all spans in waterfall order with collapsible input/output/error — zero JavaScript.', 'new')}
        ${entry('Apr 5', 'TypeScript SDK — @keylightdigital/nexus', 'Open-source npm package for agent instrumentation. NexusClient → startTrace() → addSpan() → end(). All methods handle network errors gracefully and never throw.', 'new')}
        ${entry('Apr 5', 'Span ingestion API — POST /api/v1/traces/:id/spans', 'Capture individual LLM calls, tool uses, and sub-agent invocations with timing, input, output, and error data. Nested spans via parent_span_id.', 'new')}
        ${entry('Apr 5', 'Trace ingestion API — POST /api/v1/traces', 'Core API endpoint for agent observability. API key auth, plan limit enforcement (1K traces/month Free), auto-creates agent records on first use. Returns trace_id in 201ms.', 'new')}
        ${entry('Apr 5', 'API key management — create, list, revoke', 'Generate nxs_-prefixed API keys (SHA-256 hashed, shown once), list active keys, revoke compromised ones. Keys identify your agents in the ingestion API.', 'new')}
        ${entry('Apr 5', 'Magic link auth — email login, session cookies', 'No passwords. Enter your email, click the link. Sessions stored in Cloudflare KV (7-day TTL). Rate-limited to prevent abuse.', 'new')}
        ${entry('Apr 5', 'Landing page — "Plausible for AI agents" positioning', 'Server-rendered HTML. Hero, pricing table (Free vs Pro), feature comparison, how-it-works, SDK code example, FAQ, meta-narrative. No JavaScript frameworks.', 'new')}
        ${entry('Apr 5', 'Database schema — agents, traces, spans, users, subscriptions', 'D1 (SQLite at edge) schema with all core tables, indexes, and IF NOT EXISTS guards. ON DELETE CASCADE throughout for clean account deletion.', 'new')}
        ${entry('Apr 5', 'Project scaffolded — Cloudflare Workers + Hono + D1 + KV', 'Nexus born. Cloudflare Workers runtime, Hono framework, D1 database, KV namespace, TypeScript, wrangler. GET /health returns {status: "ok"}. Build time: ~2 hours.', 'new')}
      </div>
    </div>
  </section>

  <!-- Footer CTA -->
  <section class="border-t border-gray-800 px-4 py-16 text-center">
    <div class="max-w-lg mx-auto">
      <h2 class="text-xl font-bold text-white mb-3">Ship faster. Know when things break.</h2>
      <p class="text-gray-400 mb-6 text-sm">Free tier. No credit card. Drop in the SDK today.</p>
      <a href="/register" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-lg transition-colors">
        Start free →
      </a>
    </div>
  </section>
</body>
</html>`
}

function entry(date: string, title: string, description: string, type: 'new' | 'improvement' | 'fix'): string {
  const badge = type === 'new'
    ? '<span class="text-xs font-semibold bg-green-900 text-green-300 px-2 py-0.5 rounded-full">New</span>'
    : type === 'improvement'
      ? '<span class="text-xs font-semibold bg-blue-900 text-blue-300 px-2 py-0.5 rounded-full">Improvement</span>'
      : '<span class="text-xs font-semibold bg-red-900 text-red-300 px-2 py-0.5 rounded-full">Fix</span>'

  return `
        <div class="relative flex gap-4 mb-8 ml-0">
          <!-- Timeline dot -->
          <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center z-10">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
          </div>
          <!-- Content -->
          <div class="flex-1 bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="text-xs text-gray-500">${date}</span>
              ${badge}
            </div>
            <h3 class="text-base font-semibold text-white mb-1">${title}</h3>
            <p class="text-sm text-gray-400 leading-relaxed">${description}</p>
          </div>
        </div>`
}
