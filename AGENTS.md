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
bun run cms:seed       # seed a running Payload instance (Local API; creates the admin user)
bun run verify         # drive a real browser over every route + interaction
bun run format         # prettier
```

**If the interactive islands stop responding** (dropdown, lightbox, mobile nav), the Vite dependency cache is stale — this happens after changing dependencies while `astro dev` is running. Restart the dev server: the islands will hydrate again. `bun run verify` reports it as a hydration or 504 failure.

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
    types.ts     Story, Entry (events + blogs), Blog, Program, Person, Site
  i18n/          ui.ts string dictionary, utils.ts helpers
  layouts/       BaseLayout.astro
  lib/           nav.ts, paths.ts, payload.ts (Payload → site mapping)
  pages/         file-based routes; /kn/* mirrors the English routes
  styles/        tokens.css, global.css
  views/         page implementations, rendered by the thin route files
public/
  images/        committed WebP + originals
  media/         CMS-synced media (git-ignored)
cms/             Payload 3 app (own package.json)
scripts/         optimize-images.mjs, make-logo.mjs, pull-content.mjs, verify-site.mjs
cms/scripts/      seed.ts (Local API seeding)
```

## Content conventions

- **Never edit `src/data/generated/*`** — it is overwritten by `content:pull`.
- **`src/data/generated/*` is a build artifact.** It is intentionally empty in git; `content:pull` populates it. Do not commit pulled content unless you deliberately want the build to depend on it.
- **Never edit `src/data/seed/*` to change live content** once the CMS is in use. Seed content is the fallback; the CMS is the source of truth.
- If you add a field or collection, change it in **all four** places: `src/data/types.ts`, the Payload collection in `cms/collections/`, the mapping in `src/lib/payload.ts`, and (if needed) the seed in `src/data/seed/`.
- **All Payload → site mapping lives in `src/lib/payload.ts`.** Do not duplicate it in the sync script or views.
- Uploads carry a **focal point**; the site applies it with `object-position` (see `objectPosition()` in `src/utils/format.ts`). Do not hard-crop images in CSS.
- **Drafts are not pulled.** Only published documents reach the site. Preview buttons point at the built page, not a live draft.
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
