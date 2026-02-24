import { motion } from "motion/react";
import SEO from "../components/SEO";
import { HeroIdentity } from "../components/About/HeroIdentity";
import { Philosophy } from "../components/About/Philosophy";
import { ExperienceDepth } from "../components/About/ExperienceDepth";
import { OperatingPrinciples } from "../components/About/OperatingPrinciples";

export default function About() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Brandon Kimathi",
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
        title="About | Brandon Kimathi — Software Architecture & System Design"
        description="Brandon Kimathi is a Software Architecture Lead focused on building structured digital systems that scale. Based in Kenya, working across Africa. Specializing in system architecture, backend infrastructure, and scalable platforms."
        canonical="https://brandonkimathi.com/about"
        ogTitle="About Brandon Kimathi — Software Architecture Lead"
        ogDescription="Software architect building structured digital systems that scale. Lead at KODÈS."
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
