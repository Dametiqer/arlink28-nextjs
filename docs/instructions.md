# Instructions

## Stack
- Next.js 14 (App Router), React 18, **TypeScript** (`strict: false`), hand-written CSS per page in `app/styles/`
- No database, no auth, no payment provider, no backend at all (`app/api/` doesn't exist)

See [`architecture.md`](./architecture.md) for what is and isn't wired up, and how this repo relates to `ARlinkII8` and `arlink-static-web`.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — Next.js lint

## Known gap: not configured for static export

`arlink-static-web` (the actually-deployed repo) is a static HTML/CSS/JS export served from cPanel via Apache. `next.config.mjs` in **this** repo does not set `output: "export"`, so `npm run build` today produces a standard Next.js server build (a `.next/` directory meant for `npm run start` or a Node host), not the static `out/` directory that `arlink-static-web` needs.

**If the intent is for this repo to eventually become the source that regenerates `arlink-static-web`'s deploy**, two things are needed before that's true:
1. Add `output: "export"` to `next.config.mjs` (compatible with `images.unoptimized: true`, which is already set).
2. Port the real integrations back in — see [`architecture.md`](./architecture.md)'s `ClientEffects.tsx` section and [`security.md`](./security.md) for what's missing (Web3Forms, Mailchimp, booking-widget query-param forwarding) before a build from this repo would actually match what's live today.

Until then, treat this repo as a parallel rebuild-in-progress, not a drop-in replacement for the deploy pipeline.

## Project structure

```
app/                  Next.js App Router pages (one folder per route)
app/styles/           Per-page CSS, imported by that page's page.tsx (not global)
app/globals.css       Base tokens/resets, minified, imported once in layout.tsx
app/layout.tsx         Root layout: Header, Footer, ClientEffects, BackToTop, Font Awesome <link>
components/            Header, Footer, BookingWidget, ClientEffects, BackToTop
public/images/         Site imagery, including public/images/packages/ (Giraffe Manor + Zanzibar)
```

`@/*` resolves to the repo root (`tsconfig.json` `paths`), e.g. `import Header from "@/components/Header"`.

## Environment variables

None. There's no `.env`/`.env.example`, and there's currently nothing that would need one — no integration in this repo holds a key or secret of any kind (unlike `arlink-static-web`'s hardcoded Web3Forms keys, or `ARlinkII8`'s equivalent). See [`security.md`](./security.md) for what to set up if/when the real integrations are ported in here.
