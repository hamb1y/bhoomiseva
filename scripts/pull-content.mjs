// Pulls content from Payload CMS into src/data/generated/*.ts and caches media
// in public/.
//
//   PAYLOAD_URL=http://localhost:3000 bun run content:pull
//
// Notes:
//  • Only published documents are pulled. Set PAYLOAD_DRAFTS=1 to include drafts.
//  • Any uploaded image is supported. If a file with the same name already
//    exists in public/images (the committed library) it is reused; otherwise it
//    is downloaded to public/media/.
//  • The site falls back to src/data/seed/* when nothing has been generated.
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, basename } from "node:path";

import {
  mapStory,
  mapEntry,
  mapBlog,
  mapProgram,
  mapPerson,
  mapSite,
  payloadClient,
} from "../src/lib/payload.ts";

const URL_BASE =
  process.env.PAYLOAD_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000";
const INCLUDE_DRAFTS = process.env.PAYLOAD_DRAFTS === "1";
const OUT = "src/data/generated";
const CACHE_DIR = "public/media";
const LIBRARY_DIR = "public/images";

const client = payloadClient(URL_BASE, process.env.PAYLOAD_API_KEY);

const published = (docs) =>
  INCLUDE_DRAFTS ? docs : docs.filter((d) => d._status === undefined || d._status === "published");

/** Resolve every media doc once: committed library first, then download. */
async function prepareMedia() {
  const docs = published(await client.collections("media"));
  const byId = new Map();

  for (const m of docs) {
    const filename = m.filename || (m.url ? basename(m.url) : undefined);
    if (!filename) continue;

    const inLibrary = join(LIBRARY_DIR, filename);
    if (existsSync(inLibrary)) {
      byId.set(m.id, `/images/${filename}`);
      continue;
    }

    await mkdir(CACHE_DIR, { recursive: true });
    const cached = join(CACHE_DIR, filename);
    if (!existsSync(cached)) {
      if (!m.url) continue;
      const res = await fetch(m.url.startsWith("http") ? m.url : `${URL_BASE}${m.url}`);
      if (!res.ok) {
        console.warn(`  ! media ${filename}: ${res.status}`);
        continue;
      }
      await writeFile(cached, Buffer.from(await res.arrayBuffer()));
      console.log(`  ↓ media ${filename}`);
    }
    byId.set(m.id, `/media/${filename}`);
  }

  // Media relationships arrive as objects (depth=1) or ids.
  return (media) => {
    if (media == null) return undefined;
    const id = typeof media === "object" ? media.id : media;
    return byId.get(id);
  };
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
  console.log(`Pulling content from ${URL_BASE}${INCLUDE_DRAFTS ? " (including drafts)" : ""}\n`);

  const resolveMedia = await prepareMedia();

  const stories = published(await client.collections("stories")).map((d) =>
    mapStory(d, resolveMedia),
  );
  await writeModule("stories.ts", "Story", "stories", "Story[]", stories);

  const programs = published(await client.collections("programs")).map((d) =>
    mapProgram(d, resolveMedia),
  );
  await writeModule("programs.ts", "Program", "programs", "Program[]", programs);

  const team = published(await client.collections("team"))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((d) => mapPerson(d, resolveMedia));
  await writeModule("team.ts", "Person", "team", "Person[]", team);

  const events = published(await client.collections("events")).map((d) =>
    mapEntry(d, resolveMedia),
  );
  await writeModule("events.ts", "Entry", "events", "Entry[]", events);

  const blogs = published(await client.collections("blogs")).map((d) => mapBlog(d, resolveMedia));
  await writeModule("blogs.ts", "Blog", "blogs", "Blog[]", blogs);

  const settings = mapSite(await client.global("site-settings"));
  await writeFile(
    join(OUT, "site.ts"),
    `// GENERATED FILE — produced by \`bun run content:pull\` from Payload CMS.\n` +
      `import type { Site } from "../types";\n\n` +
      `export const site: Site | null = ${JSON.stringify(settings, null, 2)} as unknown as Site;\n`,
  );
  console.log("  ✓ site.ts");

  console.log(
    `\nDone. ${stories.length} stories, ${events.length} events, ${blogs.length} blog posts, ` +
      `${programs.length} programmes, ${team.length} people.`,
  );
}

main().catch((err) => {
  console.error(`\nPull failed: ${err.message}`);
  console.error("Is the CMS running and PAYLOAD_URL correct? Generated files were left untouched.");
  process.exit(1);
});
