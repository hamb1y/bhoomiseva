# TODO — Bhoomi Seva rebuild

Living plan. Updated as work proceeds. Legend: `[ ]` todo · `[~]` in progress · `[x]` done.

**Definition of done:** every route in SPEC.md exists in both `en` and `kn`; all documented stories, programs and people are present; design complies with DESIGN.md; build passes; pages verified in a real browser; no unsupported claims; no broken images; launch checklist surfaced.

---

## Phase 0 — Foundation ✅

- [x] Scaffold Astro + Svelte 5 + Lucide + Bun
- [x] Self-hosted fonts (Fraunces, Instrument Sans, IBM Plex Mono, Noto Sans/Serif Kannada)
- [x] Design tokens + global styles
- [x] i18n config (`en` default, `kn` at `/kn/`) + UI dictionary + helpers
- [x] Docs: DESIGN.md, SPEC.md, AGENTS.md, README.md, LICENSE (CWSL-1.0)
- [x] `site.ts` org data incl. `payment.verified` gate

## Phase 1 — Content layer

- [ ] `programs.ts` — education, farmers, children (bilingual, activities, accents)
- [ ] `stories.ts` — all documented stories, dated/located, honest about undated items
- [ ] `team.ts` — four people, bilingual bios, no stale ages
- [ ] `updates.ts` — dated timeline of events
- [ ] Verify content against the migration source; no invented facts

## Phase 2 — Shell & shared components

- [ ] `BaseLayout.astro` — head, SEO, hreflang, skip link, header/footer slots
- [ ] `Header.astro` + `MobileNav.svelte` + `LanguageSwitcher`
- [ ] `Footer.astro` — contact, mission/vision, socials
- [ ] Shared primitives: `StoryCard`, `ProgramHeader`, `PhotoFrame`, `Ledger`, `CTABand`, `SectionHeading`
- [ ] SEO components: `Meta.astro`, JSON-LD

## Phase 3 — Pages (both locales)

- [ ] Home
- [ ] Work hub + Education + Farmers & Environment + Children
- [ ] Stories index (+ `StoryFilter.svelte`) + story detail
- [ ] About
- [ ] Get Involved (+ volunteer form)
- [ ] Donate (+ `DonateWidget.svelte`)
- [ ] Contact (+ `ContactForm.svelte`)
- [ ] 404
- [ ] `/kn/*` mirror of every route

## Phase 4 — Interactivity & polish

- [ ] Mobile nav island (a11y, focus trap)
- [ ] Donate widget (cause selector, UPI copy, QR, confirmation)
- [ ] Volunteer + contact forms (loading/success/error states)
- [ ] Story filter (programme + year)
- [ ] Lightbox for captioned photos
- [ ] Motion pass (respecting reduced motion)
- [ ] Empty photo frames everywhere an asset is missing

## Phase 5 — SEO, assets, infra

- [ ] `sitemap.xml` + `robots.txt`
- [ ] OG image + favicon set
- [ ] `@astrojs/sitemap` or manual sitemap incl. `/kn/*`
- [ ] Basic `.prettierrc` + format scripts
- [ ] `git init` + sensible `.gitignore`

## Phase 6 — Verification

- [ ] `bun run build` passes
- [ ] Type check passes
- [ ] Browser sweep of every route (en + kn), desktop + mobile widths
- [ ] Contrast / focus / keyboard check
- [ ] Claims audit against AGENTS.md policy
- [ ] Launch checklist (SPEC §15) surfaced to the user

---

## Open questions / decisions

- Copyright holder for CWSL-1.0 set to **Bhoomi Seva** — confirm this is the intended holder (vs. the developer).
- Payment/social details unverified; UI shows a "to be confirmed" state until `site.payment.verified = true`.
- Real photographs not yet supplied; site uses captioned empty frames.
- Form submission endpoint not configured; forms fall back to WhatsApp/email handoff.

## Changelog

- **2026-09-21** — Foundation complete; content layer started; license switched to CWSL-1.0.
