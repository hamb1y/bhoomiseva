# AGENTS.md

Guidance for AI agents (and humans) working in this repository.

## What this is

The website for **Bhoomi Seva**, a volunteer-led social initiative supporting rural communities in Karnataka. A bilingual (English + Kannada), content-driven static site.

- **Framework:** Astro (static output, islands)
- **Interactive components:** Svelte 5
- **Icons:** `lucide-astro` (static) and `lucide-svelte` (islands)
- **Styling:** vanilla CSS with design tokens (no CSS framework)
- **CMS:** [Sveltia CMS](https://sveltiacms.app) — Git-based, no server or database, configured in `public/admin/config.yml`
- **Content:** JSON files under `content/` (the source of truth)
- **Package manager / runtime:** Bun
- **Fonts:** self-hosted via Fontsource

## Read these first

1. **[DESIGN.md](./DESIGN.md)** — the binding design system and the anti-slop rules.
2. **[SPEC.md](./SPEC.md)** — product spec: architecture, information architecture, content model, CMS, launch checklist.

## Development

Start the dev server in background mode:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`.

```
bun install            # dependencies
bun run dev            # dev server on :4321
bun run build          # production build to dist/
bun run check          # astro check (types + diagnostics)
bun run verify         # browser check over every route + interaction
bun run images         # regenerate WebP from public/images originals
bun run logo           # rebuild logo assets from source artwork
bun run format         # prettier
```

**If the interactive islands stop responding** (dropdown, lightbox, mobile nav), the Vite dependency cache is stale — this happens after changing dependencies while `astro dev` is running. Restart the dev server. `bun run verify` reports it as a hydration or 504 failure.

### Editing content

Content lives in `content/` as JSON. Edit it through the CMS — `http://localhost:4321/admin/index.html` in a Chromium browser, choosing _Work with Local Repository_ — or by hand if the change is trivial.

## Repository layout

```
content/         JSON content, one file per entry (edited via the CMS)
public/
  admin/         Sveltia CMS: index.html + config.yml
  images/        committed images, referenced as /images/…
src/
  components/    Astro components (static) + Svelte components (islands)
  data/
    load.ts      converts the CMS file shape into the site's types
    *.ts         typed collections: stories, events, blogs, programs, team, site
    types.ts     Story, Entry, Blog, Program, Person, Site
  i18n/          ui.ts string dictionary, utils.ts helpers
  layouts/       BaseLayout.astro
  lib/           nav.ts, paths.ts
  pages/         file-based routes; /kn/* mirrors the English routes
  styles/        tokens.css, global.css
  views/         page implementations, rendered by the thin route files
                 EntryCard / EntryIndex / EntryDetail are shared by events and blogs
scripts/         optimize-images.mjs, make-logo.mjs, verify-site.mjs
```

## Content conventions

- **`content/` is the source of truth.** The site reads it at build time via `import.meta.glob` — see `src/data/load.ts`.
- **Add fields in two places:** the site type in `src/data/types.ts` and the loader in `src/data/load.ts`, plus the field in `public/admin/config.yml` so editors can fill it. If a field is translatable it goes under the locale keys; otherwise it is shared and stored once under the default locale.
- **All file-shape handling lives in `src/data/load.ts`.** Do not let views or components know about the on-disk format.
- Each entry is one JSON file named after its slug. The filename _is_ the slug.
- Uploads carry a **photo position** (centre/top/bottom/left/right); the site applies it with `object-position` (see `objectPosition()` in `src/utils/format.ts`). Do not hard-crop images in CSS.

## Conventions

- **Astro by default, Svelte only when interactive.** Do not turn static content into an island.
- **Use tokens, never raw values.** Colours, spacing, radii, type sizes and easing come from `src/styles/tokens.css`.
- **TypeScript strict.** Type all data. Use `Localized` for translatable fields.
- **Semantic colour.** `--clay` action, `--leaf` farmers/environment, `--turmeric` education, `--indigo` children/community, `--rose` urgent. Never recolour a pillar.
- Prefer editing existing patterns over inventing parallel ones.
- Keep server-rendered markup meaningful for SEO.

## Internationalisation

- Locales: `en` (default, unprefixed) and `kn` (prefixed `/kn/`).
- UI strings: `src/i18n/ui.ts`. Use `useTranslations(lang)`.
- Content fields: `Localized = string | { en: string; kn?: string }`; missing `kn` falls back to `en`.
- Sveltia uses the `single_file` structure, so each entry file is `{ "en": {…}, "kn": {…} }`. `src/data/load.ts` converts that to the `{ en, kn }` per-field shape the site uses.
- **Kannada copy is a first pass and must be reviewed by a native speaker.** Do not machine-translate long-form content into the CMS.

## Content and claims policy

- Every story is **dated or given an explicit period**, and located.
- Preserve documented Bhoomi Seva activity (scholarships, fees, JNV coaching, tutoring, farmer training, desi cow donation, children's-home support).
- **Do not publish** unsupported global statistics ("60 years of soil left"), guaranteed income multipliers ("300–800%" without attribution), or "soil extinction" framing.
- Do not assert a planned action as completed (e.g. the Sannamma cow donation) unless the outcome is confirmed.
- Do not publish stale facts (team members' children's ages, "for the past eight years"). Prefer "years of experience".
- Payment and contact details must be **verified** before launch. The UI shows an unconfirmed state until `payment.verified` is true.
- **Never invent donor or beneficiary writing.** The Blogs collections may legitimately be empty.

## Do not

- Introduce a second CSS methodology, a UI component library, or a CSS framework.
- Use Inter/Geist/system-only fonts, purple or blue gradients, glassmorphism, gradient text, glowing halos, nested cards, icon-tiles above headings, auto-marquees, pulsing dots, bounce easing, or hover image zoom. These are banned in DESIGN.md.
- Reintroduce the "ledger scaffolding" that was deliberately removed: numbered `01/02/03` section markers, mono uppercase eyebrows, and rules on every block.
- Delete low-resolution source images (they are kept deliberately).
- Commit secrets, or unverified personal data.
