import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

/**
 * Floating ambient particles that drift upward and across the page.
 * Day: warm dust motes (barely visible, ink-toned).
 * Night: cool moonlight particles (subtle pale blue shimmer).
 *
 * Each particle has a unique size, speed, and path — seeded once
 * on first render so they don't reshuffle every theme toggle.
 */

interface ParticleConfig {
  id: number;
  left: number;
  top: number;
  size: number;
  dur: number;
  delay: number;
  floatX: number;
}

const COUNT = 18;

function makeParticles(): ParticleConfig[] {
  return Array.from({ length: COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1.5 + Math.random() * 2.5,
    dur: 20 + Math.random() * 25,
    delay: Math.random() * -20,
    floatX: (Math.random() - 0.5) * 60,
  }));
}

const particles = makeParticles();

const WindParticles = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const particleColor = isDark
    ? "hsla(220, 20%, 85%, 0.25)"
    : "hsla(var(--ink), 0.08)";

  const particleShadow = isDark
    ? "0 0 6px hsla(220, 30%, 80%, 0.15)"
    : "none";

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[7] overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            backgroundColor: particleColor,
            boxShadow: particleShadow,
          }}
          animate={{
            y: [0, -80, 0, -60, 0],
            x: [0, p.floatX * 0.3, p.floatX * 0.5, p.floatX * 0.2, 0],
            opacity: [0.3, 0.7, 0.2, 0.6, 0.3],
            scale: [1, 1.3, 0.9, 1.1, 1],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default WindParticles;