# Nexus — Agent Observability for Indie Developers

[![CI](https://github.com/scobb/nexus/actions/workflows/ci.yml/badge.svg)](https://github.com/scobb/nexus/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**The Plausible of AI agents.** Simple, affordable, open-source control plane for your AI agents. Drop in the SDK. See your traces. Get alerts when they fail. No self-hosting, no enterprise contracts.

> Built by an AI agent (Ralph), for AI agents. Keylight Digital built this because we needed it to manage our own agent infrastructure.

**[nexus.keylightdigital.dev](https://nexus.keylightdigital.dev)** · Free forever · Pro at $9/mo

---

## Quickstart

### TypeScript

```bash
npm install @keylightdigital/nexus
```

```typescript
import { NexusClient } from '@keylightdigital/nexus'

const nexus = new NexusClient({ apiKey: 'nxs_...', agentId: 'my-assistant' })

const trace = await nexus.startTrace({ name: 'process-invoice' })

await trace.addSpan({ name: 'extract-data', output: { invoice_id: '123' } })
await trace.addSpan({ name: 'call-gpt-4o', input: { prompt }, output: { result } })

await trace.end({ status: 'success' })
```

### Python

```bash
pip install keylightdigital-nexus
```

```python
from nexus_agent import NexusClient

nexus = NexusClient(api_key='nxs_...', agent_id='my-assistant')

trace = nexus.start_trace(name='process-invoice')

trace.add_span(name='extract-data', output={'invoice_id': '123'})
trace.add_span(name='call-gpt-4o', input={'prompt': prompt}, output={'result': result})

trace.end(status='success')
```

Get your API key at [nexus.keylightdigital.dev](https://nexus.keylightdigital.dev). That's it.

---

## Why Nexus?

Enterprise observability tools cost $39–$100/mo and are built for teams of 50. If you're an indie developer building an AI agent, you need:

- A trace viewer that shows what your agent actually did
- Email alerts when it fails at 3am
- A usage dashboard so you're not flying blind
- Something that costs less than your coffee budget

Nexus is that tool. Built on Cloudflare — near-zero latency globally, no servers to maintain.

---

## Pricing

| | Free | Pro |
|---|---|---|
| **Price** | $0 | $9/mo |
| **Traces/month** | 1,000 | 50,000 |
| **Agents** | 1 | Unlimited |
| **Retention** | 30 days | 90 days |
| **Email alerts** | — | ✓ |
| **Team access** | — | Up to 5 |

---

## Features

- **Trace viewer** — Waterfall timeline of every span: inputs, outputs, errors, timing
- **Agent health dashboard** — Error rate, avg latency, 7-day volume sparkline with live auto-refresh
- **Trace filtering & search** — Filter by status, agent, date range; search by trace name or metadata
- **Email alerts** — Notified when an agent trace ends with `error` or `timeout` (Pro)
- **OpenTelemetry compatible** — Point any OTEL exporter at `/v1/traces` — no code changes needed
- **Public trace API** — `GET /api/v1/traces` for custom dashboards, Slack bots, CI/CD integrations
- **Open-source SDKs** — TypeScript and Python, non-throwing, minimal dependencies
- **Multi-agent** — Track as many agents as you want (Pro), or start with 1 (Free)
- **Privacy-aware** — Cloudflare-native, data stays in your D1 database

---

## Architecture

Nexus is built entirely on the Cloudflare stack:

- **Runtime**: Cloudflare Workers (Hono framework)
- **Database**: D1 (SQLite at the edge)
- **Cache**: KV (sessions, rate limits, trace counts)
- **Email**: Resend API

Zero cold starts. Global edge. ~$0 infrastructure cost at indie scale.

---

## Examples

Ready-to-run example projects are in the [scobb/nexus-examples](https://github.com/scobb/nexus-examples) repo:

| Example | Description |
|---------|-------------|
| [Node.js / TypeScript](https://github.com/scobb/nexus-examples/tree/main/examples/nodejs) | TypeScript agent with trace+span creation, error handling |
| [Python](https://github.com/scobb/nexus-examples/tree/main/examples/python) | Python agent with sync and async patterns |
| [LangChain](https://github.com/scobb/nexus-examples/tree/main/examples/langchain) | LangChain agent with automatic LLM call and tool tracing |

```bash
git clone https://github.com/scobb/nexus-examples
cd nexus-examples/examples/nodejs
npm install && NEXUS_API_KEY=nxs_... npm start
```

---

## SDK

The `@keylightdigital/nexus` SDK is open-source and available on npm. See [`sdk/README.md`](sdk/README.md) for full docs.

---

## Meta-narrative

This entire product — PRD, architecture, implementation, SDK, and this README — was written by **Ralph**, an AI agent built by Keylight Digital LLC.

Ralph built Nexus because Ralph needed it. Our AI agents were running blind — no visibility into what they were doing, why they were failing, or how long they were taking. Enterprise tools were $100/mo. Self-hosting Langfuse required a VPS. There was no Plausible for AI agents.

So Ralph built one. In about 20 stories. On a $100 budget.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions, development workflow, and PR guidelines.

## License

[MIT](LICENSE)
