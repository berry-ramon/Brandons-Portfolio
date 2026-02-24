import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { projects, type Project } from "../../data/projects";
import { fadeUp, staggerContainer } from "../../utils/motionVariants";
import NeuCard from "../NeuCard";

const ProjectCard = ({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) => {
  return (
    <motion.div variants={fadeUp} className={featured ? "md:col-span-2" : ""}>
      <Link to={`/work/${project.id}`}>
        <NeuCard hover delay={index * 0.1}>
          <div className="relative">
            {/* Accent border animation */}
            <motion.div
              className="absolute -top-6 -left-6 h-0.5 bg-accent"
              initial={{ width: 0 }}
              whileHover={{ width: "calc(100% + 3rem)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {featured && (
              <span className="text-xs uppercase tracking-wider text-accent/60 mb-3 block font-mono">
                Featured Project
              </span>
            )}

            <h3
              className={`${featured ? "text-2xl" : "text-xl"} mb-2 text-accent`}
            >
              {project.name}
            </h3>

            <p className="text-sm font-light mb-2 opacity-80">
              {project.tagline}
            </p>

            <p className="text-sm opacity-70 mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Impact line */}
            <p className="text-xs font-mono text-accent/60 mb-4 border-l-2 border-accent/30 pl-3">
              Impact: {project.impact}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  className="text-xs px-3 py-1 bg-accent/10 text-accent/80 rounded-full 
                           transition-colors duration-300 group-hover:bg-accent/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <motion.div
              className="flex items-center gap-2 text-accent text-sm"
              whileHover={{ gap: "0.75rem" }}
            >
              View Project <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </NeuCard>
      </Link>
    </motion.div>
  );
};

export const SelectedWork = () => {
  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6" id="work">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent/50 font-mono">
            Case Studies
          </span>
          <h2 className="mt-2">Selected Work</h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredProject && (
            <ProjectCard project={featuredProject} index={0} featured />
          )}

          {otherProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={featuredProject ? index + 1 : index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
