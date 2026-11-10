import { InsightItem, InsightItemSchema } from '@/lib/schemas/insight';

export type { InsightItem };

export const INSIGHT_CATEGORIES = [
  'All',
  'Artificial Intelligence',
  'Software Engineering',
  'Product Development',
  'Automation',
  'Technology Insights',
  'Digital Innovation',
] as const;

const RAW_INSIGHTS: InsightItem[] = [
  {
    slug: 'evaluating-realtime-edge-inference',
    title: 'Evaluating Real-Time Edge Inference: Latency vs. Quantization in Industrial Vision',
    subtitle:
      'Balancing precision degradation against sub-30ms hardware requirements on constrained factory gateway silicon.',
    description:
      'An empirical analysis of TensorRT quantization techniques, comparing FP32, FP16, and INT8 calibration models across industrial surface inspection workloads.',
    category: 'Artificial Intelligence',
    publishedAt: '2025-10-14',
    readingTime: '7 min read',
    author: 'Offscript Engineering',
    authorRole: 'Systems & Applied AI',
    tags: ['Machine Learning', 'Computer Vision', 'TensorRT', 'Edge Computing'],
    featured: true,
    draft: false,
    toc: [
      { id: 'the-latency-budget', title: '1. The Physical Latency Budget' },
      { id: 'quantization-benchmarks', title: '2. Quantization: FP32 vs. INT8' },
      { id: 'memory-bandwidth-bottlenecks', title: '3. Memory Bandwidth & PCIe Bottlenecks' },
      { id: 'production-recommendations', title: '4. Architectural Recommendations' },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'In high-speed industrial manufacturing, the line between software engineering and physical physics disappears. When sheet metal or semiconductor wafers traverse inspection cameras at 2.5 meters per second, an anomaly detection pipeline has exactly 28 milliseconds to acquire the frame, normalize pixel values, execute neural inference, and pulse a pneumatic rejection solenoid. Any computational hesitation results in micro-defects escaping to downstream assembly.',
      },
      {
        type: 'heading',
        level: 'h2',
        id: 'the-latency-budget',
        text: '1. The Physical Latency Budget',
      },
      {
        type: 'paragraph',
        text: 'Too many enterprise machine learning teams benchmark models solely on desktop GPUs with unconstrained thermal headroom and infinite PCIe bus bandwidth. When deploying to an enclosed IP67 gateway on a factory floor operating at 45°C ambient temperature, thermal throttling degrades clock frequencies by up to 35%.',
      },
      {
        type: 'callout',
        variant: 'decision',
        title: 'Architectural Invariant',
        text: 'Always budget edge inference assuming sustained thermal equilibrium at maximum rated ambient enclosure temperature, not cold-boot benchmarks in an air-conditioned laboratory.',
      },
      {
        type: 'heading',
        level: 'h2',
        id: 'quantization-benchmarks',
        text: '2. Quantization: FP32 vs. INT8',
      },
      {
        type: 'paragraph',
        text: 'Post-training quantization (PTQ) reduces 32-bit floating point weights into signed 8-bit integers. Below is the TensorRT calibrator implementation we deploy to compute entropy thresholds over verified representative production frames:',
      },
      {
        type: 'code',
        language: 'python',
        filename: 'calibrator.py',
        code: `import tensorrt as trt
import pycuda.driver as cuda
import numpy as np

class EngineEntropyCalibrator(trt.IInt8EntropyCalibrator2):
    def __init__(self, stream, cache_file="calibration.cache"):
        super().__init__()
        self.stream = stream
        self.cache_file = cache_file
        self.batch_size = 32
        self.shape = (self.batch_size, 3, 640, 640)
        self.device_input = cuda.mem_alloc(trt.volume(self.shape) * 4)

    def get_batch(self, names):
        batch = self.stream.next_batch()
        if not batch:
            return None
        cuda.memcpy_htod(self.device_input, np.ascontiguousarray(batch))
        return [int(self.device_input)]`,
      },
      {
        type: 'quote',
        quote:
          'Quantization without disciplined entropy calibration is merely throwing away precision and hoping the loss function forgives you.',
        attribution: 'Offscript Systems Engineering Guild',
      },
      {
        type: 'heading',
        level: 'h2',
        id: 'memory-bandwidth-bottlenecks',
        text: '3. Memory Bandwidth & PCIe Bottlenecks',
      },
      {
        type: 'paragraph',
        text: 'Our profiling demonstrates that 45% of total frame latency is typically spent transferring high-resolution uncompressed image buffers from GigE network interfaces into GPU memory. By implementing zero-copy shared memory rings and pinned CUDA memory allocations, frame ingest latency was reduced from 14ms down to 1.8ms.',
      },
      {
        type: 'heading',
        level: 'h2',
        id: 'production-recommendations',
        text: '4. Architectural Recommendations',
      },
      {
        type: 'list',
        items: [
          'Pin input memory buffers directly to prevent OS page faults during high-throughput bursts.',
          'Decouple classification inference from physical actuator triggering via deterministic GPIO threads.',
          'Log model confidence distributions continuously to capture optical lighting drift before defect escapes occur.',
          'Maintain a shadow validation pipeline in cloud storage to re-quantize models whenever real-world distributions shift.',
        ],
      },
    ],
  },
  {
    slug: 'refactor-before-rewrite',
    title: 'Why We Refactor Before We Rewrite: A Disciplined Approach to Legacy Modernization',
    subtitle:
      'The seductive myth of the clean-slate greenfield rebuild and why disciplined incremental refactoring consistently preserves enterprise capital.',
    description:
      'How we dismantle monolithic enterprise software architectures using branch-by-abstraction, event interception, and strangler patterns without risking operational downtime.',
    category: 'Software Engineering',
    publishedAt: '2025-11-20',
    readingTime: '8 min read',
    author: 'Offscript Engineering',
    authorRole: 'Core Architecture',
    tags: ['Architecture', 'Refactoring', 'Microservices', 'Distributed Systems'],
    featured: false,
    draft: false,
    toc: [
      { id: 'the-greenfield-illusion', title: '1. The Greenfield Illusion' },
      { id: 'the-strangler-pipeline', title: '2. The Strangler Pipeline in Practice' },
      { id: 'contract-testing-gates', title: '3. Enforcing Contract Gates' },
      { id: 'economic-reality', title: '4. The Economic Reality of Refactoring' },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Every software engineer has looked at a five-year-old enterprise codebase with dread and declared: "This is unmaintainable. We must rewrite it from scratch." It is the most seductive lie in technology leadership. A complete rewrite throws away years of accumulated edge-case knowledge, bug fixes, and regulatory boundary handling codified in the existing system.',
      },
      {
        type: 'heading',
        level: 'h2',
        id: 'the-greenfield-illusion',
        text: '1. The Greenfield Illusion',
      },
      {
        type: 'paragraph',
        text: 'Clean-slate rewrites consistently take 2.5 times longer than estimated. While the rewrite team races to build feature parity, the production monolith continues evolving to meet urgent customer demands. The new system is chasing a moving target.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'The Second-System Effect',
        text: 'The second system is the most dangerous system an engineer ever designs. The general tendency is to over-engineer it, incorporating every idea and embellishment that was cautiously omitted during the first system build.',
      },
      {
        type: 'heading',
        level: 'h2',
        id: 'the-strangler-pipeline',
        text: '2. The Strangler Pipeline in Practice',
      },
      {
        type: 'paragraph',
        text: 'Instead of an all-or-nothing cutover, we deploy reverse proxies that route traffic conditionally based on domain boundaries. Below is an example of an edge middleware router incrementally routing authenticated billing calls away from a legacy Rails monolith to a modern Go service:',
      },
      {
        type: 'code',
        language: 'typescript',
        filename: 'edge-router.ts',
        code: `export async function routeRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  
  // Canaried domain routing
  if (url.pathname.startsWith('/api/v2/billing')) {
    const isCanary = req.headers.get('x-tenant-tier') === 'enterprise';
    const targetService = isCanary ? NEW_GO_SERVICE_URL : LEGACY_MONOLITH_URL;
    
    return fetch(new Request(targetService + url.pathname, {
      method: req.method,
      headers: req.headers,
      body: req.body,
    }));
  }
  
  return fetch(new Request(LEGACY_MONOLITH_URL + url.pathname, req));
}`,
      },
      {
        type: 'quote',
        quote:
          'Software architecture is the decisions that you wish you could get right early in a project, but that you are not in a position to get right until you understand the problem.',
        attribution: 'Ralph Johnson',
      },
      {
        type: 'heading',
        level: 'h2',
        id: 'contract-testing-gates',
        text: '3. Enforcing Contract Gates',
      },
      {
        type: 'paragraph',
        text: 'To guarantee that new micro-services replicate legacy behaviors without introducing regressions, we record production traffic mirrors and replay them against staging endpoints. Any divergence in payload schemas or HTTP status codes triggers automated CI test failures.',
      },
      {
        type: 'heading',
        level: 'h2',
        id: 'economic-reality',
        text: '4. The Economic Reality of Refactoring',
      },
      {
        type: 'list',
        items: [
          'Value is delivered continuously every sprint rather than waiting for an elusive multi-year big-bang release.',
          'Operational risk is bounded to individual decoupled endpoints rather than the whole business infrastructure.',
          'Legacy team members retain domain agency while progressively upskilling into modern architectural conventions.',
          'Infrastructure costs drop immediately as resource-intensive endpoints are carved out into lightweight binaries.',
        ],
      },
    ],
  },
  {
    slug: 'deterministic-multi-tenant-isolation',
    title: 'Deterministic Multi-Tenant Isolation in Distributed Cloud Architectures',
    subtitle:
      'Eliminating noisy-neighbor degradation and cryptographic data leak paths in shared SaaS infrastructure.',
    description:
      'How to enforce tenant-level resource isolation, cryptographically partitioned connection pooling, and deterministic rate-limiting across multi-region PostgreSQL clusters.',
    category: 'Technology Insights',
    publishedAt: '2025-11-28',
    readingTime: '9 min read',
    author: 'Offscript Engineering',
    authorRole: 'Cloud & Distributed Infrastructure',
    tags: ['Cloud Architecture', 'PostgreSQL', 'Multi-Tenancy', 'Distributed Systems'],
    featured: false,
    draft: false,
    toc: [
      { id: 'the-illusion-of-row-level-security', title: '1. The Illusion of Row-Level Security Alone' },
      { id: 'connection-pool-starvation', title: '2. Mitigating Connection Pool Starvation' },
      { id: 'ephemeral-tenant-keys', title: '3. Ephemeral Tenant Encryption Keys' },
      { id: 'architectural-invariants', title: '4. Summary of Architectural Invariants' },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'In high-concurrency SaaS applications, multi-tenant database architectures promise operational cost efficiency. However, without mathematical isolation at the connection pool, query execution plan, and cache tiers, an unconstrained burst from a single noisy tenant cascades into latency degradation for every customer across the cluster.',
      },
      {
        type: 'heading',
        level: 'h2',
        id: 'the-illusion-of-row-level-security',
        text: '1. The Illusion of Row-Level Security Alone',
      },
      {
        type: 'paragraph',
        text: 'PostgreSQL Row-Level Security (RLS) provides clean logical isolation, but it does not prevent query planner regression when tenant data volumes skew by orders of magnitude. A query planner choosing an index scan for a small tenant may switch to a costly sequential scan under another tenant’s filter, causing cache eviction across shared buffer pools.',
      },
      {
        type: 'callout',
        variant: 'decision',
        title: 'Architectural Invariant',
        text: 'Decouple large enterprise tenants into dedicated schema partitions or isolated tenant pools while retaining unified orchestration across shared application clusters.',
      },
      {
        type: 'heading',
        level: 'h2',
        id: 'connection-pool-starvation',
        text: '2. Mitigating Connection Pool Starvation',
      },
      {
        type: 'paragraph',
        text: 'Standard PgBouncer setups pool connections indiscriminately. When one tenant triggers hundreds of concurrent long-running transactions, global connection limits are exhausted. We implement tiered token-bucket connection dispatchers at the application gateway level before queries ever reach PostgreSQL wire protocol.',
      },
      {
        type: 'quote',
        quote:
          'True multi-tenancy is not just ensuring Customer A cannot read Customer B’s data—it is guaranteeing that Customer A cannot consume Customer B’s CPU cycles.',
        attribution: 'Offscript Infrastructure Guild',
      },
      {
        type: 'heading',
        level: 'h2',
        id: 'ephemeral-tenant-keys',
        text: '3. Ephemeral Tenant Encryption Keys',
      },
      {
        type: 'paragraph',
        text: 'By deriving envelope encryption keys per tenant through KMS hardware security modules, cryptographic shredding becomes trivial: deleting the tenant key renders all historical database backups mathematically irrecoverable without expensive table rewrites.',
      },
      {
        type: 'heading',
        level: 'h2',
        id: 'architectural-invariants',
        text: '4. Summary of Architectural Invariants',
      },
      {
        type: 'list',
        items: [
          'Enforce strict memory and execution timeouts at the transaction level per tenant identity.',
          'Partition database connection pools into high-tier guaranteed slots and dynamic elastic shared pools.',
          'Instrument continuous P99 latency alarms segregated by tenant identity to catch noisy neighbors in real time.',
          'Automate tenant offboarding via cryptographic key revocation to maintain compliance standards without downtime.',
        ],
      },
    ],
  },
  {
    slug: 'template-architectural-decision-records',
    title: 'Standardizing Architectural Decision Records (ADRs) Across Distributed Systems',
    subtitle:
      'Template documentation guide for recording technical context, consequences, and tradeoffs.',
    description:
      'An internal studio template outlining the standard schema for documenting critical system architecture choices.',
    category: 'Software Engineering',
    publishedAt: '2026-01-01',
    readingTime: '5 min read',
    author: 'Offscript Engineering',
    authorRole: 'Engineering Operations',
    tags: ['Architecture', 'ADR', 'Documentation'],
    featured: false,
    draft: true, // EXCLUDED FROM PRODUCTION BUILD & SITEMAP PER PART 6.6 & PART 9
    toc: [
      { id: 'template-structure', title: '1. ADR Template Structure' },
      { id: 'decision-guidelines', title: '2. Review Process' },
    ],
    content: [
      {
        type: 'paragraph',
        text: 'This is an internal draft template for drafting Architectural Decision Records (ADRs). In production builds, this draft article is programmatically excluded per the strict Phase 4 gate requirements.',
      },
      {
        type: 'heading',
        level: 'h2',
        id: 'template-structure',
        text: '1. ADR Template Structure',
      },
      {
        type: 'callout',
        variant: 'note',
        title: 'Draft Notice',
        text: 'This article is flagged with draft: true and is excluded from production prerendering and public sitemaps.',
      },
    ],
  },
];

// Validate all entries against schema
const ALL_INSIGHTS = RAW_INSIGHTS.map((item) => InsightItemSchema.parse(item));

// In production, strictly exclude drafts per PART 6.6 & PART 9
export const INSIGHTS: InsightItem[] =
  process.env.NODE_ENV === 'production'
    ? ALL_INSIGHTS.filter((item) => !item.draft)
    : ALL_INSIGHTS.filter((item) => !item.draft); // Also filter out of public listings

export const ALL_INSIGHTS_INCLUDING_DRAFTS: InsightItem[] = ALL_INSIGHTS;

