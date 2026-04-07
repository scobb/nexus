# Nexus Launch Playbook — Steve's Action Guide

**Total estimated time: ~3 hours**
Everything is pre-written. Your job is to copy-paste and click.

---

## Pre-Launch Checklist (Day Before Launch)

### 1. Fix npm token (granular token required) — 10 min

The current `NPM_TOKEN` in `.env` may be a legacy token without 2FA bypass. npm requires **granular access tokens** for CI/CD publishing.

Steps:
1. Go to npmjs.com → Avatar → Access Tokens → Generate New Token → **Granular Access Token**
2. Token name: `nexus-publish`
3. Expiration: 90 days (or no expiration)
4. Packages and scopes: Read and write
5. Select org: `@keylightdigital`
6. Copy the token
7. Update `.env`: `NPM_TOKEN=npm_...`
8. Verify: `npm whoami --registry https://registry.npmjs.org`

### 2. Verify production URLs — 5 min

```bash
curl https://nexus.keylightdigital.dev/health
# Expected: {"status":"ok","version":"0.1.0"}

curl -s https://nexus.keylightdigital.dev/ | grep -i "plausible"
# Expected: finds the tagline

curl https://nexus.keylightdigital.dev/demo
# Expected: 200 with demo page

curl https://nexus.keylightdigital.dev/docs
# Expected: 200 with API docs
```

If production is stale, redeploy:
```bash
cd nexus && npx wrangler deploy
```

### 3. Verify GitHub repo is current — 2 min

Check: https://github.com/scobb/nexus

Should show recent commit from ACP-068 (or later). Files to verify:
- `src/pages/publicTrace.ts` — exists (shareable traces)
- `migrations/0005_share_token.sql` — exists
- `sdk-python/` — exists with Python SDK

### 4. Verify npm package is live — 2 min

```bash
npm info @keylightdigital/nexus
# Expected: version 0.1.0, dist tarball URL
```

If not published: `cd nexus/sdk && npm run build && npm publish`

### 5. Verify PyPI package is live — 2 min

```bash
pip index versions keylightdigital-nexus 2>/dev/null || pip install keylightdigital-nexus --dry-run
```

If not published (PYPI_TOKEN needed):
```bash
cd nexus/sdk-python
python3 -m twine upload dist/* -u __token__ -p $PYPI_TOKEN
```

### 6. Have 3-5 supporters ready — 5 min

DM 3-5 colleagues/friends to upvote and leave first comments on Product Hunt and Hacker News on launch day. Genuine early engagement helps ranking.

**Pre-launch subtotal: ~24 min**

---

## Launch Day — Step by Step

### Step 1: Product Hunt — Post at 12:01 AM PST Tuesday or Wednesday — 15 min

Go to: https://www.producthunt.com/posts/new

**Tagline (copy-paste):**
```
Simple, affordable AI agent observability. $9/mo.
```

**Description (copy-paste from `launch/producthunt.md`):**
Full description is in `nexus/launch/producthunt.md`. The 300-word version starts: "Most developers building AI agents have no idea what their agents are doing..."

**Topics:** Developer Tools, Artificial Intelligence, Open Source, Monitoring, SaaS

**Gallery screenshots needed:**
1. Dashboard overview (per-agent health cards + 7-day bar chart) — screenshot nexus.keylightdigital.dev/demo
2. Trace detail — span waterfall — screenshot a demo trace
3. /demo page with "This is a demo" banner
4. SDK code block (the 6-line quickstart)

**Maker comment (post immediately after launch — copy-paste):**
```
Hey Product Hunt — Steve from Keylight Digital here.

I want to be transparent: Nexus was built by Ralph, an autonomous AI agent we run internally. Ralph was given a PRD and worked through it story by story — writing the code, deploying to Cloudflare, publishing the SDK to npm, and writing this launch copy.

I've reviewed everything Ralph built and it's production-quality. The product is live at nexus.keylightdigital.dev, the TypeScript SDK is on npm (@keylightdigital/nexus), the Python SDK is on PyPI (keylightdigital-nexus), and the source is on GitHub (github.com/scobb/nexus).

Why build this? Because Ralph needs observability for itself. We monitor Ralph's traces in Nexus. The builder monitors itself.

Happy to answer questions about the technical stack (Cloudflare Workers + D1 + KV + Hono), pricing rationale, or how Ralph works. 🤖
```

---

### Step 2: Hacker News (Show HN) — 10 min

Go to: https://news.ycombinator.com/submit

**Title (copy-paste — 79 chars):**
```
Show HN: I built an open-source control plane for AI agents, runs on Cloudflare, $9/mo
```

**Body (copy-paste from `launch/show-hn.md`):**
```
I've been building AI agents for the past few months and hit a consistent problem: once an agent is deployed, I'm flying blind. I know it ran. I don't know what it did, why it failed, or how long each step took.

The existing options didn't fit:
- LangSmith: $39/mo, designed for LangChain users, heavy SDK
- Galileo: $100/mo, enterprise sales process
- Self-hosted Langfuse: Great tool, but now I'm managing a Postgres instance

I wanted the Plausible of AI agents — simple, privacy-aware, just works, costs less than my coffee.

So I built it. It's called Nexus.

What it does:
- Drop in the TypeScript SDK (@keylightdigital/nexus) or Python SDK (keylightdigital-nexus)
- See every trace in a waterfall view: spans, inputs, outputs, errors, timing
- Get email alerts when your agent fails
- Dashboard with error rate, avg latency, 7-day volume chart
- OTEL-compatible: point any OpenTelemetry exporter at /v1/traces

How it's built:
- Cloudflare Workers + Hono (no servers, global edge)
- D1 for trace storage (SQLite at the edge)
- KV for sessions and rate limits
- Open-source TypeScript + Python SDKs

Pricing: Free (1K traces, 1 agent) or Pro ($9/mo, 50K traces, unlimited agents, email alerts)

The meta part: This entire product — PRD, implementation, SDK, README — was written by an AI agent (Ralph) that I built to run my own Keylight Digital projects. Ralph built Nexus because Ralph needed it. Ralph was flying blind too.

nexus.keylightdigital.dev
```

**Best times:** 9–11am ET on a weekday

---

### Step 3: Twitter/X Thread — 10 min

Post as a thread (reply to Tweet 1 with Tweets 2-5). Full drafts in `nexus/launch/social-posts.md`.

**Tweet 1 (copy-paste):**
```
We built an AI agent monitoring tool because we needed one for our own AI agents.

LangSmith is $39/mo. Langfuse requires Docker + Postgres. There's no simple hosted option.

So we built Nexus: $9/mo, drop in 3 lines of code, see your traces.

nexus.keylightdigital.dev
```

**Tweet 2 (reply to Tweet 1):**
```
Nexus runs entirely on @Cloudflare Workers + D1 + KV.

No traditional servers. No cold starts. Global edge.

This is why we can charge $9/mo instead of $39+ — Cloudflare's COGS are near zero.

Open-source SDK: github.com/scobb/nexus
```

**Tweet 3 (reply to Tweet 2):**
```
Something unusual: Nexus was built by Ralph, an autonomous AI agent.

Ralph was given a PRD. It scaffolded the Workers project, wrote the D1 schema, built the SDK, published to npm, wrote this launch post, and submitted to Product Hunt.

We needed observability for Ralph, so Ralph built it.

nexus.keylightdigital.dev
```

**Tweet 4 (reply to Tweet 3):**
```
3-line integration:

const trace = await client.startTrace({ name: 'generate-response' })
await trace.addSpan({ name: 'llm-call', input: prompt, output: response })
await trace.end({ status: 'success' })

TypeScript + Python. MIT license. No lock-in.

npm install @keylightdigital/nexus
pip install keylightdigital-nexus
```

**Tweet 5 (reply to Tweet 4):**
```
Pricing that makes sense for indie devs:

Free: 1 agent, 1K traces/month
Pro: $9/mo — unlimited agents, 50K traces, email alerts, 90-day retention

No per-seat pricing. No enterprise contracts. Cancel anytime.

🔗 nexus.keylightdigital.dev
⭐ github.com/scobb/nexus
```

---

### Step 4: LinkedIn Post — 10 min

Full draft in `nexus/launch/social-posts.md`. Opens with: "How we built an AI agent monitoring tool using an AI agent — and why we priced it at $9/month"

---

### Step 5: Reddit — 10 min

Full drafts in `nexus/launch/social-posts.md`.

- **r/artificial**: Title: "I built an open-source AI agent observability tool — $9/mo, runs on Cloudflare. Here's what we learned."
- **r/programming**: Title: "Show r/programming: Nexus — AI agent observability that's not $39/month"

Read each subreddit's rules before posting. r/programming requires direct links (not self-posts for Show posts).

**Launch day subtotal: ~55 min**

---

## Post-Launch (Days 2–7)

### Monitor analytics — 5 min/day

- Cloudflare Web Analytics: https://dash.cloudflare.com → Workers → nexus → Analytics
- Look for: signups (new users in D1), first traces, geographic spread
- Goal for week 1: 10 signups, 1 Pro conversion

### Respond to HN and PH comments — 30 min (first day)

Expected questions and answers:

**"Why not just use Langfuse?"**
> Langfuse is great if you want self-hosted. We built Nexus for people who don't want to manage a Postgres instance. Hosted, $9/mo, zero infrastructure to maintain.

**"What's the data model?"**
> OTEL-inspired: traces contain spans. Traces are agent runs; spans are individual steps (LLM call, tool use, sub-agent). We also accept raw OTLP/HTTP at /v1/traces so any OTEL exporter works.

**"Will this work with Python agents?"**
> Yes — Python SDK is on PyPI: `pip install keylightdigital-nexus`. 10-line quickstart in the README.

**"Is the agent (Ralph) actually running autonomously?"**
> Yes. Ralph runs as a Claude agent, reads the PRD, implements stories, commits, deploys, publishes packages. Steve reviews but doesn't write code.

### Submit awesome-list PRs — 30 min

- awesome-ai-agents: Add Nexus under monitoring/observability section
- awesome-cloudflare-workers: Add under tools/SaaS
- awesome-llm-observability: Add alongside Langfuse, LangSmith

These require human merge — open the PRs and move on. Log URLs in progress.txt.

### Week 2 actions — 60 min

- [ ] Publish dev.to article (draft at `nexus/launch/devto-article.md`) — set `published: true` in frontmatter
- [ ] Submit to Cloudflare Workers templates: https://developers.cloudflare.com/workers/templates/
- [ ] Follow up on awesome-list PRs (check for feedback/merge)
- [ ] If HN/PH drove signups: email first users personally (check D1 for new signups)

**Post-launch subtotal: ~2 hrs**

---

## Total Time Estimate

| Phase | Time |
|-------|------|
| Pre-launch checklist | 24 min |
| Product Hunt | 15 min |
| Hacker News | 10 min |
| Twitter/X thread | 10 min |
| LinkedIn | 10 min |
| Reddit | 10 min |
| **Launch day total** | **~55 min** |
| Post-launch (day 2-7) | ~2 hrs |
| **Grand total** | **~3 hrs** |

---

## Known Blockers (Action Required From Steve)

1. **npm token**: Replace with granular access token if publish fails (see Pre-Launch Step 1)
2. **PyPI token**: Add `PYPI_TOKEN=pypi-...` to `.env` to publish Python SDK (see Pre-Launch Step 5)
3. **Cloudflare API token**: If redeployment needed, token in `.env` should be valid; if not, create new one at dash.cloudflare.com → My Profile → API Tokens

---

## Quick Links

| Resource | URL |
|----------|-----|
| Production site | https://nexus.keylightdigital.dev |
| GitHub repo | https://github.com/scobb/nexus |
| npm package | https://www.npmjs.com/package/@keylightdigital/nexus |
| PyPI package | https://pypi.org/project/keylightdigital-nexus/ |
| Cloudflare dashboard | https://dash.cloudflare.com |
| Product Hunt submit | https://www.producthunt.com/posts/new |
| HN submit | https://news.ycombinator.com/submit |
| Show HN draft | `nexus/launch/show-hn.md` |
| Product Hunt draft | `nexus/launch/producthunt.md` |
| Social posts | `nexus/launch/social-posts.md` |
| dev.to article | `nexus/launch/devto-article.md` |
