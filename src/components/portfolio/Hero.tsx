import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const mountainsRef = useRef<SVGSVGElement>(null);
  const mistRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let target = 0;
    let current = 0;

    const onScroll = () => {
      target = window.scrollY;
    };

    const start = performance.now();

    const tick = (now: number) => {
      current += (target - current) * 0.08;

      const elapsed = (now - start) / 1000;
      const driftY = Math.sin(elapsed * 0.18) * 6;
      const driftX = Math.sin(elapsed * 0.12) * 4;
      const sealDrift = Math.sin(elapsed * 0.22) * 1.4;

      if (mountainsRef.current) {
        mountainsRef.current.style.transform = `translate3d(${driftX}px, ${current * 0.25 + driftY}px, 0)`;
      }
      if (contentRef.current) {
        const t = Math.min(current / 600, 1);
        contentRef.current.style.transform = `translate3d(0, ${current * 0.15}px, 0)`;
        contentRef.current.style.opacity = `${1 - t * 0.6}`;
      }
      if (sealRef.current) {
        sealRef.current.style.transform = `translate3d(0, ${current * -0.08 + sealDrift}px, 0) rotate(-4deg)`;
      }
      if (mistRef.current) {
        const mistX = Math.sin(elapsed * 0.05) * 30 + Math.cos(elapsed * 0.03) * 18;
        const mistY = current * 0.12 + Math.sin(elapsed * 0.08) * 4;
        mistRef.current.style.transform = `translate3d(${mistX}px, ${mistY}px, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Mountains */}
      <svg
        ref={mountainsRef}
        className="absolute bottom-0 left-0 right-0 w-full h-1/2 pointer-events-none opacity-70 will-change-transform"
        viewBox="0 0 1440 400"
      >
        <defs>
          <linearGradient id="mistfade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0" />
          </linearGradient>
          <filter id="soft1"><feGaussianBlur stdDeviation="2" /></filter>
        </defs>

        <path
          d="M0,300 L120,230 L220,260 L340,200 L460,240 L580,200 L700,250 L820,210 L940,250 L1060,220 L1180,250 L1300,225 L1440,240 L1440,400 L0,400 Z"
          fill="hsl(var(--ink) / 0.10)"
          filter="url(#soft1)"
        />
        <path
          d="M0,340 L140,290 L260,310 L380,275 L500,300 L620,280 L740,305 L860,285 L980,308 L1100,290 L1220,310 L1340,295 L1440,305 L1440,400 L0,400 Z"
          fill="hsl(var(--ink) / 0.16)"
        />
        <rect width="1440" height="120" y="280" fill="url(#mistfade)" />
      </svg>

      {/* Mist */}
      <svg
        ref={mistRef}
        className="absolute bottom-[28%] left-0 right-0 w-[120%] -ml-[10%] h-1/3 pointer-events-none opacity-60 will-change-transform"
        viewBox="0 0 1600 200"
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

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-6 will-change-transform">
        <p className="font-zh-sans text-[0.7rem] tracking-[0.55em] uppercase text-ink-muted mb-6">
          Portfolio · 作品集
        </p>

        <PhoenixTitle />

        <div className="mx-auto my-6 h-px w-20 bg-ink/30" />

        <p className="font-en italic text-lg md:text-xl text-ink-soft mb-2">
          Crafting modern interfaces with ink-wash spirit.
        </p>

        <div className="mt-12 flex items-center justify-center gap-5">
          <a href="#projects" className="border px-6 py-3">
            View Works
          </a>
        </div>
      </div>

      {/* Seal */}
      <div ref={sealRef} className="absolute bottom-12 right-8">
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

// Ignition animation
const PhoenixTitle = () => {
  const [igniting, setIgniting] = useState(false);
  const [embers, setEmbers] = useState<any[]>([]);

  const ignite = () => {
    if (igniting) return;

    setIgniting(true);

    const next = Array.from({ length: 22 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      dx: (Math.random() - 0.5) * 80,
      dy: -(80 + Math.random() * 120),
      dur: 1100 + Math.random() * 700,
    }));

    setEmbers(next);

    setTimeout(() => {
      setIgniting(false);
      setEmbers([]);
    }, 1500);
  };

  return (
    <h1
      onClick={ignite}
      className={`phoenix-title text-7xl md:text-[8.5rem] ${
        igniting ? "igniting" : ""
      }`}
    >
      PHOENIX

      {embers.map((e) => (
        <span
          key={e.id}
          className="ember"
          style={{
            left: `${e.x}%`,
            bottom: "10%",
            ["--ember-x" as any]: `${e.dx}px`,
            ["--ember-y" as any]: `${e.dy}px`,
            ["--ember-dur" as any]: `${e.dur}ms`,
          }}
        />
      ))}
    </h1>
  );
};