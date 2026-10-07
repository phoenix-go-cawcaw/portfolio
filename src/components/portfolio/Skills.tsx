import { useRef } from "react";
import SectionHeader from "./SectionHeader";
import BrushDivider from "./BrushDivider";
import Reveal from "@/components/Reveal";
import WaterRippleSection, { type WaterRippleHandle } from "./WaterRippleSection";

const skills = [
  { zh: "构", title: "Front-end Architecture", desc: "Polished React & TypeScript experiences with responsive motion." },
  { zh: "系", title: "Design Systems", desc: "Reusable patterns that feel intentional, accessible, and alive." },
  { zh: "动", title: "Animation & Motion", desc: "Parallax, timing, and fluid transitions tuned for elegant journeys." },
  { zh: "速", title: "Performance", desc: "Minimal bundles, fast loading, silky runtime across devices." },
  { zh: "意", title: "Visual Storytelling", desc: "Chinese textures, poetic spacing, cinematic web compositions." },
  { zh: "合", title: "Collaboration", desc: "Clear communication, product focus, thoughtful teamwork." },
];

const Skills = () => {
  const rippleRef = useRef<WaterRippleHandle>(null);

  return (
    <section id="skills" className="section-snap relative overflow-hidden bg-background">
      {/* Ripple canvas — invisible (transparent) until a card is hovered */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <WaterRippleSection ref={rippleRef} heightClassName="h-full" className="border-0 rounded-none" />
      </div>

      <div className="container-elegant relative z-10">
        <SectionHeader number="一" titleEn="Skills & Expertise" titleZh="技艺" />
        <Reveal>
          <BrushDivider className="mb-12" />
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {skills.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div
                className="paper-card p-7 h-full flex flex-col"
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  rippleRef.current?.rippleAt(
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2,
                    4.5,
                    35
                  );
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="font-zh text-3xl font-bold text-ink leading-none">{s.zh}</span>
                  <span className="font-zh-sans text-[0.6rem] tracking-[0.3em] uppercase text-ink-muted mt-1">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-en text-xl font-medium text-ink mb-2">{s.title}</h3>
                <p className="font-en text-base text-ink-muted leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
