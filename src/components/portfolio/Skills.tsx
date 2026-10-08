import { useRef } from "react";
import WaterRippleSection, { type WaterRippleHandle } from "./WaterRippleSection";

const skills = [
  "Front-end Architecture",
  "Design Systems",
  "Animation & Motion",
  "Performance",
  "Visual Storytelling",
  "Collaboration",
];

const Skills = () => {
  const rippleRef = useRef<WaterRippleHandle>(null);

  return (
    <section aria-labelledby="skills-title">
      <div className="mb-3">
        <p className="font-zh-sans text-[0.6rem] tracking-[0.3em] uppercase text-ink-muted">技艺</p>
        <h3 id="skills-title" className="font-en text-2xl font-medium text-ink">Skills</h3>
      </div>

      <div className="skill-pond relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <WaterRippleSection ref={rippleRef} heightClassName="h-full" className="border-0 rounded-none" />
        </div>
        <div className="skill-stones relative z-10">
          {skills.map((skill) => (
            <button
              key={skill}
              type="button"
              className="skill-stone"
              onPointerEnter={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                rippleRef.current?.rippleAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 5, 38);
              }}
              onFocus={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                rippleRef.current?.rippleAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 5, 38);
              }}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
