import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import NeuCard from "../components/NeuCard";
import SEO from "../components/SEO";
import { projects } from "../data/projects";

export default function Work() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectId ? projects[projectId] : null;

  if (!project) {
    return (
      <>
        <SEO
          title="Project Not Found | Brandon Kimathi"
          description="The requested project could not be found. Explore other work and case studies."
          canonical="https://brandonkimathi.com/work"
          noindex={true}
        />

        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-light mb-4"
          >
            Project not found
          </motion.h1>
          <Link
            to="/"
            className="text-accent hover:underline inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to homepage
          </Link>
        </div>
      </>
    );
  }

  // Generate project-specific structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${project.name} — Case Study by Brandon Kimathi`,
    description: project.overview,
    author: {
      "@type": "Person",
      name: "Brandon Kimathi",
      sameAs: "https://www.instagram.com/Tech_Nomad5",
    },
    keywords: project.tags.join(", "),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "CreativeWork",
            name: "Problem",
            description: project.problem,
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "CreativeWork",
            name: "Strategy",
            description: project.strategy,
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "CreativeWork",
            name: "System Structure",
            description: project.structure,
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "CreativeWork",
            name: "Outcomes",
            description: project.outcomes.join(". "),
          },
        },
      ],
    },
    about: {
      "@type": "Thing",
      name: project.name,
      description: project.overview,
      keywords: project.tags.join(", "),
    },
  };

  // Generate description from overview
  const description =
    project.overview.length > 160
      ? project.overview.substring(0, 157) + "..."
      : project.overview;

  return (
    <>
      <SEO
        title={`${project.name} | Brandon Kimathi — Case Study`}
        description={description}
        canonical={`https://brandonkimathi.com/work/${projectId}`}
        ogTitle={`${project.name} — Case Study by Brandon Kimathi`}
        ogDescription={project.overview}
        structuredData={structuredData}
      />

      <div className="w-full">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-accent mb-8 hover:gap-3 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Work
          </Link>

          {/* Project Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-3xl md:text-4xl font-light mb-4">
              {project.name}
            </h1>
            <div className="flex flex-wrap gap-2 mb-12">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-4 py-1 bg-accent/10 text-accent rounded-full font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <NeuCard>
              <h2 className="text-accent mb-4 text-lg">Overview</h2>
              <p className="leading-relaxed opacity-90">{project.overview}</p>
            </NeuCard>
          </motion.div>

          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <NeuCard className="mt-6">
              <h2 className="text-accent mb-4 text-lg">The Problem</h2>
              <p className="leading-relaxed opacity-90">{project.problem}</p>
            </NeuCard>
          </motion.div>

          {/* Strategy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <NeuCard className="mt-6">
              <h2 className="text-accent mb-4 text-lg">The Strategy</h2>
              <p className="leading-relaxed opacity-90">{project.strategy}</p>
            </NeuCard>
          </motion.div>

          {/* System Structure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <NeuCard className="mt-6">
              <h2 className="text-accent mb-4 text-lg">The System Structure</h2>
              <p className="leading-relaxed opacity-90">{project.structure}</p>
            </NeuCard>
          </motion.div>

          {/* Outcomes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <NeuCard className="mt-6">
              <h2 className="text-accent mb-4 text-lg">Outcomes</h2>
              <div className="space-y-3">
                {project.outcomes.map((outcome, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <span className="text-accent mt-1">•</span>
                    <p className="leading-relaxed opacity-90">{outcome}</p>
                  </motion.div>
                ))}
              </div>
            </NeuCard>
          </motion.div>

          {/* Next Project Suggestion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 pt-8 border-t border-accent/10 text-center"
          >
            <p className="text-sm text-foreground/40 mb-3">
              Continue exploring
            </p>
            <Link
              to="/"
              className="text-accent hover:underline inline-flex items-center gap-2 text-sm"
            >
              View all projects
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
