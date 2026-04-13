export function apiReferencePage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Reference — Nexus AI Agent Observability</title>
  <meta name="description" content="Complete Nexus REST API reference. Every endpoint, request/response schemas, authentication, rate limits, error codes, and copy-paste curl examples.">
  <link rel="canonical" href="https://nexus.keylightdigital.dev/docs/api-reference">
  <!-- Open Graph -->
  <meta property="og:title" content="API Reference — Nexus">
  <meta property="og:description" content="Complete Nexus REST API reference. Every endpoint with curl examples, schemas, and error codes.">
  <meta property="og:url" content="https://nexus.keylightdigital.dev/docs/api-reference">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://nexus.keylightdigital.dev/og-image.png">
  <meta property="og:site_name" content="Nexus">
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <!-- Beam Analytics (dogfooding) -->
  <script defer src="https://beam-privacy.com/js/beam.js" data-site-id="dee2fad9-ca65-4746-aa74-6480534507ef"></script>
</head>
<body class="bg-gray-950 text-white min-h-screen">
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- Nav -->
  <nav class="border-b border-gray-800 px-4 py-4">
    <div class="max-w-5xl mx-auto flex items-center justify-between">
      <a href="/" class="text-lg font-bold text-indigo-400">Nexus</a>
      <div class="hidden sm:flex items-center gap-4">
        <a href="/docs" class="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>
        <a href="/docs/api-reference" class="text-sm text-white font-medium">API Reference</a>
        <a href="/demo" class="text-sm text-gray-400 hover:text-white transition-colors">Demo</a>
        <a href="/auth/login" class="text-sm text-gray-400 hover:text-white transition-colors">Sign in</a>
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">Start free</a>
      </div>
      <div class="flex sm:hidden items-center gap-2">
        <a href="/register" class="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-medium transition-colors">Start free</a>
        <button onclick="var m=document.getElementById('apiref-mnav');m.classList.toggle('hidden')" class="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Open navigation menu">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
    <div id="apiref-mnav" class="hidden sm:hidden max-w-5xl mx-auto border-t border-gray-800 mt-3 pt-2 pb-1 space-y-0.5">
      <a href="/docs" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Docs</a>
      <a href="/docs/api-reference" class="block px-2 py-2.5 text-sm text-white font-medium bg-gray-800 rounded-lg">API Reference</a>
      <a href="/demo" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Demo</a>
      <a href="/auth/login" class="block px-2 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">Sign in</a>
    </div>
  </nav>

  <div class="max-w-5xl mx-auto px-4 py-10">
    <div class="flex gap-8">

      <!-- Sidebar TOC -->
      <aside class="hidden md:block w-52 flex-shrink-0">
        <nav class="sticky top-8 space-y-0.5">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">On this page</p>
          <a href="#overview" class="block text-sm text-gray-400 hover:text-white py-1 transition-colors">Overview</a>
          <a href="#authentication" class="block text-sm text-gray-400 hover:text-white py-1 transition-colors">Authentication</a>
          <a href="#rate-limits" class="block text-sm text-gray-400 hover:text-white py-1 transition-colors">Rate Limits</a>
          <a href="#errors" class="block text-sm text-gray-400 hover:text-white py-1 transition-colors">Error Codes</a>
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 mt-4">Endpoints</p>
          <a href="#post-traces" class="block text-sm text-gray-400 hover:text-white py-1 pl-2 transition-colors">POST /traces</a>
          <a href="#post-spans" class="block text-sm text-gray-400 hover:text-white py-1 pl-2 transition-colors">POST /traces/:id/spans</a>
          <a href="#patch-trace" class="block text-sm text-gray-400 hover:text-white py-1 pl-2 transition-colors">PATCH /traces/:id</a>
          <a href="#get-trace" class="block text-sm text-gray-400 hover:text-white py-1 pl-2 transition-colors">GET /traces/:id</a>
          <a href="#get-health" class="block text-sm text-gray-400 hover:text-white py-1 pl-2 transition-colors">GET /health</a>
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 mt-4">Try It</p>
          <a href="#playground" class="block text-sm text-gray-400 hover:text-white py-1 transition-colors">Playground</a>
          <div class="border-t border-gray-800 mt-4 pt-4 space-y-0.5">
            <a href="/docs" class="block text-sm text-gray-400 hover:text-white py-1 transition-colors">← Docs &amp; SDKs</a>
            <a href="/changelog" class="block text-sm text-gray-400 hover:text-white py-1 transition-colors">Changelog</a>
          </div>
        </nav>
      </aside>

      <!-- Main content -->
      <main id="main-content" class="min-w-0 flex-1 space-y-14">

        <!-- Header -->
        <section id="overview">
          <div class="mb-2">
            <span class="text-xs font-semibold text-indigo-400 uppercase tracking-widest">REST API</span>
          </div>
          <h1 class="text-4xl font-extrabold text-white mb-4">API Reference</h1>
          <p class="text-lg text-gray-400 mb-6">
            The Nexus REST API lets you ingest traces and spans from any language or framework.
            No SDK required — every endpoint accepts plain JSON over HTTPS.
          </p>
          <div class="bg-gray-900 rounded-xl p-4 text-sm">
            <span class="text-gray-500">Base URL</span>
            <code class="ml-3 text-indigo-300 font-mono">https://nexus.keylightdigital.dev</code>
          </div>

          <!-- Quick nav cards -->
          <div class="grid sm:grid-cols-2 gap-3 mt-6">
            <a href="#post-traces" class="group block bg-gray-900 border border-gray-800 hover:border-indigo-500 rounded-xl p-4 transition-colors">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-bold text-green-400 bg-green-950 px-2 py-0.5 rounded font-mono">POST</span>
                <code class="text-sm text-gray-200 font-mono">/api/v1/traces</code>
              </div>
              <p class="text-xs text-gray-400 group-hover:text-gray-300">Create a trace &amp; auto-register an agent</p>
            </a>
            <a href="#post-spans" class="group block bg-gray-900 border border-gray-800 hover:border-indigo-500 rounded-xl p-4 transition-colors">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-bold text-green-400 bg-green-950 px-2 py-0.5 rounded font-mono">POST</span>
                <code class="text-sm text-gray-200 font-mono">/api/v1/traces/:id/spans</code>
              </div>
              <p class="text-xs text-gray-400 group-hover:text-gray-300">Add a span (LLM call, tool use, sub-step)</p>
            </a>
            <a href="#patch-trace" class="group block bg-gray-900 border border-gray-800 hover:border-indigo-500 rounded-xl p-4 transition-colors">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-bold text-yellow-400 bg-yellow-950 px-2 py-0.5 rounded font-mono">PATCH</span>
                <code class="text-sm text-gray-200 font-mono">/api/v1/traces/:id</code>
              </div>
              <p class="text-xs text-gray-400 group-hover:text-gray-300">Finalize a trace — update status &amp; end time</p>
            </a>
            <a href="#get-trace" class="group block bg-gray-900 border border-gray-800 hover:border-indigo-500 rounded-xl p-4 transition-colors">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded font-mono">GET</span>
                <code class="text-sm text-gray-200 font-mono">/api/v1/traces/:id</code>
              </div>
              <p class="text-xs text-gray-400 group-hover:text-gray-300">Retrieve a trace and all its spans</p>
            </a>
          </div>
        </section>

        <!-- Authentication -->
        <section id="authentication">
          <h2 class="text-2xl font-bold text-white mb-1">Authentication</h2>
          <p class="text-sm text-gray-500 mb-4">Required on all <code class="bg-gray-900 px-1.5 py-0.5 rounded text-xs font-mono">/api/v1/*</code> endpoints</p>
          <p class="text-gray-300 mb-4">
            Pass your API key as a Bearer token in the <code class="bg-gray-900 text-indigo-300 px-1.5 py-0.5 rounded text-sm font-mono">Authorization</code> header on every request.
          </p>

          <div class="bg-gray-900 rounded-xl overflow-hidden mb-6">
            <div class="bg-gray-800 px-4 py-2 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span class="text-xs text-gray-400 ml-2">HTTP header</span>
            </div>
            <pre class="px-5 py-4 text-sm font-mono text-gray-200 overflow-x-auto">Authorization: Bearer nxs_a1b2c3d4e5f6...</pre>
          </div>

          <h3 class="text-base font-semibold text-white mb-3">Getting an API key</h3>
          <ol class="list-decimal list-inside space-y-2 text-gray-300 text-sm mb-4">
            <li><a href="/register" class="text-indigo-400 hover:text-indigo-300">Create a free account</a> — no credit card required</li>
            <li>Go to <a href="/dashboard/keys" class="text-indigo-400 hover:text-indigo-300">Dashboard → API Keys</a></li>
            <li>Click <strong class="text-white">Create new key</strong> and give it a name</li>
            <li>Copy the key — it is shown exactly once</li>
            <li>Store it in your environment: <code class="bg-gray-900 text-indigo-300 px-1.5 py-0.5 rounded text-xs font-mono">NEXUS_API_KEY=nxs_...</code></li>
          </ol>

          <div class="bg-yellow-950 border border-yellow-800 rounded-xl px-4 py-3 text-sm text-yellow-200">
            <strong class="text-yellow-300">Security note:</strong> Keys are stored as SHA-256 hashes. If you lose a key, revoke it and create a new one.
          </div>
        </section>

        <!-- Rate Limits -->
        <section id="rate-limits">
          <h2 class="text-2xl font-bold text-white mb-1">Rate Limits &amp; Plan Limits</h2>
          <p class="text-sm text-gray-500 mb-4">Limits reset on the 1st of each calendar month (UTC)</p>

          <div class="overflow-x-auto mb-6">
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
                  <td class="py-3 pr-6">Email alerts (error / timeout)</td>
                  <td class="py-3 pr-6">—</td>
                  <td class="py-3">Included</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="text-base font-semibold text-white mb-3">Rate limit responses</h3>
          <div class="space-y-3">
            <div class="bg-gray-900 rounded-xl p-4 text-sm">
              <p class="text-gray-300 mb-2"><strong class="text-red-400 font-mono">429 Too Many Requests</strong> — monthly trace limit reached:</p>
              <pre class="text-xs font-mono text-gray-400 overflow-x-auto">{
  "error": "Monthly trace limit reached. Upgrade to Pro.",
  "limit": 1000,
  "current": 1001,
  "upgrade_url": "/dashboard/billing"
}</pre>
            </div>
            <div class="bg-gray-900 rounded-xl p-4 text-sm">
              <p class="text-gray-300 mb-2"><strong class="text-orange-400 font-mono">403 Forbidden</strong> — agent limit reached (Free plan):</p>
              <pre class="text-xs font-mono text-gray-400 overflow-x-auto">{
  "error": "Free plan limited to 1 agent",
  "upgrade_url": "/dashboard/billing"
}</pre>
            </div>
          </div>
        </section>

        <!-- Error Codes -->
        <section id="errors">
          <h2 class="text-2xl font-bold text-white mb-1">Error Codes</h2>
          <p class="text-sm text-gray-500 mb-4">All error responses include a JSON body with an <code class="bg-gray-900 px-1.5 py-0.5 rounded text-xs font-mono">error</code> field</p>

          <div class="overflow-x-auto mb-6">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left text-gray-400 border-b border-gray-800">
                  <th class="pb-3 pr-4 font-medium w-16">Code</th>
                  <th class="pb-3 pr-4 font-medium">Meaning</th>
                  <th class="pb-3 font-medium">Example response</th>
                </tr>
              </thead>
              <tbody class="text-gray-300 align-top">
                <tr class="border-b border-gray-800/50">
                  <td class="py-3 pr-4 font-mono font-semibold text-yellow-400">400</td>
                  <td class="py-3 pr-4">Invalid request — missing or malformed fields</td>
                  <td class="py-3"><code class="text-xs font-mono text-gray-400 break-all">{"error":"Validation failed","fields":{"agent_id":"Required"}}</code></td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-3 pr-4 font-mono font-semibold text-red-400">401</td>
                  <td class="py-3 pr-4">Missing, invalid, or revoked API key</td>
                  <td class="py-3"><code class="text-xs font-mono text-gray-400">{"error":"Invalid API key"}</code></td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-3 pr-4 font-mono font-semibold text-orange-400">403</td>
                  <td class="py-3 pr-4">Plan limit reached (agent count on Free plan)</td>
                  <td class="py-3"><code class="text-xs font-mono text-gray-400 break-all">{"error":"Free plan limited to 1 agent","upgrade_url":"/dashboard/billing"}</code></td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-3 pr-4 font-mono font-semibold text-gray-400">404</td>
                  <td class="py-3 pr-4">Trace not found or not owned by this key</td>
                  <td class="py-3"><code class="text-xs font-mono text-gray-400">{"error":"Trace not found"}</code></td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-3 pr-4 font-mono font-semibold text-red-400">429</td>
                  <td class="py-3 pr-4">Monthly trace limit reached</td>
                  <td class="py-3"><code class="text-xs font-mono text-gray-400 break-all">{"error":"Monthly trace limit reached...","limit":1000,"current":1001}</code></td>
                </tr>
                <tr>
                  <td class="py-3 pr-4 font-mono font-semibold text-red-500">500</td>
                  <td class="py-3 pr-4">Internal server error — transient, safe to retry</td>
                  <td class="py-3"><code class="text-xs font-mono text-gray-400">{"error":"Internal server error"}</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- POST /api/v1/traces -->
        <section id="post-traces">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-sm font-bold text-green-400 bg-green-950 px-3 py-1 rounded font-mono">POST</span>
            <code class="text-xl font-mono text-white">/api/v1/traces</code>
          </div>
          <p class="text-gray-300 mb-1">Create a new trace. Agents are auto-created on first use — no separate registration step required.</p>
          <p class="text-xs text-gray-500 mb-6">Requires authentication · Returns <strong class="text-green-400">201 Created</strong></p>

          <!-- Request / Response -->
          <div class="grid sm:grid-cols-2 gap-4 mb-6">
            <div class="bg-gray-900 rounded-xl p-4">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Request body</p>
              <pre class="text-xs font-mono text-gray-300 overflow-x-auto">{
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
  "trace_id": "f47ac10b-58cc-4372-..."
}</pre>
            </div>
          </div>

          <!-- Fields table -->
          <h3 class="text-base font-semibold text-white mb-3">Request fields</h3>
          <div class="overflow-x-auto mb-6">
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
                  <td class="py-2.5 pr-4 text-red-400">Yes</td>
                  <td class="py-2.5">Your agent's identifier (e.g. <code class="bg-gray-800 px-1 rounded">my-assistant</code>). Auto-created on first use.</td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">name</td>
                  <td class="py-2.5 pr-4">string</td>
                  <td class="py-2.5 pr-4 text-red-400">Yes</td>
                  <td class="py-2.5">Human-readable trace name — the task or query being handled.</td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">status</td>
                  <td class="py-2.5 pr-4">string</td>
                  <td class="py-2.5 pr-4 text-red-400">Yes</td>
                  <td class="py-2.5"><code class="bg-gray-800 px-1 rounded">running</code> · <code class="bg-gray-800 px-1 rounded">success</code> · <code class="bg-gray-800 px-1 rounded">error</code> · <code class="bg-gray-800 px-1 rounded">timeout</code></td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">started_at</td>
                  <td class="py-2.5 pr-4">string</td>
                  <td class="py-2.5 pr-4 text-red-400">Yes</td>
                  <td class="py-2.5">ISO 8601 timestamp — <code class="bg-gray-800 px-1 rounded">2026-04-06T12:00:00Z</code></td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">ended_at</td>
                  <td class="py-2.5 pr-4">string | null</td>
                  <td class="py-2.5 pr-4 text-gray-500">No</td>
                  <td class="py-2.5">ISO 8601 end timestamp. Omit or set <code class="bg-gray-800 px-1 rounded">null</code> while trace is running.</td>
                </tr>
                <tr>
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">metadata</td>
                  <td class="py-2.5 pr-4">object | null</td>
                  <td class="py-2.5 pr-4 text-gray-500">No</td>
                  <td class="py-2.5">Arbitrary JSON — stored and displayed in trace viewer.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- curl example -->
          <h3 class="text-base font-semibold text-white mb-3">curl example</h3>
          <div class="bg-gray-900 rounded-xl overflow-hidden mb-4">
            <div class="bg-gray-800 px-4 py-2 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span class="text-xs text-gray-400 ml-2">terminal</span>
            </div>
            <pre class="px-5 py-4 text-sm font-mono text-gray-200 overflow-x-auto">curl -s -X POST https://nexus.keylightdigital.dev/api/v1/traces \\
  -H "Authorization: Bearer $NEXUS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_id": "my-assistant",
    "name": "user-query",
    "status": "running",
    "started_at": "2026-04-06T12:00:00Z"
  }'

# Response
# {"trace_id":"f47ac10b-58cc-4372-..."}</pre>
          </div>

          <!-- Error responses -->
          <h3 class="text-base font-semibold text-white mb-2">Error responses</h3>
          <div class="space-y-1 text-sm">
            <div class="flex gap-3 py-1"><span class="font-mono font-semibold text-yellow-400 w-8">400</span><span class="text-gray-300">Validation failed — missing or invalid fields</span></div>
            <div class="flex gap-3 py-1"><span class="font-mono font-semibold text-red-400 w-8">401</span><span class="text-gray-300">Invalid or revoked API key</span></div>
            <div class="flex gap-3 py-1"><span class="font-mono font-semibold text-orange-400 w-8">403</span><span class="text-gray-300">Agent limit reached (Free plan: 1 agent max)</span></div>
            <div class="flex gap-3 py-1"><span class="font-mono font-semibold text-red-400 w-8">429</span><span class="text-gray-300">Monthly trace limit reached (Free: 1,000 / month)</span></div>
          </div>
        </section>

        <!-- POST /api/v1/traces/:id/spans -->
        <section id="post-spans">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-sm font-bold text-green-400 bg-green-950 px-3 py-1 rounded font-mono">POST</span>
            <code class="text-xl font-mono text-white break-all">/api/v1/traces/:trace_id/spans</code>
          </div>
          <p class="text-gray-300 mb-1">Add a span to an existing trace. Spans represent individual sub-steps — LLM calls, tool uses, sub-agent invocations, or any discrete unit of work.</p>
          <p class="text-xs text-gray-500 mb-6">Requires authentication · Returns <strong class="text-green-400">201 Created</strong></p>

          <div class="grid sm:grid-cols-2 gap-4 mb-6">
            <div class="bg-gray-900 rounded-xl p-4">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Request body</p>
              <pre class="text-xs font-mono text-gray-300 overflow-x-auto">{
  "name": "llm-call",
  "status": "ok",
  "started_at": "2026-04-06T12:00:01Z",
  "ended_at": "2026-04-06T12:00:02Z",
  "input": { "prompt": "Summarize this..." },
  "output": { "text": "Here is a summary..." },
  "error": null,
  "parent_span_id": null
}</pre>
            </div>
            <div class="bg-gray-900 rounded-xl p-4">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Response <span class="text-green-400">201</span></p>
              <pre class="text-xs font-mono text-gray-300 overflow-x-auto">{
  "span_id": "a1b2c3d4-e5f6-..."
}</pre>
            </div>
          </div>

          <h3 class="text-base font-semibold text-white mb-3">Request fields</h3>
          <div class="overflow-x-auto mb-6">
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
                  <td class="py-2.5 pr-4 text-red-400">Yes</td>
                  <td class="py-2.5">Span label — e.g. <code class="bg-gray-800 px-1 rounded">llm-call</code>, <code class="bg-gray-800 px-1 rounded">tool-use</code>, <code class="bg-gray-800 px-1 rounded">retrieval</code></td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">status</td>
                  <td class="py-2.5 pr-4">string</td>
                  <td class="py-2.5 pr-4 text-red-400">Yes</td>
                  <td class="py-2.5"><code class="bg-gray-800 px-1 rounded">ok</code> · <code class="bg-gray-800 px-1 rounded">error</code></td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">started_at</td>
                  <td class="py-2.5 pr-4">string</td>
                  <td class="py-2.5 pr-4 text-red-400">Yes</td>
                  <td class="py-2.5">ISO 8601 timestamp</td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">ended_at</td>
                  <td class="py-2.5 pr-4">string | null</td>
                  <td class="py-2.5 pr-4 text-gray-500">No</td>
                  <td class="py-2.5">ISO 8601 end timestamp</td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">input</td>
                  <td class="py-2.5 pr-4">any | null</td>
                  <td class="py-2.5 pr-4 text-gray-500">No</td>
                  <td class="py-2.5">Arbitrary JSON — prompt text, tool arguments, etc.</td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">output</td>
                  <td class="py-2.5 pr-4">any | null</td>
                  <td class="py-2.5 pr-4 text-gray-500">No</td>
                  <td class="py-2.5">Arbitrary JSON — model response, tool result, etc.</td>
                </tr>
                <tr class="border-b border-gray-800/50">
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">error</td>
                  <td class="py-2.5 pr-4">string | null</td>
                  <td class="py-2.5 pr-4 text-gray-500">No</td>
                  <td class="py-2.5">Error message string when status is <code class="bg-gray-800 px-1 rounded">error</code></td>
                </tr>
                <tr>
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">parent_span_id</td>
                  <td class="py-2.5 pr-4">string | null</td>
                  <td class="py-2.5 pr-4 text-gray-500">No</td>
                  <td class="py-2.5">ID of a parent span — enables nested waterfall display</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="text-base font-semibold text-white mb-3">curl example</h3>
          <div class="bg-gray-900 rounded-xl overflow-hidden mb-4">
            <div class="bg-gray-800 px-4 py-2 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span class="text-xs text-gray-400 ml-2">terminal</span>
            </div>
            <pre class="px-5 py-4 text-sm font-mono text-gray-200 overflow-x-auto">curl -s -X POST https://nexus.keylightdigital.dev/api/v1/traces/TRACE_ID/spans \\
  -H "Authorization: Bearer $NEXUS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "llm-call",
    "status": "ok",
    "started_at": "2026-04-06T12:00:01Z",
    "ended_at": "2026-04-06T12:00:02Z",
    "input": { "prompt": "Summarize this document" },
    "output": { "text": "Here is the summary..." }
  }'

# Response
# {"span_id":"a1b2c3d4-e5f6-..."}</pre>
          </div>

          <h3 class="text-base font-semibold text-white mb-2">Error responses</h3>
          <div class="space-y-1 text-sm">
            <div class="flex gap-3 py-1"><span class="font-mono font-semibold text-yellow-400 w-8">400</span><span class="text-gray-300">Validation failed — missing or invalid fields</span></div>
            <div class="flex gap-3 py-1"><span class="font-mono font-semibold text-red-400 w-8">401</span><span class="text-gray-300">Invalid or revoked API key</span></div>
            <div class="flex gap-3 py-1"><span class="font-mono font-semibold text-gray-400 w-8">404</span><span class="text-gray-300">Trace not found or not owned by this API key</span></div>
          </div>
        </section>

        <!-- PATCH /api/v1/traces/:id -->
        <section id="patch-trace">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-sm font-bold text-yellow-400 bg-yellow-950 px-3 py-1 rounded font-mono">PATCH</span>
            <code class="text-xl font-mono text-white break-all">/api/v1/traces/:trace_id</code>
          </div>
          <p class="text-gray-300 mb-1">Finalize a trace — update its status and set the end time. All fields are optional; only provided fields are updated.</p>
          <p class="text-xs text-gray-500 mb-6">Requires authentication · Returns <strong class="text-green-400">200 OK</strong> · Triggers Pro email alert on <code class="bg-gray-900 px-1.5 py-0.5 rounded text-xs font-mono">error</code>/<code class="bg-gray-900 px-1.5 py-0.5 rounded text-xs font-mono">timeout</code></p>

          <div class="grid sm:grid-cols-2 gap-4 mb-6">
            <div class="bg-gray-900 rounded-xl p-4">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Request body</p>
              <pre class="text-xs font-mono text-gray-300 overflow-x-auto">{
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

          <h3 class="text-base font-semibold text-white mb-3">Request fields</h3>
          <div class="overflow-x-auto mb-6">
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
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">status</td>
                  <td class="py-2.5 pr-4">string</td>
                  <td class="py-2.5 pr-4 text-gray-500">No</td>
                  <td class="py-2.5"><code class="bg-gray-800 px-1 rounded">running</code> · <code class="bg-gray-800 px-1 rounded">success</code> · <code class="bg-gray-800 px-1 rounded">error</code> · <code class="bg-gray-800 px-1 rounded">timeout</code></td>
                </tr>
                <tr>
                  <td class="py-2.5 pr-4 font-mono text-indigo-300">ended_at</td>
                  <td class="py-2.5 pr-4">string | null</td>
                  <td class="py-2.5 pr-4 text-gray-500">No</td>
                  <td class="py-2.5">ISO 8601 end timestamp</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="text-base font-semibold text-white mb-3">curl example</h3>
          <div class="bg-gray-900 rounded-xl overflow-hidden mb-4">
            <div class="bg-gray-800 px-4 py-2 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span class="text-xs text-gray-400 ml-2">terminal</span>
            </div>
            <pre class="px-5 py-4 text-sm font-mono text-gray-200 overflow-x-auto">curl -s -X PATCH https://nexus.keylightdigital.dev/api/v1/traces/TRACE_ID \\
  -H "Authorization: Bearer $NEXUS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"status": "success", "ended_at": "2026-04-06T12:00:05Z"}'

# Response
# {"ok":true}</pre>
          </div>

          <h3 class="text-base font-semibold text-white mb-2">Error responses</h3>
          <div class="space-y-1 text-sm">
            <div class="flex gap-3 py-1"><span class="font-mono font-semibold text-yellow-400 w-8">400</span><span class="text-gray-300">Invalid status value or timestamp format</span></div>
            <div class="flex gap-3 py-1"><span class="font-mono font-semibold text-red-400 w-8">401</span><span class="text-gray-300">Invalid or revoked API key</span></div>
            <div class="flex gap-3 py-1"><span class="font-mono font-semibold text-gray-400 w-8">404</span><span class="text-gray-300">Trace not found or not owned by this API key</span></div>
          </div>
        </section>

        <!-- GET /api/v1/traces/:id -->
        <section id="get-trace">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-sm font-bold text-blue-400 bg-blue-950 px-3 py-1 rounded font-mono">GET</span>
            <code class="text-xl font-mono text-white break-all">/api/v1/traces/:trace_id</code>
          </div>
          <p class="text-gray-300 mb-1">Retrieve a trace by ID, including all its spans. Useful for verifying ingestion or building custom UIs.</p>
          <p class="text-xs text-gray-500 mb-6">Requires authentication · Returns <strong class="text-green-400">200 OK</strong></p>

          <div class="bg-gray-900 rounded-xl p-4 mb-6">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Response <span class="text-green-400">200</span></p>
            <pre class="text-xs font-mono text-gray-300 overflow-x-auto">{
  "id": "f47ac10b-58cc-4372-...",
  "agent_id": "my-assistant",
  "name": "user-query-2026-04-06",
  "status": "success",
  "started_at": "2026-04-06T12:00:00Z",
  "ended_at": "2026-04-06T12:00:05Z",
  "metadata": { "user_id": "u_123" },
  "spans": [
    {
      "id": "a1b2c3d4-...",
      "name": "llm-call",
      "status": "ok",
      "started_at": "2026-04-06T12:00:01Z",
      "ended_at": "2026-04-06T12:00:02Z",
      "input": { "prompt": "..." },
      "output": { "text": "..." },
      "error": null,
      "parent_span_id": null
    }
  ]
}</pre>
          </div>

          <h3 class="text-base font-semibold text-white mb-3">curl example</h3>
          <div class="bg-gray-900 rounded-xl overflow-hidden mb-4">
            <div class="bg-gray-800 px-4 py-2 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span class="text-xs text-gray-400 ml-2">terminal</span>
            </div>
            <pre class="px-5 py-4 text-sm font-mono text-gray-200 overflow-x-auto">curl -s https://nexus.keylightdigital.dev/api/v1/traces/TRACE_ID \\
  -H "Authorization: Bearer $NEXUS_API_KEY"

# Returns the full trace object with spans array</pre>
          </div>

          <h3 class="text-base font-semibold text-white mb-2">Error responses</h3>
          <div class="space-y-1 text-sm">
            <div class="flex gap-3 py-1"><span class="font-mono font-semibold text-red-400 w-8">401</span><span class="text-gray-300">Invalid or revoked API key</span></div>
            <div class="flex gap-3 py-1"><span class="font-mono font-semibold text-gray-400 w-8">404</span><span class="text-gray-300">Trace not found or not owned by this API key</span></div>
          </div>
        </section>

        <!-- GET /health -->
        <section id="get-health">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-sm font-bold text-blue-400 bg-blue-950 px-3 py-1 rounded font-mono">GET</span>
            <code class="text-xl font-mono text-white">/health</code>
          </div>
          <p class="text-gray-300 mb-1">Health check endpoint. No authentication required. Returns <code class="bg-gray-900 text-indigo-300 px-1.5 py-0.5 rounded text-sm font-mono">200 OK</code> when the service is up.</p>
          <p class="text-xs text-gray-500 mb-6">Public · No authentication required · Returns <strong class="text-green-400">200 OK</strong></p>

          <div class="bg-gray-900 rounded-xl p-4 mb-6">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Response <span class="text-green-400">200</span></p>
            <pre class="text-xs font-mono text-gray-300 overflow-x-auto">{
  "status": "ok"
}</pre>
          </div>

          <h3 class="text-base font-semibold text-white mb-3">curl example</h3>
          <div class="bg-gray-900 rounded-xl overflow-hidden mb-6">
            <div class="bg-gray-800 px-4 py-2 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span class="text-xs text-gray-400 ml-2">terminal</span>
            </div>
            <pre class="px-5 py-4 text-sm font-mono text-gray-200 overflow-x-auto">curl -s https://nexus.keylightdigital.dev/health

# Response
# {"status":"ok"}</pre>
          </div>
        </section>

        <!-- Playground -->
        <section id="playground">
          <div class="mb-2">
            <span class="text-xs font-semibold text-green-400 uppercase tracking-widest">Interactive</span>
          </div>
          <h2 class="text-2xl font-bold text-white mb-2">API Playground</h2>
          <p class="text-gray-300 mb-6">
            Try the API directly from your browser. Enter your API key, pick an endpoint, and hit Send.
            Your key is stored in <code class="bg-gray-900 text-indigo-300 px-1.5 py-0.5 rounded text-sm font-mono">sessionStorage</code> — cleared automatically when you close the tab.
          </p>

          <div class="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">

            <!-- API key row -->
            <div class="border-b border-gray-800 px-5 py-4">
              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">API Key</label>
              <div class="flex gap-2 flex-wrap">
                <div class="relative flex-1 min-w-0">
                  <input
                    id="pg-api-key"
                    type="password"
                    placeholder="nxs_your_api_key_here"
                    class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-200 focus:outline-none focus:border-indigo-500"
                    autocomplete="off"
                    oninput="pgSaveKey()"
                  >
                </div>
                <button onclick="pgToggleKey()" id="pg-key-toggle" class="px-3 py-2 text-xs text-gray-400 hover:text-white bg-gray-800 border border-gray-700 rounded-lg transition-colors whitespace-nowrap">Show</button>
                <a href="/dashboard/keys" class="px-3 py-2 text-xs text-indigo-400 hover:text-indigo-300 bg-gray-800 border border-gray-700 rounded-lg transition-colors whitespace-nowrap">Get key &rarr;</a>
              </div>
            </div>

            <!-- Endpoint selector -->
            <div class="border-b border-gray-800 px-5 py-4">
              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Endpoint</label>
              <select id="pg-endpoint" onchange="pgSelectEndpoint()" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500">
                <option value="get-health">GET /health &mdash; Health check (no auth required)</option>
                <option value="post-trace">POST /api/v1/traces &mdash; Create trace</option>
                <option value="post-span">POST /api/v1/traces/:id/spans &mdash; Add span</option>
                <option value="patch-trace">PATCH /api/v1/traces/:id &mdash; Finalize trace</option>
                <option value="get-trace">GET /api/v1/traces/:id &mdash; Retrieve trace</option>
              </select>
            </div>

            <!-- Trace ID row (shown for endpoints that need a trace ID) -->
            <div id="pg-traceid-row" class="hidden border-b border-gray-800 px-5 py-4">
              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Trace ID</label>
              <input
                id="pg-trace-id"
                type="text"
                placeholder="e.g. tr_abc123 (from a previous POST /traces response)"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-200 focus:outline-none focus:border-indigo-500"
                oninput="pgUpdateCurl()"
              >
              <p class="text-xs text-gray-500 mt-1.5">Create a trace first with POST /api/v1/traces, then paste the <code class="bg-gray-800 px-1 rounded">id</code> from the response here.</p>
            </div>

            <!-- Request body -->
            <div id="pg-body-row" class="border-b border-gray-800 px-5 py-4">
              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Request Body</label>
              <textarea
                id="pg-body"
                rows="8"
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-200 focus:outline-none focus:border-indigo-500 resize-y"
                oninput="pgUpdateCurl()"
              ></textarea>
            </div>

            <!-- Curl preview -->
            <div class="border-b border-gray-800">
              <div class="bg-gray-800 px-5 py-2 flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span class="text-xs text-gray-400 ml-2">curl equivalent</span>
                <button onclick="pgCopyCurl()" id="pg-copy-btn" class="ml-auto text-xs text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors">Copy</button>
              </div>
              <pre id="pg-curl" class="px-5 py-4 text-xs font-mono text-gray-300 overflow-x-auto whitespace-pre-wrap break-all"></pre>
            </div>

            <!-- Send button -->
            <div class="px-5 py-4 flex items-center gap-3">
              <button onclick="pgSend()" id="pg-send-btn" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors">
                Send Request
              </button>
              <span id="pg-sending" class="hidden text-xs text-gray-400">Sending&hellip;</span>
            </div>

            <!-- Response area -->
            <div id="pg-response-area" class="hidden border-t border-gray-800">
              <div class="px-5 py-3 flex items-center gap-3 border-b border-gray-800 bg-gray-800/40">
                <span class="text-xs font-semibold text-gray-400 uppercase tracking-widest">Response</span>
                <span id="pg-status-badge" class="text-xs font-bold font-mono px-2 py-0.5 rounded"></span>
                <span id="pg-latency" class="text-xs text-gray-500"></span>
              </div>
              <pre id="pg-response-body" class="px-5 py-4 text-xs font-mono text-gray-200 overflow-x-auto whitespace-pre-wrap"></pre>
              <div id="pg-error-hint" class="hidden px-5 pb-4">
                <p id="pg-error-hint-text" class="text-xs text-amber-300 bg-amber-950 border border-amber-800 rounded-lg px-3 py-2"></p>
              </div>
            </div>

          </div>
        </section>

        <!-- Footer links -->
        <div class="border-t border-gray-800 pt-8 flex flex-wrap gap-6 text-sm text-gray-500">
          <a href="/docs" class="hover:text-white transition-colors">← Docs &amp; SDKs</a>
          <a href="/changelog" class="hover:text-white transition-colors">Changelog</a>
          <a href="/pricing" class="hover:text-white transition-colors">Pricing</a>
          <a href="/register" class="hover:text-white transition-colors">Start free</a>
        </div>

      </main>
    </div>
  </div>

  <script>
  (function() {
    var ENDPOINTS = {
      'get-health':  { method: 'GET',   path: '/health',                  auth: false, body: null },
      'post-trace':  { method: 'POST',  path: '/api/v1/traces',           auth: true,  body: '{\\n  "agent_name": "my-agent",\\n  "input": "What is the weather in Paris?",\\n  "metadata": { "model": "claude-3-5-sonnet" }\\n}' },
      'post-span':   { method: 'POST',  path: '/api/v1/traces/{id}/spans', auth: true,  body: '{\\n  "type": "llm_call",\\n  "name": "Claude generate",\\n  "input": "What is the weather in Paris?",\\n  "output": "The weather in Paris is sunny and 18\\u00b0C.",\\n  "duration_ms": 1234\\n}' },
      'patch-trace': { method: 'PATCH', path: '/api/v1/traces/{id}',      auth: true,  body: '{\\n  "status": "completed",\\n  "output": "Done. Here is the result."\\n}' },
      'get-trace':   { method: 'GET',   path: '/api/v1/traces/{id}',      auth: true,  body: null }
    };
    var BASE = 'https://nexus.keylightdigital.dev';

    function pgGetKey() { return document.getElementById('pg-api-key').value.trim(); }
    function pgGetTraceId() { return document.getElementById('pg-trace-id').value.trim() || 'TRACE_ID'; }
    function pgResolvePath(ep) { return ep.path.replace('{id}', pgGetTraceId()); }

    window.pgSaveKey = function() {
      try { sessionStorage.setItem('nexus_pg_key', document.getElementById('pg-api-key').value); } catch(e) {}
      pgUpdateCurl();
    };

    window.pgToggleKey = function() {
      var inp = document.getElementById('pg-api-key');
      var btn = document.getElementById('pg-key-toggle');
      if (inp.type === 'password') { inp.type = 'text'; btn.textContent = 'Hide'; }
      else { inp.type = 'password'; btn.textContent = 'Show'; }
    };

    window.pgSelectEndpoint = function() {
      var sel = document.getElementById('pg-endpoint').value;
      var ep = ENDPOINTS[sel];
      var bodyRow = document.getElementById('pg-body-row');
      var traceRow = document.getElementById('pg-traceid-row');
      var bodyEl = document.getElementById('pg-body');
      var needsId = ep.path.indexOf('{id}') !== -1;
      if (needsId) { traceRow.classList.remove('hidden'); } else { traceRow.classList.add('hidden'); }
      if (ep.body !== null) {
        bodyRow.classList.remove('hidden');
        if (bodyEl.dataset.auto !== 'false') { bodyEl.value = ep.body; bodyEl.dataset.auto = 'true'; }
      } else {
        bodyRow.classList.add('hidden');
      }
      pgUpdateCurl();
    };

    window.pgUpdateCurl = function() {
      var sel = document.getElementById('pg-endpoint').value;
      var ep = ENDPOINTS[sel];
      var key = pgGetKey();
      var path = pgResolvePath(ep);
      var url = BASE + path;
      var cmd = 'curl -s';
      if (ep.method !== 'GET') { cmd += ' -X ' + ep.method; }
      cmd += ' \\\\\\n  "' + url + '"';
      if (ep.auth) {
        var keyStr = key || '$NEXUS_API_KEY';
        cmd += ' \\\\\\n  -H "Authorization: Bearer ' + keyStr + '"';
      }
      if (ep.body !== null) {
        cmd += ' \\\\\\n  -H "Content-Type: application/json"';
        var body = document.getElementById('pg-body').value.trim();
        if (body) {
          var oneline = body.replace(/\\n\\s*/g, ' ');
          cmd += ' \\\\\\n  -d \\'' + oneline + '\\'';
        }
      }
      document.getElementById('pg-curl').textContent = cmd;
    };

    window.pgCopyCurl = function() {
      var btn = document.getElementById('pg-copy-btn');
      try {
        navigator.clipboard.writeText(document.getElementById('pg-curl').textContent);
        btn.textContent = 'Copied!';
        setTimeout(function() { btn.textContent = 'Copy'; }, 1500);
      } catch(e) {}
    };

    window.pgSend = async function() {
      var sel = document.getElementById('pg-endpoint').value;
      var ep = ENDPOINTS[sel];
      var key = pgGetKey();
      var path = pgResolvePath(ep);
      var url = BASE + path;
      var btn = document.getElementById('pg-send-btn');
      var sending = document.getElementById('pg-sending');
      var responseArea = document.getElementById('pg-response-area');
      var statusBadge = document.getElementById('pg-status-badge');
      var latencyEl = document.getElementById('pg-latency');
      var responseBody = document.getElementById('pg-response-body');
      var errorHint = document.getElementById('pg-error-hint');
      var errorHintText = document.getElementById('pg-error-hint-text');

      btn.disabled = true;
      sending.classList.remove('hidden');
      errorHint.classList.add('hidden');
      responseArea.classList.add('hidden');

      var headers = {};
      if (ep.auth && key) { headers['Authorization'] = 'Bearer ' + key; }
      var fetchOpts = { method: ep.method, headers: headers };
      if (ep.body !== null) {
        headers['Content-Type'] = 'application/json';
        fetchOpts.body = document.getElementById('pg-body').value.trim();
      }

      var HINTS = {
        401: 'Invalid or revoked API key. Copy the full key from Dashboard \u2192 API Keys.',
        403: 'Plan limit reached or this operation is not permitted on your current plan.',
        404: 'Trace not found. Confirm the trace ID and that it belongs to this API key.',
        429: 'Rate limit hit. Free plan: 1,000 traces/month. Upgrade to Pro for 50,000/month.',
        500: 'Server error on our end. Please try again in a moment or contact support.'
      };

      var t0 = Date.now();
      try {
        var res = await fetch(url, fetchOpts);
        var ms = Date.now() - t0;
        var text = await res.text();
        try { text = JSON.stringify(JSON.parse(text), null, 2); } catch(e) {}
        responseArea.classList.remove('hidden');
        statusBadge.textContent = String(res.status);
        statusBadge.className = 'text-xs font-bold font-mono px-2 py-0.5 rounded ' +
          (res.ok ? 'bg-green-950 text-green-400' : 'bg-red-950 text-red-400');
        latencyEl.textContent = ms + 'ms';
        responseBody.textContent = text;
        var hint = HINTS[res.status];
        if (hint) { errorHintText.textContent = hint; errorHint.classList.remove('hidden'); }
      } catch(err) {
        responseArea.classList.remove('hidden');
        statusBadge.textContent = 'Network Error';
        statusBadge.className = 'text-xs font-bold font-mono px-2 py-0.5 rounded bg-red-950 text-red-400';
        latencyEl.textContent = '';
        responseBody.textContent = String(err);
        errorHintText.textContent = 'Could not reach the API. Check your internet connection.';
        errorHint.classList.remove('hidden');
      }
      btn.disabled = false;
      sending.classList.add('hidden');
    };

    // Init: restore saved API key from sessionStorage
    try {
      var saved = sessionStorage.getItem('nexus_pg_key');
      if (saved) { document.getElementById('pg-api-key').value = saved; }
    } catch(e) {}
    pgSelectEndpoint();
  })();
  </script>
</body>
</html>`
}
