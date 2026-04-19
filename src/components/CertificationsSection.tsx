import SectionHeader from "./SectionHeader";
import BrushDivider from "./BrushDivider";
import RevealOnScroll from "./RevealOnScroll";
import scrollLandscape from "../assets/scroll-landscape.png";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X } from "lucide-react";

type Cert = {
  gem: "jade" | "gold" | "quartz" | "silver";
  name: string;
  issuer: string;
  year: string;
};

type Project = {
  name: string;
  titleZh: string;
  heading: string;
  description: string;
  category: string;
  link: string;
  variant: "jade" | "gold" | "quartz" | "silver";
  stack: string[];
};

const certs: Cert[] = [
  { gem: "jade", name: "React & TypeScript", issuer: "Front-end Academy", year: "2025" },
  { gem: "gold", name: "Web Animation", issuer: "Motion Lab", year: "2024" },
  { gem: "quartz", name: "Performance Mastery", issuer: "Google Web Cult", year: "2024" },
  { gem: "silver", name: "Design Systems", issuer: "Noto Collective", year: "2023" },
  { gem: "jade", name: "Chinese Typography", issuer: "Ink Atelier", year: "2025" },
];

const projects: Project[] = [
  {
    name: "Hobby in a Box",
    titleZh: "锦匣雅趣",
    heading: "E-comm Vue Showcase",
    description: "A compact e-commerce experience built in Vue, styled as a paper scroll and presented with refined motion.",
    category: "E-commerce",
    link: "https://github.com/phoenix-go-cawcaw/Hobby-in-a-Box",
    variant: "jade",
    stack: ["Vue", "JavaScript", "Component Design", "Animation"],
  },
  {
    name: "First Module Project",
    titleZh: "人事初卷",
    heading: "HR System Vue Module",
    description: "A Vue-driven HR system module, part of a larger browser-based HR suite with layered component design.",
    category: "Vue HR",
    link: "https://github.com/phoenix-go-cawcaw/first-module-project",
    variant: "gold",
    stack: ["Vue", "HR Workflows", "Reusable UI", "Forms"],
  },
  {
    name: "Full Stack Project",
    titleZh: "全栈人和",
    heading: "HR Full Stack Vue",
    description: "A full-stack Vue HR system that includes Hobby in a Box functionality as a Vue-based retail workflow.",
    category: "Vue HR",
    link: "https://github.com/phoenix-go-cawcaw/Full-Stack-Project",
    variant: "quartz",
    stack: ["Vue", "Full Stack", "Retail Flow", "System Design"],
  },
  {
    name: "Oracle APEX Simulation",
    titleZh: "智析衡卷",
    heading: "Data Analyst HR Demo",
    description: "An HR data analyst simulation built with Oracle APEX, focused on reporting, dashboards, and workflow insights.",
    category: "Data Analysis",
    link: "https://oracleapex.com/ords/r/otdb/ot-company/login?session=11468584978410",
    variant: "silver",
    stack: ["Oracle APEX", "Dashboards", "Reporting", "Analytics"],
  },
];

const CertificationsSection = () => {
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalItemsRef = useRef<HTMLDivElement[]>([]);
  const modalCloseRef = useRef<HTMLButtonElement>(null);
  const isClosingRef = useRef(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const getModalItems = () => modalItemsRef.current.filter(Boolean);

  useEffect(() => {
    if (!selectedProject || !overlayRef.current || !modalRef.current) return;

    isClosingRef.current = false;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const modalItems = getModalItems();

      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(modalRef.current, { opacity: 0, y: 42, scale: 0.94, transformOrigin: "center center" });
      gsap.set(modalItems, { opacity: 0, y: 24 });
      gsap.set(modalCloseRef.current, { opacity: 0, scale: 0.85 });

      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.28, ease: "power2.out" })
        .to(
          modalRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.62, ease: "power3.out" },
          "-=0.08"
        )
        .to(modalCloseRef.current, { opacity: 1, scale: 1, duration: 0.26, ease: "back.out(1.8)" }, "-=0.3")
        .to(
          modalItems,
          { opacity: 1, y: 0, duration: 0.46, stagger: 0.08, ease: "power2.out" },
          "-=0.28"
        );
    }, overlayRef);

    return () => {
      document.body.style.overflow = previousOverflow;
      ctx.revert();
    };
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeProjectScroll();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedProject]);

  const animateCertRow = (index: number, isEntering: boolean) => {
    const row = rowsRef.current[index];
    if (!row) return;

    const dot = row.querySelector(".cert-gem-dot");
    const name = row.querySelector(".cert-name");

    gsap.to(row, {
      x: isEntering ? 10 : 0,
      boxShadow: isEntering ? "0 8px 20px rgba(192, 57, 43, 0.15)" : "0 2px 8px rgba(26, 15, 10, 0.05)",
      duration: 0.3,
      ease: "power2.out",
    });

    if (dot) {
      gsap.to(dot, {
        scale: isEntering ? 1.3 : 1,
        boxShadow: isEntering ? "0 0 20px rgba(192, 57, 43, 0.6)" : "0 2px 6px rgba(26, 15, 10, 0.1)",
        duration: 0.3,
        ease: isEntering ? "back.out(1.5)" : "power2.out",
      });
    }

    if (name) {
      gsap.to(name, {
        color: isEntering ? "rgba(192, 57, 43, 1)" : "var(--ink)",
        duration: 0.3,
      });
    }
  };

  const animateClosedScroll = (index: number, isEntering: boolean) => {
    const scroll = scrollRefs.current[index];
    if (!scroll) return;

    gsap.killTweensOf(scroll);
    gsap.killTweensOf(scroll.querySelector(".project-scroll-tassel"));

    gsap.to(scroll, {
      y: isEntering ? -10 : 0,
      rotate: isEntering ? (index % 2 === 0 ? -1.5 : 1.5) : 0,
      scale: isEntering ? 1.03 : 1,
      boxShadow: isEntering ? "0 34px 54px rgba(26, 15, 10, 0.2)" : "0 20px 34px rgba(26, 15, 10, 0.14)",
      duration: 0.35,
      ease: "power2.out",
    });

    const label = scroll.querySelector(".project-scroll-zh");
    const category = scroll.querySelector(".project-scroll-category");
    const tassel = scroll.querySelector(".project-scroll-tassel");

    if (label) {
      gsap.to(label, {
        color: isEntering ? "rgba(139, 26, 26, 0.92)" : "rgba(26, 15, 10, 0.86)",
        letterSpacing: isEntering ? "0.2em" : "0.16em",
        duration: 0.3,
      });
    }

    if (category) {
      gsap.to(category, {
        opacity: isEntering ? 0.92 : 0.62,
        y: isEntering ? -2 : 0,
        duration: 0.3,
      });
    }

    if (tassel) {
      gsap.to(tassel, {
        y: isEntering ? 7 : 0,
        duration: isEntering ? 1.05 : 0.3,
        repeat: isEntering ? -1 : 0,
        yoyo: isEntering,
        ease: "sine.inOut",
      });
    }
  };

  const openProjectScroll = (project: Project) => {
    if (selectedProject || isClosingRef.current) return;
    setSelectedProject(project);
  };

  const closeProjectScroll = () => {
    if (!selectedProject || isClosingRef.current || !overlayRef.current || !modalRef.current) {
      return;
    }

    isClosingRef.current = true;
    const modalItems = getModalItems().slice().reverse();

    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedProject(null);
        isClosingRef.current = false;
      },
    });

    tl.to(modalItems, {
      opacity: 0,
      y: 16,
      duration: 0.18,
      stagger: 0.03,
      ease: "power2.in",
    })
      .to(modalCloseRef.current, { opacity: 0, scale: 0.85, duration: 0.16 }, "<")
      .to(modalRef.current, { opacity: 0, y: 26, scale: 0.96, duration: 0.24, ease: "power2.in" }, "-=0.02")
      .to(overlayRef.current, { opacity: 0, duration: 0.2, ease: "power2.inOut" }, "-=0.12");
  };

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
            <RevealOnScroll key={c.name} delay={i * 0.1}>
              <div
                ref={(el) => {
                  rowsRef.current[i] = el;
                }}
                className={`cert-row cert-row-${c.gem}`}
                onMouseEnter={() => animateCertRow(i, true)}
                onMouseLeave={() => animateCertRow(i, false)}
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

          <div className="project-scrolls-stage">
            {projects.map((project, index) => (
              <RevealOnScroll key={project.name} delay={index * 0.1}>
                <button
                  type="button"
                  ref={(el) => {
                    scrollRefs.current[index] = el;
                  }}
                  className={`project-scroll-item project-scroll-${project.variant}`}
                  onMouseEnter={() => animateClosedScroll(index, true)}
                  onMouseLeave={() => animateClosedScroll(index, false)}
                  onClick={() => openProjectScroll(project)}
                  aria-label={`Open ${project.name} scroll`}
                >
                  <span className="project-scroll-rod project-scroll-rod-top" />
                  <span className="project-scroll-rod project-scroll-rod-bottom" />
                  <span className="project-scroll-band project-scroll-band-top" />
                  <span className="project-scroll-band project-scroll-band-bottom" />

                  <span className="project-scroll-shell">
                    <span className="project-scroll-paper">
                      <span className="project-scroll-category">{project.category}</span>
                      <span className="project-scroll-zh">{project.titleZh}</span>
                      <span className="project-scroll-en">{project.name}</span>
                    </span>
                  </span>

                  <span className="project-scroll-tassel">
                    <span className="project-scroll-string" />
                    <span className="project-scroll-fringe">
                      <span />
                      <span />
                      <span />
                    </span>
                  </span>
                </button>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>

      {selectedProject && (
        <div
          ref={overlayRef}
          className="project-scroll-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-scroll-title"
          onClick={closeProjectScroll}
        >
          <div ref={modalRef} className={`project-scroll-modal project-scroll-modal-${selectedProject.variant}`} onClick={(e) => e.stopPropagation()}>
            <button
              ref={modalCloseRef}
              type="button"
              className="project-scroll-close"
              onClick={closeProjectScroll}
              aria-label="Close project scroll"
            >
              <X size={18} />
            </button>

            <div className="project-scroll-modal-rod project-scroll-modal-rod-left" />
            <div className="project-scroll-modal-rod project-scroll-modal-rod-right" />

            <div className="project-scroll-modal-border project-scroll-modal-border-top" />
            <div className="project-scroll-modal-border project-scroll-modal-border-bottom" />

            <div className="project-scroll-modal-art" aria-hidden="true">
              <img src={scrollLandscape} alt="" />
            </div>

            <div className="project-scroll-modal-inner">
              <div
                ref={(el) => {
                  if (el) modalItemsRef.current[0] = el;
                }}
                className="project-scroll-modal-kicker"
              >
                <span>{selectedProject.category}</span>
                <span>{selectedProject.heading}</span>
              </div>

              <div
                ref={(el) => {
                  if (el) modalItemsRef.current[1] = el;
                }}
                className="project-scroll-modal-title-wrap"
              >
                <h3 className="project-scroll-modal-title-zh">{selectedProject.titleZh}</h3>
                <h4 id="project-scroll-title" className="project-scroll-modal-title-en">
                  {selectedProject.name}
                </h4>
              </div>

              <div
                ref={(el) => {
                  if (el) modalItemsRef.current[2] = el;
                }}
                className="project-scroll-modal-divider"
              />

              <div
                ref={(el) => {
                  if (el) modalItemsRef.current[3] = el;
                }}
                className="project-scroll-modal-copy"
              >
                <p>{selectedProject.description}</p>
              </div>

              <div
                ref={(el) => {
                  if (el) modalItemsRef.current[4] = el;
                }}
                className="project-scroll-modal-stack"
              >
                {selectedProject.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div
                ref={(el) => {
                  if (el) modalItemsRef.current[5] = el;
                }}
                className="project-scroll-modal-actions"
              >
                <a href={selectedProject.link} target="_blank" rel="noreferrer" className="project-scroll-modal-link">
                  查看项目 · View Project
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mist-overlay mist-bottom" />
    </section>
  );
};

export default CertificationsSection;
