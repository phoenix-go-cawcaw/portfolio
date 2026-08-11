import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

/**
 * Canvas-based twinkling starfield visible at night.
 * Uses a static star map with dynamic opacity pulse per star
 * — cheaper than per-frame position updates and looks identical.
 */

const STAR_COUNT = 140;

interface Star {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
}

function makeStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.4 + Math.random() * 1.2,
    phase: Math.random() * Math.PI * 2,
    speed: 0.3 + Math.random() * 0.8,
  }));
}

const stars = makeStars();

const StarsLayer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isDark) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let raf: number;
    let start = performance.now();

    const draw = () => {
      const elapsed = (performance.now() - start) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(elapsed * s.speed + s.phase));
        const alpha = twinkle * 0.85;
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(45, 35%, 92%, ${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [isDark]);

  if (!isDark) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      aria-hidden="true"
    />
  );
};

export default StarsLayer;