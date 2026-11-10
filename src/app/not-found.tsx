import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="pt-40 pb-28 bg-[#F5F3ED] min-h-[80vh] flex flex-col justify-center">
      <Container>
        <span className="font-mono text-xs text-[#D36B4D] tracking-widest uppercase block mb-4 font-semibold">
          404 — Page Not Found
        </span>

        <h1 className="font-syne text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#191B1E] leading-none mb-8 break-words">
          OFF SCRIPT<span className="text-[#D36B4D]">.</span>
        </h1>

        <p className="font-inter text-base sm:text-lg text-[#52534E] max-w-xl leading-relaxed mb-10">
          The requested system endpoint does not exist or has been re-architected. Return to base
          navigation below:
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-12">
          <Button href="/" variant="primary">
            Return Home
          </Button>
          <Button href="/services" variant="secondary">
            Explore Services
          </Button>
          <Button href="/contact" variant="dark">
            Direct Contact
          </Button>
        </div>

        <div className="pt-8 border-t border-[#E6E2D9] max-w-xl font-mono text-xs text-[#52534E] flex flex-wrap items-center gap-6">
          <span>Quick Destinations:</span>
          <Link href="/work" className="text-[#191B1E] hover:text-[#9B3F27] transition-colors min-h-[44px] inline-flex items-center">
            Selected Work →
          </Link>
          <Link href="/solutions" className="text-[#191B1E] hover:text-[#9B3F27] transition-colors min-h-[44px] inline-flex items-center">
            Custom Solutions →
          </Link>
          <Link href="/insights" className="text-[#191B1E] hover:text-[#9B3F27] transition-colors min-h-[44px] inline-flex items-center">
            Technical Insights →
          </Link>
        </div>
      </Container>
    </div>
  );
}
