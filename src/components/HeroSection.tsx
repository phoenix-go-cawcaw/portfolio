import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { createFloatingAnimation, createPulseAnimation } from "@/lib/gsapUtils";

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const heroSymbolsRef = useRef<HTMLDivElement>(null);
  const heroSunRef = useRef<HTMLDivElement>(null);
  const fengHuangRef = useRef<SVGSVGElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    const tl = gsap.timeline({ delay: 0.3 });

    const symbols = heroSymbolsRef.current?.querySelectorAll("span");
    if (symbols) {
      tl.fromTo(
        symbols,
        { opacity: 0, y: -20, rotation: -10 },
        { opacity: 0.3, y: 0, rotation: 0, duration: 1, stagger: 0.15, ease: "back.out(1.7)" },
        0
      );
    }

    tl.fromTo(
      ".hero-title-wrap",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
      0.2
    );

    tl.fromTo(
      ".hero-name",
      { letterSpacing: "-0.05em" },
      { letterSpacing: "0.12em", duration: 0.8, ease: "power2.out" },
      0.2
    );

    tl.fromTo(
      ".hero-subtitle",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
      0.2
    );

    if (scrollHintRef.current) {
      tl.fromTo(
        scrollHintRef.current,
        { opacity: 0, y: -10 },
        { opacity: 0.35, y: 0, duration: 0.8, ease: "power2.out" },
        0.8
      );

      createFloatingAnimation(scrollHintRef.current, 8, 2.5);
    }

    if (heroSunRef.current) {
      createFloatingAnimation(heroSunRef.current, 15, 4);
    }

    if (fengHuangRef.current) {
      createPulseAnimation(fengHuangRef.current, 1.08, 0.4);
    }

  }, []);

  const handlePhoenixClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    gsap.to(e.currentTarget, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    const sparkEmojis = ["🔥", "✨", "💫", "⚡"];
    
    for (let i = 0; i < 12; i++) {
      const spark = document.createElement("div");
      spark.className = "spark spark-particle";
      spark.textContent = sparkEmojis[Math.floor(Math.random() * sparkEmojis.length)];
      
      const angle = (Math.random() * Math.PI * 2);
      const velocity = 50 + Math.random() * 80;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity - 120;
      
      spark.style.left = x + "px";
      spark.style.top = y + "px";
      spark.style.setProperty("--tx", `${tx}px`);
      spark.style.setProperty("--ty", `${ty}px`);
      
      document.body.appendChild(spark);
      
      setTimeout(() => spark.remove(), 1500);
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-mist" />
      <div className="hero-sun" ref={heroSunRef} />
      <div className="hero-symbols" ref={heroSymbolsRef}>
        <span>龙</span>
        <span>云</span>
        <span>风</span>
      </div>

      <svg
        className="hero-mountains"
        viewBox="0 0 1440 400"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <filter id="hb1"><feGaussianBlur stdDeviation="1" /></filter>
          <filter id="hb2"><feGaussianBlur stdDeviation="4" /></filter>
          <filter id="hb3"><feGaussianBlur stdDeviation="12" /></filter>
        </defs>
        <path
          d="M0,300 L60,200 L120,240 L180,170 L260,210 L340,155 L420,195 L500,140 L580,180 L660,145 L740,175 L820,155 L900,190 L980,160 L1060,185 L1140,165 L1220,188 L1300,170 L1380,180 L1440,175 L1440,400 L0,400 Z"
          fill="rgba(100,110,100,0.12)"
          filter="url(#hb3)"
        />
        <path
          d="M0,330 L80,255 L140,280 L200,240 L280,265 L350,235 L420,258 L490,225 L560,248 L640,232 L720,252 L800,238 L880,255 L960,240 L1040,258 L1120,242 L1200,260 L1300,248 L1440,255 L1440,400 L0,400 Z"
          fill="rgba(70,85,68,0.18)"
          filter="url(#hb2)"
        />
        <path
          d="M0,360 L100,320 L180,338 L260,310 L360,328 L450,315 L540,330 L640,318 L740,330 L840,320 L940,335 L1040,322 L1140,338 L1240,325 L1340,335 L1440,325 L1440,400 L0,400 Z"
          fill="rgba(45,60,42,0.25)"
          filter="url(#hb1)"
        />
        <path
          d="M0,380 Q360,370 720,378 Q1080,386 1440,375 L1440,400 L0,400 Z"
          fill="rgba(30,50,28,0.3)"
        />
        <rect x="0" y="260" width="1440" height="60" fill="rgba(245,242,235,0.4)" filter="url(#hb3)" />
        <rect x="0" y="330" width="1440" height="40" fill="rgba(242,240,232,0.3)" filter="url(#hb3)" />
      </svg>

      <div
        className={`hero-title-wrap transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="hero-subtitle">Portfolio · 作品集</p>
        <h1 className="hero-name" data-translation="凤凰" onClick={handlePhoenixClick}>
          PHOENIX
        </h1>
        <div className="hero-divider" />
        <p className="hero-desc">Crafting modern interfaces with ink-wash spirit.</p>
        <p className="hero-tagline">以技为笔，绘数字之美</p>
      </div>

      <svg className="feng-huang-seal" ref={fengHuangRef} viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg" aria-label="凤凰 seal">
        <defs>
          <filter id="sealTexture">
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="sealSoften">
            <feGaussianBlur stdDeviation="0.35" />
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 1" />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect x="4" y="4" width="80" height="80" rx="2" fill="#c0392b" filter="url(#sealTexture)" />
        <rect x="8" y="8" width="72" height="72" rx="1" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
        <rect x="5.5" y="5.5" width="77" height="77" rx="2" fill="none" stroke="#a5251c" strokeWidth="2.2" filter="url(#sealTexture)" />
        <text
          x="44"
          y="30"
          fontFamily="'Noto Serif SC', serif"
          fontSize="29"
          fontWeight="700"
          fill="#fffaf2"
          textAnchor="middle"
          dominantBaseline="middle"
          filter="url(#sealSoften)"
        >
          凤
        </text>
        <text
          x="44"
          y="59"
          fontFamily="'Noto Serif SC', serif"
          fontSize="29"
          fontWeight="700"
          fill="#fffaf2"
          textAnchor="middle"
          dominantBaseline="middle"
          filter="url(#sealSoften)"
        >
          凰
        </text>
        <path d="M18 17h52M18 44h52M18 71h52" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
        <circle cx="12" cy="13" r="2" fill="rgba(255,255,255,0.12)" />
        <circle cx="77" cy="76" r="1.6" fill="rgba(120,15,10,0.25)" />
        <rect x="10" y="74" width="9" height="3" rx="1" fill="rgba(255,255,255,0.1)" />
      </svg>

      <div className={`scroll-hint transition-opacity duration-1000 ${mounted ? "opacity-35" : "opacity-0"}`} ref={scrollHintRef}>
        <span>展开</span>
        <div className="scroll-hint-line" />
      </div>
    </section>
  );
};

export default HeroSection;
