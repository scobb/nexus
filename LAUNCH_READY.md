# Nexus — Launch Ready

**Status:** Launch-ready as of 2026-04-06
**Built by:** Ralph (autonomous AI agent, Keylight Digital LLC)
**Stories completed:** 70 of 70

---

## What's Built

### Core Product (Stories 1–20)
- Cloudflare Workers + Hono + D1 + KV backend
- Magic link authentication (email, no passwords)
- API key management (create, list, revoke)
- Trace ingestion API (`POST /api/v1/traces`)
- Span ingestion API (`POST /api/v1/traces/:id/spans`)
- PATCH endpoint for trace finalization
- TypeScript SDK (`@keylightdigital/nexus` on npm)
- Trace viewer with span waterfall (dashboard)
- Dashboard overview with health metrics + 7-day chart
- Email alerts on agent failure (Pro plan, via Resend)
- Multi-agent management
- Stripe billing (Free/Pro, webhooks)
- Plan limits enforcement (1K traces/mo, 1 agent on Free)
- Settings page with account deletion
- Data retention scheduled job (cron, daily at 02:00 UTC)
- Production deployment to nexus.keylightdigital.dev
- Playwright smoke tests

### Distribution & SEO (Stories 21–55)
- All URLs migrated to .dev domain
- SDK published to npm (`@keylightdigital/nexus`)
- Python SDK (`keylightdigital-nexus` — built, publish blocked on PyPI token)
- nexus/ code pushed to scobb/nexus GitHub repo (open-source)
- OG meta tags + Twitter Cards on landing page
- Interactive demo page at /demo (no auth required)
- How-it-works section + FAQ + inline code example
- Dev.to article draft (`launch/devto-article.md`)
- Awesome-list PR submissions
- SEO: robots.txt, sitemap.xml, JSON-LD structured data
- GitHub repo polish (LICENSE, CI badge, CONTRIBUTING.md, issue templates)
- API documentation page at /docs
- Comparison pages: /vs/langfuse, /vs/langsmith, /vs/arize-phoenix, /vs/agentops
- Alternatives hub at /alternatives
- Integration guides: /docs/langchain, /docs/crewai, /docs/anthropic-sdk
- Standalone pricing page at /pricing
- Blog at /blog with launch post
- Changelog at /changelog
- Cloudflare Web Analytics on all public pages
- Example projects (TypeScript + Python) at examples/
- Launch kit: show-hn.md, producthunt.md, social-posts.md, devto-article.md, playbook.md

### Product Quality (Stories 56–70)
- OpenTelemetry-compatible ingestion at POST /v1/traces
- Dashboard trace filtering by status, agent, date range
- Trace detail span waterfall with timing bars
- Trace search by metadata and text
- Shareable public trace links (unauthenticated)
- Guided onboarding checklist for new users
- Webhook notifications on trace failure
- 7-day traces chart on dashboard
- Per-agent health cards with trend indicators
- Steve's launch playbook (`launch/playbook.md`)

---

## Deployment Status

| Component | Status |
|-----------|--------|
| Cloudflare Worker | Deployed at nexus.keylightdigital.dev |
| D1 database | Provisioned, all migrations applied |
| KV namespace | Provisioned and bound |
| Custom domain | nexus.keylightdigital.dev (Cloudflare custom domain) |
| npm package | Published: @keylightdigital/nexus v0.1.0 |
| PyPI package | **BLOCKED** — needs PYPI_TOKEN (package built, not uploaded) |
| GitHub repo | scobb/nexus — current as of ACP-068 |

---

## Known Blockers (Steve Action Required)

### 1. PyPI publish (keylightdigital-nexus)
The Python SDK is built and validated. Publish is blocked on missing `PYPI_TOKEN`.

**Steps:**
1. Create PyPI account at pypi.org (if needed)
2. Go to: Account Settings → API tokens → Add API token
3. Add to `.env`: `PYPI_TOKEN=pypi-...`
4. Run: `cd nexus/sdk-python && python3 -m twine upload dist/* -u __token__ -p $PYPI_TOKEN`

### 2. npm token (granular access token)
The current NPM_TOKEN may lack 2FA bypass for CI. Replace with a granular access token if `npm publish` fails.

See detailed steps in `launch/playbook.md` → Pre-Launch Step 1.

### 3. Launch execution
All launch materials are prepared. Steve needs to:
- Post Show HN (draft in `launch/show-hn.md`)
- Submit to Product Hunt (draft in `launch/producthunt.md`)
- Post Twitter/X thread (draft in `launch/social-posts.md`)
- Publish dev.to article (draft in `launch/devto-article.md`)

Full step-by-step in `launch/playbook.md` (~3 hours total).

---

## Feature Freeze Policy

**No new stories until one of:**
1. External user signup (someone outside Keylight registers and sends traces)
2. Steve provides explicit feedback requesting a specific feature
3. Critical production bug (data loss, auth bypass, billing error)

**Why:** Nexus is feature-complete for the target market (indie devs, small teams). The remaining leverage is distribution, not more features. Every new story delays the Show HN post that drives actual users. Build in public, ship, iterate based on real feedback.

---

## Architecture Summary

- **Runtime:** Cloudflare Workers (Hono framework)
- **Database:** Cloudflare D1 (SQLite at the edge)
- **Cache/Sessions:** Cloudflare KV
- **Email:** Resend API (magic links, alerts, welcome emails)
- **Payments:** Stripe (Checkout, Billing Portal, webhooks)
- **Frontend:** Server-rendered HTML + Tailwind CDN (no build step)
- **SDK (TS):** @keylightdigital/nexus on npm (MIT)
- **SDK (Python):** keylightdigital-nexus on PyPI (MIT)
- **Analytics:** Cloudflare Web Analytics (privacy-friendly, no cookies)
- **OTEL:** POST /v1/traces accepts OTLP/HTTP JSON
