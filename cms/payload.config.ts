import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Stories } from "./collections/Stories";
import { Programs } from "./collections/Programs";
import { Team } from "./collections/Team";
import { Events } from "./collections/Events";
import { Blogs } from "./collections/Blogs";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const siteUrl = process.env.SITE_URL || "http://localhost:4321";

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, Media, Stories, Events, Blogs, Programs, Team],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "CHANGE_ME_BEFORE_USE",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || "file:./bhoomiseva.db" },
  }),
  // English + Kannada. Localized fields return `{ en, kn }` with `?locale=all`,
  // which is exactly the shape the Astro site expects.
  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "ಕನ್ನಡ", code: "kn" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  cors: [siteUrl],
  csrf: [siteUrl],
});
