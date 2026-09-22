/**
 * Deployment base path.
 *
 * The site is normally served from the domain root, but GitHub Pages serves a
 * project repository from a subpath (`/bhoomiseva/`). Astro exposes the
 * configured `base` as `import.meta.env.BASE_URL` (always with a trailing
 * slash), so every root-relative URL goes through `asset()` to keep working in
 * both cases.
 */

/** The configured base, normalised to have no trailing slash ("" at the root). */
export const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");

/** Prefix a root-relative path with the deployment base. Leaves absolute URLs alone. */
export function asset(path?: string): string | undefined {
  if (!path) return path;
  if (/^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith("//")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
