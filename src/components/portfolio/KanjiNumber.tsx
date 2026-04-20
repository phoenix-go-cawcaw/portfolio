import { useEffect, useRef } from "react";

/**
 * Animated Chinese numerals 一 二 三 四 五.
 * Each stroke is drawn in sequence using SVG stroke-dashoffset
 * once the element scrolls into view.
 */
const STROKES: Record<string, string[]> = {
  // 一  — single horizontal
  "一": ["M14,50 L86,50"],
  // 二 — two horizontals (short top, long bottom)
  "二": ["M22,30 L70,30", "M10,72 L90,72"],
  // 三 — three horizontals
  "三": ["M22,22 L70,22", "M16,50 L78,50", "M10,78 L90,78"],
  // 四 — outer box, then two inner verticals, then bottom seal
  "四": [
    "M16,18 L84,18 L84,82 L16,82 Z",
    "M40,30 L40,66",
    "M60,30 L60,66",
  ],
  // 五 — top horizontal, vertical down, mid horizontal, hook, base
  "五": [
    "M16,18 L84,18",
    "M30,18 L24,50 L70,50 L70,78",
    "M12,82 L88,82",
  ],
  // 六 — dot, top horizontal, two legs
  "六": [
    "M48,12 L52,22",
    "M14,36 L86,36",
    "M34,52 L18,82",
    "M66,52 L84,82",
  ],
  // 七
  "七": ["M18,30 L70,30 L60,82", "M10,60 L90,58"],
  // 八
  "八": ["M40,20 L18,82", "M60,20 L84,82"],
  // 九
  "九": ["M18,28 L60,28 L60,72 Q60,82 72,80", "M40,40 L82,76"],
};

interface Props {
  numeral: string;
  className?: string;
}

const KanjiNumber = ({ numeral, className = "" }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<SVGPathElement[]>([]);
  const strokes = STROKES[numeral];

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !strokes) return;

    const paths = pathRefs.current;
    const lengths = paths.map((p) => p.getTotalLength());

    paths.forEach((p, i) => {
      const len = lengths[i];
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
      p.style.transition = "none";
    });

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        paths.forEach((p, i) => {
          const delay = i * 220;
          window.setTimeout(() => {
            p.style.transition =
              "stroke-dashoffset 700ms cubic-bezier(0.65, 0, 0.35, 1)";
            p.style.strokeDashoffset = "0";
          }, delay);
        });
        obs.disconnect();
      },
      { threshold: 0.4 }
    );
    obs.observe(svg);
    return () => obs.disconnect();
  }, [strokes]);

  // Fallback to plain text if numeral isn't mapped
  if (!strokes) {
    return <span className={className}>{numeral}</span>;
  }

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={numeral}
      role="img"
      className={className}
    >
      {strokes.map((d, i) => (
        <path
          key={i}
          ref={(el) => {
            if (el) pathRefs.current[i] = el;
          }}
          d={d}
          fill="none"
          stroke="hsl(var(--ink) / 0.35)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
};

export default KanjiNumber;
