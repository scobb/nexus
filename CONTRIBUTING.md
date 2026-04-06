# Contributing to Nexus

Thank you for your interest in contributing to Nexus! This guide covers how to get set up locally, the development workflow, and how to submit a pull request.

## Setup

### Prerequisites

- Node.js 18+
- npm 9+
- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier is sufficient for local dev)

### Install dependencies

```bash
git clone https://github.com/scobb/nexus.git
cd nexus
npm install
```

### Configure environment

```bash
cp .dev.vars.example .dev.vars
```

Edit `.dev.vars` and fill in:
- `RESEND_API_KEY` — [Resend](https://resend.com) API key for magic link emails (required for auth flow)
- `STRIPE_SECRET_KEY` — Stripe test secret key (required for billing pages)
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook secret (required for webhook handler)
- `STRIPE_PRICE_ID` — Stripe price ID for the Pro plan
- `SESSION_SECRET` — Any random 32-character string

### Apply database migrations

```bash
npx wrangler d1 execute nexus-db --local --file=migrations/0001_schema.sql
npx wrangler d1 execute nexus-db --local --file=migrations/0002_api_key_prefix.sql
npx wrangler d1 execute nexus-db --local --file=migrations/0003_agents_unique_name.sql
```

### Start the dev server

```bash
npm run dev
```

The server starts at `http://localhost:8787`.

## Development Workflow

### Project structure

```
nexus/
├── src/
│   ├── index.ts          # Worker entry point, route registration
│   ├── types.ts          # Shared TypeScript types (Env, HonoVariables)
│   ├── lib/              # Shared utilities (auth, apiKeys, alerts)
│   ├── middleware/       # Hono middleware (requireAuth, apiKeyAuth)
│   ├── routes/           # Route handlers
│   └── pages/            # Server-rendered HTML pages (pure functions → string)
├── migrations/           # D1 SQL migrations
├── sdk/                  # TypeScript SDK (@keylightdigital/nexus)
├── sdk-python/           # Python SDK (nexus-agent)
├── test/smoke/           # Playwright smoke tests
└── launch/               # Launch materials (Show HN, dev.to, etc.)
```

### Tech stack

- **Runtime**: Cloudflare Workers + [Hono](https://hono.dev/)
- **Database**: Cloudflare D1 (SQLite at edge)
- **Cache / sessions**: Cloudflare KV
- **Email**: Resend API
- **Payments**: Stripe
- **Frontend**: Server-rendered HTML + Tailwind CDN (no build step)

### Typecheck

```bash
npm run typecheck
```

All TypeScript must pass `tsc --noEmit` with no errors before committing.

### Smoke tests

```bash
npm run test:smoke
```

Runs the Playwright suite against a local `wrangler dev` instance. Tests cover: landing page, auth flow, API key creation, trace ingestion, trace viewer, and billing page.

## Making Changes

### Adding a new page

1. Create `src/pages/yourpage.ts` exporting a function that returns an HTML string.
2. Create `src/routes/yourpage.ts` with a `new Hono()` router.
3. Mount the router in `src/index.ts`.
4. Follow the existing nav bar pattern: Overview / Traces / Agents / API Keys / Billing / Settings.

### Adding a migration

Create a new file in `migrations/` (e.g., `0004_your_change.sql`) rather than editing existing files. Always use `IF NOT EXISTS` guards.

### API endpoints

- Authenticated user endpoints: mount under `/dashboard/*`, protected by `requireAuth` middleware.
- API endpoints (SDK): mount under `/api/v1/*`, protected by `apiKeyAuth` middleware.
- Webhooks: mount before `/api` routes to avoid apiKeyAuth interference.

## Pull Request Guidelines

1. **One concern per PR** — keep changes focused and reviewable.
2. **Typecheck must pass** — run `npm run typecheck` before opening a PR.
3. **No secrets in commits** — never commit `.dev.vars`, `.env`, or any file containing real API keys/tokens.
4. **Describe what and why** — PR description should explain the motivation, not just list the files changed.
5. **Mobile-responsive** — any UI changes must not break layout at 375px width.

## Reporting Issues

Use the [issue templates](.github/ISSUE_TEMPLATE/) to file bug reports or feature requests.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
