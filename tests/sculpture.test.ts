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

test("Mobile motion is perceptible within the first half-second and retains its still pose", () => {
  const start = mobilePose(0),
    halfSecond = mobilePose(0.5),
    oneSecond = mobilePose(1);
  assert.ok(Math.abs(start.yaw - (0.36 + Math.sin(0.35 * 0.4) * 0.12)) < 1e-12);
  assert.ok(
    Math.abs(start.pitch - (-0.24 + Math.cos(0.35 * 0.32) * 0.06)) < 1e-12,
  );
  assert.ok(
    Math.abs(halfSecond.yaw - start.yaw) > 0.05,
    "Motion should be visible within 0.5s.",
  );
  assert.ok(
    Math.abs(oneSecond.yaw - start.yaw) > 0.09,
    "The first second should feel active.",
  );
});
