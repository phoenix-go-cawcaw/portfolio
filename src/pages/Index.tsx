import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxBackground from "@/components/ParallaxBackground";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import InkCursor from "@/components/InkCursor";

const Index = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const stageMap: { [key: string]: number } = { hero: 0, skills: 1, certifications: 2, about: 2, testimonials: 3, contact: 4 };
    let currentStage = -1;

    const setStage = (n: number) => {
      if (n === currentStage) return;
      currentStage = n;
      const stages = document.querySelectorAll('.bg-stage');
      stages.forEach((s, i) => s.classList.toggle('active', i === n));
    };

    const sectionIds = ['hero', 'skills', 'certifications', 'about', 'testimonials', 'contact'];
    const scrollTriggers: ScrollTrigger[] = [];
    const tweens: gsap.core.Tween[] = [];

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => setStage(stageMap[id]),
        onEnterBack: () => setStage(stageMap[id]),
      });
      scrollTriggers.push(trigger);
    });

    const mountains = document.querySelector<SVGElement>('.hero-mountains');
    if (mountains) {
      tweens.push(
        gsap.to(mountains, {
          y: 140,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
          },
        })
      );
    }

    const lanterns = document.getElementById('deco-lanterns');
    if (lanterns) {
      tweens.push(
        gsap.to(lanterns, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'bottom top',
            end: 'bottom center',
            scrub: true,
          },
        })
      );
    }

    setStage(0);

    return () => {
      scrollTriggers.forEach((trigger) => trigger.kill());
      tweens.forEach((tween) => tween.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden portfolio-body">
      <ParallaxBackground />
      <InkCursor />

      <div id="scroll-container" className="relative z-10">
        <HeroSection />
        <SkillsSection />
        <CertificationsSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />

        <footer className="portfolio-footer">
          <span>凤皇 · 作品集 · {new Date().getFullYear()}</span>
          <span className="ml-4 text-[0.6rem] tracking-[0.15em] opacity-60">笔墨之间，意在象外</span>
        </footer>
      </div>
    </div>
  );
};

export default Index;
