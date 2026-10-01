export function mobilePose(phase: number) {
  // A shallow, bounded camera keeps the ribbon open throughout the loop.
  return {
    yaw: 0.36 + Math.sin(phase * 0.4) * 0.12,
    pitch: -0.24 + Math.cos(phase * 0.32) * 0.06,
  };
}
