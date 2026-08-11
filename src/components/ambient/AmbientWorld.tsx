import { lazy, Suspense, useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import CherryBlossoms from "./CherryBlossoms";
import WindLines from "./WindLines";

/**
 * Code-split ambient world — each child component is lazy-loaded,
 * which extracts framer-motion and canvas-based effects into their
 * own async chunks rather than inflating the initial bundle.
 *
 * The Suspense fallback is invisible (an empty div) since ambient
 * effects are purely decorative and should never cause layout shift.
 */

const DriftingClouds = lazy(() => import("./DriftingClouds"));
const StarsLayer = lazy(() => import("./StarsLayer"));
const WindParticles = lazy(() => import("./WindParticles"));
const Lantern = lazy(() => import("./Lantern"));

const AmbientWorld = () => {
  const { theme } = useTheme();
  const [paused, setPaused] = useState(false);

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    if (prefersReducedMotion) {
      setPaused(true);
      return;
    }
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [prefersReducedMotion]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[4]"
      aria-hidden="true"
      style={{ opacity: paused ? 0 : 1, transition: "opacity 500ms ease" }}
    >
      <Suspense fallback={null}>
        <DriftingClouds />
        <StarsLayer />
        <WindParticles />
        <Lantern />
        <CherryBlossoms />
        <WindLines />
      </Suspense>
    </div>
  );
};

export default AmbientWorld;