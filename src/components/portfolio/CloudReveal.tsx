import { useEffect, useRef, useState } from "react";

/**
 * A circular portrait frame that two cloud shapes slide apart from,
 * one time, when scrolled into view — like reaching a village and the
 * mist finally clearing. Falls back to an ink medallion with the site's
 * "凤" mark if no photo is supplied yet, so it's never a broken image.
 */
interface Props {
  photoSrc?: string;
  photoAlt?: string;
}

const CloudReveal = ({ photoSrc, photoAlt = "Phoenix" }: Props) => {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay so the clouds part just after the section settles
          // into view, rather than the instant it crosses the threshold.
          setTimeout(() => setRevealed(true), 300);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[240px] overflow-hidden rounded-full border border-ink/15 shadow-[0_12px_32px_hsl(var(--ink)/0.12)]"
    >
      {/* Portrait, or the ink medallion fallback */}
      <div className="absolute inset-0 flex items-center justify-center bg-paper-aged">
        {photoSrc ? (
          <img src={photoSrc} alt={photoAlt} className="h-full w-full object-cover" />
        ) : (
          <span className="font-zh text-6xl font-light text-ink/25 select-none">凤</span>
        )}
      </div>

      {/* Two cloud panels covering the portrait until revealed */}
      <div
        className={`cloud-panel cloud-panel--left ${revealed ? "is-parted" : ""}`}
        aria-hidden="true"
      />
      <div
        className={`cloud-panel cloud-panel--right ${revealed ? "is-parted" : ""}`}
        aria-hidden="true"
      />
    </div>
  );
};

export default CloudReveal;