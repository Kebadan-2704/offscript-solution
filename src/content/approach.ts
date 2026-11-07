export interface ApproachStage {
  number: string;
  name: string;
  tagline: string;
  description: string;
  activities: string[];
}

export const APPROACH_STAGES: ApproachStage[] = [
  {
    number: '01',
    name: 'Discover',
    tagline: 'Unearthing fundamental constraints.',
    description:
      'We deconstruct your operational bottleneck through deep technical discovery, existing code audits, and workflow mapping before writing a single line of production code.',
    activities: [
      'Technical architecture audit',
      'Stakeholder & operator interviews',
      'Data flow & schema analysis',
      'Feasibility & risk modeling',
    ],
  },
  {
    number: '02',
    name: 'Strategise',
    tagline: 'Architectural blueprint & stack selection.',
    description:
      'We deliver a comprehensive engineering specification: system topology, security boundaries, database schemas, and milestone roadmaps with verifiable success metrics.',
    activities: [
      'Technology stack evaluation',
      'API contract specification',
      'Data isolation & security modeling',
      'Milestone & delivery roadmap',
    ],
  },
  {
    number: '03',
    name: 'Engineer',
    tagline: 'Rigorous implementation & craftsmanship.',
    description:
      'Production-grade execution featuring strict TypeScript typing, automated CI/CD pipelines, unit/integration testing, and zero-compromise code maintainability.',
    activities: [
      'Iterative sprint execution',
      'Automated testing & linting',
      'Weekly interactive staging demos',
      'Continuous performance profiling',
    ],
  },
  {
    number: '04',
    name: 'Evolve',
    tagline: 'Continuous telemetry & scaling.',
    description:
      'Deployment is the beginning, not the conclusion. We monitor latency, error rates, and system telemetry in real time, refining architecture as business demands grow.',
    activities: [
      'Production telemetry monitoring',
      'Automated error tracking',
      'Capacity & scale optimization',
      'Architecture evolution roadmap',
    ],
  },
];

