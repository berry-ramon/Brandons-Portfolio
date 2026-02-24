export interface Project {
  name: string;
  overview: string;
  problem: string;
  strategy: string;
  structure: string;
  outcomes: string[];
  tags: string[];
}

export interface Projects {
  [key: string]: Project;
}

export const projects: Projects = {
  "payment-platform": {
    name: "Payment Platform",
    overview:
      "A scalable payment infrastructure designed to handle multi-currency transactions, automated compliance checks, and real-time settlement processing across global markets.",
    problem:
      "Existing payment systems were fragmented, requiring manual reconciliation and lacking real-time visibility into transaction flows. Compliance requirements varied by region, creating operational bottlenecks.",
    strategy:
      "I architected a unified platform that separated core transaction logic from regional compliance modules. The system uses event-driven architecture to ensure atomic operations and audit trails. Payment flows were mapped to reduce latency and failure points.",
    structure:
      "The backend leverages microservices for payment processing, currency conversion, and fraud detection. Frontend interfaces provide real-time transaction monitoring with granular permission controls. Data pipelines ensure compliance reporting is automated and auditable.",
    outcomes: [
      "Reduced transaction processing time by 60%",
      "Automated 95% of compliance reporting workflows",
      "Enabled expansion into 12 new markets within 6 months",
      "Improved system uptime to 99.97%",
    ],
    tags: ["SaaS", "Payments", "Infrastructure"],
  },
  "admin-system": {
    name: "Admin System",
    overview:
      "A unified dashboard architecture that consolidates cross-team operations, enabling controlled data access, audit logging, and role-based permissions across organizational boundaries.",
    problem:
      "Teams relied on separate tools with inconsistent data models. Access control was manual and prone to errors. No centralized audit trail existed for sensitive operations.",
    strategy:
      "I designed a centralized admin layer with abstracted data access patterns. Role-based permissions were built into the system core, not bolted on. The architecture prioritizes auditability and traceability from day one.",
    structure:
      "The system uses a GraphQL API layer for flexible data queries while enforcing strict permissions. The frontend is modular, allowing teams to customize views without breaking core functionality. Background jobs handle data synchronization and notification routing.",
    outcomes: [
      "Consolidated 8 separate admin tools into one platform",
      "Reduced onboarding time for new admins by 70%",
      "Achieved 100% audit coverage for critical operations",
      "Decreased unauthorized access incidents to zero",
    ],
    tags: ["Admin Systems", "Architecture", "Operations"],
  },
  "user-analytics": {
    name: "User Analytics Engine",
    overview:
      "A real-time behavioral tracking system that processes event streams, generates actionable insights, and provides instant visibility into user patterns across product touchpoints.",
    problem:
      "Analytics data was delayed by hours, making it impossible to respond to user behavior in real time. Event tracking was inconsistent, leading to incomplete data sets and unreliable insights.",
    strategy:
      "I built an event-driven pipeline that captures, validates, and processes user actions in real time. The system prioritizes schema validation at ingestion to ensure data quality. Insights are generated through pre-computed aggregations rather than expensive queries.",
    structure:
      "The backend processes events using stream processing frameworks with automatic scaling. Data is stored in both hot storage for real-time queries and cold storage for historical analysis. The frontend provides customizable dashboards with sub-second query response times.",
    outcomes: [
      "Enabled real-time decision-making with <500ms latency",
      "Processed 50M+ events daily with 99.9% accuracy",
      "Reduced infrastructure costs by 40% through optimized storage",
      "Improved conversion tracking reliability to 98%",
    ],
    tags: ["Analytics", "Real-time", "Data"],
  },
  "api-gateway": {
    name: "API Gateway",
    overview:
      "A centralized request routing system with built-in authentication, rate limiting, and monitoring that serves as the entry point for all external and internal API traffic.",
    problem:
      "Individual services handled their own authentication and rate limiting, leading to inconsistent security policies and duplicated logic. Monitoring was fragmented, making it difficult to trace requests across services.",
    strategy:
      "I designed a gateway layer that standardizes authentication, applies consistent rate limiting, and provides unified observability. The architecture allows services to focus on business logic while the gateway handles cross-cutting concerns.",
    structure:
      "The gateway uses token-based authentication with automatic refresh logic. Rate limiting is configurable per client and endpoint. Request tracing provides end-to-end visibility with distributed tracing integration. The system auto-scales based on traffic patterns.",
    outcomes: [
      "Reduced security incidents by implementing consistent auth policies",
      "Improved API response time visibility with full request tracing",
      "Handled 10x traffic spikes without service degradation",
      "Decreased average incident resolution time by 50%",
    ],
    tags: ["Infrastructure", "API", "Security"],
  },
};
