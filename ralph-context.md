## Last completed
ACP-160 - Demo seed script — populate D1 with realistic AI agent traces

## Next up
ACP-161 - Public demo dashboard at /demo — try before signing up

Notes on ACP-161 approach:
- The demo route/page already exists at `src/routes/demo.ts` and `src/pages/demo.ts` with hardcoded data (DEMO_TRACES, DEMO_SPANS arrays)
- ACP-161 requires "Demo data loaded from the seed script output (ACP-160)" — so update the demo route to query D1 instead of using hardcoded data
- Demo user ID in D1: `demo-user-seed-001`, email: `demo@nexus.keylightdigital.dev`
- Demo agents: demo-agent-001 through 005 (Customer Support Bot, Research Assistant, Code Review Agent, Data Pipeline Monitor, Content Generator)
- The route already has no auth requirement — just needs to query D1 for the demo user's data
- Keep the DEMO_BANNER and DEMO_NAV (already well-designed)
- ACP-161 AC: show trace list, clickable trace detail, 'Demo Dashboard' header with CTA, landing page CTA, mobile 375px, read-only

## Active issues
- 2 pre-existing smoke test failures on staging (keys empty name, settings non-https URL) — NOT my work, don't investigate
- Mobile webkit browser not installed on this machine — all mobile project tests fail with "Executable doesn't exist" — pre-existing
- Production smoke tests expect 39 pass + 72 skip (SKIP_AUTH_TESTS=1 behavior) — this is correct

## Key decisions this session
- ACP-160 implemented as a SQL file (`scripts/seed-demo.sql`) not a TypeScript script — simpler, runs via `wrangler d1 execute --file`
- Used INSERT OR IGNORE with fixed IDs for full idempotency
- Seed already applied to both staging and production D1 databases
