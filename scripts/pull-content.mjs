// Pulls content from Payload CMS into src/data/generated/*.ts and downloads
// media into public/media/.
//
//   PAYLOAD_URL=http://localhost:3000 bun run content:pull
//
// The Astro site falls back to src/data/seed/* when nothing has been generated,
// so it builds with or without a CMS.
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, basename } from "node:path";

const URL_BASE =
  process.env.PAYLOAD_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000";
const API_KEY = process.env.PAYLOAD_API_KEY || "";
const OUT = "src/data/generated";
const MEDIA_DIR = "public/media";

const headers = { "Content-Type": "application/json" };
if (API_KEY) headers.Authorization = `users API-Key ${API_KEY}`;

async function fetchCollection(slug) {
  const url = `${URL_BASE}/api/${slug}?limit=500&depth=1&locale=all&draft=false`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${slug}: ${res.status} ${res.statusText}`);
  const json = await res.json();
  return json.docs ?? [];
}

async function fetchGlobal(slug) {
  const res = await fetch(`${URL_BASE}/api/globals/${slug}?depth=1&locale=all`, { headers });
  if (!res.ok) throw new Error(`${slug}: ${res.status} ${res.statusText}`);
  return res.json();
}

/** Text field: `{ en, kn }` or a plain string. */
const loc = (v) => {
  if (v == null) return undefined;
  if (typeof v === "string") return v;
  return v;
};

/** Localized array: `{ en: [...], kn: [...] }` -> `[{ en, kn }, ...]`. */
function zipArray(value, mapItem) {
  if (!value) return undefined;
  if (Array.isArray(value)) return value.map(mapItem);
  const en = value.en ?? [];
  const kn = value.kn ?? [];
  const len = Math.max(en.length, kn.length);
  return Array.from({ length: len }, (_, i) => mapItem({ en: en[i] ?? {}, kn: kn[i] ?? {} }, true));
}

const asLocalized = (item, key) =>
  item && typeof item === "object" && ("en" in item || "kn" in item)
    ? { en: item.en?.[key] ?? "", kn: item.kn?.[key] ?? item.en?.[key] ?? "" }
    : { en: item?.[key] ?? "", kn: item?.[key] ?? "" };

async function downloadMedia(media) {
  if (!media || typeof media !== "object") return undefined;
  const name = media.filename || (media.url ? basename(media.url) : undefined);
  if (!name) return undefined;

  // Prefer the committed asset library when the CMS is holding the same file —
  // keeps the repo self-contained and avoids duplicating media.
  if (existsSync(join("public/images", name))) return `/images/${name}`;

  if (!media.url) return undefined;
  await mkdir(MEDIA_DIR, { recursive: true });
  const dest = join(MEDIA_DIR, name);
  if (existsSync(dest)) return `/media/${name}`;
  const res = await fetch(media.url.startsWith("http") ? media.url : `${URL_BASE}${media.url}`);
  if (!res.ok) return undefined;
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  console.log(`  ↓ media ${name}`);
  return `/media/${name}`;
}

async function writeModule(file, importType, exportName, tsType, value) {
  const body =
    `// GENERATED FILE — produced by \`bun run content:pull\` from Payload CMS.\n` +
    `// Do not edit by hand; your changes will be overwritten.\n` +
    `import type { ${importType} } from "../types";\n\n` +
    `export const ${exportName}: ${tsType} = ${JSON.stringify(value, null, 2)} as unknown as ${tsType};\n`;
  await writeFile(join(OUT, file), body);
  console.log(`  ✓ ${file}`);
}

async function main() {
  console.log(`Pulling content from ${URL_BASE}\n`);
  await mkdir(OUT, { recursive: true });

  // ---- stories ----
  const storyDocs = await fetchCollection("stories");
  const stories = [];
  for (const d of storyDocs) {
    const image = await downloadMedia(d.image);
    const bodyEn = d.body?.en ?? [];
    const bodyKn = d.body?.kn ?? [];
    stories.push({
      slug: d.slug,
      program: d.program,
      ...(d.date ? { date: d.date } : {}),
      ...(d.period ? { period: loc(d.period) } : {}),
      location: loc(d.location),
      title: loc(d.title),
      summary: loc(d.summary),
      body: Array.from({ length: Math.max(bodyEn.length, bodyKn.length) }, (_, i) => ({
        en: bodyEn[i]?.paragraph ?? "",
        kn: bodyKn[i]?.paragraph ?? bodyEn[i]?.paragraph ?? "",
      })),
      ...(image ? { image } : {}),
      ...(d.imageAlt ? { imageAlt: loc(d.imageAlt) } : {}),
      ...(d.quote?.text
        ? { quote: { text: loc(d.quote.text), attribution: loc(d.quote.attribution) } }
        : {}),
      ...(d.people?.length ? { people: d.people.map((p) => p.name) } : {}),
      ...(d.featured ? { featured: true } : {}),
    });
  }
  await writeModule("stories.ts", "Story", "stories", "Story[]", stories);

  // ---- programs ----
  const programDocs = await fetchCollection("programs");
  const programs = [];
  for (const d of programDocs) {
    const image = await downloadMedia(d.image);
    const gallery = [];
    for (const g of d.gallery ?? []) {
      const src = await downloadMedia(g.image);
      if (src) gallery.push(src);
    }
    programs.push({
      id: d.key,
      accent: d.accent,
      kicker: loc(d.kicker),
      title: loc(d.title),
      summary: loc(d.summary),
      lede: loc(d.lede),
      activities: zipArray(d.activities, (it) => ({
        title: asLocalized(it, "title"),
        body: asLocalized(it, "body"),
      })),
      ...(image ? { image } : {}),
      ...(d.imageAlt ? { imageAlt: loc(d.imageAlt) } : {}),
      ...(gallery.length ? { gallery } : {}),
    });
  }
  await writeModule("programs.ts", "Program", "programs", "Program[]", programs);

  // ---- team ----
  const teamDocs = await fetchCollection("team");
  const team = [];
  for (const d of teamDocs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))) {
    const photo = await downloadMedia(d.photo);
    team.push({
      name: d.name,
      role: loc(d.role),
      bio: loc(d.bio),
      ...(photo ? { photo } : {}),
    });
  }
  await writeModule("team.ts", "Person", "team", "Person[]", team);

  // ---- updates ----
  const updateDocs = await fetchCollection("updates");
  const updates = updateDocs.map((d) => ({
    ...(d.date ? { date: d.date } : {}),
    ...(d.period ? { period: loc(d.period) } : {}),
    title: loc(d.title),
    program: d.program,
    location: loc(d.location),
    kind: d.kind,
  }));
  await writeModule("updates.ts", "Update", "updates", "Update[]", updates);

  // ---- site settings ----
  const s = await fetchGlobal("site-settings");
  const aboutEn = s.about?.en ?? [];
  const aboutKn = s.about?.kn ?? [];
  const site = {
    name: s.name || "Bhoomi Seva",
    email: s.email,
    phone: s.phone,
    phoneHref: s.phoneHref || String(s.phone || "").replace(/\s/g, ""),
    whatsapp: s.whatsapp || "",
    socials: {
      facebook: s.socials?.facebook || "",
      instagram: s.socials?.instagram || "",
      whatsappGroup: s.socials?.whatsappGroup || "",
    },
    payment: {
      upi: s.payment?.upi || "",
      paytm: s.payment?.paytm || "",
      gpay: s.payment?.gpay || "",
      verified: Boolean(s.payment?.verified),
    },
    mission: loc(s.mission),
    vision: loc(s.vision),
    shortDescription: loc(s.shortDescription),
    about: Array.from({ length: Math.max(aboutEn.length, aboutKn.length) }, (_, i) => ({
      en: aboutEn[i]?.paragraph ?? "",
      kn: aboutKn[i]?.paragraph ?? aboutEn[i]?.paragraph ?? "",
    })),
    credit: s.credit || "",
  };
  await writeFile(
    join(OUT, "site.ts"),
    `// GENERATED FILE — produced by \`bun run content:pull\` from Payload CMS.\n` +
      `import type { Site } from "../types";\n\n` +
      `export const site: Site | null = ${JSON.stringify(site, null, 2)} as unknown as Site;\n`,
  );
  console.log("  ✓ site.ts");

  console.log(
    `\nDone. ${stories.length} stories, ${programs.length} programmes, ${team.length} people, ${updates.length} updates.`,
  );
}

main().catch((err) => {
  console.error(`\nPull failed: ${err.message}`);
  console.error("Is the CMS running and PAYLOAD_URL correct? Generated files were left untouched.");
  process.exit(1);
});
