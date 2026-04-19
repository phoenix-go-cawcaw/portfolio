import SectionHeader from "./SectionHeader";
import BrushDivider from "./BrushDivider";
import RevealOnScroll from "./RevealOnScroll";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const gemIcons: Record<string, JSX.Element> = {
  jade: (
    <svg className="gem-icon" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 3 L36 11 L36 33 L22 41 L8 33 L8 11 Z" stroke="rgba(30,90,75,0.7)" strokeWidth="1.2" fill="rgba(60,160,130,0.25)" />
      <path d="M22 3 L36 11 L22 19 L8 11 Z" fill="rgba(100,200,175,0.35)" />
      <path d="M22 19 L36 11 L36 33 L22 41 Z" fill="rgba(30,100,80,0.2)" />
      <path d="M22 19 L8 11 L8 33 L22 41 Z" fill="rgba(70,170,145,0.15)" />
      <line x1="22" y1="3" x2="22" y2="41" stroke="rgba(150,230,210,0.4)" strokeWidth="0.5" />
    </svg>
  ),
  gold: (
    <svg className="gem-icon" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 4 L27 16 L40 16 L30 24 L34 37 L22 29 L10 37 L14 24 L4 16 L17 16 Z" stroke="rgba(150,90,0,0.6)" strokeWidth="1.2" fill="rgba(230,175,30,0.3)" />
      <path d="M22 4 L27 16 L17 16 Z" fill="rgba(255,240,120,0.5)" />
      <path d="M22 4 L17 16 L4 16 L14 24 Z" fill="rgba(200,145,10,0.2)" />
      <path d="M22 4 L27 16 L40 16 L30 24 Z" fill="rgba(250,220,80,0.3)" />
    </svg>
  ),
  quartz: (
    <svg className="gem-icon" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 2 L30 10 L38 10 L38 34 L30 34 L22 42 L14 34 L6 34 L6 10 L14 10 Z" stroke="rgba(100,60,180,0.6)" strokeWidth="1.2" fill="rgba(180,140,240,0.22)" />
      <path d="M22 2 L30 10 L22 18 L14 10 Z" fill="rgba(230,210,255,0.45)" />
      <path d="M22 18 L30 10 L38 10 L38 34 L30 34 L22 42 Z" fill="rgba(150,100,220,0.2)" />
      <path d="M22 18 L14 10 L6 10 L6 34 L14 34 L22 42 Z" fill="rgba(200,170,255,0.15)" />
      <circle cx="22" cy="22" r="4" stroke="rgba(140,90,210,0.5)" strokeWidth="0.8" fill="rgba(230,215,255,0.4)" />
    </svg>
  ),
  silver: (
    <svg className="gem-icon" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="22" cy="22" rx="16" ry="19" stroke="rgba(60,110,150,0.6)" strokeWidth="1.2" fill="rgba(140,195,225,0.2)" />
      <ellipse cx="22" cy="22" rx="10" ry="13" stroke="rgba(60,110,150,0.3)" strokeWidth="0.6" fill="none" />
      <path d="M10 16 Q22 11 34 16" stroke="rgba(100,170,210,0.6)" strokeWidth="1" fill="none" />
      <path d="M7 22 Q22 17 37 22" stroke="rgba(80,150,195,0.4)" strokeWidth="0.8" fill="none" />
      <path d="M10 28 Q22 33 34 28" stroke="rgba(60,120,165,0.35)" strokeWidth="0.7" fill="none" />
    </svg>
  ),
};

const skills = [
  {
    gem: "jade",
    name: "Jade",
    title: "Front-end Architecture",
    desc: "Crafting polished React and TypeScript experiences with responsive motion.",
    badge: "Modern",
  },
  {
    gem: "jade",
    name: "Jade",
    title: "Design Systems",
    desc: "Building reusable patterns that feel intentional, accessible, and alive.",
    badge: "Refined",
  },
  {
    gem: "gold",
    name: "Gold",
    title: "Animation & Motion",
    desc: "Parallax, timing, and fluid transitions tuned for elegant scroll journeys.",
    badge: "Dynamic",
  },
  {
    gem: "gold",
    name: "Gold",
    title: "Performance",
    desc: "Minimal bundles, fast loading, and silky runtime behavior across devices.",
    badge: "Fast",
  },
  {
    gem: "quartz",
    name: "Quartz",
    title: "Visual Storytelling",
    desc: "Chinese textures, poetic spacing, and cinematic compositions for the web.",
    badge: "Artful",
  },
  {
    gem: "silver",
    name: "Silver",
    title: "Collaboration",
    desc: "Clear communication, product focus, and thoughtful teamwork at every stage.",
    badge: "Trusted",
  },
];

const SkillsSection = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;

      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          boxShadow: "0 30px 60px rgba(192, 57, 43, 0.25)",
          duration: 0.4,
          ease: "power2.out",
        });

        const gemName = card.querySelector(".gem-name") as HTMLElement;
        const gemTitle = card.querySelector(".gem-title") as HTMLElement;
        if (gemName) gsap.to(gemName, { opacity: 0.6, duration: 0.3 });
        if (gemTitle) gsap.to(gemTitle, { color: "rgba(192, 57, 43, 0.8)", duration: 0.3 });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          boxShadow: "0 10px 30px rgba(26, 15, 10, 0.1)",
          duration: 0.4,
          ease: "power2.out",
        });

        const gemName = card.querySelector(".gem-name") as HTMLElement;
        const gemTitle = card.querySelector(".gem-title") as HTMLElement;
        if (gemName) gsap.to(gemName, { opacity: 1, duration: 0.3 });
        if (gemTitle) gsap.to(gemTitle, { color: "var(--ink)", duration: 0.3 });
      });
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) {
          card.removeEventListener("mouseenter", () => {});
          card.removeEventListener("mouseleave", () => {});
        }
      });
    };
  }, []);

  return (
    <section className="section" id="skills">
      <div className="mist-overlay mist-top" />
      <svg className="skills-pine-branches" viewBox="0 0 180 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M160,0 Q140,40 155,80 Q130,60 100,90 Q135,90 130,130 Q100,110 70,140 Q115,135 105,180 Q80,160 50,195 Q100,185 90,240 Q65,220 40,260" />
        <path d="M155,80 Q165,65 175,55" />
        <path d="M100,90 Q85,75 80,60" />
        <path d="M130,130 Q148,115 158,100" />
        <path d="M70,140 Q55,125 50,110" />
        <path d="M105,180 Q120,162 132,150" />
      </svg>
      <div className="section-inner">
        <SectionHeader number="1" titleEn="Skills & Expertise" titleZh="技艺之碧玉" />
        <BrushDivider id="blur_ink_skills" />
        <div className="gems-grid">
          {skills.map((s, i) => (
            <RevealOnScroll key={i} delay={i * 0.08}>
              <div
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                className={`gem-card gem-${s.gem}`}
              >
                <div className="gem-highlight" />
                {gemIcons[s.gem]}
                <div className="gem-name">{s.name}</div>
                <div className="gem-title">{s.title}</div>
                <div className="gem-desc">{s.desc}</div>
                <span className="gem-badge">{s.badge}</span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
      <div className="mist-overlay mist-bottom" />
    </section>
  );
};

export default SkillsSection;
