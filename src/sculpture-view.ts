export function mobilePose(seconds: number) {
  // A shallow, bounded camera keeps the ribbon open throughout the loop.
  // Offsets preserve the initial still pose; active cycles take about 5-7s.
  return {
    yaw: 0.36 + Math.sin(seconds * 1.15 + 0.14) * 0.12,
    pitch: -0.24 + Math.cos(seconds * 0.92 + 0.112) * 0.06,
  };
}
