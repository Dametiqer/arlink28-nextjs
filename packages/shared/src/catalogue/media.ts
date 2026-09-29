import { z } from "zod";
import type { VideoProvider } from "./enums";

// Package and lodge videos are embedded from YouTube or Vimeo rather than
// stored on cPanel (ADR 0003). The database keeps only the provider and the
// video's id; these helpers are the one place that turns a pasted link into
// that pair and the pair back into a player URL.

// WHATWG URL exists in every runtime this package targets (browsers, Node), but
// `lib: ES2021` deliberately has no DOM or Node typings; declare only what's used.
declare const URL: new (input: string) => {
  protocol: string;
  hostname: string;
  pathname: string;
  searchParams: { get(name: string): string | null };
};

/** YouTube ids are 11 URL-safe base64 characters. */
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
/** Vimeo ids are numeric; unlisted videos also need their privacy hash, stored as `id:hash`. */
const VIMEO_ID = /^\d{6,12}(:[0-9a-f]{6,20})?$/;

export const VideoRef = z.discriminatedUnion("provider", [
  z.object({ provider: z.literal("YOUTUBE"), id: z.string().regex(YOUTUBE_ID) }),
  z.object({ provider: z.literal("VIMEO"), id: z.string().regex(VIMEO_ID) }),
]);
export type VideoRef = z.infer<typeof VideoRef>;

/** Privacy-friendly player URL for an iframe. The web CSP must allow both hosts in `frame-src`. */
export function videoEmbedUrl(provider: VideoProvider, id: string): string {
  if (provider === "YOUTUBE") return `https://www.youtube-nocookie.com/embed/${id}`;
  const [videoId, hash] = id.split(":");
  return `https://player.vimeo.com/video/${videoId}?dnt=1${hash ? `&h=${hash}` : ""}`;
}

/**
 * Parses a link an admin pasted (watch, share, shorts, embed or unlisted Vimeo
 * URLs). Returns null for anything else, including other hosts.
 */
export function parseVideoUrl(raw: string): VideoRef | null {
  let url: InstanceType<typeof URL>;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  const host = url.hostname.replace(/^(www|m)\./, "");
  const parts = url.pathname.split("/").filter(Boolean);

  let ref: VideoRef | null = null;
  if (host === "youtu.be") {
    ref = { provider: "YOUTUBE", id: parts[0] ?? "" };
  } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const id =
      parts[0] === "watch"
        ? url.searchParams.get("v")
        : ["embed", "shorts", "live"].includes(parts[0])
          ? parts[1]
          : null;
    ref = { provider: "YOUTUBE", id: id ?? "" };
  } else if (host === "vimeo.com" || host === "player.vimeo.com") {
    const rest = host === "player.vimeo.com" && parts[0] === "video" ? parts.slice(1) : parts;
    const hash = rest[1] ?? url.searchParams.get("h");
    ref = { provider: "VIMEO", id: hash ? `${rest[0]}:${hash}` : (rest[0] ?? "") };
  }
  const parsed = ref && VideoRef.safeParse(ref);
  return parsed && parsed.success ? parsed.data : null;
}
