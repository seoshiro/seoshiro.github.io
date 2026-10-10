# seoshiro / Beibars Ileskhan

The main portfolio is [seoshiro.github.io](https://seoshiro.github.io/). Its original constellation application sources live separately in [portfolio-constellation](https://github.com/seoshiro/portfolio-constellation).

## Pinned release — 2026-10-10

Source: **e38ac2d03015b104dd09219158bd3bbda0928bdc**.
[Source verification CI](https://github.com/seoshiro/portfolio-constellation/actions/runs/38079448755).
[Root verification and Pages deployment](https://github.com/seoshiro/seoshiro.github.io/actions/workflows/publish.yml).
[Live release manifest](https://seoshiro.github.io/version.json).

The single publish.yml checks out that exact source SHA, verifies it, builds and publishes its static dist through this repository's existing Pages environment. ref and PORTFOLIO_COMMIT must match. There is no automatic main-branch source checkout and no separate old pavilion publisher.

The root's historical application files remain for history/recovery; the active workflow builds the pinned new repository. Standalone Pages projects and their repositories are unchanged.

This refinement adds a fitted 1080ms camera, separate depth planes, sparse pointed meteors and local Manrope 525 / Onest 2.000 typography with verified Kazakh letters. Twenty-four Chrome scenarios, ten unit tests, actual private screenshots/video and independent audit passed before publishing. New QA media is kept locally, outside public assets.

## Update and restore

For a new release: complete source lint/typecheck/tests/build/artifact checks, browser QA, actual visual review and independent audit, push and verify its CI. Then update both 40-character SHA fields and this record in one normal root commit. Confirm root CI and live version.json.

The exact old baseline **a06ece34d9a084d529cfa406f22b0436a746ae98** is preserved at [archive/pre-constellation-2026-10-10](https://github.com/seoshiro/seoshiro.github.io/tree/archive/pre-constellation-2026-10-10). A verified complete local Git bundle additionally preserves its history.

For a broken new release, the preceding verified constellation source is **8a1016e045565916b8ca9b7aa2fb66512483c39a**; pin it via a normal commit and repeat verification. For full pavilion restoration, inspect subsequent changes and normally revert the original root rollout commit **8b84f2a53b69d5e2ac3d9204cd87b184c26915c4**; its previous publisher will be restored. Verify its build/deploy and live root. Never force push or delete separate Pages projects.

Detailed [QA](https://github.com/seoshiro/portfolio-constellation/blob/main/docs/QA.md), [asset attribution](https://github.com/seoshiro/portfolio-constellation/blob/main/docs/ASSETS.md) and [publishing/rollback](https://github.com/seoshiro/portfolio-constellation/blob/main/docs/PUBLISHING.md) are in the source repository.
