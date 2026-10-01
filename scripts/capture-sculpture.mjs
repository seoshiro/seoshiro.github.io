import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { settle } from "./capture-helpers.mjs";
import {
  sculptureMeasurements,
  installPausedClock,
} from "../tests/sculpture-helpers.ts";

const base = new URL(process.argv[2] || "https://seoshiro.github.io/");
const output = process.argv[3] || "evidence/sculpture/after";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const manifest = {
  base: base.href,
  capturedAt: new Date().toISOString(),
  browser: await browser.version(),
  method:
    "Actual browser canvas and screenshots. Motion phases use Playwright's clock.runFor, executing every animation frame; static layout captures use reduced motion. Emulated Chromium, no physical-device claim.",
  release: null,
  captures: [],
  measurements: [],
  errors: [],
};
async function capture(page, file, metadata, options = {}) {
  const png = await page.screenshot({
    path: `${output}/${file}`,
    animations: "disabled",
    ...options,
  });
  manifest.captures.push({
    file,
    sha256: createHash("sha256").update(png).digest("hex"),
    url: page.url(),
    ...metadata,
  });
}
try {
  for (const [width, height, locale, dpr] of [
    ...[320, 360, 390, 414].flatMap((width) =>
      ["en", "ru", "kk"].map((locale) => [width, 900, locale, 2]),
    ),
    [640, 360, "ru", 2],
    [760, 414, "kk", 2],
    [1440, 1000, "en", 1],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: dpr,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => manifest.errors.push(error.message));
    const pause = await installPausedClock(page);
    const response = await page.goto(new URL(`?lang=${locale}`, base).href);
    if (response?.status() !== 200) throw Error("Capture page failed.");
    await settle(page, true);
    await pause();
    const measurement = await sculptureMeasurements(page);
    manifest.release ||= measurement.release;
    if (measurement.release !== manifest.release)
      throw Error("Capture release changed.");
    manifest.measurements.push({
      kind: "layout",
      width,
      height,
      locale,
      dpr,
      ...measurement,
    });
    const name = `${width}x${height}-${locale}-dpr${dpr}`;
    await capture(page, `${name}-viewport.png`, {
      kind: "layout",
      width,
      height,
      locale,
      dpr,
    });
    if (width < 1000) {
      const file = `${name}-hero.png`;
      const png = await page
        .locator(".hero")
        .screenshot({ path: `${output}/${file}`, animations: "disabled" });
      manifest.captures.push({
        file,
        sha256: createHash("sha256").update(png).digest("hex"),
        url: page.url(),
        kind: "full-hero",
        width,
        height,
        locale,
        dpr,
      });
    }
    await context.close();
  }
  const context = await browser.newContext({
    viewport: { width: 360, height: 900 },
    deviceScaleFactor: 2,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => manifest.errors.push(error.message));
  const pause = await installPausedClock(page);
  await page.goto(new URL("?lang=ru", base).href);
  await settle(page, true);
  await pause();
  await page.locator("#motion-toggle").click();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await settle(page);
  await page.clock.runFor(48);
  let previous = 0;
  for (const seconds of [0, 8, 16, 24, 40, 64]) {
    if (seconds > previous)
      await page.clock.runFor((seconds - previous) * 1000);
    previous = seconds;
    const measurement = await sculptureMeasurements(page);
    manifest.measurements.push({ kind: "motion", seconds, ...measurement });
    await capture(
      page,
      `motion-${String(seconds).padStart(2, "0")}-viewport.png`,
      {
        kind: "motion",
        seconds,
        width: 360,
        height: 900,
        locale: "ru",
        dpr: 2,
      },
    );
    const file = `motion-${String(seconds).padStart(2, "0")}-canvas.png`;
    const png = await page
      .locator("#sculpture")
      .screenshot({ path: `${output}/${file}`, animations: "disabled" });
    manifest.captures.push({
      file,
      sha256: createHash("sha256").update(png).digest("hex"),
      url: page.url(),
      kind: "canvas-motion",
      seconds,
      width: 360,
      height: 900,
      locale: "ru",
      dpr: 2,
    });
  }
  await context.close();
} finally {
  await browser.close();
}
await writeFile(`${output}/manifest.json`, JSON.stringify(manifest, null, 2));
if (manifest.errors.length) throw Error(JSON.stringify(manifest.errors));
await writeFile(
  `${output}/index.html`,
  `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Mobile sculpture evidence</title><style>body{font:16px system-ui;background:#eee;color:#17202c;margin:24px}main{max-width:1200px;margin:auto}.grid{display:flex;flex-wrap:wrap;gap:24px;align-items:start}figure{margin:0;width:min(100%,360px)}img{width:100%;height:auto;display:block}figcaption{margin:8px 0 24px}code{overflow-wrap:anywhere}</style><main><h1>Mobile sculpture — browser evidence</h1><p>Source ${base.href}; release <code>${manifest.release}</code>. ${manifest.method}</p><p><a href="manifest.json">Measurements and capture manifest</a>.</p>${[
    "motion",
    "canvas-motion",
    "layout",
    "full-hero",
  ]
    .map(
      (kind) =>
        `<h2>${kind}</h2><div class="grid">${manifest.captures
          .filter((c) => c.kind === kind)
          .map(
            (c) =>
              `<figure><a href="${c.file}"><img src="${c.file}" loading="lazy" alt="${c.file}"></a><figcaption>${c.file}</figcaption></figure>`,
          )
          .join("")}</div>`,
    )
    .join("")}</main></html>`,
);
console.log(
  JSON.stringify({
    release: manifest.release,
    captures: manifest.captures.length,
    measurements: manifest.measurements.length,
    motion: manifest.measurements
      .filter((m) => m.kind === "motion")
      .map((m) => ({
        seconds: m.seconds,
        aspect: m.paint.aspect,
        paintWidth: m.paint.width,
        paintHeight: m.paint.height,
      })),
    output,
    errors: manifest.errors.length,
  }),
);
