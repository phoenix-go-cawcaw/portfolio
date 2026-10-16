import { useEffect, useRef, useState, type ReactNode } from "react";
import SectionHeader from "./SectionHeader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const projects = [
  {
    name: "LC Chronicle Blog",
    role: "Blog",
    description: "I worked as one of two developers on the LC Chronicle Blog.",
    url: "https://chronicle.lifechoices.co.za",
  },
  {
    name: "LC Studio",
    role: "Website rebuild",
    description: "I worked as one of five developers on the LC Studio rebuild.",
    url: "https://profiles.lcstudio.co.za",
  },
  {
    name: "Sirius Dream: Lumina",
    role: "QA Tester",
    description:
      "I worked in a team of five QA testers covering five different roles, and tested the intern role.",
    url: "https://lumina.siriusdream.co.za",
  },
];
const initialActiveProject = Math.floor(projects.length / 2);

interface Props {
  children: ReactNode;
}

const Projects = ({ children }: Props) => {
  const slotRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(initialActiveProject);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);

  useEffect(() => {
    const slot = slotRef.current;
    const activeItem = slot?.children[initialActiveProject] as HTMLElement | undefined;
    if (!slot || !activeItem) return;

    const slotRect = slot.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    slot.scrollTop += itemRect.top - slotRect.top - (slot.clientHeight - itemRect.height) / 2;
  }, []);

  const updateActiveProject = (slot: HTMLDivElement) => {
    const slotCenter = slot.getBoundingClientRect().top + slot.clientHeight / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    Array.from(slot.children).forEach((child, index) => {
      const rect = child.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - slotCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveProject((current) => current === closestIndex ? current : closestIndex);
  };

  const centerProject = (index: number) => {
    const slot = slotRef.current;
    const item = slot?.children[index] as HTMLElement | undefined;
    if (!slot || !item) return;
    const slotRect = slot.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    slot.scrollTo({
      top: slot.scrollTop + itemRect.top - slotRect.top - (slot.clientHeight - itemRect.height) / 2,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="section-snap relative overflow-hidden">
      <div className="container-elegant relative z-10">
        <SectionHeader number="二" titleEn="Projects & Skills" titleZh="项目与技艺" />

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] gap-8 md:gap-10 items-start">
          <section aria-labelledby="project-scrolls-title" className="min-w-0">
            <div className="mb-3 flex items-end justify-between gap-3">
              <div>
                <p className="font-zh-sans text-[0.6rem] tracking-[0.3em] uppercase text-ink-muted">项目</p>
                <h3 id="project-scrolls-title" className="font-en text-2xl font-medium text-ink">
                  Project Scrolls
                </h3>
              </div>
              <span className="font-zh-sans text-[0.6rem] tracking-[0.2em] text-ink-muted">SCROLL TO EXPLORE</span>
            </div>

            <div
              ref={slotRef}
              className="project-slot"
              data-native-scroll
              data-lenis-prevent
              aria-label="Projects, scroll vertically to explore"
              tabIndex={0}
              onScroll={(event) => updateActiveProject(event.currentTarget)}
              onKeyDown={(event) => {
                const direction = event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
                if (!direction) return;
                event.preventDefault();
                centerProject(Math.max(0, Math.min(projects.length - 1, activeProject + direction)));
              }}
            >
              {projects.map((project, index) => {
                const distance = Math.abs(index - activeProject);
                return (
                  <button
                    key={project.name}
                    type="button"
                    aria-pressed={index === activeProject}
                    className="project-slot-item"
                    style={{
                      opacity: distance === 0 ? 1 : distance === 1 ? 0.42 : 0.16,
                      transform: `scale(${distance === 0 ? 1 : distance === 1 ? 0.96 : 0.92})`,
                    }}
                    aria-haspopup="dialog"
                    onClick={() => setSelectedProject(project)}
                  >
                    <span className="font-en text-lg md:text-xl font-medium">{project.name}</span>
                    <span className="font-zh-sans text-[0.6rem] tracking-[0.25em] uppercase text-ink-muted">
                      {project.role}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <div className="min-w-0">
            {children}
          </div>
        </div>
      </div>

      <Dialog
        open={selectedProject !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      >
        <DialogContent className="border-[hsl(var(--border))] bg-[hsl(var(--card))] p-7 sm:p-9">
          {selectedProject && (
            <>
              <DialogHeader className="space-y-3 text-left">
                <p className="font-zh-sans text-[0.6rem] tracking-[0.3em] uppercase text-ink-muted">
                  {selectedProject.role}
                </p>
                <DialogTitle className="font-en text-2xl font-medium text-ink">
                  {selectedProject.name}
                </DialogTitle>
                <DialogDescription className="font-en text-base leading-relaxed text-ink-soft">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 border-b border-[hsl(var(--seal)/0.45)] pb-1 font-en text-sm text-ink transition-colors hover:text-[hsl(var(--seal))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--seal))]"
              >
                View live project <span aria-hidden="true">↗</span>
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
