import SectionHeader from "./SectionHeader";
import BrushDivider from "./BrushDivider";
import Reveal from "@/components/Reveal";

const About = () => (
  <section id="about" className="section-pad relative">
    <div className="container-elegant">
      <SectionHeader number="四" titleEn="Philosophy & Practice" titleZh="道与行" />
      <Reveal>
        <BrushDivider className="mb-12" />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <Reveal className="md:col-span-4">
          <div className="paper-card p-8 text-center">
            <div className="font-zh text-7xl font-light text-ink/20 leading-none mb-4">道</div>
            <div className="font-zh-sans text-[0.65rem] tracking-[0.4em] uppercase text-ink-muted">
              The Way
            </div>
            <div className="my-5 mx-auto h-px w-10 bg-ink/20" />
            <p className="font-en italic text-base text-ink-soft">
              "Quiet craft, deliberate motion."
            </p>
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
        </div>
      </div>
    </div>
  </section>
);

export default About;
