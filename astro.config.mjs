// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";

// `BASE_PATH` lets the same build deploy at a GitHub Pages subpath
// (/bhoomiseva/) or at the domain root. See src/utils/url.ts.
const site = process.env.SITE_URL || "https://bhoomiseva.org";
const base = process.env.BASE_PATH || "/";

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [svelte(), sitemap()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "kn"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
