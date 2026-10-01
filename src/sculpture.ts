import { copy, type Locale } from "./content.ts";
type Point = [number, number, number];
type Patch = { points: Point[]; depth: number; shade: number; stripe: number };
const center = (u: number): Point => [
  (2 + Math.cos(3 * u) * 0.52) * Math.cos(2 * u),
  (2 + Math.cos(3 * u) * 0.52) * Math.sin(2 * u),
  Math.sin(3 * u) * 0.75,
];
function point(u: number, v: number): Point {
  const c = center(u);
  const radial: Point = [Math.cos(2 * u), Math.sin(2 * u), 0];
  const roll = u * 1.5;
  return [
    c[0] + v * (radial[0] * Math.cos(roll)),
    c[1] + v * (radial[1] * Math.cos(roll)),
    c[2] + v * Math.sin(roll),
  ];
}
function rotate(p: Point, a: number, b: number): Point {
  const x = p[0] * Math.cos(a) + p[2] * Math.sin(a),
    z = -p[0] * Math.sin(a) + p[2] * Math.cos(a);
  return [
    x,
    p[1] * Math.cos(b) - z * Math.sin(b),
    p[1] * Math.sin(b) + z * Math.cos(b),
  ];
}
export function startSculpture(
  locale: Locale,
  preference?: boolean,
  onPreference?: (paused: boolean) => void,
): () => void {
  const canvas = document.querySelector<HTMLCanvasElement>("#sculpture"),
    button = document.getElementById("motion-toggle");
  if (!canvas || !button) return () => {};
  let ctx: CanvasRenderingContext2D | null = null;
  try {
    ctx = canvas.getContext("2d", { alpha: true });
  } catch {
    /* Decorative drawing may be unavailable. */
  }
  if (!ctx) {
    canvas.parentElement!.hidden = true;
    button.hidden = true;
    return () => {};
  }
  const context = ctx;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)"),
    mobile = window.matchMedia("(max-width:760px)");
  const conn = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  let paused =
    preference ?? (reduce.matches || mobile.matches || !!conn?.saveData);
  if (reduce.matches || conn?.saveData) paused = true;
  let visible = true,
    frame = 0,
    last = 0,
    phase = 0.35,
    pointerX = 0,
    pointerY = 0,
    targetX = 0,
    targetY = 0,
    size = 600;
  function label() {
    button!.setAttribute("aria-pressed", String(paused));
    button!.querySelector("span:last-child")!.textContent = paused
      ? copy[locale].motionOn
      : copy[locale].motionOff;
    button!.querySelector("span:first-child")!.textContent = paused ? "▷" : "Ⅱ";
  }
  function draw() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    size = Math.min(Math.max(canvas!.clientWidth, 200), 700);
    const pixels = Math.round(size * ratio);
    if (canvas!.width !== pixels) {
      canvas!.width = pixels;
      canvas!.height = pixels;
    }
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, size, size);
    const patches: Patch[] = [],
      segments = 104,
      stripes = 9,
      a = phase * 0.16 + 0.65 + pointerX * 0.18,
      b = -0.65 + pointerY * 0.14;
    for (let i = 0; i < segments; i++) {
      const u = (i / segments) * Math.PI * 2,
        u2 = ((i + 1.035) / segments) * Math.PI * 2;
      for (let j = 0; j < stripes; j++) {
        const v = -0.54 + (j / stripes) * 1.08,
          v2 = v + (1.08 / stripes) * 0.82;
        const points = [
          point(u, v),
          point(u2, v),
          point(u2, v2),
          point(u, v2),
        ].map((p) => rotate(p, a, b));
        patches.push({
          points,
          depth: points.reduce((s, p) => s + p[2], 0) / 4,
          shade: 0.45 + 0.55 * (Math.cos(u * 2 + a) * 0.5 + 0.5),
          stripe: j,
        });
      }
    }
    patches.sort((a, b) => a.depth - b.depth);
    const scale = size * 0.154;
    for (const patch of patches) {
      const shade = patch.shade;
      const pearl = patch.stripe < 3 || patch.stripe > 6;
      context.fillStyle = pearl
        ? `rgb(${Math.round(135 + 108 * shade)},${Math.round(142 + 105 * shade)},${Math.round(158 + 92 * shade)})`
        : `rgb(${Math.round(51 + 67 * shade)},${Math.round(69 + 84 * shade)},${Math.round(165 + 83 * shade)})`;
      context.beginPath();
      patch.points.forEach((p, i) => {
        const perspective = 8 / (8 - p[2] * 0.35),
          x = size * 0.5 + p[0] * scale * perspective,
          y = size * 0.5 + p[1] * scale * perspective;
        if (i) context.lineTo(x, y);
        else context.moveTo(x, y);
      });
      context.closePath();
      context.fill();
    }
  }
  function tick(now: number) {
    if (paused || !visible || document.hidden) {
      frame = 0;
      return;
    }
    if (now - last >= 1000 / 30) {
      last = now;
      phase += 0.012;
      pointerX += (targetX - pointerX) * 0.035;
      pointerY += (targetY - pointerY) * 0.035;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    label();
    draw();
    if (!paused && visible && !document.hidden)
      frame = requestAnimationFrame(tick);
  }
  const onClick = () => {
    paused = !paused;
    onPreference?.(paused);
    sync();
  };
  button.addEventListener("click", onClick);
  const onReduce = () => {
    if (reduce.matches) {
      paused = true;
      onPreference?.(paused);
    }
    sync();
  };
  reduce.addEventListener("change", onReduce);
  const onMobile = () => {
    if (mobile.matches) paused = true;
    sync();
  };
  mobile.addEventListener("change", onMobile);
  const onVisibility = () => sync();
  document.addEventListener("visibilitychange", onVisibility);
  const onPointer = (event: PointerEvent) => {
    if (paused || event.pointerType !== "mouse") return;
    targetX = (event.clientX / window.innerWidth - 0.5) * 2;
    targetY = (event.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });
  const observer = new IntersectionObserver((items) => {
    visible = items[0].isIntersecting;
    sync();
  });
  observer.observe(canvas);
  const resize = new ResizeObserver(() => {
    draw();
  });
  resize.observe(canvas);
  sync();
  return () => {
    if (frame) cancelAnimationFrame(frame);
    observer.disconnect();
    resize.disconnect();
    button.removeEventListener("click", onClick);
    reduce.removeEventListener("change", onReduce);
    mobile.removeEventListener("change", onMobile);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pointermove", onPointer);
  };
}
