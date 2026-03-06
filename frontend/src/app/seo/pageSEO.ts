// src/seo/pageSEO.ts
export const pageSEO = {
  home: {
    title: "Brandon Kimathi | Software Architecture & System Design",
    description:
      "Brandon Kimathi is a Software Architecture Lead specializing in system design, backend infrastructure, and scalable platforms. Building structured digital systems that last. Lead at KODÈS.",
    keywords: [
      "Brandon Kimathi",
      "KODÈS",
      "Kodees",
      "Tech_Nomad5",
      "Tech_Nomed5",
      "berry-ramon",
      "software architecture",
      "system design",
      "backend infrastructure",
      "API design",
      "cloud architecture",
      "scalable platforms",
      "Kenya",
      "Africa",
    ],
    ogImage: "https://brandonkimathi.vercel.app/preview_big.png",
    ogType: "profile" as const, // Use 'as const' for type safety
  },
  about: {
    title: "About Brandon Kimathi | Software Architect & System Designer",
    description:
      "Learn about Brandon Kimathi's journey in software architecture, his approach to building scalable systems, and his role as Lead at KODÈS.",
    keywords: [
      "about Brandon Kimathi",
      "software architect bio",
      "KODÈS lead",
      "system designer Kenya",
      "tech entrepreneur Africa",
    ],
    ogImage: "https://brandonkimathi.vercel.app/about-preview.png",
    ogType: "profile" as const,
  },
  work: {
    title:
      "Projects by Brandon Kimathi | System Design & Architecture Portfolio",
    description:
      "Explore projects built by Brandon Kimathi including payment platforms, admin systems, analytics engines, and scalable infrastructure solutions.",
    keywords: [
      "Brandon Kimathi projects",
      "software portfolio",
      "system design examples",
      "payment platform architecture",
      "admin system design",
      "analytics engine",
    ],
    ogImage: "https://brandonkimathi.vercel.app/work-preview.png",
    ogType: "website" as const,
  },
  howIThink: {
    title: "How Brandon Kimathi Thinks About Software Architecture",
    description:
      "Insights into Brandon Kimathi's approach to system design, architectural decisions, and building scalable digital infrastructure.",
    keywords: [
      "software philosophy",
      "architecture principles",
      "system design thinking",
      "tech insights Kenya",
      "software development approach",
    ],
    ogImage: "https://brandonkimathi.vercel.app/think-preview.png",
    ogType: "article" as const,
  },
  contact: {
    title: "Contact Brandon Kimathi | Software Architect & System Designer",
    description:
      "Get in touch with Brandon Kimathi for software architecture consultations, speaking engagements, or collaboration opportunities.",
    keywords: [
      "contact Brandon Kimathi",
      "software architect Kenya",
      "tech consultation",
      "hire software architect",
      "collaborate with developer",
    ],
    ogImage: "https://brandonkimathi.vercel.app/contact-preview.png",
    ogType: "website" as const,
  },
  kodees: {
    title:
      "KODÈS | Building Digital Infrastructure for Africa - Brandon Kimathi",
    description:
      "KODÈS, led by Brandon Kimathi, builds digital infrastructure for education and technology access across Africa.",
    keywords: [
      "KODÈS",
      "Kodees Africa",
      "digital infrastructure Kenya",
      "ed-tech Africa",
      "technology access",
      "Brandon Kimathi KODÈS",
    ],
    ogImage: "https://brandonkimathi.vercel.app/kodees-preview.png",
    ogType: "website" as const,
  },
  project: (projectId: string, projectData: any) => ({
    title: `${projectData.title} | Brandon Kimathi Portfolio`,
    description: projectData.description,
    keywords: projectData.keywords,
    ogImage: projectData.image,
    ogType: "article" as const,
    publishedTime: projectData.publishedDate,
    modifiedTime: projectData.modifiedDate,
    articleSection: projectData.category,
  }),
};
