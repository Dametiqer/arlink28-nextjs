/** @type {import('next').NextConfig} */
const nextConfig = {
  // The original site's images are plain static files (not run through
  // next/image optimization) — keep that behaviour so nothing breaks
  // if you later switch some <img> tags to next/image.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
