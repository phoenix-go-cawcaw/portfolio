import { describe, it, expect } from "vitest";
import { getSimRect } from "../components/portfolio/WaterRippleSection";

describe("getSimRect", () => {
  it("fills the full width on wide layouts while keeping a square sim", () => {
    const rect = getSimRect(1920, 1080);

    expect(rect).toEqual({ x: 0, y: -420, w: 1920, h: 1920 });
  });

  it("fills the full height on portrait layouts while keeping a square sim", () => {
    const rect = getSimRect(1080, 1920);

    expect(rect).toEqual({ x: -420, y: 0, w: 1920, h: 1920 });
  });
});
