# AGENTS.md

Guidance for AI agents (and humans) working in this repository.

## What this is

The rebuilt website for **Bhoomi Seva**, a volunteer-led social initiative supporting rural communities in Karnataka. It is a content-first, story-driven, bilingual (English + Kannada) static site.

- **Framework:** Astro (static output, islands architecture)
- **Interactive components:** Svelte 5
- **Icons:** `lucide-svelte`
- **Styling:** vanilla CSS with design tokens (no CSS framework)
- **Package manager / runtime:** Bun
- **Fonts:** self-hosted via Fontsource

## Read these first

1. **[DESIGN.md](./DESIGN.md)** — the binding design system and the anti-slop rules. Every visual decision must comply. If you need a new token or component pattern, add it to DESIGN.md first.
2. **[SPEC.md](./SPEC.md)** — product spec: goals, information architecture, routes, content model, interactivity, launch checklist.

## Development

Start the dev server in background mode:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Other commands:

```
bun install          # install dependencies
bun run build        # production build to dist/
bun run preview      # preview the built site
bunx astro check     # type-check .astro/.svelte/.ts (needs @astrojs/check)
bun run format       # prettier (if configured)
```

Full Astro docs: https://docs.astro.build — consult the guides on routing, components, framework components, content collections, styling and i18n before related work.

## Repository layout

```
src/
  components/    Astro components (static) and Svelte components (interactive)
  data/          Typed, localised content (site, programs, stories, team, updates)
  i18n/          ui.ts string dictionary, utils.ts helpers
  layouts/       BaseLayout.astro and page shells
  pages/         File-based routes; /kn/* mirrors the English routes
  styles/        tokens.css, global.css
public/          Static assets
```

## Conventions

- **Astro by default, Svelte only when interactive.** Do not turn static content into an island. Reach for Svelte only for stateful UI (nav toggle, donate widget, forms, lightbox, filters).
- **Use tokens, never raw values.** Colours, spacing, radii, type sizes and easing all come from `src/styles/tokens.css`. No new hex codes or one-off pixel values.
- **Content lives in `src/data/*`**, not inlined in markup, so it can be translated and reused.
- **TypeScript strict.** Type all data. Use the `Localized` type for translatable fields.
- **Semantic colour.** `--clay` is action, `--leaf` farmers/environment, `--turmeric` education, `--indigo` children/community, `--rose` urgent. Do not recolour a pillar.
- Keep server-rendered markup meaningful for SEO; interactivity enhances, never replaces.
- Prefer editing existing patterns over inventing parallel ones.

## Internationalisation

- Locales: `en` (default, unprefixed) and `kn` (prefixed `/kn/`).
- UI strings: `src/i18n/ui.ts`. Use `useTranslations(lang)`.
- Content fields: `Localized = string | { en: string; kn?: string }`; a missing `kn` falls back to `en` via `pick()`/`lx()`.
- Build every page in both locales. Set `lang` correctly on `<html>`.
- **Kannada copy is currently a first pass and must be reviewed by a native speaker before launch.** Do not silently machine-translate long-form content.

## Content and claims policy

This site is a rebuild of an existing organisation's content. Preserve documented work; correct bad claims. Rules:

- Every story entry is **dated** and **located**. No undated "recent events".
- Preserve documented Bhoomi Seva activity (scholarships, fees, JNV coaching, tutoring, farmer training, desi cow donation, children's-home support).
- **Do not publish** unsupported global statistics ("60 years of soil left"), guaranteed income multipliers ("300–800%"), or "soil extinction" framing. Use the fixed wording in the migration source doc.
- Do not assert a planned action as completed (e.g. the Sannamma cow donation) unless the outcome is confirmed.
- Do not publish stale facts (team members' children's ages, "for the past eight years"). Prefer "years of experience".
- Payment/contact details must be **verified as current** before launch. `site.payment.verified` is `false` until then.

## Do not

- Introduce a second CSS methodology, a UI component library, or a CSS framework.
- Use Inter/Geist/system-only fonts, purple or blue gradients, glassmorphism, gradient text, glowing halos, nested cards, icon-tiles above headings, auto-marquees, pulsing dots, bounce easing, or hover image zoom. These are explicitly banned in DESIGN.md.
- Commit secrets, real payment credentials, or unverified personal data.
- Delete content that documents real work without preserving it elsewhere.
