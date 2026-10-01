/* global innerWidth */
import { chromium } from "@playwright/test";
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const page = await browser.newPage({
  viewport: { width: 1280, height: 1000 },
  reducedMotion: "reduce",
});
await page.goto("http://127.0.0.1:5317/?lang=kk");
await page.evaluate(() => (document.body.style.zoom = "2"));
console.log(
  await page.evaluate(() =>
    [...document.querySelectorAll("body *")]
      .map((el) => ({
        tag: el.tagName,
        cls: el.className,
        text: el.textContent?.slice(0, 45),
        right: el.getBoundingClientRect().right,
        width: el.getBoundingClientRect().width,
      }))
      .filter((x) => x.right > innerWidth + 1)
      .slice(0, 25),
  ),
);
await page.screenshot({ path: "evidence/zoom-before.png" });
await browser.close();
