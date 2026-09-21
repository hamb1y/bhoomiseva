# Bhoomi Seva — website

The website for **Bhoomi Seva**, a volunteer-led initiative supporting rural communities in Karnataka through education, natural farming and practical support for children in need.

Built as a fast, accessible, bilingual (English + Kannada) static site.

## Stack

|                           |                                                       |
| ------------------------- | ----------------------------------------------------- |
| Framework                 | [Astro](https://astro.build) (static output, islands) |
| Interactive UI            | [Svelte 5](https://svelte.dev)                        |
| Icons                     | [Lucide](https://lucide.dev) (`lucide-svelte`)        |
| Styling                   | Vanilla CSS + design tokens                           |
| Fonts                     | Self-hosted via [Fontsource](https://fontsource.org)  |
| Runtime / package manager | [Bun](https://bun.sh)                                 |

## Quick start

```bash
bun install
bun run dev
```

The dev server runs at http://localhost:4321.

```bash
bun run build      # production build to dist/
bun run preview    # preview the built site
bunx astro check   # type-check (install @astrojs/check first)
```

## Project structure

```
src/
  components/   Astro components (static) + Svelte components (interactive)
  data/         Typed, localised content (site, programs, stories, team, updates)
  i18n/         ui.ts string dictionary + utils.ts helpers
  layouts/      BaseLayout and page shells
  pages/        File-based routes; /kn/* mirrors English
  styles/       tokens.css (design tokens) + global.css
public/         Static assets
```

## Documentation

- **[DESIGN.md](./DESIGN.md)** — design system: concept, colour, type, spacing, motion, components, and the binding anti-slop rules.
- **[SPEC.md](./SPEC.md)** — product and technical specification: goals, information architecture, content model, interactivity, launch checklist.
- **[AGENTS.md](./AGENTS.md)** — working conventions for contributors and AI agents.

## Content and translations

All content lives in `src/data/*`, not in markup, so it can be translated and reused. Translatable fields use the `Localized` type:

```ts
type Localized = string | { en: string; kn?: string };
```

A missing Kannada value falls back to English. **Kannada content is a first pass and must be reviewed by a native Kannada speaker before launch.**

Please also read the claims policy in [AGENTS.md](./AGENTS.md) — this rebuild deliberately preserves documented work while removing unsupported statistics.

## Before launch

Work through the verification checklist in [SPEC.md §15](./SPEC.md). In particular, all payment and contact details must be confirmed current, and `site.payment.verified` set only once they are.

## License

Source-available under the **Controlled Website Source License 1.0 (CWSL-1.0)** © 2026 Bhoomi Seva. The code may be viewed, studied and evaluated, and Bhoomi Seva may deploy and modify it; it may not be redistributed, templated, or commercially exploited. Recipient Content (copy, photographs, testimonials, marks) remains the property of Bhoomi Seva. See [LICENSE](./LICENSE). This is not an OSI-approved open-source license.
