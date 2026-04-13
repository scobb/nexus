## Last completed
ACP-163 - Changelog page at /changelog — show product velocity

## Next up
ACP-164 - API reference documentation at /docs/api-reference

Notes on ACP-164 approach:
- Create `src/pages/api-reference.ts` (new page, not yet imported in index.ts)
- Register route in `src/index.ts`: `app.get('/docs/api-reference', ...)`
- Add import to index.ts
- Link from main docs navigation (src/pages/docs.ts nav)
- Cover all public endpoints: POST /api/v1/traces, POST /api/v1/traces/:id/spans, PATCH /api/v1/traces/:id, GET /api/v1/traces/:id (public), GET /health
- Follow Stripe docs clarity: method badge, path, description, auth, request schema, response schema, curl example, anchor links
- Mobile responsive at 375px

## Active issues
- 2 pre-existing smoke test failures: keys.spec empty name (chromium), mobile webkit not installed (all mobile tests)
- Production smoke tests: 42 pass + 84 skip + 22 pre-existing mobile failures (SKIP_AUTH_TESTS=1)

## Key decisions this session
- ACP-163: Badge types are 'feature' (green), 'improvement' (blue), 'fix' (orange), 'content' (purple)
- ACP-163: 'new' type still supported as alias for 'feature' in entry() function
- ACP-163: RSS link points to /blog/rss.xml (existing blog RSS, not a new endpoint)
- New CSS classes (orange/purple) require `npm run build:css` rebuild before deploy
