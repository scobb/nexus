# Nexus Python Example — AI Research Agent

A runnable example showing how to instrument a multi-step AI agent with Nexus.

## What this shows

- **LLM call span** — capturing prompt, response, and token count
- **Tool use span** — recording web search inputs and results
- **Error handling** — graceful degradation with error spans when steps fail
- **Trace lifecycle** — `start_trace` → `add_span` × N → `end`

## Setup

1. Get your API key at [nexus.keylightdigital.dev](https://nexus.keylightdigital.dev)
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the example:
   ```bash
   NEXUS_API_KEY=nxs_your_key_here python main.py
   ```

## What you'll see

After running, open your Nexus dashboard. You'll see a trace called `research: Cloudflare Workers for AI agents` with 3 spans:
- `web-search` — search query and results
- `llm-synthesis` — prompt, model, and response
- `format-report` — input/output lengths

## Adapting to your agent

Replace the simulated functions (`call_llm`, `web_search`, `format_report`) with your real implementation. The tracing pattern works with any framework — LangChain, AutoGen, CrewAI, or raw API calls.

```python
from nexus_agent import NexusClient

nexus = NexusClient(api_key="nxs_...", agent_id="your-agent-name")
trace = nexus.start_trace(name="your-run-name")
trace.add_span(name="step", input={...}, output={...})
trace.end(status="success")
```
