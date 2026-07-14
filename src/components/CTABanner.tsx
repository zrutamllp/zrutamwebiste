import Link from "next/link";
import { buttonBase } from "@/components/ui/Button";

interface CTABannerProps {
  title: React.ReactNode;
  subtitle: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
}

const ctaBase = `${buttonBase} px-7 py-3.5 w-full sm:w-auto`;

export default function CTABanner({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
}: CTABannerProps) {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative bg-ink grain rounded-3xl px-6 py-16 sm:px-12 lg:py-20 overflow-hidden">
          {/* Decorative hairline rings, upper right */}
          <svg
            viewBox="0 0 400 400"
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-[320px] h-[320px]"
          >
            <circle cx="200" cy="200" r="190" fill="none" stroke="#FAF9F6" strokeOpacity="0.08" strokeWidth="1" />
            <circle cx="200" cy="200" r="140" fill="none" stroke="#FAF9F6" strokeOpacity="0.1" strokeWidth="1" />
            <circle cx="200" cy="200" r="90" fill="none" stroke="#F59E0B" strokeOpacity="0.25" strokeWidth="1" />
          </svg>

          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-paper tracking-tight leading-[1.1] text-balance mb-4">
              {title}
            </h2>
            <p className="text-lg sm:text-xl text-navy-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary CTA — inverted paper-on-ink */}
              <Link
                href={primaryCTA.href}
                className={`${ctaBase} bg-paper text-ink hover:bg-white hover:shadow-lift hover:-translate-y-0.5`}
              >
                {primaryCTA.text}
              </Link>

              {/* Secondary CTA — outline on ink */}
              <Link
                href={secondaryCTA.href}
                className={`${ctaBase} border border-navy-600 text-paper hover:border-paper hover:-translate-y-0.5`}
              >
                {secondaryCTA.text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
