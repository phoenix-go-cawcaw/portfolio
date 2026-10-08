import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { setLenisInstance, setStopJumpHandler } from "../lib/lenisController";

const STOPS = ["hero", "about", "projects", "certifications", "contact"];

function getInitialStopIndex(): number {
  const midY = window.scrollY + window.innerHeight / 2;
  let closest = 0;
  let closestDist = Infinity;
  STOPS.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const sectionMid = rect.top + window.scrollY + rect.height / 2;
    const dist = Math.abs(midY - sectionMid);
    if (dist < closestDist) { closestDist = dist; closest = i; }
  });
  return closest;
}

/** Section-locked scrolling: each wheel tick moves one section. */
export function useLenis() {
  const activeIndexRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    activeIndexRef.current = getInitialStopIndex();
    let animating = false;
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical", smoothWheel: true, wheelMultiplier: 0, touchMultiplier: 0,
    });
    setLenisInstance(lenis);

    const snapTo = (index: number) => {
      if (index < 0 || index >= STOPS.length) return;
      const el = document.getElementById(STOPS[index]);
      if (!el) { animating = false; return; }
      activeIndexRef.current = index;
      animating = true;
      lenis.scrollTo(el, { offset: 0, duration: 0.8, onComplete: () => { animating = false; } });
    };
    const onWheel = (e: WheelEvent) => {
      const nestedScroll = e.target instanceof Element
        ? e.target.closest<HTMLElement>("[data-native-scroll]")
        : null;
      if (
        nestedScroll &&
        ((e.deltaY > 0 && nestedScroll.scrollTop + nestedScroll.clientHeight < nestedScroll.scrollHeight - 1) ||
          (e.deltaY < 0 && nestedScroll.scrollTop > 0))
      ) {
        return;
      }
      e.preventDefault();
      if (animating) return;
      snapTo(activeIndexRef.current + (e.deltaY > 0 ? 1 : -1));
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    setStopJumpHandler((id: string) => {
      if (!animating) {
        const index = STOPS.indexOf(id);
        if (index !== -1) snapTo(index);
      }
    });
    let raf = 0;
    const tick = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      lenis.destroy(); setLenisInstance(null); setStopJumpHandler(null);
    };
  }, []);
}
