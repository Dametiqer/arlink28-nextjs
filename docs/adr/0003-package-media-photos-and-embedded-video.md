# 0003. Package media: hosted photos, embedded videos, reusable lodge galleries

- **Status:** Accepted, 2026-09-28
- **Amends:** the image model in [`docs/packages-api-plan.md`](../packages-api-plan.md) §3 and M4. Works within [ADR 0001](./0001-monorepo-on-cpanel.md)'s hosting limits.
- **Migration:** `packages/db/prisma/migrations/20260928184603_package_and_property_media`.

## Context

The owner's requirement: when staff upload a package, they must be able to add a primary image, supporting images and a video, so that a customer sees the experience before choosing the package.

The plan had one `package_images` table with `HERO`, `GALLERY` and `POSTER` roles and no video. Three facts shaped the change:

- **The host can't serve video well.** The cPanel account has no CDN, no object storage and almost certainly no `ffmpeg`, so it can't transcode. Every viewer would download one fixed-quality file from a shared host. Many customers are on mobile data in Lagos and Nairobi, where adaptive bitrate matters most.
- **The experience is mostly the lodge.** Rooms, views and activities belong to the property, not to a package. The 13 seeded packages cover only a few lodges (Giraffe Manor, Sala's Camp, Sasaab), and packages are often duplicates of each other (2 vs 4 nights, couple vs family).
- **`package_images` held no data.** The seed inserts no images and the upload endpoints (M4) weren't built, so the table could be replaced outright.

## Decision

- **Videos are embedded from YouTube or Vimeo, never stored on cPanel.**
  - A media row stores `video_provider` (`YOUTUBE` or `VIMEO`) and `video_id`. An unlisted Vimeo video needs its privacy hash, stored as `id:hash`.
  - Every video still has a thumbnail photo on our host (`path`, `width`, `height`). Pages load that photo and only load the player when the viewer presses play.
  - The pure helpers `parseVideoUrl()` and `videoEmbedUrl()` in `packages/shared` are the only code that reads a pasted link or builds a player URL. They use the no-cookie YouTube player and Vimeo's `dnt=1`.
- **Photos keep the plan's pipeline.** M4 still handles upload, type sniffing and WebP variants.
- **Packages and lodges each have their own gallery.**
  - `package_media` holds a package's media: one `HERO`, an ordered `GALLERY` that mixes photos and videos, and `POSTER`.
  - `property_media` holds a lodge's gallery. It's uploaded once and shown on every package that stays at that lodge.
  - Both tables allow an optional `caption`.
- **The database enforces the shape with CHECKs.**
  - The two video columns are set together or not at all.
  - A video is only ever in `GALLERY`, so `HERO` and `POSTER` are always photos. They feed cards, Open Graph tags and the poster lightbox.
- **The public contract.**
  - `PackageCard.hero` carries the primary photo.
  - `PackageDetail.media` returns `HERO`, then `GALLERY` in admin order, then `POSTER`.
  - `stays[].property.media` carries each lodge's gallery.
  - Each item is a `MediaItem` with `video: { provider, id, embedUrl } | null`.

## Consequences

- **Good:** video adds no disk or bandwidth load on cPanel. Customers get adaptive streaming.
- **Good:** lodge photos are uploaded once. A new package at an existing lodge shows a full gallery as soon as it has a hero.
- **Good:** the web and admin apps compile against one media shape, whether an item is a photo or a video.
- **Bad: two outside hosts.** Videos depend on YouTube or Vimeo staying available, and staff must upload there before they can link a video. The web app's CSP must allow `www.youtube-nocookie.com` and `player.vimeo.com` in `frame-src` (M2).
- **Bad: two tables with the same shape.** Package media and lodge media are separate tables, not one polymorphic table. MySQL forbids a CHECK on a column that has a cascading foreign key, so "exactly one owner" couldn't be enforced on a single table.
- **Not built yet:**
  - M4 adds the admin upload endpoints for both tables, including a "paste a video link" endpoint that uses `parseVideoUrl()` and fetches a default thumbnail.
  - M3's publish rule still requires exactly one `HERO` photo.
