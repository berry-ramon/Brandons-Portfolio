export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  impact: string;
  tags: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "payment-platform",
    name: "Payment Platform",
    tagline: "Infrastructure for scalable transactions",
    description:
      "Multi-currency payment processing with built-in compliance automation and reconciliation flows.",
    impact: "Reduced transaction friction by 34%",
    tags: ["SaaS", "Payments", "Infrastructure"],
    featured: true,
  },
  {
    id: "admin-system",
    name: "Admin System",
    tagline: "Unified operations architecture",
    description:
      "Cross-team dashboard system with granular access control and audit logging.",
    impact: "Cut operations overhead by 28%",
    tags: ["Admin Systems", "Architecture", "Operations"],
    featured: false,
  },
  {
    id: "user-analytics",
    name: "Analytics Engine",
    tagline: "Real-time behavioral tracking",
    description:
      "Event stream processing system with custom funnel analysis and retention modeling.",
    impact: "47% faster insight generation",
    tags: ["Analytics", "Real-time", "Data"],
    featured: false,
  },
  {
    id: "api-gateway",
    name: "API Gateway",
    tagline: "Centralized request infrastructure",
    description:
      "Authentication, rate limiting, and monitoring layer for distributed services.",
    impact: "99.99% uptime across 200+ endpoints",
    tags: ["Infrastructure", "API", "Security"],
    featured: false,
  },
];
