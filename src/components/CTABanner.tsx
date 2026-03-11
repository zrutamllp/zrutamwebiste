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
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="gradient-navy" />
      <div className="absolute inset-0 gradient-navy" />

      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal/5 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber/5 rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA - Amber */}
            <Link
              href={primaryCTA.href}
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold
                         text-navy bg-amber hover:bg-amber-400 rounded-lg transition-colors
                         shadow-lg shadow-amber/20 hover:shadow-amber/30 w-full sm:w-auto"
            >
              {primaryCTA.text}
            </Link>

            {/* Secondary CTA - Outlined White */}
            <Link
              href={secondaryCTA.href}
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold
                         text-white border-2 border-white/30 hover:border-white/60 rounded-lg
                         transition-colors hover:bg-white/5 w-full sm:w-auto"
            >
              {secondaryCTA.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
