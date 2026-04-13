## Last completed
ACP-165 - Interactive API playground on /docs/api-reference

## Next up
ACP-166 - Core Web Vitals audit and performance optimization

Notes on ACP-166 approach:
- Run Lighthouse on landing page, pricing, docs, blog via Playwright or CLI tool
- Document baseline scores in progress.txt
- Target: landing page performance >= 90, all public pages CLS <= 0.1, LCP < 2.5s
- Optimizations: inline critical CSS above fold, font-display: swap, preload key fonts, explicit image dimensions
- TTFB: document for cached vs uncached (Cloudflare Workers serve edge-cached)
- Since no images are used (it's a pure text/CSS app), CLS/LCP issues are likely CSS-related
- Critical CSS to inline: focus on what styles the above-fold of the landing page (nav + hero)

## Active issues
- 2 pre-existing smoke test failures: keys.spec empty name (chromium), mobile webkit not installed (all mobile tests)
- Production smoke tests: 52 pass + 84 skip + pre-existing mobile failures (SKIP_AUTH_TESTS=1) — new baseline after ACP-165

## Key decisions this session
- ACP-165: Playground is a section on the existing /docs/api-reference page (no new route)
- ACP-165: Uses sessionStorage for API key (cleared on tab close, per security requirement)
- Backslash escaping in TS template: 6 backslashes + n (\\\\\\n) → \\\n in HTML → \\ + \n in JS = backslash+newline ✓
- Prod baseline now: 52 pass + 84 skip
