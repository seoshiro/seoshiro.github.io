# seoshiro — project pavilion

A light architectural 3D portfolio for Beibars Ileskhan / seoshiro. Original physical exhibits introduce eight real projects: ORBIT, RESON, LUMEN, PERCH, FORME, SELVEDGE, GuideCheck and ArchiveGuard. EN/RU/KK project copy, screenshots, links and limitations remain available in a conventional HTML catalogue and eight standalone case pages.

Three.js provides the optional on-demand pavilion. Project selection moves the camera and opens a readable native HTML dialog; direct All Projects, About and Contact navigation, keyboard hotspots, touch viewpoints, Escape, browser Back and reload are supported. Reduced motion and Save-Data disable camera animation. JavaScript/WebGL failure retains the complete HTML content. No backend, analytics, audio, external runtime assets, paid actions or hosting migration is included.

## Run and verify

With Node 24 and npm:

```powershell
npm ci --ignore-scripts
npm run lint
npm run typecheck
npm test
npm run build
npm run test:browser
npm run preview
```

The loopback production preview uses http://127.0.0.1:5317. Browser tests use installed Chrome locally and Chromium in CI. The existing pinned GitHub Actions workflow runs the checks before deploying main to https://seoshiro.github.io/.

- `src/content.ts`, `recent.ts`, `orbit.ts`: factual, complete project catalogue and localized copy.
- `src/gallery-copy.ts`: EN/RU/KK gallery navigation copy.
- `src/pavilion.ts`: original scene geometry, procedural textures, raycasts, camera and rendering lifecycle.
- `src/gallery-render.ts`: shared HTML catalogue and dialog content.
- `src/render.ts`, `main.ts`, `style.css`: static routes, optional enhancement and responsive presentation.
- `scripts/capture-gallery.mjs`: responsive screenshots and evidence index.
- `scripts/gallery-performance.mjs`: reproducible local throttled measurements.
- `scripts/bake-environment.mjs`: optional offline studio-light bake (installed Chrome), stored locally with its Three.js MIT license.
- `scripts/verify-links.mjs`: existing demo/source HTTP reachability.
- `docs/GALLERY.md`: provenance, rollout, performance boundaries and verification.

The rollback baseline is `97c7ec3d8ef603a49091cd93e172aea3f23cc861`, preserved as `rollback/pre-light-gallery-2026-10-06`. The redesign was developed in the isolated `feat/light-pavilion-gallery` worktree. Physical phones, Safari and professional native-language review were not performed in this Windows Chromium environment. Parent independent review is required before publication.
