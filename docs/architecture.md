# Architecture

## Stack

- **Framework:** Next.js 14 (App Router), React 18, **TypeScript** (`strict: false`) — unlike both other ARLink28 repos, which are plain JS
- **Styling:** hand-written CSS per page/section under `app/styles/*.css` (naming convention: `<page>-inline.css` for page-specific rules, plus shared files `content-shared.css`, `legal.css`, `people.css`, `book.css`, `destinations.css`, `services.css`, `travel.css`), imported per-page rather than all globally; base tokens and resets live in a minified `app/globals.css` imported once in the root layout
- **Icons/Fonts:** Font Awesome 6.4.0 via a single `<link>` in `app/layout.tsx`; Google Fonts "Outfit" via a single `@import` inside `globals.css` — **no duplication**, unlike the double-loading the 2026-09-18 audit originally found in `ARlinkII8`
- **Images:** `next.config.mjs` sets `images: { unoptimized: true }` deliberately, to keep `<img>` behaving like the plain static files it's recreating rather than routing through `next/image`'s optimization pipeline
- **Data layer:** none. No database, ORM, or SQL/NoSQL client
- **Auth:** none
- **Backend:** none — `app/api/` does not exist in this repo at all
- **Deployment target:** unconfigured. `next.config.mjs` does **not** set `output: "export"`, so `npm run build` currently produces a standard Next.js server build, not a static `out/` directory — see [`instructions.md`](./instructions.md) for why that matters

## Relationship to the other two ARLink28 repos

This project has three repos with three different roles:

| Repo | Role | Backend wiring |
|---|---|---|
| `ARlinkII8` (`airlinks-nextjs`) | Original plain-JS Next.js source | Web3Forms hardcoded in `src/app/contact/page.js`; `/api/contact` route writing to `data/contacts.json` |
| `arlink-static-web` | **The deployed site** (static export served from cPanel via `.htaccess`) | Web3Forms hardcoded directly in shipped `contact.html`; newsletter posts to **Mailchimp** via a hand-patched inline script present on 7 of 10 pages (broken on 3) |
| `arlink28-nextjs` (this repo) | A from-scratch TypeScript rebuild of the same site | **None at all** — every form is a stub (see below) |

This repo's components and page structure are a faithful visual/structural recreation of what's live in `arlink-static-web` (same routes, same copy, same design tokens, same image assets — `public/images/` has the identical 155 files including the `packages/` subfolder with both the Giraffe Manor and Zanzibar lines). What it does **not** carry over is any of the real integrations that exist only as hand-patches in `arlink-static-web`: no Web3Forms fetch call, no Mailchimp JSONP, and the homepage booking widget's tab forms don't forward search params to `/book/*` the way the deployed site's does.

## Integrations

| Integration | Status here | Notes |
|---|---|---|
| **Web3Forms** | **Not implemented.** No access keys, no `fetch` call, anywhere in this repo | Present and hardcoded in both other repos |
| **Mailchimp** | **Not implemented.** No JSONP script, no list/form IDs | Present (inconsistently) in `arlink-static-web` only |
| **`/api/contact`** | **Not implemented.** No `app/api/` directory exists | Present (dormant, undeployed) in `ARlinkII8` only |
| **Newsletter / contact / booking forms** | Every `form.newsletter-form`, `form.contact-form` and `form.booking-form` on every page is intercepted by one shared client component, `ClientEffects` (mounted once in `app/layout.tsx`) | See below — this is a real architectural improvement over `arlink-static-web`'s per-page hand-patching, but it currently intercepts into a no-op |
| **WhatsApp / `tel:` links** | Plain `<a href="wa.me/...">`, `<a href="tel:...">`, same numbers as the other repos | Deep links, not an API integration |

### `ClientEffects.tsx` — the shared behavior layer, and what it actually does

`components/ClientEffects.tsx` is mounted once at the root layout and re-runs its effects on every client-side route change (keyed off `usePathname()`). It's the single place that recreates several pieces of "vanilla" DOM behavior the original static export needed: scroll-reveal animations (`IntersectionObserver` on `.reveal`/`.reveal-left`/`.reveal-right`/`.reveal-scale`), the "Read Full Write-Up" accordion on the engagement-details page, the poster lightbox on the Giraffe Manor page, and the "Watch our story" video modal on the About page.

**For forms specifically**, its handler is an explicit stub:

```ts
const handleSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  console.log("Form submitted (no backend wired up yet):", form.id || form.className);
  form.reset();
};
```

Every newsletter, contact, and booking form on every page hits this same handler. It clears the form and logs to the console — **it does not show the user any success or error message** (there's no `.form-success-msg`-equivalent element anywhere in this repo's JSX, unlike the deployed site's `contact.html`). A visitor filling in any form here sees the fields clear and nothing else; nothing is sent anywhere.

**Why this matters, both ways:**
- **It's the right architecture.** Because the wiring lives in one component mounted once, not pasted per-page, the exact bug found in `arlink-static-web` (newsletter form present but its script missing on 3 of 10 pages) is structurally impossible here — there's no per-page script to forget.
- **It's currently a functional regression against the live site.** None of the real integrations (Web3Forms, Mailchimp) have been ported into this shared layer yet, so if this repo were deployed as-is today, it would silently accept zero enquiries and zero newsletter signups — worse than `arlink-static-web`'s partial breakage, everywhere instead of on 3 pages.

## Booking architecture

Same shape as the other two repos — there is no booking engine:

1. **Homepage booking widget** (`components/BookingWidget.tsx`, used on the homepage and the four `/book/*` pages via an `initialTab` prop) — four tabs (flight/hotel/holiday/visa) with real `<select>`/`<input>` fields (the flight tab even has a full IATA airport picker grouped by region). The flight form carries `action="/book/flight.html"` as a plain HTML attribute, but `ClientEffects`'s generic handler intercepts and `preventDefault()`s every submit before that action can fire — so the attribute is currently inert, and none of the four forms forward their field values anywhere (unlike `arlink-static-web`'s homepage widget, which does forward `from`/`to`/`seat` as query params to `/book/flight.html`).
2. **`/book/flight`, `/book/hotel`, `/book/holiday`, `/book/visa`** — real Next.js routes (`app/book/*/page.tsx`), each rendering `BookingWidget` pre-selected to the matching tab. A code comment notes the original static export's `/book/*` pages shipped only a client-only "Loading..." placeholder in their static HTML, so their exact original markup couldn't be recovered — this repo's version is a reconstruction, not a byte-for-byte copy.
3. **`/contact`** — same tabbed enquiry form as the other repos, but submitting it hits the `ClientEffects` stub, not Web3Forms.
4. No human-fulfillment step exists to describe, because nothing is ever sent to a human from this repo's forms today.

## Related docs

- [`instructions.md`](./instructions.md) — setup, run, and the static-export config gap
- [`memory.md`](./memory.md) — when this repo was found and how it compares to the other two
- [`security.md`](./security.md) — what does and doesn't apply here, given there's no backend at all yet
