# SPEC.md — Bhoomi Seva website

Product and technical specification for the rebuilt Bhoomi Seva site.

---

## 1. Overview

Bhoomi Seva is a small, volunteer-led social initiative working with rural communities in Karnataka. The existing site (bhoomiseva.org) contains real, documented work wrapped in generic NGO copy and a handful of unsupported global statistics. This project rebuilds the site so its credibility matches its actual work: specific, dated, human and photographed.

**One-line positioning:** a volunteer-led rural and community support initiative — education, natural farming and farmer livelihoods, and practical support for children in need.

## 2. Goals

1. Present Bhoomi Seva accurately as broader than an environmental charity.
2. Make documented work verifiable: every story dated and located.
3. Preserve all valuable content from the migration source without preserving bad claims.
4. Make donating and volunteering obvious and low-friction.
5. Be fast, accessible and bilingual (English + Kannada).
6. Look authored and specific — not like a generic template or AI-generated site.

## 3. Non-goals

- Not an online payment gateway integration at launch. Donation stays a UPI/QR + confirmation workflow, matching how the organisation actually operates.
- Not a CMS. Content is typed source files edited by developers/volunteers.
- Not a full accounting/transparency portal (a short accountability note is in scope).
- Not a pan-India brand. Geography stays honest: Kanakapura, Kabbalu, Mandya district.

## 4. Audiences

**Beneficiaries / people seeking support:** rural school students, merit students with financial need, Class 5 JNV aspirants, Class 10 students needing tutoring, small and marginal farmers, women farmers, children in children's homes.

**Supporters:** individual donors, volunteer teachers/tutors, online and offline coordinators, goods donors, farming mentors, social-media supporters.

## 5. Information architecture

```
/                         Home
/work/                    Our Work (hub)
  /work/education
  /work/farmers-environment
  /work/children
/stories/                 Stories & updates (dated archive, filterable)
  /stories/[slug]         Individual story
/about                    Mission, vision, team, community
/get-involved             Volunteer, donate goods, socials
/donate                   Cause selector + UPI/QR + confirmation
/contact                  Form, email, WhatsApp, socials
/404
```

Kannada mirror at `/kn/*` for every route above.

Note: `/donate` and `/get-involved` overlap; `/donate` is the transactional page, `/get-involved` covers volunteering and goods. They cross-link.

## 6. Content model

All content is typed in `src/data/*`. Translatable fields use `Localized`.

```ts
type Localized = string | { en: string; kn?: string };
```

| File | Type | Key fields |
|---|---|---|
| `site.ts` | `Site` | name, contact, socials, payment (with `verified` flag), mission, vision, shortDescription |
| `programs.ts` | `Program[]` | id (`education` \| `farmers` \| `children`), accent, kicker, title, summary, activities[], storyIds[] |
| `stories.ts` | `Story[]` | slug, date, location, program, title, summary, body[], people[], featured |
| `team.ts` | `Person[]` | name, role, bio, order |
| `updates.ts` | `Update[]` | date, title, program, location, kind (`event` \| `donation` \| `milestone`) |

### Stories required at launch

- Sunita / Sunitha, Kurubarahalli Doddi near Kabbalu — cow + sewing machine + daughter's education (the integrated-model lead story).
- Vasanth V. C. — multi-year scholarship/fee support.
- Sanjana K. S. — multi-year support + online Chemistry tuition.
- Sree Raksha R. — education funding facilitated through Rotary Club (kept distinct from direct Bhoomi Seva funds).
- Ram — engineering student, financial/mentoring support including internship assistance.
- Sri Krishnashraya / Pushparaj testimonial — multi-kind children's-home support.
- July 2023 farmer training, Chirantana School, Kabbalu, Kanakapura.
- Cow-donation and scholarship-distribution entries.

### Claims policy

Encoded in AGENTS.md § Content and claims policy. Summary: keep documented work; drop or soften unsupported global/statistical claims; never present a planned action as completed; never publish unverified payment details.

## 7. Interactivity (Svelte islands)

| Island | Purpose |
|---|---|
| `MobileNav` | Accessible mobile menu toggle |
| `StoryFilter` | Filter the stories archive by programme and year |
| `DonateWidget` | Cause selector, amount suggestions, UPI copy-to-clipboard, QR, confirmation instructions |
| `VolunteerForm` | Skills, availability, location, areas of interest + validation |
| `ContactForm` | Name, email, message + validation |
| `Lightbox` | Captioned photo viewer |

Rules: content is server-rendered and visible without JS; islands hydrate only when needed; forms have real loading, success and error states (no happy-path-only UI).

## 8. Donations

Causes: Education & Scholarships · Farmer Support · Desi Cow Donation · Children's Home / Meal Support · Use Where Needed Most.

Flow: choose cause → see UPI ID / QR / Paytm / Google Pay → optionally copy → send confirmation via WhatsApp/email. Display a note asking donors to include the cause in the transfer comment, matching the organisation's existing workflow.

**Blocking pre-launch task:** confirm UPI, Paytm, Google Pay and QR are current. `site.payment.verified` gates a visible "details to be confirmed" state in the UI until true.

## 9. Forms

At launch, forms are validated client-side and submitted via a configured endpoint (Formspree/Web3Forms) or, if no endpoint is configured, fall back to a prefilled `mailto:`/WhatsApp handoff. No form data is stored by this site.

## 10. Internationalisation

- `en` default, unprefixed; `kn` at `/kn/`.
- Astro built-in i18n routing (`prefixDefaultLocale: false`).
- UI strings in `src/i18n/ui.ts`; content via `Localized` fields.
- Language switcher preserves the current path.
- **Kannada long-form content requires native-speaker review before launch.**

## 11. SEO

- Per-page `<title>`, meta description, canonical, `hreflang` alternates for `en`/`kn`.
- Open Graph + Twitter card metadata with a real image.
- `sitemap.xml` and `robots.txt`.
- JSON-LD `NGO`/`Organization` on the home page, `Article` on story pages.
- Clean, dated, descriptive slugs (e.g. `/stories/2023-07-farmer-training-kabbalu`).

## 12. Accessibility

WCAG 2.2 AA target. One `h1` per page, sequential headings, visible focus, skip link, keyboard-operable islands, correct `lang` per locale, colour never the sole signal, prefers-reduced-motion honoured.

## 13. Performance

- Static HTML, minimal JS (islands only).
- Self-hosted fonts, `font-display: swap`, subset where possible.
- Images optimized (responsive `srcset`, modern formats, explicit dimensions to avoid layout shift).
- Budget: LCP < 2.0s on 4G mobile; JS shipped < ~40KB gzipped for a content page.

## 14. Imagery policy

Photography is evidence, not decoration, and must be captioned. Real photographs (with consent) are strongly preferred. Until assets are supplied, use the **empty photo frame** component — a hairline-bordered `--paper-sunk` panel with a mono caption naming the missing image. Never use stock photos of unrelated people, and never leave a broken/placeholder image.

## 15. Launch verification checklist

1. UPI / Paytm / Google Pay / QR confirmed current → set `site.payment.verified = true`.
2. Email, phone, WhatsApp, Facebook, Instagram links confirmed.
3. Scholarship selection criteria confirmed (is it still 80%?).
4. Currency of JNV coaching, Class 10 tutoring and farmer-training cadence confirmed.
5. Sannamma cow-donation outcome confirmed or labelled historical.
6. Current cost of sponsoring a meal updated.
7. Current volunteer/donor count confirmed (prefer "around 100" to a stale range).
8. All four team bios confirmed current.
9. Photo consents obtained for all named individuals.
10. Kannada translations reviewed by a native speaker.

## 16. Out of scope / future

Online payments, a CMS/admin, a donation ledger/public accounts page, newsletters, expanded stories from 2024–2026, more languages.

## 17. Success criteria

- A visitor can, within one screen, say what Bhoomi Seva does and how to help.
- Every claim on the site is either dated and documented or appropriately qualified.
- Donations and volunteering take fewer than three steps to start.
- The site scores well on accessibility and performance audits and reads as authored, not templated.
