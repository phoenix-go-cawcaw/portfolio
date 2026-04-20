import { useEffect, useRef } from "react";

const BrushDivider = ({ className = "" }: { className?: string }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const splashRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    const splash = splashRef.current;
    if (!path || !svg || !splash) return;

    const length = path.getTotalLength();
    const duration = 1400;
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.65, 0, 0.35, 1)`;

    splash.style.opacity = "0";
    splash.style.transform = "scale(0.4)";
    splash.style.transformOrigin = "196px 6px";
    splash.style.transition =
      "opacity 900ms ease-out, transform 1200ms cubic-bezier(0.22, 1, 0.36, 1)";

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          path.style.strokeDashoffset = "0";
          window.setTimeout(() => {
            splash.style.opacity = "1";
            splash.style.transform = "scale(1)";
          }, duration - 80);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(svg);
    return () => obs.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`brush-divider ${className}`}
      viewBox="0 0 200 14"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M4,7 Q40,3 80,7 T160,7 Q180,8 196,6"
        stroke="hsl(var(--ink))"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Soft ink-bleed splash at the end of the stroke */}
      <g ref={splashRef}>
        <circle cx="196" cy="6" r="2.6" fill="hsl(var(--ink) / 0.55)" />
        <circle cx="198.4" cy="5.2" r="1.1" fill="hsl(var(--ink) / 0.35)" />
        <circle cx="194.2" cy="7.6" r="0.8" fill="hsl(var(--ink) / 0.3)" />
        <circle cx="199.6" cy="7.2" r="0.5" fill="hsl(var(--ink) / 0.25)" />
        <circle cx="196.6" cy="3.8" r="0.45" fill="hsl(var(--ink) / 0.22)" />
      </g>
    </svg>
  );
};

export default BrushDivider;
