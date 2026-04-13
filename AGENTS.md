# Nexus AGENTS.md

Developer and agent guidance for the Nexus Cloudflare Worker project.

## Project Structure

- `src/index.ts` — Hono app entry point, route registration
- `src/routes/` — Route handlers (auth, api, dashboard, webhooks)
- `src/lib/` — Shared utilities (db, auth, stripe, email)
- `src/middleware/` — Hono middleware (auth guard, API key)
- `src/pages/` — HTML page rendering helpers
- `migrations/` — D1 SQL migration files (always use IF NOT EXISTS)
- `tailwind/` — Tailwind CSS input, output embedded via `scripts/embed-css.js`

## Key Patterns

- **Migrations**: Always use `IF NOT EXISTS` guards. Run with `npm run migrations:local` (local) or `npm run migrations:staging` (staging remote). New migrations go in `migrations/` with sequential numbering.
- **CSS**: Tailwind is compiled and embedded into `src/generated-styles.ts`. Run `npm run build:css` before deploy. Never edit `generated-styles.ts` directly.
- **Env bindings**: Declared in `src/types.ts` `Env` interface. Required: NEXUS_DB, NEXUS_KV, RESEND_API_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ID, SESSION_SECRET. Optional: SENTRY_DSN, ENVIRONMENT.
- **D1 queries**: Use `env.NEXUS_DB.prepare(...).bind(...).all()` / `.first()` / `.run()`.
- **KV storage**: Used for session tokens (7-day TTL), magic link tokens (15-min TTL), and rate limiting.
- **Auth**: Session cookie (`nexus_session`, HttpOnly, Secure, SameSite=Lax). Middleware in `src/middleware/`.

## Staging Environment

### Resources
| Resource | Name | ID/UUID |
|----------|------|---------|
| Production Worker | `nexus` | — |
| Staging Worker | `nexus-staging` | — |
| Production D1 | `nexus-db` | `5055f9eb-ea3f-4991-b456-653e049cea49` |
| Staging D1 | `nexus-db-staging` | `ce65e1b6-656e-4b3d-9c29-b1e2492b1a1e` |
| Production KV | `nexus-NEXUS_KV` | `edc59fe4d4e140bcb2136a48443dc007` |
| Staging KV | `nexus-NEXUS_KV_staging` | `1776216c1a7749759fcab713acf35e12` |

### Staging URLs
- **Staging Worker**: https://nexus-staging.stevencolecobb.workers.dev
- **Staging webhook endpoint (Stripe test mode)**: Registered as `we_1TKrqXRhEblTFzoxPUVBuHAb`

### Staging Stripe Configuration
- **Stripe mode**: Test mode (`sk_test_*` key)
- **Test-mode product**: `prod_UJUqRqKru9SWVZ` (Nexus Pro)
- **Test-mode price**: `price_1TKrqnRhEblTFzoxq1tc0CZz` ($9/month)
- **Test-mode webhook**: `we_1TKrqXRhEblTFzoxPUVBuHAb` (pointing to staging URL)
- Test-mode keys are from `stripe config --list` (Stripe CLI must be authenticated)

### Deploy Commands
```bash
npm run deploy          # Deploy production
npm run deploy:staging  # Deploy staging (uses [env.staging] in wrangler.toml)
npm run migrations:local     # Apply migrations locally
npm run migrations:staging   # Apply migrations to staging remote D1
```

### Staging Secrets (set via wrangler secret put --env staging)
Required secrets for staging (already configured):
- `RESEND_API_KEY` — same as production (Resend is environment-agnostic)
- `STRIPE_SECRET_KEY` — test-mode key (`sk_test_*`)
- `STRIPE_WEBHOOK_SECRET` — test-mode webhook signing secret (`whsec_uB1vfEHoj2kw7INbXTcggQq1WxpAYVFK`)
- `STRIPE_PRICE_ID` — test-mode price ID (`price_1TKrqnRhEblTFzoxq1tc0CZz`)
- `SESSION_SECRET` — randomly generated for staging isolation

### Re-deploying / Rotating Secrets
If staging secrets need to be rotated:
```bash
echo "new_value" | npx wrangler secret put SECRET_NAME --env staging
```

## Quality Checks

```bash
npm run typecheck   # TypeScript type check (must pass before commit)
npm run test        # Playwright smoke tests
```
