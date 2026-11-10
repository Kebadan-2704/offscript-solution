'use client';

interface ProjectArtworkProps {
  slug: string;
  className?: string;
}

/**
 * Bespoke Architectural Blueprint Visuals for Each Selected Project.
 * Renders technical vector artwork matching each system's domain.
 */
export function ProjectArtwork({ slug, className = 'w-full h-full' }: ProjectArtworkProps) {
  switch (slug) {
    case 'liferoute-driver':
      // Emergency Vehicle Transit & GPS Telemetry Vector
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-label="LifeRoute Driver Telemetry Diagram">
          <circle cx="60" cy="60" r="48" stroke="#191B1E" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
          <circle cx="60" cy="60" r="36" stroke="#D36B4D" strokeWidth="1.5" strokeDasharray="6 3" />
          <path d="M60 12V108M12 60H108" stroke="#191B1E" strokeWidth="1" opacity="0.25" />
          {/* Compass Navigation Chevron */}
          <path d="M60 28L80 84L60 72L40 84L60 28Z" fill="#D36B4D" stroke="#191B1E" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="60" cy="28" r="4" fill="#191B1E" />
          <circle cx="60" cy="60" r="3" fill="#F5F3ED" />
          {/* Real-time telemetry pulse wave */}
          <circle cx="60" cy="28" r="8" stroke="#D36B4D" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.8" />
          {/* Waypoint coordinates */}
          <text x="66" y="96" fill="#191B1E" fontSize="7" fontFamily="monospace" fontWeight="600">GPS ACTIVE</text>
        </svg>
      );

    case 'liferoute-user':
      // Emergency Healthcare Transit & Patient Ingestion Beacon
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-label="LifeRoute Patient Transit Diagram">
          <circle cx="60" cy="60" r="50" stroke="#191B1E" strokeWidth="1" opacity="0.3" />
          <circle cx="60" cy="60" r="38" stroke="#D36B4D" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="60" cy="60" r="24" fill="#D36B4D" fillOpacity="0.15" stroke="#D36B4D" strokeWidth="1.5" />
          {/* Cross-hair target */}
          <path d="M60 16V104M16 60H104" stroke="#191B1E" strokeWidth="1.2" opacity="0.4" />
          {/* Medical Cross Emblem */}
          <rect x="54" y="44" width="12" height="32" rx="2" fill="#191B1E" />
          <rect x="44" y="54" width="32" height="12" rx="2" fill="#191B1E" />
          <circle cx="60" cy="60" r="4" fill="#D36B4D" />
          <text x="24" y="108" fill="#52534E" fontSize="7" fontFamily="monospace">DISPATCH · SLA &lt;30s</text>
        </svg>
      );

    case 'baava-technologies':
      // Modular Enterprise Distributed System & Microservice Grid
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-label="Baava Technologies Enterprise Grid">
          <rect x="20" y="20" width="80" height="80" stroke="#191B1E" strokeWidth="2" />
          <rect x="32" y="32" width="56" height="56" stroke="#D36B4D" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M20 60H100M60 20V100" stroke="#191B1E" strokeWidth="1.5" opacity="0.3" />
          {/* Multi-node cluster nodes */}
          <rect x="26" y="26" width="16" height="16" fill="#191B1E" />
          <rect x="78" y="26" width="16" height="16" fill="#D36B4D" />
          <rect x="26" y="78" width="16" height="16" fill="#D36B4D" />
          <rect x="78" y="78" width="16" height="16" fill="#191B1E" />
          <circle cx="60" cy="60" r="8" fill="#F5F3ED" stroke="#191B1E" strokeWidth="2" />
          <text x="28" y="112" fill="#52534E" fontSize="7" fontFamily="monospace">ENTERPRISE ARCH</text>
        </svg>
      );

    case 'costa-devices':
      // Hardware IoT Telemetry, Bus Pinout & Microcontroller Blueprint
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-label="Costa Devices IoT Telemetry Blueprint">
          <rect x="30" y="30" width="60" height="60" rx="4" stroke="#191B1E" strokeWidth="2.5" fill="#F5F3ED" />
          {/* Microcontroller Pin Headers */}
          <path d="M16 42H30M16 60H30M16 78H30M90 42H104M90 60H104M90 78H104" stroke="#191B1E" strokeWidth="2" strokeLinecap="round" />
          <path d="M42 16V30M60 16V30M78 16V30M42 90V104M60 90V104M78 90V104" stroke="#191B1E" strokeWidth="2" strokeLinecap="round" />
          {/* Silicon Die Accent */}
          <rect x="44" y="44" width="32" height="32" fill="#191B1E" />
          <circle cx="60" cy="60" r="9" fill="#D36B4D" />
          <path d="M48 60H72" stroke="#F5F3ED" strokeWidth="2" />
          <text x="26" y="116" fill="#52534E" fontSize="7" fontFamily="monospace">MCU TELEMETRY</text>
        </svg>
      );

    case 'amos-frank':
      // Editorial Art-Directed Typography & Geometric Proportions
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-label="Amos Frank Creative System">
          <circle cx="55" cy="55" r="42" stroke="#191B1E" strokeWidth="2" />
          <rect x="46" y="36" width="50" height="58" stroke="#D36B4D" strokeWidth="2" />
          <path d="M22 96L98 24" stroke="#191B1E" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="76" cy="48" r="8" fill="#D36B4D" />
          <circle cx="46" cy="78" r="5" fill="#191B1E" />
          <path d="M30 40H60M30 50H50" stroke="#191B1E" strokeWidth="2" strokeLinecap="square" />
          <text x="24" y="114" fill="#52534E" fontSize="7" fontFamily="monospace">SYSTEM EDITORIAL</text>
        </svg>
      );

    case 'trinity-prayer-house':
      // Institutional Civic Cathedral Architecture & Vault Lines
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-label="Trinity Civic Architecture Platform">
          {/* Gothic / Romanesque Arch Blueprint */}
          <path d="M24 98V54C24 34 40 18 60 18C80 18 96 34 96 54V98" stroke="#191B1E" strokeWidth="2.5" />
          <path d="M40 98V60C40 48 48 40 60 40C72 40 80 48 80 60V98" stroke="#D36B4D" strokeWidth="2" strokeDasharray="4 3" />
          <path d="M60 18V98" stroke="#191B1E" strokeWidth="1.5" opacity="0.3" />
          <circle cx="60" cy="30" r="6" fill="#D36B4D" />
          <path d="M24 98H96" stroke="#191B1E" strokeWidth="3" />
          <text x="24" y="112" fill="#52534E" fontSize="7" fontFamily="monospace">CIVIC INCLUSIVE</text>
        </svg>
      );

    case 'keba-studio':
      // Isometric 3D Wireframe Cube & Spatial Vertex Computation
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-label="Keba Studio 3D Spatial Canvas">
          {/* Isometric Cube Wireframe */}
          <path d="M60 20L98 42V86L60 108L22 86V42L60 20Z" stroke="#191B1E" strokeWidth="2" strokeLinejoin="round" />
          <path d="M60 20V64M60 64L22 42M60 64L98 42M60 64V108" stroke="#191B1E" strokeWidth="2" />
          {/* Top illuminated facet */}
          <polygon points="60,20 98,42 60,64 22,42" fill="#D36B4D" fillOpacity="0.3" />
          {/* Center vertex node */}
          <circle cx="60" cy="64" r="7" fill="#D36B4D" stroke="#191B1E" strokeWidth="1.5" />
          <circle cx="60" cy="20" r="3" fill="#191B1E" />
          <circle cx="98" cy="42" r="3" fill="#191B1E" />
          <circle cx="22" cy="42" r="3" fill="#191B1E" />
          <text x="26" y="116" fill="#52534E" fontSize="7" fontFamily="monospace">SPATIAL 3D CANVAS</text>
        </svg>
      );

    case 'smoke-haus':
      // Contemporary Hospitality Culinary Seal & Circular Grill Chamber
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-label="Smoke Haus Culinary Experience">
          <circle cx="60" cy="60" r="44" stroke="#191B1E" strokeWidth="2.5" />
          <circle cx="60" cy="60" r="34" stroke="#D36B4D" strokeWidth="1.5" strokeDasharray="5 3" />
          {/* Thermal radiant rays */}
          <path d="M60 16V24M60 96V104M16 60H24M96 60H104" stroke="#191B1E" strokeWidth="2" />
          {/* Stylized flame / teardrop silhouette */}
          <path d="M42 78C42 78 48 54 60 36C72 54 78 78 78 78C78 87 70 91 60 91C50 91 42 87 42 78Z" fill="#D36B4D" stroke="#191B1E" strokeWidth="2" />
          <circle cx="60" cy="66" r="5" fill="#F5F3ED" />
          <text x="26" y="114" fill="#52534E" fontSize="7" fontFamily="monospace">HOSPITALITY CRAFT</text>
        </svg>
      );

    default:
      // Fallback High-Purity Technical Blueprint
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-label="Technical Architecture Blueprint">
          <rect x="24" y="24" width="72" height="72" stroke="#191B1E" strokeWidth="2" />
          <path d="M24 60H96M60 24V96" stroke="#191B1E" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          <circle cx="60" cy="60" r="18" fill="#D36B4D" fillOpacity="0.2" stroke="#D36B4D" strokeWidth="2" />
          <circle cx="60" cy="60" r="5" fill="#191B1E" />
          <text x="26" y="112" fill="#52534E" fontSize="7" fontFamily="monospace">SPEC ARCHITECTURE</text>
        </svg>
      );
  }
}

