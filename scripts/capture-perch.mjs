/* global Image */
import { Buffer } from "node:buffer";
import { chromium } from "@playwright/test";
import { mkdir, writeFile, readFile } from "node:fs/promises";
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await mkdir("docs/originals", { recursive: true });
await mkdir("evidence/perch", { recursive: true });
const url = "https://seoshiro.github.io/perch-studio/";
await page.goto(url);
await page.locator(".scene-canvas canvas").waitFor();
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(2000);
await page.screenshot({ path: "docs/originals/perch.png" });
await page.getByRole("button", { name: "Layouts", exact: true }).click();
await page.getByRole("button", { name: "Save a copy", exact: true }).click();
await page.locator(".item-list").getByRole("button", { name: /Two-seat sofa/ }).click();
const width = page.locator(".inspector").getByLabel("Width", { exact: false });
await width.fill("1.8");
await width.press("Tab");
await page.getByRole("button", { name: "Compare layouts", exact: true }).click();
await page.locator(".compare-plan").first().waitFor();
await page.locator("dialog").screenshot({ path: "evidence/perch/compare-uncropped.png" });
await page.setViewportSize({ width: 1180, height: 800 });
await page.locator("dialog").screenshot({ path: "docs/originals/perch-detail.png" });
const converter = await browser.newPage();
const records = [];
for (const [original, targets] of [
  ["perch.png", ["perch.webp", "perch-preview.webp"]],
  ["perch-detail.png", ["perch-detail.webp"]],
]) {
  const bytes = await readFile(`docs/originals/${original}`);
  const result = await converter.evaluate(async (data) => {
    const img = new Image();
    img.src = data;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext("2d").drawImage(img, 0, 0);
    return { width: img.width, height: img.height, data: canvas.toDataURL("image/webp", 0.87) };
  }, `data:image/png;base64,${bytes.toString("base64")}`);
  for (const file of targets) {
    const output = Buffer.from(result.data.split(",")[1], "base64");
    await writeFile(`public/assets/${file}`, output);
    records.push({ file, width: result.width, height: result.height, bytes: output.length, crop: null });
  }
}
const assets = JSON.parse(await readFile("docs/assets.json", "utf8"));
await writeFile("docs/assets.json", JSON.stringify([...assets.filter(a => !a.file.startsWith("perch")), ...records], null, 2));
await writeFile("evidence/perch/capture.json", JSON.stringify({ url, sourceCommit: "952559edaf2d036d9e2205d733cfbd6a220b5a78", records }, null, 2));
console.log(records);
await browser.close();
