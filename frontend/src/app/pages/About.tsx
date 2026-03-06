import { motion } from "motion/react";
import { HeroIdentity } from "../components/About/HeroIdentity";
import { Philosophy } from "../components/About/Philosophy";
import { ExperienceDepth } from "../components/About/ExperienceDepth";
import { OperatingPrinciples } from "../components/About/OperatingPrinciples";
import { pageSEO } from "../seo/pageSEO";
import SEO from "../seo/SEO";

export default function About() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://brandonkimathi.com/#person",
    name: "Brandon Kimathi",
    givenName: "Brandon",
    familyName: "Kimathi",
    jobTitle: "Software Architecture Lead",
    description:
      "Software architect specializing in system design, backend infrastructure, and scalable platforms.",
    url: "https://brandonkimathi.com/about",
    sameAs: [
      "https://www.instagram.com/Tech_Nomad5",
      "https://github.com/berry-ramon",
      "https://www.linkedin.com/in/brandon-kimathi-9542a8301",
    ],
    worksFor: {
      "@type": "Organization",
      name: "KODÈS",
      url: "https://kodees.co.ke",
    },
    alumniOf: {
      "@type": "Organization",
      name: "KODÈS",
    },
    knowsAbout: [
      "System Architecture",
      "Backend Infrastructure",
      "API Design",
      "Cloud Architecture",
      "Scalable Platforms",
    ],
  };

  return (
    <>
      <SEO
        title={pageSEO.about.title}
        description={pageSEO.about.description}
        keywords={pageSEO.about.keywords}
        ogImage={pageSEO.about.ogImage}
        ogType={pageSEO.about.ogType}
        structuredData={structuredData}
      />

      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeroIdentity />
        <Philosophy />
        <ExperienceDepth />
        <OperatingPrinciples />
      </motion.div>
    </>
  );
}
