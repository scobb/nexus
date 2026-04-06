export function docsPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Documentation — Nexus</title>
  <meta name="description" content="Nexus REST API reference. Trace ingestion, span creation, authentication, rate limits, and SDK quickstarts for TypeScript and Python.">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-950 text-white min-h-screen">

  <!-- Nav -->
  <nav class="border-b border-gray-800 px-4 py-4">
    <div class="max-w-5xl mx-auto flex items-center justify-between">
      <a href="/" class="text-lg font-bold text-indigo-400">Nexus</a>
      <div class="flex items-center gap-4">
        <a href="/docs" class="text-sm text-white font-medium">Docs</a>
        <a href="/demo" class="text-sm text-gray-400 hover:text-white transition-colors">Demo</a>
        <a href="/auth/login" class="text-sm text-gray-400 hover:text-white transition-colors">Sign in</a>
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">Start free</a>
      </div>
    </div>
  </nav>

  <div class="max-w-5xl mx-auto px-4 py-12">
    <div class="flex gap-8">

      <!-- Sidebar TOC -->
      <aside class="hidden md:block w-48 flex-shrink-0">
        <nav class="sticky top-8 space-y-1">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Contents</p>
          <a href="#authentication" class="block text-sm text-gray-400 hover:text-white py-1 transition-colors">Authentication</a>
          <a href="#rate-limits" class="block text-sm text-gray-400 hover:text-white py-1 transition-colors">Rate Limits</a>
          <a href="#traces" class="block text-sm text-gray-400 hover:text-white py-1 transition-colors">POST /traces</a>
          <a href="#spans" class="block text-sm text-gray-400 hover:text-white py-1 transition-colors">POST /spans</a>
          <a href="#patch-trace" class="block text-sm text-gray-400 hover:text-white py-1 transition-colors">PATCH /traces/:id</a>
          <a href="#sdk-typescript" class="block text-sm text-gray-400 hover:text-white py-1 transition-colors">TypeScript SDK</a>
          <a href="#sdk-python" class="block text-sm text-gray-400 hover:text-white py-1 transition-colors">Python SDK</a>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="min-w-0 flex-1 space-y-16">

        <!-- Header -->
        <div>
          <h1 class="text-4xl font-extrabold text-white mb-3">API Reference</h1>
          <p class="text-lg text-gray-400">
            The Nexus REST API lets you ingest traces and spans from any language or framework.
            Base URL: <code class="bg-gray-900 text-indigo-300 px-2 py-0.5 rounded text-sm font-mono">https://nexus.keylightdigital.dev</code>
          </p>
        </div>

        <!-- Authentication -->
        <section id="authentication">
          <h2 class="text-2xl font-bold text-white mb-4 pb-2 border-b border-gray-800">Authentication</h2>
          <p class="text-gray-300 mb-4">
            All API requests require an API key passed as a Bearer token in the <code class="bg-gray-900 text-indigo-300 px-1.5 py-0.5 rounded text-sm font-mono">Authorization</code> header.
          </p>

          <div class="bg-gray-900 rounded-xl overflow-hidden mb-6">
            <div class="bg-gray-800 px-4 py-2 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span class="text-xs text-gray-400 ml-2">HTTP header</span>
            </div>
            <pre class="px-5 py-4 text-sm font-mono text-gray-200 overflow-x-auto">Authorization: Bearer nxs_a1b2c3d4...</pre>
          </div>

          <h3 class="text-lg font-semibold text-white mb-3">Creating API keys</h3>
          <ol class="list-decimal list-inside space-y-2 text-gray-300 text-sm mb-4">
            <li>Go to <a href="/dashboard/keys" class="text-indigo-400 hover:text-indigo-300">Dashboard → API Keys</a></li>
            <li>Click <strong class="text-white">Create new key</strong> and give it a name</li>
            <li>Copy the key — it is shown only once</li>
            <li>Store it in your environment (e.g. <code class="bg-gray-900 text-indigo-300 px-1.5 py-0.5 rounded text-sm font-mono">NEXUS_API_KEY</code>)</li>
          </ol>

          <div class="bg-yellow-950 border border-yellow-800 rounded-xl px-4 py-3 text-sm text-yellow-200">
            <strong class="text-yellow-300">Security:</strong> Keys are stored as SHA-256 hashes. If you lose a key, revoke it and create a new one.
          </div>
        </section>

        <!-- Rate limits -->
        <section id="rate-limits">
          <h2 class="text-2xl font-bold text-white mb-4 pb-2 border-b border-gray-800">Rate Limits &amp; Plan Limits</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left text-gray-400 border-b border-gray-800">
                  <th class="pb-3 pr-6 font-medium">Limit</th>
                  <th class="pb-3 pr-6 font-medium">Free</th>
                  <th class="pb-3 font-medium">Pro ($9/mo)</th>
                </tr>
              </thead>
              <tbody class="text-gray-300">
                <tr class="border-b border-gray-800/50">
                  <td class="py-3 pr-6">Traces / month</td>
                  <td class="py-3 pr-6">1,000</td>
                  <td class="py-3">50,000</td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-3 pr-6">Agents</td>
                  <td class="py-3 pr-6">1</td>
                  <td class="py-3">Unlimited</td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-3 pr-6">Trace retention</td>
                  <td class="py-3 pr-6">30 days</td>
                  <td class="py-3">90 days</td>
                </tr>
                <tr>
                  <td class="py-3 pr-6">Email alerts</td>
                  <td class="py-3 pr-6">—</td>
                  <td class="py-3">✓ (error / timeout)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-6 space-y-3">
            <div class="bg-gray-900 rounded-xl p-4 text-sm">
              <p class="text-gray-300"><strong class="text-red-400">429 Too Many Requests</strong> — trace limit reached:</p>
              <pre class="mt-2 text-xs font-mono text-gray-400 overflow-x-auto">{
  "error": "Monthly trace limit reached. Upgrade to Pro.",
  "limit": 1000,
  "current": 1001,
  "upgrade_url": "/dashboard/billing"
}</pre>
            </div>
            <div class="bg-gray-900 rounded-xl p-4 text-sm">
              <p class="text-gray-300"><strong class="text-orange-400">403 Forbidden</strong> — agent limit reached (Free plan):</p>
              <pre class="mt-2 text-xs font-mono text-gray-400 overflow-x-auto">{
  "error": "Free plan limited to 1 agent",
  "upgrade_url": "/dashboard/billing"
}</pre>
            </div>
          </div>
        </section>

        <!-- POST /api/v1/traces -->
        <section id="traces">
          <h2 class="text-2xl font-bold text-white mb-4 pb-2 border-b border-gray-800">POST /api/v1/traces</h2>
          <p class="text-gray-300 mb-6">Create a new trace. Agents are auto-created on first use.</p>

          <div class="grid sm:grid-cols-2 gap-4 mb-6">
            <div class="bg-gray-900 rounded-xl p-4">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Request</p>
              <pre class="text-xs font-mono text-gray-300 overflow-x-auto">POST /api/v1/traces
Authorization: Bearer &lt;key&gt;
Content-Type: application/json

{
  "agent_id": "my-assistant",
  "name": "user-query-2026-04-06",
  "status": "running",
  "started_at": "2026-04-06T12:00:00Z",
  "ended_at": null,
  "metadata": { "user_id": "u_123" }
}</pre>
            </div>
            <div class="bg-gray-900 rounded-xl p-4">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Response <span class="text-green-400">201</span></p>
              <pre class="text-xs font-mono text-gray-300 overflow-x-auto">{
  "trace_id": "f47ac10b-58cc-..."
}</pre>
            </div>
          </div>

          <h3 class="text-base font-semibold text-white mb-3">Request fields</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left text-gray-400 border-b border-gray-800">
                  <th class="pb-2 pr-4 font-medium">Field</th>
                  <th class="pb-2 pr-4 font-medium">Type</th>
                  <th class="pb-2 pr-4 font-medium">Required</th>
                  <th class="pb-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody class="text-gray-300 text-xs">
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">agent_id</td>
                  <td class="py-2.5 pr-4">string</td>
                  <td class="py-2.5 pr-4">Yes</td>
                  <td class="py-2.5">Your agent's name. Auto-created on first use.</td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">name</td>
                  <td class="py-2.5 pr-4">string</td>
                  <td class="py-2.5 pr-4">Yes</td>
                  <td class="py-2.5">Human-readable trace name (e.g. the task or query).</td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">status</td>
                  <td class="py-2.5 pr-4">string</td>
                  <td class="py-2.5 pr-4">Yes</td>
                  <td class="py-2.5"><code class="bg-gray-800 px-1 rounded">running</code> | <code class="bg-gray-800 px-1 rounded">success</code> | <code class="bg-gray-800 px-1 rounded">error</code> | <code class="bg-gray-800 px-1 rounded">timeout</code></td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">started_at</td>
                  <td class="py-2.5 pr-4">string</td>
                  <td class="py-2.5 pr-4">Yes</td>
                  <td class="py-2.5">ISO 8601 timestamp (e.g. <code class="bg-gray-800 px-1 rounded">2026-04-06T12:00:00Z</code>).</td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">ended_at</td>
                  <td class="py-2.5 pr-4">string | null</td>
                  <td class="py-2.5 pr-4">No</td>
                  <td class="py-2.5">ISO 8601 end timestamp. Set when trace completes.</td>
                </tr>
                <tr>
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">metadata</td>
                  <td class="py-2.5 pr-4">object | null</td>
                  <td class="py-2.5 pr-4">No</td>
                  <td class="py-2.5">Arbitrary JSON. Stored and displayed in trace viewer.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="text-base font-semibold text-white mt-6 mb-3">Error responses</h3>
          <div class="space-y-2 text-sm">
            <div class="flex gap-3">
              <span class="text-yellow-400 font-mono font-semibold w-8">400</span>
              <span class="text-gray-300">Invalid input — response includes <code class="bg-gray-900 px-1.5 rounded text-xs">{"error":"...", "fields":{"field":"reason"}}</code></span>
            </div>
            <div class="flex gap-3">
              <span class="text-red-400 font-mono font-semibold w-8">401</span>
              <span class="text-gray-300">Invalid or revoked API key</span>
            </div>
            <div class="flex gap-3">
              <span class="text-orange-400 font-mono font-semibold w-8">403</span>
              <span class="text-gray-300">Agent limit reached (Free plan: 1 agent max)</span>
            </div>
            <div class="flex gap-3">
              <span class="text-red-400 font-mono font-semibold w-8">429</span>
              <span class="text-gray-300">Monthly trace limit reached (Free: 1,000/month)</span>
            </div>
          </div>
        </section>

        <!-- POST /api/v1/traces/:id/spans -->
        <section id="spans">
          <h2 class="text-2xl font-bold text-white mb-4 pb-2 border-b border-gray-800">POST /api/v1/traces/:id/spans</h2>
          <p class="text-gray-300 mb-6">Add a span (sub-step) to a trace. Spans capture individual LLM calls, tool uses, or sub-agent invocations.</p>

          <div class="grid sm:grid-cols-2 gap-4 mb-6">
            <div class="bg-gray-900 rounded-xl p-4">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Request</p>
              <pre class="text-xs font-mono text-gray-300 overflow-x-auto">POST /api/v1/traces/:trace_id/spans
Authorization: Bearer &lt;key&gt;
Content-Type: application/json

{
  "name": "llm-call",
  "status": "ok",
  "started_at": "2026-04-06T12:00:01Z",
  "ended_at": "2026-04-06T12:00:02Z",
  "input": { "prompt": "Summarize this..." },
  "output": { "text": "Here is a summary..." },
  "parent_span_id": null
}</pre>
            </div>
            <div class="bg-gray-900 rounded-xl p-4">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Response <span class="text-green-400">201</span></p>
              <pre class="text-xs font-mono text-gray-300 overflow-x-auto">{
  "span_id": "a1b2c3d4-..."
}</pre>
            </div>
          </div>

          <h3 class="text-base font-semibold text-white mb-3">Request fields</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left text-gray-400 border-b border-gray-800">
                  <th class="pb-2 pr-4 font-medium">Field</th>
                  <th class="pb-2 pr-4 font-medium">Type</th>
                  <th class="pb-2 pr-4 font-medium">Required</th>
                  <th class="pb-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody class="text-gray-300 text-xs">
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">name</td>
                  <td class="py-2.5 pr-4">string</td>
                  <td class="py-2.5 pr-4">Yes</td>
                  <td class="py-2.5">Span name (e.g. <code class="bg-gray-800 px-1 rounded">llm-call</code>, <code class="bg-gray-800 px-1 rounded">tool-use</code>).</td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">status</td>
                  <td class="py-2.5 pr-4">string</td>
                  <td class="py-2.5 pr-4">Yes</td>
                  <td class="py-2.5"><code class="bg-gray-800 px-1 rounded">ok</code> | <code class="bg-gray-800 px-1 rounded">error</code></td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">started_at</td>
                  <td class="py-2.5 pr-4">string</td>
                  <td class="py-2.5 pr-4">Yes</td>
                  <td class="py-2.5">ISO 8601 timestamp.</td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">ended_at</td>
                  <td class="py-2.5 pr-4">string | null</td>
                  <td class="py-2.5 pr-4">No</td>
                  <td class="py-2.5">ISO 8601 end timestamp.</td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">input</td>
                  <td class="py-2.5 pr-4">any | null</td>
                  <td class="py-2.5 pr-4">No</td>
                  <td class="py-2.5">Arbitrary JSON input (prompt, tool args, etc.).</td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">output</td>
                  <td class="py-2.5 pr-4">any | null</td>
                  <td class="py-2.5 pr-4">No</td>
                  <td class="py-2.5">Arbitrary JSON output (model response, tool result, etc.).</td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">error</td>
                  <td class="py-2.5 pr-4">string | null</td>
                  <td class="py-2.5 pr-4">No</td>
                  <td class="py-2.5">Error message string (set when status is <code class="bg-gray-800 px-1 rounded">error</code>).</td>
                </tr>
                <tr>
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">parent_span_id</td>
                  <td class="py-2.5 pr-4">string | null</td>
                  <td class="py-2.5 pr-4">No</td>
                  <td class="py-2.5">ID of parent span for nested waterfall display.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="text-base font-semibold text-white mt-6 mb-3">Error responses</h3>
          <div class="space-y-2 text-sm">
            <div class="flex gap-3">
              <span class="text-yellow-400 font-mono font-semibold w-8">400</span>
              <span class="text-gray-300">Invalid input</span>
            </div>
            <div class="flex gap-3">
              <span class="text-red-400 font-mono font-semibold w-8">401</span>
              <span class="text-gray-300">Invalid or revoked API key</span>
            </div>
            <div class="flex gap-3">
              <span class="text-gray-400 font-mono font-semibold w-8">404</span>
              <span class="text-gray-300">Trace not found or not owned by this API key</span>
            </div>
          </div>
        </section>

        <!-- PATCH /api/v1/traces/:id -->
        <section id="patch-trace">
          <h2 class="text-2xl font-bold text-white mb-4 pb-2 border-b border-gray-800">PATCH /api/v1/traces/:id</h2>
          <p class="text-gray-300 mb-6">Finalize a trace. Used to update status and set <code class="bg-gray-900 text-indigo-300 px-1.5 py-0.5 rounded text-sm font-mono">ended_at</code> when the trace completes.</p>

          <div class="grid sm:grid-cols-2 gap-4 mb-6">
            <div class="bg-gray-900 rounded-xl p-4">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Request</p>
              <pre class="text-xs font-mono text-gray-300 overflow-x-auto">PATCH /api/v1/traces/:trace_id
Authorization: Bearer &lt;key&gt;
Content-Type: application/json

{
  "status": "success",
  "ended_at": "2026-04-06T12:00:05Z"
}</pre>
            </div>
            <div class="bg-gray-900 rounded-xl p-4">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Response <span class="text-green-400">200</span></p>
              <pre class="text-xs font-mono text-gray-300 overflow-x-auto">{
  "ok": true
}</pre>
            </div>
          </div>

          <p class="text-sm text-gray-400">All fields are optional. Only provided fields are updated. Triggers email alert if status is <code class="bg-gray-900 text-indigo-300 px-1.5 py-0.5 rounded text-xs font-mono">error</code> or <code class="bg-gray-900 text-indigo-300 px-1.5 py-0.5 rounded text-xs font-mono">timeout</code> and user is on Pro plan.</p>
        </section>

        <!-- TypeScript SDK -->
        <section id="sdk-typescript">
          <h2 class="text-2xl font-bold text-white mb-4 pb-2 border-b border-gray-800">TypeScript SDK</h2>
          <p class="text-gray-300 mb-6">The official TypeScript/Node.js SDK wraps the REST API with a fluent interface.</p>

          <h3 class="text-base font-semibold text-white mb-3">Installation</h3>
          <div class="bg-gray-900 rounded-xl overflow-hidden mb-6">
            <div class="bg-gray-800 px-4 py-2 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span class="text-xs text-gray-400 ml-2">terminal</span>
            </div>
            <pre class="px-5 py-4 text-sm font-mono text-gray-200">npm install @keylightdigital/nexus</pre>
          </div>

          <h3 class="text-base font-semibold text-white mb-3">Quickstart</h3>
          <div class="bg-gray-900 rounded-xl overflow-hidden mb-6">
            <div class="bg-gray-800 px-4 py-2 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span class="text-xs text-gray-400 ml-2">agent.ts</span>
            </div>
            <pre class="px-5 py-4 text-sm font-mono text-gray-200 overflow-x-auto"><span class="text-indigo-400">import</span> <span class="text-gray-200">{ NexusClient }</span> <span class="text-indigo-400">from</span> <span class="text-green-300">'@keylightdigital/nexus'</span>

<span class="text-indigo-400">const</span> nexus = <span class="text-indigo-400">new</span> <span class="text-yellow-300">NexusClient</span>({
  apiKey: process.env.<span class="text-indigo-300">NEXUS_API_KEY</span>,
  agentId: <span class="text-green-300">'my-assistant'</span>,
})

<span class="text-indigo-400">const</span> trace = <span class="text-indigo-400">await</span> nexus.<span class="text-yellow-300">startTrace</span>({ name: <span class="text-green-300">'user-query'</span> })

<span class="text-gray-500">// Add a span for each step</span>
<span class="text-indigo-400">await</span> trace.<span class="text-yellow-300">addSpan</span>({
  name: <span class="text-green-300">'llm-call'</span>,
  input: { prompt },
  output: { text: response },
})

<span class="text-gray-500">// Finalize the trace</span>
<span class="text-indigo-400">await</span> trace.<span class="text-yellow-300">end</span>({ status: <span class="text-green-300">'success'</span> })</pre>
          </div>

          <h3 class="text-base font-semibold text-white mb-3">Configuration options</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left text-gray-400 border-b border-gray-800">
                  <th class="pb-2 pr-4 font-medium">Option</th>
                  <th class="pb-2 pr-4 font-medium">Type</th>
                  <th class="pb-2 pr-4 font-medium">Required</th>
                  <th class="pb-2 font-medium">Default</th>
                </tr>
              </thead>
              <tbody class="text-gray-300 text-xs">
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">apiKey</td>
                  <td class="py-2.5 pr-4">string</td>
                  <td class="py-2.5 pr-4">Yes</td>
                  <td class="py-2.5">—</td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">agentId</td>
                  <td class="py-2.5 pr-4">string</td>
                  <td class="py-2.5 pr-4">Yes</td>
                  <td class="py-2.5">—</td>
                </tr>
                <tr>
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">baseUrl</td>
                  <td class="py-2.5 pr-4">string</td>
                  <td class="py-2.5 pr-4">No</td>
                  <td class="py-2.5"><code class="bg-gray-900 px-1 rounded">https://nexus.keylightdigital.dev</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="text-sm text-gray-400 mt-4">
            Source: <a href="https://github.com/scobb/nexus/tree/main/sdk" class="text-indigo-400 hover:text-indigo-300">github.com/scobb/nexus/sdk</a>
          </p>
        </section>

        <!-- Python SDK -->
        <section id="sdk-python">
          <h2 class="text-2xl font-bold text-white mb-4 pb-2 border-b border-gray-800">Python SDK</h2>
          <p class="text-gray-300 mb-6">The Python SDK mirrors the TypeScript API and uses only the standard library — no extra dependencies.</p>

          <h3 class="text-base font-semibold text-white mb-3">Installation</h3>
          <div class="bg-gray-900 rounded-xl overflow-hidden mb-6">
            <div class="bg-gray-800 px-4 py-2 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span class="text-xs text-gray-400 ml-2">terminal</span>
            </div>
            <pre class="px-5 py-4 text-sm font-mono text-gray-200">pip install nexus-agent</pre>
          </div>

          <h3 class="text-base font-semibold text-white mb-3">Quickstart</h3>
          <div class="bg-gray-900 rounded-xl overflow-hidden mb-6">
            <div class="bg-gray-800 px-4 py-2 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span class="text-xs text-gray-400 ml-2">agent.py</span>
            </div>
            <pre class="px-5 py-4 text-sm font-mono text-gray-200 overflow-x-auto"><span class="text-indigo-400">import</span> <span class="text-gray-200">os</span>
<span class="text-indigo-400">from</span> <span class="text-gray-200">nexus_agent</span> <span class="text-indigo-400">import</span> <span class="text-gray-200">NexusClient</span>

nexus = <span class="text-yellow-300">NexusClient</span>(
    api_key=os.environ[<span class="text-green-300">"NEXUS_API_KEY"</span>],
    agent_id=<span class="text-green-300">"my-assistant"</span>,
)

trace = nexus.<span class="text-yellow-300">start_trace</span>(name=<span class="text-green-300">"user-query"</span>)

<span class="text-gray-500"># Add a span for each step</span>
trace.<span class="text-yellow-300">add_span</span>(
    name=<span class="text-green-300">"llm-call"</span>,
    input={<span class="text-green-300">"prompt"</span>: prompt},
    output={<span class="text-green-300">"text"</span>: response},
)

<span class="text-gray-500"># Finalize the trace</span>
trace.<span class="text-yellow-300">end</span>(status=<span class="text-green-300">"success"</span>)</pre>
          </div>

          <h3 class="text-base font-semibold text-white mb-3">Configuration options</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left text-gray-400 border-b border-gray-800">
                  <th class="pb-2 pr-4 font-medium">Parameter</th>
                  <th class="pb-2 pr-4 font-medium">Type</th>
                  <th class="pb-2 pr-4 font-medium">Required</th>
                  <th class="pb-2 font-medium">Default</th>
                </tr>
              </thead>
              <tbody class="text-gray-300 text-xs">
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">api_key</td>
                  <td class="py-2.5 pr-4">str</td>
                  <td class="py-2.5 pr-4">Yes</td>
                  <td class="py-2.5">—</td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">agent_id</td>
                  <td class="py-2.5 pr-4">str</td>
                  <td class="py-2.5 pr-4">Yes</td>
                  <td class="py-2.5">—</td>
                </tr>
                <tr>
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">base_url</td>
                  <td class="py-2.5 pr-4">str</td>
                  <td class="py-2.5 pr-4">No</td>
                  <td class="py-2.5"><code class="bg-gray-900 px-1 rounded">https://nexus.keylightdigital.dev</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="text-sm text-gray-400 mt-4">
            Source: <a href="https://github.com/scobb/nexus/tree/main/sdk-python" class="text-indigo-400 hover:text-indigo-300">github.com/scobb/nexus/sdk-python</a>
          </p>
        </section>

        <!-- Footer CTA -->
        <section class="border-t border-gray-800 pt-12 text-center">
          <p class="text-gray-400 mb-4">Ready to instrument your agents?</p>
          <a href="/register" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors">Start free</a>
          <p class="text-sm text-gray-600 mt-3">No credit card required. 1,000 traces/month free forever.</p>
        </section>

      </main>
    </div>
  </div>

</body>
</html>`
}
