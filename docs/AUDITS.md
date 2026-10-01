# Three audits and three local visual passes

All work below was performed in the isolated local portfolio checkout on 1 October 2026. No publishing, remote creation/push, external messages, paid service, or credential action was performed during those local audit rounds. Publication was subsequently explicitly authorized. Parent independent live visual QA is a separate remaining step.

## Audit 1 — architecture, content, privacy, and security

Reviewed public source evidence for all four projects; traced every summary, output, decision, and limitation to the actual repository. Reviewed the static route design, import boundaries, external links, asset licenses, local storage, and server filesystem boundary.

Findings and fixes:

- Tall repository screenshots would be unreadable if reduced wholesale into gallery stages. Kept full screenshots for case studies and added documented crops for the two utility-project previews.
- Hardcoded generic image dimensions did not match actual files. Replaced them with verified main/preview/detail dimensions to preserve intrinsic layout.
- Vite's default bundled config loader attempted to scan a sandbox-restricted parent directory. Switched to the native loader without broad filesystem permissions.
- Static HTML now contains the full English gallery and case content before JavaScript. The runtime only enhances locale, motion, and failure handling.
- Reviewed copy for fabricated achievements and authorship implications. Project context explicitly describes independent portfolio work and fictional demo data. GuideCheck review statements and ArchiveGuard's narrow JPEG scope remain explicit.
- Restrictive preview headers, loopback binding, `dist/` filesystem isolation, safe external-link relations, no remote runtime requests, and optional language-only storage were implemented.

Verification: content/escaping/locale/link tests; actual production compile; source provenance and licenses; later browser security tests confirm malformed paths and source files are not served. All 13 external destinations returned HTTP 200; `evidence/links.json` records the result.

## Live visual pass 1 — composition and initial mobile

Real Chrome pages captured at 1440 × 1000, 390 × 844, Kazakh 390 × 844, and Russian 768 × 1024. Inspected hero and project-gallery screenshots from `evidence/round-1/`.

Findings and fixes: the sculpture crossed desktop introductory copy and mobile actions; reduced its footprint, adjusted mobile positioning, and kept readable text in its own surface. Ribbon segment joins were visually noisy; introduced a small segment overlap. Tall utility images received the documented crops described above. These fixes were rechecked in round 2.

## Audit 2 — interaction, accessibility, internationalization

Reviewed keyboard traversal, focus after language changes, language URL/persistence behavior, browser history, all five static routes in three languages, reduced motion, Canvas failure, unavailable storage, image failure, and 200% enlargement. Automated axe WCAG A/AA scans were run against every route in every locale, supplemented with explicit keyboard and fallback checks.

Findings and fixes:

- Contact-panel eyebrow/body text missed the 4.5:1 contrast threshold. Darkened them; removed the unnecessary low-contrast watermark.
- Author CSS overrode native `[hidden]` on a motion control and failed image. Added an explicit semantic hidden rule.
- Kazakh principle text expanded a grid's minimum content width at 200% CSS zoom. Allowed grid children to shrink and wrap; fixed both page and text enlargement.
- Some secondary mobile labels were below 12px. Raised metadata to a consistent 12px minimum.
- A scroll-preservation regression test inadvertently scrolled to the header before clicking. Corrected its trigger to test the locale handler at the intended gallery position; keyboard focus remains separately tested with real keypresses.

Verification: all failing accessibility/fallback/zoom checks passed after corrections. 15 route/locale axe scans returned no violations. 75 route/locale/viewport observations showed no horizontal overflow at 320/390/768/1440/1920px; 200% zoom and text enlargement also passed. These are automated/emulated results, not physical-device or screen-reader certification.

## Live visual pass 2 — fixed composition, multilingual layouts, zoom

Inspected fresh actual browser captures in `evidence/round-2/`, including desktop and mobile heroes, gallery, Kazakh wrapping, and the reproduced zoom layout. Confirmed the sculpture no longer crosses copy/actions, and the useful screenshots remain available without hover. Contact contrast and enlargement fixes were then carried into round 3.

## Audit 3 — performance, responsive release, and robustness

Measured the production page with a cold browser context, 4× CPU slowdown, 120ms latency, and 200,000 bytes/s download throughput. Checked local asset/reference resolution under a simulated `/portfolio/` hosting prefix; final build metadata; static HTML with the runtime blocked; motion lifecycle; and source/secret exposure boundaries.

Findings and fixes:

- Pausing the sculpture was lost on a language change. Preserve the explicit motion preference during re-render, with a regression test. An OS reduced-motion change also stops drawing immediately.
- A full-height mobile GuideCheck screenshot became too small to communicate the review interface. Used a documented crop of the actual form, in a restrained portrait stage.
- Production security depended on the custom preview server's headers. Added production-only CSP metadata to all five pages so static hosts also restrict scripts, fonts, images, and connections. Frame protection remains a preview-server response header; static hosts have their own framing behavior.
- Immediate post-scroll evidence occasionally captured lazy images before decoding or a compositor frame before painting. Capture tooling now waits for visible image decode and a settled frame; full-page evidence forces local images to load. This was an evidence-timing issue, not an invented product screenshot.
- Simplified the opening copy to name the actual kind of work. Removed decorative arrows and kept original editorial motion brief, with an immediate press response and reduced-motion overrides.

Performance evidence: `evidence/performance/metrics.json`. Initial controlled observations: mobile LCP ~820ms / CLS 0.0077; desktop LCP ~836ms / CLS 0.0049. Compressed runtime ~15.6KB; CSS ~4.6KB. These local samples do not predict every real network/device. Canvas caps DPR at 1.5 and painting at 30fps; it stops offscreen and when hidden. Mobile, reduced-motion, and Save-Data begin still.

Verification: TypeScript, lint, six meaningful content tests, full browser regression suite, production artifact checks, and dependency audit. Final machine-readable browser results are in `evidence/browser-final.json`; the final artifact resolution results are in `evidence/artifact.json`.

## Live visual pass 3 — complete production pages and handoff

Fresh Chrome inspection of the final gallery, about/contact panels, all four case-study openings and detail sections, phone/tablet/desktop layouts, and the GuideCheck portrait treatment. Screenshot evidence is in `evidence/round-3/`; captures use real project data from the source repositories.

The preview is ready for the parent to assess the visual direction and request refinements. Parent cloud browsing cannot reach this local loopback. Screenshot review is available now; the parent subsequently authorized publication to GitHub Pages, enabling separate live review passes. No public tunnel was created.

## Parent live review follow-up

The parent reviewed the published site and returned specific interaction defects. This follow-up retains the established composition and identity strings.

- A manual pause did not survive reload or leaving a case study. Added optional persistent motion storage, tab-storage fallback, and safe in-page behavior when both stores are denied. System reduced motion still takes precedence over saved play on entry.
- A separate real Chrome Back/Forward Cache probe restored the home page with motion listeners already removed. Preserve live listeners when the browser freezes a cached page; visibility still suspends drawing. Actual cached Back navigation now has a dedicated regression, including repeated return and language changes.
- A direct or reloaded Kazakh Contact fragment could settle above the actual contact panel after localized text and fonts changed the initial HTML layout. Supported initial fragments now align once localization and fonts settle, without overriding intervening wheel, touch, or keyboard input.
- A briefly blank gallery was observed during live Work navigation. Project cards no longer receive entrance reveal animation. Their content remains at full opacity; the sculpture, hover details, and restrained principle animation remain.
- Shortened repetitive role copy in all three languages. Each case identifies independent portfolio work and points to its source implementation and verification. Concrete demo-data and technical limitations remain.
- Rechecked all four documentation destinations, including FORME's `docs/ENGINEERING.md`; both GitHub pages and raw files returned HTTP 200 with the expected document titles. Evidence: `evidence/documentation-links.json`.

Verification: seven added browser regressions cover reload and case-return pause, OS reduced motion, both storage denial modes, all nine locale/section fragment combinations on direct load and reload, prompt fully opaque Work cards, and actual cached browser-history restoration. The complete local suite contains 36 browser scenarios (`evidence/browser-parent-fixes.json`); all six content tests, lint, type checking, and the production build are checked again for this release. Fresh live 320/390px EN/RU/KK captures are generated by `scripts/capture-live-mobile.mjs`, with release metadata and overflow/error observations in their manifest. Parent visual acceptance remains separate.
