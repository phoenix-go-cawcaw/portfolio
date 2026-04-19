import SectionHeader from "./SectionHeader";
import RevealOnScroll from "./RevealOnScroll";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const philosophyCharRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (philosophyCharRef.current) {
      gsap.to(philosophyCharRef.current, {
        scrollTrigger: {
          trigger: philosophyCharRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
        opacity: 0.15,
        y: 20,
      });
    }

    paragraphsRef.current.forEach((para, i) => {
      if (!para) return;

      gsap.fromTo(
        para,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: para,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          ease: "power3.out",
        }
      );
    });
  }, []);

  return (
    <section className="section" id="about">
      <div className="mist-overlay mist-top" />
      <div className="section-inner">
        <SectionHeader number="3" titleEn="Philosophy & Practice" titleZh="道与行" />
        <div className="philosophy-wrap">
          <RevealOnScroll>
            <div className="philosophy-char" ref={philosophyCharRef}>
              Philosophy
            </div>
          </RevealOnScroll>
          <div className="philosophy-text">
            <RevealOnScroll>
              <div className="section-title-en">About</div>
              <div className="section-title-zh">关于我</div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <p
                ref={(el) => {
                  if (el) paragraphsRef.current[0] = el;
                }}
              >
                Phoenix blends modern web craftsmanship with ink-wash sensibility. Interfaces are built not only to function,
                but to feel calm, precise, and alive.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p
                ref={(el) => {
                  if (el) paragraphsRef.current[1] = el;
                }}
              >
                Every project is treated like a scroll of paper: every layout, motion and interaction is composed with deliberate
                restraint and poetic balance.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <p
                ref={(el) => {
                  if (el) paragraphsRef.current[2] = el;
                }}
              >
                From architecture to animation, the goal is to create digital work that reads like a quiet narrative — a portfolio
                that feels both modern and timeless.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </div>
      <div className="mist-overlay mist-bottom" />
    </section>
  );
};

export default AboutSection;