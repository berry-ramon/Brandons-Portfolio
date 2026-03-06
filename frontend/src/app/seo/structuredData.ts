// src/seo/structuredData.ts
export const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://brandonkimathi.vercel.app/#person",
  name: "Brandon Kimathi",
  alternateName: ["B.Kimathi", "Tech_Nomad5", "Tech_Nomed5", "berry-ramon"],
  jobTitle: "Software Architecture Lead",
  description:
    "Software architect specializing in system design, backend infrastructure, and scalable platforms. Lead at KODÈS.",
  url: "https://brandonkimathi.vercel.app",
  sameAs: [
    "https://www.instagram.com/Tech_Nomad5",
    "https://github.com/berry-ramon",
    "https://www.linkedin.com/in/brandon-kimathi-9542a8301",
    "https://twitter.com/Tech_Nomad5",
  ],
  worksFor: {
    "@type": "Organization",
    "@id": "https://kodees.co.ke/#organization",
    name: "KODÈS",
    alternateName: ["Kodees", "KODÈS Africa"],
    url: "https://kodees.co.ke",
  },
  knowsAbout: [
    "System Architecture",
    "Backend Infrastructure",
    "API Design",
    "Cloud Architecture",
    "Payment Systems",
    "Scalable Platforms",
    "Ed-Tech Infrastructure",
    "Microservices",
    "Distributed Systems",
  ],
  alumniOf: {
    "@type": "Organization",
    name: "KODÈS",
  },
  nationality: {
    "@type": "Country",
    name: "Kenya",
  },
  birthPlace: {
    "@type": "City",
    name: "Nairobi",
    addressCountry: "KE",
  },
};

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://brandonkimathi.vercel.app/#organization",
  name: "Brandon Kimathi",
  url: "https://brandonkimathi.vercel.app",
  logo: "https://brandonkimathi.vercel.app/logo.png",
  sameAs: [
    "https://www.instagram.com/Tech_Nomad5",
    "https://github.com/berry-ramon",
    "https://www.linkedin.com/in/brandon-kimathi-9542a8301",
    "https://twitter.com/Tech_Nomad5",
  ],
  founder: {
    "@id": "https://brandonkimathi.vercel.app/#person",
  },
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://brandonkimathi.vercel.app/#website",
  name: "Brandon Kimathi",
  url: "https://brandonkimathi.vercel.app",
  description: "Software Architecture & System Design Portfolio",
  inLanguage: "en-US",
  publisher: {
    "@id": "https://brandonkimathi.vercel.app/#person",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://brandonkimathi.vercel.app/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export const imageObjectStructuredData = (
  imageUrl: string,
  caption: string,
) => ({
  "@context": "https://schema.org",
  "@type": "ImageObject",
  contentUrl: imageUrl,
  description: caption,
  name: caption,
  license: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
  acquireLicensePage: "https://brandonkimathi.vercel.app/contact",
});
