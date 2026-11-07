import { WorkItem, WorkItemSchema } from '@/lib/schemas/work';

export type { WorkItem };

export const WORK_FILTERS = [
  { label: 'All Disciplines', key: 'all' },
  { label: 'AI systems', key: 'ai' },
  { label: 'Healthcare & wellness', key: 'health' },
  { label: 'Enterprise', key: 'enterprise' },
  { label: 'Automation', key: 'auto' },
  { label: 'Mobile', key: 'mobile' },
  { label: 'IoT', key: 'iot' },
];

export const STATUS_FILTERS = [
  { label: 'All Statuses', key: 'all' },
  { label: 'Commercial', key: 'Commercial' },
  { label: 'Prototype', key: 'Prototype' },
  { label: 'Academic', key: 'Academic' },
  { label: 'Concept', key: 'Concept' },
];

const RAW_PROJECTS: WorkItem[] = [
  {
    id: '01',
    slug: 'vision-anomaly-detector',
    title: 'Autonomous Vision Quality Inspector',
    status: 'Concept',
    category: 'AI systems',
    categoryKey: 'ai',
    industry: 'High-Precision Manufacturing',
    year: '2025',
    summary:
      'High-throughput visual anomaly detection pipeline deploying edge-quantized convolutional neural networks for micro-defect recognition in sub-30ms frames.',
    challenge:
      'Industrial surface finishing lines moving at 2.4 meters per second produce micro-defects (fractures, paint unevenness, solder bridges) that escape human visual inspection after 20 minutes of continuous fatigue. Existing optical inspection appliances are prohibitively expensive, require proprietary hardware, and experience high false-positive rejection rates when ambient factory illumination shifts.',
    objectives: [
      'Achieve sub-30ms frame inference directly on industrial edge gateway devices',
      'Maintain greater than 98.5% defect recall across varying ambient lighting conditions',
      'Provide deterministic confidence intervals with human-in-the-loop exception routing',
      'Enable rapid model re-calibration on new defect classes with fewer than 50 visual samples',
    ],
    solution:
      'We engineered an end-to-end computer vision pipeline combining an industrial CMOS camera rig with edge-quantized MobileNet-V4 and YOLO-v10 backbones running on TensorRT. Incoming high-fps camera frames are normalized via hardware-accelerated OpenCV CUDA pipelines, fed into the dual-stage anomaly classifier, and evaluated with sub-millisecond bounding box delineation.',
    architectureNarrative:
      'The architecture decouples physical image ingestion from analytical classification. Camera frames stream across a Gigabit Ethernet (GigE Vision) interface into an in-memory ring buffer. An edge daemon executes quantized inference with INT8 precision on NVIDIA Jetson Orin modules. Classification results trigger pneumatic ejection solenoids via sub-5ms industrial GPIO pulses while telemetry streams to a central PostgreSQL audit log.',
    architectureDiagram: {
      type: 'edge-ai',
      caption: 'Edge-to-Cloud Visual Anomaly Inspection Topology',
      nodes: [
        { label: 'GigE Camera Stream', sublabel: '60 FPS 1080p RAW', tier: 'ingest' },
        { label: 'OpenCV CUDA Pre-proc', sublabel: 'Geometric Normalization', tier: 'ingest' },
        { label: 'TensorRT INT8 Engine', sublabel: 'Sub-26ms Anomaly Classification', tier: 'compute' },
        { label: 'Industrial GPIO Daemon', sublabel: 'Pneumatic Reject Trigger', tier: 'interface' },
        { label: 'Local Redis Ring', sublabel: 'Rolling Frame Cache', tier: 'storage' },
        { label: 'Central PostgreSQL', sublabel: 'Telemetry & Drift Audit', tier: 'storage' },
      ],
    },
    stack: ['Python', 'PyTorch', 'OpenCV', 'TensorRT', 'FastAPI', 'Docker', 'PostgreSQL'],
    verified: false,
    targetMetrics: [
      '< 28ms end-to-end frame processing latency',
      '99.1% target anomaly detection accuracy',
      'Zero false-negative escapes on critical crack classes',
      '100% on-premise execution with zero cloud dependency',
    ],
    coverImage: '/brand/logo-symbol-3d.png',
    gallery: [
      {
        title: 'Edge Inference Telemetry HUD',
        caption: 'Real-time bounding box delineation with confidence score overlays on 60fps frame buffer.',
        aspectRatio: '16/10',
      },
      {
        title: 'Defect Distribution Matrix',
        caption: 'Automated clustering of surface variance across batch production runs.',
        aspectRatio: '16/10',
      },
    ],
    placeholder: false,
    featured: true,
  },
  {
    id: '02',
    slug: 'connected-wellness-telemetry',
    title: 'Biometric Telemetry Engine & Mobile Hub',
    status: 'Prototype',
    category: 'Healthcare & wellness',
    categoryKey: 'health',
    industry: 'Digital Health & Preventive Medicine',
    year: '2025',
    summary:
      'Real-time physiological sensor ingestion architecture with Bluetooth Low Energy streaming and HIPAA-compliant edge data encryption.',
    challenge:
      'Remote biometric monitoring requires continuous ingestion of PPG, ECG, and accelerometer data streams from wearable hardware. Typical mobile applications suffer from extreme battery drain, packet drops during background OS throttling, and compliance vulnerabilities when persisting unencrypted health records on mobile client storage.',
    objectives: [
      'Continuous Bluetooth Low Energy (BLE) background streaming with < 3% battery consumption per 12 hours',
      'Zero data loss during intermittent cellular connectivity using local encrypted write-ahead logs',
      'HIPAA and GDPR compliance with end-to-end client-side public-key envelope encryption',
      'Real-time anomaly alerting for acute arrhythmia markers with sub-second device notification',
    ],
    solution:
      'We designed an offline-first mobile client architecture utilizing React Native TurboModules and native C++ BLE connection managers. Ingested biometric packets are written to an encrypted SQLite database on the mobile device. A background sync worker uploads compressed, signed batches to a resilient Go backend via mutual TLS.',
    architectureNarrative:
      'The architecture treats network availability as an opportunistic optimization rather than a hard dependency. Sensor packets are parsed in a native C++ thread to prevent JavaScript bridge thread blocking. Anomalous pulse intervals trigger local native OS notifications instantly, independent of cloud server roundtrips.',
    architectureDiagram: {
      type: 'telemetry-stream',
      caption: 'Encrypted Biometric Telemetry & Offline-First Sync Architecture',
      nodes: [
        { label: 'Wearable Sensor Array', sublabel: 'BLE 5.3 GATT Services', tier: 'ingest' },
        { label: 'Native C++ BLE Bridge', sublabel: 'Zero-Copy Ring Buffer', tier: 'compute' },
        { label: 'Encrypted SQLite WAL', sublabel: 'AES-256 Client Storage', tier: 'storage' },
        { label: 'Mutual TLS Sync Daemon', sublabel: 'Opportunistic Batch Compression', tier: 'compute' },
        { label: 'TimescaleDB Ingestion Cluster', sublabel: 'Time-Series Analysis', tier: 'storage' },
        { label: 'Physician Clinical Portal', sublabel: 'Real-Time ECG Waveform Canvas', tier: 'interface' },
      ],
    },
    stack: ['React Native', 'TypeScript', 'Go', 'TimescaleDB', 'PostgreSQL', 'Tailwind CSS'],
    verified: false,
    targetMetrics: [
      'Sub-2% battery impact per 8 hours continuous telemetry',
      'Zero packet loss across 72-hour simulated cellular blackout',
      'Sub-500ms local arrhythmia detection latency',
      '100% encrypted at rest and in transit (AES-256 + TLS 1.3)',
    ],
    coverImage: '/brand/logo-symbol-3d.png',
    gallery: [
      {
        title: 'Real-Time Telemetry Monitor',
        caption: 'High-frequency waveform visualizer built on canvas with 60fps rendering.',
        aspectRatio: '16/10',
      },
      {
        title: 'Offline Sync Queue Inspector',
        caption: 'Diagnostic view showing pending encrypted payload batches and network status.',
        aspectRatio: '16/10',
      },
    ],
    placeholder: false,
    featured: true,
  },
  {
    id: '03',
    slug: 'campus-intelligence-platform',
    title: 'Smart Campus Resource & Dispatch Grid',
    status: 'Academic',
    category: 'Enterprise',
    categoryKey: 'enterprise',
    industry: 'Higher Education & Smart Infrastructure',
    year: '2024',
    summary:
      'Distributed multi-facility management system orchestrating space allocation, predictive energy telemetry, and access verification for 12,000+ daily occupants.',
    challenge:
      'Higher education institutions operate sprawling physical campuses with disparate HVAC controllers, legacy RFID card readers, and disconnected room scheduling software. Lack of unified occupancy telemetry causes tens of thousands of kilowatt-hours in wasted climate control and daily scheduling collisions across academic lecture halls.',
    objectives: [
      'Unify 45 separate campus facility subsystems into a single low-latency event stream',
      'Reduce HVAC energy consumption by 22% through dynamic occupancy-driven thermal setbacks',
      'Provide sub-100ms access card authentication across 120 building access nodes',
      'Deploy responsive administrative interface handling 500+ concurrent space reallocations',
    ],
    solution:
      'We engineered a distributed campus operating platform running on a lightweight Go API mesh with PostgreSQL and Redis caching. Edge micro-controllers publish BACnet and MQTT telemetry to central event brokers, allowing dynamic room heating and ventilation to throttle down automatically when rooms remain unoccupied.',
    architectureNarrative:
      'The system employs event-driven architecture using Redis Streams. Sensor data feeds both an operational real-time dispatcher and a predictive analytics warehouse. Web clients receive live seat occupancy updates via WebSocket streaming, enabling students to find open study spaces without wandering campus.',
    architectureDiagram: {
      type: 'distributed-grid',
      caption: 'Distributed Campus Operating Platform & Telemetry Event Grid',
      nodes: [
        { label: 'Campus Sensor Mesh', sublabel: 'BACnet / MQTT / RFID Nodes', tier: 'ingest' },
        { label: 'Go Edge Micro-Brokers', sublabel: 'Event Normalization & Auth', tier: 'compute' },
        { label: 'Redis Streams Hub', sublabel: 'High-Throughput Pub/Sub', tier: 'storage' },
        { label: 'Dynamic HVAC Controller', sublabel: 'Automated Setback Rules Engine', tier: 'compute' },
        { label: 'PostgreSQL Spatial Cluster', sublabel: 'Facility Mapping & Bookings', tier: 'storage' },
        { label: 'Next.js Facility Console', sublabel: 'Real-Time Floorplan Interface', tier: 'interface' },
      ],
    },
    stack: ['Next.js', 'Go', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Docker', 'MQTT'],
    verified: false,
    targetMetrics: [
      'Sub-85ms average API response across 12,000 daily users',
      '24.6% measured reduction in unoccupied facility HVAC runtime',
      '99.98% platform availability during academic exam cycles',
      'Zero credential replication collisions across multi-building gates',
    ],
    coverImage: '/brand/logo-symbol-3d.png',
    gallery: [
      {
        title: 'Campus Energy & Occupancy Heatmap',
        caption: 'Interactive spatial visualization of real-time thermal variance across 14 facility zones.',
        aspectRatio: '16/10',
      },
      {
        title: 'Dispatch & Event Log Console',
        caption: 'Low-latency audit trail recording access authentications and environmental setbacks.',
        aspectRatio: '16/10',
      },
    ],
    placeholder: false,
    featured: true,
  },
  {
    id: '04',
    slug: 'iot-telemetry-array',
    title: 'Industrial Environmental Sensor Mesh',
    status: 'Prototype',
    category: 'IoT',
    categoryKey: 'iot',
    industry: 'Industrial Automation & Environmental Monitoring',
    year: '2026',
    summary:
      'Low-power wide-area mesh network capturing environmental variance and acoustic vibration markers for remote preventive maintenance.',
    challenge:
      'Heavy manufacturing environments require continuous vibration and thermal monitoring of rotary pumps in hazardous areas. Commercial wirelines are costly to install, while standard Wi-Fi fails through reinforced concrete enclosures.',
    objectives: [
      'Deploy 5-year battery life nodes communicating across sub-GHz LoRaWAN frequencies',
      'Capture multi-axis accelerometer FFT vibration signatures at 1kHz intervals',
      'Trigger predictive maintenance alerts before bearing catastrophic failure occurs',
    ],
    solution:
      'Bespoke sensor hardware firmware coupled with an industrial edge gateway ingesting time-series telemetry into TimescaleDB with automated FFT frequency anomaly alerts.',
    architectureNarrative:
      'Nodes sleep in deep standby, waking every 60 seconds to sample vibration waveforms. If variance exceeds calibrated thresholds, packets are broadcast across mesh repeaters to the central industrial gateway.',
    architectureDiagram: {
      type: 'generic',
      caption: 'LoRaWAN Industrial Mesh & Telemetry Pipeline',
      nodes: [
        { label: 'Sub-GHz Mesh Nodes', sublabel: 'Rotary Vibration Sensors', tier: 'ingest' },
        { label: 'Industrial Edge Gateway', sublabel: 'LoRaWAN Packet Forwarder', tier: 'compute' },
        { label: 'TimescaleDB Timeseries', sublabel: 'Compressed Sensor Records', tier: 'storage' },
        { label: 'Maintenance Telemetry UI', sublabel: 'FFT Spectral Visualization', tier: 'interface' },
      ],
    },
    stack: ['C++', 'MQTT', 'AWS IoT Core', 'TimescaleDB', 'Python'],
    verified: false,
    targetMetrics: ['5+ year projected node battery life', '100% packet arrival through heavy concrete'],
    coverImage: '/brand/logo-symbol-3d.png',
    gallery: [
      {
        title: 'Spectral FFT Vibration Analysis',
        caption: 'Harmonic peak detection identifying bearing friction spikes.',
        aspectRatio: '16/10',
      },
    ],
    placeholder: true,
  },
  {
    id: '05',
    slug: 'intelligent-invoice-stream',
    title: 'Self-Orchestrating Document Extraction Pipeline',
    status: 'Concept',
    category: 'Automation',
    categoryKey: 'auto',
    industry: 'FinTech & Enterprise Operations',
    year: '2026',
    summary:
      'Multi-modal pipeline reconciling complex multi-format vendor invoices against ledger schemas with confidence-bounded exception routing.',
    challenge:
      'Finance operations process thousands of PDF and scanned paper invoices monthly with differing tabular layouts, languages, and tax calculations, resulting in hundreds of hours in manual ledger reconciliation.',
    objectives: [
      'Automate line-item extraction with > 97% field accuracy',
      'Reconcile purchase orders against ERP databases automatically',
      'Provide web review interface for exceptions flagged with < 90% confidence',
    ],
    solution:
      'Event-driven worker architecture utilizing OCR, targeted vision-language models, and BullMQ queues to parse, validate, and post accounting entries directly into ERP ledgers.',
    architectureNarrative:
      'Invoices arrive via webhook or email inbox, trigger asynchronous text and table extraction workers, execute business validation rules, and either commit to the database or route to human review.',
    architectureDiagram: {
      type: 'generic',
      caption: 'Document Extraction & Ledger Reconciliation Pipeline',
      nodes: [
        { label: 'Document Ingestion Stream', sublabel: 'Email & Webhook PDF Influx', tier: 'ingest' },
        { label: 'OCR & Layout Model', sublabel: 'Bounding Box Key-Value Parsing', tier: 'compute' },
        { label: 'Schema Validation Engine', sublabel: 'Purchase Order Matching', tier: 'compute' },
        { label: 'Exception Review Portal', sublabel: 'Human-in-the-Loop Validation', tier: 'interface' },
      ],
    },
    stack: ['Node.js', 'Python', 'Supabase', 'Upstash Redis', 'Docker'],
    verified: false,
    targetMetrics: ['85% reduction in manual invoice processing time', 'Sub-4s extraction turnaround per document'],
    coverImage: '/brand/logo-symbol-3d.png',
    gallery: [
      {
        title: 'Line Item Extraction Matrix',
        caption: 'Parsed vendor line items with confidence rating overlays.',
        aspectRatio: '16/10',
      },
    ],
    placeholder: true,
  },
  {
    id: '06',
    slug: 'fleet-logistics-optimizer',
    title: 'Real-Time Dispatch & Routing Grid',
    status: 'Concept',
    category: 'Mobile',
    categoryKey: 'mobile',
    industry: 'Supply Chain & Urban Logistics',
    year: '2026',
    summary:
      'Low-latency dispatch optimizer dynamically calculating multi-stop delivery trajectories under traffic variance and vehicle payload constraints.',
    challenge:
      'Urban delivery fleets struggle with fluctuating traffic congestion and last-minute order injections, causing route inefficiency and missed delivery delivery SLAs.',
    objectives: [
      'Calculate optimal 25-stop delivery routes in sub-500ms',
      'Dynamically re-balance active drivers upon traffic congestion notifications',
      'Provide driver mobile app with offline map navigation and proof-of-delivery capture',
    ],
    solution:
      'Heuristic routing engine based on open-source routing machine (OSRM) and custom vehicle routing problem (VRP) algorithms paired with an offline-capable React Native driver hub.',
    architectureNarrative:
      'Dispatches are calculated server-side, dispatched over WebSockets to mobile drivers, and monitored in real-time on a dispatch supervision console.',
    architectureDiagram: {
      type: 'generic',
      caption: 'Dynamic Fleet Routing & Mobile Dispatch Engine',
      nodes: [
        { label: 'Order Dispatch Queue', sublabel: 'Real-Time Delivery Bookings', tier: 'ingest' },
        { label: 'VRP Heuristic Engine', sublabel: 'Multi-Stop Route Optimizer', tier: 'compute' },
        { label: 'Driver Mobile App', sublabel: 'React Native Offline Navigation', tier: 'interface' },
        { label: 'Central Fleet Dispatch', sublabel: 'Live Telemetry & Geofence Status', tier: 'interface' },
      ],
    },
    stack: ['React Native', 'TypeScript', 'Go', 'PostgreSQL', 'Docker'],
    verified: false,
    targetMetrics: ['Sub-400ms route optimization time', '18% reduction in urban fleet transit distance'],
    coverImage: '/brand/logo-symbol-3d.png',
    gallery: [
      {
        title: 'Dispatch Supervision Radar',
        caption: 'Fleet spatial location and delivery status tracking map.',
        aspectRatio: '16/10',
      },
    ],
    placeholder: true,
  },
];

// Validate all items against WorkItemSchema at module evaluation
export const PROJECTS: WorkItem[] = RAW_PROJECTS.map((p) => WorkItemSchema.parse(p));
