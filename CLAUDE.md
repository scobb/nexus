# Nexus — Claude Code Guide

Developer and agent guidance. See also: `AGENTS.md` for infra/deployment details.

## Smoke Tests

Test files live in `test/smoke/`. Each spec covers a core user flow:

| File | What it tests |
|------|--------------|
| `landing.spec.ts` | Landing page, pricing table, CTAs, mobile layout |
| `auth.spec.ts` | Login, session cookie, logout, redirect-to-login guard |
| `api.spec.ts` | Trace ingestion, span ingestion, plan limit enforcement |
| `billing.spec.ts` | Billing page (Free and Pro users) |
| `traces.spec.ts` | Trace list, trace detail, empty state |
| `keys.spec.ts` | API key list, create, revoke |
| `dashboard.spec.ts` | Dashboard home, metrics, plan indicator |
| `agents.spec.ts` | Agents list, agent detail page |
| `settings.spec.ts` | Settings page, webhook URL validation |
| `public.spec.ts` | Pricing, docs, demo, blog, sitemap, robots.txt |

### Run commands

```bash
# Local (starts wrangler dev automatically):
npm run test:smoke

# Against staging (no local server, /test/bootstrap works):
BASE_URL=https://nexus-staging.stevencolecobb.workers.dev npm run test:smoke

# Against production (public-only tests pass; bootstrap-dependent tests skipped automatically):
BASE_URL=https://nexus.keylightdigital.dev SKIP_AUTH_TESTS=1 npm run test:smoke
```

### Note on bootstrap-dependent tests

Tests using `/test/bootstrap` (auth, API keys, traces, etc.) are automatically skipped
when `SKIP_AUTH_TESTS=1` is set. The `/test/*` endpoint is blocked on production
(`ENVIRONMENT=production`), so production smoke runs use `SKIP_AUTH_TESTS=1`.

Public-only tests (landing page, pricing, docs, demo, sitemap, etc.) run everywhere.

## Project Structure

See `AGENTS.md` for the full project structure, staging URLs, and deploy commands.
