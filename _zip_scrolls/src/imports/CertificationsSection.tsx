import SectionHeader from "./SectionHeader";
import BrushDivider from "./BrushDivider";
import RevealOnScroll from "./RevealOnScroll";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const certs = [
  { gem: "jade", name: "React & TypeScript", issuer: "Front-end Academy", year: "2025" },
  { gem: "gold", name: "Web Animation", issuer: "Motion Lab", year: "2024" },
  { gem: "quartz", name: "Performance Mastery", issuer: "Google Web Cult", year: "2024" },
  { gem: "silver", name: "Design Systems", issuer: "Noto Collective", year: "2023" },
  { gem: "jade", name: "Chinese Typography", issuer: "Ink Atelier", year: "2025" },
];

const projects = [
  {
    name: "Hobby in a Box",
    heading: "E-comm Vue Showcase",
    description: "A compact e-commerce experience built in Vue, styled as a paper scroll and presented with refined motion.",
    category: "E-commerce",
    link: "https://github.com/phoenix-go-cawcaw/Hobby-in-a-Box",
    variant: "jade",
  },
  {
    name: "First Module Project",
    heading: "HR System Vue Module",
    description: "A Vue-driven HR system module, part of a larger browser-based HR suite with layered component design.",
    category: "Vue HR",
    link: "https://github.com/phoenix-go-cawcaw/first-module-project",
    variant: "gold",
  },
  {
    name: "Full Stack Project",
    heading: "HR Full Stack Vue",
    description: "A full-stack Vue HR system that includes Hobby in a Box functionality as a Vue-based retail workflow.",
    category: "Vue HR",
    link: "https://github.com/phoenix-go-cawcaw/Full-Stack-Project",
    variant: "quartz",
  },
  {
    name: "Oracle APEX Simulation",
    heading: "Data Analyst HR Demo",
    description: "An HR data analyst simulation built with Oracle APEX, focused on reporting, dashboards, and workflow insights.",
    category: "Data Analysis",
    link: "https://oracleapex.com/ords/r/otdb/ot-company/login?session=11468584978410",
    variant: "silver",
  },
];

const CertificationsSection = () => {
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    rowsRef.current.forEach((row) => {
      if (!row) return;

      row.addEventListener("mouseenter", () => {
        gsap.to(row, {
          x: 10,
          boxShadow: "0 8px 20px rgba(192, 57, 43, 0.15)",
          duration: 0.3,
          ease: "power2.out",
        });

        const dot = row.querySelector(".cert-gem-dot") as HTMLElement;
        if (dot) {
          gsap.to(dot, {
            scale: 1.3,
            boxShadow: "0 0 20px rgba(192, 57, 43, 0.6)",
            duration: 0.3,
            ease: "back.out(1.5)",
          });
        }

        const name = row.querySelector(".cert-name") as HTMLElement;
        if (name) {
          gsap.to(name, {
            color: "rgba(192, 57, 43, 1)",
            duration: 0.3,
          });
        }
      });

      row.addEventListener("mouseleave", () => {
        gsap.to(row, {
          x: 0,
          boxShadow: "0 2px 8px rgba(26, 15, 10, 0.05)",
          duration: 0.3,
          ease: "power2.out",
        });

        const dot = row.querySelector(".cert-gem-dot") as HTMLElement;
        if (dot) {
          gsap.to(dot, {
            scale: 1,
            boxShadow: "0 2px 6px rgba(26, 15, 10, 0.1)",
            duration: 0.3,
          });
        }

        const name = row.querySelector(".cert-name") as HTMLElement;
        if (name) {
          gsap.to(name, {
            color: "var(--ink)",
            duration: 0.3,
          });
        }
      });
    });

    return () => {
      rowsRef.current.forEach((row) => {
        if (row) {
          row.removeEventListener("mouseenter", () => {});
          row.removeEventListener("mouseleave", () => {});
        }
      });
    };
  }, []);

  return (
    <section className="section" id="certifications">
      <div className="mist-overlay mist-top" />
      <svg className="certifications-rock" viewBox="0 0 150 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M20,400 L0,300 L30,320 L5,220 L40,250 L15,150 L55,190 L35,80 L70,130 L60,30 L85,90 L80,0 L95,60 L110,0 L115,70 L135,20 L130,110 L150,70 L140,180 L150,150 L135,260 L150,240 L130,350 L150,330 L140,400 Z" />
      </svg>
      <div className="section-inner">
        <SectionHeader number="2" titleEn="Certifications & Honours" titleZh="证书之山峰" />
        <BrushDivider id="blur_ink_certs" />
        <div className="certs-list">
          {certs.map((c, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <div
                ref={(el) => {
                  if (el) rowsRef.current[i] = el;
                }}
                className={`cert-row cert-row-${c.gem}`}
              >
                <div className={`cert-gem-dot dot-${c.gem}`} />
                <div className="cert-info">
                  <div className="cert-name">{c.name}</div>
                  <div className="cert-issuer">{c.issuer}</div>
                </div>
                <div className="cert-year">{c.year}</div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <div className="project-scrolls-wrap" id="project-scrolls">
          <div className="project-scrolls-header">
            <div className="section-title-en">Project Scrolls</div>
            <div className="section-title-zh">项目卷轴</div>
          </div>
          <div className="project-scrolls-grid">
            {projects.map((project, index) => (
              <RevealOnScroll key={project.name} delay={index * 0.1}>
                <a
                  className={`project-scroll-card project-scroll-${project.variant}`}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="project-scroll-body">
                    <div className="project-scroll-label">{project.category}</div>
                    <div className="project-scroll-title">{project.name}</div>
                    <div className="project-scroll-hover">
                      <span className="project-scroll-symbol" />
                      <div className="project-scroll-heading">{project.heading}</div>
                      <p className="project-scroll-description">{project.description}</p>
                      <div className="project-scroll-action">View project</div>
                    </div>
                  </div>
                </a>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
      <div className="mist-overlay mist-bottom" />
    </section>
  );
};

export default CertificationsSection;
