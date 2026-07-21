import type Lenis from "@studio-freight/lenis";

/**
 * A single shared reference to the app's Lenis instance, set once by
 * useLenis() on mount. Anything that needs to scroll to an anchor
 * (nav links, "View Works", etc.) should go through scrollToId() below
 * instead of calling native scrollIntoView — running both Lenis and the
 * browser's native smooth scroll at once is what caused the jumpy,
 * overshooting scroll behaviour.
 */
let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenisInstance() {
  return lenisInstance;
}

/**
 * Scroll to an element by id. Uses Lenis when it's mounted (the normal
 * case); falls back to native scrollIntoView when Lenis isn't active
 * (e.g. prefers-reduced-motion, or before it's finished mounting).
 */
export function scrollToId(id: string, offset = -64) {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}