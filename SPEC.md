# SPEC.md — Bhoomi Seva website

Product and technical specification for the Bhoomi Seva site.

---

## 1. Overview

Bhoomi Seva is a small, volunteer-led social initiative working with rural communities in Karnataka. This project is the rebuilt public site: a fast, accessible, bilingual (English + Kannada) static site whose content is managed in a Git-based CMS (Sveltia) by the organisation itself.

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
- Not server-rendered at request time. The site is fully static; content is read from files at build time.

## 4. Audiences

**Beneficiaries:** rural school students, merit students with financial need, Class 5 JNV aspirants, Class 10 students needing tutoring, small and marginal farmers, women farmers, children in children's homes.

**Supporters:** individual donors, volunteer teachers/tutors, online and offline coordinators, goods donors, farming mentors, social-media supporters.

**Editors:** Bhoomi Seva volunteers who maintain the content. They are not developers; the CMS must be usable without touching code, and every edit is a reviewable Git commit.

## 5. Architecture

```
┌──────────────────────────────┐        ┌─────────────────────────────┐
│  Sveltia CMS (public/admin)  │ commits│  content/  (JSON files)     │
│  Git-based, no server or DB  │ ─────► │  one file per entry         │
└──────────────────────────────┘        └──────────────┬──────────────┘
                                                       │ import.meta.glob
                                                       ▼
                                        ┌─────────────────────────────┐
                                        │  Astro static output        │
                                        │  Svelte 5 islands           │
                                        └─────────────────────────────┘
```

- **Content is files.** Every entry is a JSON file under `content/`. There is no database and no CMS server: Sveltia CMS is a static SPA that reads and writes those files in Git.
- **One loader.** `src/data/load.ts` converts the on-disk shape into the site's `Localized` model. `src/data/*.ts` glob the content folders and export typed arrays. No view or component knows about the file format.
- **The CMS ships with the site.** `public/admin/index.html` + `public/admin/config.yml`. Nothing to deploy separately.
- **Editing works two ways:** against a local Git checkout via the File System Access API (Chromium), or against GitHub in production.
- **Images are committed** in `public/images/` and referenced as `/images/…`.

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

Content lives in JSON files under `content/` and mirrors the TypeScript types in `src/data/types.ts`.

```ts
type Localized = string | { en: string; kn?: string };

interface Story   { slug; date?; period?; location; program; title; summary; body[]; image?; imageAlt?; quote?; people?; featured? }
interface Program { id; accent; kicker; title; summary; lede; activities[]; image?; imageAlt?; gallery? }
interface Person  { name; role; bio; photo? }
interface Update  { date?; period?; title; program; location; kind }
interface Site    { name; contact; socials; payment; mission; vision; shortDescription; about[]; credit }
```

### Sveltia collections

Defined in `public/admin/config.yml`; one JSON file per entry under `content/`.

| Collection | Folder                  | Type        | Notes                                           |
| ---------- | ----------------------- | ----------- | ----------------------------------------------- |
| `stories`  | `content/stories`       | `Story[]`   | Longer narratives with a testimonial            |
| `events`   | `content/events`        | `Entry[]`   | Short dated records                             |
| `blogs`    | `content/blogs`         | `Blog[]`    | One collection; `kind` is `donor` or `donee`    |
| `programs` | `content/programs`      | `Program[]` | The three programme pages                       |
| `team`     | `content/team`          | `Person[]`  | People on the About page                        |
| `settings` | `content/settings.json` | `Site`      | Contact, socials, payment, mission/vision/about |

### Content rules

Encoded in AGENTS.md § Content and claims policy. Summary: keep documented work; drop or soften unsupported global statistics; never present a planned action as completed; never publish unverified payment details.

## 8. Localisation

- `en` (default, unprefixed) and `kn` (prefixed `/kn/`).
- Sveltia uses the `single_file` structure: each entry file is `{ "en": {...}, "kn": {...} }`. Translatable fields appear under both keys; shared fields (slug, programme, image, order) are stored once under the default locale.
- `src/data/load.ts` turns that into the site's `Localized = { en, kn }` shape, so a missing Kannada value falls back to English at render time.
- **Kannada long-form copy should be reviewed by a native speaker before publishing.**

## 9. Content pipeline

| Step   | What happens                                                                         |
| ------ | ------------------------------------------------------------------------------------ |
| Edit   | Sveltia CMS writes JSON into `content/` (locally) or commits to Git (GitHub backend) |
| Build  | `bun run build` globs `content/**/*.json` at build time via `src/data/load.ts`       |
| Deploy | Static output; the admin app is served from `/admin/` alongside it                   |

There is no sync step and no runtime dependency on a CMS. A content edit is a commit; a build picks it up.

### Adding a story (editor workflow)

1. Open `http://localhost:4321/admin/index.html` while `bun run dev` is running (or `/admin/` in production).
2. In a Chromium browser choose **Work with Local Repository** and pick the project root, or sign in with GitHub.
3. **Stories → New Story.** Fill in the title, summary and one paragraph per item.
4. **Photo:** upload any image, then set **Photo position** so the subject survives the site's crop.
5. Set the programme, and either a date or a period, plus the location.
6. Save. The file is written to `content/stories/<slug>.json` — commit it with Git.
7. Reload the site (or restart `bun run dev`) to see the change.

## 10. Images

- Media is uploaded through Sveltia into `public/images/` and committed with the code (`media_folder: public/images`, `public_folder: /images`).
- Existing WebP files are already there; `bun run images` regenerates WebP from the originals in the same folder.
- Originals are never deleted, including low-resolution ones.
- **Photo position** (centre / top / bottom / left / right) is stored per entry and applied as CSS `object-position`, so one upload frames correctly at 3:2, 4:3 and square. Cropping is never destructive.
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
11. Sveltia backend points at the real GitHub repository; editor access granted to the organisation's account.

## 15. Out of scope / future

Online payments, a public accounts page, newsletters, expanded stories from 2024–2026, more languages, automated deploys on push.

## 16. Success criteria

- A visitor can, within one screen, say what Bhoomi Seva does and how to help.
- Every claim is either dated and documented or appropriately qualified.
- Donations and volunteering take fewer than three steps to start.
- A volunteer can add a story, image or update without a developer.
- The site reads as authored, not templated.
