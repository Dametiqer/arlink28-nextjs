# Design System

Extracted from `app/globals.css` (global tokens/base, minified) and the per-page CSS files under `app/styles/`. There is no design-tool source of truth (no Figma link, no design-tokens JSON) — **this file, read alongside `app/styles/`, is the closest thing to one.**

## Visual language

Dark, glassy, high-contrast — near-black backgrounds, translucent "glass" panels, a single red accent used sparingly for CTAs and highlights. Identical to `arlink-static-web`'s shipped design — verified byte-for-byte against the same token values.

## Tokens (CSS custom properties, defined once in `globals.css:root`)

| Token | Value | Use |
|---|---|---|
| `--bg-primary` | `#05090f` | Page background (near-black) |
| `--bg-secondary` | `#0b121c` | Section/card background |
| `--bg-footer` | `#180305` | Footer background (dark red-black) |
| `--primary-red` | `#e61e2b` | Brand accent — CTAs, highlights, active states |
| `--primary-red-hover` | `#c91621` | Hover state for red elements |
| `--primary-red-glow` | `rgba(230,30,43,0.25)` | Glow/shadow accents |
| `--text-main` | `#ffffff` | Primary text |
| `--text-muted` | `#8b9cb5` | Secondary/supporting text |
| `--text-dark` | `#4d5d75` | De-emphasized text |
| `--glass-bg` | `rgba(11,19,31,0.75)` | Frosted panel background |
| `--glass-border` | `rgba(255,255,255,0.07)` | Frosted panel border |
| `--glass-shadow` | `0 8px 32px 0 rgba(0,0,0,0.4)` | Frosted panel shadow |
| `--card-glow` | `0 10px 30px -5px rgba(0,0,0,0.5)` | Card elevation shadow |
| `--transition-smooth` | `all 0.3s cubic-bezier(0.4,0,0.2,1)` | Standard hover/interaction easing |

**No light mode.** No `prefers-color-scheme` handling or theme toggle — dark-only by design, same as the other repos.

## Typography

- Single typeface: **Outfit** (Google Fonts, weights 300–800), loaded **once**, via a single `@import` in `globals.css`. `app/layout.tsx` does not additionally `<link>` it — this repo does not have the double-loading issue the 2026-09-18 audit found in `ARlinkII8`.
- Font Awesome 6.4.0 is likewise loaded exactly once, via a `<link>` in `app/layout.tsx`.

## Core reusable components (defined in `globals.css`, used across pages)

- **`.btn-primary`** — solid red button, 6px radius, red glow shadow, lifts (`translateY(-2px)`) on hover
- **`.btn-secondary`** — glass-style button (blurred translucent background + border), same hover lift
- **`.glass-panel`** — the signature card style: `--glass-bg` background, `--glass-border` border, `backdrop-filter: blur(12px)`, 12px radius, `--glass-shadow`. Used for the booking widget, contact info cards, FAQ items, side panels, etc.
- **`.section-tag`** — small uppercase label/pill used to head each page section

## Layout patterns

- Custom scrollbar styled to match theme
- Icon-driven UI throughout via Font Awesome (CDN, not bundled)
- Responsive breakpoints scattered per-file, same pattern as the other repos — no shared breakpoint variables

## Package imagery

`public/images/packages/` matches `arlink-static-web` exactly (same 15 files, same filenames): the Giraffe Manor line (7 variants) and the Zanzibar line (8 variants). Unlike `ARlinkII8`'s original state (missing entirely, per the 2026-09-18 audit in that repo), this repo's images were present from its first commit.

## Structural differences from the other repos (not inconsistencies — deliberate choices)

- **Per-page CSS imports, not global.** `ARlinkII8` imported every page's CSS globally in `layout.js`. This repo imports each page's stylesheet only in that page's `page.tsx` (e.g. `app/contact/page.tsx` imports `../styles/content-shared.css`), which is the more idiomatic Next.js App Router pattern and avoids shipping every page's CSS to every route.
- **Inline styles remain common** — the booking widget's `<select>` icons, response-time progress bars, etc. use inline `style={{ ... }}` just as in the other repos. Not fixed here; carried over as-is.

## Related docs

- [`architecture.md`](./architecture.md) — the three-repo relationship and what's structurally different here
- [`instructions.md`](./instructions.md) — setup and the static-export config gap
