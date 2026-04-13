## Last completed
ACP-166 - Core Web Vitals audit and performance optimization

## Next up
ACP-167 - Sync and deploy ACP-160-166 to GitHub

Notes on ACP-167 approach:
- Push branch ralph/nexus to GitHub (scobb/nexus repo)
- All ACP-160-166 are already deployed to prod and verified
- Check remote is set up correctly: `git remote -v`
- `git push origin ralph/nexus` (or set upstream if needed)
- Verify all routes accessible on prod: /demo, /changelog, /docs/api-reference
- Smoke tests on prod already passing (56 pass + 84 skip)

## Active issues
- 2 pre-existing smoke test failures: keys.spec empty name (chromium), mobile webkit not installed (all mobile tests)
- Production smoke tests: 56 pass + 84 skip + pre-existing mobile failures (SKIP_AUTH_TESTS=1)

## Key decisions this session
- ACP-166: Only landing.ts + changelog.ts had @import (other pages use system fonts) — targeted fix
- Font optimization: preconnect + preload + media=print trick + noscript
- Lighthouse post-opt: Performance 99, CLS 0.02 (was 0.093), render-blocking eliminated
- Prod baseline now: 56 pass + 84 skip
