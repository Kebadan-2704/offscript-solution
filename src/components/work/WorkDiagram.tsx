import { WorkItem } from '@/lib/schemas/work';

interface WorkDiagramProps {
  diagram: WorkItem['architectureDiagram'];
}

export function WorkDiagram({ diagram }: WorkDiagramProps) {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'ingest':
        return 'border-[#D36B4D] bg-[#F5F3ED] text-[#191B1E]';
      case 'compute':
        return 'border-[#191B1E] bg-[#191B1E] text-[#F5F3ED]';
      case 'storage':
        return 'border-[#92938D] bg-[#E6E2D9] text-[#191B1E]';
      case 'interface':
        return 'border-[#191B1E] bg-[#DCE3DD] text-[#191B1E]';
      default:
        return 'border-[#E6E2D9] bg-white text-[#191B1E]';
    }
  };

  return (
    <div className="p-6 sm:p-10 bg-[#F5F3ED] border border-[#E6E2D9] my-10">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E6E2D9]">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D36B4D]" />
          <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[#191B1E]">
            Technical Architecture Topology
          </span>
        </div>
        <span className="font-mono text-[11px] text-[#6B6C67]">
          {diagram.caption}
        </span>
      </div>

      {/* Structured Architecture Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {diagram.nodes.map((node, idx) => (
          <div
            key={idx}
            className={`p-5 sm:p-6 border flex flex-col justify-between ${getTierColor(
              node.tier
            )}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] uppercase tracking-wider font-semibold opacity-75">
                Node 0{idx + 1} {'//'} {node.tier}
              </span>
              <span className="font-mono text-xs opacity-50">→</span>
            </div>
            <div>
              <h5 className="font-space text-base sm:text-lg font-bold leading-tight mb-1">
                {node.label}
              </h5>
              <p className="font-mono text-xs opacity-80">
                {node.sublabel}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-[#E6E2D9] flex flex-wrap items-center gap-6 font-mono text-[11px] text-[#6B6C67]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 border border-[#D36B4D] bg-[#F5F3ED]" />
          <span>Ingestion Tier</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#191B1E]" />
          <span>Compute / ML Engine</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#E6E2D9]" />
          <span>Storage / Telemetry</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#DCE3DD]" />
          <span>Operator Interface</span>
        </div>
      </div>
    </div>
  );
}

