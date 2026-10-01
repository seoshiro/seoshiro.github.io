import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import {
  sculptureFrameChange,
  sculptureMeasurements,
} from "../tests/sculpture-helpers.ts";
const base = process.argv[2] || "http://127.0.0.1:5317/";
const output = process.argv[3] || "evidence/sculpture-speed/local";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const frames = [];
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 1100 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  const initial = await sculptureMeasurements(page);
  await sculptureFrameChange(page, true);
  await page
    .locator("#sculpture")
    .screenshot({ path: `${output}/frame-0s.png` });
  frames.push({
    targetSeconds: 0,
    elapsedMs: 0,
    changedPixelFraction: 0,
    file: "frame-0s.png",
    ...initial,
  });
  await page.locator("#motion-toggle").click();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  const start = Date.now();
  for (const seconds of [0.5, 1, 2, 4]) {
    const remaining = seconds * 1000 - (Date.now() - start);
    if (remaining > 0) await page.waitForTimeout(remaining);
    const measurement = await sculptureMeasurements(page);
    const change = await sculptureFrameChange(page);
    const elapsedMs = Date.now() - start;
    const file = `frame-${seconds}s.png`;
    await page.locator("#sculpture").screenshot({ path: `${output}/${file}` });
    frames.push({
      targetSeconds: seconds,
      elapsedMs,
      changedPixelFraction: change,
      file,
      ...measurement,
    });
  }
  const report = {
    base,
    method:
      "Uninterrupted real-time Chromium playback, 390px DPR2. No virtual clock or production animation hooks. Screenshots have normal capture overhead; reported elapsed times are actual. Not a physical-phone frame-rate measurement.",
    errors,
    frames,
  };
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  if (errors.length) throw Error(JSON.stringify(errors));
  console.log(
    JSON.stringify({
      release: frames[0].release,
      output,
      frames: frames.map((f) => ({
        target: f.targetSeconds,
        elapsedMs: f.elapsedMs,
        change: f.changedPixelFraction,
        aspect: f.paint.aspect,
      })),
    }),
  );
} finally {
  await browser.close();
}
