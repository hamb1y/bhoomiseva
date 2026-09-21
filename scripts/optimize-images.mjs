// Converts source images in public/images to WebP alongside the originals.
// Originals are never deleted — some are low-resolution and still worth keeping.
//
//   bun run images
//
import { readdir, stat } from "node:fs/promises";
import { join, basename, extname } from "node:path";
import sharp from "sharp";

const DIR = "public/images";
const MAX_WIDTH = 1600;
const QUALITY = 80;
const SOURCE = /\.(jpe?g|png)$/i;

const files = (await readdir(DIR)).filter((f) => SOURCE.test(f));

let before = 0;
let after = 0;

for (const file of files) {
  const src = join(DIR, file);
  const out = join(DIR, `${basename(file, extname(file))}.webp`);

  const srcSize = (await stat(src)).size;
  const image = sharp(src, { failOn: "none" });
  const meta = await image.metadata();

  let pipeline = image;
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  await pipeline.webp({ quality: QUALITY, effort: 5 }).toFile(out);

  const outSize = (await stat(out)).size;
  before += srcSize;
  after += outSize;
  console.log(
    `${file.padEnd(30)} ${String(meta.width ?? "?").padStart(5)}px  ` +
      `${(srcSize / 1024).toFixed(0).padStart(5)}KB -> ${(outSize / 1024).toFixed(0).padStart(5)}KB`,
  );
}

console.log(
  `\n${files.length} images  ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB ` +
    `(${Math.round((1 - after / before) * 100)}% smaller)`,
);
