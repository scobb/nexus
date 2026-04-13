## Last completed
ACP-159 - Comprehensive smoke test suite for all core user flows

## Next up
All 159 stories pass: true — no more work to do.

## Active issues
None. All stories complete.

## Key decisions this session
- Added migration 0008_subscriptions_created_at.sql to fix 500 errors on dashboard/agents/settings (subscriptions table was missing created_at column that ORDER BY queries referenced)
- Production d1_migrations was out of sync — manually inserted rows for 0004-0008 to fix migration tracking
- hasTestEndpoints flag gates bootstrap-dependent smoke tests; production runs use SKIP_AUTH_TESTS=1
- Test suite: 63/63 on staging, 27 pass + 36 skip on production (no failures anywhere)
