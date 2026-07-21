import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { setLenisInstance } from "../lib/lenisController";

/**
 * Drives smooth, eased scrolling for the whole site.
 * Mount once at the top level (App.tsx) — it patches window scroll
 * globally, so anchor links (via scrollToId in lenisController) and
 * scroll listeners elsewhere (Hero parallax, TopNav's
 * IntersectionObserver) keep working unchanged; Lenis just smooths the
 * motion between scroll positions.
 */
export function useLenis() {
  useEffect(() => {
    // Respect reduced-motion preference — skip the eased scroll entirely.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    setLenisInstance(lenis);

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);
}