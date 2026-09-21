// Turns logo artwork into the site's assets.
//
//   bun run logo                              # uses public/images/logo-source.png
//   bun run logo full.png                     # lock-up only (emblem cropped automatically)
//   bun run logo full.png mark.png            # explicit emblem image (already cropped)
//
// Produces:
//   public/images/logo.webp        full lock-up (mark + wordmark), transparent, max 1200px
//   public/images/logo-mark.webp   the emblem only, square, transparent (used in the header)
//   public/favicon.png             48×48
//   public/apple-touch-icon.png    180×180
//
// With no explicit mark, the emblem is found by locating the horizontal gap
// between the artwork and the wordmark beneath it. If there is no such gap the
// image is assumed to be the emblem already.
import sharp from "sharp";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";

const fullInput = process.argv[2] || "public/images/logo-source.png";
const markInput = process.argv[3] || null;

for (const [label, p] of [
  ["logo", fullInput],
  ["mark", markInput],
]) {
  if (p && !existsSync(p)) {
    console.error(`\nNo ${label} image at "${p}".`);
    console.error("Usage: bun run logo <full-lockup> [cropped-mark]\n");
    process.exit(1);
  }
}

const OUT = "public/images";
await mkdir(OUT, { recursive: true });

async function pixels(file) {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const ink = (x, y) => {
    const i = (y * width + x) * channels;
    if (data[i + 3] < 10) return false;
    return data[i] < 245 || data[i + 1] < 245 || data[i + 2] < 245;
  };
  return { width, height, ink };
}

/** Content bounding box, optionally only above the first big empty gap. */
function contentBox({ width, height, ink }, stopAtGap) {
  const rows = new Array(height).fill(0);
  for (let y = 0; y < height; y++) {
    let c = 0;
    for (let x = 0; x < width; x++) if (ink(x, y)) c++;
    rows[y] = c;
  }
  const first = rows.findIndex((c) => c > 0);
  if (first < 0) return null;

  let bottom = height;
  if (stopAtGap) {
    const GAP = 12;
    for (let y = first + Math.round(height * 0.15); y < height - GAP; y++) {
      if (rows[y] === 0 && rows.slice(y, y + GAP).every((c) => c === 0)) {
        bottom = y;
        break;
      }
    }
  }

  let minX = width;
  let maxX = 0;
  let minY = height;
  let maxY = 0;
  for (let y = first; y < bottom; y++) {
    for (let x = 0; x < width; x++) {
      if (!ink(x, y)) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

function padded(box, w, h) {
  const pad = Math.round(Math.min(w, h) * 0.02);
  const left = Math.max(0, box.left - pad);
  const top = Math.max(0, box.top - pad);
  return {
    left,
    top,
    width: Math.min(w, box.left + box.width + pad) - left,
    height: Math.min(h, box.top + box.height + pad) - top,
  };
}

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

async function save(pipeline, file, w, h) {
  const png = await transparentise(pipeline);
  await png
    .resize(w, h, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90, effort: 6 })
    .toFile(file);
  const { width, height } = await sharp(file).metadata();
  console.log(`  → ${file}  ${width}×${height}`);
}

const full = await pixels(fullInput);
// With an explicit mark, keep the whole lock-up (mark + wordmark). Without one,
// the lock-up doubles as the emblem source, so stop at the gap above the text.
const fullBox = padded(
  contentBox(full, !markInput) ?? contentBox(full, false),
  full.width,
  full.height,
);
console.log(`lock-up   ${full.width}×${full.height} -> crop ${fullBox.width}×${fullBox.height}`);
await save(sharp(fullInput).extract(fullBox), `${OUT}/logo.webp`, 1200, null);

const markSrc = markInput ?? fullInput;
const mark = await pixels(markSrc);
const markBox = padded(contentBox(mark, !markInput), mark.width, mark.height);
console.log(`emblem    ${mark.width}×${mark.height} -> crop ${markBox.width}×${markBox.height}`);
const emblem = () => sharp(markSrc).extract(markBox);
await save(emblem(), `${OUT}/logo-mark.webp`, 512, 512);
await save(emblem(), "public/favicon.png", 48, 48);
await save(emblem(), "public/apple-touch-icon.png", 180, 180);

console.log("\nDone. The header and favicon pick these up automatically.");
