import { useEffect, useMemo, useRef, useState } from "react";
import Cranes from "./Cranes";
import { scrollToId } from "../../lib/lenisController";
import { ridgePath } from "../../lib/ridgePath";

// Per-layer scroll speed and mouse-parallax strength, farthest → closest
const LAYER_SCROLL_SPEED = [0.04, 0.07, 0.11, 0.16, 0.22, 0.3];
const LAYER_MOUSE_STRENGTH = [2, 4, 7, 11, 16, 22];

// Ridge points per layer (x, y) — farthest (subtle, high) to closest
// (bold, low). Fed through ridgePath() for smooth ink-brush curves
// instead of a geometric zigzag.
const LAYER_POINTS: [number, number][][] = [
  [[0, 245], [160, 215], [320, 235], [480, 205], [640, 230], [800, 210], [960, 238], [1120, 218], [1280, 240], [1440, 225]],
  [[0, 280], [160, 250], [320, 270], [480, 240], [640, 265], [800, 245], [960, 272], [1120, 252], [1280, 275], [1440, 258]],
  [[0, 315], [160, 282], [320, 308], [480, 278], [640, 305], [800, 280], [960, 310], [1120, 285], [1280, 312], [1440, 290]],
  [[0, 350], [160, 308], [320, 340], [480, 300], [640, 335], [800, 302], [960, 342], [1120, 310], [1280, 345], [1440, 315]],
  [[0, 388], [160, 332], [320, 375], [480, 325], [640, 368], [800, 328], [960, 378], [1120, 335], [1280, 382], [1440, 340]],
  [[0, 430], [160, 352], [320, 410], [480, 345], [640, 400], [800, 350], [960, 415], [1120, 358], [1280, 420], [1440, 365]],
];
const LAYER_TOP_OPACITY = [0.1, 0.14, 0.18, 0.22, 0.28, 0.34];
const LAYER_BOTTOM_OPACITY = [0.02, 0.03, 0.04, 0.05, 0.06, 0.08];

const Hero = () => {
  const layerRefs = useRef<(SVGPathElement | null)[]>([]);
  const mistRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const mouseXRef = useRef(0);

  // Smooth ink-brush ridgelines, computed once.
  const layerPaths = useMemo(
    () => LAYER_POINTS.map((points) => ridgePath(points, 460)),
    []
  );

  useEffect(() => {
    let raf = 0;
    let target = 0;
    let current = 0;

    const onScroll = () => {
      target = window.scrollY;
    };

    const onMouseMove = (e: MouseEvent) => {
      // Normalize to roughly -1..1 across the viewport width
      mouseXRef.current = (e.clientX / window.innerWidth - 0.5) * 2;
    };

    const start = performance.now();

    const tick = (now: number) => {
      // Lerp toward target for buttery-smooth, jitter-free motion
      current += (target - current) * 0.08;

      // Slow, ambient drift that lives independently of scroll
      const elapsed = (now - start) / 1000;
      const driftY = Math.sin(elapsed * 0.18) * 6;       // gentle vertical sway
      const driftX = Math.sin(elapsed * 0.12) * 4;       // gentle lateral sway
      const sealDrift = Math.sin(elapsed * 0.22) * 1.4;  // tiny seal breath

      // Six mountain layers, each with its own scroll speed and mouse
      // parallax strength — closer layers (higher index) move more.
      layerRefs.current.forEach((layer, i) => {
        if (!layer) return;
        const ty = current * LAYER_SCROLL_SPEED[i] + driftY * (0.4 + i * 0.12);
        const tx = driftX * (0.5 + i * 0.1) + mouseXRef.current * LAYER_MOUSE_STRENGTH[i];
        layer.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      });

      if (contentRef.current) {
        const t = Math.min(current / 600, 1);
        contentRef.current.style.transform = `translate3d(0, ${current * 0.15}px, 0)`;
        contentRef.current.style.opacity = `${1 - t * 0.6}`;
      }
      if (sealRef.current) {
        sealRef.current.style.transform = `translate3d(0, ${current * -0.08 + sealDrift}px, 0) rotate(-4deg)`;
      }
      if (mistRef.current) {
        // Drift mist horizontally on its own slow rhythm, plus light parallax
        const mistX = Math.sin(elapsed * 0.05) * 30 + Math.cos(elapsed * 0.03) * 18;
        const mistY = current * 0.12 + Math.sin(elapsed * 0.08) * 4;
        mistRef.current.style.transform = `translate3d(${mistX}px, ${mistY}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Six-layer mountain parallax — farthest (subtlest, top) to closest (boldest, bottom) */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-[58%] pointer-events-none opacity-80"
        viewBox="0 0 1440 460"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mistfade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0" />
          </linearGradient>
          <filter id="soft1"><feGaussianBlur stdDeviation="2.5" /></filter>
          <filter id="soft2"><feGaussianBlur stdDeviation="1.2" /></filter>
          {layerPaths.map((_, i) => (
            <linearGradient key={i} id={`mtn-grad-${i}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--ink))" stopOpacity={LAYER_TOP_OPACITY[i]} />
              <stop offset="100%" stopColor="hsl(var(--ink))" stopOpacity={LAYER_BOTTOM_OPACITY[i]} />
            </linearGradient>
          ))}
        </defs>

        {layerPaths.map((d, i) => (
          <path
            key={i}
            ref={(el) => (layerRefs.current[i] = el)}
            className="will-change-transform"
            d={d}
            fill={`url(#mtn-grad-${i})`}
            filter={i === 0 ? "url(#soft1)" : i === 1 ? "url(#soft2)" : undefined}
          />
        ))}

        <rect width="1440" height="120" y="330" fill="url(#mistfade)" />
      </svg>

      {/* Cranes gliding across the upper sky — vector-rigged, no image assets */}
      <Cranes />

      {/* Drifting mist layer — slower & independent of mountain parallax */}
      <svg
        ref={mistRef}
        className="absolute bottom-[28%] left-0 right-0 w-[120%] -ml-[10%] h-1/3 pointer-events-none opacity-60 will-change-transform"
        viewBox="0 0 1600 200"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="mistblur"><feGaussianBlur stdDeviation="6" /></filter>
          <radialGradient id="cloudgrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0.95" />
            <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g filter="url(#mistblur)">
          <ellipse cx="180" cy="110" rx="160" ry="22" fill="url(#cloudgrad)" />
          <ellipse cx="520" cy="80" rx="220" ry="26" fill="url(#cloudgrad)" />
          <ellipse cx="900" cy="120" rx="200" ry="20" fill="url(#cloudgrad)" />
          <ellipse cx="1240" cy="90" rx="240" ry="28" fill="url(#cloudgrad)" />
          <ellipse cx="1500" cy="130" rx="160" ry="18" fill="url(#cloudgrad)" />
        </g>
      </svg>

      {/* Vertical Chinese banner */}
      <div className="hidden md:flex absolute left-10 top-1/2 -translate-y-1/2 flex-col gap-4 font-zh text-base font-light text-ink-muted">
        <span>笔</span><span>墨</span><span>之</span><span>间</span>
      </div>
      {/* <div className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col gap-4 font-zh text-base font-light text-ink-muted">
        <span>意</span><span>在</span><span>象</span><span>外</span>
      </div> */}

      <div ref={contentRef} className="relative z-10 text-center px-6 animate-fade-up will-change-transform">
        <p className="font-zh-sans text-[0.7rem] tracking-[0.55em] uppercase text-ink-muted mb-6">
          Portfolio · 作品集
        </p>

        <PhoenixTitle />

        <div className="mx-auto my-6 h-px w-20 bg-ink/30" />

        <p className="font-en italic text-lg md:text-xl text-ink-soft mb-2">
          Crafting modern interfaces with ink-wash spirit.
        </p>
        <p className="font-zh text-sm tracking-[0.3em] text-ink-muted">
          以技为笔 · 绘数字之美
        </p>

        <div className="mt-12 flex items-center justify-center gap-5">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("projects", -64);
            }}
            className="font-zh-sans text-xs tracking-[0.3em] uppercase border border-ink/40 px-6 py-3 hover:bg-ink hover:text-primary-foreground transition-colors"
          >
            View Works
          </a>
          <a
            href="/PhoenixChungCV.pdf"
            download
            className="font-zh-sans text-xs tracking-[0.3em] uppercase border border-seal text-seal px-6 py-3 hover:bg-seal hover:text-seal-foreground transition-colors"
          >
            Download CV
          </a>
        </div>
      </div>

      {/* Seal in corner */}
      <div ref={sealRef} className="absolute bottom-12 right-8 md:right-16 animate-scale-in will-change-transform">
        <div className="seal">
          <div className="seal-grid">
            <span>凤</span><span>凰</span>
            <span>作</span><span>集</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

/* ---------------- Phoenix igniting title ---------------- */
const PhoenixTitle = () => {
  const [igniting, setIgniting] = useState(false);
  const [embers, setEmbers] = useState<{ id: number; x: number; dx: number; dy: number; dur: number }[]>([]);

  const ignite = () => {
    if (igniting) return;
    setIgniting(true);
    const next = Array.from({ length: 22 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100, // % across title
      dx: (Math.random() - 0.5) * 80,
      dy: -(80 + Math.random() * 120),
      dur: 1100 + Math.random() * 700,
    }));
    setEmbers(next);
    window.setTimeout(() => {
      setIgniting(false);
      setEmbers([]);
    }, 1500);
  };

  return (
    <h1
      onClick={ignite}
      className={`phoenix-title font-en text-7xl md:text-[8.5rem] font-light tracking-[0.08em] leading-none text-ink ink-shadow ${
        igniting ? "igniting" : ""
      }`}
    >
      PHOENIX
      {embers.map((e) => (
        <span
          key={e.id}
          className="ember igniting"
          style={
            {
              left: `${e.x}%`,
              bottom: "10%",
              "--ember-x": `${e.dx}px`,
              "--ember-y": `${e.dy}px`,
              "--ember-dur": `${e.dur}ms`,
            } as React.CSSProperties
          }
        />
      ))}
    </h1>
  );
};