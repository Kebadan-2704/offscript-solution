export interface SolutionConcept {
  title: string;
  label: string; // e.g. 'Concept'
  description: string;
  technologies: string[];
}

export interface SolutionGroup {
  id: string;
  slug: string;
  category: string;
  tagline: string;
  whatItIs: string;
  typicalProblems: string[];
  howOffscriptApproachesIt: string;
  exampleConcepts: SolutionConcept[];
  technologies: string[];
  bgTheme: 'ivory' | 'ink' | 'sage' | 'sand';
  colSpan?: string;
  conceptLabel: string;
  title: string;
  description: string;
  approach: string;
}

export const SOLUTION_GROUPS: SolutionGroup[] = [
  {
    id: 'ai-solutions',
    slug: 'artificial-intelligence-solutions',
    category: 'Artificial Intelligence Solutions',
    conceptLabel: 'Concept: Edge Vision & Reasoning',
    title: 'Applied AI pipelines solving concrete vision and reasoning bottlenecks.',
    tagline: 'Moving AI from speculative experiments into deterministic production systems.',
    whatItIs:
      'Purpose-built machine learning architectures integrating edge-quantized computer vision, domain-specific retrieval-augmented generation, and deterministic reasoning engines. Rather than generic API wrappers that break under real-world variation, we build self-hosted and edge-deployed models optimized for latency, low unit cost, and verifiable data sovereignty.',
    typicalProblems: [
      'Visual defect escapes in high-speed manufacturing lines caused by human inspection fatigue',
      'Prohibitive per-token API charges making commercial cloud LLM implementations financially non-viable',
      'Generic models hallucinating critical compliance guidelines, operational metrics, or parts numbers',
      'Inability to run models on local industrial hardware without continuous cloud network connections',
    ],
    howOffscriptApproachesIt:
      'We treat AI as a deterministic engineering component rather than a black box. We curate focused domain training sets, distill larger models into sub-30ms INT8/FP16 edge binaries, implement automated semantic evaluation benchmarks, and always provide human-in-the-loop exception routing for borderline confidence scores.',
    exampleConcepts: [
      {
        title: 'Autonomous Vision Quality Inspector',
        label: 'Concept',
        description:
          'Sub-30ms industrial surface defect classification executing directly on edge Jetson hardware via TensorRT.',
        technologies: ['PyTorch', 'TensorRT', 'OpenCV', 'CUDA', 'FastAPI'],
      },
      {
        title: 'Grounded Operational Knowledge Engine',
        label: 'Concept',
        description:
          'Private retrieval-augmented generation architecture constrained to proprietary enterprise technical manuals.',
        technologies: ['Python', 'Qdrant', 'HuggingFace', 'FastAPI', 'Docker'],
      },
    ],
    technologies: ['PyTorch', 'TensorRT', 'OpenCV', 'Qdrant', 'FastAPI', 'Docker'],
    bgTheme: 'ink',
    colSpan: 'lg:col-span-7',
    description:
      'We combine embedded computer vision, edge-optimised inference, and domain-tuned models to automate visual quality control, surface anomalies, and eliminate human inspection fatigue.',
    approach:
      'Data-first architectural modeling: baseline dataset validation, model distillation for latency, and isolated edge execution with cloud synchronization.',
  },
  {
    id: 'saas-products',
    slug: 'saas-product-development',
    category: 'SaaS Product Development',
    conceptLabel: 'Concept: Multi-Tenant Architecture',
    title: 'Multi-tenant cloud platforms engineered for scale and high concurrency.',
    tagline: 'Subscription architectures built with rock-solid data isolation and speed.',
    whatItIs:
      'Complete end-to-end software-as-a-service platforms featuring multi-tenant database isolation, role-based access governance, deterministic subscription billing, and real-time operational interfaces. Built to handle sudden tenant traffic spikes with zero cross-tenant data leakage and sub-100ms API responses.',
    typicalProblems: [
      'Noisy neighbor problems where one tenant’s database query slows down all other active users',
      'Security and compliance nightmares caused by shared, un-partitioned database tables',
      'Sluggish frontend hydration causing customer churn on mission-critical dashboards',
      'Billing reconciliation errors between payment gateways and internal entitlement engines',
    ],
    howOffscriptApproachesIt:
      'We engineer multi-tenant platforms using Postgres row-level security or schema-per-tenant isolation, combined with asynchronous background job workers with BullMQ and Redis and edge-rendered Next.js frontends. We build granular audit trails and automated contract tests for all billing and entitlement state changes.',
    exampleConcepts: [
      {
        title: 'Multi-Tenant Operations Dispatch Hub',
        label: 'Concept',
        description:
          'B2B workflow coordination platform with cryptographic tenant isolation and real-time team collaboration.',
        technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
      },
    ],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Docker'],
    bgTheme: 'ivory',
    colSpan: 'lg:col-span-5',
    description:
      'Purpose-built subscription products with tenant data isolation, granular role-based access control, subscription billing, and sub-100ms API response times.',
    approach:
      'Modular micro-architecture built on Next.js, Postgres with row-level security, and background workers designed to handle spiky concurrency.',
  },
  {
    id: 'intelligent-automation',
    slug: 'intelligent-business-automation',
    category: 'Intelligent Business Automation',
    conceptLabel: 'Concept: Self-Healing Workflows',
    title: 'Autonomous event-driven pipelines eliminating manual operational friction.',
    tagline: 'Replacing brittle no-code zap chains with resilient, code-first automation.',
    whatItIs:
      'Resilient backend worker clusters that orchestrate disparate third-party APIs, on-premise legacy databases, and document ingestion streams. Built with persistent queues, idempotency keys, and automated exponential backoff retries to guarantee zero data loss.',
    typicalProblems: [
      'Silent failure of no-code automation scripts when upstream third-party APIs modify their payload schema',
      'Hundreds of manual staff hours wasted copying and pasting data between CRM and legacy ERP ledgers',
      'Duplicate billing and order processing caused by lack of distributed idempotency locks',
      'Total lack of audit logging for regulatory compliance and dispute resolution',
    ],
    howOffscriptApproachesIt:
      'We write code-first automation pipelines running in isolated worker containers. Every incoming webhook or event is persisted to a write-ahead message queue before processing. Failed executions are caught by dead-letter queues with automated developer alerts and instant replay tools.',
    exampleConcepts: [
      {
        title: 'Multi-Modal Invoice Extraction Pipeline',
        label: 'Concept',
        description:
          'Automated invoice ingestion, purchase-order validation, and ledger booking with human review fallbacks.',
        technologies: ['Node.js', 'Python', 'Supabase', 'Upstash Redis', 'OCR'],
      },
    ],
    technologies: ['Node.js', 'Python', 'Redis', 'BullMQ', 'PostgreSQL', 'Upstash'],
    bgTheme: 'sand',
    colSpan: 'lg:col-span-4',
    description:
      'Automated ingestion pipelines that extract structured data from variable invoices, clinical reports, and technical schematics without manual data entry.',
    approach:
      'Multi-modal extraction pipelines pairing optical character recognition with confidence scoring and automated human-in-the-loop exception routing.',
  },
  {
    id: 'enterprise-platforms',
    slug: 'custom-enterprise-platforms',
    category: 'Custom Enterprise Platforms',
    conceptLabel: 'Concept: Distributed Operations Grid',
    title: 'Custom management systems tailored to how mission-critical teams work.',
    tagline: 'Eliminating the compromises of ill-fitting off-the-shelf enterprise suites.',
    whatItIs:
      'High-throughput internal operating platforms tailored to specific enterprise processes. Rather than forcing organizations to conform to rigid commercial ERP workflows, we build bespoke management platforms that integrate existing hardware, database silos, and field teams into one coherent system.',
    typicalProblems: [
      'Expensive enterprise software licensing forcing compromises on critical proprietary business workflows',
      'Fragmented operational visibility with data scattered across spreadsheets and disconnected databases',
      'Frustrating user interfaces driving staff to bypass official systems in favor of shadow IT workarounds',
      'High latency and frequent crashes when hundreds of field operators perform concurrent updates',
    ],
    howOffscriptApproachesIt:
      'We apply Domain-Driven Design through direct observation of client operational workflows. We build modular, API-first backends using Go and PostgreSQL, paired with high-performance responsive web interfaces that load in sub-second times and provide comprehensive audit histories.',
    exampleConcepts: [
      {
        title: 'Distributed Facility & Dispatch Operating Grid',
        label: 'Concept',
        description:
          'Real-time space allocation, environmental telemetry, and physical access verification platform.',
        technologies: ['Go', 'PostgreSQL', 'Next.js', 'Redis', 'MQTT'],
      },
    ],
    technologies: ['Go', 'PostgreSQL', 'Next.js', 'Redis', 'Docker', 'Tailwind CSS'],
    bgTheme: 'sage',
    colSpan: 'lg:col-span-4',
    description:
      'When off-the-shelf software forces teams into awkward operational compromises, we engineer bespoke management systems that harmonize workflow dispatch, inventory, and cross-department telemetry.',
    approach:
      'Collaborative domain-driven design, iterative deployment alongside live operations, and zero-compromise audit trailing.',
  },
  {
    id: 'iot-connected-systems',
    slug: 'iot-connected-systems',
    category: 'IoT & Connected Systems',
    conceptLabel: 'Concept: Mesh Sensor Telemetry',
    title: 'Hardware sensors, telemetry firmware, and cloud pipelines operating as one.',
    tagline: 'Bridging physical sensor devices with resilient cloud analytics.',
    whatItIs:
      'Hardware-software co-designed architectures connecting low-power embedded microcontrollers, industrial gateways, and high-frequency time-series data warehouses. Engineered for challenging physical environments with intermittent connectivity, extreme temperatures, and strict power budgets.',
    typicalProblems: [
      'Sensor packet loss during network outages leading to permanent gaps in industrial historical telemetry',
      'Severe battery drain on remote sensor nodes caused by inefficient protocol negotiation and uncompressed payloads',
      'Inability to process high-frequency acoustic and vibration sensor data streams in real time',
      'Security vulnerabilities in IoT devices leaving internal corporate networks exposed to intrusion',
    ],
    howOffscriptApproachesIt:
      'We write efficient embedded firmware in C and C++ utilizing lightweight protocols like MQTT and CoAP with local ring-buffer caching. In the cloud, we deploy high-throughput ingestion brokers connected to specialized time-series databases using TimescaleDB with automated spectral anomaly detection.',
    exampleConcepts: [
      {
        title: 'Industrial Environmental Sensor Mesh',
        label: 'Concept',
        description:
          'Sub-GHz mesh network monitoring rotary pump vibration FFT signatures for preventive maintenance.',
        technologies: ['C++', 'MQTT', 'AWS IoT Core', 'TimescaleDB', 'Python'],
      },
    ],
    technologies: ['C++', 'MQTT', 'AWS IoT Core', 'TimescaleDB', 'Python', 'Docker'],
    bgTheme: 'ivory',
    colSpan: 'lg:col-span-4',
    description:
      'End-to-end device telemetry: low-power sensor reporting, MQTT/HTTP ingestion brokers, anomaly alerting, and longitudinal predictive maintenance visualization.',
    approach:
      'Hardware-software co-design prioritizing network resilience, payload compression, and graceful offline queuing during field connectivity drops.',
  },
  {
    id: 'digital-product-engineering',
    slug: 'digital-product-engineering',
    category: 'Digital Product Engineering',
    conceptLabel: 'Concept: High-Security Portals',
    title: 'Purpose-built client and partner portals where generic templates fail.',
    tagline: 'High-security web platforms engineered with uncompromising visual craft.',
    whatItIs:
      'Custom customer portals, onboarding intake engines, and stakeholder collaboration hubs designed to command industry authority. Built with zero third-party tracker bloat, bulletproof authentication, and responsive design systems that reflect bespoke craftsmanship.',
    typicalProblems: [
      'Generic portal templates eroding enterprise trust during high-value client onboarding',
      'Inaccessible interfaces creating legal liability under modern WCAG 2.2 regulatory standards',
      'Slow mobile load times and clunky document upload flows frustrating executive users',
      'Un-audited third-party analytics scripts leaking sensitive client telemetry to ad networks',
    ],
    howOffscriptApproachesIt:
      'We design bespoke, art-directed component systems from scratch using Space Grotesk and IBM Plex Mono typographic hierarchies. Backends are strictly zero-knowledge where appropriate, encrypting files client-side before transport and maintaining strict access logs.',
    exampleConcepts: [
      {
        title: 'Secure Client Asset & Scoping Portal',
        label: 'Concept',
        description:
          'End-to-end encrypted intake interface featuring biometric device validation and direct engineer chat.',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Motion'],
      },
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Motion', 'PostgreSQL'],
    bgTheme: 'ivory',
    colSpan: 'lg:col-span-12',
    description:
      'High-security partner ecosystems, client client-intake engines, and self-serve interfaces engineered with pixel-perfect responsive craft and strict privacy compliance.',
    approach:
      'Clean room engineering ensuring all customer data flows through encrypted, audited pathways with zero third-party telemetry leakage.',
  },
];

export const SOLUTIONS = SOLUTION_GROUPS;

export const FOUR_STAGE_APPROACH = [
  {
    stage: '01',
    name: 'Discover & Deconstruct',
    tagline: 'Stripping assumptions to find the physical and technical truth.',
    description:
      'We do not accept superficial problem statements. We interview key engineering leads, inspect existing data schemas, measure actual concurrency loads, and map out the true physical constraints of the problem.',
    deliverables: ['System Architecture Audit', 'Data Dependency Map', 'Performance Baseline Metrics'],
  },
  {
    stage: '02',
    name: 'Architectural Blueprint & Modeling',
    tagline: 'Defining the mathematical contracts before writing production code.',
    description:
      'We draft comprehensive system sequence diagrams, define strict OpenAPI and database schemas, plan fault isolation boundaries, and establish immutable data contracts to prevent downstream technical debt.',
    deliverables: ['API Contract Specifications', 'Zero-Trust Security Topology', 'Failure Mode & Recovery Matrix'],
  },
  {
    stage: '03',
    name: 'Precision Engineering & Verification',
    tagline: 'Writing clean, typed, high-throughput software with automated gates.',
    description:
      'Code is developed in modular repositories with strict static typing, unit coverage, and automated integration benchmarks. Every commit passes deterministic CI gates before reaching staging environments.',
    deliverables: ['Production-Hardened Binaries', 'Automated Test Suites', 'Container Deployment Configs'],
  },
  {
    stage: '04',
    name: 'Deployment & Continuous Evolution',
    tagline: 'Zero-downtime releases into client-sovereign cloud environments.',
    description:
      'We deploy directly into your cloud accounts with automated blue-green rollouts, comprehensive telemetry alerting, and continuous drift monitoring. You retain 100% intellectual property ownership.',
    deliverables: ['IaC Infrastructure Repositories', 'Real-Time APM Dashboards', 'Disaster Recovery Runbooks'],
  },
];
