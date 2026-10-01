/* global PerformanceObserver */
import { chromium } from "@playwright/test";
import { writeFile, mkdir } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const records = [];
for (const width of [390, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const client = await page.context().newCDPSession(page);
  await client.send("Network.enable");
  await client.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 120,
    downloadThroughput: 200000,
    uploadThroughput: 100000,
  });
  await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.addInitScript(() => {
    window.__metrics = { cls: 0, lcp: 0, longTasks: [] };
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        if (!entry.hadRecentInput) window.__metrics.cls += entry.value;
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      window.__metrics.lcp = list.getEntries().at(-1).startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      window.__metrics.longTasks.push(
        ...list.getEntries().map((e) => e.duration),
      );
    }).observe({ type: "longtask", buffered: true });
  });
  await page.goto("http://127.0.0.1:5317/");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);
  const metrics = await page.evaluate(() => ({
    ...window.__metrics,
    resources: performance
      .getEntriesByType("resource")
      .map((e) => ({
        name: e.name.split("/").at(-1),
        bytes: e.encodedBodySize,
        duration: e.duration,
      })),
    navigation: performance.getEntriesByType("navigation")[0].toJSON(),
  }));
  records.push({
    width,
    cpuSlowdown: 4,
    latency: 120,
    downloadBytesPerSecond: 200000,
    ...metrics,
  });
  await page.close();
}
await mkdir("evidence/performance", { recursive: true });
await writeFile(
  "evidence/performance/metrics.json",
  JSON.stringify(records, null, 2),
);
console.log(
  records.map((r) => ({
    width: r.width,
    cls: r.cls,
    lcpMs: r.lcp,
    longTasks: r.longTasks,
    bytes: r.resources.reduce((s, r) => s + r.bytes, 0),
  })),
);
const html = readFileSync("dist/index.html", "utf8");
const script = html.match(/src="(\.\/assets\/main-[^"]+\.js)"/)[1];
console.log({ runtimeGzip: gzipSync(readFileSync(`dist/${script}`)).length });
await browser.close();
