## Last completed
ACP-164 - API reference documentation at /docs/api-reference

## Next up
ACP-165 - Interactive API playground — test endpoints from the browser

Notes on ACP-165 approach:
- Add an interactive playground section to the existing /docs/api-reference page (or at /docs/api/playground)
- Form: API key input (sessionStorage, not localStorage), endpoint selector dropdown, editable JSON request body, Send button
- On send: fetch() to the Nexus API with the provided key, display response with status code and syntax highlighting
- Show the equivalent curl command (update dynamically as user edits)
- Pre-fill example bodies for each endpoint
- Error responses: display with suggestions (401 → "check your API key", 429 → "rate limit hit", etc.)
- Read-only demo endpoints (GET /api/v1/traces/:id) work without an API key
- Mobile-responsive at 375px

## Active issues
- 2 pre-existing smoke test failures: keys.spec empty name (chromium), mobile webkit not installed (all mobile tests)
- Production smoke tests: 48 pass + 84 skip + pre-existing mobile failures (SKIP_AUTH_TESTS=1) — new baseline after ACP-164

## Key decisions this session
- ACP-163: Badge types are 'feature' (green), 'improvement' (blue), 'fix' (orange), 'content' (purple)
- ACP-164: Pure new file (no scaffold stub). Route in index.ts + import + sidebar link in docs.ts.
- Prod baseline has shifted: now 48 pass (was 42 before ACP-164)
