# Nexus TypeScript Example — AI Research Agent

A runnable example showing how to instrument a multi-step AI agent with Nexus.

## What this shows

- **LLM call span** — capturing prompt, response, and token count
- **Tool use span** — recording web search inputs and results
- **Error handling** — graceful degradation with error spans when steps fail
- **Trace lifecycle** — `startTrace` → `addSpan` × N → `end`

## Setup

1. Get your API key at [nexus.keylightdigital.dev](https://nexus.keylightdigital.dev)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the example:
   ```bash
   NEXUS_API_KEY=nxs_your_key_here npm start
   ```

## What you'll see

After running, open your Nexus dashboard. You'll see a trace called `research: Cloudflare Workers for AI agents` with 3 spans:
- `web-search` — search query and results
- `llm-synthesis` — prompt, model, and response
- `format-report` — input/output lengths

## Adapting to your agent

Replace the simulated functions (`callLLM`, `webSearch`, `formatReport`) with your real implementation. The tracing pattern is the same regardless of which LLM, search API, or tools you use.

```typescript
const nexus = new NexusClient({ apiKey: 'nxs_...', agentId: 'your-agent-name' })
const trace = await nexus.startTrace({ name: 'your-run-name' })
await trace.addSpan({ name: 'step', input: { ... }, output: { ... } })
await trace.end({ status: 'success' })
```
