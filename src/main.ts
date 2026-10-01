import { copy, validLocale, projectById, type Locale } from "./content.ts";
import { renderPage } from "./render.ts";
import { startSculpture } from "./sculpture.ts";
const id = projectById(document.body.dataset.project || "")?.id || null;
const query = new URL(window.location.href);
let stored: string | null = null;
try {
  stored = localStorage.getItem("seoshiro-portfolio-language-v1");
} catch {
  /* Preference storage is optional. */
}
let locale =
  validLocale(query.searchParams.get("lang")) || validLocale(stored) || "en";
let cleanup: () => void = () => {};
let motionPreference: boolean | undefined;
function enhance() {
  document.documentElement.lang = locale;
  document.title = id
    ? `${projectById(id)!.name} — ${copy[locale].name}`
    : copy[locale].title;
  for (const selector of [
    'meta[name="description"]',
    'meta[property="og:description"]',
  ])
    document
      .querySelector(selector)
      ?.setAttribute(
        "content",
        id ? copy[locale].project[id].summary : copy[locale].description,
      );
  document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute("content", document.title);
  cleanup = startSculpture(locale, motionPreference, (value) => {
    motionPreference = value;
  });
  document.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
    const fail = () => {
      if (img.parentElement?.querySelector(".image-error")) return;
      const note = document.createElement("span");
      note.className = "image-error";
      note.textContent = copy[locale].imageFailed;
      img.hidden = true;
      img.parentElement?.append(note);
    };
    img.addEventListener("error", fail, { once: true });
    if (img.complete && img.naturalWidth === 0) fail();
  });
  document
    .querySelectorAll<HTMLButtonElement>("[data-locale]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        switchLanguage(validLocale(button.dataset.locale || null)!),
      ),
    );
  const links = [
    ...document.querySelectorAll<HTMLElement>(".project-card,.principles li"),
  ];
  if (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    "IntersectionObserver" in window
  ) {
    const obs = new IntersectionObserver(
      (items) => {
        items.forEach((item) => {
          if (item.isIntersecting) {
            item.target.classList.add("seen");
            obs.unobserve(item.target);
          }
        });
      },
      { threshold: 0.04 },
    );
    links.forEach((el) => {
      el.classList.add("reveal");
      obs.observe(el);
    });
    const original = cleanup;
    cleanup = () => {
      original();
      obs.disconnect();
    };
  }
}
function switchLanguage(next: Locale) {
  if (next === locale) return;
  const active = document.activeElement as HTMLElement | null;
  const focusLocale = active?.dataset.locale;
  const y = window.scrollY;
  cleanup();
  locale = next;
  document.getElementById("app")!.innerHTML = renderPage(locale, id);
  const url = new URL(window.location.href);
  if (locale === "en") url.searchParams.delete("lang");
  else url.searchParams.set("lang", locale);
  window.history.replaceState(null, "", url);
  try {
    localStorage.setItem("seoshiro-portfolio-language-v1", locale);
  } catch {
    /* The entire page works without persistence. */
  }
  enhance();
  window.scrollTo({ top: y, behavior: "instant" });
  if (focusLocale)
    document
      .querySelector<HTMLButtonElement>(`[data-locale="${focusLocale}"]`)
      ?.focus({ preventScroll: true });
}
if (locale !== "en")
  document.getElementById("app")!.innerHTML = renderPage(locale, id);
enhance();
window.addEventListener("pagehide", () => cleanup(), { once: true });
