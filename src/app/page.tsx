import Image from "next/image";
import { SOLUTIONS } from "@/lib/constants";
import SolutionCard from "@/components/SolutionCard";
import StatsCounter from "@/components/StatsCounter";
import TestimonialSlider from "@/components/TestimonialSlider";
import CTABanner from "@/components/CTABanner";
import HeroSection from "@/components/HeroSection";
import FadeInSection from "@/components/FadeInSection";
import AwardsSection from "@/components/AwardsSection";
import SectionHeading from "@/components/ui/SectionHeading";

const CLIENT_LOGOS = [
  { src: "/clients/amazon.svg", alt: "Amazon" },
  { src: "/clients/coca.svg", alt: "Coca-Cola" },
  { src: "/clients/hdfc.svg", alt: "HDFC" },
  { src: "/clients/hp.svg", alt: "HP" },
  { src: "/clients/hsbc.svg", alt: "HSBC" },
  { src: "/clients/medline.svg", alt: "Medline" },
  { src: "/clients/pepsi.svg", alt: "PepsiCo" },
  { src: "/clients/voda.svg", alt: "Vodafone" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Trusted By Section */}
      <section className="py-16 bg-paper-warm border-y border-navy-100">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-navy-600 text-sm font-medium uppercase tracking-[0.2em] mb-10">
            Trusted by leading enterprises across APAC
          </p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee gap-16 pr-16 hover:[animation-play-state:paused]">
              {CLIENT_LOGOS.map((logo) => (
                <div
                  key={logo.alt}
                  className="flex items-center justify-center h-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={40}
                    className="h-8 md:h-10 w-auto object-contain"
                    style={{ width: "auto" }}
                  />
                </div>
              ))}
              {/* Duplicate strip for the seamless loop — hidden from assistive tech */}
              {CLIENT_LOGOS.map((logo) => (
                <div
                  key={`${logo.alt}-dup`}
                  aria-hidden="true"
                  className="flex items-center justify-center h-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300"
                >
                  <Image
                    src={logo.src}
                    alt=""
                    width={120}
                    height={40}
                    className="h-8 md:h-10 w-auto object-contain"
                    style={{ width: "auto" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 md:py-28 bg-paper">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <SectionHeading
              align="center"
              eyebrow="What we do"
              title={
                <>
                  Our <em className="italic text-teal-600">solutions</em>
                </>
              }
              lede="Comprehensive AI-powered learning and development solutions designed for the modern enterprise."
            />
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SOLUTIONS.map((solution, index) => (
              <FadeInSection key={solution.slug} delay={index * 0.1} className="h-full">
                <SolutionCard
                  title={solution.shortTitle}
                  description={solution.description}
                  icon={solution.icon}
                  href={`/solutions/${solution.slug}`}
                />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsCounter />

      {/* Awards Section */}
      <AwardsSection />

      {/* Testimonials Section */}
      <TestimonialSlider />

      {/* CTA Banner */}
      <CTABanner
        title={
          <>
            Ready to get{" "}
            <em className="italic text-amber-400">started</em>?
          </>
        }
        subtitle="Transform your workforce with AI-powered learning solutions tailored for APAC enterprises."
        primaryCTA={{ text: "Book a Demo", href: "/contact/" }}
        secondaryCTA={{ text: "Explore Solutions", href: "/solutions/" }}
      />
    </>
  );
}
