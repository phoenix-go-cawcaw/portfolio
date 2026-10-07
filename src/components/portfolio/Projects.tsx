import SectionHeader from "./SectionHeader";
import Reveal from "@/components/Reveal";

const placeholderProjects = [
  {
    category: "Placeholder",
    titleZh: "待补充",
    name: "Coming soon",
    heading: "Project details will be added later.",
  },
  {
    category: "Placeholder",
    titleZh: "待更新",
    name: "Coming soon",
    heading: "Links and case studies will be shared when ready.",
  },
  {
    category: "Placeholder",
    titleZh: "敬请期待",
    name: "Coming soon",
    heading: "This section is intentionally left blank for now.",
  },
];

const Projects = () => (
  <section id="projects" className="section-snap relative">
    <div className="container-elegant relative z-10">
      <SectionHeader number="二" titleEn="Project Scrolls" titleZh="项目卷轴" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
        {placeholderProjects.map((project, index) => (
          <Reveal key={`${project.titleZh}-${index}`} delay={index * 90}>
            <div className="project-tile group h-full opacity-80 border border-dashed border-border bg-paper-aged/40">
              <span className="font-zh-sans text-[0.65rem] tracking-[0.35em] uppercase text-ink-muted">
                {project.category}
              </span>
              <h3 className="font-zh text-2xl md:text-3xl font-bold text-ink mt-2 mb-1 tracking-[0.15em] group-hover:text-seal transition-colors">
                {project.titleZh}
              </h3>
              <p className="font-en text-lg text-ink-soft italic">{project.name}</p>
              <div className="mt-3 h-px w-12 bg-ink/30 group-hover:w-20 group-hover:bg-seal transition-all duration-500" />
              <p className="font-en text-sm text-ink-muted mt-3">{project.heading}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
