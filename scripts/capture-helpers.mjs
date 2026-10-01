export async function settle(page, all = false) {
  await page.evaluate(async (all) => {
    await document.fonts.ready;
    const images = [...document.images].filter((img) => {
      if (all) {
        img.loading = "eager";
        return true;
      }
      const rect = img.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    });
    await Promise.all(images.map((img) => img.decode().catch(() => {})));
  }, all);
  await page.waitForTimeout(120);
}
