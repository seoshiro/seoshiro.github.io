# seoshiro / Beibars Ileskhan

The main portfolio is [seoshiro.github.io](https://seoshiro.github.io/). Application sources live separately in [portfolio-constellation](https://github.com/seoshiro/portfolio-constellation).

## Pinned release — 2026-10-11

Source: **0ee178b95b28f400e99a55b10a9c3b5a3e49ac69**.
[Source verification CI](https://github.com/seoshiro/portfolio-constellation/actions/runs/38155416179).
[Root verification and Pages deployment](https://github.com/seoshiro/seoshiro.github.io/actions/workflows/publish.yml).
[Live release manifest](https://seoshiro.github.io/version.json).

The single publish.yml checks out that exact source SHA, verifies it, builds and publishes its static dist through this repository's existing Pages environment. ref and PORTFOLIO_COMMIT must match. The historical root files remain for recovery; the active workflow builds the pinned new repository. Separate Pages projects and their repositories are unchanged.

This release fixes a visible first-entry handoff flicker: the scene entrance begins with the final overlay fade and does not restart already visible stars/lines at 3500ms. A consistent scrollbar gutter prevents width and typography changes when scrolling unlocks. The 3500ms duration, skip/Escape, Manrope/Onest, all truthful project content and assets, five preceding light/camera/preview/meteor/Sun refinements, reduced motion and static HTML are preserved. The first meteor still starts 2300–2800ms after the entry opens.

Eleven unit tests, forty-seven production browser scenarios, build/artifact checks, actual private before/after pixels/video and an independent audit passed before pinning. Six added regressions check continuous visible opacity and real scene/name geometry with timed/skipped desktop/mobile entry, classic scrollbars, warm cache and repeat entry. QA media remains private outside public assets. Chrome touch emulation does not claim physical-phone or Safari verification.

## Update and restore

Complete source lint/typecheck/tests/build/artifact checks, browser QA, actual pixel inspection and independent audit. Push the source and verify its exact revision CI. Then update both 40-character SHA fields and this record in one normal root commit. Confirm root CI and live version.json.

The exact old baseline **a06ece34d9a084d529cfa406f22b0436a746ae98** is preserved at [archive/pre-constellation-2026-10-10](https://github.com/seoshiro/seoshiro.github.io/tree/archive/pre-constellation-2026-10-10). A verified local Git bundle preserves its history.

For rollback of this handoff fix, pin preceding source **c4f78ab8873e6eef70865c9406807a32661c86f9**, published by root **709e60ecffd23891f3f6883c3839e383557d4031**, through a normal commit and repeat verification. The earlier source **2e3a91fbfc818e1f21646c532819d769b9135543** / root **012be44db02e8a8aad9ad61b096c131179303adc** retains the previous camera/lighting version. For full pavilion restoration, inspect subsequent changes and normally revert the original root rollout **8b84f2a53b69d5e2ac3d9204cd87b184c26915c4**; verify the restored publisher and live root. Never force push or delete separate Pages projects.

See [handoff fix](https://github.com/seoshiro/portfolio-constellation/blob/main/docs/HANDOFF.md), [motion/typography](https://github.com/seoshiro/portfolio-constellation/blob/main/docs/MOTION.md), [QA](https://github.com/seoshiro/portfolio-constellation/blob/main/docs/QA.md), [assets](https://github.com/seoshiro/portfolio-constellation/blob/main/docs/ASSETS.md) and [publishing/rollback](https://github.com/seoshiro/portfolio-constellation/blob/main/docs/PUBLISHING.md).
