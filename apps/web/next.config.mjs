/** @type {import('next').NextConfig} */
const nextConfig = {
  // The original site's images are plain static files (not run through
  // next/image optimization) — keep that behaviour so nothing breaks
  // if you later switch some <img> tags to next/image.
  images: {
    unoptimized: true,
  },
  // Linting runs as its own step (eslint.config.mjs; Next 14's built-in lint
  // can't read ESLint 9 flat config).
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
