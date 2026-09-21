// Turns a source logo image into the site's assets.
//
//   bun run logo                        # uses public/images/logo-source.png
//   bun run logo path/to/logo.png       # or any path
//
// Produces:
//   public/images/logo.webp        full lock-up (mark + wordmark), transparent, max 1200px
//   public/images/logo-mark.webp   the emblem only, square, transparent (used in the header)
//   public/favicon.png             48×48
//   public/apple-touch-icon.png    180×180
//
// The emblem is found by locating the horizontal gap between the artwork and the
// wordmark beneath it, so the crop does not depend on exact pixel coordinates.
import sharp from "sharp";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";

const input = process.argv[2] || "public/images/logo-source.png";
if (!existsSync(input)) {
  console.error(`\nNo logo source at "${input}".`);
  console.error("Save the logo image there (PNG or JPG), then run `bun run logo` again.");
  console.error("Any path works: `bun run logo ~/Downloads/logo.png`\n");
  process.exit(1);
}

const OUT = "public/images";
await mkdir(OUT, { recursive: true });

/** Near-white -> transparent, with a soft edge so anti-aliasing survives. */
async function transparentise(pipeline) {
  const { data, info } = await pipeline.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    if (min >= 250) data[i + 3] = 0;
    else if (min >= 236) data[i + 3] = Math.round(((250 - min) / 14) * 255);
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels } });
}

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const ink = (x, y) => {
  const i = (y * width + x) * channels;
  if (data[i + 3] < 10) return false;
  return data[i] < 245 || data[i + 1] < 245 || data[i + 2] < 245;
};

// Row occupancy
const rows = new Array(height).fill(0);
for (let y = 0; y < height; y++) {
  let count = 0;
  for (let x = 0; x < width; x++) if (ink(x, y)) count++;
  rows[y] = count;
}

const firstRow = rows.findIndex((c) => c > 0);
if (firstRow < 0) {
  console.error("That image appears to be blank.");
  process.exit(1);
}

// First run of empty rows after the artwork starts = the gap above the wordmark.
const GAP = 12;
let gapStart = -1;
for (let y = firstRow + Math.round(height * 0.15); y < height - GAP; y++) {
  if (rows[y] === 0 && rows.slice(y, y + GAP).every((c) => c === 0)) {
    gapStart = y;
    break;
  }
}
const emblemBottom = gapStart > 0 ? gapStart : Math.round(height * 0.62);

// Column bounds within the emblem band
let minX = width;
let maxX = 0;
let minY = height;
let maxY = 0;
for (let y = firstRow; y < emblemBottom; y++) {
  for (let x = 0; x < width; x++) {
    if (!ink(x, y)) continue;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
}

const pad = Math.round(Math.min(width, height) * 0.03);
const region = {
  left: Math.max(0, minX - pad),
  top: Math.max(0, minY - pad),
  width: Math.min(width, maxX + pad) - Math.max(0, minX - pad) + 1,
  height: Math.min(height, maxY + pad) - Math.max(0, minY - pad) + 1,
};

console.log(`source    ${width}×${height}`);
console.log(`emblem    ${region.width}×${region.height} at ${region.left},${region.top}`);

async function save(pipeline, file, w, h) {
  const png = await transparentise(pipeline);
  const out = png.resize(w, h, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });
  await out.webp({ quality: 90, effort: 6 }).toFile(file);
  console.log(`  → ${file}`);
}

// Full lock-up
await save(sharp(input), `${OUT}/logo.webp`, 1200, null);

// Emblem only
const emblem = () => sharp(input).extract(region);
await save(emblem(), `${OUT}/logo-mark.webp`, 512, 512);
await save(emblem(), "public/favicon.png", 48, 48);
await save(emblem(), "public/apple-touch-icon.png", 180, 180);

console.log("\nDone. The header picks up logo-mark.webp automatically.");
