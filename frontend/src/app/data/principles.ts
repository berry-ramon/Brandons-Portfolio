export interface Principle {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  content: string;
  emphasis: string;
}

export const principles: Principle[] = [
  {
    id: "architecture-before-interface",
    eyebrow: "Foundation",
    title: "Architecture before interface",
    summary: "System structure defines what the interface needs to support.",
    content:
      "Data models, relationships, and core flows are mapped before any visual design begins. This ensures the foundation can scale without requiring constant rewrites. The interface becomes an expression of the architecture, not a constraint on it.",
    emphasis: "Structure dictates possibility. Form follows function.",
  },
  {
    id: "user-flow-before-features",
    eyebrow: "Clarity",
    title: "User flow before feature expansion",
    summary: "Complete journeys over feature breadth.",
    content:
      "End-to-end user journeys are completed before peripheral features are considered. A single well-executed flow delivers more value than a dozen half-implemented features. This approach reduces complexity and creates clarity in what the system actually does.",
    emphasis: "Depth of execution matters more than breadth of features.",
  },
  {
    id: "monetization-as-architecture",
    eyebrow: "Sustainability",
    title: "Monetization as system design",
    summary: "Business logic integrated at the architectural level.",
    content:
      "Payment flows, access control, and usage tracking are implemented as core system components, not post-launch additions. When monetization is part of the foundation, it scales naturally with the product and enables sustainable growth.",
    emphasis: "Business models should be built in, not bolted on.",
  },
  {
    id: "scalable-foundations",
    eyebrow: "Longevity",
    title: "Scalable foundations",
    summary: "Systems designed for growth without breaking.",
    content:
      "Patterns are chosen to support change, optimization is applied where it matters, and maintainability is prioritized over cleverness. Good architecture anticipates evolution and makes it easy rather than expensive.",
    emphasis: "The best systems adapt silently as requirements evolve.",
  },
];
