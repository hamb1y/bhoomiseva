# Bhoomi Seva CMS

A [Payload](https://payloadcms.com) 3 backend for the Bhoomi Seva website. Content is bilingual (English + Kannada) and pulled into the Astro site at build time.

## Run it

```bash
cd cms
bun install
cp .env.example .env      # then set PAYLOAD_SECRET
bun dev                   # http://localhost:3000/admin
```

Then seed it from the repository root:

```bash
bun run cms:seed          # local API: creates the first user, uploads media, writes content
bun run content:pull      # reads the CMS back into src/data/generated/*
bun run build
```

`bun run seed` (inside `cms/`) uses Payload's **Local API**, so it needs no login and creates the first admin user itself — `admin@bhoomiseva.local` / `changeme123` unless `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` are set. Change the password after the first login. Re-running is safe: media that has already been uploaded is reused.

## Collections

| Collection               | Maps to     | Notes                                                                                                       |
| ------------------------ | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `stories`                | `Story[]`   | Tabbed editor (Story / Photo). Auto slug, **drafts**, focal point, Preview button.                          |
| `programs`               | `Program[]` | The three programmes. Tabs: Content / Activities / Photos.                                                  |
| `team`                   | `Person[]`  | name, role, bio, photo, order                                                                               |
| `events`                 | `Entry[]`   | Dated event records. Same tabbed editor pattern as Stories.                                                 |
| `blogs`                  | `Blog[]`    | One collection with a **Donor / Donee** selector; shared layout, split by the nav dropdown and a filter.    |
| `media`                  | —           | **Interactive uploads**: focal point + crop, `thumbnail`/`card`/`wide` sizes, localised `alt` and `caption` |
| `users`                  | —           | auth                                                                                                        |
| `site-settings` (global) | `Site`      | contact, socials, payment, mission, vision, about, credit                                                   |

## Adding a story

1. **Stories → Create new.**
2. **Story tab:** title, summary, and one paragraph per row. Optionally a quote and the people named.
3. **Photo tab:** upload any image or pick from the library, then open the image and **drag the focal point** to choose what stays in frame when the site crops it.
4. **Sidebar:** slug (auto-filled from the title), programme, date or period, location.
5. **Save Draft** while you work; **Publish** when ready.
6. From the repo root: `bun run content:pull && bun run build`.

Only published documents are pulled. The Preview button opens the story on the site, but it reflects the last sync — publish first.

## Localization

The config sets `en` (default) and `kn`. Localized fields return `{ en, kn }` from the REST API when called with `?locale=all` — exactly the shape `src/data/*` expects.

Long-form Kannada copy should be reviewed by a native speaker before publishing.

## Access

`read` is public on every collection so the Astro build can fetch without credentials. Create/update/delete require a logged-in user. If you want to lock reads down, set `PAYLOAD_API_KEY` and the pull script will send it.

## Database

SQLite by default (`file:./bhoomiseva.db`) — fine for a small site. For production, swap `sqliteAdapter` in `payload.config.ts` for `@payloadcms/db-postgres` or `@payloadcms/db-mongodb`.

## Media

Uploads are written to `cms/media/` and served from `/api/media/file/...`. The pull script downloads them into `public/media/` and rewrites references to `/media/<filename>`, so the built site serves its own images.

## Deploying

The CMS is a separate app. Deploy it wherever you run Node/Next (Fly, Railway, Render, a VPS). The Astro build only needs `PAYLOAD_URL` at build time — either point it at a running CMS in CI, or commit the generated `src/data/generated/*` from a local pull and build without network access.
