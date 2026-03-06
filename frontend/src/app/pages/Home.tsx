import { motion } from "motion/react";
import { HeroSection } from "../components/Home/HeroSection";
import { HowIBuildPreview } from "../components/Home/HowIBuildPreview";
import { Capabilities } from "../components/Home/Capabilities";
import { SelectedWork } from "../components/Home/SelectedWork";
import { ProductPhilosophy } from "../components/Home/ProductPhilosophy";
import { ClosingSection } from "../components/Home/ClosingSection";
import { useEffect } from "react";
import { useLocation } from "react-router";
import SEO from "../seo/SEO";
import { pageSEO } from "../seo/pageSEO";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#work") {
      setTimeout(() => {
        const element = document.getElementById("work");
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [location]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://brandonkimathi.com/#person",
        name: "Brandon Kimathi",
        jobTitle: "Software Architecture Lead",
        url: "https://brandonkimathi.com",
        sameAs: [
          "https://www.instagram.com/Tech_Nomad5",
          "https://github.com/berry-ramon",
          "https://www.linkedin.com/in/brandon-kimathi-9542a8301",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://brandonkimathi.com/#website",
        name: "Brandon Kimathi",
        url: "https://brandonkimathi.com",
        description: pageSEO.home.description,
        publisher: {
          "@id": "https://brandonkimathi.com/#person",
        },
      },
    ],
  };

  return (
    <>
      <SEO
        title={pageSEO.home.title}
        description={pageSEO.home.description}
        keywords={pageSEO.home.keywords}
        ogImage={pageSEO.home.ogImage}
        ogType={pageSEO.home.ogType}
        structuredData={structuredData}
      />

      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <HowIBuildPreview />
        <Capabilities />
        <SelectedWork />
        <ProductPhilosophy />
        <ClosingSection />
      </motion.div>
    </>
  );
}
