import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="pt-40 pb-28 bg-[#F5F3ED] min-h-[80vh] flex flex-col justify-center">
      <Container>
        <span className="font-mono text-xs text-[#D36B4D] tracking-widest uppercase block mb-4 font-semibold">
          404 // Route Error
        </span>

        <h1 className="font-syne text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight text-[#191B1E] leading-none mb-8">
          OFF SCRIPT<span className="text-[#D36B4D]">.</span>
        </h1>

        <p className="font-inter text-lg sm:text-xl text-[#6B6C67] max-w-xl leading-relaxed mb-10">
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

        <div className="pt-8 border-t border-[#E6E2D9] max-w-xl font-mono text-xs text-[#92938D] flex flex-wrap items-center gap-6">
          <span>Quick Destinations:</span>
          <Link href="/work" className="text-[#191B1E] hover:text-[#D36B4D] transition-colors">
            Selected Work →
          </Link>
          <Link href="/solutions" className="text-[#191B1E] hover:text-[#D36B4D] transition-colors">
            Custom Solutions →
          </Link>
          <Link href="/insights" className="text-[#191B1E] hover:text-[#D36B4D] transition-colors">
            Technical Insights →
          </Link>
        </div>
      </Container>
    </div>
  );
}
