import { useCallback, useRef, useState } from "react";

/**
 * A small koi pond: two koi swim continuous loops using native SVG
 * <animateMotion> (rotate="auto" keeps them nose-first along the path
 * tangent — this is the one thing CSS transforms can't do cleanly, so
 * SMIL is the right tool here rather than fighting it with keyframes).
 * Clicking the water spawns an expanding ripple ring at that point.
 */

const POND_VIEWBOX = { w: 280, h: 160 };
const OUTER_PATH = "M40,80 C40,38 240,38 240,80 C240,122 40,122 40,80 Z";
const INNER_PATH = "M90,80 C90,55 190,55 190,80 C190,105 90,105 90,80 Z";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

// A koi drawn nose-first along +x, so rotate="auto" on its motion path
// orients it correctly along the tangent.
const Koi = ({ variant }: { variant: "gold" | "ink" }) => (
  <g>
    <ellipse cx="0" cy="0" rx="11" ry="4.5" fill={variant === "gold" ? "hsl(var(--gold))" : "hsl(var(--ink) / 0.7)"} />
    <path d="M9,-2.5 L16,0 L9,2.5 Z" fill={variant === "gold" ? "hsl(var(--gold))" : "hsl(var(--ink) / 0.7)"} />
    <path d="M-11,-3.5 L-18,-7 L-13,0 L-18,7 L-11,3.5 Z" fill={variant === "gold" ? "hsl(var(--gold))" : "hsl(var(--ink) / 0.7)"} />
    {variant === "gold" && (
      <path d="M-9,0 Q0,-1.5 9,0" stroke="hsl(var(--ink))" strokeWidth="1" fill="none" opacity="0.45" />
    )}
  </g>
);

const KoiPond = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * POND_VIEWBOX.w;
    const y = ((e.clientY - rect.top) / rect.height) * POND_VIEWBOX.h;
    const id = idRef.current++;
    setRipples((r) => [...r, { id, x, y }]);
  }, []);

  const removeRipple = useCallback((id: number) => {
    setRipples((r) => r.filter((ripple) => ripple.id !== id));
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${POND_VIEWBOX.w} ${POND_VIEWBOX.h}`}
      className="w-full h-auto cursor-pointer"
      onClick={handleClick}
      role="img"
      aria-label="A koi pond — click the water to ripple it"
    >
      <defs>
        <radialGradient id="pond-water" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="hsl(var(--jade))" stopOpacity="0.22" />
          <stop offset="100%" stopColor="hsl(var(--jade))" stopOpacity="0.42" />
        </radialGradient>
        <clipPath id="pond-clip">
          <ellipse cx="140" cy="80" rx="100" ry="42" />
        </clipPath>
      </defs>

      <ellipse cx="140" cy="80" rx="100" ry="42" fill="url(#pond-water)" />
      <ellipse cx="140" cy="80" rx="100" ry="42" fill="none" stroke="hsl(var(--ink) / 0.18)" strokeWidth="1.5" />

      {/* static ripple texture rings for a bit of surface detail */}
      <ellipse cx="105" cy="68" rx="18" ry="7" fill="none" stroke="hsl(var(--ink) / 0.08)" strokeWidth="1" />
      <ellipse cx="175" cy="92" rx="22" ry="8" fill="none" stroke="hsl(var(--ink) / 0.08)" strokeWidth="1" />

      <g clipPath="url(#pond-clip)">
        <Koi variant="gold" />
        <animateMotion path={OUTER_PATH} dur="13s" repeatCount="indefinite" rotate="auto" />
      </g>

      <g clipPath="url(#pond-clip)" transform="translate(0,0)">
        <g>
          <Koi variant="ink" />
          <animateMotion path={INNER_PATH} dur="9s" repeatCount="indefinite" rotate="auto" keyPoints="1;0" keyTimes="0;1" calcMode="linear" />
        </g>
      </g>

      {ripples.map((r) => (
        <g key={r.id} transform={`translate(${r.x} ${r.y})`}>
          <circle
            r="2"
            fill="none"
            stroke="hsl(var(--ink) / 0.5)"
            strokeWidth="1.5"
            className="ripple-ring"
            onAnimationEnd={() => removeRipple(r.id)}
          />
        </g>
      ))}
    </svg>
  );
};

export default KoiPond;