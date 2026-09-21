# Bhoomi Seva — website

The website for **Bhoomi Seva**, a volunteer-led initiative supporting rural communities in Karnataka through education, natural farming and practical support for children in need.

A fast, accessible, bilingual (English + Kannada) static site, with content managed in a Payload CMS.

## Stack

|                           |                                                                      |
| ------------------------- | -------------------------------------------------------------------- |
| Framework                 | [Astro](https://astro.build) (static output, islands)                |
| Interactive UI            | [Svelte 5](https://svelte.dev)                                       |
| Icons                     | [Lucide](https://lucide.dev)                                         |
| Styling                   | Vanilla CSS + design tokens                                          |
| CMS                       | [Payload](https://payloadcms.com) 3 (separate Next.js app in `cms/`) |
| Fonts                     | Self-hosted via [Fontsource](https://fontsource.org)                 |
| Runtime / package manager | [Bun](https://bun.sh)                                                |

## Quick start

```bash
bun install
bun run dev
```

The site runs at http://localhost:4321. It works immediately: with no CMS synced, content comes from the hand-written seed in `src/data/seed/`.

```bash
bun run build          # production build to dist/
bun run check          # type-check
bun run images         # regenerate WebP from public/images originals
bun run content:pull   # sync content from the CMS
bun run cms:seed       # push seed content into a running CMS
```

## Content and the CMS

Content is **CMS-first, seed-backed**:

```
Payload CMS  --content:pull-->  src/data/generated/*  --+-->  src/data/*.ts  -->  pages
src/data/seed/*  ----------------------------------------+
```

`src/data/*.ts` resolves to generated content when it exists, otherwise to the seed. The site always builds, whether or not a CMS is reachable.

### Running the CMS

```bash
cd cms
bun install
cp .env.example .env      # set PAYLOAD_SECRET
bun dev                   # http://localhost:3000/admin
```

Then, from the repository root:

```bash
bun run cms:seed      # creates the admin user, uploads media, seeds content
bun run content:pull  # writes src/data/generated/* from the CMS
bun run build
```

`cms:seed` uses Payload's Local API and creates the first admin user itself (`admin@bhoomiseva.local` / `changeme123` unless `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` are set — **change the password**). It is idempotent: media already uploaded is reused.

### Adding a story

1. In the CMS, go to **Stories → Create new**.
2. Fill in the **Story** tab: title, summary, and one row per paragraph.
3. Open the **Photo** tab and upload any image, or pick one from the library. Then open the image and **drag the focal point** so the subject stays in frame when the site crops it.
4. Set the **slug** (auto-filled from the title), programme, and either a date or a period — plus the location.
5. **Save Draft** while you work, **Publish** when it is ready.
6. Run `bun run content:pull && bun run build`, or let the deploy pipeline do it. Only published stories are pulled.

Any image size or format works. Images already in `public/images/` are reused; anything else is downloaded to `public/media/` during the pull.

See [`cms/README.md`](./cms/README.md) for collections, localisation and deployment.

## Project structure

```
src/
  components/   Astro components (static) + Svelte components (islands)
  data/
    seed/       hand-written source content (the fallback)
    generated/  written by `content:pull` — never edit by hand
    *.ts        resolvers (generated wins, seed falls back)
    types.ts    Story, Program, Person, Update, Site
  i18n/         ui.ts dictionary + utils.ts helpers
  layouts/      BaseLayout
  pages/        file-based routes; /kn/* mirrors English
  styles/       tokens.css + global.css
  views/        page implementations used by the thin route files
public/images/  committed WebP + originals
cms/            Payload 3 app
scripts/        image optimisation, content pull, CMS seed
```

## Documentation

- **[DESIGN.md](./DESIGN.md)** — design system: concept, colour, type, spacing, motion, components, and the binding anti-slop rules.
- **[SPEC.md](./SPEC.md)** — product and technical specification: architecture, information architecture, content model, CMS pipeline, launch checklist.
- **[AGENTS.md](./AGENTS.md)** — working conventions for contributors and AI agents.
- **[TODO.md](./TODO.md)** — current plan and changelog.

## Translations

Every content field can carry English and Kannada. Payload stores both locales per document; a missing Kannada value falls back to English.

**Kannada content is a first pass and should be reviewed by a native speaker before launch.**

## Before launch

Work through the checklist in [SPEC.md §14](./SPEC.md). In particular: confirm all payment and contact details, obtain photo consent, and set `payment.verified` only once verified.

## License

Source-available under the **Controlled Website Source License 1.0 (CWSL-1.0)** © 2026 Bhoomi Seva. The code may be viewed, studied and evaluated, and Bhoomi Seva may deploy and modify it; it may not be redistributed, templated, or commercially exploited. Content and photographs remain the property of Bhoomi Seva. See [LICENSE](./LICENSE). This is not an OSI-approved open-source license.
