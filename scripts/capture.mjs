/* global innerWidth */
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { settle } from "./capture-helpers.mjs";
const round = process.argv[2] || "round-1";
await mkdir(`evidence/${round}`, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const results = [];
for (const [name, width, height, lang] of [
  ["desktop", 1440, 1000, "en"],
  ["mobile", 390, 844, "en"],
  ["mobile-kk", 390, 844, "kk"],
  ["tablet", 768, 1024, "ru"],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(`http://127.0.0.1:5317/?lang=${lang}`);
  await page.evaluate(() => document.fonts.ready);
  await settle(page);
  await page.screenshot({ path: `evidence/${round}/${name}-hero.png` });
  await page.locator("#work").scrollIntoViewIfNeeded();
  await settle(page);
  await page.screenshot({ path: `evidence/${round}/${name}-work.png` });
  await page.locator("#about").scrollIntoViewIfNeeded();
  await settle(page);
  await page.screenshot({ path: `evidence/${round}/${name}-about.png` });
  await settle(page);
  await settle(page, true);
  await page.screenshot({
    path: `evidence/${round}/${name}-full.png`,
    fullPage: true,
  });
  const overflow = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    width: innerWidth,
  }));
  results.push({ name, width, height, lang, overflow, errors });
  await page.close();
}
await writeFile(
  `evidence/${round}/capture.json`,
  JSON.stringify(results, null, 2),
);
console.log(results);
await browser.close();
