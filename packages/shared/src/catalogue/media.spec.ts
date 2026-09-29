import { parseVideoUrl, videoEmbedUrl } from "./media";

describe("parseVideoUrl", () => {
  it.each([
    ["https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42s", "dQw4w9WgXcQ"],
    ["https://m.youtube.com/watch?v=dQw4w9WgXcQ", "dQw4w9WgXcQ"],
    ["https://youtu.be/dQw4w9WgXcQ?si=abc", "dQw4w9WgXcQ"],
    ["https://www.youtube.com/shorts/dQw4w9WgXcQ", "dQw4w9WgXcQ"],
    ["https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ", "dQw4w9WgXcQ"],
    ["  https://youtu.be/dQw4w9WgXcQ  ", "dQw4w9WgXcQ"],
  ])("reads the YouTube id from %s", (url, id) => {
    expect(parseVideoUrl(url)).toEqual({ provider: "YOUTUBE", id });
  });

  it.each([
    ["https://vimeo.com/123456789", "123456789"],
    ["https://vimeo.com/123456789/abcdef1234", "123456789:abcdef1234"],
    ["https://player.vimeo.com/video/123456789?h=abcdef1234", "123456789:abcdef1234"],
    ["https://player.vimeo.com/video/123456789", "123456789"],
  ])("reads the Vimeo id (and unlisted hash) from %s", (url, id) => {
    expect(parseVideoUrl(url)).toEqual({ provider: "VIMEO", id });
  });

  it.each([
    "not a url",
    "ftp://youtu.be/dQw4w9WgXcQ",
    "https://evil.example/watch?v=dQw4w9WgXcQ",
    "https://youtube.com.evil.example/watch?v=dQw4w9WgXcQ",
    "https://www.youtube.com/watch?v=short",
    "https://www.youtube.com/channel/UC1234567890",
    "https://vimeo.com/channels/staffpicks",
    "https://vimeo.com/123456789/NOT-HEX",
  ])("rejects %s", (url) => {
    expect(parseVideoUrl(url)).toBeNull();
  });
});

describe("videoEmbedUrl", () => {
  it("uses YouTube's no-cookie player", () => {
    expect(videoEmbedUrl("YOUTUBE", "dQw4w9WgXcQ")).toBe("https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ");
  });

  it("passes Vimeo's privacy hash and do-not-track", () => {
    expect(videoEmbedUrl("VIMEO", "123456789")).toBe("https://player.vimeo.com/video/123456789?dnt=1");
    expect(videoEmbedUrl("VIMEO", "123456789:abcdef1234")).toBe(
      "https://player.vimeo.com/video/123456789?dnt=1&h=abcdef1234",
    );
  });

  it("round-trips every accepted link", () => {
    for (const url of ["https://youtu.be/dQw4w9WgXcQ", "https://vimeo.com/123456789/abcdef1234"]) {
      const ref = parseVideoUrl(url)!;
      expect(parseVideoUrl(videoEmbedUrl(ref.provider, ref.id))).toEqual(ref);
    }
  });
});
