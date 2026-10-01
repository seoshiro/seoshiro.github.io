/* global scrollY, HTMLButtonElement */
import { test, expect, chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { copy, locales, projects } from "../src/content.ts";
const routes = ["/", ...projects.map((p) => `/projects/${p.id}.html`)];
const liveBase = process.env.LIVE_URL || "http://127.0.0.1:5317";
for (const locale of locales) {
  test(`All ${locale} routes expose complete content, safe links and zero accessibility violations`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const route of routes) {
      await page.goto(`${route}?lang=${locale}`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("h1")).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      const scan = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(scan.violations, JSON.stringify(scan.violations)).toEqual([]);
      expect(
        await page
          .locator('a[target="_blank"]:not([rel="noopener noreferrer"])')
          .count(),
      ).toBe(0);
    }
    expect(errors).toEqual([]);
  });
  test(`${locale} selection persists through case navigation and back to gallery`, async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator(`[data-locale="${locale}"]`).click();
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator(`[data-locale="${locale}"]`)).toBeFocused();
    await page.locator(".project-forme .project-visual").click();
    await expect(page.locator("h1")).toContainText("FORME");
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await page.locator(".back-link").click();
    await expect(page.locator("#work")).toBeInViewport();
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
  });
}
test("All case studies navigate next, back and browser history without losing route context", async ({
  page,
}) => {
  await page.goto("/");
  for (const p of projects) {
    await page.goto(`/projects/${p.id}.html`);
    await expect(page.locator("h1")).toContainText(p.name);
    await page.locator(".next-project").click();
    await expect(page).not.toHaveURL(new RegExp(`${p.id}\\.html$`));
    await page.goBack();
    await expect(page.locator("h1")).toContainText(p.name);
    await page.locator(".back-link").click();
    await expect(page.locator("#work")).toBeInViewport();
  }
});
test("Keyboard skip link and language changes retain visible focus", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  await page.locator('[data-locale="ru"]').focus();
  await page.keyboard.press("Enter");
  await expect(page.locator('[data-locale="ru"]')).toBeFocused();
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await page.keyboard.press("Tab");
  await expect(page.locator('[data-locale="kk"]')).toBeFocused();
});
test("Static pages remain complete with JavaScript disabled", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(new URL(route, liveBase).href);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("main")).toContainText(
      route === "/" ? "Selected work" : "Practical boundaries",
    );
    await expect(page.locator(".languages")).toBeHidden();
  }
  await context.close();
});
test("Language works when preference storage is denied", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage denied");
      },
    });
  });
  await page.goto("/");
  await page.locator('[data-locale="kk"]').click();
  await expect(page.locator("html")).toHaveAttribute("lang", "kk");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "kk");
  await expect(page.locator(".project-card")).toHaveCount(4);
});
test("Unsupported and hostile locale values fall back to English", async ({
  page,
}) => {
  await page.goto("/?lang=%3Cscript%3E");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1")).toContainText(copy.en.name);
});
test("Missing Canvas keeps core content and hides the unavailable control", async ({
  page,
}) => {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => null;
  });
  await page.goto("/");
  await expect(page.locator(".sculpture")).toBeHidden();
  await expect(page.locator("#motion-toggle")).toBeHidden();
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page.locator(".project-forme .project-visual").click();
  await expect(page.locator("h1")).toContainText("FORME");
});
test("Reduced motion starts still and allows explicit play and pause", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const button = page.locator("#motion-toggle");
  await expect(button).toHaveAttribute("aria-pressed", "true");
  const before = await page
    .locator("canvas")
    .evaluate((c) => (c as HTMLCanvasElement).toDataURL());
  await page.waitForTimeout(150);
  expect(
    await page
      .locator("canvas")
      .evaluate((c) => (c as HTMLCanvasElement).toDataURL()),
  ).toBe(before);
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "false");
  await page.waitForTimeout(150);
  expect(
    await page
      .locator("canvas")
      .evaluate((c) => (c as HTMLCanvasElement).toDataURL()),
  ).not.toBe(before);
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "true");
});
test("Offscreen sculpture stops drawing and resumes when visible", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#motion-toggle")).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await page.locator("#about").scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  const first = await page
    .locator("canvas")
    .evaluate((c) => (c as HTMLCanvasElement).toDataURL());
  await page.waitForTimeout(200);
  expect(
    await page
      .locator("canvas")
      .evaluate((c) => (c as HTMLCanvasElement).toDataURL()),
  ).toBe(first);
  await page.locator(".hero").scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  expect(
    await page
      .locator("canvas")
      .evaluate((c) => (c as HTMLCanvasElement).toDataURL()),
  ).not.toBe(first);
});
test("Mobile defaults to a static sculpture with accessible motion controls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("#motion-toggle")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  const button = await page.locator(".hero .pill-link").boundingBox();
  expect(button!.height).toBeGreaterThanOrEqual(44);
});
test("Network-disabled assets produce a readable failure state", async ({
  page,
}) => {
  await page.route("**/assets/*-preview.webp", (route) => route.abort());
  await page.goto("/");
  await page.locator("#work").scrollIntoViewIfNeeded();
  await expect(page.locator(".project-forme .image-error")).toBeVisible();
  await expect(page.locator(".project-forme .project-visual")).toHaveAttribute(
    "href",
    "projects/forme.html",
  );
  await expect(page.locator(".project-forme .project-links a")).toHaveCount(2);
});
test("Each local asset loads and has stable intrinsic dimensions", async ({
  page,
}) => {
  await page.goto("/");
  for (const card of await page.locator(".project-card").all()) {
    await card.scrollIntoViewIfNeeded();
    await expect(card.locator("img")).toBeVisible();
    await expect
      .poll(() =>
        card
          .locator("img")
          .evaluate((img) => (img as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
  }
  for (const route of routes.slice(1)) {
    await page.goto(route);
    await expect
      .poll(() =>
        page
          .locator(".case-cover img")
          .evaluate((img) => (img as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
    await page.locator(".case-details").scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page
          .locator(".detail-image img")
          .evaluate((img) => (img as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
    const dims = await page.locator(".case-cover img").evaluate((img) => ({
      width: img.getAttribute("width"),
      height: img.getAttribute("height"),
      actualWidth: (img as HTMLImageElement).naturalWidth,
      actualHeight: (img as HTMLImageElement).naturalHeight,
    }));
    expect(Number(dims.width)).toBe(dims.actualWidth);
    expect(Number(dims.height)).toBe(dims.actualHeight);
  }
});
for (const width of [320, 390, 768, 1440, 1920]) {
  test(`Home and all case pages stay within ${width}px in all languages`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const locale of locales) {
      for (const route of routes) {
        await page.goto(`${route}?lang=${locale}`);
        await page.evaluate(() => document.fonts.ready);
        const overflow = await page.evaluate(() => ({
          width: document.documentElement.clientWidth,
          scroll: document.documentElement.scrollWidth,
        }));
        expect(overflow.scroll, `${route} ${locale}`).toBeLessThanOrEqual(
          overflow.width + 1,
        );
        for (const locator of ["h1", "h2", ".header nav", ".languages"]) {
          const elements = await page.locator(locator).all();
          for (const el of elements) {
            const box = await el.boundingBox();
            expect(
              box!.x + box!.width,
              `${route} ${locale} ${locator}`,
            ).toBeLessThanOrEqual(width + 1);
          }
        }
      }
    }
  });
}
test("200 percent zoom and enlarged text retain readable content and navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 1000 });
  for (const locale of locales) {
    for (const route of ["/", "/projects/archiveguard.html"]) {
      await page.goto(`${route}?lang=${locale}`);
      await page.evaluate(() => {
        document.body.style.zoom = "2";
      });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(1281);
      await expect(page.locator(".header nav")).toBeVisible();
      await page.evaluate(() => {
        document.body.style.zoom = "";
        document.documentElement.style.fontSize = "200%";
      });
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 1,
      );
      expect(overflow, `${route} ${locale} text size`).toBe(false);
    }
  }
});
test("Repeated language changes preserve the gallery location and cleanup observers", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page.locator("#work").scrollIntoViewIfNeeded();
  const y = await page.evaluate(() => scrollY);
  for (let i = 0; i < 9; i++) {
    await page
      .locator(`[data-locale="${locales[i % 3]}"]`)
      .evaluate((el) => (el as HTMLButtonElement).click());
  }
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(y * 0.7);
  expect(errors).toEqual([]);
});
test("Runtime makes no third-party requests, even after navigating every project", async ({
  page,
}) => {
  const external: string[] = [];
  page.on("request", (req) => {
    if (!req.url().startsWith(new URL(liveBase).origin))
      external.push(req.url());
  });
  for (const route of routes) {
    await page.goto(route);
    await page.locator("footer").scrollIntoViewIfNeeded();
  }
  expect(external).toEqual([]);
});
test("A paused sculpture stays paused across locale changes", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#motion-toggle").click();
  await expect(page.locator("#motion-toggle")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.locator('[data-locale="ru"]').click();
  await expect(page.locator("#motion-toggle")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.locator("#motion-toggle")).toContainText(copy.ru.motionOn);
});
test("An OS reduced-motion change immediately stops automatic drawing", async ({
  page,
}) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("#motion-toggle")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  const still = await page
    .locator("canvas")
    .evaluate((c) => (c as HTMLCanvasElement).toDataURL());
  await page.waitForTimeout(150);
  expect(
    await page
      .locator("canvas")
      .evaluate((c) => (c as HTMLCanvasElement).toDataURL()),
  ).toBe(still);
});
test("Production server denies source exposure and malformed paths and sends restrictive security headers", async ({
  request,
}) => {
  test.skip(
    !!process.env.LIVE_URL,
    "Preview-server response headers are tested locally; static production CSP is tested through its HTML.",
  );
  const home = await request.get("/");
  expect(home.status()).toBe(200);
  expect(home.headers()["content-security-policy"]).toContain(
    "connect-src 'none'",
  );
  expect(home.headers()["x-content-type-options"]).toBe("nosniff");
  for (const route of [
    "/src/main.ts",
    "/package.json",
    "/.git/config",
    "/%ZZ",
  ]) {
    expect((await request.get(route)).status()).toBe(404);
  }
});
test("First useful content arrives before the runtime script", async ({
  page,
}) => {
  await page.route("**/assets/main-*.js", (route) => route.abort());
  await page.goto("/");
  await expect(page.locator("h1")).toContainText(copy.en.name);
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page.locator(".project-forme .project-visual").click();
  await expect(page.locator("h1")).toContainText("FORME");
  await expect(page.locator("main")).toContainText(copy.en.project.forme.limit);
});

test("Manual pause persists after reload and a case-study round trip", async ({
  page,
}) => {
  await page.goto("/?lang=kk");
  await page.locator("#motion-toggle").click();
  await expect(page.locator("#motion-toggle")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.reload();
  await expect(page.locator("#motion-toggle")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.locator(".project-forme .project-visual").click();
  await page.locator(".back-link").click();
  await expect(page.locator("#motion-toggle")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.locator("#motion-toggle")).toContainText(copy.kk.motionOn);
});
test("Saved play cannot override system reduced motion", async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem("seoshiro-portfolio-motion-v1", "playing"),
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#motion-toggle")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});
test("Motion preference uses tab storage when persistent storage is denied", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Denied");
      },
    }),
  );
  await page.goto("/");
  await page.locator("#motion-toggle").click();
  await page.reload();
  await expect(page.locator("#motion-toggle")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});
test("Denied preference stores preserve usable in-page motion controls", async ({
  page,
}) => {
  await page.addInitScript(() => {
    for (const key of ["localStorage", "sessionStorage"])
      Object.defineProperty(window, key, {
        get() {
          throw new Error("Denied");
        },
      });
  });
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page.locator("#motion-toggle").click();
  await page.locator('[data-locale="ru"]').click();
  await expect(page.locator("#motion-toggle")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.locator("#motion-toggle").click();
  await expect(page.locator("#motion-toggle")).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  expect(errors).toEqual([]);
});
test("Direct and reloaded localized section links settle on their actual content", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const locale of locales)
    for (const anchor of ["work", "about", "contact"]) {
      await page.goto(`/?lang=${locale}#${anchor}`);
      await page.evaluate(() => document.fonts.ready);
      const target =
        anchor === "work" ? ".project-forme .project-visual" : `#${anchor} h2`;
      await expect(page.locator(target)).toBeInViewport({ timeout: 3000 });
      await page.reload();
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator(target)).toBeInViewport({ timeout: 3000 });
    }
});
test("Entrance motion keeps hero text and promptly exposed cards at full opacity", async ({
  page,
}) => {
  await page.goto("/");
  const heroOpacity = await page
    .locator(".hero-name, .hero-phrase, .hero-text > .pill-link")
    .evaluateAll((elements) =>
      elements.map((element) => {
        for (const animation of element.getAnimations()) {
          animation.pause();
          animation.currentTime = 0;
        }
        return getComputedStyle(element).opacity;
      }),
    );
  expect(heroOpacity).toEqual(["1", "1", "1"]);
  await page.locator('.header nav a[href="#work"]').click();
  await expect(page.locator(".project-forme .project-visual")).toBeInViewport({
    timeout: 2000,
  });
  const states = await page.locator(".project-card").evaluateAll((cards) =>
    cards.map((card) => ({
      opacity: getComputedStyle(card).opacity,
      animation: getComputedStyle(card).animationName,
    })),
  );
  expect(states.every((s) => s.opacity === "1" && s.animation === "none")).toBe(
    true,
  );
  await page.locator(".principles").scrollIntoViewIfNeeded();
  const principleOpacity = await page
    .locator(".principles li")
    .evaluateAll((elements) =>
      elements.map((element) => {
        for (const animation of element.getAnimations()) {
          animation.pause();
          animation.currentTime = 0;
        }
        return getComputedStyle(element).opacity;
      }),
    );
  expect(principleOpacity.every((opacity) => opacity === "1")).toBe(true);
});

test("Real cached browser Back keeps motion and language controls usable", async ({
  baseURL,
}, testInfo) => {
  const browser = await chromium.launch({
    ...testInfo.project.use.launchOptions,
    // Full Chromium supports page-history caching; the CI headless shell does not.
    channel: "chromium",
    // Playwright disables this browser feature by default.
    ignoreDefaultArgs: ["--disable-back-forward-cache"],
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    await page.addInitScript(() => {
      window.addEventListener("pageshow", (event) => {
        document.documentElement.dataset.historyCache = String(event.persisted);
      });
    });
    await page.goto(baseURL || liveBase);
    await page.locator("#motion-toggle").click();
    await page.locator(".project-forme .project-visual").click();
    await page.goBack({ waitUntil: "commit" });
    await expect(page.locator("html")).toHaveAttribute(
      "data-history-cache",
      "true",
    );
    await expect(page.locator("#motion-toggle")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await page.locator("#motion-toggle").click();
    await expect(page.locator("#motion-toggle")).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    await page.locator('[data-locale="ru"]').click();
    await expect(page.locator("html")).toHaveAttribute("lang", "ru");
    await page.locator(".project-forme .project-visual").click();
    await page.goBack({ waitUntil: "commit" });
    await expect(page.locator("html")).toHaveAttribute(
      "data-history-cache",
      "true",
    );
    await page.locator("#motion-toggle").click();
    await expect(page.locator("#motion-toggle")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  } finally {
    await browser.close();
  }
});
