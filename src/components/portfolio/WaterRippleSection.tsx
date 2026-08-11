import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

/**
 * A water-ripple canvas that runs a short, demand-driven wave simulation.
 * Exposes `rippleAt(clientX, clientY)` via ref so the parent decides
 * when and where to deposit disturbances.
 *
 * The sim grid is square (SIM_SIZE × SIM_SIZE) and is drawn centered
 * within the visible canvas, preserving 1:1 aspect ratio. This ensures
 * ripples are always circular regardless of the container shape.
 *
 * Rendering: pure grayscale with CSS `mix-blend-mode: soft-light`,
 * so mid-gray → transparent, highlights brighten the background,
 * shadows deepen it. Color comes from whatever sits behind the canvas.
 */

const SIM_SIZE = 64;
const DAMPING = 0.94;
const MAX_FRAMES = 90;
const FRAME_INTERVAL = 1000 / 30;

export interface WaterRippleHandle {
  /** Deposit a ripple at the given client-space coordinates. */
  rippleAt: (clientX: number, clientY: number, radius?: number, amount?: number) => void;
}

interface Props {
  className?: string;
  heightClassName?: string;
}

const WaterRippleSection = forwardRef<WaterRippleHandle, Props>(
  ({ className = "", heightClassName = "h-72" }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const wakeRef = useRef<() => void>(() => {});

    const worldRef = useRef<{
      bufA: Float32Array;
      bufB: Float32Array;
    }>({
      bufA: new Float32Array(SIM_SIZE * SIM_SIZE),
      bufB: new Float32Array(SIM_SIZE * SIM_SIZE),
    });

    const depositSim = (cx: number, cy: number, radius: number, amount: number) => {
      const { bufA } = worldRef.current;
      const x0 = Math.max(1, Math.floor(cx - radius));
      const x1 = Math.min(SIM_SIZE - 2, Math.ceil(cx + radius));
      const y0 = Math.max(1, Math.floor(cy - radius));
      const y1 = Math.min(SIM_SIZE - 2, Math.ceil(cy + radius));
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const d = Math.hypot(x - cx, y - cy);
          if (d <= radius) bufA[y * SIM_SIZE + x] += amount * (1 - d / radius);
        }
      }
    };

    useImperativeHandle(ref, () => ({
      rippleAt: (clientX: number, clientY: number, radius = 4.5, amount = 40) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const r = canvas.getBoundingClientRect();
        // Map client coords into the letterboxed sim space
        const simOnCanvas = getSimRect(r.width, r.height);
        const sx = ((clientX - r.left - simOnCanvas.x) / simOnCanvas.w) * SIM_SIZE;
        const sy = ((clientY - r.top - simOnCanvas.y) / simOnCanvas.h) * SIM_SIZE;
        if (sx < 0 || sx >= SIM_SIZE || sy < 0 || sy >= SIM_SIZE) return;
        depositSim(sx, sy, radius, amount);
        wakeRef.current();
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let bufA = worldRef.current.bufA;
      let bufB = worldRef.current.bufB;

      const offscreen = document.createElement("canvas");
      offscreen.width = SIM_SIZE;
      offscreen.height = SIM_SIZE;
      const offCtx = offscreen.getContext("2d")!;
      const ctx = canvas.getContext("2d")!;
      if (!offCtx || !ctx) return;
      const imageData = offCtx.createImageData(SIM_SIZE, SIM_SIZE);
      const data = imageData.data;

      const resize = () => {
        const r = container.getBoundingClientRect();
        const dpr = Math.min(devicePixelRatio || 1, 2);
        canvas.width = Math.max(1, Math.round(r.width * dpr));
        canvas.height = Math.max(1, Math.round(r.height * dpr));
        canvas.style.width = `${r.width}px`;
        canvas.style.height = `${r.height}px`;
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(container);

      let visible = true;
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
      io.observe(container);

      let raf = 0;
      let frameCount = 0;
      let lastFrameTime = 0;
      let running = false;

      const tick = (time: number) => {
        if (!visible) { running = false; return; }
        if (time - lastFrameTime < FRAME_INTERVAL) {
          raf = requestAnimationFrame(tick);
          return;
        }
        lastFrameTime = time;
        frameCount += 1;

        // wave propagation
        for (let y = 1; y < SIM_SIZE - 1; y++) {
          const row = y * SIM_SIZE;
          for (let x = 1; x < SIM_SIZE - 1; x++) {
            const i = row + x;
            bufB[i] = ((bufA[i - 1] + bufA[i + 1] + bufA[i - SIM_SIZE] + bufA[i + SIM_SIZE]) / 2 - bufB[i]) * DAMPING;
          }
        }
        const tmp = bufA; bufA = bufB; bufB = tmp;
        worldRef.current.bufA = bufA;
        worldRef.current.bufB = bufB;

        // shade to grayscale
        for (let y = 1; y < SIM_SIZE - 1; y++) {
          const row = y * SIM_SIZE;
          for (let x = 1; x < SIM_SIZE - 1; x++) {
            const i = row + x;
            const dx = bufA[i - 1] - bufA[i + 1];
            const dy = bufA[i - SIM_SIZE] - bufA[i + SIM_SIZE];
            let shade = (dx * 0.7 + dy * 0.7) * 0.07;
            shade = Math.max(-0.25, Math.min(0.25, shade));
            const v = 128 + Math.round(shade * 255);
            const p = i * 4;
            data[p] = data[p + 1] = data[p + 2] = v;
            data[p + 3] = 255;
          }
        }
        offCtx.putImageData(imageData, 0, 0);

        // Draw the square sim centered within the visible canvas,
        // preserving 1:1 aspect ratio (no stretch = circular ripples)
        ctx.imageSmoothingEnabled = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const simRect = getSimRect(canvas.width, canvas.height);
        ctx.drawImage(offscreen, simRect.x, simRect.y, simRect.w, simRect.h);
        if (frameCount < MAX_FRAMES) raf = requestAnimationFrame(tick);
        else running = false;
      };

      wakeRef.current = () => {
        frameCount = 0;
        if (!running) { running = true; raf = requestAnimationFrame(tick); }
      };

      if (prefersReducedMotion) {
        // One frame only — no continuous loop. Draw calm canvas once.
        offCtx.putImageData(imageData, 0, 0);
        const simRect = getSimRect(canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(offscreen, simRect.x, simRect.y, simRect.w, simRect.h);
        return () => {
          ro.disconnect();
          io.disconnect();
        };
      }

      return () => {
        cancelAnimationFrame(raf);
        wakeRef.current = () => {};
        ro.disconnect();
        io.disconnect();
      };
    }, []);

    return (
      <div
        ref={containerRef}
        className={`relative w-full ${heightClassName} overflow-hidden ${className}`}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ mixBlendMode: "soft-light" }}
        />
      </div>
    );
  }
);

/**
 * Compute the centered rect for a square sim inside a rect of any aspect ratio.
 *
 * The sim is sized to the larger dimension so the effect can span the full
 * width on landscape layouts and the full height on portrait layouts while
 * preserving circular ripples by keeping the simulation square.
 */
export function getSimRect(containerW: number, containerH: number) {
  const size = Math.max(containerW, containerH);
  return {
    x: (containerW - size) / 2,
    y: (containerH - size) / 2,
    w: size,
    h: size,
  };
}

WaterRippleSection.displayName = "WaterRippleSection";
export default WaterRippleSection;
