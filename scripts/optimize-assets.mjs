/* global Image */
import { Buffer } from "node:buffer";
import { chromium } from "@playwright/test";
import { readFile, writeFile, readdir } from "node:fs/promises";
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const page = await browser.newPage();
const records = [];
for (const file of await readdir("docs/originals")) {
  if (!file.endsWith(".png")) continue;
  const buffer = await readFile(`docs/originals/${file}`);
  for (const preview of [false, true]) {
    if (preview && file.includes("-detail")) continue;
    const crop =
      file === "guidecheck-detail.png"
        ? { x: 0, y: 2600, width: 390, height: 870 }
        : preview && file === "guidecheck.png"
          ? { x: 0, y: 180, width: 1440, height: 1050 }
          : preview && file === "archiveguard.png"
            ? { x: 30, y: 1180, width: 1220, height: 820 }
            : null;
    const result = await page.evaluate(
      async ({ data, crop }) => {
        const img = new Image();
        img.src = data;
        await img.decode();
        const rect = crop || {
          x: 0,
          y: 0,
          width: img.width,
          height: img.height,
        };
        const factor = Math.min(1, 1440 / rect.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(rect.width * factor);
        canvas.height = Math.round(rect.height * factor);
        canvas
          .getContext("2d")
          .drawImage(
            img,
            rect.x,
            rect.y,
            rect.width,
            rect.height,
            0,
            0,
            canvas.width,
            canvas.height,
          );
        return {
          url: canvas.toDataURL("image/webp", 0.87),
          width: canvas.width,
          height: canvas.height,
        };
      },
      { data: `data:image/png;base64,${buffer.toString("base64")}`, crop },
    );
    const name = file.replace(".png", `${preview ? "-preview" : ""}.webp`);
    const bytes = Buffer.from(result.url.split(",")[1], "base64");
    await writeFile(`public/assets/${name}`, bytes);
    records.push({
      file: name,
      width: result.width,
      height: result.height,
      bytes: bytes.length,
      crop,
    });
  }
}
await writeFile("docs/assets.json", JSON.stringify(records, null, 2));
console.log(records);
await browser.close();
