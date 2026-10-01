import { writeFileSync, mkdirSync } from "node:fs";
import { copy, projects, type ProjectId } from "../src/content.ts";
import { renderPage, escape } from "../src/render.ts";
const template = (id: ProjectId | null) => `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#111214"><meta name="description" content="${escape(id ? copy.en.project[id].summary : copy.en.description)}"><meta name="color-scheme" content="dark"><meta name="referrer" content="strict-origin-when-cross-origin"><meta property="og:type" content="website"><meta property="og:title" content="${escape(id ? `${projects.find((p) => p.id === id)!.name} — Beibars Ileskhan` : copy.en.title)}"><meta property="og:description" content="${escape(id ? copy.en.project[id].summary : copy.en.description)}"><meta name="twitter:card" content="summary"><link rel="icon" href="${id ? "../" : ""}favicon.svg" type="image/svg+xml"><title>${escape(id ? `${projects.find((p) => p.id === id)!.name} — Beibars Ileskhan` : copy.en.title)}</title><link rel="stylesheet" href="${id ? "../" : ""}src/style.css"><script type="module" src="${id ? "../" : ""}src/main.ts"></script></head><body data-project="${id || ""}"><div id="app">${renderPage("en", id)}</div><noscript><style>.languages,.motion-toggle{display:none}</style></noscript></body></html>`;
mkdirSync("projects", { recursive: true });
writeFileSync("index.html", template(null));
for (const p of projects)
  writeFileSync(`projects/${p.id}.html`, template(p.id));
console.log(
  `Generated home and ${projects.length} case studies with readable static content.`,
);
