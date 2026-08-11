import { useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";

/**
 * Fireflies drifting across the entire page (fixed positioning, not
 * scoped to one section) — only meaningfully visible in dark mode, but
 * always mounted so the appearance/disappearance is a smooth fade
 * rather than a pop when the theme toggles.
 */
interface Firefly {
  id: number;
  left: number;
  top: number;
  size: number;
  driftDuration: number;
  driftDelay: number;
  twinkleDuration: number;
  twinkleDelay: number;
}

const COUNT = 22;

function makeFireflies(): Firefly[] {
  return Array.from({ length: COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 3 + Math.random() * 3,
    driftDuration: 14 + Math.random() * 16,
    driftDelay: Math.random() * -20,
    twinkleDuration: 2 + Math.random() * 2.5,
    twinkleDelay: Math.random() * -4,
  }));
}

const FirefliesLayer = () => {
  const { theme } = useTheme();
  const fireflies = useMemo(makeFireflies, []);

  return (
    <div
      className="fixed inset-0 z-30 pointer-events-none overflow-hidden transition-opacity ease-in-out"
      style={{ opacity: theme === "dark" ? 1 : 0, transitionDuration: "2000ms" }}
      aria-hidden="true"
    >
      {fireflies.map((f) => (
        <div
          key={f.id}
          className="firefly-drift absolute"
          style={
            {
              left: `${f.left}%`,
              top: `${f.top}%`,
              animationDuration: `${f.driftDuration}s`,
              animationDelay: `${f.driftDelay}s`,
            } as React.CSSProperties
          }
        >
          <div
            className="firefly-twinkle"
            style={
              {
                width: `${f.size}px`,
                height: `${f.size}px`,
                animationDuration: `${f.twinkleDuration}s`,
                animationDelay: `${f.twinkleDelay}s`,
              } as React.CSSProperties
            }
          />
        </div>
      ))}
    </div>
  );
};

export default FirefliesLayer;