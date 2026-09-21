# AGENTS.md

Guidance for AI agents (and humans) working in this repository.

## What this is

The website for **Bhoomi Seva**, a volunteer-led social initiative supporting rural communities in Karnataka. A bilingual (English + Kannada), CMS-backed static site.

- **Framework:** Astro (static output, islands)
- **Interactive components:** Svelte 5
- **Icons:** `lucide-astro` (static) and `lucide-svelte` (islands)
- **Styling:** vanilla CSS with design tokens (no CSS framework)
- **CMS:** Payload 3, in `cms/` (separate Next.js app)
- **Package manager / runtime:** Bun
- **Fonts:** self-hosted via Fontsource

## Read these first

1. **[DESIGN.md](./DESIGN.md)** — the binding design system and the anti-slop rules.
2. **[SPEC.md](./SPEC.md)** — product spec: architecture, information architecture, content model, CMS pipeline, launch checklist.

## Development

Start the dev server in background mode:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`.

```
bun install            # Astro site dependencies
bun run dev            # dev server
bun run build          # production build to dist/
bun run check          # astro check (types + diagnostics)
bun run images         # regenerate WebP from public/images originals
bun run content:pull   # sync content from Payload -> src/data/generated
bun run cms:seed       # push seed content into a running Payload instance
bun run format         # prettier
```

The CMS is a separate app:

```
cd cms && bun install && bun dev     # http://localhost:3000/admin
```

See `cms/README.md`.

## Repository layout

```
src/
  components/    Astro components (static) + Svelte components (islands)
  data/
    seed/        hand-written source content (the fallback)
    generated/   written by `bun run content:pull` — never edit by hand
    *.ts         resolvers: generated content wins, seed is the fallback
    types.ts     Story, Program, Person, Update, Site
  i18n/          ui.ts string dictionary, utils.ts helpers
  layouts/       BaseLayout.astro
  pages/         file-based routes; /kn/* mirrors the English routes
  styles/        tokens.css, global.css
  views/         page implementations, rendered by the thin route files
public/
  images/        committed WebP + originals
  media/         CMS-synced media (git-ignored)
cms/             Payload 3 app (own package.json)
scripts/         optimize-images.mjs, pull-content.mjs, seed-cms.mjs
```

## Content conventions

- **Never edit `src/data/generated/*`** — it is overwritten by `content:pull`.
- **Never edit `src/data/seed/*` to change live content** once the CMS is in use. Seed content is the fallback; the CMS is the source of truth.
- If you add a field or collection, change it in **all four** places: `src/data/types.ts`, the Payload collection in `cms/collections/`, the mapping in `scripts/pull-content.mjs`, and (if needed) the seed in `src/data/seed/`.
- Content lives in data, not markup, so it can be translated and reused.

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
- Payload stores both locales per document; the pull script preserves the `{ en, kn }` shape.
- **Kannada copy in the seed is a first pass and must be reviewed by a native speaker.** Do not machine-translate long-form content into the CMS.

## Content and claims policy

- Every story is **dated or given an explicit period**, and located.
- Preserve documented Bhoomi Seva activity (scholarships, fees, JNV coaching, tutoring, farmer training, desi cow donation, children's-home support).
- **Do not publish** unsupported global statistics ("60 years of soil left"), guaranteed income multipliers ("300–800%" without attribution), or "soil extinction" framing.
- Do not assert a planned action as completed (e.g. the Sannamma cow donation) unless the outcome is confirmed.
- Do not publish stale facts (team members' children's ages, "for the past eight years"). Prefer "years of experience".
- Payment and contact details must be **verified** before launch. The UI shows an unconfirmed state until `payment.verified` is true.

## Do not

- Hand-edit generated content, or delete low-resolution source images (they are kept deliberately).
- Introduce a second CSS methodology, a UI component library, or a CSS framework.
- Use Inter/Geist/system-only fonts, purple or blue gradients, glassmorphism, gradient text, glowing halos, nested cards, icon-tiles above headings, auto-marquees, pulsing dots, bounce easing, or hover image zoom. These are banned in DESIGN.md.
- Reintroduce the "ledger scaffolding" that was deliberately removed: numbered `01/02/03` section markers, mono uppercase eyebrows, and rules on every block.
- Commit secrets, the CMS `.env`, the SQLite database, or unverified personal data.
