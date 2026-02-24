export interface Project {
  id: string;
  name: string;
  tagline: string;
  overview: string;
  challenge: {
    title: string;
    description: string;
    points: string[];
  };
  solution: {
    title: string;
    description: string;
    approach: string[];
  };
  architecture: {
    title: string;
    description: string;
    components: Array<{
      name: string;
      description: string;
    }>;
  };
  outcomes: Array<{
    metric: string;
    value: string;
    description: string;
  }>;
  timeline: {
    duration: string;
    team: string;
    role: string;
  };
  technologies: string[];
  tags: string[];
  featured: boolean;
  color: string; // For accent variation
}

export const projects: Project[] = [
  {
    id: "payment-platform",
    name: "Payment Platform",
    tagline: "Infrastructure for scalable transactions",
    overview:
      "A scalable payment infrastructure designed to handle multi-currency transactions, automated compliance checks, and real-time settlement processing across global markets.",
    challenge: {
      title: "The Challenge",
      description:
        "Existing payment systems were fragmented and couldn't scale with business growth.",
      points: [
        "Manual reconciliation across 12+ payment providers",
        "No real-time visibility into transaction flows",
        "Regional compliance requirements creating bottlenecks",
        "Settlement delays of 3-5 days",
      ],
    },
    solution: {
      title: "The Solution",
      description:
        "A unified platform separating core transaction logic from regional compliance modules.",
      approach: [
        "Event-driven architecture for atomic operations",
        "Modular compliance layer per region",
        "Real-time reconciliation engine",
        "Automated audit trails",
      ],
    },
    architecture: {
      title: "System Architecture",
      description:
        "Microservices-based infrastructure with event sourcing and CQRS patterns.",
      components: [
        {
          name: "Payment Orchestrator",
          description:
            "Routes transactions to appropriate processors with fallback logic",
        },
        {
          name: "Compliance Engine",
          description:
            "Validates transactions against regional regulations in real-time",
        },
        {
          name: "Reconciliation Service",
          description:
            "Matches transactions with settlement reports automatically",
        },
        {
          name: "Fraud Detection",
          description: "ML-based anomaly detection for suspicious patterns",
        },
      ],
    },
    outcomes: [
      {
        metric: "Processing Time",
        value: "60% reduction",
        description:
          "Transaction processing time decreased from minutes to seconds",
      },
      {
        metric: "Compliance",
        value: "95% automated",
        description: "Compliance reporting workflows now fully automated",
      },
      {
        metric: "Market Expansion",
        value: "12 new markets",
        description: "Expanded into new regions within 6 months",
      },
      {
        metric: "Uptime",
        value: "99.97%",
        description: "System reliability with zero planned downtime",
      },
    ],
    timeline: {
      duration: "8 months",
      team: "4 engineers",
      role: "Lead Architect",
    },
    technologies: [
      "Node.js",
      "Kafka",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Kubernetes",
    ],
    tags: ["SaaS", "Payments", "Infrastructure", "Fintech"],
    featured: true,
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    id: "admin-system",
    name: "Admin System",
    tagline: "Unified operations architecture",
    overview:
      "A unified dashboard architecture consolidating cross-team operations with granular access control and comprehensive audit logging.",
    challenge: {
      title: "The Challenge",
      description:
        "Teams operated in silos with inconsistent tools and no centralized governance.",
      points: [
        "8 separate admin tools with different interfaces",
        "Manual access control prone to errors",
        "No audit trail for sensitive operations",
        "Inconsistent data across systems",
      ],
    },
    solution: {
      title: "The Solution",
      description:
        "A centralized admin layer with abstracted data access patterns and built-in governance.",
      approach: [
        "Role-based permissions at the system core",
        "GraphQL federation for unified data access",
        "Comprehensive audit logging",
        "Modular frontend architecture",
      ],
    },
    architecture: {
      title: "System Architecture",
      description:
        "GraphQL federation layer with fine-grained authorization and event sourcing.",
      components: [
        {
          name: "Auth Service",
          description: "Centralized authentication with SSO and MFA support",
        },
        {
          name: "Permission Engine",
          description:
            "Dynamic role-based access control with real-time updates",
        },
        {
          name: "Audit Log",
          description: "Immutable event store for all administrative actions",
        },
        {
          name: "Dashboard Service",
          description: "Modular frontend composition with micro-frontends",
        },
      ],
    },
    outcomes: [
      {
        metric: "Consolidation",
        value: "8→1 platform",
        description: "Unified all admin tools into a single platform",
      },
      {
        metric: "Onboarding",
        value: "70% faster",
        description: "Reduced admin onboarding time significantly",
      },
      {
        metric: "Audit Coverage",
        value: "100%",
        description: "Complete audit trail for all critical operations",
      },
      {
        metric: "Security Incidents",
        value: "Zero",
        description: "No unauthorized access since deployment",
      },
    ],
    timeline: {
      duration: "6 months",
      team: "3 engineers",
      role: "System Architect",
    },
    technologies: ["GraphQL", "React", "Node.js", "MongoDB", "Redis", "Docker"],
    tags: ["Admin Systems", "Architecture", "Operations", "Enterprise"],
    featured: false,
    color: "from-green-500/20 to-teal-500/20",
  },
  {
    id: "analytics-engine",
    name: "Analytics Engine",
    tagline: "Real-time behavioral tracking",
    overview:
      "A real-time behavioral tracking system processing event streams with sub-second latency for actionable insights.",
    challenge: {
      title: "The Challenge",
      description:
        "Analytics data was delayed by hours, making real-time decisions impossible.",
      points: [
        "Data latency of 2-4 hours",
        "Inconsistent event tracking",
        "Expensive ad-hoc queries",
        "No real-time user behavior insights",
      ],
    },
    solution: {
      title: "The Solution",
      description:
        "Event-driven pipeline with stream processing and pre-computed aggregations.",
      approach: [
        "Real-time event ingestion with validation",
        "Stream processing for instant insights",
        "Pre-computed aggregations for performance",
        "Hot/cold storage optimization",
      ],
    },
    architecture: {
      title: "System Architecture",
      description:
        "Stream processing pipeline with Lambda architecture for real-time and batch analytics.",
      components: [
        {
          name: "Event Ingestion",
          description: "Kafka-based ingestion handling 50M+ daily events",
        },
        {
          name: "Stream Processor",
          description: "Flink jobs for real-time aggregations",
        },
        {
          name: "Query Engine",
          description: "Presto for interactive analytics",
        },
        {
          name: "Storage Layer",
          description: "ClickHouse for real-time, S3 for historical",
        },
      ],
    },
    outcomes: [
      {
        metric: "Latency",
        value: "<500ms",
        description: "Real-time decision-making capability",
      },
      {
        metric: "Throughput",
        value: "50M+ events/day",
        description: "Processed with 99.9% accuracy",
      },
      {
        metric: "Cost Reduction",
        value: "40%",
        description: "Infrastructure costs optimized",
      },
      {
        metric: "Conversion Tracking",
        value: "98% reliability",
        description: "Improved data accuracy",
      },
    ],
    timeline: {
      duration: "5 months",
      team: "2 engineers",
      role: "Lead Developer",
    },
    technologies: ["Kafka", "Flink", "ClickHouse", "Presto", "Go", "S3"],
    tags: ["Analytics", "Real-time", "Data", "Big Data"],
    featured: false,
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    id: "api-gateway",
    name: "API Gateway",
    tagline: "Centralized request infrastructure",
    overview:
      "A centralized request routing system with built-in authentication, rate limiting, and monitoring for distributed services.",
    challenge: {
      title: "The Challenge",
      description:
        "Services handled their own security and monitoring, leading to inconsistencies.",
      points: [
        "Inconsistent authentication across services",
        "No centralized rate limiting",
        "Fragmented monitoring",
        "Difficult request tracing",
      ],
    },
    solution: {
      title: "The Solution",
      description:
        "Gateway layer standardizing cross-cutting concerns with pluggable middleware.",
      approach: [
        "Centralized authentication with JWT",
        "Configurable rate limiting per client",
        "Distributed tracing integration",
        "Automatic service discovery",
      ],
    },
    architecture: {
      title: "System Architecture",
      description:
        "Reverse proxy with middleware pipeline and dynamic configuration.",
      components: [
        {
          name: "Auth Middleware",
          description: "JWT validation with automatic refresh",
        },
        {
          name: "Rate Limiter",
          description: "Redis-backed rate limiting with quotas",
        },
        {
          name: "Service Discovery",
          description: "Dynamic routing to healthy instances",
        },
        {
          name: "Tracing",
          description: "OpenTelemetry integration for full visibility",
        },
      ],
    },
    outcomes: [
      {
        metric: "Security",
        value: "100% coverage",
        description: "Consistent auth across all services",
      },
      {
        metric: "Visibility",
        value: "End-to-end tracing",
        description: "Complete request flow visibility",
      },
      {
        metric: "Scalability",
        value: "10x spikes",
        description: "Handled traffic spikes without degradation",
      },
      {
        metric: "Incident Resolution",
        value: "50% faster",
        description: "Reduced mean time to resolution",
      },
    ],
    timeline: {
      duration: "4 months",
      team: "2 engineers",
      role: "Technical Lead",
    },
    technologies: [
      "Node.js",
      "Express",
      "Redis",
      "JWT",
      "Docker",
      "Prometheus",
    ],
    tags: ["Infrastructure", "API", "Security", "Microservices"],
    featured: false,
    color: "from-indigo-500/20 to-blue-500/20",
  },
];
