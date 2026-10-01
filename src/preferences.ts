const motionKey = "seoshiro-portfolio-motion-v1";
export function readMotionPreference(): boolean | undefined {
  for (const storageName of ["localStorage", "sessionStorage"] as const) {
    try {
      const value = window[storageName].getItem(motionKey);
      if (value === "paused") return true;
      if (value === "playing") return false;
    } catch {
      // Preference storage is optional; try tab storage before memory only.
    }
  }
  return undefined;
}
export function saveMotionPreference(paused: boolean): void {
  for (const storageName of ["localStorage", "sessionStorage"] as const) {
    try {
      window[storageName].setItem(motionKey, paused ? "paused" : "playing");
      return;
    } catch {
      // The current page still honors the choice when both stores are denied.
    }
  }
}
