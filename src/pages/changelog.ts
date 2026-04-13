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
  <!-- Font loading: preconnect + async load (non-blocking) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" media="print" onload="this.onload=null;this.media='all'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"></noscript>
  <link rel="stylesheet" href="/styles.css">
  <style>
    /* Critical CSS: prevent flash of unstyled content above fold */
    body { background-color: #030712; color: #f3f4f6; font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
    .skip-link { position: absolute; left: -9999px; }
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
      <p class="text-gray-400 text-lg mb-6">
        The full development history of Nexus — shipped in days, not months.
        Every milestone here was implemented by <strong class="text-gray-200">Ralph</strong>, an AI agent at Keylight Digital.
      </p>
      <a href="/blog/rss.xml" class="inline-flex items-center gap-1.5 text-sm text-orange-400 hover:text-orange-300 transition-colors" title="Subscribe to blog via RSS">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/></svg>
        RSS feed
      </a>
    </div>
  </section>

  <!-- Changelog entries -->
  <section class="px-4 pb-24">
    <div class="max-w-2xl mx-auto">
      <!-- Timeline line -->
      <div class="relative">
        <div class="absolute left-4 top-0 bottom-0 w-px bg-gray-800"></div>

        <!-- April 13 entries -->
        <div class="mb-2 ml-12">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">April 13, 2026</span>
        </div>

        ${entry('Apr 13', 'Dashboard onboarding widget', 'New users with zero traces see an interactive quickstart: masked API key with reveal/copy, tabbed Python/TypeScript/curl code snippets, and a live polling indicator that reloads with a celebration on first trace.', 'feature')}
        ${entry('Apr 13', 'Public demo dashboard at /demo', 'Full-featured demo dashboard loaded from real D1 data — 53 traces across 5 agents with realistic error rates and latencies. No sign-up required.', 'feature')}
        ${entry('Apr 13', 'Demo data seed', 'D1 seed script with idempotent INSERT OR IGNORE populates the demo dashboard: 53 traces, 5 agents, 11 spans, ~10% error rate, and 7-day trace spread for realistic chart data.', 'improvement')}

        <!-- April 12 entries -->
        <div class="mb-2 ml-12 mt-8">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">April 12, 2026</span>
        </div>

        ${entry('Apr 12', 'Comprehensive smoke test suite', 'Playwright smoke tests for all core user flows: auth, API keys, trace ingestion, billing, dashboard, agents, settings, and public pages. Runs against local, staging, and production.', 'improvement')}
        ${entry('Apr 12', 'Staging environment with Stripe test mode', 'Isolated staging deployment at nexus-staging.stevencolecobb.workers.dev with Stripe test mode configured. Enables safe end-to-end billing validation before production deploys.', 'improvement')}
        ${entry('Apr 12', 'Privacy Policy and Terms of Service pages', 'Legally required pages at /privacy and /terms. Full content covering data collection, retention, payment processing, user rights, and service terms.', 'content')}

        <!-- April 11 entries -->
        <div class="mb-2 ml-12 mt-8">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">April 11, 2026</span>
        </div>

        ${entry('Apr 11', 'Blog RSS/Atom feed at /blog/rss.xml', 'Subscribe to the Nexus blog via RSS. Auto-discovery link in &lt;head&gt; means readers like Feedly and Reeder detect the feed automatically.', 'feature')}
        ${entry('Apr 11', 'Security hardening — HSTS, Permissions-Policy, response headers', 'Added Strict-Transport-Security, Permissions-Policy, X-Frame-Options, and X-Content-Type-Options headers. Reduces attack surface on all routes.', 'fix')}
        ${entry('Apr 11', 'Edge cache for all static pages', 'Cache-Control headers on all public HTML pages: max-age=300 with stale-while-revalidate. Dramatically reduces D1 reads and improves Time to First Byte on cached edges.', 'improvement')}

        <!-- April 10 entries -->
        <div class="mb-2 ml-12 mt-8">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">April 10, 2026</span>
        </div>

        ${entry('Apr 10', 'GitHub Actions CD — auto-deploy on push to main', 'Wrangler deploy runs automatically on every push to main via GitHub Actions. Deploy time: ~45 seconds from push to live.', 'improvement')}
        ${entry('Apr 10', 'Mobile audit — all pages responsive at 375px', 'Systematic pass over every page for 375px viewport: fixed horizontal overflow on traces table, improved tap target sizes, tightened nav padding, fixed chart overflow.', 'fix')}
        ${entry('Apr 10', 'Accessibility improvements — skip nav, alt text, semantic HTML', 'Added skip-to-content links, aria-labels on icon buttons, semantic landmark elements, and improved color contrast ratios across dashboard and auth pages.', 'improvement')}

        <!-- April 9 entries -->
        <div class="mb-2 ml-12 mt-8">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">April 9, 2026</span>
        </div>

        ${entry('Apr 9', 'Integration guides — LangChain, CrewAI, AutoGen, Pydantic AI, LlamaIndex, DSPy, OpenAI Agents, Google ADK', 'Eight new integration guides covering the most popular AI agent frameworks. Each guide includes a complete working example, environment setup, and framework-specific tips.', 'content')}
        ${entry('Apr 9', 'Competitor comparison pages expanded', 'Added /vs/helicone, /vs/braintrust, /vs/datadog, /vs/wandb, /vs/portkey, and /vs/arize-phoenix. Honest, technical comparisons with up-to-date pricing.', 'content')}
        ${entry('Apr 9', 'Build-time CSS — replaced Tailwind CDN', 'Switched from runtime Tailwind CDN to build-time CSS bundle. Page weight cut by ~300KB. CSS is now bundled at deploy time with only the classes actually used.', 'improvement')}

        <!-- April 8 entries -->
        <div class="mb-2 ml-12 mt-8">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">April 8, 2026</span>
        </div>

        ${entry('Apr 8', 'Shareable public trace links', 'Any trace can be shared as a public read-only URL. Useful for AI agent debugging sessions with teammates or attaching to bug reports.', 'feature')}
        ${entry('Apr 8', 'Trace search by metadata and text', 'Search traces by agent name, status, error message, or metadata. Full-text search backed by SQLite FTS on D1. Results update as you type.', 'feature')}
        ${entry('Apr 8', 'Webhook notifications for trace errors', 'Pro users can configure a webhook URL in Settings. Nexus POSTs a JSON payload on every trace that ends with status error or timeout, in real time.', 'feature')}
        ${entry('Apr 8', 'Guided onboarding checklist on dashboard', 'New users see a step-by-step checklist: create API key → send first trace → view in dashboard. Dismissible, with individual step completion tracking.', 'feature')}

        <!-- April 7 entries -->
        <div class="mb-2 ml-12 mt-8">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">April 7, 2026</span>
        </div>

        ${entry('Apr 7', 'Span waterfall timeline on trace detail', 'Visual waterfall chart on trace detail pages — shows span start times, durations, and nesting at a glance. Rendered entirely in CSS with no JS charting library.', 'feature')}
        ${entry('Apr 7', 'Dashboard auto-refresh with live indicator', 'Dashboard metrics refresh every 30 seconds. A pulsing dot in the corner shows the last-updated time. Keeps the overview useful during long-running agent sessions.', 'feature')}
        ${entry('Apr 7', 'Traces-over-time bar chart', '7-day bar chart on the overview dashboard shows trace volume and error count side by side. Helps identify when an agent deployment caused a spike.', 'feature')}
        ${entry('Apr 7', 'Production uptime monitoring via cron', 'Cloudflare Workers cron pings /health every minute and writes status to KV. Failed pings trigger an alert email via Resend.', 'improvement')}

        <!-- April 6 entries -->
        <div class="mb-2 ml-12 mt-8">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">April 6, 2026</span>
        </div>

        ${entry('Apr 6', 'OpenTelemetry-compatible trace ingestion', 'Accept OTLP/HTTP JSON format at POST /v1/traces. Any developer with existing OpenTelemetry instrumentation can point their exporter at Nexus with a one-line config change — no SDK required.', 'feature')}
        ${entry('Apr 6', 'Dashboard trace filtering and search', 'Filter traces by status, agent, and date range on the traces page. Supports query parameters so filters persist across page loads. Default view: last 7 days.', 'feature')}
        ${entry('Apr 6', 'Python SDK — pip install nexus-agent', 'Full Python SDK for AI agent developers. Mirrors the TypeScript API: NexusClient, start_trace(), add_span(), end(). Zero external dependencies — pure stdlib only.', 'feature')}
        ${entry('Apr 6', 'SEO comparison pages — /vs/langfuse and /vs/langsmith', 'Honest, technical comparison pages targeting developer search queries. Acknowledges competitor strengths while positioning Nexus for its niche: indie developers who need simplicity, not enterprise features.', 'improvement')}
        ${entry('Apr 6', 'Interactive demo at /demo', 'Explore the full trace viewer and dashboard with realistic sample data — no sign-up required. Three sample agents with spans, waterfall views, and error cases.', 'feature')}
        ${entry('Apr 6', 'API documentation at /docs', 'Full REST API reference with request/response examples, authentication guide, and SDK quickstarts for both TypeScript and Python. Linked from the nav and landing page.', 'feature')}
        ${entry('Apr 6', 'Blog and Dev.to article draft', 'Published "How I Monitor My AI Agents for $9/Month" — a technical, honest walkthrough of the Nexus architecture, SDK integration, and pricing rationale.', 'content')}
        ${entry('Apr 6', 'Open Graph social cards and SEO meta tags', 'Every public page now has og:title, og:description, og:image, twitter:card. GET /og-image.png returns a branded SVG card for rich link previews on HN, Twitter, and Slack.', 'improvement')}
        ${entry('Apr 6', 'robots.txt, sitemap.xml, and JSON-LD structured data', 'SEO foundations: robots.txt allows all crawlers, sitemap.xml lists all public pages with priority weights, landing page includes Organization + SoftwareApplication JSON-LD.', 'improvement')}

        <!-- April 5 entries -->
        <div class="mb-2 ml-12 mt-8">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">April 5, 2026</span>
        </div>

        ${entry('Apr 5', 'Settings page — account info, API keys, danger zone', 'Manage your API keys, view account plan, and delete your account. Account deletion cascades to all data and cancels any active Stripe subscription.', 'feature')}
        ${entry('Apr 5', 'Stripe billing — Free/Pro Checkout and webhook handling', 'Upgrade to Pro ($9/mo) via Stripe Checkout. Webhooks handle subscription lifecycle events to keep plan status current. Billing portal lets Pro users manage their subscription.', 'feature')}
        ${entry('Apr 5', 'Email alerts for agent failures', 'Pro users receive email alerts via Resend when a trace ends with status error or timeout. Rate-limited to 1 alert per agent per 5 minutes to prevent alert fatigue.', 'feature')}
        ${entry('Apr 5', 'Multi-agent management', 'See all registered agents, their health status, and per-agent trace history. Agents are auto-created on first trace ingestion — no manual setup required.', 'feature')}
        ${entry('Apr 5', 'Dashboard with agent health overview and trace volume chart', 'Overview page showing traces this month, error rate, average latency, per-agent health cards, and a 7-day CSS bar chart. All metrics from live D1 queries.', 'feature')}
        ${entry('Apr 5', 'Trace viewer — browse traces, expand spans', 'Browse your traces with status color-coding, durations, and pagination. Trace detail shows all spans in waterfall order with collapsible input/output/error — zero JavaScript.', 'feature')}
        ${entry('Apr 5', 'TypeScript SDK — @keylightdigital/nexus', 'Open-source npm package for agent instrumentation. NexusClient → startTrace() → addSpan() → end(). All methods handle network errors gracefully and never throw.', 'feature')}
        ${entry('Apr 5', 'Span ingestion API — POST /api/v1/traces/:id/spans', 'Capture individual LLM calls, tool uses, and sub-agent invocations with timing, input, output, and error data. Nested spans via parent_span_id.', 'feature')}
        ${entry('Apr 5', 'Trace ingestion API — POST /api/v1/traces', 'Core API endpoint for agent observability. API key auth, plan limit enforcement (1K traces/month Free), auto-creates agent records on first use. Returns trace_id in 201ms.', 'feature')}
        ${entry('Apr 5', 'API key management — create, list, revoke', 'Generate nxs_-prefixed API keys (SHA-256 hashed, shown once), list active keys, revoke compromised ones. Keys identify your agents in the ingestion API.', 'feature')}
        ${entry('Apr 5', 'Magic link auth — email login, session cookies', 'No passwords. Enter your email, click the link. Sessions stored in Cloudflare KV (7-day TTL). Rate-limited to prevent abuse.', 'feature')}
        ${entry('Apr 5', 'Landing page — "Plausible for AI agents" positioning', 'Server-rendered HTML. Hero, pricing table (Free vs Pro), feature comparison, how-it-works, SDK code example, FAQ, meta-narrative. No JavaScript frameworks.', 'feature')}
        ${entry('Apr 5', 'Database schema — agents, traces, spans, users, subscriptions', 'D1 (SQLite at edge) schema with all core tables, indexes, and IF NOT EXISTS guards. ON DELETE CASCADE throughout for clean account deletion.', 'feature')}
        ${entry('Apr 5', 'Project scaffolded — Cloudflare Workers + Hono + D1 + KV', 'Nexus born. Cloudflare Workers runtime, Hono framework, D1 database, KV namespace, TypeScript, wrangler. GET /health returns {status: "ok"}. Build time: ~2 hours.', 'feature')}
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

  <footer class="border-t border-gray-800 px-4 py-8">
    <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
      <span>© 2026 Keylight Digital LLC</span>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <a href="/privacy" class="hover:text-gray-300 transition-colors">Privacy</a>
        <a href="/terms" class="hover:text-gray-300 transition-colors">Terms</a>
        <a href="/changelog" class="hover:text-gray-300 transition-colors">Changelog</a>
        <a href="/docs" class="hover:text-gray-300 transition-colors">Docs</a>
        <a href="https://github.com/scobb/nexus" class="hover:text-gray-300 transition-colors">GitHub</a>
      </div>
    </div>
  </footer>
</body>
</html>`
}

function entry(date: string, title: string, description: string, type: 'feature' | 'new' | 'improvement' | 'fix' | 'content'): string {
  const badge = (type === 'feature' || type === 'new')
    ? '<span class="text-xs font-semibold bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Feature</span>'
    : type === 'improvement'
      ? '<span class="text-xs font-semibold bg-blue-900 text-blue-300 px-2 py-0.5 rounded-full">Improvement</span>'
      : type === 'content'
        ? '<span class="text-xs font-semibold bg-purple-900 text-purple-300 px-2 py-0.5 rounded-full">Content</span>'
        : '<span class="text-xs font-semibold bg-orange-900 text-orange-300 px-2 py-0.5 rounded-full">Fix</span>'

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
