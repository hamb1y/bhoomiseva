// Checks every route and the interactive islands against a running dev server.
//
//   bun run dev --port 4321     # in one terminal
//   bun run verify              # in another
//   bun run verify --shots      # also writes full-page screenshots to .verify/
//
// Requires a Chromium/Chrome binary. Set CHROME_PATH if it is not at one of the
// usual locations. This catches the class of bug that is invisible in source:
// hydration failures, stale Vite dependency caches, broken images and 404s.
import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE || "http://localhost:4321";
const SHOTS = process.argv.includes("--shots");
const OUT = ".verify";

const CANDIDATES = [
  process.env.CHROME_PATH,
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);
const executablePath = CANDIDATES.find((p) => existsSync(p));
if (!executablePath) {
  console.error("No Chromium/Chrome found. Set CHROME_PATH=/path/to/chrome");
  process.exit(1);
}

const ROUTES = [
  ["home", "/", "desktop"],
  ["work", "/work", "desktop"],
  ["work-education", "/work/education", "desktop"],
  ["work-farmers", "/work/farmers-environment", "desktop"],
  ["work-children", "/work/children", "desktop"],
  ["stories", "/stories", "desktop"],
  ["story-sunita", "/stories/sunita-kurubarahalli-doddi", "desktop"],
  ["story-training", "/stories/farmer-training-kabbalu-2023", "desktop"],
  ["about", "/about", "desktop"],
  ["get-involved", "/get-involved", "desktop"],
  ["donate", "/donate", "desktop"],
  ["contact", "/contact", "desktop"],
  ["kn-home", "/kn/", "desktop"],
  ["kn-story", "/kn/stories/sunita-kurubarahalli-doddi", "desktop"],
  ["mobile-home", "/", "mobile"],
  ["mobile-story", "/stories/sunita-kurubarahalli-doddi", "mobile"],
];

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
});

const failures = [];

function watch(page) {
  const problems = [];
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
  page.on("console", (m) => m.type() === "error" && problems.push(`console: ${m.text()}`));
  page.on("requestfailed", (r) => problems.push(`requestfailed: ${r.url()}`));
  page.on("response", (r) => {
    if (/\.(webp|png|jpg|jpeg|svg|avif)$/i.test(r.url()) && r.status() >= 400)
      problems.push(`image ${r.status()}: ${r.url()}`);
  });
  return problems;
}

async function newPage(size) {
  const page = await browser.newPage();
  await page.setViewport(
    size === "mobile" ? { width: 390, height: 844, isMobile: true } : { width: 1440, height: 950 },
  );
  return page;
}

/** Force lazy images to load, then wait until every image has settled. */
async function settle(page) {
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.loading = "eager";
    });
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    await Promise.all(
      [...document.images].map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            }),
      ),
    );
  });
  await new Promise((r) => setTimeout(r, 500));
}

if (SHOTS) await mkdir(OUT, { recursive: true });

for (const [name, path, size] of ROUTES) {
  const page = await newPage(size);
  const problems = watch(page);
  try {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle2", timeout: 30000 });
    await settle(page);

    const stats = await page.evaluate(() => {
      const islands = [...document.querySelectorAll("astro-island")];
      return {
        islands: islands.length,
        hydrated: islands.filter((i) => !i.hasAttribute("ssr")).length,
        brokenImages: [...document.querySelectorAll("img")].filter(
          (i) => !i.complete || i.naturalWidth === 0,
        ).length,
      };
    });

    const bad = [];
    if (stats.islands !== stats.hydrated)
      bad.push(`${stats.islands - stats.hydrated} island(s) not hydrated`);
    if (stats.brokenImages) bad.push(`${stats.brokenImages} broken image(s)`);

    if (SHOTS) await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });

    const all = [...bad, ...problems];
    if (all.length) {
      failures.push([path, all]);
      console.log(`✗ ${path.padEnd(38)} ${all.slice(0, 3).join(" | ")}`);
    } else {
      console.log(`✓ ${path.padEnd(38)} ${stats.hydrated}/${stats.islands} islands`);
    }
  } catch (err) {
    failures.push([path, [err.message]]);
    console.log(`✗ ${path.padEnd(38)} ${err.message}`);
  }
  await page.close();
}

// --- interactions ---
async function interaction(name, path, fn) {
  const page = await newPage("desktop");
  const problems = watch(page);
  try {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 300));
    const detail = await fn(page);
    if (problems.length) {
      failures.push([`interaction:${name}`, problems]);
      console.log(`✗ ${name.padEnd(38)} ${problems.slice(0, 2).join(" | ")}`);
    } else {
      console.log(`✓ ${name.padEnd(38)} ${JSON.stringify(detail)}`);
    }
  } catch (err) {
    failures.push([`interaction:${name}`, [err.message]]);
    console.log(`✗ ${name.padEnd(38)} ${err.message}`);
  }
  await page.close();
}

await interaction("lightbox", "/work/education", async (page) => {
  await page.click(".gallery-item");
  await new Promise((r) => setTimeout(r, 400));
  return page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]');
    return { open: Boolean(dialog), image: dialog?.querySelector("img")?.getAttribute("src") };
  });
});

await interaction("nav dropdown", "/", async (page) => {
  await page.click(".has-menu .toggle");
  await new Promise((r) => setTimeout(r, 300));
  return page.evaluate(() => ({
    items: [...document.querySelectorAll(".has-menu .menu a")].map((a) => a.textContent.trim()),
  }));
});

await interaction("mobile nav", "/", async (page) => {
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.reload({ waitUntil: "networkidle2" });
  await page.click(".mobile .toggle");
  await new Promise((r) => setTimeout(r, 400));
  return page.evaluate(() => ({ open: Boolean(document.querySelector("#mobile-nav")) }));
});

await interaction("story filter", "/stories", async (page) => {
  const before = await page.$$eval("[data-story]:not([hidden])", (els) => els.length);
  await page.select(".filters select", "education");
  await new Promise((r) => setTimeout(r, 300));
  const after = await page.$$eval("[data-story]:not([hidden])", (els) => els.length);
  return { before, after };
});

await interaction("donate widget", "/donate", async (page) => {
  const chips = await page.$$(".group .chip");
  await chips[2]?.click();
  await new Promise((r) => setTimeout(r, 200));
  return page.evaluate(() => ({
    upi: document.querySelector(".upi code")?.textContent,
    confirm: document
      .querySelector(".confirm a.btn")
      ?.getAttribute("href")
      ?.startsWith("https://wa.me/"),
  }));
});

await browser.close();

console.log("");
if (failures.length) {
  console.log(`${failures.length} check(s) failed:`);
  for (const [where, list] of failures) console.log(`  ${where}: ${list.join("; ")}`);
  process.exit(1);
}
console.log("All routes and interactions passed.");
