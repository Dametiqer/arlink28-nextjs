# Security Notes

First audit of this repo: 2026-09-25. Most of the findings that apply to `ARlinkII8` and `arlink-static-web` (hardcoded Web3Forms keys, the newsletter storage/rollout issues) **do not apply here**, because this repo has no backend integrations at all yet. That absence is itself worth recording, both as good news and as a gap.

## Open findings

### 1. Forms give no feedback and silently discard everything submitted
Every newsletter, contact, and booking form on every page is intercepted by `ClientEffects.tsx`'s shared submit handler, which calls `preventDefault()`, logs to the console, and resets the form — with no success or error message shown to the user (there's no `.form-success-msg`-equivalent element anywhere in this repo). A visitor has no way to tell, from the UI alone, that nothing was actually sent anywhere.

This isn't a vulnerability, but it's a correctness/honesty gap worth fixing before this repo is ever deployed: either show an explicit "this form isn't connected yet" state in non-production builds, or (the real fix) wire the forms up before shipping.

**Recommendation:** don't deploy this repo as-is; see [`architecture.md`](./architecture.md) for what's missing relative to `arlink-static-web`.

### 2. No environment-variable-based configuration
No `.env`/`.env.example` exists, and nothing currently needs one. When Web3Forms, Mailchimp, or any other integration is ported into this repo, follow an env-var pattern from the start — don't repeat the hardcoded-in-source precedent from the other two repos (acceptable there only because Web3Forms/Mailchimp client-side identifiers are public-by-design; anything that's an actual secret must not follow that precedent).

## Non-findings (checked, no issue)
- No SQL/NoSQL usage anywhere — no injection surface.
- No auth/session system exists, so no auth-bypass surface.
- No payment handling exists — no PCI/payment-data exposure risk.
- No hardcoded API keys or access tokens of any kind exist in this repo (a genuine improvement over both other repos, even if only because nothing is wired up yet).
- No server-side route handlers exist (`app/api/` absent), so there's no server-side endpoint to audit for rate limiting, auth, or unbounded result sets — the class of bug found in `ARlinkII8`'s `/api/contact` simply has no equivalent here yet.

## What to re-check when integrations are ported in

When Web3Forms and/or Mailchimp wiring is added to `ClientEffects.tsx` (or wherever it ends up), re-run the same checks already recorded for the other two repos — see `arlink-static-web`'s `docs/security.md` for the current list (hardcoded-key exposure, no CAPTCHA/rate limiting, and specifically: **wire it once, in the shared component, not per-page** — that's the one thing this repo's architecture already gets right that `arlink-static-web` got wrong).
