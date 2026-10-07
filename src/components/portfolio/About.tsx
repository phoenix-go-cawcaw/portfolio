import SectionHeader from "./SectionHeader";
import Reveal from "../Reveal";
import CloudReveal from "./CloudReveal";

const About = () => {
  return (
    <section id="about" className="section-snap relative overflow-hidden">
      <div className="container-elegant relative z-10">
        <SectionHeader number="一" titleEn="Philosophy & Practice" titleZh="道与行" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-4">
            <div className="paper-card p-4 md:p-6 text-center space-y-3 md:space-y-4">
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
          </div>

          <div className="lg:col-span-8 space-y-4 md:space-y-5">
            <Reveal delay={80}>
              <p className="font-en text-sm sm:text-base lg:text-lg leading-relaxed text-ink-soft">
                Phoenix blends modern web craft with ink-wash sensibility to create interfaces
                that feel calm, precise, and alive.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="font-en text-sm sm:text-base lg:text-lg leading-relaxed text-ink-soft">
                Each project is composed like a scroll: deliberate layouts, motion, and interaction
                in thoughtful balance.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="font-en text-sm sm:text-base lg:text-lg leading-relaxed text-ink-soft">
                From architecture to animation, the goal is a quiet digital narrative that feels
                both modern and timeless.
              </p>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;