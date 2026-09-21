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
- [x] Lightbox — `Lightbox.svelte` island, triggered by real `<button>` elements so it is keyboard operable. Wired into programme galleries and story photos, with prev/next, captions, Escape and focus trapping.
- [x] Desktop nav dropdown — `NavMenu.svelte` uses the `children` already present in `nav.ts`; click/hover to open, Escape and outside-click to close.

## Phase 5 — SEO, assets, infra ✅ / deferrals

- [x] `sitemap-index.xml` + `robots.txt`
- [x] Favicon (brand mark)
- [x] Prettier + EditorConfig + `check`/`format` scripts
- [x] `git init` + initial commit
- [~] OG/social image — **deferred**: `BaseLayout` supports an `image` prop; supply a real 1200×630 asset.
- [ ] Real photography (pending consent; replaces every `PhotoFrame` placeholder)

## Phase 7 — CMS, images, de-scaffolding ✅

- [x] Payload 3 CMS in `cms/` — collections (stories, programs, team, updates, media, users), `site-settings` global, en/kn localisation
- [x] `scripts/seed-cms.mjs` (`bun run cms:seed`) pushes seed content into a running CMS
- [x] `scripts/pull-content.mjs` (`bun run content:pull`) writes `src/data/generated/*` and downloads media
- [x] Data layer split into `seed/` (fallback) + `generated/` (CMS) with resolvers — the site builds with or without a CMS
- [x] Root `.env.example`, `cms/.env.example`, `.gitignore` for CMS + synced media
- [x] Image pipeline: all images converted to WebP (`bun run images`), originals kept, ~35% smaller
- [x] Design de-scaffolding: removed numbered `01/02/03` markers, wide-tracked uppercase mono eyebrows, and per-block rules; eyebrows are now sentence-case labels
- [x] Broke the monotony: alternating photo-led programme rows, a full-bleed photo band, image galleries, inline story meta
- [x] Small originals restored and kept (`sunita.jpg`, 270×366) — never delete low-resolution source images
- [x] Docs updated: SPEC, AGENTS, README, DESIGN

## Phase 8 — Verification

- [x] `bun run build` passes — **48 pages**
- [x] `bun run check` passes (0 errors, 0 hints)
- [x] `bun run content:pull` fails gracefully when no CMS is running, leaving generated files untouched
- [~] Visual browser sweep — **blocked**: no desktop browser connected to this session.
- [ ] Contrast / focus / keyboard pass in a real browser
- [x] **CMS smoke test passed** — Payload 3.90.1 installs, boots, and serves `/admin`; seed writes 3 programmes, 13 stories, 4 team members, 4 updates and the settings global; `content:pull` reads them back; `astro check` + `build` pass on CMS-sourced content.

### Bugs found and fixed by actually running it

- REST route only exported `GET`, so all writes returned 405 — now exports GET/POST/PATCH/PUT/DELETE/OPTIONS.
- The `programs` collection had a field literally named `id`, colliding with Payload's own ID column — renamed to `key`.
- The seed passed `id` where Payload expected `key`, and passed `about` as bare strings where the array field expects `{ paragraph }` rows.
- Generated TS inferred `string` for union fields and failed `astro check` — the generator now emits `as unknown as T`.
- The "sharp not installed" warning is spurious; image sizes (`thumbnail`, `card`, `wide`) are generated correctly.

---

## Open questions / decisions

- Copyright holder for CWSL-1.0 set to **Bhoomi Seva** — confirm this is intended (vs. the developer/volunteer).
- Payment/social details unverified; the donate page shows a "to be confirmed" notice until `payment.verified = true` in the CMS.
- Form submission endpoint not configured; forms fall back to a prefilled WhatsApp message.
- Kannada copy is written by the assistant and should be spot-checked by a native speaker (the site owner).
- CMS deployment target undecided (Fly / Railway / Render / VPS). The Astro build needs `PAYLOAD_URL` at build time.

## Changelog

- **2026-09-21** — Foundation, content, shell, all pages (EN + KN), interactivity, SEO and infra complete. Build + type check green. License switched to CWSL-1.0.
- **2026-09-21 (content revision)** — Scraped bhoomiseva.org directly. Replaced invented/clever section microcopy with plain headings and the organisation's own words. Real testimonials (Vasanth, Sanjana, Sree Raksha, Ram, Pushparaj) and Sunita's full Kannada letter reproduced in story pages. Story bodies expanded. Full activity lists added. Mission/vision use the original wording. Footer credits the original developers.
- **2026-09-21 (photos + stories)** — 21 real photographs downloaded and wired into story cards, story pages, programme headers, galleries, team bios and the home hero. Story archive expanded from 8 to 13 entries. 48 pages built.
- **2026-09-21 (CMS + polish)** — Connected Payload CMS: full collection/global model with en/kn localisation, seed and pull scripts, and a data layer that resolves CMS content over the seed while always remaining buildable. Converted all images to WebP (originals kept). Removed the ledger/mono scaffolding and rebalanced page rhythm with photo-led rows, a full-bleed band and galleries. Rewrote SPEC, AGENTS, README and DESIGN.
- **2026-09-21 (CMS verified)** — Actually installed and ran Payload 3.90.1 (it installs fine — the earlier "can't run it" was an unverified assumption). Booted the admin, created the first admin user via Payload's Local API, seeded all content and media, and pulled it back into the Astro site. Fixed five real bugs surfaced by running it (REST methods, `id`/`key` collision, seed mapping, generated-type casts, spurious sharp warning). `content:pull` now reuses the committed `public/images` library instead of duplicating media.
- **2026-09-21 (editor workflow)** — Made adding a story a real workflow. Media now has **interactive focal point + crop** and named sizes; Stories gained a tabbed editor, auto-slug from title, **drafts**, a Preview button, sensible defaults and field descriptions. Added `src/lib/payload.ts` as the single Payload → site mapping, shared by the sync script. The sync now pulls only **published** documents and captures focal points, which the site applies via `object-position`. Verified end to end: focal round-trip, draft exclusion, and an arbitrary non-library image landing in `public/media/`.

### Bugs found and fixed while building the workflow

- `pkill -f "next dev"` matched its own shell command and killed the cleanup — use `pkill -f "[n]ext dev"`.
- Wiping the SQLite file while the dev server was running corrupted the schema (`no such column: _status`); always stop the server before deleting the database.

### Known follow-ups

- [ ] **Astro `<Image>`** — images are optimised to WebP but still served from `public/`. Moving to `src/assets` would add responsive `srcset` and AVIF.
- [ ] **Photo consent** — confirm the organisation is happy to republish the photos and named stories from the old site.
- [ ] **Kannada review** — all Kannada copy, especially content entered into the CMS.
- [ ] **CMS smoke test** — run `cms/` and confirm seeding + pull round-trips correctly.
- [ ] **Logo assets** — the supplied logo needs to be saved to disk, then `bun run logo <path>` produces `logo.webp`, `logo-mark.webp`, `favicon.png` and `apple-touch-icon.png`. The header and favicon switch over automatically once the files exist.
- [ ] **Astro `<Image>`** — still served from `public/`; moving to `src/assets` would add responsive `srcset` and AVIF.
