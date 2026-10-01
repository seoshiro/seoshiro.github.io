import { test } from "node:test";
import assert from "node:assert/strict";
import { mobilePose } from "../src/sculpture-view.ts";

test("Mobile camera stays frontal and varied across repeated animation cycles", () => {
  let minYaw = Infinity,
    maxYaw = -Infinity;
  for (let phase = 0; phase < 1000; phase += 0.071) {
    const { yaw, pitch } = mobilePose(phase);
    assert.ok(
      Math.abs(yaw) < Math.PI / 6,
      "Yaw must remain below thirty degrees.",
    );
    assert.ok(
      Math.abs(pitch) < Math.PI / 9,
      "Pitch must remain below twenty degrees.",
    );
    assert.ok(
      Math.cos(yaw) * Math.cos(pitch) > 0.8,
      "Projected frontal area must not collapse.",
    );
    minYaw = Math.min(minYaw, yaw);
    maxYaw = Math.max(maxYaw, yaw);
  }
  assert.ok(maxYaw - minYaw > 0.15, "The bounded camera must still move.");
});
