## Last completed
ACP-162 - Dashboard onboarding widget for new users with zero traces

## Next up
ACP-163 - Changelog page at /changelog — show product velocity

Notes on ACP-163 approach:
- Create `src/pages/changelog.ts` (page already imported in index.ts at line 8!)
- Check existing `changelogPage` import in `src/index.ts` — may already have a route stub
- Seed 15-20 entries from prior stories (SDK launch, Stripe, integrations, comparison pages, etc.)
- Category badges: green=Feature, blue=Improvement, orange=Fix, purple=Content
- Link from footer nav and /docs sidebar
- RSS link — point to existing /blog/rss.xml
- OG meta tags

## Active issues
- 2 pre-existing smoke test failures: keys.spec empty name (chromium), mobile webkit not installed (all mobile tests)
- Production smoke tests: 41 pass + 84 skip + 17 pre-existing mobile failures (SKIP_AUTH_TESTS=1)

## Key decisions this session
- ACP-162: We only store key_prefix (e.g. nxs_abc123) not plaintext — widget shows prefix masked, links to /dashboard/keys
- ACP-162: Use page.request.get() not request.get() for authenticated Playwright API calls
- ACP-162: Widget shows when !hasTrace && !onboardingDismissed (not !hasApiKey && !hasTrace)
- PRD structure uses prd.userStories (not prd.stories)
- D1 subquery COUNT: use CAST(IFNULL((...), 0) AS INTEGER) to prevent null issues
