import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { settle } from "./capture-helpers.mjs";
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
await mkdir("evidence/round-3", { recursive: true });
for (const [name, width, height, lang] of [
  ["desktop", 1440, 1000, "en"],
  ["mobile", 390, 844, "kk"],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    reducedMotion: "reduce",
  });
  for (const id of ["perch", "forme", "selvedge", "guidecheck", "archiveguard"]) {
    await page.goto(`http://127.0.0.1:5317/projects/${id}.html?lang=${lang}`);
    await page.evaluate(() => document.fonts.ready);
    await settle(page);
    await page.screenshot({ path: `evidence/round-3/${name}-${id}.png` });
    await page.locator(".case-details").scrollIntoViewIfNeeded();
    await settle(page);
    await page.screenshot({
      path: `evidence/round-3/${name}-${id}-details.png`,
    });
  }
  await page.goto(`http://127.0.0.1:5317/?lang=${lang}`);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await settle(page);
  await page.screenshot({ path: `evidence/round-3/${name}-contact.png` });
  if (width === 1440) {
    await page.locator(".project-guidecheck").scrollIntoViewIfNeeded();
    await settle(page);
    await page.screenshot({
      path: "evidence/round-3/desktop-secondary-projects.png",
    });
  }
  await page.close();
}
await browser.close();
