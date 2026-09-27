# Bhoomi Seva — Design System

> One-line brief: **a field notebook for a volunteer-led rural initiative.** Dated, specific, human, photographed. Not a corporate NGO template, not a SaaS landing page.

This document is the source of truth for colour, type, spacing, shape, motion and copy. Components must use these tokens, not ad-hoc values. If something needs a new token, add it here first.

---

## 1. Concept — "Field Notes"

The strongest thing about Bhoomi Seva is that its work is _documented_: real students, real dates, real places, a family that received a cow **and** a sewing machine **and** school fees for their daughter. The design leans into that. The site should read like a well-kept record book kept by someone who was actually there — warm, handwritten-adjacent, unpolished in the right ways, but precise and credible.

Three recurring devices:

1. **Photographs lead.** Real photographs carry the pages — paired with text, laid full-bleed, or shown in galleries. Text supports the image rather than the other way round.
2. **Dates and places are explicit.** Every story carries a date (or an honest period label) and a location, set in the condensed data face so they read as record rather than marketing.
3. **Evidence, not decoration.** Photographs are captioned and treated as documents. We never use a fake stock image.

### Earth and paper (the 2026 rework)

The field notebook now has a second ground. Pages alternate between **paper** (the record) and **soil** (`--soil`, a deep brown-black used for full-width bands, the footer and the mobile menu), so a long page reads as strata rather than one cream scroll. The devices that carry it:

1. **Photographs as evidence, first.** The home page opens on the promise and then a triptych of the three programmes' own photographs, one height, unequal widths, each captioned with the programme it shows. No collage, no shapes behind them.
2. **Display type at scale.** The home headline uses `--step-6` (capped at ~6.2rem); inner pages open with `PageHead`, whose lede sits beside the title on wide screens.
3. **Programme colour as ground.** Programme pages open on a full-bleed field of their own colour; on the home page each programme is a full-colour section, photograph alternating sides, using a gallery photograph that the hero has not already shown.
4. **The record.** Story and event pages set programme / date / place / author as a ruled data strip, not as a sentence.

> **Removed by design (do not reintroduce):** the earlier "ledger scaffolding" — numbered `01 / 02 / 03` section markers, wide-tracked uppercase mono eyebrows, and a hairline rule above every block. With real photographs in place, that scaffolding competed with the content and made the layout monotonous. Eyebrows are now plain sentence-case labels; sections are separated by space, not rules.

---

## 2. Anti-slop rules (binding)

Derived from current design-critique consensus. These are hard constraints.

**Typography**

- Never Inter, Geist, or a bare system stack — and not the other faces that now read as AI defaults either (Fraunces, Instrument Sans/Serif, Space Grotesk, IBM Plex Mono). We use **Tiro Kannada** and **Anek Kannada**: Indian-designed, and each covers Latin and Kannada as one family.
- Real hierarchy: display and body differ in family, size and spacing; data is the body face condensed. No flat hierarchy.
- No italic-serif-display cliché. No tiny "label above every heading". No badge pill above a headline.

**Colour**

- No purple/blue gradients. No gradient text. No radial halo or soft spotlight. No glowing neon on dark.
- Colour is **semantic**, never decorative: clay = action, leaf = farmers/environment, turmeric = education, indigo = children/community, rose = urgent/emergency.
- Off-white is a deliberate paper tone, not a default beige wash — every other colour is chosen against it.

**Layout**

- No three identical icon-cards in a row. Vary weight; a lead item is genuinely larger.
- No icon-in-rounded-tile stacked above a heading. Icons sit inline, beside text.
- No nested cards, no side-tab accent stripes, no border+shadow on the same surface.
- No numbered section markers (`01`, `02`) and no rule above every block. Separate with space.
- Radii are small and editorial (2–8px), never 16–24px everywhere.
- Spacing is intentional: related things close, separate things far. Not equal gaps everywhere.

**Motion**

- No auto-marquee, no pulsing status dots, no blinking cursors, no bounce/elastic easing, no hover-zoom on images.
- Content is visible by default; scroll reveals must never be required to see content.
- Motion only communicates state, directs attention, or carries character. Everything respects `prefers-reduced-motion`.

**Copy**

- No "supercharge", "world-class", "empowering", "Build the future". Say what was done and for whom.
- No "Not X. Y." forced-contrast slogans. No em-dash in every sentence.
- Specific and dated over grand and vague.

---

### What reads as AI-generated in 2026 (and is banned here)

Compiled from design-critique write-ups on "AI slop" and vibe-coded UI (Developers Digest's 16 patterns, TeneX Studio, 925 Studios, The Fountain Institute, Anthropic's note on distributional convergence). Each of these was either never used or has been removed from this site:

- Default font pairings: Inter, Geist, Space Grotesk, Instrument Serif/Sans, Fraunces, IBM Plex Mono date stamps.
- Purple/blue gradients, gradient text, coloured glows, glassmorphism, aurora backgrounds.
- A badge, pill or eyebrow above every heading; a coloured "status dot" in front of labels that are not states. (Dots survive only where they are a key: the programme filter chips.)
- Pills and big rounded corners on everything. Here radii are 2–8px; pills are gone.
- Identical icon-card grids; a row of three same-size link tiles.
- Stat-banner rows, decorative numbering (`01/02`), and oversized decorative numerals.
- Decorative blobs and shapes behind photographs (the "sun disc" was removed for this reason).
- Scroll-triggered fade-ins on every block, staggered entrance animations, scroll-jacking "stacking cards".
- A giant edge-to-edge wordmark in the footer; a big CTA banner under every single page.
- Repeating the same photograph twice on one page.
- Copy: em dashes as a tic, "empower/seamless/world-class", unsourced numbers.

The test: if a choice would be equally at home on any other site, it is not a choice.

## 3. Colour

Semantic tokens. Names describe **function**, not appearance.

| Token            | Hex       | Meaning                                     |
| ---------------- | --------- | ------------------------------------------- |
| `--paper`        | `#F3ECDF` | base page ground (warm paper)               |
| `--paper-raised` | `#FAF6EE` | lifted surface / cards                      |
| `--paper-sunk`   | `#E9DDC9` | recessed bands, image frames                |
| `--ink`          | `#241A13` | primary text (deep soil)                    |
| `--ink-2`        | `#5C4B3D` | secondary text                              |
| `--ink-3`        | `#7D6B5D` | captions, meta (AA on paper)                |
| `--rule`         | `#D7C9B3` | hairlines, dividers                         |
| `--clay`         | `#B5532B` | primary action / brand (terracotta)         |
| `--clay-deep`    | `#8C3D1E` | pressed / accessible text-on-paper          |
| `--leaf`         | `#3E6B4F` | farmers & environment                       |
| `--leaf-deep`    | `#2B4C37` | leaf text                                   |
| `--turmeric`     | `#D39A2A` | education                                   |
| `--indigo`       | `#2A4A63` | children & community                        |
| `--rose`         | `#9E3A55` | emergency / urgent needs                    |
| `--soil`         | `#1F1711` | dark ground: bands, footer, menu            |
| `--soil-2`       | `#2C2119` | raised surface on soil                      |
| `--on-soil`      | `#F3ECDF` | text on soil (`-2`, `-3` for meta)          |
| `--clay-bright`  | `#D8703F` | clay used _on soil_, where clay is too dark |

`.soil` on a section flips the ink/rule tokens so any component placed inside reads correctly on the dark ground. Each pillar class (`.accent-education` …) sets `--accent` (a text-safe shade), `--accent-fill` (the pure colour, for grounds, dots and rules), `--accent-on-soil` and `--accent-wash`. Turmeric is too light for text on paper, so its `--accent` is a darker `#8A6112`.

Washes (tinted section grounds) are generated with `color-mix()` from these, e.g. `--leaf-wash: color-mix(in oklab, var(--leaf) 10%, var(--paper))`. Do not hand-pick new pastels.

Contrast: body text on paper must meet WCAG AA (4.5:1). On coloured grounds use `--paper-raised` or `--ink`, never mid-grey.

---

## 4. Type

| Role            | Family                       | Notes                                                                          |
| --------------- | ---------------------------- | ------------------------------------------------------------------------------ |
| Display         | **Tiro Kannada**             | Tiro Typeworks. A Kannada-first serif whose Latin was drawn to sit with the Kannada. One weight (400); hierarchy comes from size. |
| Body / UI       | **Anek Kannada Variable**    | Ek Type, Mumbai. Latin + Kannada, weight and width axes. |
| Data            | **Anek Kannada, condensed**  | `font-stretch: 82%` + tabular numbers for dates, places, amounts. No monospace. |

Stacks:

```
--font-display: "Tiro Kannada", Georgia, serif;
--font-body:    "Anek Kannada Variable", system-ui, sans-serif;
--font-mono:    "Anek Kannada Variable", system-ui, sans-serif;  /* used condensed */
```

Scale (fluid, `clamp`), roughly 1.25–1.33 ratio:

```
--step--1: clamp(0.83rem, 0.8rem + 0.15vw, 0.9rem);
--step-0:  clamp(1rem, 0.95rem + 0.25vw, 1.09rem);
--step-1:  clamp(1.18rem, 1.1rem + 0.45vw, 1.4rem);
--step-2:  clamp(1.45rem, 1.3rem + 0.85vw, 1.95rem);
--step-3:  clamp(1.8rem, 1.5rem + 1.5vw, 2.75rem);
--step-4:  clamp(2.2rem, 1.7rem + 2.4vw, 3.6rem);
--step-5:  clamp(2.6rem, 1.8rem + 3.8vw, 5rem);     /* page titles */
--step-6:  clamp(3rem, 1.6rem + 6.4vw, 7.75rem);   /* the home headline only */
```

Kannada headings drop the negative tracking and open the line height to ~1.25 (`:lang(kn)` rules in `global.css` and the views), because Kannada words are long and the script needs vertical room.

Body measure 62–70ch. Line height 1.6 body, 0.92–1.1 display. Letter-spacing: slightly positive for small caps labels, slightly negative for large display.

---

## 5. Spacing & grid

8px base, non-linear (groups breathe differently):

```
--s-1: 0.25rem; --s-2: 0.5rem;  --s-3: 0.75rem; --s-4: 1rem;
--s-5: 1.5rem;  --s-6: 2rem;    --s-7: 3rem;    --s-8: 4rem;
--s-9: 6rem;    --s-10: 8rem;   --s-11: 11rem;
```

Page container max `82rem`, gutters `clamp(1.25rem, 5vw, 4rem)`. Editorial layout uses a 12-column grid on `.grid` for asymmetry (lead story 7 cols, secondary 5, etc.), never uniform thirds.

---

## 6. Shape & surface

```
--r-1: 2px; --r-2: 4px; --r-3: 6px; --r-4: 8px;
```

Default is nearly square. Surfaces are defined by **either** a hairline rule **or** a subtle shadow, never both. Shadows are rare and low:
`--shadow-lift: 0 1px 0 rgba(36,26,19,.04), 0 8px 24px -16px rgba(36,26,19,.35);`

Paper texture is a very subtle fractal-noise overlay at ~3% on the base body only (not on cards), so it reads as stock, not as a "decorative grid".

---

## 7. Components

- **Button** — solid clay (primary), ink, light (on clay/soil), outline, text+underline. `--r-3`, generous padding. Hover: 2px lift + arrow nudge. No glow, no gradient.
- **Arrow link** — underlined text link whose underline retracts and arrow nudges on hover.
- **PageHead** — `--step-5` title, lede beside it on wide screens, and a sentence-case label only when it says something the title does not. Every inner page opens with it.
- **Entry card** — 4:3 photograph; date, then the programme name in its colour; display title, summary, place. The whole card is the link. It is a size container: given ≥46rem (the first, newest entry of an unfiltered archive) it becomes a **lead** with the photograph beside the text.
- **Filter bar** — programme chips with colour dots, year select, live count; sticks under the header on wide screens.
- **Story page** — back pill, kicker, display title, a serif summary, the **record** strip (programme · date · place · author), a 3:2 photograph, body with an English-only drop cap, the letter/quote on the accent wash under a large opening quote mark, and people as pills.
- **Programme panel** (home) — full-colour ground, activities as a slash-separated line, an underlined "Read more". Photograph side alternates.
- **Programme row** (`/work`) — photograph with a block of the programme's colour offset behind it; sides alternate.
- **Donate** — choices (cause tiles with colour dots, amount tiles, custom amount) on the left; a sticky soil **slip** on the right with the total at display size, the pay button, QR and UPI copy. On phones the slip follows the choices and a fixed pay bar keeps the action in reach.
- **CTA band** — clay ground, light + outline buttons. On the home, work, programme, about and story pages; not at the foot of every archive list.
- **Footer** — soil ground, tagline and mission, link columns, legal line.
- **Empty photo frame** — falls back to a `--paper-sunk` panel with a dashed inset when no image exists. Never a broken image.
- **Gallery** — CSS-columns masonry on programme pages; every photograph keeps its own shape and opens in the lightbox.

Interactive (Svelte islands): mobile nav, donate widget, volunteer/contact form, story filter.

> Iconography comes from Lucide. Icons sit inline with text at 15–20px, never inside rounded tiles.

---

## 8. Motion

```
--ease-out: cubic-bezier(.2,.7,.2,1);
--dur-1: 140ms; --dur-2: 240ms; --dur-3: 420ms;
```

Allowed: colour/underline transitions on links, arrow shifts on buttons, a 2px lift on buttons and tiles, and lightbox scale from 0.98.

No entrance animations, no scroll reveals, no staggered menus. The one scroll-driven effect is functional: the header gains its hairline once the page scrolls (`animation-timeline: scroll()`); without support it simply shows the hairline.

---

## 9. Accessibility

- One `<h1>` per page, sequential headings.
- Visible `:focus-visible` ring (`2px solid var(--clay)`, 2px offset).
- Skip link.
- Language correctly set per locale (`lang="kn"` on Kannada).
- Colour never the only signal.
- All interactive islands keyboard operable.

---

## 10. Type details to preserve

- **Eyebrow / label** — sentence case, body sans, weight 600, no uppercase, no wide tracking. Takes the section's accent colour where one is set. (The old wide-tracked uppercase mono eyebrow is banned.)
- **Mono is reserved for data**: dates, periods, places, counts. Not for decoration or headings.
- **Display** — Tiro Kannada at 400. Used for page and section headings, story titles and quoted letters. Never for body copy.

---

## 11. Content and CMS

Colour, type and layout above describe the rendered site; the words and images come from Payload CMS (see SPEC.md §5 and `cms/README.md`).

- The design assumes **real photographs**. New content should ship with an image; the empty-frame fallback exists for gaps, not as a style.
- **Focal points are respected.** Cropping is done in CSS via `object-position` from the CMS focal point, never by destructive pre-cropping — one upload frames correctly at 3:2, 4:3 and square.
- Every story must carry a date or an explicit period, and a location.
- Both locales should be filled in the CMS. A blank Kannada field silently falls back to English.
- Editors adding a story should not need to touch code. If a content change requires a developer, the CMS model is wrong — extend it instead.
