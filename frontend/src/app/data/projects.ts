export interface Outcome {
  label: string;
  description: string;
  value?: string;
  confirmed: boolean;
  note?: "confirm with Brandon";
}
export interface CaseStudy {
  id: string;
  name: string;
  featured: boolean;
  tags: string[];
  tagline: string;
  description: string;
  overview: string;
  impact: string;
  challenge: { title: string; description: string; points: string[] };
  solution: { title: string; description: string; approach: string[] };
  architecture: {
    title: string;
    description: string;
    components: { name: string; description: string }[];
  };
  outcomes: Outcome[];
  timeline: {
    duration: string;
    team: string;
    role: string;
    confirmed: false;
    note: "confirm with Brandon";
  };
  technologies: string[];
}
const pending = (
  label: string,
  description: string,
  value?: string,
): Outcome => ({
  label,
  description,
  value,
  confirmed: false,
  note: "confirm with Brandon",
});
export const projects: CaseStudy[] = [
  {
    id: "payment-platform",
    name: "Payment Platform",
    featured: true,
    tags: ["SaaS", "Payments", "Infrastructure", "Fintech"],
    tagline: "Payments that work across currencies.",
    description:
      "Takes payments in several currencies and handles compliance checks and reconciliation automatically.",
    overview:
      "A payment system built to take transactions in different currencies and settle them cleanly. Compliance rules for several regions sit in their own module, and matching payments to settlement reports happens automatically.",
    impact:
      "Less manual reconciliation and a clear record of every transaction.",
    challenge: {
      title: "The problem",
      description:
        "The old payment setup was split across many providers and could not keep up as the business grew.",
      points: [
        "Payments were matched by hand across many providers",
        "Nobody could see transactions moving in real time",
        "Rules that differ by region slowed everything down",
        "Money took days to settle",
      ],
    },
    solution: {
      title: "The fix",
      description:
        "One platform that keeps the core transaction logic separate from the rules of each region.",
      approach: [
        "Every payment step is recorded as an event",
        "Compliance rules for each region live in their own module",
        "Payments are matched to settlement reports as they arrive",
        "Every action leaves an audit trail",
      ],
    },
    architecture: {
      title: "How it is built",
      description:
        "Small independent services pass events to each other and keep a full history of every change.",
      components: [
        {
          name: "Payment Orchestrator",
          description:
            "Sends each transaction to the right processor and switches to a backup if one fails.",
        },
        {
          name: "Compliance Engine",
          description: "Checks each transaction against regional rules.",
        },
        {
          name: "Reconciliation Service",
          description: "Matches transactions with settlement reports.",
        },
        { name: "Fraud Detection", description: "Flags unusual patterns." },
      ],
    },
    outcomes: [
      pending(
        "Processing time",
        "Transactions are processed in seconds instead of minutes.",
        "60% or 34%",
      ),
      pending("Compliance", "Compliance reporting is automated.", "95%"),
      pending(
        "Market expansion",
        "The platform opened the way into new regions.",
        "12 markets in 6 months",
      ),
      pending(
        "Uptime",
        "Reliable, with no planned downtime.",
        "99.97% or 99.9%",
      ),
    ],
    timeline: {
      duration: "8 months",
      team: "4 engineers",
      role: "Architect",
      confirmed: false,
      note: "confirm with Brandon",
    },
    technologies: [
      "Node.js",
      "Kafka",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    id: "admin-system",
    name: "Admin System",
    featured: false,
    tags: ["Admin Systems", "Architecture", "Operations", "Enterprise"],
    tagline: "One place to run operations.",
    description:
      "A single dashboard for many teams, with fine control over who can do what and a full record of every action.",
    overview:
      "Teams were working in separate admin tools with different rules. This brings them into one interface where access is set by role and every sensitive action is logged.",
    impact: "Fewer tools to manage and a clear audit trail.",
    challenge: {
      title: "The problem",
      description: "Teams worked in separate tools with no shared rules.",
      points: [
        "Many separate admin tools used different interfaces",
        "Access was set by hand",
        "Sensitive actions left no record",
        "Data did not match across systems",
      ],
    },
    solution: {
      title: "The fix",
      description:
        "One admin layer with shared data access and governance built in.",
      approach: [
        "Roles and permissions at the core",
        "One GraphQL layer",
        "Complete audit logging",
        "Independent interface modules",
      ],
    },
    architecture: {
      title: "How it is built",
      description:
        "A GraphQL federation layer with fine-grained permissions and an event record.",
      components: [
        {
          name: "Auth Service",
          description:
            "One login with single sign-on and multi-factor support.",
        },
        {
          name: "Permission Engine",
          description: "Role-based access that updates in real time.",
        },
        {
          name: "Audit Log",
          description: "A permanent record of admin actions.",
        },
        {
          name: "Dashboard Service",
          description: "Builds the dashboard from independent modules.",
        },
      ],
    },
    outcomes: [
      pending(
        "Consolidation",
        "All admin tools merged into one platform.",
        "8 into 1",
      ),
      pending("Onboarding", "New admins get started faster.", "70%"),
      pending("Audit coverage", "Every critical action is recorded.", "100%"),
      pending(
        "Operations",
        "Fewer resources are needed to run operations.",
        "28%",
      ),
    ],
    timeline: {
      duration: "6 months",
      team: "3 engineers",
      role: "Architect",
      confirmed: false,
      note: "confirm with Brandon",
    },
    technologies: ["GraphQL", "React", "Node.js", "MongoDB", "Redis", "Docker"],
  },
  {
    id: "analytics-engine",
    name: "Analytics Engine",
    featured: false,
    tags: ["Analytics", "Real-time", "Data", "Big Data"],
    tagline: "See what users do as it happens.",
    description:
      "Processes events as they arrive and turns them into funnels and retention reports.",
    overview:
      "A real-time analytics system that takes in a stream of events and answers questions about behavior, retention and conversion without waiting for overnight reports.",
    impact: "Answers arrive in near real time instead of hours later.",
    challenge: {
      title: "The problem",
      description:
        "Data reached the team hours late, so decisions could not be made in the moment.",
      points: [
        "Data arrived hours late",
        "Events were tracked inconsistently",
        "Ad-hoc queries were expensive",
        "There was no live view",
      ],
    },
    solution: {
      title: "The fix",
      description:
        "A process that handles events as they arrive and prepares common answers in advance.",
      approach: [
        "Events are checked as they arrive",
        "Stream processing creates insight at once",
        "Common summaries are prepared early",
        "Older data moves to cheaper storage",
      ],
    },
    architecture: {
      title: "How it is built",
      description: "A streaming process serves live and historical analysis.",
      components: [
        {
          name: "Event Ingestion",
          description: "Takes in events through Kafka.",
        },
        {
          name: "Stream Processor",
          description: "Flink jobs compute live totals.",
        },
        {
          name: "Query Engine",
          description: "Presto answers interactive questions.",
        },
        {
          name: "Storage Layer",
          description: "ClickHouse holds recent data and S3 holds history.",
        },
      ],
    },
    outcomes: [
      pending(
        "Latency",
        "Decisions can be made in real time.",
        "under 500 milliseconds",
      ),
      {
        label: "Throughput",
        description: "Handles a very large daily event volume accurately.",
        value: "50M+ events a day",
        confirmed: true,
      },
      pending("Cost", "Lower running costs.", "40%"),
      pending("Conversion tracking", "More reliable data.", "98%"),
    ],
    timeline: {
      duration: "5 months",
      team: "2 engineers",
      role: "Developer",
      confirmed: false,
      note: "confirm with Brandon",
    },
    technologies: ["Kafka", "Flink", "ClickHouse", "Presto", "Go", "S3"],
  },
  {
    id: "api-gateway",
    name: "API Gateway",
    featured: false,
    tags: ["Infrastructure", "API", "Security", "Microservices"],
    tagline: "One front door for every service.",
    description:
      "Handles logins, rate limits and monitoring in one place for all the services behind it.",
    overview:
      "A central gateway in front of the services. It checks who is calling, limits how often, routes each request to a healthy instance and traces it.",
    impact: "Consistent security and easier troubleshooting.",
    challenge: {
      title: "The problem",
      description:
        "Each service handled its own security and monitoring, so nothing was consistent.",
      points: [
        "Login differed between services",
        "There was no central rate limiting",
        "Monitoring was scattered",
        "Tracing a request was hard",
      ],
    },
    solution: {
      title: "The fix",
      description: "A gateway that handles shared concerns once.",
      approach: [
        "One central login check using JWT",
        "Rate limits per client",
        "Distributed tracing",
        "Automatic service discovery",
      ],
    },
    architecture: {
      title: "How it is built",
      description:
        "A reverse proxy uses a chain of middleware and live settings.",
      components: [
        {
          name: "Auth Middleware",
          description: "Checks and refreshes JWT tokens.",
        },
        {
          name: "Rate Limiter",
          description: "Redis-backed limits and quotas.",
        },
        {
          name: "Service Discovery",
          description: "Routes requests to healthy instances.",
        },
        { name: "Tracing", description: "OpenTelemetry follows each request." },
      ],
    },
    outcomes: [
      pending(
        "Security",
        "Consistent login checks across every service.",
        "100%",
      ),
      {
        label: "Visibility",
        description: "Each request can be followed from start to finish.",
        confirmed: true,
      },
      pending(
        "Traffic",
        "Handled traffic spikes without slowing down.",
        "10 times",
      ),
      pending("Incident resolution", "Problems get fixed faster.", "50%"),
    ],
    timeline: {
      duration: "4 months",
      team: "2 engineers",
      role: "Technical owner",
      confirmed: false,
      note: "confirm with Brandon",
    },
    technologies: [
      "Node.js",
      "Express",
      "Redis",
      "JWT",
      "Docker",
      "Prometheus",
    ],
  },
];
