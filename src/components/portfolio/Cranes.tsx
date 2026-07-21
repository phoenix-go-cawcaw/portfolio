import { useEffect, useState } from "react";
import craneBottom from "../../assets/crane bottom.png";
import craneMid from "../../assets/crane mid.png";
import craneHigh from "../../assets/crane high.png";

/**
 * Cranes — ambient birds gliding across the hero sky, animated from your
 * three hand-painted ink poses (bottom / mid / high) as a small flipbook
 * rather than a rigged vector. The frames ping-pong low → mid → high →
 * mid so the flap loops without a jump cut, while each bird also drifts
 * across the screen on its own slower, independent keyframe loop.
 *
 * Frames are used as a CSS mask (not a plain <img>) so the silhouette
 * picks up hsl(var(--ink)) — the site's actual ink color — instead of
 * showing the raw black pixels from the source PNGs.
 */

const FRAMES = [craneBottom, craneMid, craneHigh, craneMid]; // ping-pong loop

interface CraneConfig {
  id: number;
  top: string;
  width: number;
  opacity: number;
  flyDuration: number;
  flyDelay: number;
  flapDuration: number; // seconds for one full ping-pong cycle
  drift: "low" | "mid" | "high";
}

const CRANES: CraneConfig[] = [
  { id: 1, top: "14%", width: 92, opacity: 0.85, flyDuration: 40, flyDelay: 0, flapDuration: 1.4, drift: "mid" },
  { id: 2, top: "23%", width: 60, opacity: 0.62, flyDuration: 54, flyDelay: 10, flapDuration: 1.7, drift: "low" },
  { id: 3, top: "9%", width: 46, opacity: 0.45, flyDuration: 66, flyDelay: 26, flapDuration: 1.2, drift: "high" },
];

const CraneBird = ({ opacity, flapDuration }: { opacity: number; flapDuration: number }) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const stepMs = (flapDuration * 1000) / FRAMES.length;
    const id = window.setInterval(() => {
      setFrame((f) => (f + 1) % FRAMES.length);
    }, stepMs);
    return () => window.clearInterval(id);
  }, [flapDuration]);

  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        opacity,
        backgroundColor: "hsl(var(--ink))",
        WebkitMaskImage: `url(${FRAMES[frame]})`,
        maskImage: `url(${FRAMES[frame]})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
};

const Cranes = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {CRANES.map((c) => (
        <div
          key={c.id}
          className={`crane-flight crane-flight--${c.drift}`}
          style={{
            top: c.top,
            width: `${c.width}px`,
            height: `${c.width * 0.61}px`,
            animationDuration: `${c.flyDuration}s`,
            animationDelay: `${c.flyDelay}s`,
          }}
        >
          <CraneBird opacity={c.opacity} flapDuration={c.flapDuration} />
        </div>
      ))}
    </div>
  );
};

export default Cranes;