import { useEffect, useState } from "react";
import { X } from "lucide-react";
import SectionHeader from "./SectionHeader";
import BrushDivider from "./BrushDivider";
import Reveal from "@/components/Reveal";
import scrollLandscape from "@/assets/scroll-landscape.png";

type Project = {
  name: string;
  titleZh: string;
  heading: string;
  description: string;
  category: string;
  link: string;
  stack: string[];
};

const projects: Project[] = [
  {
    name: "Hobby in a Box",
    titleZh: "锦匣雅趣",
    heading: "E-commerce Vue Showcase",
    description:
      "A compact e-commerce experience built in Vue, and presented with refined animation.",
    category: "E-commerce",
    link: "https://github.com/phoenix-go-cawcaw/Hobby-in-a-Box",
    stack: ["Vue", "JavaScript", "Component Design", "Animation"],
  },
  {
    name: "Full Stack Project",
    titleZh: "全栈人和",
    heading: "HR Full Stack Vue",
    description:
      "A full-stack Vue HR system that builds an HR-simulation system as a Vue-based retail workflow.",
    category: "Vue · Full Stack",
    link: "https://github.com/phoenix-go-cawcaw/Full-Stack-Project",
    stack: ["Vue", "Full Stack", "Retail Flow", "System Design"],
  },
  {
    name: "Oracle APEX Simulation",
    titleZh: "智析衡卷",
    heading: "Data Analyst HR Demo",
    description:
      "An HR data analyst simulation built with Oracle APEX, focused on reporting, dashboards, and workflow insights.",
    category: "Data Analytics",
    link: "https://oracleapex.com/ords/r/otdb/ot-company/login?session=11468584978410",
    stack: ["Oracle APEX", "Dashboards", "Reporting", "Analytics"],
  },
];

const Projects = () => {
  const [open, setOpen] = useState<Project | null>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section id="projects" className="section-pad relative">
      <div className="container-elegant">
        <SectionHeader number="二" titleEn="Project Scrolls" titleZh="项目卷轴" />
        <Reveal>
          <BrushDivider className="mb-12" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-8">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 90}>
              <button
                type="button"
                onClick={() => setOpen(p)}
                className="project-tile group"
                aria-label={`Open ${p.name}`}
              >
                <span className="font-zh-sans text-[0.65rem] tracking-[0.35em] uppercase text-ink-muted">
                  {p.category}
                </span>
                <h3 className="font-zh text-3xl font-bold text-ink mt-3 mb-2 tracking-[0.15em] group-hover:text-seal transition-colors">
                  {p.titleZh}
                </h3>
                <p className="font-en text-lg text-ink-soft italic">{p.name}</p>
                <div className="mt-5 h-px w-12 bg-ink/30 group-hover:w-20 group-hover:bg-seal transition-all duration-500" />
                <p className="font-en text-sm text-ink-muted mt-4">{p.heading}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in"
          style={{ background: "hsl(var(--ink) / 0.55)", backdropFilter: "blur(4px)" }}
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-2xl w-full bg-card border border-border shadow-2xl animate-scale-in overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top & bottom rods */}
            <div className="h-3 bg-gradient-to-b from-paper-deep to-paper-aged border-b border-border" />

            <button
              onClick={() => setOpen(null)}
              className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center bg-background/80 hover:bg-seal hover:text-seal-foreground border border-border rounded-full transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className="relative">
              <img
                src={scrollLandscape}
                alt=""
                className="w-full h-44 md:h-56 object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
            </div>

            <div className="px-7 md:px-10 py-8 md:py-10 -mt-10 relative">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-zh-sans text-[0.65rem] tracking-[0.35em] uppercase text-ink-muted">
                  {open.category}
                </span>
                <span className="h-px flex-1 bg-ink/15" />
              </div>

              <h3 className="font-zh text-4xl font-bold text-ink tracking-[0.18em] mb-2">
                {open.titleZh}
              </h3>
              <h4 className="font-en text-xl italic text-ink-soft mb-5">{open.name}</h4>

              <div className="h-px w-16 bg-seal mb-5" />

              <p className="font-en text-base text-ink-soft leading-relaxed mb-6">
                {open.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-7">
                {open.stack.map((s) => (
                  <span
                    key={s}
                    className="font-zh-sans text-[0.65rem] tracking-[0.2em] uppercase px-3 py-1.5 border border-border bg-paper-aged/50 text-ink-soft"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <a
                href={open.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-zh-sans text-xs tracking-[0.3em] uppercase bg-ink text-primary-foreground px-6 py-3 hover:bg-seal transition-colors"
              >
                查看项目 · View Project
              </a>
            </div>

            <div className="h-3 bg-gradient-to-t from-paper-deep to-paper-aged border-t border-border" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
