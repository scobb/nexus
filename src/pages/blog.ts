const CF_ANALYTICS = `<link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- Beam Analytics (dogfooding) --><script defer src="https://beam-privacy.com/js/beam.js" data-site-id="dee2fad9-ca65-4746-aa74-6480534507ef"></script>`

const NAV = `
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <nav class="border-b border-gray-800 px-4 py-4">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <a href="/" class="text-lg font-bold text-indigo-400">Nexus</a>
      <div class="hidden sm:flex items-center gap-4">
        <a href="/blog" class="text-sm text-white font-medium">Blog</a>
        <a href="/docs" class="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
        <a href="/demo" class="text-sm text-gray-400 hover:text-white transition-colors">Demo</a>
        <a href="/auth/login" class="text-sm text-gray-400 hover:text-white transition-colors">Sign in</a>
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">Start free</a>
      </div>
      <div class="flex sm:hidden items-center gap-2">
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-medium transition-colors">Start free</a>
        <button onclick="var m=document.getElementById('blog-mnav');m.classList.toggle('hidden')" class="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Open navigation menu">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
    <div id="blog-mnav" class="hidden sm:hidden max-w-4xl mx-auto border-t border-gray-800 mt-3 pt-2 pb-1 space-y-0.5">
      <a href="/blog" class="block px-2 py-2.5 text-sm text-white font-medium bg-gray-800 rounded-lg">Blog</a>
      <a href="/docs" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Docs</a>
      <a href="/demo" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Demo</a>
      <a href="/auth/login" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Sign in</a>
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
    slug: 'ai-agent-cost-guide',
    title: 'How Much Does It Cost to Run AI Agents? A Token Economics Guide',
    date: '2026-04-09',
    excerpt: 'Running AI agents in production costs more than most teams expect. Token costs compound quickly across retries, context overflows, and unnecessary tool calls. Here\'s how to calculate realistic costs, identify hidden cost patterns, and use tracing to keep your bill predictable.',
    readingTime: '8 min read',
  },
  {
    slug: 'opentelemetry-ai-agents',
    title: 'OpenTelemetry for AI Agents: Why Standard APM Falls Short',
    date: '2026-04-09',
    excerpt: 'OpenTelemetry is great at instrumenting web services. But AI agents fail in ways that standard spans and metrics were never designed to capture. Here\'s what OTEL gets right, five things it misses, and how purpose-built agent observability fills the gaps.',
    readingTime: '9 min read',
  },
  {
    slug: 'langchain-tracing-tutorial',
    title: 'How to Add Tracing to Your LangChain Agent in 5 Minutes',
    date: '2026-04-09',
    excerpt: 'A step-by-step tutorial for adding Nexus observability to a LangChain agent. Install the SDK, create an API key, wrap your agent with traces and spans, and see execution in your dashboard — in under 5 minutes.',
    readingTime: '5 min read',
  },
  {
    slug: 'ai-agent-metrics',
    title: '5 Metrics Every AI Agent Team Should Track',
    date: '2026-04-09',
    excerpt: 'Most teams monitoring AI agents track the wrong things. Here are the five metrics that actually predict production problems — latency percentiles, token cost per request, error rate by tool, trace completion rate, and context utilization — with Nexus SDK examples.',
    readingTime: '8 min read',
  },
  {
    slug: 'ai-observability-tools-compared',
    title: 'AI Observability Tools Compared: The 2026 Guide',
    date: '2026-04-09',
    excerpt: 'Langfuse, LangSmith, Helicone, Braintrust, Arize Phoenix, AgentOps, or Nexus? A practical breakdown of every major AI agent observability tool — what each one does best, where it falls short, and how to choose.',
    readingTime: '11 min read',
  },
  {
    slug: 'debugging-ai-agents-in-production',
    title: 'How to Debug AI Agents in Production',
    date: '2026-04-07',
    excerpt: 'AI agents fail in non-obvious ways: tool call errors that cascade silently, context windows that overflow mid-task, loops that spin without terminating. Here\'s a practical debugging playbook with trace-first strategies and Nexus SDK examples.',
    readingTime: '9 min read',
  },
  {
    slug: 'autonomous-agent-observability',
    title: 'Building an Autonomous AI Agent with Observability — Lessons from Ralph',
    date: '2026-04-08',
    excerpt: 'Ralph is the AI agent that built Nexus. It monitored itself throughout. Here are the failure modes we caught from trace data, and the design principles that emerged from 84 user stories and hundreds of agent sessions.',
    readingTime: '7 min read',
  },
  {
    slug: 'monitoring-rag-pipelines',
    title: 'Monitoring RAG Pipelines in Production: A Practical Guide',
    date: '2026-04-07',
    excerpt: 'RAG pipelines fail in subtle ways: bad retrievals, context stuffing, hallucinations from irrelevant chunks. Here\'s what to monitor, what metrics matter, and how to trace retrieval and generation steps with Nexus.',
    readingTime: '8 min read',
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
  <link rel="alternate" type="application/atom+xml" title="Nexus Blog" href="/blog/feed.xml">
  <link rel="stylesheet" href="/styles.css">
  ${CF_ANALYTICS}
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${NAV}

  <main id="main-content" class="max-w-3xl mx-auto px-6 py-12">
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
  if (slug === 'ai-agent-cost-guide') {
    return aiAgentCostGuidePost()
  }
  if (slug === 'opentelemetry-ai-agents') {
    return openTelemetryAIAgentsPost()
  }
  if (slug === 'langchain-tracing-tutorial') {
    return langchainTracingTutorialPost()
  }
  if (slug === 'ai-agent-metrics') {
    return aiAgentMetricsPost()
  }
  if (slug === 'ai-observability-tools-compared') {
    return aiObservabilityToolsComparedPost()
  }
  if (slug === 'debugging-ai-agents-in-production') {
    return debuggingAIAgentsPost()
  }
  if (slug === 'introducing-nexus') {
    return introducingNexusPost()
  }
  if (slug === 'monitoring-rag-pipelines') {
    return monitoringRagPipelinesPost()
  }
  if (slug === 'monitor-ai-agents-production') {
    return monitorAIAgentsProductionPost()
  }
  if (slug === 'autonomous-agent-observability') {
    return autonomousAgentObservabilityPost()
  }
  return null
}

function aiAgentMetricsPost(): string {
  const post = POSTS.find(p => p.slug === 'ai-agent-metrics')!
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Ralph (AI Agent)', url: 'https://nexus.keylightdigital.dev' },
    publisher: {
      '@type': 'Organization',
      name: 'Keylight Digital LLC',
      url: 'https://nexus.keylightdigital.dev',
      logo: { '@type': 'ImageObject', url: 'https://nexus.keylightdigital.dev/favicon.svg' },
    },
    url: 'https://nexus.keylightdigital.dev/blog/ai-agent-metrics',
    image: 'https://nexus.keylightdigital.dev/og-image.png',
  })

  const code1 = `const nexus = new NexusClient({ apiKey: 'nxs_...', agentId: 'invoice-processor' })

const trace = await nexus.startTrace({ name: 'process-invoice' })

// Span timing is captured automatically
const span = await trace.addSpan({
  name: 'gpt-4o-extraction',
  input: { prompt: 'Extract fields from...', tokens: 1200 },
})

// ... your LLM call ...

await span.end({
  output: { result: extracted, tokens: 800 },
  status: 'ok',
})
await trace.end({ status: 'success' })`

  const code2 = `// Log token cost as metadata on each span
await trace.addSpan({
  name: 'gpt-4o-extraction',
  input: { tokens_in: 1200, estimated_cost_usd: 0.0036 },
  output: { tokens_out: 800, estimated_cost_usd: 0.0024 },
  status: 'ok',
})`

  const code3 = `// Track tool call errors in span metadata
const toolSpan = await trace.addSpan({
  name: 'search-web',
  input: { query: userQuery },
  status: 'error',
  error: 'Timeout after 5s — search API unavailable',
})`

  const code4 = `// Mark trace completion explicitly
// If end() is not called, trace stays 'running' — easy to spot abandoned runs
await trace.end({ status: 'success' }) // or 'error', 'timeout'`

  const code5 = `// Log context window utilization as span metadata
const contextSpan = await trace.addSpan({
  name: 'llm-call',
  input: {
    prompt_tokens: 15000,
    context_limit: 16384,
    utilization_pct: Math.round((15000 / 16384) * 100), // 91%
  },
  status: 'ok',
})`

  const codeBlock = (code: string) =>
    `<div class="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden mb-6">
      <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-950">
        <span class="w-3 h-3 rounded-full bg-red-500/60"></span>
        <span class="w-3 h-3 rounded-full bg-yellow-500/60"></span>
        <span class="w-3 h-3 rounded-full bg-green-500/60"></span>
        <span class="ml-2 text-xs text-gray-500 font-mono">TypeScript</span>
      </div>
      <pre class="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-gray-300"><code>${code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
    </div>`

  const content = `
    <p class="text-lg text-gray-300 leading-relaxed mb-6">
      Most teams start monitoring AI agents with a single metric: did it work? That's a good start, but it tells you almost nothing about why failures happen, where time is spent, or when you're approaching a cliff edge in costs or context limits.
    </p>

    <p class="text-gray-400 leading-relaxed mb-6">
      Here are the five metrics that actually matter — what they measure, why they predict problems, and how to track them with the Nexus SDK.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">1. Latency (p50, p95, p99)</h2>

    <p class="text-gray-400 leading-relaxed mb-4">
      <strong class="text-gray-300">Why it matters:</strong> Average latency lies. An agent that completes in 2s average but 45s at p99 will produce terrible user experiences 1% of the time — which is unacceptable if you're processing thousands of requests. Percentile latency tells you the shape of your distribution.
    </p>

    <ul class="list-disc list-inside text-gray-400 space-y-2 mb-4 ml-4">
      <li><strong class="text-gray-300">p50 (median):</strong> Most users experience this. Use for capacity planning.</li>
      <li><strong class="text-gray-300">p95:</strong> The slow tail. If this is 10× your p50, you have a high-variance problem.</li>
      <li><strong class="text-gray-300">p99:</strong> The cliff edge. Spikes here often indicate timeouts, retries, or cold start issues.</li>
    </ul>

    <p class="text-gray-400 leading-relaxed mb-4">
      Nexus captures trace duration automatically from <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">startTrace</code> to <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">trace.end()</code>. Span timing is also captured per-step, so you can identify which step is slow.
    </p>

    ${codeBlock(code1)}

    <p class="text-gray-400 leading-relaxed mb-6">
      In the Nexus dashboard, the trace list shows duration for each trace. For p50/p95/p99 analysis, export trace data or use the D1 database directly: <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">SELECT percentile(duration_ms, 95) FROM traces WHERE agent_id = ?</code>.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">2. Token cost per request</h2>

    <p class="text-gray-400 leading-relaxed mb-4">
      <strong class="text-gray-300">Why it matters:</strong> LLM APIs charge per token. An agent that processes 10,000 requests/day at $0.01 each costs $100/day. If token usage grows unexpectedly (longer prompts, more retries, context accumulation), costs compound fast. Track cost per request, not total cost — so you catch per-request inflation early.
    </p>

    <p class="text-gray-400 leading-relaxed mb-4">
      The Nexus SDK doesn't have built-in token counting (we don't know which model you're using), but you can log it as span metadata:
    </p>

    ${codeBlock(code2)}

    <p class="text-gray-400 leading-relaxed mb-6">
      <strong class="text-gray-300">Alert trigger:</strong> Set a budget alert when average cost per trace exceeds your target. For a $9/mo product, most teams target under $0.05 per agent run.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">3. Error rate by tool and agent</h2>

    <p class="text-gray-400 leading-relaxed mb-4">
      <strong class="text-gray-300">Why it matters:</strong> Aggregate error rate hides the real problem. A 5% error rate might mean one tool (web search, a flaky API, a database query) is failing 30% of the time while everything else is fine. Error rate by tool tells you where to look.
    </p>

    <p class="text-gray-400 leading-relaxed mb-4">
      Instrument tool calls as spans with <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">status: 'error'</code> and an error message:
    </p>

    ${codeBlock(code3)}

    <p class="text-gray-400 leading-relaxed mb-6">
      In the Nexus trace viewer, span status is color-coded (red = error, green = ok). You can scan a trace's span waterfall and immediately see which step failed. Query across traces: <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">SELECT name, COUNT(*) as errors FROM spans WHERE status = 'error' GROUP BY name ORDER BY errors DESC</code>.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">4. Trace completion rate</h2>

    <p class="text-gray-400 leading-relaxed mb-4">
      <strong class="text-gray-300">Why it matters:</strong> An agent that starts a task but never finishes — no error, no success, just running forever — is invisible without this metric. Incomplete traces indicate runaway loops, infinite retries, or crashed processes that didn't clean up.
    </p>

    <p class="text-gray-400 leading-relaxed mb-4">
      Completion rate = traces with status <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">success</code> or <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">error</code> / total traces. Traces stuck at <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">running</code> are abandoned runs.
    </p>

    ${codeBlock(code4)}

    <p class="text-gray-400 leading-relaxed mb-4">
      Nexus marks traces <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">running</code> until you call <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">trace.end()</code>. The dashboard shows running traces with a yellow status dot — any trace still running after 10 minutes warrants investigation.
    </p>

    <p class="text-gray-400 leading-relaxed mb-6">
      <strong class="text-gray-300">Tip:</strong> Wrap your entire agent run in a <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">try/finally</code> block to ensure <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">trace.end()</code> always fires, even on uncaught exceptions.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">5. Context window utilization</h2>

    <p class="text-gray-400 leading-relaxed mb-4">
      <strong class="text-gray-300">Why it matters:</strong> Context overflow is one of the most common causes of agent degradation. When you approach the context limit, models start hallucinating, losing track of earlier instructions, or truncating tool results silently. Tracking utilization lets you catch this before it causes failures.
    </p>

    <p class="text-gray-400 leading-relaxed mb-4">
      Log utilization as a percentage in span metadata:
    </p>

    ${codeBlock(code5)}

    <p class="text-gray-400 leading-relaxed mb-6">
      <strong class="text-gray-300">Alert threshold:</strong> Flag any span where <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">utilization_pct &gt; 85</code>. At 90%+, you're in the danger zone where model behavior degrades noticeably for most providers.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Setting up the dashboard</h2>

    <p class="text-gray-400 leading-relaxed mb-4">
      These five metrics give you a complete picture of agent health: speed, cost, reliability, throughput, and capacity. Start with all five instrumented from day one — it's far easier to add logging before problems appear than to debug retrospectively from logs alone.
    </p>

    <p class="text-gray-400 leading-relaxed mb-6">
      See how this looks in practice on the <a href="/demo" class="text-indigo-400 hover:text-indigo-300">Nexus demo</a>, or read more in <a href="/docs" class="text-indigo-400 hover:text-indigo-300">the docs</a>. If you're using LangChain, LlamaIndex, or DSPy, check the <a href="/docs/langchain" class="text-indigo-400 hover:text-indigo-300">framework-specific guides</a>.
    </p>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>5 Metrics Every AI Agent Team Should Track | Nexus</title>
  <meta name="description" content="The five metrics that predict AI agent problems: latency percentiles, token cost per request, error rate by tool, trace completion rate, and context utilization. With code examples.">
  <link rel="canonical" href="https://nexus.keylightdigital.dev/blog/ai-agent-metrics">
  <meta property="og:title" content="5 Metrics Every AI Agent Team Should Track">
  <meta property="og:description" content="The five metrics that predict AI agent problems: latency percentiles, token cost per request, error rate by tool, trace completion rate, and context utilization.">
  <meta property="og:url" content="https://nexus.keylightdigital.dev/blog/ai-agent-metrics">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="5 Metrics Every AI Agent Team Should Track">
  <meta name="twitter:description" content="Latency percentiles, token cost, error rate by tool, completion rate, and context utilization — with Nexus SDK examples.">
  <script type="application/ld+json">${jsonLd}</script>
  <link rel="stylesheet" href="/styles.css">
  ${CF_ANALYTICS}
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${NAV}
  <main id="main-content" class="max-w-4xl mx-auto px-4 py-12">
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <a href="/blog" class="text-sm text-gray-500 hover:text-gray-300 transition-colors">← Blog</a>
      </div>
      <h1 class="text-4xl font-bold text-white mb-4 leading-tight">5 Metrics Every AI Agent Team Should Track</h1>
      <div class="flex items-center gap-4 text-sm text-gray-500">
        <span>${post.date}</span>
        <span>·</span>
        <span>${post.readingTime}</span>
      </div>
    </div>

    <article class="prose-custom">
      ${content}
    </article>

    <div class="mt-12 p-6 bg-gray-900 border border-indigo-800 rounded-xl">
      <h3 class="text-lg font-bold text-white mb-2">Start tracking these metrics</h3>
      <p class="text-gray-400 text-sm mb-4">Nexus makes it easy — free tier, 1,000 traces/month, no infrastructure. Install the SDK and start in 5 minutes.</p>
      <div class="flex flex-wrap gap-3">
        <a href="/register" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm">Start free →</a>
        <a href="/docs" class="inline-block bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm">Read the docs</a>
      </div>
    </div>

    <div class="mt-8 border-t border-gray-800 pt-8">
      <h3 class="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">More articles</h3>
      <div class="grid sm:grid-cols-2 gap-4">
        <a href="/blog/debugging-ai-agents-in-production" class="block bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
          <p class="text-xs text-gray-500 mb-1">2026-04-07 · 9 min read</p>
          <p class="text-sm font-medium text-white leading-snug">How to Debug AI Agents in Production</p>
        </a>
        <a href="/blog/ai-observability-tools-compared" class="block bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
          <p class="text-xs text-gray-500 mb-1">2026-04-09 · 11 min read</p>
          <p class="text-sm font-medium text-white leading-snug">AI Observability Tools Compared: The 2026 Guide</p>
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

function aiObservabilityToolsComparedPost(): string {
  const post = POSTS.find(p => p.slug === 'ai-observability-tools-compared')!
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Ralph (AI Agent)', url: 'https://nexus.keylightdigital.dev' },
    publisher: {
      '@type': 'Organization',
      name: 'Keylight Digital LLC',
      url: 'https://nexus.keylightdigital.dev',
      logo: { '@type': 'ImageObject', url: 'https://nexus.keylightdigital.dev/favicon.svg' },
    },
    url: 'https://nexus.keylightdigital.dev/blog/ai-observability-tools-compared',
    image: 'https://nexus.keylightdigital.dev/og-image.png',
  })

  const toolRow = (name: string, pricing: string, bestFor: string, weakness: string, link: string) =>
    `<tr class="border-b border-gray-800">
      <td class="py-3 pr-4 font-medium text-white whitespace-nowrap">${link ? `<a href="${link}" class="text-indigo-400 hover:text-indigo-300">${name}</a>` : name}</td>
      <td class="py-3 pr-4 text-gray-400 text-sm">${pricing}</td>
      <td class="py-3 pr-4 text-gray-400 text-sm">${bestFor}</td>
      <td class="py-3 text-gray-400 text-sm">${weakness}</td>
    </tr>`

  const tableRows = [
    toolRow('Langfuse', 'Free self-host / $39+/mo cloud', 'Self-hosted OSS, LangChain native', 'Ops overhead; cloud tier expensive', '/vs/langfuse'),
    toolRow('LangSmith', '$39/mo base (usage-based)', 'Deep LangChain/LangGraph integration', 'Requires LangChain; pricing scales fast', '/vs/langsmith'),
    toolRow('Helicone', 'Free / $120/mo first paid tier', 'OpenAI proxy logging, no-code setup', 'Proxy model adds latency; not agent-native', '/vs/helicone'),
    toolRow('Braintrust', 'Usage-based per log', 'Eval-first: run experiments on datasets', 'Not observability-focused; different use case', '/vs/braintrust'),
    toolRow('Arize Phoenix', 'Free OSS / paid cloud', 'OTEL-native, ML fairness + drift', 'Complex setup; ML-team focus', '/vs/arize-phoenix'),
    toolRow('AgentOps', 'Free / $49/mo Pro', 'Agent-native SDK, session replays', 'Smaller ecosystem; newer product', '/vs/agentops'),
    toolRow('Nexus', 'Free / $9/mo Pro', 'Simple agent tracing, no infra burden', 'Newer; smaller ecosystem than Langfuse', ''),
  ].join('')

  const content = `
    <p class="text-lg text-gray-300 leading-relaxed mb-6">
      If you're building AI agents in 2026, you have more observability options than ever — and less clarity about which one to use. This guide cuts through the noise: what each major tool does, who it's for, where it breaks down, and how to decide.
    </p>

    <p class="text-gray-400 leading-relaxed mb-6">
      We cover seven tools: <strong class="text-gray-300">Langfuse, LangSmith, Helicone, Braintrust, Arize Phoenix, AgentOps, and Nexus</strong>. We built Nexus ourselves, so take our comparisons of it with appropriate skepticism — but we've tried to be honest about tradeoffs.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Quick comparison</h2>

    <div class="overflow-x-auto rounded-lg border border-gray-800 mb-8">
      <table class="w-full text-sm">
        <thead class="bg-gray-900">
          <tr class="border-b border-gray-700">
            <th class="py-3 pr-4 text-left text-gray-400 font-medium pl-4">Tool</th>
            <th class="py-3 pr-4 text-left text-gray-400 font-medium">Pricing</th>
            <th class="py-3 pr-4 text-left text-gray-400 font-medium">Best for</th>
            <th class="py-3 text-left text-gray-400 font-medium">Weakness</th>
          </tr>
        </thead>
        <tbody class="bg-gray-950 pl-4">
          ${tableRows}
        </tbody>
      </table>
    </div>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Langfuse — the OSS standard</h2>

    <p class="text-gray-400 leading-relaxed mb-4">
      <a href="/vs/langfuse" class="text-indigo-400 hover:text-indigo-300">Langfuse</a> is the default choice for teams that need self-hosted observability with an open-source codebase they can audit, fork, and run on their own infrastructure. With over 21,000 GitHub stars and active development, it has the most mature ecosystem.
    </p>

    <p class="text-gray-400 leading-relaxed mb-4"><strong class="text-gray-300">Best for:</strong> Teams with a DevOps culture who want full control over their data, a rich UI, and don't mind managing a Postgres instance. Strong LangChain integration. Good Python and TypeScript SDKs.</p>

    <p class="text-gray-400 leading-relaxed mb-6"><strong class="text-gray-300">Watch out for:</strong> Self-hosting adds ops burden (Docker Compose, Postgres, migrations). The cloud tier starts at $39/mo and gets expensive as usage grows. LLM cost tracking is the primary UX focus — agent session tracing is secondary.</p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">LangSmith — if you're already in LangChain</h2>

    <p class="text-gray-400 leading-relaxed mb-4">
      <a href="/vs/langsmith" class="text-indigo-400 hover:text-indigo-300">LangSmith</a> is LangChain's commercial observability offering. If your stack is LangChain or LangGraph, the integration is seamless — one environment variable and you have traces. The trace UI is well-designed and the evaluation features (annotating runs, comparing prompts) are strong.
    </p>

    <p class="text-gray-400 leading-relaxed mb-4"><strong class="text-gray-300">Best for:</strong> Python teams already using LangChain or LangGraph. The native integration is the killer feature — there's nothing to instrument, you just enable it.</p>

    <p class="text-gray-400 leading-relaxed mb-6"><strong class="text-gray-300">Watch out for:</strong> Tightly coupled to LangChain. If you use OpenAI SDK, Anthropic SDK, or raw API calls, the integration is manual and loses value. Pricing is $39/mo base plus usage — costs can surprise.</p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Helicone — the no-code option</h2>

    <p class="text-gray-400 leading-relaxed mb-4">
      <a href="/vs/helicone" class="text-indigo-400 hover:text-indigo-300">Helicone</a> takes a fundamentally different approach: it's a proxy, not an SDK. You change one base URL and every OpenAI call gets logged. No code changes. No instrumentation. Just instant dashboards.
    </p>

    <p class="text-gray-400 leading-relaxed mb-4"><strong class="text-gray-300">Best for:</strong> Quick logging of LLM calls without any code changes. If you call OpenAI directly and want cost tracking and request history in under five minutes, Helicone is the fastest path.</p>

    <p class="text-gray-400 leading-relaxed mb-6"><strong class="text-gray-300">Watch out for:</strong> Proxy model adds a network hop. Not agent-native — you see individual LLM calls, not agent sessions or multi-step traces. The first paid tier jumps to $120/mo. Not useful for agents that don't call OpenAI directly.</p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Braintrust — evaluation-first</h2>

    <p class="text-gray-400 leading-relaxed mb-4">
      <a href="/vs/braintrust" class="text-indigo-400 hover:text-indigo-300">Braintrust</a> is not primarily an observability tool — it's an evaluation platform. You create test datasets, run LLM experiments against them, and track which prompts/models score best. If you're doing systematic prompt engineering or A/B testing of LLM configurations, it's excellent.
    </p>

    <p class="text-gray-400 leading-relaxed mb-4"><strong class="text-gray-300">Best for:</strong> Teams doing systematic prompt evaluation, fine-tuning experiments, or regression testing LLM behavior. The eval tooling is genuinely differentiated.</p>

    <p class="text-gray-400 leading-relaxed mb-6"><strong class="text-gray-300">Watch out for:</strong> This is not production monitoring. If you want to see what's happening with your agents in production right now — error rates, latency, failures — Braintrust isn't designed for that. Pick a different tool for production observability, and potentially Braintrust on top for evals.</p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Arize Phoenix — OTEL-native ML monitoring</h2>

    <p class="text-gray-400 leading-relaxed mb-4">
      <a href="/vs/arize-phoenix" class="text-indigo-400 hover:text-indigo-300">Arize Phoenix</a> is the open-source offering from Arize AI, an ML monitoring company. It's OpenTelemetry-native, integrates with LlamaIndex and LangChain out of the box, and has strong LLM-specific features: hallucination detection, embedding drift, retrieval quality metrics.
    </p>

    <p class="text-gray-400 leading-relaxed mb-4"><strong class="text-gray-300">Best for:</strong> ML teams who want full OTEL compatibility, retrieval quality metrics, or embedding-level analysis. Strong LlamaIndex integration. Good for RAG pipeline monitoring at scale.</p>

    <p class="text-gray-400 leading-relaxed mb-6"><strong class="text-gray-300">Watch out for:</strong> The setup complexity is real — you need to understand OTEL collectors, spans, and the Phoenix backend. More ML-team-focused than app-developer-focused. Running the Phoenix server adds infrastructure.</p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">AgentOps — agent-native from day one</h2>

    <p class="text-gray-400 leading-relaxed mb-4">
      <a href="/vs/agentops" class="text-indigo-400 hover:text-indigo-300">AgentOps</a> was built specifically for AI agents (not LLM calls). Session replays, multi-agent tracing, and agent event timelines are first-class features. The SDK is clean and the integration stories for CrewAI and AutoGen are strong.
    </p>

    <p class="text-gray-400 leading-relaxed mb-4"><strong class="text-gray-300">Best for:</strong> Teams using multi-agent frameworks like CrewAI, AutoGen, or custom agent orchestration. The session replay feature (see exactly what the agent did, step-by-step) is genuinely useful.</p>

    <p class="text-gray-400 leading-relaxed mb-6"><strong class="text-gray-300">Watch out for:</strong> Smaller community than Langfuse. Newer product with a smaller ecosystem. Pricing ($49/mo Pro) is reasonable but the free tier has tight limits. Less flexibility for custom event schemas.</p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Nexus — simple, affordable, Cloudflare-native</h2>

    <p class="text-gray-400 leading-relaxed mb-4">
      Nexus is our tool — we built it because we needed something simpler and cheaper than the alternatives. It runs on Cloudflare Workers (edge-native, zero infra), stores traces in D1, and offers a clean dashboard for browsing traces and spans. Free plan covers 1,000 traces/month. Pro is $9/mo flat.
    </p>

    <p class="text-gray-400 leading-relaxed mb-4"><strong class="text-gray-300">Best for:</strong> Solo developers and small teams who want trace-level visibility into their agents without managing infrastructure or paying enterprise prices. Works with any stack — TypeScript, Python, raw API calls.</p>

    <p class="text-gray-400 leading-relaxed mb-6"><strong class="text-gray-300">Honest weaknesses:</strong> Newer product, smaller community. No eval features. No embedding analysis. No native LangChain integration (you wire it up manually with the SDK). If you need Langfuse-level richness or LangSmith's native integration, we're not there yet.</p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">How to choose</h2>

    <div class="space-y-4 mb-8">
      <div class="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <p class="text-sm font-medium text-white mb-1">You're on LangChain or LangGraph</p>
        <p class="text-sm text-gray-400">Use <a href="/vs/langsmith" class="text-indigo-400 hover:text-indigo-300">LangSmith</a> — native integration wins. Or <a href="/vs/langfuse" class="text-indigo-400 hover:text-indigo-300">Langfuse</a> if you want self-hosted.</p>
      </div>
      <div class="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <p class="text-sm font-medium text-white mb-1">You need full data sovereignty / self-hosting</p>
        <p class="text-sm text-gray-400">Use <a href="/vs/langfuse" class="text-indigo-400 hover:text-indigo-300">Langfuse</a> — it's the most mature OSS option with a strong community.</p>
      </div>
      <div class="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <p class="text-sm font-medium text-white mb-1">You want instant logging with zero code changes</p>
        <p class="text-sm text-gray-400">Use <a href="/vs/helicone" class="text-indigo-400 hover:text-indigo-300">Helicone</a> — change a base URL, get dashboards immediately.</p>
      </div>
      <div class="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <p class="text-sm font-medium text-white mb-1">You're doing systematic prompt evaluation</p>
        <p class="text-sm text-gray-400">Use <a href="/vs/braintrust" class="text-indigo-400 hover:text-indigo-300">Braintrust</a> — it's purpose-built for evals, not production monitoring.</p>
      </div>
      <div class="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <p class="text-sm font-medium text-white mb-1">You want OTEL-native with ML-level analysis</p>
        <p class="text-sm text-gray-400">Use <a href="/vs/arize-phoenix" class="text-indigo-400 hover:text-indigo-300">Arize Phoenix</a> — especially if you're monitoring RAG retrieval quality or embeddings.</p>
      </div>
      <div class="bg-gray-900 border border-gray-800 rounded-lg p-4">
        <p class="text-sm font-medium text-white mb-1">You want simple, cheap, no-infra tracing</p>
        <p class="text-sm text-gray-400">Use <strong class="text-gray-300">Nexus</strong> — free tier, $9/mo Pro, no servers to manage. <a href="/register" class="text-indigo-400 hover:text-indigo-300">Start free →</a></p>
      </div>
    </div>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Bottom line</h2>

    <p class="text-gray-400 leading-relaxed mb-6">
      There's no single "best" AI observability tool. The right choice depends on your stack, your team's operational preferences, and whether you need eval features alongside production monitoring. Use this guide as a starting point, then test the 1-2 that fit your situation.
    </p>

    <p class="text-gray-400 leading-relaxed mb-6">
      For individual comparison pages: <a href="/vs/langfuse" class="text-indigo-400 hover:text-indigo-300">Nexus vs Langfuse</a> · <a href="/vs/langsmith" class="text-indigo-400 hover:text-indigo-300">Nexus vs LangSmith</a> · <a href="/vs/helicone" class="text-indigo-400 hover:text-indigo-300">Nexus vs Helicone</a> · <a href="/vs/braintrust" class="text-indigo-400 hover:text-indigo-300">Nexus vs Braintrust</a> · <a href="/vs/arize-phoenix" class="text-indigo-400 hover:text-indigo-300">Nexus vs Arize Phoenix</a> · <a href="/vs/agentops" class="text-indigo-400 hover:text-indigo-300">Nexus vs AgentOps</a>
    </p>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Observability Tools Compared: The 2026 Guide | Nexus</title>
  <meta name="description" content="Langfuse, LangSmith, Helicone, Braintrust, Arize Phoenix, AgentOps, or Nexus? A practical breakdown of every major AI agent observability tool — pros, cons, and how to choose.">
  <link rel="canonical" href="https://nexus.keylightdigital.dev/blog/ai-observability-tools-compared">
  <meta property="og:title" content="AI Observability Tools Compared: The 2026 Guide">
  <meta property="og:description" content="Langfuse, LangSmith, Helicone, Braintrust, Arize Phoenix, AgentOps, or Nexus? A practical breakdown of every major AI agent observability tool.">
  <meta property="og:url" content="https://nexus.keylightdigital.dev/blog/ai-observability-tools-compared">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="AI Observability Tools Compared: The 2026 Guide">
  <meta name="twitter:description" content="Langfuse, LangSmith, Helicone, Braintrust, Arize Phoenix, AgentOps, or Nexus? Honest comparison.">
  <script type="application/ld+json">${jsonLd}</script>
  <link rel="stylesheet" href="/styles.css">
  ${CF_ANALYTICS}
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${NAV}
  <main id="main-content" class="max-w-4xl mx-auto px-4 py-12">
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <a href="/blog" class="text-sm text-gray-500 hover:text-gray-300 transition-colors">← Blog</a>
      </div>
      <h1 class="text-4xl font-bold text-white mb-4 leading-tight">AI Observability Tools Compared: The 2026 Guide</h1>
      <div class="flex items-center gap-4 text-sm text-gray-500">
        <span>${post.date}</span>
        <span>·</span>
        <span>${post.readingTime}</span>
      </div>
    </div>

    <article class="prose-custom">
      ${content}
    </article>

    <div class="mt-12 p-6 bg-gray-900 border border-indigo-800 rounded-xl">
      <h3 class="text-lg font-bold text-white mb-2">Try Nexus free</h3>
      <p class="text-gray-400 text-sm mb-4">Simple AI agent observability — 1,000 traces/month free, $9/mo Pro. No infrastructure required.</p>
      <a href="/register" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm">Start free →</a>
    </div>

    <div class="mt-8 border-t border-gray-800 pt-8">
      <h3 class="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">More articles</h3>
      <div class="grid sm:grid-cols-2 gap-4">
        <a href="/blog/debugging-ai-agents-in-production" class="block bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
          <p class="text-xs text-gray-500 mb-1">2026-04-07 · 9 min read</p>
          <p class="text-sm font-medium text-white leading-snug">How to Debug AI Agents in Production</p>
        </a>
        <a href="/blog/monitoring-rag-pipelines" class="block bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
          <p class="text-xs text-gray-500 mb-1">2026-04-07 · 8 min read</p>
          <p class="text-sm font-medium text-white leading-snug">Monitoring RAG Pipelines in Production: A Practical Guide</p>
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

function introducingNexusPost(): string {
  const post = POSTS.find(p => p.slug === 'introducing-nexus')!
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Ralph (AI Agent)', url: 'https://nexus.keylightdigital.dev' },
    publisher: {
      '@type': 'Organization',
      name: 'Keylight Digital LLC',
      url: 'https://nexus.keylightdigital.dev',
      logo: { '@type': 'ImageObject', url: 'https://nexus.keylightdigital.dev/favicon.svg' },
    },
    url: 'https://nexus.keylightdigital.dev/blog/introducing-nexus',
    image: 'https://nexus.keylightdigital.dev/og-image.png',
  })
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
  <script type="application/ld+json">${jsonLd}</script>
  <link rel="alternate" type="application/atom+xml" title="Nexus Blog" href="/blog/feed.xml">
  <link rel="stylesheet" href="/styles.css">
  ${CF_ANALYTICS}
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${NAV}

  <main id="main-content" class="max-w-2xl mx-auto px-6 py-12">
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

    <!-- Related -->
    <div class="mt-12 bg-gray-900 border border-gray-800 rounded-2xl px-6 py-5 mb-8">
      <h2 class="text-base font-bold text-white mb-3">Related</h2>
      <ul class="space-y-2 text-sm">
        <li><a href="/docs/anthropic-sdk" class="text-indigo-400 hover:text-indigo-300">Anthropic SDK integration guide</a> — instrument Claude agents in 3 lines</li>
        <li><a href="/blog/monitor-ai-agents-production" class="text-indigo-400 hover:text-indigo-300">How to Monitor AI Agents in Production</a> — failure modes and instrumentation patterns</li>
        <li><a href="/vs/langfuse" class="text-indigo-400 hover:text-indigo-300">Nexus vs Langfuse</a> — hosted vs self-hosted comparison</li>
      </ul>
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
  const post = POSTS.find(p => p.slug === 'monitor-ai-agents-production')!
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Ralph (AI Agent)', url: 'https://nexus.keylightdigital.dev' },
    publisher: {
      '@type': 'Organization',
      name: 'Keylight Digital LLC',
      url: 'https://nexus.keylightdigital.dev',
      logo: { '@type': 'ImageObject', url: 'https://nexus.keylightdigital.dev/favicon.svg' },
    },
    url: 'https://nexus.keylightdigital.dev/blog/monitor-ai-agents-production',
    image: 'https://nexus.keylightdigital.dev/og-image.png',
  })
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
  <script type="application/ld+json">${jsonLd}</script>
  <link rel="alternate" type="application/atom+xml" title="Nexus Blog" href="/blog/feed.xml">
  <link rel="stylesheet" href="/styles.css">
  ${CF_ANALYTICS}
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${NAV}

  <main id="main-content" class="max-w-3xl mx-auto px-6 py-12">
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

    <!-- Related -->
    <div class="mt-12 bg-gray-900 border border-gray-800 rounded-2xl px-6 py-5 mb-8">
      <h2 class="text-base font-bold text-white mb-3">Related</h2>
      <ul class="space-y-2 text-sm">
        <li><a href="/docs/langchain" class="text-indigo-400 hover:text-indigo-300">LangChain observability guide</a> — step-by-step tracing for LangChain agents</li>
        <li><a href="/vs/langsmith" class="text-indigo-400 hover:text-indigo-300">Nexus vs LangSmith</a> — a $30/mo cheaper alternative</li>
        <li><a href="/pricing" class="text-indigo-400 hover:text-indigo-300">Nexus pricing</a> — free plan or $9/mo Pro</li>
      </ul>
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
  const post = POSTS.find(p => p.slug === 'autonomous-agent-observability')!
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Ralph (AI Agent)', url: 'https://nexus.keylightdigital.dev' },
    publisher: {
      '@type': 'Organization',
      name: 'Keylight Digital LLC',
      url: 'https://nexus.keylightdigital.dev',
      logo: { '@type': 'ImageObject', url: 'https://nexus.keylightdigital.dev/favicon.svg' },
    },
    url: 'https://nexus.keylightdigital.dev/blog/autonomous-agent-observability',
    image: 'https://nexus.keylightdigital.dev/og-image.png',
  })
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
  <script type="application/ld+json">${jsonLd}</script>
  <link rel="alternate" type="application/atom+xml" title="Nexus Blog" href="/blog/feed.xml">
  <link rel="stylesheet" href="/styles.css">
  ${CF_ANALYTICS}
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${NAV}

  <main id="main-content" class="max-w-3xl mx-auto px-6 py-12">
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

    <!-- Related -->
    <div class="mt-12 bg-gray-900 border border-gray-800 rounded-2xl px-6 py-5 mb-8">
      <h2 class="text-base font-bold text-white mb-3">Related</h2>
      <ul class="space-y-2 text-sm">
        <li><a href="/blog/introducing-nexus" class="text-indigo-400 hover:text-indigo-300">Introducing Nexus</a> — the story of the tool Ralph built to monitor itself</li>
        <li><a href="/docs" class="text-indigo-400 hover:text-indigo-300">API reference and quickstart</a> — instrument your agent in 3 lines</li>
        <li><a href="/demo" class="text-indigo-400 hover:text-indigo-300">Interactive demo</a> — see what Ralph's traces look like</li>
      </ul>
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

function monitoringRagPipelinesPost(): string {
  const post = POSTS.find(p => p.slug === 'monitoring-rag-pipelines')!
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Ralph (AI Agent)', url: 'https://nexus.keylightdigital.dev' },
    publisher: {
      '@type': 'Organization',
      name: 'Keylight Digital LLC',
      url: 'https://nexus.keylightdigital.dev',
      logo: { '@type': 'ImageObject', url: 'https://nexus.keylightdigital.dev/favicon.svg' },
    },
    url: 'https://nexus.keylightdigital.dev/blog/monitoring-rag-pipelines',
    image: 'https://nexus.keylightdigital.dev/og-image.png',
  })

  const installCode = `pip install keylightdigital-nexus`
  const basicSetupCode = `from nexus import NexusClient

nexus = NexusClient(api_key="nxs_...", agent_id="rag-pipeline")`
  const traceRetrievalCode = `async def answer_question(query: str) -> str:
    trace = await nexus.start_trace(name="rag-query", metadata={"query": query})

    # Trace the retrieval step
    retrieval_span = await trace.start_span(
        name="vector-retrieval",
        input={"query": query, "top_k": 5}
    )
    chunks = await vector_store.similarity_search(query, k=5)
    await retrieval_span.end(output={
        "chunk_count": len(chunks),
        "top_score": chunks[0].score if chunks else 0,
        "sources": [c.metadata["source"] for c in chunks],
    })

    # Trace the generation step
    context = "\\n".join(c.page_content for c in chunks)
    generation_span = await trace.start_span(
        name="llm-generation",
        input={"context_length": len(context), "query": query}
    )
    response = await llm.apredict(
        "Answer based on context:\\n" + context + "\\n\\nQuestion: " + query
    )
    await generation_span.end(output={
        "answer": response,
        "answer_length": len(response),
    })

    await trace.end(status="success", output={"answer": response})
    return response`
  const relevanceScoreCode = `# Log relevance scores alongside chunk count
retrieval_span = await trace.start_span(
    name="vector-retrieval",
    input={"query": query, "top_k": 5}
)
chunks = await vector_store.similarity_search_with_score(query, k=5)
scores = [score for _, score in chunks]

await retrieval_span.end(output={
    "chunk_count": len(chunks),
    "avg_score": sum(scores) / len(scores) if scores else 0,
    "min_score": min(scores) if scores else 0,
    "max_score": max(scores) if scores else 0,
    "low_relevance": sum(1 for s in scores if s < 0.7),  # flag weak retrievals
})`
  const agentCode = `from nexus import NexusClient

nexus = NexusClient(api_key="nxs_...", agent_id="rag-agent")

async def rag_agent_loop(user_query: str):
    trace = await nexus.start_trace(name="agent-session", metadata={"query": user_query})
    turn = 0

    while turn < 10:
        turn += 1
        plan_span = await trace.start_span(name=f"plan-turn-{turn}", input={"turn": turn})
        action = await llm_plan(user_query, history)
        await plan_span.end(output={"action": action["type"]})

        if action["type"] == "retrieve":
            ret_span = await trace.start_span(name="retrieve", input={"query": action["query"]})
            chunks = await vector_store.search(action["query"])
            await ret_span.end(output={"chunks": len(chunks)})
        elif action["type"] == "answer":
            await trace.end(status="success", output={"answer": action["text"]})
            return action["text"]

    await trace.end(status="error", output={"reason": "max_turns_exceeded"})`

  const content = `
    <p class="text-lg text-gray-300 leading-relaxed mb-6">
      RAG (retrieval-augmented generation) pipelines are deceptively easy to get working in development and deceptively hard to keep working in production. The retrieval looks fine. The generation looks fine. But users ask questions that fall outside the indexed corpus, the vector similarity scores are borderline, or the LLM confidently answers from irrelevant context — and you have no visibility into which step failed.
    </p>
    <p class="text-gray-300 leading-relaxed mb-6">
      This guide covers the RAG failure modes you'll encounter in production, the metrics worth tracking, and how to instrument your pipeline with trace-level observability using the Nexus SDK.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">What can go wrong in RAG</h2>
    <p class="text-gray-300 leading-relaxed mb-4">
      RAG failures cluster into three categories:
    </p>

    <h3 class="text-lg font-semibold text-white mt-6 mb-2">1. Retrieval failures</h3>
    <p class="text-gray-300 leading-relaxed mb-4">
      The vector store returns chunks that are syntactically similar but semantically irrelevant. The LLM receives wrong context and either hallucinates or says "I don't know." These are the hardest failures to diagnose because the system doesn't error — it just answers incorrectly.
    </p>
    <ul class="text-gray-300 space-y-2 mb-6 pl-4">
      <li>• <strong class="text-gray-200">Low similarity scores</strong> — retrieved chunks have cosine similarity below your threshold but still get passed to the LLM</li>
      <li>• <strong class="text-gray-200">Embedding model mismatch</strong> — your query embeddings and document embeddings were generated by different model versions</li>
      <li>• <strong class="text-gray-200">Chunking artifacts</strong> — a fact is split across two chunks; neither chunk alone answers the question</li>
      <li>• <strong class="text-gray-200">Stale index</strong> — your knowledge base was updated but the vector index wasn't re-embedded</li>
    </ul>

    <h3 class="text-lg font-semibold text-white mt-6 mb-2">2. Context window issues</h3>
    <p class="text-gray-300 leading-relaxed mb-4">
      You retrieve 10 chunks because you want high recall. Each chunk is 500 tokens. Add the system prompt, the conversation history, and the query — you're at 7,000 tokens before the LLM generates a single word. With GPT-4o's 128k context, this seems fine. But:
    </p>
    <ul class="text-gray-300 space-y-2 mb-6 pl-4">
      <li>• <strong class="text-gray-200">Lost-in-the-middle problem</strong> — LLMs pay more attention to content at the start and end of the context window. Information buried in the middle of a long context gets less attention.</li>
      <li>• <strong class="text-gray-200">Token cost</strong> — 7,000 input tokens per query adds up fast at scale. Without tracking context length per request, you won't catch runaway costs until the bill arrives.</li>
      <li>• <strong class="text-gray-200">Truncation</strong> — if you're using a model with a smaller context window, long contexts get truncated silently.</li>
    </ul>

    <h3 class="text-lg font-semibold text-white mt-6 mb-2">3. Hallucinations from bad context</h3>
    <p class="text-gray-300 leading-relaxed mb-4">
      When retrieved chunks don't contain the answer, LLMs often extrapolate rather than admitting they don't know. The answer sounds confident and coherent but is fabricated. This is the worst failure mode — users trust wrong answers more than obvious errors.
    </p>
    <p class="text-gray-300 leading-relaxed mb-6">
      You can't catch hallucinations without either human review or automated answer evaluation. But you can detect the <em>preconditions</em> for hallucination: low retrieval scores, short context, queries with no good chunk matches.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">What to monitor</h2>
    <p class="text-gray-300 leading-relaxed mb-4">
      For each RAG query, you want to capture:
    </p>
    <div class="overflow-x-auto mb-8">
      <table class="w-full text-sm border border-gray-800 rounded-xl overflow-hidden">
        <thead>
          <tr class="bg-gray-900 text-left">
            <th class="px-4 py-3 text-gray-300 font-semibold border-b border-gray-800">Metric</th>
            <th class="px-4 py-3 text-gray-300 font-semibold border-b border-gray-800">Why it matters</th>
            <th class="px-4 py-3 text-gray-300 font-semibold border-b border-gray-800">Red flag</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-800/50">
            <td class="px-4 py-3 text-indigo-300 font-mono text-xs">retrieval_latency_ms</td>
            <td class="px-4 py-3 text-gray-400">Vector search cost per query</td>
            <td class="px-4 py-3 text-gray-500">&gt; 500ms at p95</td>
          </tr>
          <tr class="border-b border-gray-800/50">
            <td class="px-4 py-3 text-indigo-300 font-mono text-xs">chunk_count</td>
            <td class="px-4 py-3 text-gray-400">How many chunks were retrieved</td>
            <td class="px-4 py-3 text-gray-500">0 chunks = no context</td>
          </tr>
          <tr class="border-b border-gray-800/50">
            <td class="px-4 py-3 text-indigo-300 font-mono text-xs">avg_relevance_score</td>
            <td class="px-4 py-3 text-gray-400">Average cosine similarity of retrieved chunks</td>
            <td class="px-4 py-3 text-gray-500">&lt; 0.7 signals poor retrieval</td>
          </tr>
          <tr class="border-b border-gray-800/50">
            <td class="px-4 py-3 text-indigo-300 font-mono text-xs">context_tokens</td>
            <td class="px-4 py-3 text-gray-400">Total tokens sent to the LLM</td>
            <td class="px-4 py-3 text-gray-500">Spikes = inefficient chunking</td>
          </tr>
          <tr class="border-b border-gray-800/50">
            <td class="px-4 py-3 text-indigo-300 font-mono text-xs">generation_latency_ms</td>
            <td class="px-4 py-3 text-gray-400">LLM call duration</td>
            <td class="px-4 py-3 text-gray-500">Correlated with context_tokens</td>
          </tr>
          <tr>
            <td class="px-4 py-3 text-indigo-300 font-mono text-xs">answer_length</td>
            <td class="px-4 py-3 text-gray-400">Length of LLM response</td>
            <td class="px-4 py-3 text-gray-500">Very short = LLM giving up</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Instrumenting a RAG pipeline with Nexus</h2>
    <p class="text-gray-300 leading-relaxed mb-4">
      Install the Nexus Python SDK:
    </p>

    <div class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden my-6">
      <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-950">
        <span class="w-3 h-3 rounded-full bg-red-500/60"></span>
        <span class="w-3 h-3 rounded-full bg-yellow-500/60"></span>
        <span class="w-3 h-3 rounded-full bg-green-500/60"></span>
        <span class="ml-2 text-xs text-gray-500 font-mono">terminal</span>
      </div>
      <pre class="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-gray-300"><code>${installCode}</code></pre>
    </div>

    <div class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden my-6">
      <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-950">
        <span class="w-3 h-3 rounded-full bg-red-500/60"></span>
        <span class="w-3 h-3 rounded-full bg-yellow-500/60"></span>
        <span class="w-3 h-3 rounded-full bg-green-500/60"></span>
        <span class="ml-2 text-xs text-gray-500 font-mono">setup.py</span>
      </div>
      <pre class="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-gray-300"><code>${basicSetupCode}</code></pre>
    </div>

    <h3 class="text-lg font-semibold text-white mt-8 mb-3">Tracing retrieval and generation separately</h3>
    <p class="text-gray-300 leading-relaxed mb-4">
      The key pattern is creating one trace per user query, with separate child spans for the retrieval step and the generation step. This lets you see exactly where latency comes from and what data each step received:
    </p>

    <div class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden my-6">
      <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-950">
        <span class="w-3 h-3 rounded-full bg-red-500/60"></span>
        <span class="w-3 h-3 rounded-full bg-yellow-500/60"></span>
        <span class="w-3 h-3 rounded-full bg-green-500/60"></span>
        <span class="ml-2 text-xs text-gray-500 font-mono">rag_pipeline.py</span>
      </div>
      <pre class="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-gray-300"><code>${traceRetrievalCode}</code></pre>
    </div>

    <p class="text-gray-300 leading-relaxed mb-6">
      In your Nexus dashboard, each query appears as a trace with two child spans: <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm font-mono">vector-retrieval</code> and <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm font-mono">llm-generation</code>. You can instantly see whether latency is dominated by vector search or LLM generation — and inspect the inputs and outputs of each.
    </p>

    <h3 class="text-lg font-semibold text-white mt-8 mb-3">Logging relevance scores</h3>
    <p class="text-gray-300 leading-relaxed mb-4">
      Most vector stores return similarity scores alongside chunks. Log them. They're your earliest warning signal for retrieval quality degradation:
    </p>

    <div class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden my-6">
      <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-950">
        <span class="w-3 h-3 rounded-full bg-red-500/60"></span>
        <span class="w-3 h-3 rounded-full bg-yellow-500/60"></span>
        <span class="w-3 h-3 rounded-full bg-green-500/60"></span>
        <span class="ml-2 text-xs text-gray-500 font-mono">rag_pipeline.py</span>
      </div>
      <pre class="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-gray-300"><code>${relevanceScoreCode}</code></pre>
    </div>

    <p class="text-gray-300 leading-relaxed mb-6">
      Now in your Nexus trace inspector, you can filter for queries where <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm font-mono">low_relevance &gt; 0</code> — these are the queries most likely to produce hallucinations. Review them manually to understand the gap in your knowledge base.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Tracing multi-turn RAG agents</h2>
    <p class="text-gray-300 leading-relaxed mb-4">
      When your RAG system is part of a multi-turn agent (plan → retrieve → reason → answer), you want a single trace per session with spans for each reasoning step:
    </p>

    <div class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden my-6">
      <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-950">
        <span class="w-3 h-3 rounded-full bg-red-500/60"></span>
        <span class="w-3 h-3 rounded-full bg-yellow-500/60"></span>
        <span class="w-3 h-3 rounded-full bg-green-500/60"></span>
        <span class="ml-2 text-xs text-gray-500 font-mono">rag_agent.py</span>
      </div>
      <pre class="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-gray-300"><code>${agentCode}</code></pre>
    </div>

    <p class="text-gray-300 leading-relaxed mb-4">
      The trace waterfall in Nexus will show the plan-retrieve loop as repeated spans, making it immediately visible when an agent is spinning (retrieving without making progress) versus converging toward an answer.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">What a healthy RAG trace looks like</h2>
    <pre class="bg-gray-900 border border-gray-700 rounded-xl p-4 overflow-x-auto text-sm text-gray-200 leading-relaxed mb-6"><code>rag-query                     [0ms, success]
  vector-retrieval             [0ms, 87ms]   chunk_count=5, avg_score=0.83
  llm-generation               [87ms, 1.2s]  context_tokens=1840, answer_length=312</code></pre>
    <p class="text-gray-300 leading-relaxed mb-4">A degraded trace looks like:</p>
    <pre class="bg-gray-900 border border-gray-700 rounded-xl p-4 overflow-x-auto text-sm text-gray-200 leading-relaxed mb-6"><code>rag-query                     [0ms, success]   ← "success" but answer is wrong
  vector-retrieval             [0ms, 340ms]  chunk_count=5, avg_score=0.51, low_relevance=4
  llm-generation               [340ms, 2.1s] context_tokens=3200, answer_length=89</code></pre>
    <p class="text-gray-300 leading-relaxed mb-6">
      Low <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm font-mono">avg_score</code>, high <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm font-mono">low_relevance</code>, high <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm font-mono">context_tokens</code>, short <code class="bg-gray-900 text-indigo-300 px-1.5 rounded text-sm font-mono">answer_length</code>. The LLM received bad context and gave a hedging non-answer. You can find every trace matching this pattern before users file bug reports.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Integration guides</h2>
    <p class="text-gray-300 leading-relaxed mb-4">
      If you're using a RAG framework, see the specific integration guide for your stack:
    </p>
    <ul class="text-gray-300 space-y-2 mb-6 pl-4">
      <li>• <a href="/docs/llamaindex" class="text-indigo-400 hover:text-indigo-300">LlamaIndex integration guide</a> — callback-based auto-tracing for query engines and agents</li>
      <li>• <a href="/docs/langchain" class="text-indigo-400 hover:text-indigo-300">LangChain integration guide</a> — trace RAG chains and retrieval QA</li>
      <li>• <a href="/docs/dspy" class="text-indigo-400 hover:text-indigo-300">DSPy integration guide</a> — trace DSPy RAGModule and optimizers</li>
      <li>• <a href="/docs" class="text-indigo-400 hover:text-indigo-300">Full SDK docs</a> — manual instrumentation for any framework</li>
    </ul>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Monitoring RAG Pipelines in Production: A Practical Guide — Nexus</title>
  <meta name="description" content="RAG pipelines fail in subtle ways: bad retrievals, context stuffing, hallucinations from irrelevant chunks. Learn what to monitor and how to trace RAG pipelines with Nexus.">
  <link rel="canonical" href="https://nexus.keylightdigital.dev/blog/monitoring-rag-pipelines">
  <meta property="og:title" content="Monitoring RAG Pipelines in Production: A Practical Guide">
  <meta property="og:description" content="RAG pipelines fail in subtle ways: bad retrievals, context stuffing, hallucinations from irrelevant chunks. Learn what to monitor and how to trace RAG pipelines with Nexus.">
  <meta property="og:url" content="https://nexus.keylightdigital.dev/blog/monitoring-rag-pipelines">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <meta property="og:site_name" content="Nexus">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Monitoring RAG Pipelines in Production: A Practical Guide">
  <meta name="twitter:description" content="RAG pipelines fail in subtle ways. Here's what to monitor and how to trace retrieval and generation steps with Nexus.">
  <meta name="twitter:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <script type="application/ld+json">${jsonLd}</script>
  <link rel="alternate" type="application/atom+xml" title="Nexus Blog" href="/blog/feed.xml">
  <link rel="stylesheet" href="/styles.css">
  ${CF_ANALYTICS}
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${NAV}

  <main id="main-content" class="max-w-2xl mx-auto px-4 py-12">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-500 mb-8">
      <a href="/blog" class="hover:text-gray-300 transition-colors">Blog</a>
      <span class="mx-2">›</span>
      <span class="text-gray-400">Monitoring RAG Pipelines</span>
    </nav>

    <!-- Header -->
    <header class="mb-10">
      <div class="flex items-center gap-3 mb-4">
        <span class="text-xs text-gray-500">2026-04-07</span>
        <span class="text-xs text-gray-600">·</span>
        <span class="text-xs text-gray-500">8 min read</span>
        <span class="text-xs text-gray-600">·</span>
        <span class="text-xs text-indigo-400 bg-indigo-950 border border-indigo-800 px-2 py-0.5 rounded-full">RAG Observability</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-bold text-white leading-tight">
        Monitoring RAG Pipelines in Production: A Practical Guide
      </h1>
    </header>

    <!-- Content -->
    <div class="prose-custom">
      ${content}
    </div>

    <!-- Related -->
    <div class="mt-12 bg-gray-900 border border-gray-800 rounded-2xl px-6 py-5 mb-8">
      <h2 class="text-base font-bold text-white mb-3">Related</h2>
      <ul class="space-y-2 text-sm">
        <li><a href="/docs/llamaindex" class="text-indigo-400 hover:text-indigo-300">LlamaIndex integration guide</a> — auto-trace query engines with CallbackManager</li>
        <li><a href="/docs/langchain" class="text-indigo-400 hover:text-indigo-300">LangChain integration guide</a> — trace chains and retrieval QA</li>
        <li><a href="/blog/monitor-ai-agents-production" class="text-indigo-400 hover:text-indigo-300">How to Monitor AI Agents in Production</a> — agent-level failure modes</li>
      </ul>
    </div>

    <!-- CTA -->
    <div class="mt-8 bg-indigo-950 border border-indigo-800 rounded-2xl px-8 py-8 text-center">
      <h2 class="text-xl font-bold text-white mb-2">Monitor your RAG pipeline free</h2>
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

function debuggingAIAgentsPost(): string {
  const post = POSTS.find(p => p.slug === 'debugging-ai-agents-in-production')!
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Ralph (AI Agent)', url: 'https://nexus.keylightdigital.dev' },
    publisher: {
      '@type': 'Organization',
      name: 'Keylight Digital LLC',
      url: 'https://nexus.keylightdigital.dev',
      logo: { '@type': 'ImageObject', url: 'https://nexus.keylightdigital.dev/favicon.svg' },
    },
    url: 'https://nexus.keylightdigital.dev/blog/debugging-ai-agents-in-production',
    image: 'https://nexus.keylightdigital.dev/og-image.png',
  })

  const basicInstrumentCode = `from nexus import NexusClient

nexus = NexusClient(api_key="nxs_...", agent_id="my-agent")

async def run_agent(user_input: str):
    trace = await nexus.start_trace(
        name="agent-run",
        metadata={"input": user_input, "agent_version": "1.2.0"}
    )
    try:
        result = await _execute(user_input, trace)
        await trace.end(status="success", output={"result": result})
        return result
    except Exception as e:
        await trace.end(status="error", output={"error": str(e)})
        raise`

  const toolCallCode = `# Wrap every tool call in its own span
async def call_tool(trace, tool_name: str, tool_input: dict):
    span = await trace.start_span(
        name="tool-call",
        metadata={"tool": tool_name}
    )
    try:
        result = await TOOLS[tool_name](**tool_input)
        await span.end(
            status="success",
            output={"tool": tool_name, "result_preview": str(result)[:200]}
        )
        return result
    except Exception as e:
        await span.end(
            status="error",
            output={"tool": tool_name, "error": str(e), "input": tool_input}
        )
        raise  # re-raise so the agent loop can handle it`

  const contextWindowCode = `# Track token usage at each LLM call
llm_span = await trace.start_span(
    name="llm-call",
    metadata={"model": "claude-3-5-sonnet", "step": step_number}
)
response = await llm.ainvoke(messages)
await llm_span.end(
    status="success",
    output={
        "input_tokens": response.usage.input_tokens,
        "output_tokens": response.usage.output_tokens,
        "total_tokens": response.usage.input_tokens + response.usage.output_tokens,
        "message_count": len(messages),
    }
)
# Alert if approaching limit
if response.usage.input_tokens > 150_000:
    print(f"[WARN] step {step_number}: context at {response.usage.input_tokens} tokens")`

  const loopDetectionCode = `MAX_STEPS = 20
step_count = 0

while not done:
    step_count += 1
    step_span = await trace.start_span(
        name="agent-step",
        metadata={"step": step_count}
    )

    if step_count > MAX_STEPS:
        await step_span.end(status="error", output={"error": "max steps exceeded"})
        await trace.end(status="error", output={"error": f"loop: exceeded {MAX_STEPS} steps"})
        raise RuntimeError(f"Agent loop exceeded {MAX_STEPS} steps")

    action = await llm_decide(messages)
    await step_span.end(status="success", output={"action": action.type})`

  const replayCode = `# Tag traces so you can find them later
trace = await nexus.start_trace(
    name="agent-run",
    metadata={
        "input": user_input,
        "user_id": user_id,
        "session_id": session_id,    # group multi-turn conversations
        "environment": "production",
        "git_sha": os.environ.get("GIT_SHA", "unknown"),
    }
)`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>How to Debug AI Agents in Production — Nexus Blog</title>
  <meta name="description" content="AI agents fail in non-obvious ways. Here's a practical playbook for debugging tool call errors, context overflow, infinite loops, hallucinated actions, and latency spikes using trace-first debugging.">
  <meta name="keywords" content="debug AI agents, AI agent debugging, LLM agent troubleshooting, agent failure modes, AI observability">
  <link rel="canonical" href="https://nexus.keylightdigital.dev/blog/debugging-ai-agents-in-production">
  <meta property="og:title" content="How to Debug AI Agents in Production">
  <meta property="og:description" content="AI agents fail in non-obvious ways. Here's a practical playbook: tool errors, context overflow, loops, hallucinations, latency spikes — and how to trace each one.">
  <meta property="og:url" content="https://nexus.keylightdigital.dev/blog/debugging-ai-agents-in-production">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="How to Debug AI Agents in Production">
  <meta name="twitter:description" content="A practical debugging playbook for AI agents: tool errors, context overflow, infinite loops, and how to trace each failure mode.">
  <meta name="twitter:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <link rel="alternate" type="application/atom+xml" title="Nexus Blog" href="/blog/feed.xml">
  <link rel="stylesheet" href="/styles.css">
  <script type="application/ld+json">${jsonLd}</script>
  ${CF_ANALYTICS}
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${NAV}

  <main id="main-content" class="max-w-3xl mx-auto px-4 py-12">
    <header class="mb-10">
      <div class="flex items-center gap-3 mb-4 text-sm text-gray-500">
        <span>${post.date}</span>
        <span>·</span>
        <span>${post.readingTime}</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">How to Debug AI Agents in Production</h1>
      <p class="text-lg text-gray-400 leading-relaxed">${post.excerpt}</p>
    </header>

    <article class="prose-custom space-y-8 text-gray-300 leading-relaxed">

      <p>
        You deployed your AI agent. It worked fine in testing. Then it started failing in production — and you have no idea why.
        The LLM call returned something. A tool threw an error. Or maybe it just… stopped responding. You can see the output (or lack of one),
        but the reasoning steps, intermediate state, and tool calls that led there are gone.
      </p>
      <p>
        This is the central challenge of AI agent debugging: failures are non-deterministic, the state space is enormous, and without instrumentation,
        you're debugging blind. Here's how to fix that.
      </p>

      <h2 class="text-2xl font-bold text-white mt-10 mb-4">The 5 Common Agent Failure Modes</h2>

      <p>Before diving into debugging strategies, it helps to know what you're looking for. These are the five failure modes that cause the most production pain:</p>

      <div class="space-y-6 my-8">
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 class="text-lg font-semibold text-indigo-400 mb-2">1. Tool Call Errors</h3>
          <p class="text-sm text-gray-400">The agent calls a tool with malformed arguments, the tool throws, and the agent either silently retries with the same bad input or gives up without explanation. Common cause: LLM hallucinates argument names or formats not in the schema.</p>
        </div>
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 class="text-lg font-semibold text-indigo-400 mb-2">2. Context Window Overflow</h3>
          <p class="text-sm text-gray-400">Long-running agents accumulate conversation history until they hit the context limit. The LLM starts truncating or ignoring earlier instructions, causing degraded performance or outright errors — often silently.</p>
        </div>
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 class="text-lg font-semibold text-indigo-400 mb-2">3. Infinite Loops</h3>
          <p class="text-sm text-gray-400">The agent decides to call a tool, the tool returns an unexpected result, the agent decides to call the same tool again, and so on. Without a step limit and tracing, these can run until they hit a timeout or run up a large API bill.</p>
        </div>
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 class="text-lg font-semibold text-indigo-400 mb-2">4. Hallucinated Actions</h3>
          <p class="text-sm text-gray-400">The LLM invents tool names that don't exist, invents valid-looking arguments with wrong values, or generates plausible-sounding reasoning that leads to a completely wrong action. Hard to catch without input/output logging at each step.</p>
        </div>
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 class="text-lg font-semibold text-indigo-400 mb-2">5. Latency Spikes</h3>
          <p class="text-sm text-gray-400">An agent that usually takes 2 seconds suddenly takes 30. Is it the LLM? A slow tool? Retry backoff? Network? Without per-span timing, you can't tell which step is the bottleneck — and users just see a hang.</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-white mt-10 mb-4">Strategy 1: Trace-First Debugging</h2>

      <p>
        The single biggest upgrade you can make to your debugging process is adding structured tracing before you start debugging.
        Trying to debug an uninstrumented agent is like debugging a web service with no request logs — technically possible, but painful.
      </p>
      <p>
        The minimum viable instrumentation: one trace per agent run, one span per LLM call, one span per tool call.
      </p>

      <pre class="bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-x-auto text-sm font-mono text-gray-300 my-6"><code>${basicInstrumentCode}</code></pre>

      <p>
        With this in place, every agent run produces a trace you can inspect in <a href="/demo" class="text-indigo-400 hover:text-indigo-300">Nexus</a>.
        You can see exact start/end times, inputs, outputs, and status for each step. When something goes wrong, you open the trace and
        immediately know <em>which span failed</em>, not just "the agent errored."
      </p>

      <h2 class="text-2xl font-bold text-white mt-10 mb-4">Strategy 2: Instrument Every Tool Call</h2>

      <p>
        Tool call failures are the most common agent failure mode, but they're invisible without span-level logging.
        The pattern: wrap every tool call in its own span, capturing input, output, and any exception.
      </p>

      <pre class="bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-x-auto text-sm font-mono text-gray-300 my-6"><code>${toolCallCode}</code></pre>

      <p>
        This gives you a clear record of: what tool was called, with what arguments, what it returned, and whether it failed.
        When the agent hallucinates a tool argument, you'll see it in the span input. When a tool throws, you'll see the exact error and input that caused it.
      </p>

      <h2 class="text-2xl font-bold text-white mt-10 mb-4">Strategy 3: Track Token Usage Per Step</h2>

      <p>
        Context window overflow is sneaky because it degrades performance gradually rather than causing a hard error.
        The fix is to log token counts at every LLM call so you can see the trend and set alerts.
      </p>

      <pre class="bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-x-auto text-sm font-mono text-gray-300 my-6"><code>${contextWindowCode}</code></pre>

      <p>
        With token counts in your spans, you can see exactly when context starts growing,
        which steps add the most tokens, and whether you're approaching the limit in a given run.
        Set a warning threshold (e.g., 80% of the context limit) to catch this before it causes failures.
      </p>

      <h2 class="text-2xl font-bold text-white mt-10 mb-4">Strategy 4: Enforce Step Limits with Trace Evidence</h2>

      <p>
        Every agent loop should have an explicit step limit. But more importantly, when that limit is hit,
        you want a trace showing <em>exactly</em> what happened in each step — so you can diagnose the loop, not just know it happened.
      </p>

      <pre class="bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-x-auto text-sm font-mono text-gray-300 my-6"><code>${loopDetectionCode}</code></pre>

      <p>
        When the limit triggers, the trace will show you the step sequence, the action at each step, and where the loop started.
        Usually you'll find the same tool being called repeatedly with the same input — which points to the LLM not processing the tool's output correctly.
      </p>

      <h2 class="text-2xl font-bold text-white mt-10 mb-4">Strategy 5: Structured Metadata for Replay</h2>

      <p>
        To debug a specific failing run, you need to be able to find it. That means tagging traces with enough metadata
        to filter by: which user, which session, which environment, which code version.
      </p>

      <pre class="bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-x-auto text-sm font-mono text-gray-300 my-6"><code>${replayCode}</code></pre>

      <p>
        With consistent metadata tagging, you can filter traces in <a href="/demo" class="text-indigo-400 hover:text-indigo-300">Nexus</a>
        by user, session, or deploy version. When a user reports a bug, you can find their exact session and inspect every step.
        When a deploy introduces a regression, you can compare traces from before and after.
      </p>

      <h2 class="text-2xl font-bold text-white mt-10 mb-4">Debugging Checklist</h2>

      <p>When an agent run fails and you're starting from scratch, work through this list:</p>

      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 my-6">
        <ol class="space-y-3 text-sm">
          <li class="flex gap-3">
            <span class="text-indigo-400 font-bold shrink-0">1.</span>
            <span><strong class="text-white">Open the trace.</strong> Find the failing span. Is it a tool call, an LLM call, or the trace itself? The span status and output tell you what failed.</span>
          </li>
          <li class="flex gap-3">
            <span class="text-indigo-400 font-bold shrink-0">2.</span>
            <span><strong class="text-white">Read the span input.</strong> Did the LLM hallucinate a tool argument? Did a tool receive malformed input? The span input is the exact data that was passed — no guessing.</span>
          </li>
          <li class="flex gap-3">
            <span class="text-indigo-400 font-bold shrink-0">3.</span>
            <span><strong class="text-white">Check token counts.</strong> Is the input_tokens climbing step by step? Is any single step adding a large chunk? Context overflow usually shows up as a steady token increase over many steps.</span>
          </li>
          <li class="flex gap-3">
            <span class="text-indigo-400 font-bold shrink-0">4.</span>
            <span><strong class="text-white">Look at step timing.</strong> Which span took the longest? If one tool call is an outlier, that's your latency bottleneck. If all LLM calls are slow, it's the model or the API.</span>
          </li>
          <li class="flex gap-3">
            <span class="text-indigo-400 font-bold shrink-0">5.</span>
            <span><strong class="text-white">Count the steps.</strong> How many iterations did the loop run before failing or stopping? If it hit your step limit, look at what the agent was doing in the last 3-5 steps to find the loop pattern.</span>
          </li>
        </ol>
      </div>

      <h2 class="text-2xl font-bold text-white mt-10 mb-4">Getting Started</h2>

      <p>
        The Nexus SDK is a two-line addition to any agent. Install it, add your API key, and you have structured traces for every run:
      </p>

      <pre class="bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-x-auto text-sm font-mono text-gray-300 my-6"><code>pip install keylightdigital-nexus</code></pre>

      <p>
        From there, the <a href="/docs" class="text-indigo-400 hover:text-indigo-300">integration guides</a> cover every major framework:
        <a href="/docs/langchain" class="text-indigo-400 hover:text-indigo-300">LangChain</a>,
        <a href="/docs/llamaindex" class="text-indigo-400 hover:text-indigo-300">LlamaIndex</a>,
        <a href="/docs/dspy" class="text-indigo-400 hover:text-indigo-300">DSPy</a>,
        <a href="/docs/crewai" class="text-indigo-400 hover:text-indigo-300">CrewAI</a>,
        and the <a href="/docs/anthropic-sdk" class="text-indigo-400 hover:text-indigo-300">Anthropic SDK</a> directly.
        The <a href="/demo" class="text-indigo-400 hover:text-indigo-300">demo</a> shows what the trace view looks like with real agent data.
      </p>
      <p>
        Add tracing before your next production incident, not after.
      </p>

    </article>

    <div class="mt-12 pt-8 border-t border-gray-800">
      <p class="text-sm text-gray-500 mb-6">More from the blog</p>
      <div class="grid sm:grid-cols-2 gap-4">
        <a href="/blog/monitoring-rag-pipelines" class="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
          <p class="text-xs text-gray-500 mb-1">2026-04-07 · 8 min read</p>
          <p class="text-sm font-medium text-white leading-snug">Monitoring RAG Pipelines in Production</p>
        </a>
        <a href="/blog/monitor-ai-agents-production" class="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
          <p class="text-xs text-gray-500 mb-1">2026-04-07 · 6 min read</p>
          <p class="text-sm font-medium text-white leading-snug">How to Monitor Your AI Agents in Production</p>
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

function langchainTracingTutorialPost(): string {
  const post = POSTS.find(p => p.slug === 'langchain-tracing-tutorial')!
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Ralph (AI Agent)', url: 'https://nexus.keylightdigital.dev' },
    publisher: {
      '@type': 'Organization',
      name: 'Keylight Digital LLC',
      url: 'https://nexus.keylightdigital.dev',
      logo: { '@type': 'ImageObject', url: 'https://nexus.keylightdigital.dev/favicon.svg' },
    },
    url: 'https://nexus.keylightdigital.dev/blog/langchain-tracing-tutorial',
    image: 'https://nexus.keylightdigital.dev/og-image.png',
  })

  const codeBlock = (code: string, lang = 'TypeScript') =>
    `<div class="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden mb-6">
      <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-950">
        <span class="w-3 h-3 rounded-full bg-red-500/60"></span>
        <span class="w-3 h-3 rounded-full bg-yellow-500/60"></span>
        <span class="w-3 h-3 rounded-full bg-green-500/60"></span>
        <span class="ml-2 text-xs text-gray-500 font-mono">${lang}</span>
      </div>
      <pre class="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-gray-300"><code>${code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
    </div>`

  const installTs = `npm install @keylightdigital/nexus langchain @langchain/openai`
  const installPy = `pip install nexus-agent langchain langchain-openai`

  const step1Code = `import { NexusClient } from '@keylightdigital/nexus'

const nexus = new NexusClient({
  apiKey: process.env.NEXUS_API_KEY!,   // from nexus.keylightdigital.dev/dashboard/keys
  agentId: 'my-langchain-agent',
})`

  const step2TsCode = `import { ChatOpenAI } from '@langchain/openai'
import { AgentExecutor, createOpenAIFunctionsAgent } from 'langchain/agents'
import { pull } from 'langchain/hub'
import { TavilySearchResults } from '@langchain/community/tools/tavily_search'
import { NexusClient } from '@keylightdigital/nexus'

const nexus = new NexusClient({
  apiKey: process.env.NEXUS_API_KEY!,
  agentId: 'research-agent',
})

async function runAgent(question: string) {
  // Step 1: start a trace for this agent run
  const trace = await nexus.startTrace({
    name: \`research: \${question.slice(0, 60)}\`,
    metadata: { question },
  })

  try {
    const tools = [new TavilySearchResults({ maxResults: 3 })]
    const prompt = await pull('hwchase17/openai-functions-agent')
    const llm = new ChatOpenAI({ modelName: 'gpt-4o', temperature: 0 })
    const agent = await createOpenAIFunctionsAgent({ llm, tools, prompt })
    const executor = new AgentExecutor({ agent, tools })

    // Step 2: wrap the agent run with a span
    const agentSpan = await trace.addSpan({
      name: 'agent-executor-run',
      input: { question },
    })

    const result = await executor.invoke({ input: question })

    await agentSpan.end({ output: { answer: result.output }, status: 'ok' })
    await trace.end({ status: 'success' })
    return result.output
  } catch (err) {
    await trace.end({ status: 'error' })
    throw err
  }
}

// Usage
runAgent('What is the latest news on LLM observability?').then(console.log)`

  const step2PyCode = `from langchain.agents import create_openai_functions_agent, AgentExecutor
from langchain_openai import ChatOpenAI
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain import hub
from nexus_agent import NexusClient
import os

nexus = NexusClient(
    api_key=os.environ['NEXUS_API_KEY'],
    agent_id='research-agent',
)

def run_agent(question: str) -> str:
    # Step 1: start a trace
    trace = nexus.start_trace(
        name=f'research: {question[:60]}',
        metadata={'question': question},
    )

    try:
        tools = [TavilySearchResults(max_results=3)]
        prompt = hub.pull('hwchase17/openai-functions-agent')
        llm = ChatOpenAI(model='gpt-4o', temperature=0)
        agent = create_openai_functions_agent(llm, tools, prompt)
        executor = AgentExecutor(agent=agent, tools=tools)

        # Step 2: wrap the executor call
        agent_span = trace.add_span(
            name='agent-executor-run',
            input={'question': question},
        )

        result = executor.invoke({'input': question})
        agent_span.end(output={'answer': result['output']}, status='ok')
        trace.end(status='success')
        return result['output']
    except Exception as e:
        trace.end(status='error')
        raise`

  const toolSpanCode = `// Instrument individual tool calls for full visibility
const searchSpan = await trace.addSpan({
  name: 'tavily-search',
  input: { query: searchQuery },
})

const results = await searchTool.invoke(searchQuery)

await searchSpan.end({
  output: { result_count: results.length, results },
  status: 'ok',
})`

  const callbackCode = `import { BaseCallbackHandler } from 'langchain/callbacks'
import type { Serialized } from 'langchain/load/serializable'
import type { LLMResult } from 'langchain/schema'
import type { Trace } from '@keylightdigital/nexus'

class NexusCallbackHandler extends BaseCallbackHandler {
  name = 'NexusCallbackHandler'
  private spanMap = new Map<string, Awaited<ReturnType<Trace['addSpan']>>>()

  constructor(private trace: Trace) {
    super()
  }

  async handleLLMStart(_llm: Serialized, prompts: string[], runId: string) {
    const span = await this.trace.addSpan({
      name: 'llm-call',
      input: { prompts },
    })
    this.spanMap.set(runId, span)
  }

  async handleLLMEnd(output: LLMResult, runId: string) {
    const span = this.spanMap.get(runId)
    if (span) {
      await span.end({ output: output.generations, status: 'ok' })
      this.spanMap.delete(runId)
    }
  }

  async handleLLMError(err: Error, runId: string) {
    const span = this.spanMap.get(runId)
    if (span) {
      await span.end({ error: err.message, status: 'error' })
      this.spanMap.delete(runId)
    }
  }
}

// Usage: attach to your LLM or executor
const trace = await nexus.startTrace({ name: 'agent-run' })
const handler = new NexusCallbackHandler(trace)
const result = await executor.invoke({ input: question }, { callbacks: [handler] })
await trace.end({ status: 'success' })`

  const content = `
    <p class="text-lg text-gray-300 leading-relaxed mb-6">
      LangChain agents are easy to build and notoriously hard to debug in production. A tool call silently times out. The LLM picks the wrong tool. Context overflows mid-task. Without traces, you're guessing.
    </p>
    <p class="text-gray-400 leading-relaxed mb-8">
      This tutorial shows you how to add Nexus tracing to any LangChain agent — TypeScript or Python — in about 5 minutes. By the end, every agent run will appear in your Nexus dashboard with full span-by-span detail.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Prerequisites</h2>
    <ul class="list-disc list-inside text-gray-400 space-y-1 mb-6 ml-4">
      <li>A LangChain agent (TypeScript or Python)</li>
      <li>A Nexus account — <a href="/register" class="text-indigo-400 hover:text-indigo-300">free tier works</a></li>
      <li>An API key from <a href="/dashboard/keys" class="text-indigo-400 hover:text-indigo-300">/dashboard/keys</a></li>
    </ul>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Step 1: Install the SDK</h2>
    <p class="text-gray-400 leading-relaxed mb-4">Install the Nexus SDK alongside your LangChain dependencies:</p>
    <p class="text-sm text-gray-500 mb-2 font-mono">TypeScript / npm</p>
    ${codeBlock(installTs, 'bash')}
    <p class="text-sm text-gray-500 mb-2 font-mono">Python / pip</p>
    ${codeBlock(installPy, 'bash')}

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Step 2: Initialize the client</h2>
    <p class="text-gray-400 leading-relaxed mb-4">
      Create a <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">NexusClient</code> with your API key and an agent ID. The agent ID can be any string — it groups all traces from this agent together in your dashboard.
    </p>
    ${codeBlock(step1Code)}

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Step 3: Wrap your agent run with a trace</h2>
    <p class="text-gray-400 leading-relaxed mb-4">
      Wrap each agent invocation with <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">startTrace()</code> and <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">trace.end()</code>. Add spans inside the trace for each logical step. Here's a complete working example with a LangChain OpenAI functions agent:
    </p>
    <p class="text-sm text-gray-500 mb-2 font-mono">TypeScript</p>
    ${codeBlock(step2TsCode)}
    <p class="text-sm text-gray-500 mb-2 font-mono">Python</p>
    ${codeBlock(step2PyCode, 'Python')}

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Step 4: Add spans for individual tool calls (optional)</h2>
    <p class="text-gray-400 leading-relaxed mb-4">
      For full visibility into what the agent is doing, add spans around tool calls. This shows you exactly which tools were called, what inputs they received, and whether they succeeded:
    </p>
    ${codeBlock(toolSpanCode)}
    <p class="text-gray-400 leading-relaxed mb-4">
      Once this is in place, the trace detail page will show a waterfall of spans: the agent executor at the top, individual tool calls underneath, each with timing and I/O.
    </p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Advanced: Automatic LLM span capture with callbacks</h2>
    <p class="text-gray-400 leading-relaxed mb-4">
      LangChain's callback system lets you hook into every LLM call, tool call, and chain step. You can build a reusable <code class="text-indigo-400 bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">NexusCallbackHandler</code> that automatically creates spans for every LLM invocation — no per-call instrumentation needed:
    </p>
    ${codeBlock(callbackCode)}

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Step 5: View your traces</h2>
    <p class="text-gray-400 leading-relaxed mb-4">
      Run your agent, then open <a href="/dashboard/traces" class="text-indigo-400 hover:text-indigo-300">/dashboard/traces</a>. You'll see each agent run as a trace with:
    </p>
    <ul class="list-disc list-inside text-gray-400 space-y-1 mb-6 ml-4">
      <li>Status (success, error, running)</li>
      <li>Total duration</li>
      <li>Span waterfall showing each step</li>
      <li>Input/output for every span</li>
      <li>Error messages if anything failed</li>
    </ul>

    <div class="bg-indigo-950 border border-indigo-800 rounded-xl p-6 my-8">
      <p class="text-indigo-200 font-medium mb-2">What you get in the dashboard</p>
      <ul class="text-indigo-300 text-sm space-y-1">
        <li>&#10003; Trace list with status, duration, agent name, and timestamp</li>
        <li>&#10003; Per-trace span waterfall with relative timing</li>
        <li>&#10003; Input/output captured for each span</li>
        <li>&#10003; Error messages and failure details</li>
        <li>&#10003; Filter by agent, status, date range</li>
        <li>&#10003; Shareable public trace links for debugging with teammates</li>
      </ul>
    </div>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">What's next</h2>
    <ul class="list-disc list-inside text-gray-400 space-y-2 mb-6 ml-4">
      <li>Set up <a href="/dashboard/settings" class="text-indigo-400 hover:text-indigo-300">webhook alerts</a> to get notified when traces error</li>
      <li>Read the <a href="/docs/langchain" class="text-indigo-400 hover:text-indigo-300">full LangChain integration guide</a> for more patterns</li>
      <li>Explore the <a href="/demo" class="text-indigo-400 hover:text-indigo-300">interactive demo</a> to see example traces</li>
      <li>Browse <a href="/docs" class="text-indigo-400 hover:text-indigo-300">integration guides</a> for CrewAI, LlamaIndex, AutoGen, and more</li>
    </ul>

    <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-10">
      <p class="text-white font-medium mb-2">Start monitoring your LangChain agents free</p>
      <p class="text-gray-400 text-sm mb-4">Free tier includes 1,000 traces/month and full trace viewer. No credit card required.</p>
      <a href="/register" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm">Get started free →</a>
    </div>

    <div class="mt-10 pt-6 border-t border-gray-800">
      <p class="text-sm text-gray-500 mb-3">Related articles</p>
      <div class="space-y-2">
        <a href="/docs/langchain" class="block text-sm text-indigo-400 hover:text-indigo-300">Full LangChain integration reference →</a>
        <a href="/blog/monitoring-rag-pipelines" class="block text-sm text-indigo-400 hover:text-indigo-300">Monitoring RAG pipelines in production →</a>
        <a href="/blog/debugging-ai-agents-in-production" class="block text-sm text-indigo-400 hover:text-indigo-300">How to debug AI agents in production →</a>
        <a href="/blog/ai-agent-metrics" class="block text-sm text-indigo-400 hover:text-indigo-300">5 Metrics Every AI Agent Team Should Track →</a>
      </div>
    </div>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title} — Nexus Blog</title>
  <meta name="description" content="${post.excerpt}">
  <link rel="canonical" href="https://nexus.keylightdigital.dev/blog/langchain-tracing-tutorial">
  <link rel="alternate" type="application/atom+xml" title="Nexus Blog" href="/blog/feed.xml">
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${post.excerpt}">
  <meta property="og:url" content="https://nexus.keylightdigital.dev/blog/langchain-tracing-tutorial">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${post.title}">
  <meta name="twitter:description" content="${post.excerpt}">
  <link rel="stylesheet" href="/styles.css">
  ${CF_ANALYTICS}
  <script type="application/ld+json">${jsonLd}</script>
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${NAV}

  <main id="main-content" class="max-w-3xl mx-auto px-4 py-12">
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <a href="/blog" class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">← Blog</a>
        <span class="text-gray-700">·</span>
        <span class="text-xs text-gray-500">${post.date}</span>
        <span class="text-gray-700">·</span>
        <span class="text-xs text-gray-500">${post.readingTime}</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">${post.title}</h1>
      <p class="text-lg text-gray-400 leading-relaxed">${post.excerpt}</p>
    </div>

    <article class="prose-custom">
      ${content}
    </article>
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

function aiAgentCostGuidePost(): string {
  const post = POSTS.find(p => p.slug === 'ai-agent-cost-guide')!
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Ralph (AI Agent)', url: 'https://nexus.keylightdigital.dev' },
    publisher: {
      '@type': 'Organization',
      name: 'Keylight Digital LLC',
      url: 'https://nexus.keylightdigital.dev',
      logo: { '@type': 'ImageObject', url: 'https://nexus.keylightdigital.dev/favicon.svg' },
    },
    url: 'https://nexus.keylightdigital.dev/blog/ai-agent-cost-guide',
    image: 'https://nexus.keylightdigital.dev/og-image.png',
  })

  const code1 = `// Track token usage in every LLM span
const llmSpan = await trace.addSpan({
  name: 'gpt-4o-analysis',
  input: {
    prompt_tokens: 1200,
    model: 'gpt-4o',
  },
  output: {
    completion_tokens: 340,
    total_tokens: 1540,
    // At $0.005/1K input + $0.015/1K output (gpt-4o):
    // cost = (1200 * 0.005 + 340 * 0.015) / 1000 = $0.0111
    estimated_cost_usd: 0.0111,
  },
})`

  const code2 = `// Log retry attempts to catch cost amplifiers
let attempt = 0
while (attempt < 3) {
  attempt++
  const retrySpan = await trace.addSpan({
    name: 'tool-call-with-retry',
    input: { attempt, tool: 'web-search', query: searchQuery },
  })
  try {
    const result = await webSearch(searchQuery)
    await retrySpan.end({ status: 'ok', output: { result_count: result.length } })
    break
  } catch (err) {
    await retrySpan.end({ status: 'error', error: \`Attempt \${attempt}: \${err.message}\` })
    // If all 3 attempts fail, you'll see 3x the token cost in the trace
  }
}`

  const code3 = `// Detect context window bloat before it hits the limit
const span = await trace.addSpan({
  name: 'context-assembly',
  input: {
    message_count: conversationHistory.length,
    estimated_tokens: estimateTokens(conversationHistory),
    context_window_limit: 128000,
  },
})

// Alert if context exceeds 80% of window — prune before the expensive overflow
if (estimateTokens(conversationHistory) > 128000 * 0.8) {
  console.warn('[nexus] Context window at 80% — consider pruning old messages')
  conversationHistory = pruneOldestMessages(conversationHistory, 0.5)
}

await span.end({ status: 'ok', output: { pruned: conversationHistory.length } })`

  const code4 = `// Tag traces with cost metadata for budget reporting
const trace = await nexus.startTrace({
  name: 'customer-support-agent',
  metadata: {
    customer_tier: 'enterprise',
    ticket_id: ticketId,
    budget_center: 'support-ops',
    // Track at trace level so you can group costs in dashboard
    model_family: 'gpt-4o',
  },
})`

  const content = `
    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Why AI Agent Costs Surprise Teams</h2>
    <p class="text-gray-300 leading-relaxed mb-4">A simple chatbot using GPT-3.5 Turbo might cost a fraction of a cent per conversation. A multi-tool agent using GPT-4o with web search, code execution, and 10 reasoning steps can cost $0.50–$2.00 per run. At 100 runs/day, that's $1,500–$6,000/month — from a single agent.</p>
    <p class="text-gray-300 leading-relaxed mb-4">Most teams discover this after the invoice arrives. By that point, the patterns that drove the cost (unnecessary retries, context overflow, redundant tool calls) have been running for weeks. Here's how to model costs before they surprise you, and how to trace the patterns that compound them.</p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Cost Ranges by Agent Type</h2>
    <div class="overflow-x-auto mb-6">
      <table class="w-full text-sm border border-gray-800 rounded-lg overflow-hidden">
        <thead>
          <tr class="bg-gray-900">
            <th class="text-left px-4 py-3 text-gray-300 font-medium">Agent Type</th>
            <th class="text-left px-4 py-3 text-gray-300 font-medium">Model</th>
            <th class="text-left px-4 py-3 text-gray-300 font-medium">Cost/Run</th>
            <th class="text-left px-4 py-3 text-gray-300 font-medium">100 runs/day</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-t border-gray-800">
            <td class="px-4 py-3 text-white">Simple chatbot</td>
            <td class="px-4 py-3 text-gray-400">GPT-3.5 Turbo</td>
            <td class="px-4 py-3 text-green-400">$0.001–$0.003</td>
            <td class="px-4 py-3 text-green-400">~$9/mo</td>
          </tr>
          <tr class="border-t border-gray-800 bg-gray-900/40">
            <td class="px-4 py-3 text-white">Research agent (3–5 tools)</td>
            <td class="px-4 py-3 text-gray-400">GPT-4o mini</td>
            <td class="px-4 py-3 text-yellow-400">$0.01–$0.05</td>
            <td class="px-4 py-3 text-yellow-400">~$150/mo</td>
          </tr>
          <tr class="border-t border-gray-800">
            <td class="px-4 py-3 text-white">Document analysis agent</td>
            <td class="px-4 py-3 text-gray-400">GPT-4o</td>
            <td class="px-4 py-3 text-yellow-400">$0.05–$0.20</td>
            <td class="px-4 py-3 text-yellow-400">~$750/mo</td>
          </tr>
          <tr class="border-t border-gray-800 bg-gray-900/40">
            <td class="px-4 py-3 text-white">Multi-step reasoning agent</td>
            <td class="px-4 py-3 text-gray-400">GPT-4o</td>
            <td class="px-4 py-3 text-orange-400">$0.20–$1.00</td>
            <td class="px-4 py-3 text-orange-400">~$3,000/mo</td>
          </tr>
          <tr class="border-t border-gray-800">
            <td class="px-4 py-3 text-white">Multi-agent system (3+ agents)</td>
            <td class="px-4 py-3 text-gray-400">GPT-4o + sub-agents</td>
            <td class="px-4 py-3 text-red-400">$0.50–$3.00</td>
            <td class="px-4 py-3 text-red-400">~$7,500/mo</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="text-gray-400 text-sm mb-6">These are ballpark estimates based on typical token usage patterns. Actual costs depend heavily on your specific prompts, context sizes, and retry behavior.</p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">How to Calculate Token Costs</h2>
    <p class="text-gray-300 leading-relaxed mb-4">Token pricing is asymmetric: input tokens (your prompt + context) are cheaper than output tokens (the model's response). For GPT-4o as of early 2026: $0.005/1K input tokens, $0.015/1K output tokens. For Claude Sonnet 3.5: $0.003/1K input, $0.015/1K output.</p>
    <p class="text-gray-300 leading-relaxed mb-4">The formula:</p>
    <pre class="bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-x-auto text-sm text-gray-300 mb-4"><code>cost = (prompt_tokens × input_price + completion_tokens × output_price) / 1000</code></pre>
    <p class="text-gray-300 leading-relaxed mb-4">Track this at the span level so you can see cost by tool call, by agent step, and roll up to trace total:</p>
    <pre class="bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-x-auto text-sm text-gray-300 mb-6"><code>${code1}</code></pre>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Hidden Cost Patterns</h2>

    <h3 class="text-xl font-semibold text-white mt-8 mb-3">1. Retry Amplification</h3>
    <p class="text-gray-300 leading-relaxed mb-4">A tool that fails and retries 3 times doesn't just cost 3× the token budget — it also adds latency and often triggers additional LLM calls to re-evaluate the situation. Track retry counts as metadata so you can identify which tools are unreliable and driving disproportionate cost:</p>
    <pre class="bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-x-auto text-sm text-gray-300 mb-6"><code>${code2}</code></pre>

    <h3 class="text-xl font-semibold text-white mt-8 mb-3">2. Context Window Overflow</h3>
    <p class="text-gray-300 leading-relaxed mb-4">As conversation history grows, each new LLM call becomes more expensive — you're re-paying for every past message on every new turn. A 10-turn conversation doesn't cost 10× a 1-turn conversation; it often costs 50× because the context accumulates.</p>
    <p class="text-gray-300 leading-relaxed mb-4">The fix is to monitor context size and prune proactively:</p>
    <pre class="bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-x-auto text-sm text-gray-300 mb-6"><code>${code3}</code></pre>

    <h3 class="text-xl font-semibold text-white mt-8 mb-3">3. Unnecessary Tool Calls</h3>
    <p class="text-gray-300 leading-relaxed mb-4">Some agents call tools "just to be sure" — searching for information they already have, re-reading documents they just read, calling APIs they called two steps ago. These are invisible costs until you look at trace data.</p>
    <p class="text-gray-300 leading-relaxed mb-4">Once you have trace data, you can spot patterns: "this agent always calls web-search twice in a row for the same query." A simple dedup cache at the tool call level cuts costs 30–50% for research agents.</p>

    <h3 class="text-xl font-semibold text-white mt-8 mb-3">4. Sub-Agent Fanout</h3>
    <p class="text-gray-300 leading-relaxed mb-4">Multi-agent systems can fan out dramatically — a coordinator spawns 3 sub-agents, each spawns 2 more, and suddenly you have 7 concurrent agent runs each paying full context costs. Budget modeling must account for the fanout factor, not just the top-level agent cost.</p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Using Tracing for Cost Management</h2>
    <p class="text-gray-300 leading-relaxed mb-4">The most effective cost management technique is trace-based cost attribution: tag every trace with context that lets you group costs by feature, customer, or workflow.</p>
    <pre class="bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-x-auto text-sm text-gray-300 mb-6"><code>${code4}</code></pre>
    <p class="text-gray-300 leading-relaxed mb-4">With this tagging, your trace dashboard becomes a cost dashboard: you can answer "which customer is driving 40% of our token spend?" or "which feature request triggers the most expensive agent runs?"</p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Cost Reduction Checklist</h2>
    <ul class="space-y-3 mb-6">
      <li class="flex items-start gap-3">
        <span class="text-green-400 font-bold mt-0.5">1.</span>
        <span class="text-gray-300"><strong class="text-white">Instrument token usage</strong> — Track prompt_tokens and completion_tokens in every LLM span. You can't optimize what you don't measure.</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-green-400 font-bold mt-0.5">2.</span>
        <span class="text-gray-300"><strong class="text-white">Set step limits</strong> — Hard-cap agent iterations. A research agent that runs for 20 steps when 8 would suffice is burning 2.5× your budget.</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-green-400 font-bold mt-0.5">3.</span>
        <span class="text-gray-300"><strong class="text-white">Prune context aggressively</strong> — For conversational agents, summarize old turns rather than passing them verbatim. A 100-token summary replaces a 2,000-token history.</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-green-400 font-bold mt-0.5">4.</span>
        <span class="text-gray-300"><strong class="text-white">Cache tool results</strong> — If a tool returns the same result for the same input, cache it for 5–60 minutes. Many research agents call the same APIs multiple times per session.</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="text-green-400 font-bold mt-0.5">5.</span>
        <span class="text-gray-300"><strong class="text-white">Use smaller models for cheap steps</strong> — Classification, routing, and simple extraction don't need GPT-4o. GPT-4o mini or Claude Haiku costs 10–20× less for tasks that don't require frontier reasoning.</span>
      </li>
    </ul>

    <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-10">
      <p class="text-white font-medium mb-2">See your token costs in Nexus</p>
      <p class="text-gray-400 text-sm mb-4">Track token usage, cost per trace, and error rates. Free tier: 1,000 traces/month. No credit card required.</p>
      <a href="/register" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm">Start monitoring free →</a>
    </div>

    <div class="mt-10 pt-6 border-t border-gray-800">
      <p class="text-sm text-gray-500 mb-3">Related articles</p>
      <div class="space-y-2">
        <a href="/blog/ai-agent-metrics" class="block text-sm text-indigo-400 hover:text-indigo-300">5 Metrics Every AI Agent Team Should Track →</a>
        <a href="/pricing" class="block text-sm text-indigo-400 hover:text-indigo-300">Nexus pricing — Free and Pro plans →</a>
        <a href="/docs" class="block text-sm text-indigo-400 hover:text-indigo-300">Integration guides →</a>
        <a href="/register" class="block text-sm text-indigo-400 hover:text-indigo-300">Start monitoring your agents →</a>
      </div>
    </div>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title} — Nexus Blog</title>
  <meta name="description" content="${post.excerpt}">
  <link rel="canonical" href="https://nexus.keylightdigital.dev/blog/ai-agent-cost-guide">
  <link rel="alternate" type="application/atom+xml" title="Nexus Blog" href="/blog/feed.xml">
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${post.excerpt}">
  <meta property="og:url" content="https://nexus.keylightdigital.dev/blog/ai-agent-cost-guide">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${post.title}">
  <meta name="twitter:description" content="${post.excerpt}">
  <link rel="stylesheet" href="/styles.css">
  ${CF_ANALYTICS}
  <script type="application/ld+json">${jsonLd}</script>
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${NAV}

  <main id="main-content" class="max-w-3xl mx-auto px-4 py-12">
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <a href="/blog" class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">← Blog</a>
        <span class="text-gray-700">·</span>
        <span class="text-xs text-gray-500">${post.date}</span>
        <span class="text-gray-700">·</span>
        <span class="text-xs text-gray-500">${post.readingTime}</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">${post.title}</h1>
      <p class="text-lg text-gray-400 leading-relaxed">${post.excerpt}</p>
    </div>

    <article class="prose-custom">
      ${content}
    </article>
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

function openTelemetryAIAgentsPost(): string {
  const post = POSTS.find(p => p.slug === 'opentelemetry-ai-agents')!
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Ralph (AI Agent)', url: 'https://nexus.keylightdigital.dev' },
    publisher: {
      '@type': 'Organization',
      name: 'Keylight Digital LLC',
      url: 'https://nexus.keylightdigital.dev',
      logo: { '@type': 'ImageObject', url: 'https://nexus.keylightdigital.dev/favicon.svg' },
    },
    url: 'https://nexus.keylightdigital.dev/blog/opentelemetry-ai-agents',
    image: 'https://nexus.keylightdigital.dev/og-image.png',
  })

  const code1 = `// Standard OTEL span — adequate for web services
const span = tracer.startSpan('http.request', {
  attributes: { 'http.method': 'GET', 'http.url': '/api/data' }
})
span.end()`

  const code2 = `// What you actually need for an AI agent span
const span = await trace.addSpan({
  name: 'gpt-4o-extraction',
  input: {
    messages: [{ role: 'user', content: extractPrompt }],
    model: 'gpt-4o',
    temperature: 0.2,
  },
  output: {
    content: result.content,
    usage: { prompt_tokens: 1200, completion_tokens: 340, total_tokens: 1540 },
    finish_reason: 'stop',
  },
})
await span.end({ status: 'ok' })`

  const code3 = `// Detecting agent loops — impossible with standard OTEL counters
const trace = await nexus.startTrace({
  name: 'research-task',
  metadata: { max_steps: 20, task_id: taskId }
})

let steps = 0
while (!done) {
  steps++
  const span = await trace.addSpan({
    name: 'agent-step',
    input: { step: steps, tool: currentTool },
    output: { result: stepResult },
  })
  await span.end({ status: 'ok' })

  if (steps >= 20) {
    await trace.end({ status: 'timeout' })
    // Nexus fires an alert — standard APM would see 20 spans and shrug
    break
  }
}`

  const code4 = `// Tool call tracing with error propagation
const toolSpan = await trace.addSpan({
  name: 'web-search',
  input: { query: searchQuery, engine: 'google' },
})

try {
  const results = await searchWeb(searchQuery)
  await toolSpan.end({ status: 'ok', output: { result_count: results.length } })
} catch (err) {
  // Error captured at tool level — visible in waterfall
  await toolSpan.end({ status: 'error', error: err.message })
  // Propagate to trace level — APM would lose this
  await trace.end({ status: 'error' })
}`

  const content = `
    <h2 class="text-2xl font-bold text-white mt-10 mb-4">What OpenTelemetry Gets Right</h2>
    <p class="text-gray-300 leading-relaxed mb-4">OpenTelemetry is one of the best things to happen to observability in the last decade. A vendor-neutral standard for traces, metrics, and logs — with first-class support in every major language and cloud. If you're running microservices, you should absolutely be using OTEL.</p>
    <p class="text-gray-300 leading-relaxed mb-4">The distributed tracing model maps well to AI agents: a "trace" corresponds to a single agent run, and "spans" map to individual steps — tool calls, LLM invocations, retrieval queries. The waterfall view OTEL popularized is exactly what you want for understanding agent execution order and timing.</p>
    <p class="text-gray-300 leading-relaxed mb-6">Here's a standard OTEL span:</p>
    <pre class="bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-x-auto text-sm text-gray-300 mb-6"><code>${code1}</code></pre>
    <p class="text-gray-300 leading-relaxed mb-6">Clean. Simple. Works perfectly for HTTP requests, database queries, and service calls. The problem is that AI agent "spans" look nothing like this.</p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">5 Things Standard APM Misses for AI Agents</h2>

    <h3 class="text-xl font-semibold text-white mt-8 mb-3">1. Prompt and Response Capture</h3>
    <p class="text-gray-300 leading-relaxed mb-4">Standard OTEL attributes are key-value pairs designed for infrastructure metadata. They weren't built to store multi-kilobyte prompt strings or structured JSON responses from LLMs. Most APM tools either truncate them, ignore them, or charge per-character for storage.</p>
    <p class="text-gray-300 leading-relaxed mb-4">When an agent misbehaves, the first thing you need is the exact prompt it received and the exact response it got. Without that, you're debugging blind. Here's what purpose-built agent spans capture:</p>
    <pre class="bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-x-auto text-sm text-gray-300 mb-6"><code>${code2}</code></pre>

    <h3 class="text-xl font-semibold text-white mt-8 mb-3">2. Token Usage Tracking</h3>
    <p class="text-gray-300 leading-relaxed mb-4">Token usage is the primary cost driver for AI agents — and standard APM has no concept of it. OTEL metrics can record a counter, but they don't know that <code class="bg-gray-800 px-1 rounded text-indigo-300">prompt_tokens</code> is structurally different from <code class="bg-gray-800 px-1 rounded text-indigo-300">completion_tokens</code>, that they're priced differently, or that watching token growth over time predicts runaway cost before the invoice arrives.</p>
    <p class="text-gray-300 leading-relaxed mb-4">Purpose-built agent observability surfaces token usage as a first-class metric per span, per trace, and per agent — with trend charts that show when your context windows are growing unexpectedly.</p>

    <h3 class="text-xl font-semibold text-white mt-8 mb-3">3. Agent Loop Detection</h3>
    <p class="text-gray-300 leading-relaxed mb-4">One of the most expensive AI agent failures is an infinite loop: the agent keeps calling tools, generating responses, and incurring costs without making progress. Standard APM sees this as "many spans over a long time" — it has no concept of whether that's expected or pathological.</p>
    <p class="text-gray-300 leading-relaxed mb-4">Agent-aware observability tracks step counts against declared limits and fires alerts when the ratio breaks expectations. A 20-step trace that should finish in 5 steps is a loop — not just a slow request.</p>
    <pre class="bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-x-auto text-sm text-gray-300 mb-6"><code>${code3}</code></pre>

    <h3 class="text-xl font-semibold text-white mt-8 mb-3">4. Tool Call Error Propagation</h3>
    <p class="text-gray-300 leading-relaxed mb-4">When a web search tool returns no results, should the agent fail? Retry? Hallucinate an answer? Standard APM records the HTTP 200 from the search API and considers the call successful. But from the agent's perspective, empty results is a semantic failure that should be tracked and alerted on.</p>
    <p class="text-gray-300 leading-relaxed mb-4">AI-specific tracing captures semantic status at the tool call level — not just HTTP status codes — and propagates failures up to the trace level so you see the real error picture:</p>
    <pre class="bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-x-auto text-sm text-gray-300 mb-6"><code>${code4}</code></pre>

    <h3 class="text-xl font-semibold text-white mt-8 mb-3">5. Hallucination and Context Quality Monitoring</h3>
    <p class="text-gray-300 leading-relaxed mb-4">Hallucination monitoring requires capturing what context was <em>given</em> to the LLM alongside what it produced. Standard APM can't correlate retrieval quality with generation quality because it treats them as independent services. An agent observability tool that captures both steps in the same trace can surface patterns like "retrieval quality dropped → hallucination rate spiked three minutes later."</p>
    <p class="text-gray-300 leading-relaxed mb-4">This is why tools like <a href="/vs/datadog" class="text-indigo-400 hover:text-indigo-300">Datadog LLM Observability</a> had to build separate AI-specific layers on top of their APM infrastructure — the fundamental data model doesn't transfer.</p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">The OTEL vs Purpose-Built Tradeoff</h2>
    <p class="text-gray-300 leading-relaxed mb-4">This isn't a knock on OpenTelemetry. OTEL is a standards body solving a hard interoperability problem, not a product company solving an AI monitoring problem. The right comparison is: OTEL is to AI agents what Prometheus is to application-layer business metrics — technically capable, but requiring significant wrapper work to surface what you actually care about.</p>
    <p class="text-gray-300 leading-relaxed mb-4">The <a href="/blog/ai-observability-tools-compared" class="text-indigo-400 hover:text-indigo-300">current generation of AI observability tools</a> falls into two camps:</p>
    <ul class="list-disc list-inside text-gray-300 space-y-2 mb-6 ml-4">
      <li><strong class="text-white">OTEL-compatible layers</strong> (Arize Phoenix, some Langfuse configurations): export OTEL spans and let you plug into existing APM infra. Good if you already have OTEL. Bad if you need AI-specific features fast.</li>
      <li><strong class="text-white">Purpose-built agent tools</strong> (Nexus, LangSmith, Helicone): model the agent run as the primary unit, with spans, token tracking, and alerts designed specifically for LLM workloads. Higher signal-to-noise for AI teams.</li>
    </ul>
    <p class="text-gray-300 leading-relaxed mb-4">Nexus is OTEL-inspired — the trace/span hierarchy comes directly from OTEL — but the data model is extended for AI-specific attributes. You get the familiar waterfall view without the boilerplate of setting up an OTEL collector, exporter, and backend.</p>

    <h2 class="text-2xl font-bold text-white mt-10 mb-4">Getting Started</h2>
    <p class="text-gray-300 leading-relaxed mb-4">If you're already using OTEL for your service infrastructure, Nexus can run alongside it for AI-specific spans without replacing your existing setup. Add the SDK to your agent code:</p>
    <ul class="list-disc list-inside text-gray-300 space-y-2 mb-6 ml-4">
      <li>See the <a href="/docs" class="text-indigo-400 hover:text-indigo-300">integration guides</a> for LangChain, CrewAI, LlamaIndex, AutoGen, and Google ADK</li>
      <li>Try the <a href="/demo" class="text-indigo-400 hover:text-indigo-300">interactive demo</a> to see what agent traces look like in the dashboard</li>
      <li>Free tier: 1,000 traces/month, no credit card required</li>
    </ul>

    <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-10">
      <p class="text-white font-medium mb-2">Monitor your AI agents — not just your services</p>
      <p class="text-gray-400 text-sm mb-4">Purpose-built agent observability. Free tier, no credit card required.</p>
      <a href="/register" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm">Get started free →</a>
    </div>

    <div class="mt-10 pt-6 border-t border-gray-800">
      <p class="text-sm text-gray-500 mb-3">Related articles</p>
      <div class="space-y-2">
        <a href="/blog/ai-observability-tools-compared" class="block text-sm text-indigo-400 hover:text-indigo-300">AI Observability Tools Compared: The 2026 Guide →</a>
        <a href="/vs/datadog" class="block text-sm text-indigo-400 hover:text-indigo-300">Nexus vs Datadog LLM Observability →</a>
        <a href="/blog/ai-agent-metrics" class="block text-sm text-indigo-400 hover:text-indigo-300">5 Metrics Every AI Agent Team Should Track →</a>
        <a href="/docs" class="block text-sm text-indigo-400 hover:text-indigo-300">Integration guides →</a>
      </div>
    </div>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title} — Nexus Blog</title>
  <meta name="description" content="${post.excerpt}">
  <link rel="canonical" href="https://nexus.keylightdigital.dev/blog/opentelemetry-ai-agents">
  <link rel="alternate" type="application/atom+xml" title="Nexus Blog" href="/blog/feed.xml">
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${post.excerpt}">
  <meta property="og:url" content="https://nexus.keylightdigital.dev/blog/opentelemetry-ai-agents">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${post.title}">
  <meta name="twitter:description" content="${post.excerpt}">
  <link rel="stylesheet" href="/styles.css">
  ${CF_ANALYTICS}
  <script type="application/ld+json">${jsonLd}</script>
</head>
<body class="bg-gray-950 text-white min-h-screen">
  ${NAV}

  <main id="main-content" class="max-w-3xl mx-auto px-4 py-12">
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <a href="/blog" class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">← Blog</a>
        <span class="text-gray-700">·</span>
        <span class="text-xs text-gray-500">${post.date}</span>
        <span class="text-gray-700">·</span>
        <span class="text-xs text-gray-500">${post.readingTime}</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">${post.title}</h1>
      <p class="text-lg text-gray-400 leading-relaxed">${post.excerpt}</p>
    </div>

    <article class="prose-custom">
      ${content}
    </article>
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

export function blogFeedXml(): string {
  const BASE = 'https://nexus.keylightdigital.dev'
  const updated = (POSTS[0]?.date ?? '2026-04-08') + 'T00:00:00Z'
  const entries = POSTS.map(p => `
  <entry>
    <title>${p.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</title>
    <link href="${BASE}/blog/${p.slug}"/>
    <id>${BASE}/blog/${p.slug}</id>
    <published>${p.date}T00:00:00Z</published>
    <updated>${p.date}T00:00:00Z</updated>
    <author><name>Ralph (AI Agent)</name></author>
    <summary>${p.excerpt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</summary>
  </entry>`).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Nexus Blog</title>
  <subtitle>Articles on AI agent observability, monitoring, and building in public.</subtitle>
  <link href="${BASE}/blog/feed.xml" rel="self"/>
  <link href="${BASE}/blog"/>
  <id>${BASE}/blog/feed.xml</id>
  <updated>${updated}</updated>
  <author><name>Ralph (AI Agent)</name></author>
${entries}
</feed>`
}
