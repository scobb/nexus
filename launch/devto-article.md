---
title: How I Monitor My AI Agents for $9/Month
description: A walkthrough of Nexus — a lightweight, Cloudflare-native observability platform I built for indie developers who are tired of paying $39-$100/month for enterprise AI tracing tools.
tags: ai, webdev, cloudflare, opensource
canonical_url: https://nexus.keylightdigital.dev
cover_image:
published: false
---

I've been building AI agents for the past year. At some point every agent project hits the same wall: something's broken in production, you don't know why, and you have no visibility into what the agent actually did.

The obvious move is to reach for an observability tool. So you look at the options:

- **LangSmith**: $39/month. Mostly useful if you're on the LangChain ecosystem.
- **Galileo**: $100+/month. Enterprise-tier. Overkill for side projects.
- **Langfuse**: Free tier, but you're self-hosting a Docker Compose stack. That's infrastructure you have to babysit.

I didn't need 90% of what these tools offer. I needed to see what my agents were doing — which steps ran, how long they took, and what failed. That's it.

So I built [Nexus](https://nexus.keylightdigital.dev): a hosted agent control plane priced for individual developers. $9/month, no self-hosting, open-source SDK.

## Why Existing Tools Didn't Fit

Let me be precise about what's wrong with each option, because this isn't a "everything sucks except mine" take.

**LangSmith** is genuinely good if you're in the LangChain ecosystem. If you're not, the SDK is awkward and $39/month is steep for a side project with 500 traces a month.

**Galileo** is an enterprise product. It has features I'll probably never need: hallucination detection, custom guardrails, SSO. For solo developers building weekend projects, you're paying for things that don't matter.

**Self-hosted Langfuse** is the closest to what I wanted, but "self-hosted" means maintaining a Docker Compose stack (PostgreSQL, ClickHouse, Redis, the app itself) somewhere. That's fine if you're building something serious. For a side project, it's operational overhead that compounds. I've been burned by "just self-host it" before — the infra is fine until it isn't, and then you're debugging Postgres replication at 2am instead of shipping.

What I wanted: hosted, cheap, zero infra to maintain. Simple trace → span model. Alerts when things break. Nothing else.

## The Architecture

Nexus runs entirely on Cloudflare's free tier:

- **Workers + Hono** for the API and dashboard (serverless, $0 on free tier)
- **D1** (SQLite at edge) for traces and spans
- **KV** for sessions, rate limits, and API key lookup
- **Resend** for email auth and alerts

The COGS for Nexus is close to zero until you hit Cloudflare's generous free limits. For an indie tool, that means I can keep the price low without losing margin.

The data model is intentionally simple. A **trace** represents one run of an agent — a single invocation with a name, start time, end time, and status. A **span** is a step inside that trace — an LLM call, a tool use, a sub-agent invocation. Spans have inputs, outputs, and errors. That's it. No DAGs, no complex sampling, no custom metrics pipeline. Most agent debugging needs a fraction of what the enterprise tools provide.

## The SDK

Drop three lines into your agent:

```typescript
import { NexusClient } from '@keylightdigital/nexus'

const nexus = new NexusClient({
  apiKey: process.env.NEXUS_API_KEY,
  agentId: 'invoice-processor',
})

// In your agent code:
const trace = await nexus.startTrace({ name: 'process-invoice-#1042' })

const span = await trace.addSpan({
  name: 'extract-line-items',
  input: { invoiceText: '...' },
  output: { lineItems: [...] },
})

await trace.end({ status: 'success' })
```

That's the entire integration. The SDK handles network errors silently — it never throws, so an instrumentation failure never takes down your agent.

## What You Get

Once traces are flowing, the dashboard shows you:

- **Trace list**: every trace with status (success/error/running/timeout), duration, and timestamp
- **Span waterfall**: the full execution tree for a single trace — each step, in order, with input/output collapsible
- **Agent overview**: per-agent health cards, 24h error rate, last trace status
- **Email alerts**: if a trace ends with `error` or `timeout`, you get an email with the trace name and a direct link to the detail page (Pro plan)

The waterfall view is where it pays off. When an agent fails in production, you can see exactly which span errored, what the input was, and what the error message said — without digging through logs.

## The Meta-Narrative

Here's the part I find interesting: I didn't write most of this code. Nexus was built by Ralph — an AI agent I run on Keylight Digital's infrastructure.

Ralph was using observability tools to monitor itself and other agents we were building. The existing tools were either too expensive or too much infrastructure. So I gave Ralph the goal: build a simpler one.

The entire product — schema, auth, API, SDK, dashboard, alerts, billing, deployment — was designed and implemented by an AI agent. Nexus is an agent observability platform built by an AI agent, for AI agents. That's not marketing; it's just what happened.

## Pricing

| | Free | Pro |
|---|---|---|
| Traces/month | 1,000 | 50,000 |
| Agents | 1 | Unlimited |
| Retention | 30 days | 90 days |
| Email alerts | No | Yes |
| Price | $0 | $9/mo |

The free tier is real — not a "free trial." If you're running a single agent on a side project, you probably don't need Pro.

## Getting Started

1. Sign up at [nexus.keylightdigital.dev](https://nexus.keylightdigital.dev)
2. Create an API key in the dashboard
3. Install the SDK: `npm install @keylightdigital/nexus`
4. Add three lines to your agent (see above)
5. Watch your first trace appear

The source code for the SDK is on GitHub at [scobb/nexus](https://github.com/scobb/nexus). The server-side code will be open-sourced once the initial launch stabilizes.

---

I built this because I needed it. If you're building AI agents and paying for tools that are 10x more complex than what you actually need, give it a try. Feedback welcome.
