import RevealOnScroll from "./RevealOnScroll";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  number: string;
  titleEn: string;
  titleZh: string;
}

const SectionHeader = ({ number, titleEn, titleZh }: SectionHeaderProps) => {
  const numberRef = useRef<HTMLDivElement>(null);
  const titleEnRef = useRef<HTMLDivElement>(null);
  const titleZhRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: numberRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      numberRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      0
    );

    tl.fromTo(
      titleEnRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
      0.1
    );

    tl.fromTo(
      titleZhRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
      0.2
    );

    tl.fromTo(
      lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
      0.3
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <RevealOnScroll>
      <div className="section-header">
        <div className="section-number" ref={numberRef}>
          {number}
        </div>
        <div>
          <div className="section-title-en" ref={titleEnRef}>
            {titleEn}
          </div>
          <div className="section-title-zh" ref={titleZhRef}>
            {titleZh}
          </div>
        </div>
        <div className="section-line" ref={lineRef} style={{ transformOrigin: "left" }} />
      </div>
    </RevealOnScroll>
  );
};

export default SectionHeader;
