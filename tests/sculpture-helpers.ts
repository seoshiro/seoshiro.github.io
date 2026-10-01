import type { Page } from "@playwright/test";

export async function sculptureFrameChange(page: Page, reset = false) {
  return page.locator("#sculpture").evaluate((node, reset) => {
    const canvas = node as HTMLCanvasElement & {
      __qaBaseline?: Uint8ClampedArray;
    };
    const pixels = canvas
      .getContext("2d")!
      .getImageData(0, 0, canvas.width, canvas.height).data;
    if (reset || !canvas.__qaBaseline) {
      canvas.__qaBaseline = pixels;
      return 0;
    }
    let changed = 0;
    const baseline = canvas.__qaBaseline;
    for (let i = 0; i < pixels.length; i += 4) {
      const difference =
        Math.abs(pixels[i] - baseline[i]) +
        Math.abs(pixels[i + 1] - baseline[i + 1]) +
        Math.abs(pixels[i + 2] - baseline[i + 2]) +
        Math.abs(pixels[i + 3] - baseline[i + 3]);
      if (difference > 50) changed++;
    }
    return changed / (canvas.width * canvas.height);
  }, reset);
}

export async function sculptureMeasurements(page: Page) {
  return page.locator("#sculpture").evaluate((node) => {
    const canvas = node as HTMLCanvasElement;
    const context = canvas.getContext("2d")!;
    const { data, width, height } = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    let left = width,
      right = -1,
      top = height,
      bottom = -1,
      filled = 0;
    for (let y = 0; y < height; y++)
      for (let x = 0; x < width; x++) {
        if (data[(y * width + x) * 4 + 3] > 32) {
          left = Math.min(left, x);
          right = Math.max(right, x);
          top = Math.min(top, y);
          bottom = Math.max(bottom, y);
          filled++;
        }
      }
    const box = canvas.getBoundingClientRect();
    const hero = document.querySelector(".hero")!.getBoundingClientRect();
    const action = document
      .querySelector(".hero .pill-link")!
      .getBoundingClientRect();
    const intro = document
      .querySelector(".hero-intro")!
      .getBoundingClientRect();
    const ratioX = width / box.width,
      ratioY = height / box.height;
    return {
      release: document
        .querySelector('meta[name="portfolio-build"]')
        ?.getAttribute("content"),
      locale: document.documentElement.lang,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      documentWidth: document.documentElement.scrollWidth,
      buffer: { width, height, bytes: width * height * 4, ratioX, ratioY },
      canvas: { x: box.x, y: box.y, width: box.width, height: box.height },
      centerOffset: box.x + box.width / 2 - (hero.x + hero.width / 2),
      actionGap: box.top - action.bottom,
      introGap: intro.top - box.bottom,
      paint: {
        left: left / ratioX,
        right: (right + 1) / ratioX,
        top: top / ratioY,
        bottom: (bottom + 1) / ratioY,
        width: (right - left + 1) / ratioX,
        height: (bottom - top + 1) / ratioY,
        aspect: (right - left + 1) / ratioX / ((bottom - top + 1) / ratioY),
        filledRatio: filled / (width * height),
      },
    };
  });
}

export async function installPausedClock(page: Page) {
  const epoch = new Date("2026-10-01T08:00:00Z");
  await page.clock.install({ time: epoch });
  return async () => {
    await page.clock.pauseAt(new Date(epoch.getTime() + 60000));
    await page.clock.runFor(48);
  };
}
