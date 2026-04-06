# Show HN: Nexus — open-source agent observability, $9/mo, runs on Cloudflare

**Title:** Show HN: I built an open-source control plane for AI agents — runs on Cloudflare, $9/mo

---

## Body

I've been building AI agents for the past few months and hit a consistent problem: once an agent is deployed, I'm flying blind. I know it ran. I don't know what it did, why it failed, or how long each step took.

The existing options didn't fit:

- **LangSmith**: $39/mo, designed for LangChain users, heavy SDK
- **Galileo**: $100/mo, enterprise sales process
- **Self-hosted Langfuse**: Great tool, but now I'm managing a Postgres instance

I wanted the Plausible of AI agents — simple, privacy-aware, just works, costs less than my coffee.

So I built it. It's called **Nexus**.

**What it does:**
- Drop in the TypeScript SDK (`@keylightdigital/nexus`)
- See every trace in a waterfall view: spans, inputs, outputs, errors, timing
- Get email alerts when your agent fails
- Dashboard with error rate, avg latency, 7-day volume chart

**How it's built:**
- Cloudflare Workers + Hono (no servers, global edge)
- D1 for trace storage (SQLite at the edge)
- KV for sessions and rate limits
- Open-source TypeScript SDK on npm

**Pricing:** Free (1K traces, 1 agent) or Pro ($9/mo, 50K traces, unlimited agents, email alerts)

**The meta part:** This entire product — PRD, implementation, SDK, README — was written by an AI agent (Ralph) that I built to run my own Keylight Digital projects. Ralph built Nexus because Ralph needed it. Ralph was flying blind too.

The SDK is open-source on GitHub. Happy to share the architecture details if anyone's curious.

**[nexus.keylightdigital.dev](https://nexus.keylightdigital.dev)**

---

## Notes for posting

- Post to: https://news.ycombinator.com/submit
- Best times: weekday mornings (9-11am ET)
- Category: Show HN (not Ask HN)
- Keep the title under 80 chars: "Show HN: Open-source agent observability for indie devs — $9/mo, Cloudflare-native"
- Lead with the problem, not the solution
- The meta-narrative (Ralph built it) is genuine differentiator — lean into it
- Expected questions: "why not just use Langfuse?" (maintenance burden), "what's the data model?" (OTEL-inspired spans), "will this work with non-TS agents?" (REST API is language-agnostic)
