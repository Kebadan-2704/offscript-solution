export type ServiceLayoutVariant =
  | 'problem-first'
  | 'deliverable-forward'
  | 'technical-bento'
  | 'workflow-matrix'
  | 'infrastructure-split'
  | 'human-narrative';

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  problems: string[];
  deliverables: string[];
  technologies: string[];
  relatedProjectSlugs: string[];
  faqs: ServiceFAQ[];
  layoutVariant: ServiceLayoutVariant;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'software-engineering',
    slug: 'software-engineering',
    number: '01',
    title: 'Software Engineering',
    tagline: 'High-performance architectures, clean engineering and maintainable software systems.',
    description:
      'We architect, build, and maintain high-performance software systems engineered for scale. Rather than relying on fragile templates or bloated plugins, we deliver clean backend services, robust APIs, and resilient cloud architectures with strict type systems, continuous automated testing, and comprehensive domain-driven separation of concerns.',
    capabilities: [
      'Distributed Backend Architecture',
      'API Engineering & Contract Testing',
      'Cloud-Native Microservices',
      'Relational & Document Database Optimization',
      'Legacy Codebase Refactoring & Migration',
      'High-Throughput Concurrency Engineering',
    ],
    problems: [
      'Monolithic systems experiencing resource starvation under peak user concurrency',
      'Brittle API integrations causing silent data drift and financial discrepancies',
      'Runaway infrastructure spend stemming from un-profiled queries and memory leaks',
      'Severe regression frequency slowing feature velocity down to a standstill',
      'Lack of test automation forcing manual, high-risk production deployments',
    ],
    deliverables: [
      'Production-hardened backend binaries and containerised services',
      'Comprehensive automated test suites for unit, integration, and contract verification',
      'Architectural specifications and system sequence diagrams',
      'Zero-downtime database schema migration scripts',
      'Real-time telemetry and structured APM instrumentation',
    ],
    technologies: ['TypeScript', 'Node.js', 'Go', 'Python', 'PostgreSQL', 'Docker', 'Redis'],
    relatedProjectSlugs: ['campus-intelligence-platform', 'fleet-logistics-optimizer'],
    layoutVariant: 'problem-first',
    faqs: [
      {
        question: 'How do you handle technical debt in existing codebases?',
        answer:
          'We conduct comprehensive static analysis, memory profiling, and test coverage mapping before modifying production code. Refactoring is executed incrementally using branch-by-abstraction and canary deployments to ensure zero service disruption.',
      },
      {
        question: 'What automated testing standards do you enforce?',
        answer:
          'We enforce strict CI gates requiring unit test coverage on core business logic, automated API contract tests, and end-to-end user journey validations. Deployments are blocked if linting or typing fail.',
      },
      {
        question: 'Do you build bespoke APIs or integrate existing SaaS platforms?',
        answer:
          'We do both. We engineer custom high-throughput REST and GraphQL APIs when requirements demand proprietary logic, and build resilient, webhook-driven middleware to bridge third-party platforms with local databases.',
      },
      {
        question: 'What documentation is delivered alongside production code?',
        answer:
          'Every engagement delivers full architectural blueprints, OpenAPI/Swagger API schemas, deployment runbooks, disaster recovery procedures, and inline codebase documentation.',
      },
    ],
  },
  {
    id: 'web-mobile-development',
    slug: 'web-mobile-development',
    number: '02',
    title: 'Web & Mobile Development',
    tagline: 'Modern web applications and mobile experiences built with reliable, scalable foundations.',
    description:
      'We engineer responsive web platforms and cross-platform mobile applications focused on speed, offline reliability, and tactile polish. Utilizing modern component architectures, edge rendering, and native device capabilities, we deliver seamless interfaces that load instantly and respond smoothly across all screen sizes and network conditions.',
    capabilities: [
      'Full-Stack Next.js Web Platforms',
      'Cross-Platform iOS & Android Engineering',
      'Offline-First Local Synchronization',
      'Real-Time WebSocket & State Streaming',
      'Progressive Web Applications',
      'Design Token Systems & Component Libraries',
    ],
    problems: [
      'High mobile bounce rates caused by sluggish initial bundle loading and hydration',
      'Fractured user experiences between inconsistent web and native mobile interfaces',
      'Application crashes when operating in intermittent or offline network conditions',
      'Unmaintainable CSS architectures causing unpredictable cross-browser visual regressions',
      'Inaccessible interfaces failing WCAG 2.2 accessibility legal standards',
    ],
    deliverables: [
      'Production native app binaries for iOS TestFlight and Android App Bundles',
      'Static & streaming Next.js responsive web application',
      'Documented atomic UI component library matching Figma tokens',
      'Encrypted local SQLite/WatermelonDB offline storage engine',
      'Automated Playwright & Maestro end-to-end regression suites',
    ],
    technologies: ['React', 'Next.js', 'React Native', 'Tailwind CSS', 'TypeScript', 'SQLite'],
    relatedProjectSlugs: ['connected-wellness-telemetry', 'fleet-logistics-optimizer'],
    layoutVariant: 'deliverable-forward',
    faqs: [
      {
        question: 'Do you recommend cross-platform React Native or native Swift/Kotlin?',
        answer:
          'For 95% of studio projects, modern React Native with the New Architecture and TurboModules delivers near-native 60fps performance while sharing up to 80% of business logic across platforms. When low-level hardware or custom C++ drivers are required, we build native platform bridges.',
      },
      {
        question: 'How do you guarantee cross-browser and cross-device consistency?',
        answer:
          'We test automated viewport suites across 8 responsive breakpoints from mobile to ultra-wide screens on actual mobile and tablet hardware, backed by automated visual regression snapshots in headless Chromium, WebKit, and Firefox.',
      },
      {
        question: 'Can your web applications work completely offline?',
        answer:
          'Yes. We architect offline-first service workers and local indexed storage engines that queue user mutations securely and sync them deterministically against server endpoints upon network reconnection.',
      },
      {
        question: 'How do you ensure accessibility standards are met?',
        answer:
          'We build upon accessible unstyled Radix primitives, enforce WCAG 2.2 AA contrast ratios deterministically, provide comprehensive keyboard navigation paths, and verify with screen-reader audits.',
      },
    ],
  },
  {
    id: 'artificial-intelligence',
    slug: 'artificial-intelligence',
    number: '03',
    title: 'Artificial Intelligence',
    tagline: 'Practical AI solutions that integrate computer vision, machine learning and intelligent models.',
    description:
      'We deploy applied artificial intelligence that produces demonstrable operational utility rather than marketing hype. From edge computer vision models for micro-defect recognition to domain-specific retrieval-augmented generation pipelines, our AI engineering focuses strictly on accuracy, low inference latency, and verifiable data provenance.',
    capabilities: [
      'Edge Computer Vision & Anomaly Detection',
      'Retrieval-Augmented Generation Pipelines',
      'Domain Model Fine-Tuning & Quantization',
      'Automated Data Curation & Synthetic Generation',
      'Real-Time Vector Similarity Search',
      'Probabilistic Forecasting & Predictive Maintenance',
    ],
    problems: [
      'Human visual fatigue leading to defect escapes in high-speed manufacturing lines',
      'Generic commercial LLMs hallucinating critical operational procedures and data',
      'Prohibitive cloud GPU inference costs making AI features commercially non-viable',
      'Lack of auditability and explanation when automated models make edge decisions',
      'Unstructured corporate documentation resisting automated query and extraction',
    ],
    deliverables: [
      'Quantized ONNX/TensorRT model weights tailored for edge hardware',
      'Containerised inference microservices with Prometheus telemetry',
      'Automated benchmark evaluation scripts and test datasets',
      'Vector database embedding pipelines with hybrid sparse/dense search',
      'Human-in-the-loop review dashboard for low-confidence classifications',
    ],
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'FastAPI', 'Qdrant', 'HuggingFace'],
    relatedProjectSlugs: ['vision-anomaly-detector', 'intelligent-invoice-stream'],
    layoutVariant: 'technical-bento',
    faqs: [
      {
        question: 'How do you prevent hallucinations in generative AI implementations?',
        answer:
          'We enforce strict grounded retrieval architectures where models are constrained to quote verifiable source documents, backed by automated semantic verification passes and deterministic fallback prompts.',
      },
      {
        question: 'Can your models run on local hardware without sending data to third-party clouds?',
        answer:
          'Yes. We specialize in quantizing models to 4-bit and 8-bit formats using GGUF and TensorRT runtimes capable of local execution on edge servers or embedded devices, guaranteeing complete data sovereignty and zero per-token API charges.',
      },
      {
        question: 'What volume of training data is required to build a custom solution?',
        answer:
          'By leveraging transfer learning, synthetic data augmentation, and few-shot classification, we frequently achieve production-grade accuracy with fewer than 500 verified domain examples.',
      },
      {
        question: 'How is model performance maintained over time as real-world data shifts?',
        answer:
          'We deploy automated drift detection monitoring that triggers alerts when feature distributions deviate, supported by automated shadow validation pipelines for new model iterations.',
      },
    ],
  },
  {
    id: 'automation-intelligent-workflows',
    slug: 'automation-intelligent-workflows',
    number: '04',
    title: 'Automation & Workflows',
    tagline: 'Eliminating operational friction through event-driven automation and intelligent workflows.',
    description:
      'We eliminate tedious operational bottlenecks by engineering automated pipelines that orchestrate disparate software, hardware telemetry, and cloud services into cohesive, self-healing workflows. Using event queues, idempotency keys, and automated recovery protocols, our code-first automations handle complex business logic with absolute audit transparency.',
    capabilities: [
      'Event-Driven Distributed Choreography',
      'Intelligent OCR & Multi-Format Document Ingestion',
      'ERP & Legacy System Data Synchronization',
      'Idempotent Webhook Processing Engines',
      'Self-Healing Error Recovery & Dead-Letter Queues',
      'Operational Auditing & Compliance Telemetry',
    ],
    problems: [
      'Costly human errors during manual cross-system data entry between CRM and ERP',
      'Delayed invoice reconciliation creating working capital bottlenecks and supplier disputes',
      'Silent workflow failures in no-code tools without automated notifications or retry paths',
      'Disjointed communication handoffs between warehouse logistics and financial teams',
      'Inability to audit transaction histories for regulatory compliance reviews',
    ],
    deliverables: [
      'Event-driven worker clusters running on serverless or containerised infrastructure',
      'Idempotent ingestion APIs with guaranteed at-least-once message delivery',
      'Automated reconciliation rules engine with threshold exception routing',
      'Centralized operational status and error tracing dashboard',
      'End-to-end integration test harnesses simulating third-party API outages',
    ],
    technologies: ['Node.js', 'Python', 'Redis', 'BullMQ', 'PostgreSQL', 'Upstash', 'Docker'],
    relatedProjectSlugs: ['intelligent-invoice-stream', 'campus-intelligence-platform'],
    layoutVariant: 'workflow-matrix',
    faqs: [
      {
        question: 'Why choose custom code-first automation over Zapier or Make?',
        answer:
          'No-code tools lack deterministic concurrency control, atomic transactions, idempotency guarantees, and version-controlled automated test suites. Our code-first workflows run within your infrastructure, eliminate third-party per-task subscription taxes, and scale safely under load.',
      },
      {
        question: 'What happens when a third-party API goes down mid-workflow?',
        answer:
          'Our pipelines implement exponential backoff retries, persistent message queues, and dead-letter storage. Tasks are automatically resumed when upstream systems recover, with zero duplicate executions or data loss.',
      },
      {
        question: 'How do you handle unstructured data like scanned paper invoices?',
        answer:
          'We combine optical character recognition with targeted language models that extract key-value pairs against a strictly validated schema, routing low-confidence exceptions to an internal review portal.',
      },
      {
        question: 'Can your automation integrate with on-premise legacy enterprise databases?',
        answer:
          'Yes. We deploy lightweight, secure bridge agents that establish encrypted outbound reverse tunnels to orchestrate transactions against local SQL Server, Oracle, or AS400 databases without opening inbound firewall ports.',
      },
    ],
  },
  {
    id: 'cloud-digital-infrastructure',
    slug: 'cloud-digital-infrastructure',
    number: '05',
    title: 'Cloud & Digital Infrastructure',
    tagline: 'Reliable, scalable and maintainable infrastructure built for modern applications.',
    description:
      'We configure cloud architectures with security, resilience, and cost-efficiency at their core. Using Infrastructure as Code, automated CI/CD pipelines, and proactive observability, we build operational foundations that scale predictably without operational drama, ensuring high availability while slashing unnecessary compute overhead.',
    capabilities: [
      'Infrastructure as Code with Terraform & OpenTofu',
      'Multi-Stage Automated CI/CD Pipelines',
      'Zero-Trust VPC & Cloud Security Architecture',
      'High-Availability Database Clustering & Failover',
      'Distributed Tracing & Real-Time APM Observability',
      'Cloud FinOps & Infrastructure Cost Optimization',
    ],
    problems: [
      'Frequent deployment outages caused by un-reproducible manual server environments',
      'Runaway cloud hosting invoices bloated by un-optimized compute instances and idle assets',
      'Single points of failure leaving entire business operations vulnerable to datacenter outages',
      'Lack of actionable metrics during production incidents leading to prolonged downtime',
      'Inadequate data isolation failing SOC2 and GDPR compliance audits',
    ],
    deliverables: [
      'Fully modular Terraform/OpenTofu repositories for one-click environment replication',
      'Automated GitHub Actions deployment workflows with preview environments',
      'Zero-downtime rolling and blue-green deployment configurations',
      'Centralized Prometheus/Grafana or Datadog observability dashboards',
      'Disaster recovery playbooks with verified RPO and RTO milestones',
    ],
    technologies: ['AWS', 'Google Cloud', 'Docker', 'Terraform', 'PostgreSQL', 'GitHub Actions', 'Redis'],
    relatedProjectSlugs: ['campus-intelligence-platform', 'iot-telemetry-array'],
    layoutVariant: 'infrastructure-split',
    faqs: [
      {
        question: 'Do you manage client cloud accounts directly or deploy into our infrastructure?',
        answer:
          'We deploy strictly into your own cloud accounts across AWS, GCP, or Azure. You retain 100% root ownership, cryptographic key control, and IP rights. We never lock clients into proprietary hosting silos.',
      },
      {
        question: 'How do you prevent cloud bill shock and control monthly costs?',
        answer:
          'We implement strict right-sizing of instances, automated scale-to-zero configurations for development environments, explicit billing alert thresholds, and intelligent spot/reserved instance policies.',
      },
      {
        question: 'What is your standard for disaster recovery and backup integrity?',
        answer:
          'We configure automated point-in-time database backups replicated to geographically isolated regions, coupled with automated restoration verification scripts that test recovery capability monthly.',
      },
      {
        question: 'How do you secure cloud environments against unauthorized access?',
        answer:
          'We enforce strict least-privilege IAM policies, rotate secrets automatically via encrypted key vaults, enforce multi-factor authentication, and isolate private workloads within non-public subnets behind zero-trust reverse proxies.',
      },
    ],
  },
  {
    id: 'ui-ux-digital-experiences',
    slug: 'ui-ux-digital-experiences',
    number: '06',
    title: 'UI/UX & Digital Experiences',
    tagline: 'Thoughtful experiences that combine usability, aesthetics and business objectives.',
    description:
      'We design human-centred digital interfaces rooted in cognitive clarity, brand distinctiveness, and ergonomic efficiency. Rejecting generic templates in favor of bespoke visual systems, we combine high-fidelity prototyping, systematic design tokens, and strict accessibility compliance to create commanding, conversion-focused digital products.',
    capabilities: [
      'End-to-End Digital Product Design',
      'UX Research & Ergonomic Workflow Optimization',
      'High-Fidelity Interactive Prototyping',
      'Scalable Design System & Component Engineering',
      'Motion Design & Micro-Interaction Choreography',
      'WCAG 2.2 AA Accessibility Audits & Remediation',
    ],
    problems: [
      'Dense, complex enterprise software interfaces overwhelming user comprehension',
      'Generic template visuals degrading perceived enterprise authority and pricing power',
      'Inconsistent interface conventions across fragmented product suites confusing users',
      'High onboarding abandonment rates at critical friction points in user journeys',
      'Inaccessible color palettes and keyboard traps creating legal liability',
    ],
    deliverables: [
      'Comprehensive Figma component libraries synced with code design tokens',
      'Clickable interactive prototypes demonstrating fluid transitions and edge cases',
      'Detailed user journey maps, wireframes, and interaction specifications',
      'WCAG 2.2 AA accessibility audit report with concrete remediation patches',
      'Production-ready SVG and WebP vector graphic asset suites',
    ],
    technologies: ['Figma', 'Radix UI', 'CSS Theme Tokens', 'Motion', 'Tailwind CSS', 'Storybook'],
    relatedProjectSlugs: ['connected-wellness-telemetry', 'campus-intelligence-platform'],
    layoutVariant: 'human-narrative',
    faqs: [
      {
        question: 'What makes your design process different from traditional creative agencies?',
        answer:
          'We design with deep engineering literacy. Every component, typographic scale, and animation timing curve is conceived with real DOM performance, responsive rendering, and accessible markup in mind.',
      },
      {
        question: 'How do you deliver design systems so developers can implement them cleanly?',
        answer:
          'We deliver tokenized design systems where Figma color, spacing, and typography styles map directly 1:1 to Tailwind CSS configuration variables and typed component properties.',
      },
      {
        question: 'Do you conduct user testing during the design process?',
        answer:
          'Yes. We test interactive high-fidelity prototypes against target domain users to validate information hierarchy, measure time-to-task completion, and eliminate friction before writing production code.',
      },
      {
        question: 'How do you balance distinctive aesthetic beauty with functional usability?',
        answer:
          'We believe true beauty arises from clarity and restraint. We use bold typography, deliberate negative space, and disciplined color distribution to command visual attention without compromising utility or speed.',
      },
    ],
  },
];
