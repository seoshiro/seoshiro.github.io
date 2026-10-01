import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { settle } from "./capture-helpers.mjs";

const base = new URL(process.argv[2] || "https://seoshiro.github.io/");
const output = "evidence/live-mobile";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const manifest = {
  capturedAt: new Date().toISOString(),
  base: base.href,
  browser: await browser.version(),
  reducedMotion: "reduce",
  devicePixelRatio: 1,
  height: 844,
  release: null,
  observations: [],
  screenshots: [],
};
try {
  for (const width of [320, 390]) {
    for (const locale of ["en", "ru", "kk"]) {
      const context = await browser.newContext({
        viewport: { width, height: 844 },
        reducedMotion: "reduce",
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("requestfailed", (request) =>
        errors.push(`${request.url()}: ${request.failure()?.errorText}`),
      );
      const name = `${width}-${locale}`;
      const home = new URL(`?lang=${locale}`, base);
      const response = await page.goto(home.href);
      if (response?.status() !== 200) throw Error(`Home load failed: ${home}`);
      await settle(page, true);
      const release = await page
        .locator('meta[name="portfolio-build"]')
        .getAttribute("content");
      manifest.release ||= release;
      if (release !== manifest.release)
        throw Error("Release changed during capture.");
      const observe = async (url) => {
        const layout = await page.evaluate(() => ({
          language: document.documentElement.lang,
          viewport: window.innerWidth,
          documentWidth: document.documentElement.scrollWidth,
          bodyWidth: document.body.scrollWidth,
        }));
        if (layout.documentWidth > width + 1 || layout.bodyWidth > width + 1)
          throw Error(`Horizontal overflow: ${url} at ${width}px`);
        if (layout.language !== locale) throw Error(`Wrong locale: ${url}`);
        manifest.observations.push({ url, width, locale, ...layout });
      };
      const capture = async (section, fullPage = false) => {
        await settle(page, fullPage);
        const file = `${name}-${section}.png`;
        await page.screenshot({ path: `${output}/${file}`, fullPage });
        manifest.screenshots.push({
          file,
          width,
          locale,
          section,
          url: page.url(),
        });
      };
      await observe(home.href);
      await capture("hero");
      await page
        .locator("#work")
        .evaluate((el) =>
          el.scrollIntoView({ behavior: "instant", block: "start" }),
        );
      await capture("gallery");
      const gallery = `${name}-gallery-full.png`;
      await settle(page, true);
      await page.locator("#work").screenshot({ path: `${output}/${gallery}` });
      manifest.screenshots.push({
        file: gallery,
        width,
        locale,
        section: "gallery-full",
        url: page.url(),
      });
      // The full-gallery capture can make another local font face eligible.
      // Complete those requests before intentionally leaving the document.
      await page.evaluate(() => document.fonts.ready);
      await page.waitForLoadState("networkidle");
      const caseUrl = new URL(
        `projects/archiveguard.html?lang=${locale}`,
        base,
      );
      const caseResponse = await page.goto(caseUrl.href);
      if (caseResponse?.status() !== 200)
        throw Error(`Case load failed: ${caseUrl}`);
      await settle(page, true);
      const caseRelease = await page
        .locator('meta[name="portfolio-build"]')
        .getAttribute("content");
      if (caseRelease !== manifest.release)
        throw Error("Case release mismatch.");
      await observe(caseUrl.href);
      await capture("archiveguard-open");
      await page
        .locator(".case-details")
        .evaluate((el) =>
          el.scrollIntoView({ behavior: "instant", block: "start" }),
        );
      await capture("archiveguard-details");
      await capture("archiveguard-full", true);
      if (errors.length)
        throw Error(`Browser errors: ${JSON.stringify(errors)}`);
      await context.close();
    }
  }
} finally {
  await browser.close();
}
await writeFile(`${output}/manifest.json`, JSON.stringify(manifest, null, 2));
const escape = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll('"', "&quot;");
await writeFile(
  `${output}/index.html`,
  `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Live mobile portfolio evidence</title><style>body{font:16px system-ui;background:#eef0f3;color:#17202c;margin:32px}main{max-width:1200px;margin:auto}.grid{display:flex;flex-wrap:wrap;gap:24px;align-items:flex-start}figure{margin:0;width:min(100%,390px)}img{max-width:100%;height:auto;display:block}figcaption{margin:8px 0 14px;overflow-wrap:anywhere}h2{margin-top:48px}a{color:#103caf}</style><main><h1>Actual live mobile captures</h1><p>Release <code>${escape(manifest.release)}</code>. Captured ${escape(manifest.capturedAt)} from <a href="${escape(base.href)}">${escape(base.href)}</a>. Chromium, 320/390 × 844 CSS pixels, DPR 1, reduced motion. All captures use actual deployed pages and real repository images. No browser errors or horizontal overflow occurred in the twelve captured pages.</p><p><a href="manifest.json">Machine-readable manifest</a>. ArchiveGuard is the long case study. Full-section images intentionally extend vertically.</p>${[
    "hero",
    "gallery",
    "gallery-full",
    "archiveguard-open",
    "archiveguard-details",
    "archiveguard-full",
  ]
    .map(
      (section) =>
        `<h2>${section}</h2><div class="grid">${manifest.screenshots
          .filter((s) => s.section === section)
          .map(
            (s) =>
              `<figure><a href="${s.file}"><img src="${s.file}" loading="lazy" width="${s.width}" alt="${escape(s.locale.toUpperCase())} ${s.width}px ${section}"></a><figcaption>${s.locale.toUpperCase()} · ${s.width}px · <a href="${escape(s.url)}">live page</a></figcaption></figure>`,
          )
          .join("")}</div>`,
    )
    .join("")}</main></html>`,
);
console.log(
  JSON.stringify({
    release: manifest.release,
    captures: manifest.screenshots.length,
    pages: manifest.observations.length,
    output,
    errors: 0,
  }),
);
