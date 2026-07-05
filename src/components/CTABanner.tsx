import Link from "next/link";

interface CTABannerProps {
  title: string;
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

export default function CTABanner({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
}: CTABannerProps) {
  return (
    <section className="relative bg-surface py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated gradient border panel */}
        <div
          className="relative max-w-5xl mx-auto rounded-3xl p-[1px]
                     bg-[linear-gradient(120deg,rgba(14,165,233,0.5),rgba(245,158,11,0.4),rgba(14,165,233,0.5))]
                     bg-[length:200%_200%] animate-shimmer"
        >
          <div className="relative rounded-3xl bg-surface-raised px-6 py-16 sm:px-12 lg:py-20 overflow-hidden">
            {/* Ambient blobs inside panel */}
            <div className="aurora-blob animate-aurora-1 -top-24 -right-16 w-[320px] h-[320px] bg-teal/10" />
            <div className="aurora-blob animate-aurora-2 -bottom-24 -left-16 w-[280px] h-[280px] bg-amber/[0.06]" />

            <div className="relative max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                {title}
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Primary CTA - Amber */}
                <Link
                  href={primaryCTA.href}
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold
                             text-navy bg-amber hover:bg-amber-400 rounded-lg transition-all duration-300
                             shadow-glow-amber hover:-translate-y-1 w-full sm:w-auto"
                >
                  {primaryCTA.text}
                </Link>

                {/* Secondary CTA - Outlined White */}
                <Link
                  href={secondaryCTA.href}
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold
                             text-white border-2 border-white/20 hover:border-teal/50 rounded-lg
                             transition-all duration-300 hover:bg-white/5 w-full sm:w-auto"
                >
                  {secondaryCTA.text}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
