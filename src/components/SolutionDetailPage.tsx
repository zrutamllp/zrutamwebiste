import FadeInSection from "@/components/FadeInSection";
import CTABanner from "@/components/CTABanner";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import GrowthArc from "@/components/graphics/GrowthArc";

interface SolutionData {
  title: string;
  slug: string;
  shortTitle: string;
  description: string;
  icon: string;
  features: string[];
  targetAudience: string;
  highlight: string;
}

interface SolutionDetailPageProps {
  solution: SolutionData;
  longDescription: string;
}

export default function SolutionDetailPage({
  solution,
  longDescription,
}: SolutionDetailPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-paper grain overflow-hidden">
        <div
          className="absolute inset-y-0 right-0 w-1/2 bg-grid-dots opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] hidden lg:block"
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600 mb-6">
                Solutions
              </p>
              <h1 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-ink text-balance mb-6">
                {solution.title}
              </h1>
              <p className="text-lg md:text-xl text-navy-600 leading-relaxed max-w-xl mb-10">
                {solution.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact/">Book a Demo</Button>
                <Button href="/solutions/" variant="outline">
                  All Solutions
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <GrowthArc className="w-full max-w-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Overview + highlight pull-quote */}
      <section className="py-20 md:py-28 bg-paper-warm border-t border-navy-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <FadeInSection>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600 mb-4">
                  Overview
                </p>
                <h2 className="font-display text-3xl md:text-4xl leading-[1.1] tracking-tight text-ink mb-6">
                  How it works
                </h2>
                <p className="text-navy-600 text-lg leading-relaxed">
                  {longDescription}
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.15}>
              <blockquote className="border-l-2 border-amber-500 pl-6 lg:pl-8">
                <p className="font-display italic text-2xl md:text-3xl leading-snug text-ink text-balance">
                  {solution.highlight}
                </p>
              </blockquote>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Features — numbered editorial rows */}
      <section className="py-20 md:py-28 bg-paper">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <SectionHeading
              eyebrow="Key features"
              title={
                <>
                  What&apos;s <em className="italic text-teal-600">inside</em>
                </>
              }
            />
          </FadeInSection>
          <div className="max-w-4xl">
            {solution.features.map((feature, index) => (
              <FadeInSection key={feature} delay={index * 0.08}>
                <div
                  className={`flex items-baseline gap-6 md:gap-10 py-6 md:py-7 ${
                    index < solution.features.length - 1
                      ? "border-b border-navy-100"
                      : ""
                  }`}
                >
                  <span
                    className="font-display text-3xl text-navy-300 tabular-nums shrink-0"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-ink text-lg md:text-xl leading-relaxed">
                    {feature}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Target audience callout */}
      <section className="py-20 md:py-28 bg-paper-warm border-y border-navy-100">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <div className="max-w-3xl mx-auto bg-teal-50 border-l-2 border-teal-500 rounded-r-xl p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600 mb-3">
                Who this is for
              </p>
              <p className="text-ink text-lg md:text-xl leading-relaxed">
                {solution.targetAudience}
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Closing CTA */}
      <CTABanner
        title={
          <>
            Ready to get <em className="italic text-amber-400">started</em>?
          </>
        }
        subtitle={`Schedule a personalized demo to see how ${solution.shortTitle} can transform your organization.`}
        primaryCTA={{ text: "Book a Demo", href: "/contact/" }}
        secondaryCTA={{ text: "Contact Sales", href: "/contact/" }}
      />
    </>
  );
}
