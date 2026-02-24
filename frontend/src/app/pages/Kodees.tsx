import { motion } from "motion/react";
import SEO from "../components/SEO";
import { Overview } from "../components/Kodees/Overview";
import { AboutKodes } from "../components/Kodees/AboutKodes";
import { Systems } from "../components/Kodees/Systems";
import { Contribution } from "../components/Kodees/Contribution";
import { Approach } from "../components/Kodees/Approach";
import { Social } from "../components/Kodees/Social";
import { Closing } from "../components/Kodees/Closing";

export default function Kodees() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Brandon Kimathi",
        jobTitle: "Software Architecture Lead",
        worksFor: {
          "@type": "Organization",
          name: "KODÈS",
        },
        sameAs: ["https://www.instagram.com/Tech_Nomad5"],
      },
      {
        "@type": "Organization",
        name: "KODÈS",
        alternateName: ["Kodees", "KODÈS Africa"],
        url: "https://kodees.co.ke",
        logo: "https://kodees.co.ke/logo.png",
      },
      {
        "@type": "Role",
        roleName: "Software Architecture Lead",
        memberOf: {
          "@type": "Organization",
          name: "KODÈS",
        },
      },
    ],
  };

  return (
    <>
      <SEO
        title="Brandon Kimathi · Software Architecture Lead at KODÈS"
        description="Brandon Kimathi leads software architecture and system design at KODÈS, building digital infrastructure for education and technology access across Africa."
        canonical="https://brandonkimathi.com/kodees"
        structuredData={structuredData}
      />

      <motion.div
        className="w-full max-w-7xl mx-auto px-6 py-16 md:py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="block text-xs uppercase tracking-[0.3em] text-accent/40 font-mono mb-3">
            Infrastructure & Architecture
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight max-w-3xl">
            Brandon Kimathi · KODÈS
          </h1>

          <div className="w-20 h-px bg-accent/30 mt-6" />
        </motion.div>

        <div className="space-y-20 md:space-y-24">
          <Overview />
          <AboutKodes />
          <Systems />
          <Contribution />
          <Approach />
          <Social />
          <Closing />
        </div>
      </motion.div>
    </>
  );
}
