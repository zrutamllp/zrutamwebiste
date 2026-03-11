import Image from "next/image";
import { SOLUTIONS } from "@/lib/constants";
import SolutionCard from "@/components/SolutionCard";
import StatsCounter from "@/components/StatsCounter";
import TestimonialSlider from "@/components/TestimonialSlider";
import CTABanner from "@/components/CTABanner";
import HeroSection from "@/components/HeroSection";
import FadeInSection from "@/components/FadeInSection";
import AwardsSection from "@/components/AwardsSection";

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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm font-medium uppercase tracking-wider mb-10">
            Trusted by leading enterprises across APAC
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
            {CLIENT_LOGOS.map((logo) => (
              <div key={logo.alt} className="flex items-center justify-center h-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={40}
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Our Solutions
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Comprehensive AI-powered learning and development solutions
                designed for the modern enterprise.
              </p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SOLUTIONS.map((solution, index) => (
              <FadeInSection key={solution.slug} delay={index * 0.1}>
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
      <section className="py-20 gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsCounter />
        </div>
      </section>

      {/* Awards Section */}
      <AwardsSection />

      {/* Testimonials Section */}
      <TestimonialSlider />

      {/* CTA Banner */}
      <CTABanner
        title="Ready to Get Started?"
        subtitle="Transform your workforce with AI-powered learning solutions tailored for APAC enterprises."
        primaryCTA={{ text: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ text: "Email Us", href: "mailto:ceo@zrutam.com" }}
      />
    </>
  );
}
