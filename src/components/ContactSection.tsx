import RevealOnScroll from "./RevealOnScroll";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const ContactSection = () => {
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    linksRef.current.forEach((link) => {
      if (!link) return;

      link.addEventListener("mouseenter", () => {
        gsap.to(link, {
          scale: 1.1,
          color: "rgba(192, 57, 43, 1)",
          textShadow: "0 0 15px rgba(192, 57, 43, 0.6)",
          duration: 0.3,
          ease: "back.out(1.5)",
        });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(link, {
          scale: 1,
          color: "rgba(26, 15, 10, 0.5)",
          textShadow: "none",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    return () => {
      linksRef.current.forEach((link) => {
        if (link) {
          link.removeEventListener("mouseenter", () => {});
          link.removeEventListener("mouseleave", () => {});
        }
      });
    };
  }, []);

  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <RevealOnScroll>
          <div className="contact-title">Contact</div>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <div className="contact-sub">联系我</div>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <div className="contact-links">
            <a
              ref={(el) => {
                if (el) linksRef.current[0] = el;
              }}
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jojoeydenver@gmail.com"
              className="contact-link"
              target="_blank"
              rel="noreferrer"
            >
              Email
            </a>
            <a
              ref={(el) => {
                if (el) linksRef.current[1] = el;
              }}
              href="#"
              className="contact-link"
            >
              LinkedIn
            </a>
            <a
              ref={(el) => {
                if (el) linksRef.current[2] = el;
              }}
              href="https://github.com/phoenix-go-cawcaw"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              GitHub
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ContactSection;