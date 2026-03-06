import { motion } from "motion/react";
import SEO from "../seo/SEO";
import { principles } from "../data/principles";
import { PrincipleBlock } from "../components/PrincipleBlock";
import { TimelineIndicator } from "../components/TimelineIndicator";
import { ClosingStatement } from "../components/ClosingStatement";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export default function HowIThink() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How I Think About Building — System Design Philosophy",
    description:
      "A framework for systematic product development. Principles guiding architectural decisions, feature prioritization, and long-term strategy.",
    author: {
      "@type": "Person",
      name: "Brandon Kimathi",
      sameAs: "https://www.instagram.com/Tech_Nomad5",
    },
    keywords: [
      "system architecture",
      "software design principles",
      "product development",
      "scalable systems",
      "technical leadership",
    ],
    mainEntity: {
      "@type": "ItemList",
      itemListElement: principles.map((principle, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: principle.title,
          description: principle.summary,
        },
      })),
    },
    datePublished: "2025",
    dateModified: new Date().toISOString().split("T")[0],
  };

  return (
    <>
      <SEO
        title="How I Think | Brandon Kimathi — System Design Philosophy"
        description="A framework for systematic product development. Principles guiding architectural decisions, feature prioritization, and long-term strategy. Structure before interface, flow before features."
        canonical="https://brandonkimathi.com/how-i-think"
        ogTitle="How I Think About Building — System Design Philosophy"
        ogDescription="Principles for systematic product development and architectural decision-making."
        structuredData={structuredData}
        ogType="article"
        publishedTime="2025-01-01"
        modifiedTime={new Date().toISOString().split("T")[0]}
        articleSection="Philosophy"
      />

      <div className="w-full bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 lg:py-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 md:mb-20 max-w-3xl"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-accent/50 mb-3 block font-mono">
              Philosophy
            </span>
            <h1 className="mb-4 text-3xl md:text-4xl font-light">
              How I think about building
            </h1>
            <p className="text-base md:text-lg opacity-70 max-w-2xl leading-relaxed">
              A framework for systematic product development. These principles
              guide architectural decisions, feature prioritization, and
              long-term strategy.
            </p>
          </motion.div>

          {/* Principles with timeline */}
          <div className="relative">
            <TimelineIndicator />

            <motion.div
              className="relative space-y-12 md:space-y-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {principles.map((principle, index) => (
                <PrincipleBlock
                  key={principle.id}
                  principle={principle}
                  index={index}
                  isAlternate={index % 2 === 1}
                />
              ))}
            </motion.div>
          </div>

          {/* Closing statement */}
          <ClosingStatement />
        </div>
      </div>
    </>
  );
}
