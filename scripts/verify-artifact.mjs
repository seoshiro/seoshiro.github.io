import { readFile, stat, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
const root = resolve("dist"),
  records = [];
for (const file of [
  "index.html",
  ...["perch", "forme", "selvedge", "guidecheck", "archiveguard"].map(
    (id) => `projects/${id}.html`,
  ),
]) {
  const html = await readFile(`dist/${file}`, "utf8");
  if (!html.includes("Content-Security-Policy"))
    throw Error(`No production CSP: ${file}`);
  if (!html.includes('<main id="main"'))
    throw Error(`Missing static content: ${file}`);
  const urls = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((url) => !url.startsWith("https:") && !url.startsWith("#"));
  for (const url of urls) {
    const resolved = new URL(url, `https://example.test/portfolio/${file}`);
    if (!resolved.pathname.startsWith("/portfolio/"))
      throw Error(`Subpath escape: ${url}`);
    const target = resolve(root, resolved.pathname.slice("/portfolio/".length));
    await stat(target);
  }
  records.push({ file, localReferences: urls.length, ok: true });
}
await mkdir("evidence", { recursive: true });
await writeFile("evidence/artifact.json", JSON.stringify(records, null, 2));
console.log(records);
