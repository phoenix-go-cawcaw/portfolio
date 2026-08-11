import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

/**
 * A hanging lantern that sways with a gentle spring physics.
 * Visible in both modes but brighter at night.
 * The sway uses framer-motion's spring animation for a natural,
 * physically-plausible wobble rather than a sine-wave loop.
 */

const Lantern = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="fixed bottom-8 left-8 md:left-12 pointer-events-none z-[8]"
      aria-hidden="true"
    >
      {/* Rope / thread */}
      <svg width="20" height="60" className="mx-auto" aria-hidden="true">
        <line
          x1="10"
          y1="0"
          x2="10"
          y2="60"
          stroke="hsl(var(--ink))"
          strokeWidth="0.8"
          opacity={0.25}
        />
      </svg>

      {/* Lantern body — framer-motion spring sway */}
      <motion.div
        className="relative"
        animate={{ rotate: [2, -2, 1.5, -1.5, 0.5, -0.5, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glow — brighter at night */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: isDark
              ? "radial-gradient(circle, hsla(42, 70%, 80%, 0.35) 0%, hsla(42, 70%, 80%, 0) 100%)"
              : "radial-gradient(circle, hsla(42, 60%, 65%, 0.12) 0%, hsla(42, 60%, 65%, 0) 100%)",
            filter: "blur(12px)",
            transform: "scale(2.5)",
          }}
        />

        {/* Lantern structure */}
        <svg
          width="28"
          height="40"
          viewBox="0 0 28 40"
          fill="none"
          aria-hidden="true"
          style={{ filter: "drop-shadow(0 0 4px hsla(42, 60%, 65%, 0.15))" }}
        >
          {/* Top cap */}
          <rect x="6" y="0" width="16" height="3" rx="1" fill="hsl(var(--ink))" opacity={0.35} />
          {/* Frame — two vertical struts */}
          <rect x="6" y="3" width="1.5" height="32" rx="0.5" fill="hsl(var(--ink))" opacity={0.25} />
          <rect x="20.5" y="3" width="1.5" height="32" rx="0.5" fill="hsl(var(--ink))" opacity={0.25} />
          {/* Top horizontal */}
          <rect x="6" y="3" width="16" height="1.5" rx="0.5" fill="hsl(var(--ink))" opacity={0.25} />
          {/* Bottom horizontal */}
          <rect x="6" y="33.5" width="16" height="1.5" rx="0.5" fill="hsl(var(--ink))" opacity={0.25} />
          {/* Paper panel */}
          <rect
            x="8"
            y="5"
            width="12"
            height="28"
            rx="2"
            fill={
              isDark
                ? "hsla(42, 50%, 75%, 0.15)"
                : "hsla(42, 40%, 60%, 0.08)"
            }
          />
          {/* Inner light — pulsing */}
          <rect
            x="8"
            y="5"
            width="12"
            height="28"
            rx="2"
            fill={
              isDark
                ? "hsla(42, 70%, 85%, 0.20)"
                : "hsla(42, 60%, 70%, 0.06)"
            }
          />
          {/* Bottom cap */}
          <rect x="6" y="37" width="16" height="3" rx="1" fill="hsl(var(--ink))" opacity={0.35} />
        </svg>
      </motion.div>
    </div>
  );
};

export default Lantern;