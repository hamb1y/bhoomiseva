# Bhoomi Seva — website

The website for **Bhoomi Seva**, a volunteer-led initiative supporting rural communities in Karnataka through education, natural farming and practical support for children in need.

A fast, accessible, bilingual (English + Kannada) static site. Content is edited with **Sveltia CMS**, a Git-based CMS that writes plain JSON files into this repository — no database, no server, nothing extra to deploy.

## Stack

|                           |                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| Framework                 | [Astro](https://astro.build) (static output, islands)                                      |
| Interactive UI            | [Svelte 5](https://svelte.dev)                                                             |
| Icons                     | [Lucide](https://lucide.dev)                                                               |
| Styling                   | Vanilla CSS + design tokens                                                                |
| CMS                       | [Sveltia CMS](https://sveltiacms.app) — Git-based, configured in `public/admin/config.yml` |
| Content                   | JSON files under `content/` (the source of truth)                                          |
| Fonts                     | Self-hosted via [Fontsource](https://fontsource.org)                                       |
| Runtime / package manager | [Bun](https://bun.sh)                                                                      |

## Quick start

```bash
bun install
bun run dev            # http://localhost:4321
```

```bash
bun run build          # production build to dist/
bun run check          # type-check
bun run verify         # drive a real browser over every route + interaction
bun run images         # regenerate WebP from public/images originals
bun run logo           # rebuild logo assets from source artwork
bun run format         # prettier
```

`bun run verify` needs a Chromium binary (set `CHROME_PATH` if it isn't in a usual location). Add `--shots` to write full-page screenshots to `.verify/`.

## Editing content

Content is plain JSON in `content/`, one file per entry. The site reads it at build time, so **a content change is a commit**.

Start the dev server and open **http://localhost:4321/admin/index.html**:

- **In a Chromium browser** — choose _Work with Local Repository_ and select the project root. Edits are written straight to your local files; commit them with Git.
- **In production** — sign in with GitHub. Edits commit to the repository (set the real repo in `public/admin/config.yml`).

The CMS has collections for Stories, Events, Blogs, Programmes and People, plus a Site settings file. Blog posts are one collection with a _Donor / Donee_ selector; the site splits them by the Blogs menu and a filter.

### Sections

| Path                                             | What it is                                                                   |
| ------------------------------------------------ | ---------------------------------------------------------------------------- |
| `/stories`                                       | Long-form narratives, each with a programme and a testimonial                |
| `/events`                                        | Short dated records — training, distributions, donations, meals              |
| `/blogs`                                         | Writing from people involved. Split into **Donor blogs** and **Donee blogs** |
| `/work`                                          | The three programme pages                                                    |
| `/about`, `/get-involved`, `/donate`, `/contact` |                                                                              |

Events and both blog kinds share one implementation (`EntryCard`, `EntryIndex`, `EntryDetail`) and differ only by route, labels and — for blogs — a `kind` flag.

## Project structure

```
content/          JSON content, one file per entry (edited via the CMS)
public/
  admin/          Sveltia CMS: index.html + config.yml
  images/         committed images, referenced as /images/…
src/
  components/     Astro components (static) + Svelte components (islands)
  data/
    load.ts       converts the content file shape into the site's types
    *.ts          typed collections: stories, events, blogs, programs, team, site
    types.ts      Story, Entry, Blog, Program, Person, Site
  i18n/           ui.ts dictionary + utils.ts helpers
  layouts/        BaseLayout
  pages/          file-based routes; /kn/* mirrors English
  styles/         tokens.css + global.css
  views/          page implementations used by the thin route files
scripts/          image optimisation, logo build, browser verification
```

## Documentation

- **[DESIGN.md](./DESIGN.md)** — design system: concept, colour, type, spacing, motion, components, and the binding anti-slop rules.
- **[SPEC.md](./SPEC.md)** — product and technical specification: architecture, information architecture, content model, CMS, launch checklist.
- **[AGENTS.md](./AGENTS.md)** — working conventions for contributors and AI agents.
- **[TODO.md](./TODO.md)** — current plan and changelog.

## Translations

Every entry file holds both languages in the `single_file` shape — `{ "en": {…}, "kn": {…} }`. A missing Kannada value falls back to English.

**Kannada content is a first pass and should be reviewed by a native speaker before launch.**

## Deployment

The site is static, so it hosts anywhere. Two paths are wired up:

**GitHub Pages** — `.github/workflows/deploy.yml` builds and publishes on every push to `main`. A project repository is served from `https://<owner>.github.io/<repo>/`, which is why `astro.config.mjs` reads `SITE_URL` and `BASE_PATH` from the environment; every root-relative URL goes through `asset()` in `src/utils/url.ts`.

To attach a custom domain later, set repository **Variables** (Settings → Secrets and variables → Actions):

| Variable    | Value                    |
| ----------- | ------------------------ |
| `SITE_URL`  | `https://bhoomiseva.org` |
| `BASE_PATH` | `/`                      |

…then add a `CNAME` record and enable the custom domain in Pages. No code changes needed.

**Any other host** (Netlify, Cloudflare Pages, a VPS) — build with `bun run build` and serve `dist/`. No `BASE_PATH` required. The admin app ships inside `dist/admin/`.

**Editing in production** — the Sveltia backend is configured for `hamb1y/bhoomiseva` in `public/admin/config.yml`. Editors sign in with GitHub at `/admin/`.

## Before launch

Work through the checklist in [SPEC.md §14](./SPEC.md). In particular: confirm all payment and contact details, obtain photo consent, and set `payment.verified` only once verified. Also point the Sveltia backend at the real GitHub repository.

## License

Source-available under the **Controlled Website Source License 1.0 (CWSL-1.0)** © 2026 Bhoomi Seva. The code may be viewed, studied and evaluated, and Bhoomi Seva may deploy and modify it; it may not be redistributed, templated, or commercially exploited. Content and photographs remain the property of Bhoomi Seva. See [LICENSE](./LICENSE). This is not an OSI-approved open-source license.
