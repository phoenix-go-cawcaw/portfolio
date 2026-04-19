import SectionHeader from "./SectionHeader";
import BrushDivider from "./BrushDivider";
import RevealOnScroll from "./RevealOnScroll";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const testimonials = [
  {
    text: "Phoenix translated a brief into an experience that felt both modern and rooted. Every scroll had weight, grace, and beautiful kinetic polish.",
    seal: "信",
    name: "Yun Li",
    role: "Product Lead · Pixel Studio",
  },
  {
    text: "The interface feels like a digital scroll: elegant, calm, and expressive. The motion and typography work together perfectly.",
    seal: "誉",
    name: "Mei Chen",
    role: "Creative Director · East Wave",
  },
  {
    text: "A rare blend of craftsmanship and technical clarity. The final delivery was polished, memorable, and beautifully restrained.",
    seal: "礼",
    name: "Jia Wen",
    role: "Founder · Silk Road Ventures",
  },
];

const TestimonialsSection = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;

      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -8,
          boxShadow: "0 25px 50px rgba(192, 57, 43, 0.2)",
          duration: 0.35,
          ease: "power2.out",
        });

        gsap.to(card.querySelector(".author-seal"), {
          scale: 1.15,
          rotation: 5,
          duration: 0.35,
          ease: "back.out(1.7)",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          boxShadow: "0 10px 30px rgba(26, 15, 10, 0.08)",
          duration: 0.35,
          ease: "power2.out",
        });

        gsap.to(card.querySelector(".author-seal"), {
          scale: 1,
          rotation: 0,
          duration: 0.35,
          ease: "back.out(1.7)",
        });
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
    <section className="section" id="testimonials">
      <div className="mist-overlay mist-top" />
      <div className="testimonials-floating-char" aria-hidden="true">
        信
      </div>
      <div className="section-inner">
        <SectionHeader number="4" titleEn="Testimonials" titleZh="口碑之流水" />
        <BrushDivider id="blur_ink_test" />
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <RevealOnScroll key={i} delay={i * 0.12}>
              <div
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                className="testimonial-card"
              >
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="author-seal">{t.seal}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-role">{t.role}</div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
      <div className="mist-overlay mist-bottom" />
    </section>
  );
};

export default TestimonialsSection;
