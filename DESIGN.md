# Bhoomi Seva — Design System

> One-line brief: **a field notebook for a volunteer-led rural initiative.** Dated, specific, human, photographed. Not a corporate NGO template, not a SaaS landing page.

This document is the source of truth for colour, type, spacing, shape, motion and copy. Components must use these tokens, not ad-hoc values. If something needs a new token, add it here first.

---

## 1. Concept — "Field Notes"

The strongest thing about Bhoomi Seva is that its work is _documented_: real students, real dates, real places, a family that received a cow **and** a sewing machine **and** school fees for their daughter. The design leans into that. The site should read like a well-kept record book kept by someone who was actually there — warm, handwritten-adjacent, unpolished in the right ways, but precise and credible.

Three recurring devices:

1. **Photographs lead.** Real photographs carry the pages — paired with text, laid full-bleed, or shown in galleries. Text supports the image rather than the other way round.
2. **Dates and places are explicit.** Every story carries a date (or an honest period label) and a location, set in mono so they read as record rather than marketing.
3. **Evidence, not decoration.** Photographs are captioned and treated as documents. We never use a fake stock image.

> **Removed by design (do not reintroduce):** the earlier "ledger scaffolding" — numbered `01 / 02 / 03` section markers, wide-tracked uppercase mono eyebrows, and a hairline rule above every block. With real photographs in place, that scaffolding competed with the content and made the layout monotonous. Eyebrows are now plain sentence-case labels; sections are separated by space, not rules.

---

## 2. Anti-slop rules (binding)

Derived from current design-critique consensus. These are hard constraints.

**Typography**

- Never Inter, Geist, or a bare system stack. We use Fraunces + Instrument Sans + IBM Plex Mono + Noto Kannada.
- Real hierarchy: display, body and mono differ in size, weight _and_ spacing. No flat hierarchy.
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

## 3. Colour

Semantic tokens. Names describe **function**, not appearance.

| Token            | Hex       | Meaning                             |
| ---------------- | --------- | ----------------------------------- |
| `--paper`        | `#F3ECDF` | base page ground (warm paper)       |
| `--paper-raised` | `#FAF6EE` | lifted surface / cards              |
| `--paper-sunk`   | `#E9DDC9` | recessed bands, image frames        |
| `--ink`          | `#241A13` | primary text (deep soil)            |
| `--ink-2`        | `#5C4B3D` | secondary text                      |
| `--ink-3`        | `#8A786A` | captions, meta                      |
| `--rule`         | `#D7C9B3` | hairlines, dividers                 |
| `--clay`         | `#B5532B` | primary action / brand (terracotta) |
| `--clay-deep`    | `#8C3D1E` | pressed / accessible text-on-paper  |
| `--leaf`         | `#3E6B4F` | farmers & environment               |
| `--leaf-deep`    | `#2B4C37` | leaf text                           |
| `--turmeric`     | `#D39A2A` | education                           |
| `--indigo`       | `#2A4A63` | children & community                |
| `--rose`         | `#9E3A55` | emergency / urgent needs            |

Washes (tinted section grounds) are generated with `color-mix()` from these, e.g. `--leaf-wash: color-mix(in oklab, var(--leaf) 10%, var(--paper))`. Do not hand-pick new pastels.

Contrast: body text on paper must meet WCAG AA (4.5:1). On coloured grounds use `--paper-raised` or `--ink`, never mid-grey.

---

## 4. Type

| Role            | Family                       | Notes                                                                          |
| --------------- | ---------------------------- | ------------------------------------------------------------------------------ |
| Display         | **Fraunces Variable**        | `opsz` auto, `WONK 1`, weight 500–700. Warm, slightly wonky, letterpress feel. |
| Body / UI       | **Instrument Sans Variable** | Clean, compact, characterful. Not Inter.                                       |
| Meta / dates    | **IBM Plex Mono**            | Date stamps, place names, labels, numbers.                                     |
| Kannada display | **Noto Serif Kannada**       | Falls back for display when Kannada is set.                                    |
| Kannada body    | **Noto Sans Kannada**        | Falls back for body/UI.                                                        |

Stacks:

```
--font-display: "Fraunces Variable", "Noto Serif Kannada", Georgia, serif;
--font-body:    "Instrument Sans Variable", "Noto Sans Kannada", system-ui, sans-serif;
--font-mono:    "IBM Plex Mono", "Noto Sans Kannada", ui-monospace, monospace;
```

Scale (fluid, `clamp`), roughly 1.25–1.33 ratio:

```
--step--1: clamp(0.83rem, 0.8rem + 0.15vw, 0.9rem);
--step-0:  clamp(1rem, 0.95rem + 0.25vw, 1.09rem);
--step-1:  clamp(1.22rem, 1.12rem + 0.5vw, 1.45rem);
--step-2:  clamp(1.5rem, 1.3rem + 1vw, 2rem);
--step-3:  clamp(1.9rem, 1.55rem + 1.7vw, 2.9rem);
--step-4:  clamp(2.4rem, 1.8rem + 3vw, 4.2rem);
--step-5:  clamp(3rem, 2rem + 5vw, 6rem);
```

Body measure 62–70ch. Line height 1.6 body, 1.05–1.15 display. Letter-spacing: slightly positive for small caps labels, slightly negative for large display.

---

## 5. Spacing & grid

8px base, non-linear (groups breathe differently):

```
--s-1: 0.25rem; --s-2: 0.5rem;  --s-3: 0.75rem; --s-4: 1rem;
--s-5: 1.5rem;  --s-6: 2rem;    --s-7: 3rem;    --s-8: 4rem;
--s-9: 6rem;    --s-10: 8rem;   --s-11: 11rem;
```

Page container max `78rem`, gutters `clamp(1.25rem, 5vw, 4rem)`. Editorial layout uses a 12-column grid on `.grid` for asymmetry (lead story 7 cols, secondary 5, etc.), never uniform thirds.

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

- **Button** — solid clay (primary), ink outline (secondary), text+underline (tertiary). Square-ish (`--r-2`), generous padding. Hover: fill shift + arrow nudge. No glow, no gradient.
- **Story card** — photograph (3:2), date or period in mono, programme dot, display title, summary, place. Used on `/stories` and the home page.
- **Story page** — kicker, display title, summary, a single inline meta line (programme · date · place), a 3:2 photo, body with an English-only drop cap, an optional pull quote in the original voice, and an inline "People" list.
- **Programme row** — alternating full-width image + text, used on the home page and `/work`. The image side flips on alternate rows. Activities render as dot-marked items, never numbered.
- **Full-bleed band** — edge-to-edge photograph with a gradient caption bar linking to a story. Breaks the vertical rhythm.
- **Empty photo frame** — falls back to a `--paper-sunk` panel with a dashed inset when no image exists. Never a broken image.
- **Pull quote** — display serif, accent rule on the left, attributed below.
- **Gallery** — responsive grid of 4:3 photographs on programme pages.

Interactive (Svelte islands): mobile nav, donate widget, volunteer/contact form, story filter.

> Iconography comes from Lucide. Icons sit inline with text at 15–20px, never inside rounded tiles.

---

## 8. Motion

```
--ease-out: cubic-bezier(.2,.7,.2,1);
--dur-1: 140ms; --dur-2: 240ms; --dur-3: 420ms;
```

Allowed: colour/underline transitions on links, 2–6px translate on reveal (content visible without JS), arrow shifts on buttons, lightbox scale from 0.98. Nothing more.

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
- **Display** — Fraunces with `WONK 1` and optical sizing. Used for page and section headings, story titles and pull quotes. Never for body copy.

---

## 11. Content and CMS

Colour, type and layout above describe the rendered site; the words and images come from Payload CMS (see SPEC.md §5 and `cms/README.md`).

- The design assumes **real photographs**. New content should ship with an image; the empty-frame fallback exists for gaps, not as a style.
- Every story must carry a date or an explicit period, and a location.
- Both locales should be filled in the CMS. A blank Kannada field silently falls back to English.
- Editors adding a story should not need to touch code. If a content change requires a developer, the CMS model is wrong — extend it instead.
