# seoshiro — personal developer portfolio

A local, static portfolio for Beibars Ileskhan / seoshiro. The home page introduces four real projects; separate case-study pages explain inputs, outputs, engineering decisions, and limits. Complete English, Russian, and Kazakh UI and case-study copy is included.

This checkout is isolated from SELVEDGE and the GitHub profile repository. Publication was authorized on 1 October 2026. The new public repository is `seoshiro/seoshiro.github.io`, with GitHub Pages at https://seoshiro.github.io/. No tunnel, analytics, backend, new credentials, broader grants, or paid service was created.

## Local preview

The verified production preview uses **http://127.0.0.1:5317**. From this directory:

```powershell
node scripts/serve.mjs
```

The production build is already in `dist/`. To rebuild with installed dependencies, without requiring a global npm executable:

```powershell
node --experimental-strip-types scripts/generate.ts
node node_modules/typescript/bin/tsc --noEmit
node node_modules/vite/bin/vite.js build --configLoader native
node scripts/harden.mjs
node scripts/verify-artifact.mjs
```

With npm installed, use `npm ci --ignore-scripts`, `npm run build`, and `npm run preview`. Node 24.19.0 was used locally. The native Vite configuration loader avoids esbuild traversing restricted parent directories in the Windows sandbox.

## Checks

```powershell
npm run typecheck
npm run lint
npm test
npm run test:browser
```

Browser tests use installed Google Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`, with isolated contexts and synthetic browser state. The preview server starts automatically if needed. They cover all five routes, every locale, 320/390/768/1440/1920px, 200% zoom and text enlargement, keyboard navigation, axe accessibility checks, unavailable storage and Canvas, failed screenshots, motion lifecycle, internal links, metadata, static HTML, and security boundaries.

`scripts/capture.mjs round-3` and `scripts/capture-cases.mjs` regenerate the visual handoff. Captures wait for visible images to decode and the compositor to settle. `scripts/performance.mjs` records local throttled measurements, not field performance or a Lighthouse certification.

`node scripts/capture-live-mobile.mjs https://seoshiro.github.io/` captures 320/390px EN/RU/KK heroes, galleries, all four case openings, and the long ArchiveGuard case. The output includes an HTML evidence index and a release/overflow/error manifest. An optional third argument chooses a local evidence directory; use the loopback URL to inspect an unpublished production preview.

`node scripts/capture-sculpture.mjs https://seoshiro.github.io/ evidence/sculpture/after` records the mobile sculpture at 320/360/390/414px in every language, two landscape widths, and six animation phases. Its controlled Playwright clock executes each animation frame. `node scripts/sculpture-performance.mjs` separately measures actual drawing callbacks with normal and 4x CPU throttling.

## Source map

- `src/content.ts`: all verified project links and complete EN/RU/KK catalogs.
- `src/render.ts`: static HTML shared by the generator and locale changes.
- `src/main.ts`: language preferences, focus preservation, image-failure states.
- `src/sculpture.ts`: an original parametric ribbon knot projected with Canvas2D.
- `src/style.css`: authored editorial layout, responsive behavior, and motion.
- `scripts/generate.ts`: home and four case pages with useful HTML before JavaScript.
- `scripts/harden.mjs`: production-only static CSP, compatible with hosting without custom headers.
- `scripts/serve.mjs`: loopback-only production preview, restricted to `dist/`.
- `docs/AUDITS.md`: three distinct audits, visual passes, fixes, and evidence.
- `docs/PROVENANCE.md`: real screenshots, repository revisions, font licenses, and transformations.

## Motion and privacy

The sculpture uses no WebGL or 3D library. It paints at up to 30fps and stops offscreen or when the page is hidden. Desktop and Save-Data cap pixel ratio at 1.5; other mobile contexts cap it at 2, within a 576 x 432 pixel buffer (under 1 MiB). The centered mobile stage uses a bounded camera so the ribbon stays open throughout its animation. Mobile, reduced motion, and Save-Data start with a static frame. The visitor can play or pause it; the choice survives language changes, reloads, and case-study navigation. System reduced motion takes precedence over a saved play choice on entry. Missing Canvas hides only the decoration and its control. All content is available without animation; useful English content also works without JavaScript.

A language code and an optional explicit motion choice are persisted under `seoshiro-portfolio-language-v1` and `seoshiro-portfolio-motion-v1`. If persistent motion storage is denied, tab storage is tried; if both are denied, the controls still work on the current page. No contact email, private details, employment claims, testimonials, fabricated impact metrics, or client relationships are included. External project links open on explicit navigation. Assets and fonts load locally.

## Release boundary

Local preview is ready for the parent's independent visual QA. The parent relayed explicit authorization for a new public repository and free publication. The GitHub Actions workflow verifies the exact source before deploying. No public tunnel is used. The static build uses relative asset paths and passes a subdirectory link-resolution check. Canonical URLs, a sitemap, and exact-commit build metadata use the verified https://seoshiro.github.io/ destination.

Physical mobile devices, Safari, screen-reader user studies, and professional native-language review were not performed in this Windows Chromium environment. Parent live visual passes remain separate from the three local passes recorded here.
