import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface Project {
  id: number;
  titleEn: string;
  titleZh: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    titleEn: "Cloud Dragon System",
    titleZh: "云龙系统",
    description: "A distributed cloud infrastructure platform built with modern microservices architecture. Features real-time monitoring, auto-scaling, and intelligent load balancing across multiple regions.",
    technologies: ["React", "Node.js", "Kubernetes", "Docker", "MongoDB"],
    githubUrl: "https://github.com/yourusername/project1",
    category: "Cloud Infrastructure",
  },
  {
    id: 2,
    titleEn: "Jade Phoenix Analytics",
    titleZh: "翡翠凤凰",
    description: "An advanced data analytics dashboard with machine learning capabilities. Provides predictive insights, custom visualizations, and automated reporting for enterprise clients.",
    technologies: ["Python", "TensorFlow", "React", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com/yourusername/project2",
    category: "Data Analytics",
  },
  {
    id: 3,
    titleEn: "Golden Lotus CMS",
    titleZh: "金莲内容",
    description: "A headless content management system designed for multilingual publishing. Features rich text editing, media management, and seamless API integration with any frontend framework.",
    technologies: ["TypeScript", "GraphQL", "Next.js", "Prisma", "AWS"],
    githubUrl: "https://github.com/yourusername/project3",
    category: "Content Management",
  },
];

export default function ChineseScrollsSection() {
  const [selectedScroll, setSelectedScroll] = useState<number | null>(null);

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 py-20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-red-900 rounded-full" />
        <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-red-900 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-serif text-red-900 mb-4">项目卷轴</h2>
          <p className="text-2xl text-amber-900">Project Scrolls</p>
        </motion.div>

        {/* Scrolls Container */}
        <div className="flex justify-center items-center gap-12 flex-wrap">
          {projects.map((project, index) => (
            <ScrollItem
              key={project.id}
              project={project}
              index={index}
              isSelected={selectedScroll === project.id}
              onClick={() => setSelectedScroll(project.id)}
            />
          ))}
        </div>
      </div>

      {/* Expanded Scroll Modal */}
      <AnimatePresence>
        {selectedScroll !== null && (
          <ExpandedScroll
            project={projects.find((p) => p.id === selectedScroll)!}
            onClose={() => setSelectedScroll(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ScrollItem({
  project,
  index,
  isSelected,
  onClick,
}: {
  project: Project;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover="hover"
      className="relative cursor-pointer"
      onClick={onClick}
    >
      {/* Scroll Roll (Closed State) */}
      <motion.div
        className="relative w-32 h-80 bg-gradient-to-b from-amber-700 via-amber-600 to-amber-700 rounded-full shadow-2xl"
        variants={{
          hover: {
            rotateZ: [0, -2, 2, -2, 2, 0],
            transition: {
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 2,
            },
          },
        }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Scroll Texture */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-800/20 to-transparent rounded-full" />

        {/* Decorative Bands */}
        <div className="absolute top-12 left-0 right-0 h-1 bg-red-800" />
        <div className="absolute bottom-12 left-0 right-0 h-1 bg-red-800" />

        {/* Chinese Characters on Scroll */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.p
            className="text-red-900 text-2xl font-serif writing-mode-vertical-rl text-orientation-upright"
            variants={{
              hover: {
                color: "#7f1d1d",
              },
            }}
          >
            {project.titleZh}
          </motion.p>
        </div>

        {/* Wooden Rod Top */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-40 h-6 bg-gradient-to-b from-amber-900 to-amber-950 rounded-full shadow-lg" />

        {/* Wooden Rod Bottom */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-6 bg-gradient-to-b from-amber-900 to-amber-950 rounded-full shadow-lg" />

        {/* Decorative Tassel */}
        <motion.div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2"
          variants={{
            hover: {
              y: [0, 5, 0],
              transition: {
                duration: 1,
                repeat: Infinity,
              },
            },
          }}
        >
          <div className="w-1 h-8 bg-red-800" />
          <div className="flex gap-1 justify-center">
            <div className="w-8 h-12 bg-gradient-to-b from-red-700 to-red-900 clip-path-tassel" />
            <div className="w-8 h-12 bg-gradient-to-b from-red-700 to-red-900 clip-path-tassel" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ExpandedScroll({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.3, rotateX: 90 }}
        animate={{ scale: 1, rotateX: 0 }}
        exit={{ scale: 0.3, rotateX: -90 }}
        transition={{ type: "spring", duration: 0.8 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full"
      >
        {/* Opened Scroll */}
        <div className="relative bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 rounded-3xl shadow-2xl border-8 border-amber-800 overflow-hidden">
          {/* Aged Paper Texture */}
          <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=')]" />

          {/* Decorative Top Border */}
          <div className="h-8 bg-gradient-to-b from-red-800 to-red-700 border-b-4 border-amber-900" />

          {/* Content */}
          <div className="relative p-12 max-h-[80vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-red-900 hover:bg-red-800 text-amber-50 rounded-full flex items-center justify-center transition-colors shadow-lg z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Chinese Title */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl font-serif text-red-900 text-center mb-4"
            >
              {project.titleZh}
            </motion.h3>

            {/* English Title */}
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-3xl text-amber-900 text-center mb-2"
            >
              {project.titleEn}
            </motion.h4>

            {/* Category */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-center text-amber-700 mb-8"
            >
              {project.category}
            </motion.p>

            {/* Decorative Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="w-48 h-1 bg-gradient-to-r from-transparent via-red-800 to-transparent mx-auto mb-8"
            />

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mb-8"
            >
              <h5 className="text-2xl font-serif text-red-900 mb-4 text-center">
                项目描述 · Project Description
              </h5>
              <p className="text-lg text-amber-950 leading-relaxed text-center max-w-2xl mx-auto">
                {project.description}
              </p>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mb-8"
            >
              <h5 className="text-2xl font-serif text-red-900 mb-4 text-center">
                技术栈 · Technologies Used
              </h5>
              <div className="flex flex-wrap justify-center gap-3">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                    className="px-4 py-2 bg-amber-200 border-2 border-amber-700 text-amber-900 rounded-full shadow-md"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* GitHub Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="text-center"
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-amber-50 text-xl rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                查看项目 · View Project
              </a>
            </motion.div>
          </div>

          {/* Decorative Bottom Border */}
          <div className="h-8 bg-gradient-to-t from-red-800 to-red-700 border-t-4 border-amber-900" />
        </div>

        {/* Wooden Rods on sides */}
        <div className="absolute top-0 -left-4 w-8 h-full bg-gradient-to-r from-amber-900 to-amber-950 rounded-full shadow-2xl" />
        <div className="absolute top-0 -right-4 w-8 h-full bg-gradient-to-l from-amber-900 to-amber-950 rounded-full shadow-2xl" />
      </motion.div>
    </motion.div>
  );
}
