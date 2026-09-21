// Seeds the CMS with the site's current content using Payload's Local API.
//
//   cd cms && bun run seed
//
// Creates the first admin user if none exists, uploads every WebP in
// ../public/images, then writes programs, stories, team, updates and the
// site-settings global in both locales.
import path from "path";
import { fileURLToPath } from "url";
import { readdir } from "fs/promises";
import { getPayload } from "payload";

import config from "../payload.config";
import { programs } from "../../src/data/seed/programs";
import { stories } from "../../src/data/seed/stories";
import { team } from "../../src/data/seed/team";
import { updates } from "../../src/data/seed/updates";
import { site } from "../../src/data/seed/site";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.resolve(dirname, "../../public/images");

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@bhoomiseva.local";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "changeme123";

const payload = await getPayload({ config });

/** Turn a `{ en, kn }` field into separate locale payloads. */
function splitLocale(value: any, lang: "en" | "kn"): any {
  if (Array.isArray(value)) return value.map((v) => splitLocale(v, lang));
  if (value && typeof value === "object") {
    if ("en" in value || "kn" in value) {
      const picked = value[lang] ?? (lang === "kn" ? value.en : undefined);
      return picked === undefined ? undefined : splitLocale(picked, lang);
    }
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(value)) {
      const mapped = splitLocale(v, lang);
      if (mapped !== undefined) out[k] = mapped;
    }
    return out;
  }
  return value;
}

async function ensureUser() {
  const existing = await payload.find({ collection: "users", limit: 1 });
  if (existing.totalDocs > 0) {
    console.log(`• user already exists (${existing.docs[0].email})`);
    return;
  }
  await payload.create({
    collection: "users",
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: "Admin" },
  });
  console.log(`• created admin user ${ADMIN_EMAIL} / ${ADMIN_PASSWORD} — change this password`);
}

async function uploadMedia() {
  const files = (await readdir(IMAGES_DIR)).filter((f) => f.endsWith(".webp"));
  const byPath = new Map<string, number>();
  for (const file of files) {
    const existing = await payload.find({
      collection: "media",
      where: { filename: { equals: file } },
      limit: 1,
    });
    if (existing.docs[0]) {
      byPath.set(`/images/${file}`, existing.docs[0].id as number);
      continue;
    }
    const filePath = path.join(IMAGES_DIR, file);
    const doc = await payload.create({
      collection: "media",
      data: { alt: file.replace(/\.webp$/, "").replace(/-/g, " ") },
      filePath,
    });
    byPath.set(`/images/${file}`, doc.id as number);
    console.log(`  ↑ ${file}`);
  }
  return (p: string | undefined) => (p ? byPath.get(p) : undefined);
}

async function createLocalized(collection: any, doc: any, label: string) {
  const en = splitLocale(doc, "en");
  const kn = splitLocale(doc, "kn");
  const created: any = await payload.create({ collection, data: en, locale: "en" });
  if (kn && Object.keys(kn).length > 1) {
    await payload.update({ collection, id: created.id, data: kn, locale: "kn" });
  }
  console.log(`  + ${label}`);
  return created;
}

async function main() {
  console.log("Seeding Bhoomi Seva CMS\n");
  await ensureUser();

  console.log("\nUploading media");
  const mediaId = await uploadMedia();

  console.log("\nPrograms");
  for (const p of programs) {
    await createLocalized(
      "programs",
      {
        key: p.id,
        accent: p.accent,
        kicker: p.kicker,
        title: p.title,
        summary: p.summary,
        lede: p.lede,
        activities: p.activities,
        image: mediaId(p.image),
        imageAlt: p.imageAlt,
        gallery: (p.gallery ?? []).map((src) => ({ image: mediaId(src) })).filter((g) => g.image),
      },
      `programs/${p.id}`,
    );
  }

  console.log("\nStories");
  for (const s of stories) {
    await createLocalized(
      "stories",
      {
        ...s,
        _status: "published",
        image: mediaId(s.image),
        body: s.body.map((paragraph) => ({ paragraph })),
        people: (s.people ?? []).map((name) => ({ name })),
        featured: Boolean(s.featured),
      },
      `stories/${s.slug}`,
    );
  }

  console.log("\nTeam");
  for (const [i, person] of team.entries()) {
    await createLocalized(
      "team",
      { ...person, photo: mediaId(person.photo), order: i },
      `team/${person.name}`,
    );
  }

  console.log("\nUpdates");
  for (const u of updates) {
    await createLocalized("updates", u, `updates/${JSON.stringify(u.title).slice(0, 40)}`);
  }

  console.log("\nSite settings");
  const settings = { ...site, about: site.about.map((paragraph) => ({ paragraph })) };
  await payload.updateGlobal({
    slug: "site-settings",
    data: splitLocale(settings, "en"),
    locale: "en",
  });
  await payload.updateGlobal({
    slug: "site-settings",
    data: splitLocale(settings, "kn"),
    locale: "kn",
  });
  console.log("  + site-settings");

  console.log(
    "\nDone. Open http://localhost:3000/admin, then run `bun run content:pull` from the repo root.",
  );
  process.exit(0);
}

main().catch((err) => {
  console.error("\nSeed failed:", err);
  process.exit(1);
});
