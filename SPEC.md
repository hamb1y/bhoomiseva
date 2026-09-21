# SPEC.md — Bhoomi Seva website

Product and technical specification for the Bhoomi Seva site.

---

## 1. Overview

Bhoomi Seva is a small, volunteer-led social initiative working with rural communities in Karnataka. This project is the rebuilt public site: a fast, accessible, bilingual (English + Kannada) static site whose content is managed in a Payload CMS by the organisation itself.

**One-line positioning:** a volunteer-led rural and community support initiative — education, natural farming and farmer livelihoods, and practical support for children in need.

## 2. Goals

1. Present Bhoomi Seva accurately as broader than an environmental charity.
2. Make documented work verifiable: every story dated and located.
3. Let non-developers edit every word, image and fact through a CMS.
4. Make donating and volunteering obvious and low-friction.
5. Be fast, accessible and fully bilingual (English + Kannada).
6. Look authored and specific — not like a generic template or AI-generated site.

## 3. Non-goals

- Not an online payment gateway. Donation stays a UPI/QR + confirmation workflow, matching how the organisation operates.
- Not a public accounts/transparency portal (a short accountability note is in scope).
- Not a pan-India brand. Geography stays honest: Kanakapura, Kabbalu, Mandya district.
- Not server-rendered at request time. The site is static; the CMS is consulted at build time.

## 4. Audiences

**Beneficiaries:** rural school students, merit students with financial need, Class 5 JNV aspirants, Class 10 students needing tutoring, small and marginal farmers, women farmers, children in children's homes.

**Supporters:** individual donors, volunteer teachers/tutors, online and offline coordinators, goods donors, farming mentors, social-media supporters.

**Editors:** Bhoomi Seva volunteers who maintain the content. They are not developers; the CMS must be usable without touching code.

## 5. Architecture

```
┌──────────────────────┐    REST (build time)    ┌─────────────────────────┐
│  Payload CMS (cms/)  │ ──────────────────────► │  Astro site (src/)      │
│  Next.js + SQLite    │                         │  static output + islands│
│  /admin              │ ◄────────────────────── │  Svelte 5 + vanilla CSS │
└──────────────────────┘   seed script (once)    └─────────────────────────┘
```

- **Content is CMS-first, seed-backed.** `src/data/*.ts` resolves to `src/data/generated/*` when content has been synced, and to `src/data/seed/*` otherwise. The site therefore always builds, with or without a CMS reachable.
- **One mapping, one place.** `src/lib/payload.ts` converts Payload documents into the site's types. It is shared by the sync script and any future preview route, so the shape is defined once.
- **The CMS is a separate app** (`cms/`). It is never bundled into the public site.
- **Media** is uploaded to the CMS, then resolved at sync time: images already in `public/images/` are reused, anything else is downloaded to `public/media/`.
- **Images are interactive.** Media has focal point + crop enabled; the site applies the focal point with `object-position`, so one upload crops well at every aspect ratio.
- **Stories are versioned.** Drafts can be saved without publishing; only published documents are pulled.

## 6. Information architecture

```
/                         Home
/work/                    Our Work (hub)
  /work/education
  /work/farmers-environment
  /work/children
/stories/                 Stories & updates (filterable archive)
  /stories/[slug]         Individual story (13 entries)
/events/                  Dated event records (filterable by programme + year)
  /events/[slug]          Individual event
/blogs/                   Blogs hub — All / Donor / Donee
  /blogs/donors/          Donor blogs
  /blogs/donors/[slug]    Individual donor post
  /blogs/donees/          Donee blogs
  /blogs/donees/[slug]    Individual donee post
/about                    Mission, vision, team, volunteers
/get-involved             Volunteer, donate goods, socials
/donate                   Cause selector + UPI/QR + confirmation
/contact                  Form, email, WhatsApp, socials
/404
```

Kannada mirror at `/kn/*` for every route. **64 pages** built.

## 7. Content model

Content lives in Payload collections and mirrors the TypeScript types in `src/data/types.ts`.

```ts
type Localized = string | { en: string; kn?: string };

interface Story   { slug; date?; period?; location; program; title; summary; body[]; image?; imageAlt?; quote?; people?; featured? }
interface Program { id; accent; kicker; title; summary; lede; activities[]; image?; imageAlt?; gallery? }
interface Person  { name; role; bio; photo? }
interface Update  { date?; period?; title; program; location; kind }
interface Site    { name; contact; socials; payment; mission; vision; shortDescription; about[]; credit }
```

### Payload collections

| CMS             | Type        | Notes                                                   |
| --------------- | ----------- | ------------------------------------------------------- |
| `stories`       | `Story[]`   | 13 documented narrative entries                         |
| `events`        | `Entry[]`   | dated event records, 4 seeded                           |
| `blogs`         | `Blog[]`    | one collection; `kind` is `donor` or `donee`            |
| `programs`      | `Program[]` | three programmes with activities and galleries          |
| `team`          | `Person[]`  | four people                                             |
| `media`         | —           | uploads with localised `alt`, caption and focal point   |
| `users`         | —           | auth                                                    |
| `site-settings` | `Site`      | global: contact, socials, payment, mission/vision/about |

### Shared entry shape

Events and blogs share one view model, `Entry`: title, summary, body, date/period, optional location, programme, author, image and focal point. They therefore share `EntryCard`, `EntryIndex` (with `EntryFilter`) and `EntryDetail`. Blogs are split by audience — `kind: "donor" | "donee"` — surfaced through the Blogs nav dropdown and a segmented filter on the hub. Stories keep their own richer shape (programme narrative plus testimonial).

### Content rules

Encoded in AGENTS.md § Content and claims policy. Summary: keep documented work; drop or soften unsupported global statistics; never present a planned action as completed; never publish unverified payment details.

## 8. Localisation

- `en` (default, unprefixed) and `kn` (prefixed `/kn/`).
- Payload stores both locales on the same document; the REST API returns `{ en, kn }` with `?locale=all`, which is exactly the `Localized` shape.
- A missing `kn` value falls back to `en` at render time.
- **Kannada long-form copy should be reviewed by a native speaker before publishing.**

## 9. Content pipeline

| Command                | What it does                                                                                                                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bun run cms:seed`     | Uses Payload's Local API to create the first admin user, upload the WebP library to `media`, and write all collections + the `site-settings` global in both locales. Idempotent. |
| `bun run content:pull` | Reads Payload and writes `src/data/generated/*.ts`. Reuses files already present in `public/images/`; anything else is downloaded to `public/media/`.                            |
| `bun run build`        | Builds the static site from whatever `src/data/*` resolves to.                                                                                                                   |

`src/data/generated/*` is a **build artifact and is intentionally empty in git**, so the committed site builds from the seed. Run `content:pull` when you want the build to reflect the CMS. The pull is a build step, not a runtime dependency.

Verified end to end: seed → pull → build renders all 13 stories, 3 programmes, 4 people and the settings global from Payload.

### Adding a story (editor workflow)

1. **CMS → Stories → Create new.**
2. **Story tab** — title, one-line summary, and paragraphs (one row each). Optionally a quote and the people named.
3. **Photo tab** — upload _any_ image, or pick one already in the library. Then open the image and **drag the focal point** so the subject survives the 3:2 crop.
4. **Sidebar** — the slug fills in from the title (edit if you want a different URL), then programme, date _or_ period, and location.
5. **Save Draft** while working, **Publish** when it is ready.
6. Run `bun run content:pull` then `bun run build` (or let the deploy pipeline do it). **Only published documents are pulled.**
7. The **Preview** button opens the story on the site. It reflects the last sync, so publish before relying on it.

Notes:

- Cropping is handled on the site by `object-position` from the focal point, so one upload frames correctly at 3:2, 4:3 and square.
- Uploaded images that are not already in the committed `public/images/` library are downloaded to `public/media/` at sync time. Any filename, size or format works.
- Programme pages and the About page use the same pattern (tabs, upload fields, focal point).

## 10. Images

- All source images are converted to WebP by `bun run images` (`scripts/optimize-images.mjs`). Originals are kept, including low-resolution ones.
- `public/images/` holds the committed set; `public/media/` holds CMS-synced files (git-ignored).
- Images are lazy-loaded, given explicit aspect ratios to avoid layout shift, and always captioned when they carry meaning.
- Consent: named beneficiaries and photographs should be confirmed with the organisation before publishing.

## 11. SEO

- Per-page title, meta description, canonical, `hreflang` alternates for `en`/`kn`.
- Open Graph + Twitter cards; an `image` prop exists on `BaseLayout` for a real 1200×630 asset.
- `sitemap-index.xml` (via `@astrojs/sitemap`) and `robots.txt`.
- JSON-LD `NGO` on the home page, `Article` on story pages.
- Clean, dated slugs (e.g. `/stories/farmer-training-kabbalu-2023`).

## 12. Accessibility

WCAG 2.2 AA target. One `h1` per page, sequential headings, visible focus, skip link, keyboard-operable islands, correct `lang` per locale, colour never the sole signal, `prefers-reduced-motion` honoured.

## 13. Performance

- Static HTML, minimal JS (islands only).
- Self-hosted fonts.
- WebP images (~35% smaller than the source JPEGs).
- Budget: LCP < 2.0s on 4G mobile; JS < ~40KB gzipped for a content page.

## 14. Launch verification checklist

1. Payment details confirmed current → set `payment.verified` in the CMS.
2. Email, phone, WhatsApp, Facebook, Instagram links confirmed.
3. Scholarship selection criteria confirmed (is it still 80%?).
4. Currency of JNV coaching, Class 10 tutoring and farmer-training cadence confirmed.
5. Sannamma cow-donation outcome confirmed or left labelled historical.
6. Current cost of sponsoring a meal updated.
7. Current volunteer/donor count confirmed.
8. All four team bios confirmed current.
9. **Photo consent obtained** for all named individuals and photographs.
10. Kannada translations reviewed by a native speaker.
11. `PAYLOAD_SECRET` and other CMS env vars set; admin user created; read access reviewed.

## 15. Out of scope / future

Online payments, a public accounts page, newsletters, expanded stories from 2024–2026, more languages, on-demand revalidation webhooks from Payload to the host.

## 16. Success criteria

- A visitor can, within one screen, say what Bhoomi Seva does and how to help.
- Every claim is either dated and documented or appropriately qualified.
- Donations and volunteering take fewer than three steps to start.
- A volunteer can add a story, image or update without a developer.
- The site reads as authored, not templated.
