import { ROLE_TITLE } from "./site";

export const kodeesData = {
  role: {
    title: ROLE_TITLE,
    context: "I guide how KODÈS software is planned, built and kept running.",
    areas: ["Planning how systems fit together", "Servers and databases", "How apps talk to each other", "Security and logins", "Payments", "Cloud hosting", "Speed and reliability"],
    focus: "I want what we build to keep working as more people use it.",
  },
  organization: {
    name: "KODÈS",
    description: "KODÈS is a technology company in Kenya that builds digital tools for education across Africa.",
    initiatives: ["CODE-LABS community tech hubs", "Digital literacy programs", "TVET partnerships", "Research and product development", "Software products for schools and businesses", "Digital exam systems"],
    mission: "Make education tools easier to reach.",
  },
  systems: [
    { id: "lms", name: "KODÈS LMS", description: "The learning platform KODÈS uses to run training programs and exams online.", purpose: ["Runs in many locations", "Controls who can see what", "Delivers course content", "Produces reports"] },
    { id: "codelabs", name: "CODE-LABS Network", description: "Connects the community tech hubs so they work as one network.", purpose: ["One login across all hubs", "Data kept in sync through the cloud", "Monitoring that catches problems early"] },
    { id: "exams", name: "Exam systems", description: "Exam systems that check who is sitting the exam and keep results safe.", purpose: ["Exams delivered in encrypted form", "Identity checks", "Result processing", "Built to handle many candidates"] },
    { id: "research", name: "Research and products", description: "The foundations behind KODÈS internal tools and education products.", purpose: ["Internal software tools", "Business platforms", "Selling education products online", "Reporting and analytics"] },
  ],
  contribution: {
    areas: ["Planning the architecture", "Server-side systems", "How services connect", "Security", "Technical direction", "Growing systems as demand grows", "Taking research ideas to working products"],
    core: "I try to build systems that can grow without being rebuilt.",
  },
  approach: {
    principle: "I build systems to last, not just to ship features.",
    practices: ["Plan for growth from the start so the structure does not have to change", "Treat security as part of the design, not a final step", "Build in pieces that can be added to", "Make it work across many locations"],
    conviction: "The structure you choose early limits what you can do later.",
  },
  social: {
    handle: "@Tech_Nomad5",
    note: "I post development notes now and then. It is not a brand, just things I notice.",
  },
} as const;
