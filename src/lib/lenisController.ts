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
 *
 * NOTE: only use this for targets that AREN'T one of useLenis.ts's
 * wheel-jack stops (see jumpToStop below) — calling lenis.scrollTo
 * directly bypasses the wheel-jack's internal step counter, so the very
 * next wheel tick would jump from the wrong remembered position.
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

/**
 * Jump to a named section through the wheel-jack system itself (see
 * useLenis.ts), so its internal stop index stays in sync. Anything that
 * links to a section — nav clicks, "View Works", etc. — should use this
 * instead of scrollToId once useLenis.ts has mounted and registered
 * itself; it falls back to scrollToId if the wheel-jack isn't active
 * (e.g. prefers-reduced-motion, where useLenis.ts bails out early).
 */
type StopJumpHandler = (id: string) => void;
let stopJumpHandler: StopJumpHandler | null = null;

export function setStopJumpHandler(fn: StopJumpHandler | null) {
  stopJumpHandler = fn;
}

export function jumpToStop(id: string, fallbackOffset = -64) {
  if (stopJumpHandler) {
    stopJumpHandler(id);
  } else {
    scrollToId(id, fallbackOffset);
  }
}