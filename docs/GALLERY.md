# Project pavilion — October 2026

The user chose a light immersive gallery and approved publication to the existing GitHub Pages destination. The rollback source is `97c7ec3d8ef603a49091cd93e172aea3f23cc861`, preserved as `rollback/pre-light-gallery-2026-10-06`. Work was isolated in `feat/light-pavilion-gallery` and the `portfolio-gallery` worktree.

## Original scene and evidence

All pavilion geometry and procedural material patterns are authored in `src/pavilion.ts`: open window bay, plaster, stone floor joints, timber ceiling beams and wall ribs; LUMEN lens barrel/ridges/glass/aperture; RESON timber cabinet/grille/driver/dial; furnished PERCH miniature; ORBIT satellite/solar arrays; and the name plaque. The four application frames use existing actual project screenshots. No friend's meshes, textures, room assets, or video frames are included. The reference video was summarized by the parent; its pixels were not available to this worker and were not claimed as seen.

The existing eight project entries and all EN/RU/KK project facts, screenshots, links, practical limitations and contact identity remain sourced from the original `content.ts`, `recent.ts`, and `orbit.ts`. No employment, hobbies, clients, metrics or email address was added. AYQYN and LUMEN repositories were not changed by this worker.

## Interaction and fallback

An optional short entrance and three curated viewpoints lead into the exhibition. Physical meshes are raycast click targets, with equivalent keyboard/touch HTML links. On phones, the tool-wall labels appear in the Browser Tools viewpoint to avoid clutter; the project rail and All Projects navigation expose every project directly. Selecting an exhibit moves the camera, then opens a native HTML dialog. Escape, Close, browser Back and reload preserve meaningful hashes. Direct case URLs are retained for ordinary navigation and SEO. Modal content shares the factual catalogue source and includes demo, source, full case and verification links.

All eight standalone static case pages and the home catalogue remain useful with JavaScript disabled. With unavailable WebGL or a lost context, the full HTML remains available. The gallery requires no audio, third-party requests, backend, analytics or new account settings. Existing local fonts and licenses remain intact. The production CSP remains restrictive.

## Performance and verification

The renderer repaints on camera transitions, resize and texture completion, then stops. Intersection/visibility observers pause hidden scenes. System reduced motion and Save-Data bypass camera animation. Pixel ratio is capped at 1.5 (1 on Save-Data), with a 1.7-million-pixel buffer budget. Static geometry is merged by material within each exhibit, preserving click ownership. The main scene is approximately 94k triangles and 148 draw calls on desktop, approximately 91k/144 in the mobile view. No heavy postprocessing, downloaded 3D models or continuous idle loop is used.

`scripts/gallery-performance.mjs` records local synthetic Chromium measurements at 150ms latency and 1.6Mbps download with normal and 4x CPU throttling. The cold local HTTP preview transfers uncompressed JS and is not field performance. Initial measurements: about 8.1s / 7.6s to first scene, zero additional idle frames, and approximately 1.19MB of initial resources. Read the actual JSON for paint times and long tasks. No universal FPS or physical-device performance is claimed.

Browser tests cover actual exhibit/viewpoint clicks, all case routes in three locales, native dialog focus/keyboard/Escape, Back/reload/deep links, 320/390/768/1440/1920px, enlarged text, JavaScript/WebGL fallback, denied storage, failed screenshot feedback, no third-party requests, static security boundary and axe checks. `scripts/capture-gallery.mjs` writes reproducible visual evidence; screenshots must be inspected, not merely generated.

Physical mobile devices, Safari, assistive-technology user studies, and professional native-language review remain outside this Windows Chromium verification. Independent parent review is required before publication. Deployment continues through the original pinned GitHub Actions workflow; final source and `version.json` revisions must match the deployed Pages artifact.
