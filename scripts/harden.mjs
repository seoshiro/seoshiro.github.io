import { readFile, writeFile } from "node:fs/promises";
const origin = "https://seoshiro.github.io";
const commit =
  process.env.GITHUB_SHA || process.env.PORTFOLIO_COMMIT || "local-development";
const policy =
  "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'";
for (const file of [
  "index.html",
  ...["orbit", "reson", "lumen", "perch", "forme", "selvedge", "guidecheck", "archiveguard"].map(
    (id) => `projects/${id}.html`,
  ),
]) {
  const html = await readFile(`dist/${file}`, "utf8");
  await writeFile(
    `dist/${file}`,
    html
      .replace(
        "<head>",
        `<head><link rel="canonical" href="${origin}/${file === "index.html" ? "" : file}"><meta property="og:url" content="${origin}/${file === "index.html" ? "" : file}"><meta name="portfolio-build" content="${commit}">`,
      )
      .replace(
        '<meta charset="UTF-8">',
        `<meta charset="UTF-8"><meta http-equiv="Content-Security-Policy" content="${policy}">`,
      ),
  );
}
await writeFile("dist/version.json", JSON.stringify({ commit }));
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
);
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["", ...["orbit", "reson", "lumen", "perch", "forme", "selvedge", "guidecheck", "archiveguard"].map((id) => `projects/${id}.html`)].map((path) => `<url><loc>${origin}/${path}</loc></url>`).join("")}</urlset>`,
);
console.log("Production CSP applied to all nine static pages.");
