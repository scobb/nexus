## Last completed
ACP-161 - Public demo dashboard at /demo — try before signing up

## Next up
ACP-162 - Dashboard onboarding widget for new users with zero traces

Notes on ACP-162 approach:
- The dashboard route is at `src/routes/dashboard.ts` / `src/pages/dashboard.ts`
- When user has 0 traces (trace count = 0), show onboarding widget instead of empty state
- Widget: 3 steps — copy API key, install SDK (Python/TS/curl tabs), wait for first trace
- The user's actual API key should be pre-filled in code snippets (mask by default, reveal on click)
- Step 3: "Waiting for your first trace..." with polling — auto-detect when trace arrives
- Check `src/routes/dashboard.ts` for how trace counts are currently queried
- Check `src/routes/keys.ts` for how API keys are fetched (needed to pre-fill code snippets)
- Mobile-responsive at 375px

## Active issues
- 2 pre-existing smoke test failures: keys.spec empty name (chromium), mobile webkit not installed (all mobile tests)
- Production smoke tests expect 29 pass + 36 skip + 0 fail (SKIP_AUTH_TESTS=1)

## Key decisions this session
- ACP-161: demo route now queries D1 for demo-user-seed-001, falls back gracefully to hardcoded DEMO_TRACES/DEMO_SPANS if D1 empty/unavailable
- PRD structure uses `prd.userStories` (not `prd.stories`) — critical for node script updates
- D1 subquery COUNT fields: use `CAST(IFNULL((...), 0) AS INTEGER)` to prevent null issues
