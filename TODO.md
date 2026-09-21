# TODO — Bhoomi Seva rebuild

Living plan. Legend: `[ ]` todo · `[~]` in progress · `[x]` done.

**Definition of done:** every route in SPEC.md exists in both `en` and `kn`; all documented stories, programs and people are present; design complies with DESIGN.md; build passes; no unsupported claims; launch checklist surfaced.

---

## Phase 0 — Foundation ✅

- [x] Scaffold Astro + Svelte 5 + Lucide + Bun
- [x] Self-hosted fonts (Fraunces, Instrument Sans, IBM Plex Mono, Noto Sans/Serif Kannada)
- [x] Design tokens + global styles
- [x] i18n config (`en` default, `kn` at `/kn/`) + UI dictionary + helpers
- [x] Docs: DESIGN.md, SPEC.md, AGENTS.md, README.md, TODO.md
- [x] License: Controlled Website Source License 1.0 (CWSL-1.0)
- [x] `site.ts` org data incl. `payment.verified` gate

## Phase 1 — Content layer ✅

- [x] `programs.ts` — education, farmers, children (bilingual, activities, accents)
- [x] `stories.ts` — 8 documented entries, dated/located, undated labelled honestly
- [x] `team.ts` — four people, bilingual bios, no stale ages
- [x] `updates.ts` — dated/period-labelled timeline
- [x] Claims audit against the migration source (no invented facts, Sannamma labelled outcome-unknown)

## Phase 2 — Shell & shared components ✅

- [x] `BaseLayout.astro` — head, SEO, hreflang, canonical, JSON-LD, skip link
- [x] `Header.astro` + `MobileNav.svelte` + language switcher
- [x] `Footer.astro` — tagline, mission, contact, socials, license note
- [x] `SectionHeading`, `StoryCard`, `PhotoFrame`, `CTABand`, `Mark`
- [x] Sitemap integration + `robots.txt`

## Phase 3 — Pages (both locales) ✅

- [x] Home
- [x] Work hub + Education + Farmers & Environment + Children
- [x] Stories index (+ `StoryFilter.svelte`) + story detail
- [x] About
- [x] Get Involved (+ volunteer form)
- [x] Donate (+ `DonateWidget.svelte`)
- [x] Contact (+ contact form)
- [x] 404
- [x] `/kn/*` mirror of every route — **38 pages built**

## Phase 4 — Interactivity & polish ✅ / deferrals

- [x] Mobile nav island (a11y, escape-to-close, focus move, scroll lock)
- [x] Donate widget (cause selector, amounts, UPI copy, QR placeholder, WhatsApp confirm)
- [x] Volunteer + contact forms (validation, loading/success/error states, WhatsApp fallback)
- [x] Story filter (programme + year, progressive enhancement)
- [x] Motion limited to transitions; honours `prefers-reduced-motion`
- [x] Empty photo frames everywhere an asset is missing
- [~] Lightbox — **deferred**: no real photographs exist yet. Add with the first real image set.

## Phase 5 — SEO, assets, infra ✅ / deferrals

- [x] `sitemap-index.xml` + `robots.txt`
- [x] Favicon (brand mark)
- [x] Prettier + EditorConfig + `check`/`format` scripts
- [x] `git init` + initial commit
- [~] OG/social image — **deferred**: `BaseLayout` supports an `image` prop; supply a real 1200×630 asset.
- [ ] Real photography (pending consent; replaces every `PhotoFrame` placeholder)

## Phase 6 — Verification

- [x] `bun run build` passes (38 pages)
- [x] `bun run check` passes (0 errors)
- [x] Rendered-HTML sweep for missing i18n keys / `undefined` / `[object Object]` — clean
- [x] Dev server returns 200 for en + kn routes
- [~] Visual browser sweep — **blocked**: no desktop browser connected to this session. Design is code-reviewed but has not been seen rendered.
- [ ] Contrast / focus / keyboard pass in a real browser
- [ ] Confirm no unsupported statistics survived (spot-check done)

---

## Open questions / decisions

- Copyright holder for CWSL-1.0 set to **Bhoomi Seva** — confirm this is intended (vs. the developer/volunteer).
- Payment/social details unverified; the donate page shows a "to be confirmed" notice until `site.payment.verified = true`.
- Form submission endpoint not configured; forms fall back to a prefilled WhatsApp message.
- Kannada copy is written by the assistant and should be spot-checked by a native speaker (the site owner).

## Changelog

- **2026-09-21** — Foundation, content, shell, all pages (EN + KN), interactivity, SEO and infra complete. Build + type check green. License switched to CWSL-1.0. Remaining: real browser review, real assets, payment verification, optional form endpoint.
- **2026-09-21 (content revision)** — Scraped bhoomiseva.org directly. Replaced invented/clever section microcopy with plain headings and the organisation's own words. Real testimonials (Vasanth, Sanjana, Sree Raksha, Ram, Pushparaj) and Sunita's full Kannada letter are now reproduced in the story pages. Story bodies expanded from 2–4 to 5–6 paragraphs each. Programme pages and the home page now carry the full activity lists (80% benchmark, JNV Class 5 coaching, Class 10 coaching, ₹6,000 meal, LPG, cow donation, 300–800% attributed). Mission/vision use the original wording. Footer credits the original developers. Display type scale reduced; events timeline added to the stories page.
- **2026-09-21 (photos + stories)** — Downloaded 21 real photographs from the source site and wired them into story cards, story pages, programme headers, programme galleries, team bios and the home hero, replacing every empty photo frame. Story archive expanded from 8 to 13 entries (added scholarship distribution, JNV coaching, Class 10 coaching, desi cow programme explainer, Balipadyami meal). 48 pages built.

### Known follow-ups

- [ ] **Image optimisation** — photos live in `public/` and are served as-is (~3.2 MB total). Move to `src/assets` and use Astro's `<Image>` for resizing/AVIF/WebP.
- [ ] **Photo consent** — confirm the organisation is happy to republish the photos and named stories pulled from the old site (SPEC §15.9).
- [ ] Some source photos are low-resolution (e.g. `sunita.jpg` at 270×366 was dropped). Ask for higher-resolution originals.

