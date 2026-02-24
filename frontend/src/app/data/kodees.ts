export interface Role {
  title: string;
  context: string;
  areas: string[];
  focus: string;
}

export interface Organization {
  name: string;
  description: string;
  initiatives: string[];
  mission: string;
}

export interface System {
  id: string;
  name: string;
  description: string;
  purpose: string[];
}

export interface Contribution {
  areas: string[];
  core: string;
}

export interface Approach {
  principle: string;
  practices: string[];
  conviction: string;
}

export interface KodeesData {
  role: Role;
  organization: Organization;
  systems: System[];
  contribution: Contribution;
  approach: Approach;
  social: {
    handle: string;
    note: string;
  };
}

export const kodeesData: KodeesData = {
  role: {
    title: "Software Architecture Lead",
    context:
      "I lead system design and platform development for KODÈS' technical infrastructure.",
    areas: [
      "System architecture",
      "Backend infrastructure",
      "API design",
      "Security layers",
      "Payment systems",
      "Cloud architecture",
      "Performance optimization",
    ],
    focus: "My focus is building platforms that remain stable as they scale.",
  },

  organization: {
    name: "KODÈS",
    description:
      "A technology company building digital infrastructure for education across Africa.",
    initiatives: [
      "CODE-LABS  community tech hubs",
      "Digital literacy programs",
      "TVET partnerships",
      "Research & product development",
      "SaaS platforms",
      "Examination systems",
    ],
    mission:
      "KODÈS builds systems that make education infrastructure more accessible.",
  },

  systems: [
    {
      id: "lms",
      name: "KODÈS LMS",
      description:
        "Learning platform for training programs and digital examinations.",
      purpose: [
        "Multi-location deployment",
        "Access control",
        "Content delivery",
        "Data reporting",
      ],
    },
    {
      id: "codelabs",
      name: "CODE-LABS Network",
      description:
        "Infrastructure connecting distributed tech hubs under unified systems.",
      purpose: [
        "Centralized authentication",
        "Cloud sync",
        "Infrastructure monitoring",
      ],
    },
    {
      id: "exams",
      name: "Examination Infrastructure",
      description:
        "Secure assessment systems with verification and result management.",
      purpose: [
        "Encrypted delivery",
        "Identity verification",
        "Result processing",
        "Scalable architecture",
      ],
    },
    {
      id: "research",
      name: "Research & Product Infrastructure",
      description:
        "Technical foundations for internal tools and education platforms.",
      purpose: [
        "Internal SaaS tools",
        "Business platforms",
        "Education commerce",
        "Analytics systems",
      ],
    },
  ],

  contribution: {
    areas: [
      "Architecture planning",
      "Backend systems",
      "API structure",
      "Security",
      "Technical direction",
      "Infrastructure scaling",
      "Research to production",
    ],
    core: "I build platforms that don't need rewrites as they grow.",
  },

  approach: {
    principle: "I design systems as infrastructure, not feature sets.",
    practices: [
      "Design for scale without structural change",
      "Maintain security as a layer, not an add-on",
      "Build for modular expansion",
      "Optimize for multiple locations",
    ],
    conviction: "Architecture determines what's possible long-term.",
  },

  social: {
    handle: "@Tech_Nomad5",
    note: "I share development notes occasionally. Not a brand  just observations.",
  },
};
