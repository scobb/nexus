const CF_ANALYTICS = `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "REPLACE_WITH_CF_ANALYTICS_TOKEN"}'></script>`

const NAV = `
  <nav class="border-b border-gray-800 px-4 py-4">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <a href="/" class="text-lg font-bold text-indigo-400">Nexus</a>
      <div class="flex items-center gap-4">
        <a href="/blog" class="text-sm text-white font-medium">Blog</a>
        <a href="/docs" class="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
        <a href="/demo" class="text-sm text-gray-400 hover:text-white transition-colors">Demo</a>
        <a href="/auth/login" class="text-sm text-gray-400 hover:text-white transition-colors">Sign in</a>
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">Start free</a>
      </div>
    </div>
  </nav>`

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  readingTime: string
}

export const POSTS: BlogPost[] = [
  {
    slug: 'introducing-nexus',
    title: 'Introducing Nexus — AI Agent Observability Built by an AI Agent',
    date: '2026-04-06',
    excerpt: 'We built Nexus because we needed it. An AI agent (Ralph) needed a way to monitor itself. Here\'s the story of what we built, how it works, and why we\'re open-sourcing it.',
    readingTime: '5 min read',
  },
]

export function blogIndexPage(): string {
  const postCards = POSTS.map(p => `
    <article class="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
      <div class="flex items-center gap-3 mb-3">
        <span class="text-xs text-gray-500">${p.date}</span>
        <span class="text-xs text-gray-600">·</span>
        <span class="text-xs text-gray-500">${p.readingTime}</span>
      </div>
      <h2 class="text-lg font-semibold text-white mb-2 leading-snug">
        <a href="/blog/${p.slug}" class="hover:text-indigo-400 transition-colors">${p.title}</a>
      </h2>
      <p class="text-sm text-gray-400 leading-relaxed mb-4">${p.excerpt}</p>
      <a href="/blog/${p.slug}" class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium">Read more →</a>
    </article>`).join('\n')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog — Nexus AI Agent Observability</title>
  <meta name="description" content="Articles on AI agent observability, monitoring, and the story behind Nexus — the simple, affordable control plane for AI agents.">
  <link rel="canonical" href="https://nexus.keylightdigital.dev/blog">
  <script src="https://cdn.tailwindcss.com"></script>
  ${CF_ANALYTICS}
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${NAV}

  <main class="max-w-3xl mx-auto px-6 py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-white mb-3">Blog</h1>
      <p class="text-gray-400">Thoughts on AI agent observability, developer tools, and building in public.</p>
    </div>

    <div class="space-y-6">
      ${postCards}
    </div>
  </main>

  <footer class="border-t border-gray-800 mt-16 px-4 py-8">
    <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
      <span>© 2026 Keylight Digital LLC · Built by Ralph (AI agent)</span>
      <div class="flex items-center gap-6">
        <a href="/docs" class="hover:text-gray-300 transition-colors">Docs</a>
        <a href="https://github.com/scobb/nexus" class="hover:text-gray-300 transition-colors">GitHub</a>
        <a href="mailto:ralph@keylightdigital.dev" class="hover:text-gray-300 transition-colors">Contact</a>
      </div>
    </div>
  </footer>
</body>
</html>`
}

export function blogPostPage(slug: string): string | null {
  if (slug === 'introducing-nexus') {
    return introducingNexusPost()
  }
  return null
}

function introducingNexusPost(): string {
  const content = `
    <p class="text-lg text-gray-300 leading-relaxed mb-6">
      There's a strange irony in building AI agent infrastructure: the agents doing the work have no way to show you what they did. You get a result (or an error), but the reasoning steps, the LLM calls, the tool uses, the timing — all of it vanishes into the void.
    </p>

    <p class="text-gray-400 leading-relaxed mb-6">
      We hit this problem directly. Ralph — the AI agent that manages Keylight Digital's software projects — was running complex multi-step tasks: scaffolding repos, configuring Cloudflare Workers, sending emails, making API calls. When something went wrong, we had no trace of what happened. No spans. No timing. No inputs or outputs. Just a log message and a guess.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">The options weren't great</h2>

    <p class="text-gray-400 leading-relaxed mb-4">
      We looked at the existing tools:
    </p>

    <ul class="list-disc list-inside text-gray-400 space-y-2 mb-6 ml-4">
      <li><strong class="text-gray-300">LangSmith</strong> — $39/mo minimum, tightly coupled to LangChain</li>
      <li><strong class="text-gray-300">Galileo</strong> — $100/mo, enterprise sales process required</li>
      <li><strong class="text-gray-300">Langfuse</strong> — open-source and excellent, but self-hosting on a VPS adds ops burden and costs</li>
      <li><strong class="text-gray-300">OpenTelemetry</strong> — powerful but overkill; requires a collector, a backend, dashboards</li>
    </ul>

    <p class="text-gray-400 leading-relaxed mb-6">
      None of these is the "Plausible Analytics for AI agents" — simple, hosted, privacy-aware, priced for individual developers. So we built it.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">What Nexus is</h2>

    <p class="text-gray-400 leading-relaxed mb-4">
      Nexus is a hosted agent observability dashboard. Drop in three lines of code. See your traces. Get email alerts when agents fail. It's built on Cloudflare — which means it's fast everywhere, has near-zero COGS, and will never need a VPS or a k8s cluster.
    </p>

    <div class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden my-8">
      <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-950">
        <span class="w-3 h-3 rounded-full bg-red-500/60"></span>
        <span class="w-3 h-3 rounded-full bg-yellow-500/60"></span>
        <span class="w-3 h-3 rounded-full bg-green-500/60"></span>
        <span class="ml-2 text-xs text-gray-500 font-mono">quickstart.ts</span>
      </div>
      <pre class="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-gray-300"><code>import { NexusClient } from '@keylightdigital/nexus'

const nexus = new NexusClient({ apiKey: 'nxs_...', agentId: 'my-agent' })

const trace = await nexus.startTrace({ name: 'process-invoice' })
await trace.addSpan({ name: 'call-gpt-4o', input: { prompt }, output: { result } })
await trace.end({ status: 'success' })</code></pre>
    </div>

    <p class="text-gray-400 leading-relaxed mb-6">
      Python works too: <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">pip install keylightdigital-nexus</code>. The API is identical, just snake_cased.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">How it works</h2>

    <p class="text-gray-400 leading-relaxed mb-4">
      The architecture is deliberately simple:
    </p>

    <ul class="list-disc list-inside text-gray-400 space-y-2 mb-6 ml-4">
      <li><strong class="text-gray-300">Cloudflare Workers</strong> — handles all HTTP at the edge, globally</li>
      <li><strong class="text-gray-300">D1 (SQLite)</strong> — stores traces, spans, users, API keys</li>
      <li><strong class="text-gray-300">KV</strong> — rate limiting, sessions, trace count caching</li>
      <li><strong class="text-gray-300">Resend</strong> — magic link auth and email alerts</li>
      <li><strong class="text-gray-300">Stripe</strong> — Pro plan billing at $9/mo</li>
    </ul>

    <p class="text-gray-400 leading-relaxed mb-6">
      No servers. No queues. No infrastructure to maintain. The entire backend fits in a single Cloudflare Worker. Deploy with <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">wrangler deploy</code>.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">The meta-narrative</h2>

    <p class="text-gray-400 leading-relaxed mb-6">
      Here's the part that still feels surreal: Nexus was built by Ralph, an AI agent, for AI agents. Ralph is an autonomous Claude agent that operates as a software employee of Keylight Digital. He reads PRDs, implements user stories, commits code, deploys to production, and emails blockers when he's stuck.
    </p>

    <p class="text-gray-400 leading-relaxed mb-6">
      Ralph needed observability for his own runs. So he built the tool he needed. That's the product you're reading about. The agent is now monitoring itself.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Pricing</h2>

    <p class="text-gray-400 leading-relaxed mb-4">Simple:</p>

    <ul class="list-disc list-inside text-gray-400 space-y-2 mb-6 ml-4">
      <li><strong class="text-gray-300">Free</strong> — 1,000 traces/month, 1 agent, 30-day retention</li>
      <li><strong class="text-gray-300">Pro ($9/mo)</strong> — 50,000 traces, unlimited agents, 90-day retention, email alerts</li>
    </ul>

    <p class="text-gray-400 leading-relaxed mb-6">
      No enterprise tier. No seats. No "contact us for pricing." If we add higher tiers later, they'll be listed on the pricing page, publicly.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Get started</h2>

    <p class="text-gray-400 leading-relaxed mb-6">
      Sign up free at <a href="https://nexus.keylightdigital.dev" class="text-indigo-400 hover:text-indigo-300">nexus.keylightdigital.dev</a>. The SDK is open-source at <a href="https://github.com/scobb/nexus" class="text-indigo-400 hover:text-indigo-300">github.com/scobb/nexus</a> (MIT license).
    </p>

    <p class="text-gray-400 leading-relaxed mb-6">
      Questions? Email <a href="mailto:ralph@keylightdigital.dev" class="text-indigo-400 hover:text-indigo-300">ralph@keylightdigital.dev</a> — yes, Ralph reads his own email.
    </p>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Introducing Nexus — AI Agent Observability Built by an AI Agent</title>
  <meta name="description" content="We built Nexus because we needed it. An AI agent (Ralph) needed a way to monitor itself. Simple, affordable observability for AI agent developers at $9/mo.">
  <link rel="canonical" href="https://nexus.keylightdigital.dev/blog/introducing-nexus">
  <meta property="og:title" content="Introducing Nexus — AI Agent Observability Built by an AI Agent">
  <meta property="og:description" content="We built Nexus because we needed it. An AI agent (Ralph) needed a way to monitor itself. Simple, affordable observability for AI agent developers at $9/mo.">
  <meta property="og:url" content="https://nexus.keylightdigital.dev/blog/introducing-nexus">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <meta property="og:site_name" content="Nexus">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Introducing Nexus — AI Agent Observability Built by an AI Agent">
  <meta name="twitter:description" content="We built Nexus because we needed it. An AI agent (Ralph) needed a way to monitor itself.">
  <meta name="twitter:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <script src="https://cdn.tailwindcss.com"></script>
  ${CF_ANALYTICS}
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${NAV}

  <main class="max-w-2xl mx-auto px-6 py-12">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-500 mb-8">
      <a href="/blog" class="hover:text-gray-300 transition-colors">Blog</a>
      <span class="mx-2">›</span>
      <span class="text-gray-400">Introducing Nexus</span>
    </nav>

    <!-- Header -->
    <header class="mb-10">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-xs text-gray-500">2026-04-06</span>
        <span class="text-xs text-gray-600">·</span>
        <span class="text-xs text-gray-500">5 min read</span>
        <span class="text-xs text-gray-600">·</span>
        <span class="text-xs text-indigo-400 bg-indigo-950 border border-indigo-800 px-2 py-0.5 rounded-full">Launch</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-bold text-white leading-tight">
        Introducing Nexus — AI Agent Observability Built by an AI Agent
      </h1>
    </header>

    <!-- Content -->
    <div class="prose-custom">
      ${content}
    </div>

    <!-- CTA -->
    <div class="mt-16 bg-indigo-950 border border-indigo-800 rounded-2xl px-8 py-8 text-center">
      <h2 class="text-xl font-bold text-white mb-2">Try Nexus free</h2>
      <p class="text-gray-400 text-sm mb-5">1,000 traces/month, no credit card required.</p>
      <div class="flex flex-col sm:flex-row justify-center gap-3">
        <a href="/register" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-sm">
          Start free →
        </a>
        <a href="/demo" class="inline-block bg-gray-800 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-sm">
          View demo
        </a>
      </div>
    </div>
  </main>

  <footer class="border-t border-gray-800 mt-16 px-4 py-8">
    <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
      <span>© 2026 Keylight Digital LLC · Built by Ralph (AI agent)</span>
      <div class="flex items-center gap-6">
        <a href="/docs" class="hover:text-gray-300 transition-colors">Docs</a>
        <a href="https://github.com/scobb/nexus" class="hover:text-gray-300 transition-colors">GitHub</a>
        <a href="mailto:ralph@keylightdigital.dev" class="hover:text-gray-300 transition-colors">Contact</a>
      </div>
    </div>
  </footer>
</body>
</html>`
}
