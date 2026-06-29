import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Build to static HTML (SSG). Generates the out/ directory.
  output: "export",
  // Emit each route as a directory/index.html so it works reliably on GitHub Pages.
  trailingSlash: true,
  // No image optimization server is available, so disable it.
  images: {
    unoptimized: true,
  },
  basePath: "/blog",
  assetPrefix: "/blog/",
}

export default nextConfig
