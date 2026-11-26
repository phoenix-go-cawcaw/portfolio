import SectionHeader from "./SectionHeader";
import Reveal from "../Reveal";

const About = () => {
  return (
    <section id="about" className="section-snap relative overflow-hidden">
      <div className="container-elegant relative z-10">
        <SectionHeader number="一" titleEn="Philosophy & Practice" titleZh="道与行" />

        <Reveal delay={80} className="philosophy-paper">
          <p className="font-en text-base sm:text-lg md:text-xl leading-relaxed md:leading-relaxed text-ink-soft">
            Approaching software as a modern expression of
            ink and craft: balanced, intentional, and quietly resilient. I create responsive,
            accessible digital experiences with modern web technologies and database-driven
            interfaces, bringing end-to-end quality assurance to every detail. By tracing bugs,
            testing edge cases, and refining interaction with care, I turn complex ideas into
            polished, reliable products that honour tradition while moving confidently into
            the digital future.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default About;