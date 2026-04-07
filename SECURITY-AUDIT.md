# Nexus Security Audit

**Audited by:** Ralph (AI agent)
**Date:** 2026-04-07
**Scope:** nexus/ source code — routes, pages, lib, middleware

---

## Summary

Overall security posture is **good**. No critical vulnerabilities found. Three low-severity findings documented below with recommended remediations.

---

## Findings

### FINDING-001: SQL Injection Risk (PASS)

**Severity:** None (verified safe)

**Finding:** All SQL queries use D1's parameterized query API via `.prepare(sql).bind(values...)`.

**Evidence:**
- Every query in `routes/api.ts`, `routes/auth.ts`, `routes/keys.ts`, `routes/billing.ts`, `routes/agents.ts`, `routes/traces.ts`, `routes/settings.ts`, `routes/webhooks.ts` uses `.prepare().bind()`.
- The one template literal in SQL is `retentionDays` in `src/index.ts` (scheduled handler). This value is `30` or `90` — a hardcoded number from a conditional, never from user input. No injection risk.

**Status:** ✅ PASS — No SQL injection vectors found.

---

### FINDING-002: Cross-Site Scripting (PASS)

**Severity:** None (verified safe)

**Finding:** All user-controlled data rendered in HTML pages is escaped via `escHtml()`.

**Implementation:**
```typescript
function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
```

**Coverage verified in:**
- `pages/dashboard.ts` — agent names, email
- `pages/traces.ts` — trace names, agent names, span names, IDs in URLs
- `pages/agents.ts` — agent names, email
- `pages/keys.ts` — key names, email
- `pages/settings.ts` — email, key names
- `pages/billing.ts` — email

**Recommendation (low):** Add single-quote escaping (`'` → `&#39;`) to `escHtml()` as defense-in-depth, though no single-quoted HTML attributes are currently used. This is a belt-and-suspenders improvement.

**Status:** ✅ PASS — No XSS vectors found. Improvement noted.

---

### FINDING-003: CSRF Protection (PASS)

**Severity:** None — mitigated by SameSite=Lax cookies

**Finding:** Session cookies are set with `SameSite: 'Lax'`, which prevents CSRF for all non-GET requests triggered from third-party origins.

```typescript
// src/routes/auth.ts
setCookie(c, 'session_id', sessionId, {
  httpOnly: true,
  secure: true,
  sameSite: 'Lax',
  path: '/',
  maxAge: 7 * 24 * 60 * 60,
})
```

`SameSite=Lax` means:
- Cookies are sent on top-level navigations (GET links to the site).
- Cookies are **not** sent on cross-origin POST requests (form submissions from attacker's page).
- This mitigates CSRF for all state-changing POST routes (key creation, account deletion, billing).

**Status:** ✅ PASS — CSRF mitigated by SameSite=Lax.

---

### FINDING-004: Rate Limiting on Auth Endpoints (PASS)

**Severity:** None (verified)

**Finding:** Magic link issuance is rate-limited to 5 requests per email per hour via Cloudflare KV.

```typescript
// src/lib/auth.ts
const RATE_LIMIT_WINDOW = 60 * 60  // 1 hour
const RATE_LIMIT_MAX = 5

const rateKey = `rate:magic:${email}`
const count = Number(await kv.get(rateKey) ?? '0')
if (count >= RATE_LIMIT_MAX) {
  return { error: 'Too many magic links requested. Try again in an hour.' }
}
await kv.put(rateKey, String(count + 1), { expirationTtl: RATE_LIMIT_WINDOW })
```

**Status:** ✅ PASS — Rate limiting implemented and verified.

---

### FINDING-005: API Key Storage (PASS)

**Severity:** None (verified)

**Finding:** API keys are stored as SHA-256 hashes. The plaintext key is never stored in the database.

```typescript
// src/lib/apiKeys.ts
export async function hashApiKey(key: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(key)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}
```

- Key format: `nxs_` + 64 hex chars (32 random bytes from `crypto.getRandomValues`)
- Storage: SHA-256 hash only
- Display: first 8 chars (`key_prefix`) stored for identification
- Plaintext shown once at creation, never stored

**Status:** ✅ PASS — API keys stored securely.

---

### FINDING-006: Session Management (PASS)

**Severity:** None (verified)

**Finding:** Sessions use 128-bit random IDs stored in Cloudflare KV with 7-day TTL. Cookie attributes are hardened.

- `httpOnly: true` — prevents JavaScript access
- `secure: true` — HTTPS only
- `sameSite: 'Lax'` — CSRF mitigation
- `path: '/'` — site-wide scope
- 7-day TTL enforced in KV

**Status:** ✅ PASS

---

### FINDING-007: Test Routes Exposure (LOW — DOCUMENTED)

**Severity:** Low — test routes guarded but worth noting

**Finding:** Test helper endpoints (`/test/bootstrap`, `/test/set-trace-count`) are mounted in `src/index.ts` and guarded by:

```typescript
if (c.env.ENVIRONMENT === 'production') {
  return c.json({ error: 'Not available in production' }, 403)
}
```

This check relies on the `ENVIRONMENT` environment variable being correctly set in production. The `wrangler.toml` does not explicitly set `ENVIRONMENT=production` — it must be set as a wrangler secret or in `[vars]`.

**Recommendation:** Add `[vars] ENVIRONMENT = "production"` to the `[env.production]` section of `wrangler.toml`, or remove test routes entirely before going live. Logging if test routes are hit in production would also help detect misconfiguration.

**Status:** ⚠️ LOW — Document and verify at deploy time.

---

### FINDING-008: Security Response Headers (RECOMMENDATION)

**Severity:** Low — missing hardening headers

**Finding:** HTTP responses do not include standard security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`

**Recommendation:** Add a global middleware to Hono that sets these headers on all responses.

```typescript
app.use('*', async (c, next) => {
  await next()
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('X-Frame-Options', 'DENY')
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
})
```

**Status:** 📝 RECOMMENDATION — Not currently blocking, but good practice.

---

## Remediations Applied

### Remediation 1: Security headers middleware (FINDING-008)

Added global security headers middleware to `src/index.ts`:
```typescript
app.use('*', async (c, next) => {
  await next()
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('X-Frame-Options', 'DENY')
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
})
```

### Remediation 2: escHtml single-quote coverage (FINDING-002)

Updated `escHtml` in all page files to also escape single quotes.

---

## Checklist

| Area | Status |
|------|--------|
| SQL injection | ✅ All queries parameterized |
| XSS | ✅ All user data escaped via escHtml() |
| CSRF | ✅ SameSite=Lax on session cookies |
| Rate limiting | ✅ 5 magic links/email/hour |
| API key hashing | ✅ SHA-256, plaintext never stored |
| Session security | ✅ HttpOnly, Secure, SameSite=Lax, 7d TTL |
| Test route exposure | ⚠️ Guarded by ENVIRONMENT check — verify at deploy |
| Security headers | ✅ Added via middleware (remediated) |
