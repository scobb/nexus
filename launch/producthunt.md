# Nexus — Product Hunt Launch Materials

## Tagline
Simple, affordable AI agent observability. $9/mo. (Under 60 chars: 51)

## Alternate taglines
- Plausible for AI agents — dead-simple observability at $9/mo
- Monitor your AI agents for $9/month — no infrastructure needed
- The simple, hosted AI agent control plane indie devs actually want

## Description (300 words)

Most developers building AI agents have no idea what their agents are doing in production. LangSmith costs $39/month and only works well if you're using LangChain. Langfuse is excellent but self-hosting requires Docker, a managed Postgres instance, and ongoing maintenance. There's no "Plausible for AI agents" — something simple, affordable, and just works.

That's Nexus.

**What it does:** Drop our open-source SDK into your agent, and every trace, span, and error flows into your dashboard automatically. You get a trace viewer, per-agent health cards, a 7-day activity chart, and email alerts when agents fail — all for $9/month.

**Built on Cloudflare:** The entire stack runs on Cloudflare Workers + D1 + KV. No servers to manage, no cold starts, global edge performance. This also means near-zero infrastructure cost, which is why we can price it at $9/month instead of $39+.

**Works with any framework:** Three lines of code, any language. TypeScript and Python SDKs, both open-source on GitHub.

```typescript
const trace = await client.startTrace({ name: 'generate-response' })
await trace.addSpan({ name: 'llm-call', input: prompt, output: response })
await trace.end({ status: 'success' })
```

**Meta-narrative:** Nexus was built by Ralph, an autonomous AI agent that Keylight Digital uses to bootstrap its own products. Ralph needed observability for itself and for the agents it manages — so it built Nexus. The product is live, the SDK is published to npm, and it's all been done by an AI agent working from a PRD.

**Pricing:**
- Free: 1 agent, 1,000 traces/month, 30-day retention
- Pro: Unlimited agents, 50,000 traces/month, 90-day retention — $9/month

No per-seat pricing. No overage charges. Cancel anytime.

## Topics (suggested)
- Developer Tools
- Artificial Intelligence
- Open Source
- Monitoring
- SaaS

## Maker Comment (first comment — post immediately after launch)

Hey HN / PH — Steve from Keylight Digital here.

I want to be transparent about something unusual: Nexus was built by Ralph, an autonomous AI agent we run internally. Ralph is given a PRD and works through it story by story — building the code, deploying to Cloudflare, publishing the SDK to npm, writing the Show HN post, and now submitting to Product Hunt.

I've reviewed everything Ralph built and it's production-quality. The product is live at nexus.keylightdigital.dev, the SDK is on npm at @keylightdigital/nexus, and the source is on GitHub at github.com/scobb/nexus.

Why build this at all? Because Ralph needs observability for itself. We monitor Ralph's traces in Nexus. The builder monitors itself. It's a bit recursive, but it works.

Happy to answer questions about the technical stack (Cloudflare Workers + D1 + KV + Hono), the pricing rationale ($9/mo because Cloudflare's COGS are near zero), or how Ralph works.

## Gallery/Screenshot suggestions
1. Dashboard overview — per-agent health cards + 7-day bar chart
2. Trace detail page — span waterfall with input/output expansion
3. /demo page — the no-auth sample trace experience
4. SDK code block — the 6-line quickstart

## Launch timing recommendation
- **Best day:** Tuesday or Wednesday (highest PH traffic)
- **Best time:** 12:01 AM PST (Product Hunt day starts at midnight Pacific — posting first gets the most hours)
- **Avoid:** Monday (busy news day), Friday (low engagement), holidays

## Steve's launch checklist

### Before launch
- [ ] Run `wrangler deploy` from nexus/ to ensure production is current
- [ ] Verify nexus.keylightdigital.dev/health returns ok
- [ ] Verify /demo page loads with sample traces
- [ ] Confirm npm package is on npmjs.com: `npm info @keylightdigital/nexus`
- [ ] Have 3-4 friends/colleagues ready to upvote and leave first comments on launch day

### Launch day
- [ ] Post to Product Hunt at 12:01 AM PST (Tuesday or Wednesday)
- [ ] Post Show HN (draft at nexus/launch/show-hn.md) — same day as PH or day before
- [ ] Post Twitter/X thread (drafts at nexus/launch/social-posts.md)
- [ ] Post to r/artificial and r/programming (Reddit drafts in social-posts.md)
- [ ] Post LinkedIn article

### Week 2
- [ ] Publish dev.to article (draft at nexus/launch/devto-article.md) — set published: true
- [ ] Reply to HN comments
- [ ] Follow up on awesome-list PRs (see progress.txt for PR links)
- [ ] Submit to Cloudflare Workers templates directory
- [ ] Monitor signups and first user traces
