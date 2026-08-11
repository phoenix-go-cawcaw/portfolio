import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

/**
 * Gentle drifting clouds for daytime — rendered as faint translucent
 * SVG shapes that drift horizontally across the page on independent
 * loops. Each cloud has a unique size, opacity, speed, and altitude.
 * Uses framer-motion for smooth, GPU-accelerated transforms.
 */

interface CloudConfig {
  id: number;
  w: number;
  h: number;
  top: string;
  opacity: number;
  dur: number;
  delay: number;
  driftY: number;
}

const CLOUDS: CloudConfig[] = [
  { id: 0, w: 160, h: 50, top: "8%",  opacity: 0.12, dur: 50, delay: 0,    driftY: 4 },
  { id: 1, w: 220, h: 64, top: "16%", opacity: 0.08, dur: 70, delay: 10,   driftY: 6 },
  { id: 2, w: 130, h: 40, top: "24%", opacity: 0.06, dur: 60, delay: 22,   driftY: 3 },
  { id: 3, w: 180, h: 55, top: "32%", opacity: 0.10, dur: 55, delay: 6,    driftY: 5 },
  { id: 4, w: 100, h: 32, top: "12%", opacity: 0.07, dur: 80, delay: 15,   driftY: 2 },
];

function CloudsSvg({ w, h }: { w: number; h: number }) {
  // Generate a unique organic cloud path per size
  const id = useMemo(() => Math.random().toString(36).slice(2, 6), []);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true">
      <defs>
        <filter id={`cloud-blur-${id}`}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <ellipse
        cx={w * 0.35}
        cy={h * 0.55}
        rx={w * 0.35}
        ry={h * 0.45}
        fill="hsl(var(--ink))"
        filter={`url(#cloud-blur-${id})`}
      />
      <ellipse
        cx={w * 0.55}
        cy={h * 0.42}
        rx={w * 0.40}
        ry={h * 0.50}
        fill="hsl(var(--ink))"
        filter={`url(#cloud-blur-${id})`}
      />
      <ellipse
        cx={w * 0.72}
        cy={h * 0.58}
        rx={w * 0.28}
        ry={h * 0.40}
        fill="hsl(var(--ink))"
        filter={`url(#cloud-blur-${id})`}
      />
      <ellipse
        cx={w * 0.50}
        cy={h * 0.55}
        rx={w * 0.30}
        ry={h * 0.38}
        fill="hsl(var(--ink))"
        filter={`url(#cloud-blur-${id})`}
      />
    </svg>
  );
}

const DriftingClouds = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[6] overflow-hidden"
      style={{ opacity: isDark ? 0 : 1, transition: "opacity 2000ms ease-in-out" }}
      aria-hidden="true"
    >
      {CLOUDS.map((c) => (
        <motion.div
          key={c.id}
          className="absolute"
          style={{ top: c.top, left: `-${c.w + 40}px` }}
          initial={{ x: 0 }}
          animate={{
            x: window.innerWidth + c.w + 80,
            y: [0, c.driftY, 0, -c.driftY, 0],
          }}
          transition={{
            x: {
              duration: c.dur,
              delay: c.delay,
              repeat: Infinity,
              ease: "linear",
            },
            y: {
              duration: c.dur * 0.6,
              delay: c.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <div style={{ opacity: c.opacity }}>
            <CloudsSvg w={c.w} h={c.h} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DriftingClouds;