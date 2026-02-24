import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Users, User } from "lucide-react";
import NeuCard from "../components/NeuCard";
import SEO from "../components/SEO";
import { projects } from "../data/work";
import { useState } from "react";

export default function Work() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === projectId);
  const [activeSection, setActiveSection] = useState<string>("overview");

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
  };

  const sections = [
    { id: "overview", label: "Overview", icon: "bx-info-circle" },
    { id: "challenge", label: "Challenge", icon: "bx-error-circle" },
    { id: "solution", label: "Solution", icon: "bx-bulb" },
    { id: "architecture", label: "Architecture", icon: "bx-git-branch" },
    { id: "outcomes", label: "Outcomes", icon: "bx-trending-up" },
  ];

  return (
    <>
      <SEO
        title={`${project.name} | Brandon Kimathi — Case Study`}
        description={project.overview.substring(0, 157) + "..."}
        canonical={`https://brandonkimathi.com/work/${project.id}`}
        ogTitle={`${project.name} — Case Study by Brandon Kimathi`}
        ogDescription={project.overview}
        structuredData={structuredData}
      />

      <div className="w-full bg-gradient-to-b from-background via-background to-surface/50">
        {/* Hero Section with Gradient */}
        <div
          className={`relative overflow-hidden bg-gradient-to-br ${project.color}`}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
            {/* Back Button */}
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 text-accent mb-8 hover:gap-3 transition-all group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Work
            </Link>

            {/* Project Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4">
                {project.name}
              </h1>

              <p className="text-xl md:text-2xl opacity-70 max-w-3xl font-light">
                {project.tagline}
              </p>

              {/* Project Meta */}
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Calendar className="w-4 h-4" />
                  <span className="font-mono">{project.timeline.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Users className="w-4 h-4" />
                  <span className="font-mono">{project.timeline.team}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <User className="w-4 h-4" />
                  <span className="font-mono">{project.timeline.role}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Journey Navigation - Mobile Roadmap */}
        <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-lg border-y border-accent/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex overflow-x-auto hide-scrollbar gap-1 py-4">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    document
                      .getElementById(section.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300
                    ${
                      activeSection === section.id
                        ? "bg-accent text-dark-cocoa"
                        : "text-foreground/60 hover:text-accent hover:bg-accent/5"
                    }`}
                >
                  <i className={`${section.icon} text-lg`}></i>
                  <span className="text-sm font-mono">{section.label}</span>

                  {/* Journey dots for mobile */}
                  <span className="md:hidden w-1 h-1 rounded-full bg-current opacity-40 ml-1" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Overview Section */}
          <section id="overview" className="mb-20 scroll-mt-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              <div className="md:col-span-1">
                <h2 className="text-2xl font-light sticky top-32">
                  <span className="text-accent font-mono text-sm block mb-2">
                    01
                  </span>
                  Overview
                </h2>
              </div>
              <div className="md:col-span-2">
                <NeuCard>
                  <p className="text-lg leading-relaxed opacity-90">
                    {project.overview}
                  </p>

                  {/* Tech Stack */}
                  <div className="mt-6 pt-6 border-t border-accent/10">
                    <h3 className="text-sm font-mono text-accent/60 mb-3">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 bg-accent/5 text-foreground/80 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </NeuCard>
              </div>
            </motion.div>
          </section>

          {/* Challenge Section */}
          <section id="challenge" className="mb-20 scroll-mt-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              <div className="md:col-span-1">
                <h2 className="text-2xl font-light sticky top-32">
                  <span className="text-accent font-mono text-sm block mb-2">
                    02
                  </span>
                  Challenge
                </h2>
              </div>
              <div className="md:col-span-2">
                <NeuCard>
                  <h3 className="text-accent text-lg mb-3">
                    {project.challenge.title}
                  </h3>
                  <p className="opacity-80 mb-6">
                    {project.challenge.description}
                  </p>

                  <div className="space-y-3">
                    {project.challenge.points.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="text-accent text-lg leading-none">
                          •
                        </span>
                        <span className="opacity-70">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </NeuCard>
              </div>
            </motion.div>
          </section>

          {/* Solution Section */}
          <section id="solution" className="mb-20 scroll-mt-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              <div className="md:col-span-1">
                <h2 className="text-2xl font-light sticky top-32">
                  <span className="text-accent font-mono text-sm block mb-2">
                    03
                  </span>
                  Solution
                </h2>
              </div>
              <div className="md:col-span-2">
                <NeuCard>
                  <h3 className="text-accent text-lg mb-3">
                    {project.solution.title}
                  </h3>
                  <p className="opacity-80 mb-6">
                    {project.solution.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.solution.approach.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-accent/5 rounded-xl"
                      >
                        <i className="bx bx-check-circle text-accent text-xl mb-2"></i>
                        <p className="text-sm">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </NeuCard>
              </div>
            </motion.div>
          </section>

          {/* Architecture Section */}
          <section id="architecture" className="mb-20 scroll-mt-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              <div className="md:col-span-1">
                <h2 className="text-2xl font-light sticky top-32">
                  <span className="text-accent font-mono text-sm block mb-2">
                    04
                  </span>
                  Architecture
                </h2>
              </div>
              <div className="md:col-span-2">
                <NeuCard>
                  <h3 className="text-accent text-lg mb-3">
                    {project.architecture.title}
                  </h3>
                  <p className="opacity-80 mb-6">
                    {project.architecture.description}
                  </p>

                  <div className="space-y-4">
                    {project.architecture.components.map((component, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 bg-accent/5 rounded-xl"
                      >
                        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-accent font-mono text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{component.name}</h4>
                          <p className="text-sm opacity-60">
                            {component.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </NeuCard>
              </div>
            </motion.div>
          </section>

          {/* Outcomes Section */}
          <section id="outcomes" className="mb-20 scroll-mt-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              <div className="md:col-span-1">
                <h2 className="text-2xl font-light sticky top-32">
                  <span className="text-accent font-mono text-sm block mb-2">
                    05
                  </span>
                  Outcomes
                </h2>
              </div>
              <div className="md:col-span-2">
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.outcomes.map((outcome, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <NeuCard>
                        <div className="text-center">
                          <div className="text-3xl font-light text-accent mb-2">
                            {outcome.value}
                          </div>
                          <h3 className="text-sm font-medium mb-2">
                            {outcome.metric}
                          </h3>
                          <p className="text-xs opacity-60">
                            {outcome.description}
                          </p>
                        </div>
                      </NeuCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-accent/10 text-center"
          >
            <p className="text-sm text-foreground/40 mb-4 font-mono">
              CONTINUE THE JOURNEY
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/#work"
                className="px-6 py-3 rounded-xl bg-accent text-dark-cocoa hover:bg-accent-hover transition-all inline-flex items-center gap-2"
              >
                <i className="bx bx-grid-alt"></i>
                View All Projects
              </Link>
              <Link
                to="/how-i-think"
                className="px-6 py-3 rounded-xl bg-surface text-foreground/80 hover:text-accent transition-all inline-flex items-center gap-2"
                style={{
                  boxShadow: "var(--neu-shadow-light), var(--neu-shadow-dark)",
                }}
              >
                <i className="bx bx-brain"></i>
                How I Think
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
