/** @type {import('next').NextConfig} */
const nextConfig = {
  // Admin ships as plain static files to admin.arlink28.com's document root
  // (docs/monorepo-migration.md) — unlike apps/web, which runs as a live
  // Passenger Node app, this app is the one that should stay a static export.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
