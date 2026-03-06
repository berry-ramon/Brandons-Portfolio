import { motion } from "motion/react";
import { Link } from "react-router";
import { projects, type Project } from "../../data/projects";
import { fadeUp, staggerContainer, scaleIn } from "../../utils/motionVariants";
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
    <motion.div
      variants={fadeUp}
      custom={index}
      className={featured ? "md:col-span-2" : ""}
    >
      <Link to={`/work/${project.id}`}>
        <NeuCard hover delay={index * 0.1}>
          <div className="relative">
            {/* Gradient background indicator */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${project.color || "from-accent/20 to-accent/10"} rounded-2xl`}
            />

            {/* Accent border animation */}
            <motion.div
              className="absolute -top-6 -left-6 h-0.5 bg-accent"
              initial={{ width: 0 }}
              whileHover={{ width: "calc(100% + 3rem)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {featured && (
              <motion.span
                variants={scaleIn}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-accent/60 mb-3 font-mono"
              >
                <i className="bx bx-star text-accent"></i>
                Featured Project
              </motion.span>
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
              {project.overview?.substring(0, 120) ||
                project.description?.substring(0, 120) ||
                "No description available"}
              ...
            </p>

            {/* Key metrics preview */}
            {project.outcomes && project.outcomes.length > 0 && (
              <motion.div
                variants={staggerContainer}
                className="flex items-center gap-4 mb-4"
              >
                {project.outcomes.slice(0, 2).map((outcome, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex-1">
                    <div className="text-xs font-mono text-accent">
                      {outcome.value}
                    </div>
                    <div className="text-[10px] opacity-40">
                      {outcome.metric}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags?.slice(0, 3).map((tag) => (
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
              {project.tags && project.tags.length > 3 && (
                <span className="text-xs px-3 py-1 text-foreground/40">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>

            <motion.div
              className="flex items-center gap-2 text-accent text-sm"
              whileHover={{ gap: "0.75rem" }}
            >
              View Case Study <i className="bx bx-right-arrow-alt text-lg"></i>
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
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
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
          viewport={{ once: true, amount: 0.1, margin: "-50px" }}
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
