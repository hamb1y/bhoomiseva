// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://bhoomiseva.org",
  integrations: [svelte(), sitemap()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "kn"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
