import { WorkItem, WorkItemSchema } from '@/lib/schemas/work';

export type { WorkItem };

export const WORK_FILTERS = [
  { label: 'All Disciplines', key: 'all' },
  { label: 'Mobile', key: 'mobile' },
  { label: 'Healthcare & wellness', key: 'health' },
  { label: 'Enterprise', key: 'enterprise' },
  { label: 'IoT', key: 'iot' },
  { label: 'AI systems', key: 'ai' },
];

export const STATUS_FILTERS = [
  { label: 'All Statuses', key: 'all' },
  { label: 'Commercial', key: 'Commercial' },
  { label: 'Prototype', key: 'Prototype' },
];

const RAW_PROJECTS: WorkItem[] = [
  {
    id: '01',
    slug: 'liferoute-driver',
    title: 'LifeRoute Driver — Emergency Response & Telemetry',
    status: 'Prototype',
    category: 'Mobile',
    categoryKey: 'mobile',
    industry: 'Emergency Response & Fleet Navigation',
    year: '2025',
    summary:
      'Dedicated emergency vehicle operator mobile interface with real-time route optimization, turn-by-turn dispatch coordination, and driver telemetry streaming.',
    challenge:
      'Emergency vehicle operators require immediate dispatch notifications, low-latency GPS telemetry broadcasting, and reliable offline operation in dense urban environments without distraction.',
    objectives: [
      'Provide instantaneous dispatch alerts and incident routing',
      'Stream live vehicle GPS telemetry and transit status to central dispatch',
      'Deliver resilient offline map caching and automated re-connection recovery',
      'Design high-contrast, glanceable UI for active driving scenarios',
    ],
    solution:
      'We engineered a mobile application with real-time WebSocket state synchronization, automated background geolocation tracking, and native platform map integrations tailored for emergency drivers.',
    architectureNarrative:
      'The client communicates via encrypted WebSockets to dispatch servers, streaming location updates and receiving prioritized incident dispatches with local SQLite fallback caching.',
    architectureDiagram: {
      type: 'telemetry-stream',
      caption: 'LifeRoute Driver Mobile Telemetry Architecture',
      nodes: [
        { label: 'Device GPS & Sensors', sublabel: 'Continuous Location Stream', tier: 'ingest' },
        { label: 'Local SQLite Store', sublabel: 'Offline Route Cache', tier: 'storage' },
        { label: 'WebSocket Dispatch Bridge', sublabel: 'Bi-directional Real-Time Socket', tier: 'compute' },
        { label: 'Emergency Driver HUD', sublabel: 'High-Contrast Navigation Interface', tier: 'interface' },
      ],
    },
    stack: ['Flutter', 'Dart', 'WebSockets', 'REST APIs', 'PostgreSQL'],
    links: {
      repo: 'https://github.com/tysonpaul493-lab/liferoute-_driver',
    },
    verified: true,
    targetMetrics: [
      'Real-time coordinate streaming to dispatch servers',
      'Offline-capable incident navigation and status updates',
      'Glanceable ergonomic UI compliant with driver safety guidelines',
    ],
    coverImage: '/brand/logo-symbol-3d.png',
    gallery: [
      {
        title: 'Driver Navigation HUD',
        caption: 'High-contrast dispatch and incident routing console.',
        aspectRatio: '16/10',
      },
    ],
    placeholder: false,
    featured: true,
  },
  {
    id: '02',
    slug: 'liferoute-user',
    title: 'LifeRoute User — Patient Transit & Emergency Dispatch',
    status: 'Prototype',
    category: 'Healthcare & wellness',
    categoryKey: 'health',
    industry: 'Healthcare Mobility & Patient Transit',
    year: '2025',
    summary:
      'Patient-facing emergency dispatch application providing instant transit requests, live ambulance GPS tracking, and medical intake coordination.',
    challenge:
      'Patients facing acute medical emergencies require an intuitive, zero-friction booking interface that immediately establishes location, captures critical triage data, and provides live vehicle tracking.',
    objectives: [
      'Single-tap emergency pickup requests with automatic reverse-geocoding',
      'Live map visualization of approaching emergency vehicles',
      'Secure capture of preliminary medical triage information',
      'Accessible, high-legibility interface under stressful conditions',
    ],
    solution:
      'We designed an empathetic, high-contrast mobile client with immediate location detection, real-time vehicle map tracking, and direct integration into medical dispatch pipelines.',
    architectureNarrative:
      'Patient requests initiate priority queues on the dispatch backend, streaming continuous driver coordinates back to the patient client via secure WebSockets.',
    architectureDiagram: {
      type: 'telemetry-stream',
      caption: 'LifeRoute Patient Ingestion & Telemetry Stream',
      nodes: [
        { label: 'Patient Emergency Request', sublabel: 'Reverse Geocoded Location', tier: 'ingest' },
        { label: 'Dispatch Queue Engine', sublabel: 'Nearest Unit Allocation', tier: 'compute' },
        { label: 'Encrypted Health State', sublabel: 'Session Intake Storage', tier: 'storage' },
        { label: 'Patient Live Tracking View', sublabel: 'Real-Time Ambulance ETA', tier: 'interface' },
      ],
    },
    stack: ['Flutter', 'Dart', 'Google Maps API', 'WebSockets', 'Node.js'],
    links: {
      repo: 'https://github.com/tysonpaul493-lab/liferoute-_user',
    },
    verified: true,
    targetMetrics: [
      'Sub-second request broadcast to active fleet drivers',
      'Real-time vehicle ETA and route tracking updates',
      'Simple, panic-free user onboarding and triage input',
    ],
    coverImage: '/brand/logo-symbol-3d.png',
    gallery: [
      {
        title: 'Patient Emergency Request Flow',
        caption: 'Simplified one-tap booking and triage capture.',
        aspectRatio: '16/10',
      },
    ],
    placeholder: false,
    featured: true,
  },
  {
    id: '03',
    slug: 'baava-technologies',
    title: 'Baava Technologies — Enterprise Digital Engineering',
    status: 'Commercial',
    category: 'Enterprise',
    categoryKey: 'enterprise',
    industry: 'Enterprise Software & Technology Advisory',
    year: '2025',
    summary:
      'Corporate digital presence and enterprise software engineering showcase built for scalable delivery, clean type systems, and client technology advisory.',
    challenge:
      'Enterprise software consultancies require an authoritative digital platform that articulates complex system capabilities, communicates client trust, and maintains flawless responsive performance.',
    objectives: [
      'Architect an authoritative, high-performance web platform',
      'Demonstrate technical capabilities across cloud and software engineering',
      'Ensure sub-second page transitions and excellent Core Web Vitals',
      'Establish a unified, scalable design system',
    ],
    solution:
      'We engineered a modern, statically optimized web platform featuring modular component architecture, editorial typography, and structured enterprise service taxonomies.',
    architectureNarrative:
      'Built on Next.js and Tailwind CSS with edge caching and static pre-rendering, achieving instant content delivery and zero client-side layout shifts.',
    architectureDiagram: {
      type: 'distributed-grid',
      caption: 'Baava Technologies Platform Architecture',
      nodes: [
        { label: 'Edge Global CDN', sublabel: 'Vercel Edge Network', tier: 'ingest' },
        { label: 'Next.js App Router', sublabel: 'Server Components & ISR', tier: 'compute' },
        { label: 'Content Taxonomies', sublabel: 'Structured Metadata Layer', tier: 'storage' },
        { label: 'Enterprise Web Client', sublabel: 'Responsive Tailwind UI', tier: 'interface' },
      ],
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    links: {
      live: 'https://baava-technologies.vercel.app/',
    },
    verified: true,
    targetMetrics: [
      'Sub-second visual completeness and 95+ Core Web Vitals',
      'Strict TypeScript type safety across all components',
      'Structured service taxonomy for enterprise conversion',
    ],
    coverImage: '/brand/logo-symbol-3d.png',
    gallery: [
      {
        title: 'Corporate Engineering Overview',
        caption: 'Clean, structured presentation of software engineering capabilities.',
        aspectRatio: '16/10',
      },
    ],
    placeholder: false,
    featured: true,
  },
  {
    id: '04',
    slug: 'costa-devices',
    title: 'Costa Devices — IoT Telemetry & Device Portal',
    status: 'Commercial',
    category: 'IoT',
    categoryKey: 'iot',
    industry: 'Hardware Telemetry & Connected Devices',
    year: '2025',
    summary:
      'Connected device management dashboard monitoring hardware telemetry streams, sensor payloads, and remote firmware configurations.',
    challenge:
      'Hardware manufacturers and IoT fleet operators need a centralized dashboard to track sensor health, monitor device battery states, and detect connectivity drops across distributed equipment.',
    objectives: [
      'Visualize real-time telemetry metrics and sensor logs',
      'Provide intuitive device registry and configuration tools',
      'Support responsive monitoring across mobile and desktop displays',
      'Deliver clean visual data representation without UI clutter',
    ],
    solution:
      'We engineered a clean, high-clarity IoT device management interface featuring modular metric widgets, interactive sensor visualizations, and responsive device status tables.',
    architectureNarrative:
      'Client dashboard ingests structured telemetry payloads, rendering real-time device health states and interactive configuration controls with strict schema validation.',
    architectureDiagram: {
      type: 'telemetry-stream',
      caption: 'Costa Devices IoT Telemetry Pipeline',
      nodes: [
        { label: 'IoT Sensor Payloads', sublabel: 'Hardware Telemetry Stream', tier: 'ingest' },
        { label: 'Telemetry Aggregator', sublabel: 'Timeseries Ingestion API', tier: 'compute' },
        { label: 'Device Registry Store', sublabel: 'Firmware & Config DB', tier: 'storage' },
        { label: 'Device Monitoring Portal', sublabel: 'Interactive Hardware HUD', tier: 'interface' },
      ],
    },
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    links: {
      live: 'https://costa-devices-kappa.vercel.app/',
    },
    verified: true,
    targetMetrics: [
      'Intuitive hardware metric visualization',
      'Responsive dashboard layout for field technicians and managers',
      'Fast client-side telemetry filtering and search',
    ],
    coverImage: '/brand/logo-symbol-3d.png',
    gallery: [
      {
        title: 'Device Health Dashboard',
        caption: 'Telemetry telemetry metrics and device operational status.',
        aspectRatio: '16/10',
      },
    ],
    placeholder: false,
    featured: true,
  },
  {
    id: '05',
    slug: 'amos-frank',
    title: 'Amos Frank — Creative Engineering Portfolio',
    status: 'Commercial',
    category: 'Enterprise',
    categoryKey: 'enterprise',
    industry: 'Bespoke Creative Engineering & Brand Design',
    year: '2025',
    summary:
      'High-craft digital portfolio platform featuring bespoke typography, editorial layout architecture, and fluid client-side route transitions.',
    challenge:
      'Creative technologists require an expressive yet uncompromisingly fast digital medium that showcases visual craft, architectural precision, and brand identity.',
    objectives: [
      'Implement bespoke typography and art-directed grid layouts',
      'Ensure 60fps micro-interactions and smooth page transitions',
      'Achieve flawless cross-device responsiveness',
      'Deliver an unforgettable brand aesthetic with minimal overhead',
    ],
    solution:
      'We built an editorial web portfolio utilizing modern CSS grid techniques, bespoke SVG art, and optimized asset pipelines for effortless visual exploration.',
    architectureNarrative:
      'Statically pre-rendered on Vercel with localized CSS variables, semantic HTML5 structure, and performance-tuned layout transitions.',
    architectureDiagram: {
      type: 'generic',
      caption: 'Creative Portfolio Architecture',
      nodes: [
        { label: 'Client Request', sublabel: 'HTTP/2 Edge Delivery', tier: 'ingest' },
        { label: 'Next.js Static Generation', sublabel: 'Optimized Server Build', tier: 'compute' },
        { label: 'Asset Delivery Pipeline', sublabel: 'Compressed SVGs & WebP', tier: 'storage' },
        { label: 'Art-Directed UI', sublabel: 'Editorial Interactive Canvas', tier: 'interface' },
      ],
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    links: {
      live: 'https://amos-frank.vercel.app/',
    },
    verified: true,
    targetMetrics: [
      'Instant client-side transitions and zero layout shifts',
      'Distinctive visual aesthetic balancing craft and speed',
      'Full semantic accessibility and screen-reader support',
    ],
    coverImage: '/brand/logo-symbol-3d.png',
    gallery: [
      {
        title: 'Editorial Portfolio Homepage',
        caption: 'Typographic precision and responsive grid architecture.',
        aspectRatio: '16/10',
      },
    ],
    placeholder: false,
    featured: true,
  },
  {
    id: '06',
    slug: 'trinity-prayer-house',
    title: 'Trinity Prayer House — Community Platform',
    status: 'Commercial',
    category: 'Enterprise',
    categoryKey: 'enterprise',
    industry: 'Community & Institutional Engagement',
    year: '2025',
    summary:
      'Institutional digital platform supporting event scheduling, media broadcasting, community announcements, and multi-lingual member engagement.',
    challenge:
      'Institutional communities need a dependable, accessible platform that unites diverse demographics across multiple generations with varying device capabilities.',
    objectives: [
      'Provide clear, up-to-date schedules and announcements',
      'Facilitate digital media delivery and stream integration',
      'Ensure high contrast and readability on all screen sizes',
      'Maintain lightweight page weights for lower bandwidth connections',
    ],
    solution:
      'We created a warm, accessible web platform built with semantic HTML, high-contrast typography, and intuitive navigation for community members.',
    architectureNarrative:
      'Deploying lightweight static components with cached event metadata, ensuring immediate responsiveness across low-bandwidth mobile networks.',
    architectureDiagram: {
      type: 'distributed-grid',
      caption: 'Trinity Institutional Community Platform Topology',
      nodes: [
        { label: 'Member Access Request', sublabel: 'Mobile & Desktop Clients', tier: 'ingest' },
        { label: 'Next.js App Engine', sublabel: 'Static Pages & Event Feeds', tier: 'compute' },
        { label: 'Media & Event Store', sublabel: 'Structured Calendar Data', tier: 'storage' },
        { label: 'Accessible Community Web', sublabel: 'High-Contrast Warm Ivory UI', tier: 'interface' },
      ],
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    links: {
      live: 'https://trinity-prayer-house-madukkarai.vercel.app/',
    },
    verified: true,
    targetMetrics: [
      'High accessibility compliance and easy navigation for all age groups',
      'Instant load times on 3G and 4G mobile networks',
      'Reliable community event scheduling and announcements',
    ],
    coverImage: '/brand/logo-symbol-3d.png',
    gallery: [
      {
        title: 'Community Platform Portal',
        caption: 'Warm, accessible design for institutional communication.',
        aspectRatio: '16/10',
      },
    ],
    placeholder: false,
    featured: true,
  },
  {
    id: '07',
    slug: 'keba-studio',
    title: 'Keba Studio — Creative Engineering & Founder Workspace',
    status: 'Commercial',
    category: 'AI systems',
    categoryKey: 'ai',
    industry: 'Creative Engineering & Digital Product Innovation',
    year: '2025',
    summary:
      'Personal digital ecosystem and creative engineering playground exploring experimental 3D interfaces, generative interactions, and software systems.',
    challenge:
      'Exploring the frontier of real-time 3D, generative software, and human-computer interfaces requires an agile, experimental testing ground that pushes web technologies.',
    objectives: [
      'Pioneer real-time WebGL and 3D character experiences',
      'Experiment with conversational AI models and interactive agents',
      'Showcase experimental creative engineering concepts',
      'Maintain strict 60fps performance on modern browsers',
    ],
    solution:
      'We built an experimental digital hub showcasing WebGL shaders, Three.js character interaction, and generative user interfaces created by founder Keba.',
    architectureNarrative:
      'Combines Three.js WebGL canvas rendering, GSAP timeline orchestration, and serverless AI edge endpoints into a playful interactive experience.',
    architectureDiagram: {
      type: 'edge-ai',
      caption: 'Keba Studio 3D & AI Interactive Pipeline',
      nodes: [
        { label: 'User Interaction Events', sublabel: 'Pointer, Scroll & Speech Input', tier: 'ingest' },
        { label: 'Three.js 3D Engine', sublabel: 'WebGL 60fps Character Rig', tier: 'compute' },
        { label: 'Conversational LLM Gateway', sublabel: 'Edge AI Stream Pipeline', tier: 'compute' },
        { label: 'Interactive Studio Canvas', sublabel: 'Full-bleed Real-Time Viewport', tier: 'interface' },
      ],
    },
    stack: ['Three.js', 'Next.js', 'React', 'GSAP', 'TypeScript', 'Tailwind CSS'],
    links: {
      live: 'https://keba.qzz.io/',
    },
    verified: true,
    targetMetrics: [
      '60fps real-time 3D rendering in WebGL',
      'Seamless multi-modal interaction combining 3D and speech',
      'Experimental interface innovation for modern web applications',
    ],
    coverImage: '/brand/logo-symbol-3d.png',
    gallery: [
      {
        title: 'Interactive 3D Workspace',
        caption: 'Experimental WebGL interaction and creative engineering showcase.',
        aspectRatio: '16/10',
      },
    ],
    placeholder: false,
    featured: true,
  },
  {
    id: '08',
    slug: 'smoke-haus',
    title: 'Smoke Haus — Hospitality Brand & Experience',
    status: 'Commercial',
    category: 'Enterprise',
    categoryKey: 'enterprise',
    industry: 'Culinary Hospitality & Brand Experience',
    year: '2025',
    summary:
      'Digital brand experience and reservation platform for contemporary culinary hospitality with tactile visual storytelling and dynamic menus.',
    challenge:
      'Hospitality brands require digital experiences that convey the warmth, aroma, and craft of dining while offering effortless reservation and menu exploration.',
    objectives: [
      'Design an evocative, appetite-inducing digital brand presence',
      'Provide intuitive online reservation inquiries and location details',
      'Ensure frictionless mobile menu navigation',
      'Deliver rich visual presentation with fast image loading',
    ],
    solution:
      'We engineered a rich, hospitality-focused digital platform featuring dark-themed tactile typography, optimized photography, and direct reservation integration.',
    architectureNarrative:
      'Static edge generation with responsive Next.js Image optimization, delivering high-resolution food photography without bandwidth bloat.',
    architectureDiagram: {
      type: 'generic',
      caption: 'Smoke Haus Hospitality Experience Stack',
      nodes: [
        { label: 'Guest Web Visit', sublabel: 'Mobile & Desktop Diners', tier: 'ingest' },
        { label: 'Next.js Edge Server', sublabel: 'Pre-rendered Pages & Menus', tier: 'compute' },
        { label: 'Next/Image CDN', sublabel: 'Optimized WebP Image Delivery', tier: 'storage' },
        { label: 'Hospitality Brand UI', sublabel: 'Tactile Dark-Themed Experience', tier: 'interface' },
      ],
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    links: {
      live: 'https://smoke-haus-beta.vercel.app/',
    },
    verified: true,
    targetMetrics: [
      'High conversion on digital menu views and reservation inquiries',
      'Fast responsive image delivery across all device sizes',
      'Distinctive culinary brand identity and tactile atmosphere',
    ],
    coverImage: '/brand/logo-symbol-3d.png',
    gallery: [
      {
        title: 'Hospitality Brand Showcase',
        caption: 'Tactile culinary presentation and dynamic menu experience.',
        aspectRatio: '16/10',
      },
    ],
    placeholder: false,
    featured: true,
  },
];

// Validate all items against WorkItemSchema at module evaluation
export const PROJECTS: WorkItem[] = RAW_PROJECTS.map((p) => WorkItemSchema.parse(p));
