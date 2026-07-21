import { useMemo } from "react";
import SectionHeader from "./SectionHeader";
import BrushDivider from "./BrushDivider";
import Reveal from "../Reveal";
import CloudReveal from "./CloudReveal";
import KoiPond from "./KoiPond";
import DistantDragon from "./DistantDragon";
import { ridgePath } from "../../lib/ridgePath";

// A single faint, distant ridgeline for the village — the dragon (drawn
// beneath it) dips behind this shape as it drifts, so it reads as
// "circling behind the mountains" rather than floating in empty space.
const VILLAGE_RIDGE: [number, number][] = [
  [0, 150], [200, 108], [400, 142], [600, 92], [800, 132], [1000, 98], [1200, 138], [1440, 112],
];

const About = () => {
  const ridgeD = useMemo(() => ridgePath(VILLAGE_RIDGE, 200), []);

  return (
    <section id="about" className="section-pad relative overflow-hidden">
      {/* Village backdrop: faint ridge + occasional dragon behind it */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none" aria-hidden="true">
        <DistantDragon />
        <svg
          className="absolute inset-x-0 bottom-0 w-full h-full"
          viewBox="0 0 1440 200"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={ridgeD} fill="hsl(var(--ink) / 0.055)" />
        </svg>
      </div>

      <div className="container-elegant relative z-10">
        <SectionHeader number="一" titleEn="Philosophy & Practice" titleZh="道与行" />
        <Reveal>
          <BrushDivider className="mb-12" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <Reveal className="md:col-span-4">
            <div className="paper-card p-8 text-center space-y-6">
              <CloudReveal />
              <div>
                <div className="font-zh text-4xl font-light text-ink/25 leading-none mb-2">道</div>
                <div className="font-zh-sans text-[0.65rem] tracking-[0.4em] uppercase text-ink-muted">
                  The Way
                </div>
                <div className="my-5 mx-auto h-px w-10 bg-ink/20" />
                <p className="font-en italic text-base text-ink-soft">
                  "Quiet craft, deliberate motion."
                </p>
              </div>
            </div>
          </Reveal>

          <div className="md:col-span-8 space-y-6">
            <Reveal delay={80}>
              <p className="font-en text-lg leading-relaxed text-ink-soft">
                Phoenix blends modern web craftsmanship with ink-wash sensibility. Interfaces are
                built not only to function, but to feel calm, precise, and alive.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="font-en text-lg leading-relaxed text-ink-soft">
                Every project is treated like a scroll of paper: each layout, motion and interaction
                composed with deliberate restraint and poetic balance.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="font-en text-lg leading-relaxed text-ink-soft">
                From architecture to animation, the goal is digital work that reads like a quiet
                narrative — a portfolio that feels both modern and timeless.
              </p>
            </Reveal>

            <Reveal delay={320} className="pt-4">
              <div className="paper-card p-6 max-w-md">
                <p className="font-zh-sans text-[0.6rem] tracking-[0.35em] uppercase text-ink-muted mb-3">
                  the village pond
                </p>
                <KoiPond />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;