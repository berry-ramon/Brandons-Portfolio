export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  overview: string; // Add this field
  impact: string;
  tags: string[];
  featured: boolean;
  color?: string;
  outcomes?: Array<{
    value: string;
    metric: string;
    description?: string;
  }>;
}

export const projects: Project[] = [
  {
    id: "payment-platform",
    name: "Payment Platform",
    tagline: "Infrastructure for scalable transactions",
    description:
      "Multi-currency payment processing with built-in compliance automation and reconciliation flows.",
    overview:
      "A comprehensive payment infrastructure handling multi-currency transactions across multiple African countries with automated compliance and reconciliation flows.",
    impact: "Reduced transaction friction by 34%",
    tags: ["SaaS", "Payments", "Infrastructure"],
    featured: true,
    color: "from-blue-600 to-purple-600",
    outcomes: [
      {
        value: "34%",
        metric: "Reduced friction",
        description: "Transaction processing time decreased",
      },
      { value: "99.9%", metric: "Uptime", description: "System reliability" },
    ],
  },
  {
    id: "admin-system",
    name: "Admin System",
    tagline: "Unified operations architecture",
    description:
      "Cross-team dashboard system with granular access control and audit logging.",
    overview:
      "A unified dashboard architecture that consolidates multiple internal tools into a single interface with role-based access control and comprehensive audit trails.",
    impact: "Cut operations overhead by 28%",
    tags: ["Admin Systems", "Architecture", "Operations"],
    featured: false,
    color: "from-emerald-600 to-teal-600",
    outcomes: [
      {
        value: "28%",
        metric: "Reduced overhead",
        description: "Operations efficiency improved",
      },
      {
        value: "15+",
        metric: "Teams integrated",
        description: "Cross-departmental usage",
      },
    ],
  },
  {
    id: "user-analytics",
    name: "Analytics Engine",
    tagline: "Real-time behavioral tracking",
    description:
      "Event stream processing system with custom funnel analysis and retention modeling.",
    overview:
      "A real-time analytics platform processing 50M+ events daily, providing insights on user behavior, retention patterns, and conversion funnels.",
    impact: "47% faster insight generation",
    tags: ["Analytics", "Real-time", "Data"],
    featured: false,
    color: "from-amber-600 to-orange-600",
    outcomes: [
      {
        value: "50M+",
        metric: "Daily events",
        description: "Real-time processing",
      },
      {
        value: "47%",
        metric: "Faster insights",
        description: "Time to insight reduction",
      },
    ],
  },
  {
    id: "api-gateway",
    name: "API Gateway",
    tagline: "Centralized request infrastructure",
    description:
      "Authentication, rate limiting, and monitoring layer for distributed services.",
    overview:
      "A centralized API gateway handling authentication, rate limiting, and monitoring for 200+ microservices with 99.99% uptime.",
    impact: "99.99% uptime across 200+ endpoints",
    tags: ["Infrastructure", "API", "Security"],
    featured: false,
    color: "from-rose-600 to-pink-600",
    outcomes: [
      {
        value: "99.99%",
        metric: "Uptime",
        description: "Service availability",
      },
      { value: "200+", metric: "Endpoints", description: "Managed services" },
    ],
  },
];
