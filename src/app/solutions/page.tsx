import { Metadata } from "next";
import { SOLUTIONS } from "@/lib/constants";
import SolutionCard from "@/components/SolutionCard";
import FadeInSection from "@/components/FadeInSection";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/ui/SectionHeading";
import { cardClasses } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Our Solutions | Zrutam",
  description:
    "Explore Zrutam's AI-powered corporate L&D solutions including leadership development, IDP tools, upskilling, custom e-learning, and AI skills assessment.",
};

const WHY_ZRUTAM = [
  {
    title: "AI-First Approach",
    description:
      "Every solution is powered by advanced AI for personalized, adaptive learning experiences that evolve with your workforce.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
        />
      </svg>
    ),
  },
  {
    title: "APAC Contextualized",
    description:
      "Solutions built specifically for the India, Middle East, and Southeast Asia markets with localized content and cultural relevance.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
  },
  {
    title: "Measurable ROI",
    description:
      "Built-in analytics and reporting so you can demonstrate the impact of every learning initiative to stakeholders.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
  },
];

export default function SolutionsPage() {
  return (
    <>
      {/* Header + solutions grid */}
      <section className="relative bg-paper grain overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-96 bg-grid-dots opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <FadeInSection>
            <SectionHeading
              as="h1"
              align="center"
              eyebrow="Solutions"
              title={
                <>
                  Learning designed to{" "}
                  <em className="italic text-teal-600">compound</em>
                </>
              }
              lede="Comprehensive, AI-powered learning and development solutions designed to transform your workforce and drive measurable business outcomes across APAC."
            />
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SOLUTIONS.map((solution, index) => (
              <FadeInSection
                key={solution.slug}
                delay={index * 0.1}
                className="h-full"
              >
                <SolutionCard
                  title={solution.title}
                  description={solution.description}
                  icon={solution.icon}
                  href={`/solutions/${solution.slug}`}
                />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Zrutam */}
      <section className="py-20 md:py-28 bg-paper-warm border-t border-navy-100">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <SectionHeading
              align="center"
              eyebrow="Why Zrutam"
              title={
                <>
                  What sets our solutions{" "}
                  <em className="italic text-teal-600">apart</em>
                </>
              }
              lede="Three principles run through everything we build for the APAC L&D market."
            />
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY_ZRUTAM.map((item, index) => (
              <FadeInSection key={item.title} delay={index * 0.15} className="h-full">
                <div className={cardClasses(true, "h-full p-8")}>
                  <div className="inline-flex w-fit items-center justify-center bg-teal-50 text-teal-600 rounded-xl p-3 mb-6">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-xl text-ink mb-3">
                    {item.title}
                  </h3>
                  <p className="text-navy-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title={
          <>
            Not sure which solution is{" "}
            <em className="italic text-amber-400">right</em> for you?
          </>
        }
        subtitle="Our team can help you identify the best approach for your organization's L&D goals."
        primaryCTA={{ text: "Talk to Us", href: "/contact/" }}
        secondaryCTA={{ text: "Book a Demo", href: "/contact/" }}
      />
    </>
  );
}
