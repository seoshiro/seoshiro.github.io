import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const records = [];
try {
  for (const cpuSlowdown of [1, 4]) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 1100 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    const client = await context.newCDPSession(page);
    await client.send("Emulation.setCPUThrottlingRate", { rate: cpuSlowdown });
    await page.addInitScript(() => {
      window.__ribbonSamples = [];
      let paints = 0;
      const seen = new WeakSet();
      const getContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (...args) {
        const context = getContext.apply(this, args);
        if (args[0] === "2d" && context && !seen.has(context)) {
          seen.add(context);
          const clear = context.clearRect.bind(context);
          context.clearRect = (...args) => {
            paints++;
            return clear(...args);
          };
        }
        return context;
      };
      const raf = window.requestAnimationFrame.bind(window);
      window.requestAnimationFrame = (callback) =>
        raf((now) => {
          const before = paints,
            start = performance.now();
          callback(now);
          if (paints > before)
            window.__ribbonSamples.push(performance.now() - start);
        });
    });
    await page.goto("http://127.0.0.1:5317/");
    await page.evaluate(() => document.fonts.ready);
    await page.locator("#motion-toggle").click();
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      window.__ribbonSamples = [];
    });
    await page.waitForTimeout(2500);
    const measurement = await page.evaluate(() => {
      const samples = window.__ribbonSamples.slice().sort((a, b) => a - b);
      const canvas = document.querySelector("canvas");
      return {
        samples: samples.length,
        meanMs: samples.reduce((sum, value) => sum + value, 0) / samples.length,
        p95Ms: samples[Math.floor((samples.length - 1) * 0.95)],
        maxMs: samples.at(-1),
        bufferBytes: canvas.width * canvas.height * 4,
        buffer: [canvas.width, canvas.height],
      };
    });
    records.push({ cpuSlowdown, ...measurement });
    await context.close();
  }
} finally {
  await browser.close();
}
await writeFile(
  "evidence/sculpture/performance.json",
  JSON.stringify(
    {
      method:
        "Local Chromium emulation, DPR2, 390x1100. Actual animation callbacks that drew a frame; no virtual clock. CPU throttling is a controlled local proxy, not physical-phone performance.",
      records,
    },
    null,
    2,
  ),
);
console.log(records);
