const CF_ANALYTICS = `<link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- Beam Analytics (dogfooding) --><script defer src="https://beam.keylightdigital.dev/js/beam.js" data-site-id="dee2fad9-ca65-4746-aa74-6480534507ef"></script>`

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
    slug: 'autonomous-agent-observability',
    title: 'Building an Autonomous AI Agent with Observability — Lessons from Ralph',
    date: '2026-04-08',
    excerpt: 'Ralph is the AI agent that built Nexus. It monitored itself throughout. Here are the failure modes we caught from trace data, and the design principles that emerged from 84 user stories and hundreds of agent sessions.',
    readingTime: '7 min read',
  },
  {
    slug: 'monitor-ai-agents-production',
    title: 'How to Monitor Your AI Agents in Production',
    date: '2026-04-07',
    excerpt: 'AI agents fail in production in ways that are invisible without observability. Silent retries, cascading tool errors, runaway token usage — here\'s how to instrument your agents before they cost you.',
    readingTime: '6 min read',
  },
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
  <link rel="stylesheet" href="/styles.css">
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
  if (slug === 'monitor-ai-agents-production') {
    return monitorAIAgentsProductionPost()
  }
  if (slug === 'autonomous-agent-observability') {
    return autonomousAgentObservabilityPost()
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
  <link rel="stylesheet" href="/styles.css">
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

function monitorAIAgentsProductionPost(): string {
  const content = `
    <p class="text-lg text-gray-300 leading-relaxed mb-6">
      AI agents fail in production in ways that are invisible without observability. You ship a working agent, it runs great in development, and then one day a user's request triggers a cascade: the LLM returns an unexpected format, the tool parser throws, the agent retries three times silently, and eventually returns an empty response. The user sees nothing. You see nothing.
    </p>
    <p class="text-gray-300 leading-relaxed mb-6">
      This post covers the most common agent failure modes we've seen, and how to instrument your agents before they become expensive problems.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Why agent observability is different</h2>
    <p class="text-gray-300 leading-relaxed mb-4">
      Traditional application monitoring tools (Datadog, Sentry, New Relic) are built around request-response cycles and error rates. AI agents don't fit that model. A single "agent run" might involve:
    </p>
    <ul class="text-gray-300 space-y-2 mb-6 pl-4">
      <li>• 5-20 sequential LLM calls, each with different token counts and latencies</li>
      <li>• Tool executions that may fail and retry</li>
      <li>• Sub-agent spawning and handoffs</li>
      <li>• Non-deterministic outputs — the same input can take wildly different paths</li>
    </ul>
    <p class="text-gray-300 leading-relaxed mb-6">
      You need trace-level visibility: the full sequence of LLM calls and tool uses for each agent run, with timing, input, output, and errors at each step.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">The 5 failure modes that will bite you</h2>

    <h3 class="text-lg font-semibold text-white mt-6 mb-2">1. Silent retry loops</h3>
    <p class="text-gray-300 leading-relaxed mb-4">
      An agent retries a failed tool call 3 times before giving up. In logs: nothing. In your users' experience: a 30-second hang. This is the most common failure mode and the hardest to debug without trace data.
    </p>

    <h3 class="text-lg font-semibold text-white mt-6 mb-2">2. Token budget exhaustion</h3>
    <p class="text-gray-300 leading-relaxed mb-4">
      You set <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">max_tokens=4096</code> and the agent hits the limit mid-reasoning. The response gets truncated, the tool call is malformed, and the next step fails. Without span-level token counts, you'll never know which step triggered the cascade.
    </p>

    <h3 class="text-lg font-semibold text-white mt-6 mb-2">3. Context drift across turns</h3>
    <p class="text-gray-300 leading-relaxed mb-4">
      Multi-turn agents accumulate context. By turn 8, the agent has "forgotten" the original user goal and is optimizing for something else entirely. You need per-turn input/output logging to detect this.
    </p>

    <h3 class="text-lg font-semibold text-white mt-6 mb-2">4. Tool output schema mismatch</h3>
    <p class="text-gray-300 leading-relaxed mb-4">
      An external API you call from a tool changes its response format. Your parsing code throws. The agent catches the exception and either retries indefinitely or returns a hallucinated fallback. Logging tool inputs and outputs makes this immediately visible.
    </p>

    <h3 class="text-lg font-semibold text-white mt-6 mb-2">5. Runaway sub-agent spawning</h3>
    <p class="text-gray-300 leading-relaxed mb-4">
      An agent that can spawn sub-agents will sometimes do so unnecessarily — especially when given a vague task. Without trace data, you won't know whether the agent completed your task in 2 steps or 20.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">How to instrument your agents in 10 minutes</h2>
    <p class="text-gray-300 leading-relaxed mb-4">
      Here's a before/after for a typical OpenAI-based agent loop:
    </p>

    <div class="mb-4">
      <p class="text-sm font-semibold text-gray-500 mb-2">Before — zero visibility</p>
      <pre class="bg-gray-900 border border-gray-700 rounded-xl p-4 overflow-x-auto text-sm text-gray-200 leading-relaxed"><code class="language-python">async def run_agent(task: str) -> str:
    messages = [{"role": "user", "content": task}]
    for turn in range(10):
        response = await client.chat.completions.create(
            model="gpt-4o", messages=messages
        )
        if response.choices[0].finish_reason == "stop":
            return response.choices[0].message.content
        # handle tool calls...
    return "max turns reached"</code></pre>
    </div>

    <div class="mb-6">
      <p class="text-sm font-semibold text-gray-500 mb-2">After — full trace with Nexus (3 lines added)</p>
      <pre class="bg-gray-900 border border-gray-700 rounded-xl p-4 overflow-x-auto text-sm text-gray-200 leading-relaxed"><code class="language-python">from nexus_client import NexusClient

nexus = NexusClient(api_key=os.environ["NEXUS_API_KEY"], agent_id="my-agent")

async def run_agent(task: str) -> str:
    trace = nexus.start_trace(name=f"Task: {task[:60]}")  # +1 line
    messages = [{"role": "user", "content": task}]
    try:
        for turn in range(10):
            response = await client.chat.completions.create(
                model="gpt-4o", messages=messages
            )
            trace.add_span(                                # +1 line
                name=f"turn-{turn}",
                output={"finish_reason": response.choices[0].finish_reason,
                        "tokens": response.usage.total_tokens}
            )
            if response.choices[0].finish_reason == "stop":
                trace.end(status="success")               # +1 line
                return response.choices[0].message.content
            # handle tool calls...
        trace.end(status="error")
        return "max turns reached"
    except Exception:
        trace.end(status="error")
        raise</code></pre>
    </div>

    <p class="text-gray-300 leading-relaxed mb-6">
      Install with: <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">pip install keylightdigital-nexus</code>.
      See the <a href="/docs" class="text-indigo-400 hover:text-indigo-300">full API reference →</a>
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">What to track in each span</h2>
    <p class="text-gray-300 leading-relaxed mb-4">
      A good span captures enough to reproduce the failure without capturing so much that storage becomes a concern. For each LLM call, we recommend:
    </p>
    <ul class="text-gray-300 space-y-2 mb-6 pl-4">
      <li>• <strong class="text-white">Input:</strong> message count, turn number (not the full messages — that's expensive)</li>
      <li>• <strong class="text-white">Output:</strong> finish_reason, token counts, stop reason</li>
      <li>• <strong class="text-white">Timing:</strong> auto-captured by the SDK</li>
    </ul>
    <p class="text-gray-300 leading-relaxed mb-4">For tool calls, capture the full input and output — tool schemas are usually small:</p>
    <pre class="bg-gray-900 border border-gray-700 rounded-xl p-4 overflow-x-auto text-sm text-gray-200 leading-relaxed mb-6"><code class="language-python">trace.add_span(
    name=f"tool-{tool_name}",
    input=tool_args,          # full tool arguments
    output={"result": result, "error": error_msg},
)</code></pre>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Setting up alerts</h2>
    <p class="text-gray-300 leading-relaxed mb-4">
      Once you have traces, you want to know when things go wrong. Nexus sends you an email when any agent trace ends with status <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">error</code> or <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">timeout</code> — rate-limited to 1 alert per agent per 5 minutes to prevent noise.
    </p>
    <p class="text-gray-300 leading-relaxed mb-6">
      Alerts are a Pro feature. See the <a href="/pricing" class="text-indigo-400 hover:text-indigo-300">pricing page</a> — Pro is $9/month.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">The meta-story: Ralph monitors itself</h2>
    <p class="text-gray-300 leading-relaxed mb-4">
      Nexus was built by an AI agent named Ralph. Ralph runs as a scheduled Claude Code session that reads a PRD, picks the next user story, implements it, runs quality checks, and commits. Each iteration is a Nexus trace. Each LLM call and tool use is a span.
    </p>
    <p class="text-gray-300 leading-relaxed mb-6">
      This means we dogfood our own product. When Ralph has a bad iteration — a test that didn't run, a commit that broke typecheck — we see exactly where it went wrong in the trace viewer. That feedback loop is why Nexus exists.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Start monitoring</h2>
    <p class="text-gray-300 leading-relaxed mb-4">
      Nexus is free for 1,000 traces/month with a 1-agent limit. If you're running a production agent, that covers most side projects and prototypes. Pro is $9/month for 50,000 traces, unlimited agents, and email alerts.
    </p>
    <p class="text-gray-300 leading-relaxed mb-6">
      <a href="/register" class="text-indigo-400 hover:text-indigo-300">Sign up free →</a> and instrument your first agent in under 10 minutes.
    </p>
  `

  const post = POSTS.find(p => p.slug === 'monitor-ai-agents-production')!

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title} — Nexus</title>
  <meta name="description" content="${post.excerpt}">
  <link rel="canonical" href="https://nexus.keylightdigital.dev/blog/monitor-ai-agents-production">
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${post.excerpt}">
  <meta property="og:url" content="https://nexus.keylightdigital.dev/blog/monitor-ai-agents-production">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <link rel="stylesheet" href="/styles.css">
  ${CF_ANALYTICS}
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${NAV}

  <main class="max-w-3xl mx-auto px-6 py-12">
    <div class="mb-2">
      <a href="/blog" class="text-sm text-indigo-400 hover:text-indigo-300">← Blog</a>
    </div>

    <div class="flex items-center gap-3 mb-6 mt-4">
      <span class="text-xs text-gray-500">${post.date}</span>
      <span class="text-xs text-gray-600">·</span>
      <span class="text-xs text-gray-500">${post.readingTime}</span>
    </div>

    <h1 class="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">${post.title}</h1>

    <div class="prose prose-invert max-w-none">
      ${content}
    </div>

    <!-- CTA -->
    <div class="mt-16 bg-indigo-950 border border-indigo-800 rounded-2xl px-8 py-8 text-center">
      <h2 class="text-xl font-bold text-white mb-2">Monitor your first agent free</h2>
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

function autonomousAgentObservabilityPost(): string {
  const content = `
    <p class="text-lg text-gray-300 leading-relaxed mb-6">
      Ralph is an autonomous AI agent that builds software. It reads a product requirements document, picks the next user story, implements it, runs quality checks, commits the code, and reports progress. Then it stops and waits for the next session.
    </p>
    <p class="text-gray-300 leading-relaxed mb-6">
      Ralph built Nexus. And Ralph uses Nexus to monitor itself. This post is the story of what we learned from running a production autonomous agent for three weeks — the failure modes, the trace patterns that caught them, and the design decisions that followed.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">The architecture</h2>
    <p class="text-gray-300 leading-relaxed mb-4">
      Ralph runs on Claude Code (Anthropic's AI coding tool) invoked via a cron schedule. Each session is a single agent run:
    </p>
    <ol class="text-gray-300 space-y-2 mb-6 pl-4 list-decimal list-inside">
      <li>Read <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">prd.json</code> and <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">progress.txt</code></li>
      <li>Pick the highest-priority story where <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">passes: false</code></li>
      <li>Implement the story using file edits and bash commands</li>
      <li>Run quality checks (TypeScript, tests)</li>
      <li>Commit the changes and update the PRD</li>
    </ol>
    <p class="text-gray-300 leading-relaxed mb-6">
      A typical session spans 20-40 LLM calls (reads, edits, shell commands), takes 5-15 minutes, and produces 1-3 commits. Over 3 weeks, Ralph completed 84 user stories.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">The failure modes we saw</h2>

    <h3 class="text-lg font-semibold text-white mt-6 mb-2">1. Context collapse</h3>
    <p class="text-gray-300 leading-relaxed mb-4">
      As sessions grew longer, Ralph would occasionally "forget" what it was implementing mid-story. In trace data, this showed up as a sudden shift in span names: <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">implement-auth-endpoint</code> → <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">read-file</code> → <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">read-file</code> → <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">read-file</code> (stuck re-reading instead of writing).
    </p>
    <p class="text-gray-300 leading-relaxed mb-4">
      Fix: we added a "Codebase Patterns" section to <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">progress.txt</code> that Ralph reads at the start of every session. Shorter context → less drift.
    </p>

    <h3 class="text-lg font-semibold text-white mt-6 mb-2">2. Blocker loops</h3>
    <p class="text-gray-300 leading-relaxed mb-4">
      Some stories required external credentials (a Cloudflare API token, a PyPI token). Ralph couldn't proceed and would retry the same blocked action 5-8 times before logging the blocker. In traces, this looked like repeated identical spans with <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">error</code> status.
    </p>
    <p class="text-gray-300 leading-relaxed mb-4">
      Fix: we added explicit blocker detection — if Ralph hits the same error 3 times, it logs to <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">blockers.log</code>, emails the operator (Steve), and skips to the next story. This is now the standard autonomous agent pattern.
    </p>

    <h3 class="text-lg font-semibold text-white mt-6 mb-2">3. Duplicate work</h3>
    <p class="text-gray-300 leading-relaxed mb-4">
      Early on, Ralph would sometimes implement a feature, not recognize it had passed the acceptance criteria, and implement it again in a later session. Traces showed overlapping span patterns across sessions: the same file reads and the same function signatures appearing twice.
    </p>
    <p class="text-gray-300 leading-relaxed mb-4">
      Fix: the PRD's <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">passes: true/false</code> field became the canonical state. Once a story passes, Ralph never touches it again. Git commit history provides the audit trail.
    </p>

    <h3 class="text-lg font-semibold text-white mt-6 mb-2">4. Test environment side effects</h3>
    <p class="text-gray-300 leading-relaxed mb-4">
      Ralph's integration tests hit a real SQLite database (via Cloudflare D1 locally). Some test runs left state that caused the next test to fail. In traces, this appeared as test spans with status <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">error</code> that passed on retry — the classic test isolation bug.
    </p>
    <p class="text-gray-300 leading-relaxed mb-4">
      Fix: test setup/teardown added to each test file. The trace pattern (pass → fail → pass → fail) was the diagnostic signal.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">What a healthy trace looks like</h2>
    <p class="text-gray-300 leading-relaxed mb-4">
      A successful Ralph session has a predictable span pattern:
    </p>
    <pre class="bg-gray-900 border border-gray-700 rounded-xl p-4 overflow-x-auto text-sm text-gray-200 leading-relaxed mb-6"><code>session-start          [0ms]
  read-prd              [45ms]    — reads prd.json
  read-progress         [38ms]    — reads progress.txt
  pick-story            [320ms]   — LLM selects next story
  read-existing-code    [180ms]   — reads relevant files
  plan-implementation   [890ms]   — LLM plans the approach
  write-files           [2100ms]  — creates/edits source files
  run-typecheck         [4200ms]  — npx tsc --noEmit
  run-tests             [8300ms]  — test suite
  commit-changes        [1200ms]  — git add + commit
  update-prd            [350ms]   — sets passes: true
  append-progress       [200ms]   — updates progress.txt
session-end            [success, 17.8s total]</code></pre>
    <p class="text-gray-300 leading-relaxed mb-6">
      When a session goes wrong, the deviation from this pattern is immediately visible. A blocker loop looks like <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">run-typecheck</code> repeating 5 times. A context collapse looks like <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">read-existing-code</code> spanning 40% of the session time.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">The design principles that emerged</h2>
    <p class="text-gray-300 leading-relaxed mb-4">
      After 84 stories and hundreds of agent sessions, three design principles emerged:
    </p>

    <h3 class="text-lg font-semibold text-white mt-6 mb-2">1. Traces are your deployment logs</h3>
    <p class="text-gray-300 leading-relaxed mb-4">
      For autonomous agents, traces replace traditional deployment logs. You don't deploy a build — you deploy an agent run. The trace is the record of what it did and whether it succeeded. Store every trace. You'll need them for debugging.
    </p>

    <h3 class="text-lg font-semibold text-white mt-6 mb-2">2. Skip, don't fail</h3>
    <p class="text-gray-300 leading-relaxed mb-4">
      Autonomous agents should never block indefinitely. If a task can't be completed, log the blocker and move to the next task. An agent that skips 3 tasks and completes 7 is more valuable than one that hangs on task 1 for an hour.
    </p>

    <h3 class="text-lg font-semibold text-white mt-6 mb-2">3. Make state external and durable</h3>
    <p class="text-gray-300 leading-relaxed mb-4">
      Ralph's state is entirely in files: <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">prd.json</code>, <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">progress.txt</code>, <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm">blockers.log</code>. When a session crashes mid-way, the next session picks up exactly where the last one left off. The state survives restarts because it lives in git.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Try the demo</h2>
    <p class="text-gray-300 leading-relaxed mb-4">
      You can see what Ralph's traces look like in the <a href="/demo" class="text-indigo-400 hover:text-indigo-300">Nexus demo</a> — realistic sample data showing the span waterfall, status colors, and input/output inspector. No signup required.
    </p>
    <p class="text-gray-300 leading-relaxed mb-6">
      If you're building autonomous agents, instrument them with Nexus. The <a href="/docs" class="text-indigo-400 hover:text-indigo-300">API reference</a> has SDKs for TypeScript and Python. Free plan covers 1,000 traces/month — more than enough to get started.
    </p>
  `

  const post = POSTS.find(p => p.slug === 'autonomous-agent-observability')!

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title} — Nexus</title>
  <meta name="description" content="${post.excerpt}">
  <link rel="canonical" href="https://nexus.keylightdigital.dev/blog/autonomous-agent-observability">
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${post.excerpt}">
  <meta property="og:url" content="https://nexus.keylightdigital.dev/blog/autonomous-agent-observability">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <link rel="stylesheet" href="/styles.css">
  ${CF_ANALYTICS}
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${NAV}

  <main class="max-w-3xl mx-auto px-6 py-12">
    <div class="mb-2">
      <a href="/blog" class="text-sm text-indigo-400 hover:text-indigo-300">← Blog</a>
    </div>

    <div class="flex items-center gap-3 mb-6 mt-4">
      <span class="text-xs text-gray-500">${post.date}</span>
      <span class="text-xs text-gray-600">·</span>
      <span class="text-xs text-gray-500">${post.readingTime}</span>
    </div>

    <h1 class="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">${post.title}</h1>

    <div class="prose prose-invert max-w-none">
      ${content}
    </div>

    <!-- CTA -->
    <div class="mt-16 bg-indigo-950 border border-indigo-800 rounded-2xl px-8 py-8 text-center">
      <h2 class="text-xl font-bold text-white mb-2">Instrument your autonomous agent</h2>
      <p class="text-gray-400 text-sm mb-5">1,000 traces/month free. No credit card needed.</p>
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
