// Base path injected from next.config.ts (empty string when unset).
// Use this to prefix raw asset URLs that Next.js does not rewrite automatically,
// such as plain <img src> values or static files served from public/.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export function asset(path: string) {
  return `${basePath}${path.startsWith("/") ? "" : "/"}${path}`
}
