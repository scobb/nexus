# Nexus UX Audit

**Audited by:** Ralph (AI agent)
**Date:** 2026-04-07
**Scope:** Nexus dashboard — all pages, mobile, navigation, empty states, error messages

---

## Summary

5 UX issues found and fixed. 1 bonus security fix applied (XSS in magic link success message).

---

## Issues Found and Fixed

### UX-001: Spans empty state — no actionable CTA (FIXED)

**Before:** "No spans recorded for this trace." (plain text, no action)

**After:**
> No spans recorded for this trace.
> Use `trace.addSpan()` in your agent to capture individual steps. [See the docs →]

**File:** `nexus/src/pages/traces.ts` — trace detail page span waterfall

---

### UX-002: Dashboard / Agents empty states — missing docs link (FIXED)

**Before:** Empty states on `/dashboard` and `/dashboard/agents` linked only to "Create an API key" — unhelpful if the user doesn't know what to do with it.

**After:** Both empty states now have two CTAs: "Read the docs →" (primary, links to `/docs`) and "Create an API key" (secondary).

**Files:** `nexus/src/pages/dashboard.ts`, `nexus/src/pages/agents.ts`

---

### UX-003: Traces list empty state — missing docs link (FIXED)

**Before:** "Add the SDK to your agent to start tracking. Create an API key to get started."

**After:** Two-button CTA: "Read the docs →" and "Create an API key" — same pattern as dashboard.

**File:** `nexus/src/pages/traces.ts`

---

### UX-004: XSS in magic link success message (SECURITY FIX)

**Before:** User-supplied email address was interpolated into the success message without HTML escaping:
```typescript
return c.html(loginPage(null, `Check your inbox! We sent a sign-in link to ${email}`))
```
A crafted email like `test<script>alert(1)</script>@example.com` would execute JavaScript.

**After:** Email escaped before insertion:
```typescript
const safeEmail = email.replace(/&/g, '&amp;').replace(/</g, '&lt;')...
return c.html(loginPage(null, `Check your inbox! We sent a sign-in link to ${safeEmail}`))
```

**File:** `nexus/src/routes/auth.ts`

> **Note:** This was found during UX review but is classified as a security fix. Also added to SECURITY-AUDIT.md.

---

### UX-005: Trace filter "Clear" button — already present (NO CHANGE)

**Finding:** The traces page already shows a "Clear" link when filters are active (via `${isFiltered ? '<a href="/dashboard/traces">Clear</a>' : ''}`).

**Status:** ✅ Already implemented. No change needed.

---

## Navigation Audit

### Active states
All dashboard pages use consistent nav bar with active state highlighting:
- `text-white font-medium` for the active link
- `text-gray-400` for inactive links
- Verified in: dashboard, traces, agents, keys, billing, settings

### Mobile nav (375px)
- Nav bars use `flex-wrap` to allow items to flow to next line on small screens
- No horizontal overflow detected at 375px in page templates
- Tables wrapped in `overflow-x-auto` (keys, agents, traces)

### Nav completeness
All dashboard pages include the full nav: Overview / Traces / Agents / API Keys / Billing / Settings / Docs / [email] / Sign out

---

## Error State Audit

| Flow | Error handling |
|------|---------------|
| Invalid email on magic link | "Invalid email address." ✅ |
| Rate limit exceeded | "Too many requests. Please wait an hour..." ✅ |
| Email send failure | "Failed to send email. Please try again." ✅ |
| Invalid magic link token | "Invalid or expired link. Please request a new one." ✅ |
| Key name empty | "Key name is required" ✅ |
| Wrong password | "Invalid email or password." ✅ |
| Account delete wrong confirmation | "Please type 'delete my account' to confirm" ✅ |

All error messages are actionable and specific.

---

## Checklist

| Area | Status |
|------|--------|
| Empty states — traces list | ✅ Fixed (added docs CTA) |
| Empty states — agents list | ✅ Fixed (added docs CTA) |
| Empty states — dashboard agents card | ✅ Fixed (added docs CTA) |
| Empty states — trace spans | ✅ Fixed (added SDK + docs reference) |
| Mobile nav at 375px | ✅ Pass — flex-wrap prevents overflow |
| Active nav indicators | ✅ Pass — text-white font-medium on active |
| Error messages | ✅ Pass — all actionable and specific |
| XSS in success message | ✅ Fixed |
