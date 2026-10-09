import {
  copy,
  projects,
  dimensions,
  pageHref,
  type Locale,
  type ProjectId,
} from "./content.ts";
import {galleryHero, catalogue} from './gallery-render.ts';
export function escape(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
}
const lines = (s: string) => escape(s).replace(/\n/g, "<br>");
const external = (url: string, label: string, cls = "text-link") =>
  `<a class="${cls}" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)}</a>`;
const caseTitle = (name: string) => {
  const words = name.split(/(?=[A-Z][a-z])/);
  return words
    .map(
      (word, index) =>
        `<span class="case-title-word">${escape(word)}${index === words.length - 1 ? '<span class="brand-dot">.</span>' : ""}</span>`,
    )
    .join("<wbr>");
};
export function renderPage(locale: Locale, id: ProjectId | null) {
  const c = copy[locale],
    nested = !!id,
    root = nested ? "../" : "",
    home = pageHref(null, locale, nested);
  const header = `<a class="skip" href="#main">${c.skip}</a><header class="header"><a class="wordmark" href="${home}" aria-label="seoshiro — ${escape(c.name)}">seoshiro<span class="brand-dot" aria-hidden="true">.</span></a><nav aria-label="${c.work}"><a href="${id ? home : ""}#work">${id ? c.work : c.back}</a><a href="${id ? home : ""}#about">${c.about}</a><a href="${id ? home : ""}#contact">${c.contact}</a></nav><div class="languages" role="group" aria-label="${c.language}">${(["en", "ru", "kk"] as Locale[]).map((l) => `<button type="button" data-locale="${l}" aria-pressed="${l === locale}" aria-label="${{ en: "English", ru: "Русский", kk: "Қазақша" }[l]}" lang="${l}">${l.toUpperCase()}</button>`).join("")}</div></header>`;
  const footer = `<footer class="footer"><a class="wordmark" href="${home}">seoshiro<span class="brand-dot" aria-hidden="true">.</span></a><p>${c.footer}</p><a href="#main">${escape(c.name)}</a></footer>`;
  if (id) {
    const p = projects.find((p) => p.id === id)!,
      t = c.project[id],
      next = projects[(projects.indexOf(p) + 1) % projects.length];
    return `${header}<main id="main" tabindex="-1"><section class="case-header"><a class="back-link" href="${home}#work">${c.back}</a><div class="case-meta"><span class="eyebrow">${t.category}</span><span class="eyebrow">${String(projects.indexOf(p) + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}</span></div><h1>${caseTitle(p.name)}</h1><div class="case-intro"><h2>${lines(t.title)}</h2><div><p>${t.summary}</p><div class="case-actions">${external(p.live, c.live, "pill-link")}${external(p.source, c.source)}</div></div></div></section><figure class="case-cover image-shell" style="--project-color:${p.color}"><img src="${root}assets/${id}.webp" alt="${escape(t.alt)}" width="${dimensions[id].main[0]}" height="${dimensions[id].main[1]}" fetchpriority="high"><figcaption>${t.caption}${id==="aura"?'<br><a class="text-link" href="../assets/LICENSE-aura-model.txt" target="_blank" rel="noopener noreferrer">xemimia / CC BY 4.0 / credits ↗</a>':""}</figcaption></figure><section class="case-context"><p class="eyebrow">${c.role}</p><p>${c.roleText}</p><ul class="tags">${p.stack.map((s) => `<li>${s}</li>`).join("")}</ul></section><section class="io-grid"><div><span class="section-number" aria-hidden="true">01</span><h2>${c.input}</h2><p>${t.input}</p></div><div><span class="section-number" aria-hidden="true">02</span><h2>${c.output}</h2><p>${t.output}</p></div></section><section class="case-engineering"><div><p class="eyebrow">03 / ${c.engineering}</p><h2>${c.engineering}<span class="brand-dot">.</span></h2></div><ol>${t.decisions.map((s, i) => `<li><span aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><p>${s}</p></li>`).join("")}</ol></section><section class="case-details"><figure class="detail-image image-shell"><img src="${root}assets/${id}-detail.webp" alt="${escape(t.detailAlt)}" width="${dimensions[id].detail[0]}" height="${dimensions[id].detail[1]}" loading="lazy"></figure><div><p class="eyebrow">04 / ${c.boundaries}</p><h2>${c.boundaries}</h2><p>${t.limit}</p>${external(p.evidence, c.evidence)}</div></section><a class="next-project" href="${pageHref(next.id, locale, true)}"><span class="eyebrow">${c.next}</span><span>${next.name}<span class="brand-dot">.</span></span></a></main>${footer}`;
  }
  return `${header}<main id="main" tabindex="-1">${galleryHero(locale)}<section id="work" class="work"><div class="section-heading"><div><p class="eyebrow">01—09 / ${c.work}</p><h2>${c.selected}</h2></div><p>${c.selectedNote}</p></div>${catalogue(locale)}</section><section id="about" class="about"><div><p class="eyebrow">${c.aboutLabel}</p><h2>${lines(c.aboutTitle)}</h2><p class="about-intro">${c.aboutText}</p><div class="tech-line">TypeScript <span>/</span> React <span>/</span> Browser APIs</div></div><ol class="principles">${c.principles.map((p,i)=>`<li><span aria-hidden="true">0${i+1}</span><div><h3>${p.title}</h3><p>${p.text}</p></div></li>`).join('')}</ol></section><section id="contact" class="contact"><p class="eyebrow">${c.contact}</p><h2>${lines(c.contactTitle)}</h2><div class="contact-bottom"><p>${c.contactText}</p>${external('https://github.com/seoshiro',c.github,'pill-link')}</div></section></main>${footer}<dialog class="gallery-dialog" aria-labelledby="dialog-title"><button class="dialog-close" type="button" aria-label="${{en:'Close',ru:'Закрыть',kk:'Жабу'}[locale]}"><span aria-hidden="true">×</span><span>${{en:'Close',ru:'Закрыть',kk:'Жабу'}[locale]}</span></button><div class="dialog-body"></div></dialog>`;
}
