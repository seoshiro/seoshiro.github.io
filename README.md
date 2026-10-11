# seoshiro / Beibars Ileskhan

The main portfolio is [seoshiro.github.io](https://seoshiro.github.io/). Its original constellation application sources live separately in [portfolio-constellation](https://github.com/seoshiro/portfolio-constellation).

## Pinned release — 2026-10-11

Source: **c4f78ab8873e6eef70865c9406807a32661c86f9**.
[Source verification CI](https://github.com/seoshiro/portfolio-constellation/actions/runs/38137574845).
[Root verification and Pages deployment](https://github.com/seoshiro/seoshiro.github.io/actions/workflows/publish.yml).
[Live release manifest](https://seoshiro.github.io/version.json).

The single publish.yml checks out that exact source SHA, verifies it, builds and publishes its static dist through this repository's existing Pages environment. ref and PORTFOLIO_COMMIT must match. The historical root application files remain for recovery; the active workflow builds the pinned new repository. Separate Pages projects and their repositories are unchanged.

This release softens constellation light and removes sharp cross spikes, uses a fitted 1280ms camera flight with distinct star-depth planes and gradually fading background groups, enlarges the real clickable preview, adds brighter tapered meteors and quiets the Sun. Local Manrope 525 / Onest 2.000 fonts and the requested 3500ms once-per-tab introduction are preserved. Reduced motion, pause, hidden-tab cleanup, static HTML, RU/EN/KK URLs and keyboard focus remain supported.

Eleven unit tests, forty-one production Chrome scenarios, build/artifact checks, actual private before/after images/video and an independent audit passed before pinning this release. QA media is kept locally outside public assets. Browser touch emulation does not claim physical-phone or Safari verification.

## Update and restore

Complete source lint/typecheck/tests/build/artifact checks, browser QA, actual pixel inspection and independent audit. Push the source and verify its exact revision CI. Then update both 40-character SHA fields and this record in one normal root commit. Confirm root CI and live version.json.

The exact old baseline **a06ece34d9a084d529cfa406f22b0436a746ae98** is preserved at [archive/pre-constellation-2026-10-10](https://github.com/seoshiro/seoshiro.github.io/tree/archive/pre-constellation-2026-10-10). A verified local Git bundle also preserves its history.

For rollback, the preceding verified constellation source is **2e3a91fbfc818e1f21646c532819d769b9135543**, published by root **012be44db02e8a8aad9ad61b096c131179303adc**. Pin that source through a normal commit and repeat verification. For full pavilion restoration, inspect subsequent changes and normally revert the original root rollout commit **8b84f2a53b69d5e2ac3d9204cd87b184c26915c4**; verify its restored publisher and live root. Never force push or delete separate Pages projects.

See [motion and typography](https://github.com/seoshiro/portfolio-constellation/blob/main/docs/MOTION.md), [QA](https://github.com/seoshiro/portfolio-constellation/blob/main/docs/QA.md), [assets](https://github.com/seoshiro/portfolio-constellation/blob/main/docs/ASSETS.md) and [publishing/rollback](https://github.com/seoshiro/portfolio-constellation/blob/main/docs/PUBLISHING.md).
