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

| Collection               | Maps to     | Notes                                                                                                   |
| ------------------------ | ----------- | ------------------------------------------------------------------------------------------------------- |
| `stories`                | `Story[]`   | title, slug, programme, date/period, location, summary, body paragraphs, image, quote, people, featured |
| `programs`               | `Program[]` | the three programmes, their activities and galleries                                                    |
| `team`                   | `Person[]`  | name, role, bio, photo, order                                                                           |
| `updates`                | `Update[]`  | dated/period-labelled events                                                                            |
| `media`                  | —           | image uploads with `alt` (localized) and a credit field                                                 |
| `users`                  | —           | auth                                                                                                    |
| `site-settings` (global) | `Site`      | contact, socials, payment, mission, vision, about, credit                                               |

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
