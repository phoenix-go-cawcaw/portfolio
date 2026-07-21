import { useMemo } from "react";
import { ribbonPath } from "../../lib/ridgePath";

/**
 * A distant dragon that occasionally drifts across the village skyline,
 * mostly hidden behind the ridge (see the low-opacity mountain layer in
 * About.tsx, which sits at a higher z-index than this component so it
 * partially covers the dragon as it dips near the ridgeline).
 *
 * The body is a smooth Catmull-Rom ribbon (same technique as the
 * mountain silhouettes) between a top and bottom edge — a classic
 * weaving "cloud dragon" silhouette, verified as a clean closed shape
 * (constant ~25–28px thickness, no self-crossing) before wiring in.
 */

const BODY_TOP: [number, number][] = [
  [0, 110], [70, 70], [150, 125], [230, 55], [310, 115], [390, 60], [470, 100], [540, 80],
];
const BODY_BOTTOM: [number, number][] = [
  [0, 138], [70, 98], [150, 150], [230, 82], [310, 142], [390, 88], [470, 128], [540, 105],
];

const HEAD_D = "M540,92 L595,72 L580,90 L600,100 L575,102 L590,118 L555,108 Z";
const WHISKER_TOP_D = "M555,95 C575,85 590,80 610,85";
const WHISKER_BOTTOM_D = "M552,102 C570,105 585,112 600,122";
const HORN_D = "M565,80 L560,58 L572,78 Z";

const DistantDragon = () => {
  const bodyD = useMemo(() => ribbonPath(BODY_TOP, BODY_BOTTOM), []);

  return (
    <div className="dragon-drift absolute pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 620 220" width="420" height="149" xmlns="http://www.w3.org/2000/svg">
        <path d={bodyD} fill="hsl(var(--ink))" opacity="0.85" />
        <path d={HEAD_D} fill="hsl(var(--ink))" opacity="0.85" />
        <path d={WHISKER_TOP_D} stroke="hsl(var(--ink))" strokeWidth="1.5" fill="none" opacity="0.85" />
        <path d={WHISKER_BOTTOM_D} stroke="hsl(var(--ink))" strokeWidth="1.5" fill="none" opacity="0.85" />
        <path d={HORN_D} fill="hsl(var(--ink))" opacity="0.85" />
      </svg>
    </div>
  );
};

export default DistantDragon;