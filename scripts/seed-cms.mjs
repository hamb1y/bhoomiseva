// Seeds a running Payload CMS with the site's current content.
//
//   1. Start the CMS:   cd cms && bun install && cp .env.example .env && bun dev
//   2. Create the first admin user at http://localhost:3000/admin
//   3. Seed:            PAYLOAD_EMAIL=you@example.com PAYLOAD_PASSWORD=... bun run cms:seed
//
// Requires the seed TS modules — Bun can import TypeScript directly.
import { readdir } from "node:fs/promises";
import { join, basename } from "node:path";

import { stories } from "../src/data/seed/stories.ts";
import { programs } from "../src/data/seed/programs.ts";
import { team } from "../src/data/seed/team.ts";
import { updates } from "../src/data/seed/updates.ts";
import { site } from "../src/data/seed/site.ts";

const URL_BASE = process.env.PAYLOAD_URL || "http://localhost:3000";
const EMAIL = process.env.PAYLOAD_EMAIL;
const PASSWORD = process.env.PAYLOAD_PASSWORD;

let token = process.env.PAYLOAD_API_KEY || "";

async function login() {
  if (token) return;
  if (!EMAIL || !PASSWORD) {
    throw new Error("Set PAYLOAD_API_KEY, or PAYLOAD_EMAIL and PAYLOAD_PASSWORD, then retry.");
  }
  const res = await fetch(`${URL_BASE}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  token = (await res.json()).token;
}

const bearer = () => ({ Authorization: `JWT ${token}` });

/** Create in English, then patch the Kannada locale. */
async function createLocalized(slug, doc) {
  const { en, kn } = { en: stripLocale(doc, "en"), kn: stripLocale(doc, "kn") };

  const res = await fetch(`${URL_BASE}/api/${slug}?locale=en&depth=0`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...bearer() },
    body: JSON.stringify(en),
  });
  if (!res.ok) throw new Error(`${slug} create failed: ${res.status} ${await res.text()}`);
  const created = await res.json();

  if (Object.keys(kn).length) {
    await fetch(`${URL_BASE}/api/${slug}/${created.doc.id}?locale=kn`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...bearer() },
      body: JSON.stringify(kn),
    });
  }
  console.log(`  + ${slug}/${created.doc.slug ?? created.doc.id}`);
  return created.doc;
}

function stripLocale(value, lang) {
  if (Array.isArray(value)) {
    return value.map((v) => stripLocale(v, lang)).filter((v) => v !== undefined);
  }
  if (value && typeof value === "object") {
    if ("en" in value || "kn" in value) {
      const picked = value[lang] ?? (lang === "kn" ? value.en : undefined);
      return picked === undefined ? undefined : stripLocale(picked, lang);
    }
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      const mapped = stripLocale(v, lang);
      if (mapped !== undefined) out[k] = mapped;
    }
    return out;
  }
  return value;
}

async function uploadAll() {
  const dir = "public/images";
  const files = (await readdir(dir)).filter((f) => f.endsWith(".webp"));
  const map = new Map();
  for (const file of files) {
    const form = new FormData();
    form.append("file", new Blob([await Bun.file(join(dir, file)).arrayBuffer()]), file);
    form.append("alt", basename(file, ".webp").replace(/-/g, " "));
    const res = await fetch(`${URL_BASE}/api/media`, {
      method: "POST",
      headers: bearer(),
      body: form,
    });
    if (!res.ok) {
      console.warn(`  ! media ${file}: ${res.status}`);
      continue;
    }
    const doc = (await res.json()).doc;
    map.set(`/images/${file}`, doc.id);
    console.log(`  ↑ media ${file}`);
  }
  return map;
}

async function main() {
  await login();
  console.log(`Seeding ${URL_BASE}\n`);

  const uploaded = await uploadAll();
  const toMediaId = (path) => (path ? uploaded.get(path) : undefined);

  for (const p of programs) {
    await createLocalized("programs", {
      ...p,
      image: toMediaId(p.image),
      gallery: (p.gallery ?? []).map((src) => ({ image: toMediaId(src) })).filter((g) => g.image),
    });
  }

  for (const s of stories) {
    await createLocalized("stories", {
      ...s,
      image: toMediaId(s.image),
      body: s.body.map((paragraph) => ({ paragraph })),
      people: (s.people ?? []).map((name) => ({ name })),
      featured: Boolean(s.featured),
    });
  }

  for (const [i, person] of team.entries()) {
    await createLocalized("team", { ...person, photo: toMediaId(person.photo), order: i });
  }

  for (const u of updates) {
    await createLocalized("updates", u);
  }

  await fetch(`${URL_BASE}/api/globals/site-settings?locale=en`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...bearer() },
    body: JSON.stringify(stripLocale(site, "en")),
  });
  await fetch(`${URL_BASE}/api/globals/site-settings?locale=kn`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...bearer() },
    body: JSON.stringify(stripLocale(site, "kn")),
  });
  console.log("  + globals/site-settings");

  console.log("\nDone. Open /admin, check the content, then run `bun run content:pull`.");
}

main().catch((err) => {
  console.error(`\nSeed failed: ${err.message}`);
  process.exit(1);
});
