import type { NextConfig } from "next"

// Single source of truth for the base path.
// Project page (lmmh202.github.io/blog) -> "/blog".
// User page or custom domain -> "".
const basePath = "/blog"

const nextConfig: NextConfig = {
  // Build to static HTML (SSG). Generates the out/ directory.
  output: "export",
  // Emit each route as a directory/index.html so it works reliably on GitHub Pages.
  trailingSlash: true,
  // No image optimization server is available, so disable it.
  images: {
    unoptimized: true,
  },
  basePath,
  // Expose the base path to app code so raw asset URLs (e.g. <img src>) can be prefixed.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig
