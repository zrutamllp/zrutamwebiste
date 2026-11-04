import Image from "next/image";
import { Metadata } from "next";
import FadeInSection from "@/components/FadeInSection";
import CTABanner from "@/components/CTABanner";
import TestimonialSlider from "@/components/TestimonialSlider";
import SectionHeading from "@/components/ui/SectionHeading";
import { cardClasses } from "@/components/ui/Card";

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

export const metadata: Metadata = {
  title: "Our Clients | Zrutam",
  description:
    "Discover how leading enterprises across India, Middle East, and Southeast Asia partner with Zrutam to transform their workforce through AI-powered L&D solutions.",
};

const caseStudies = [
  {
    industry: "Financial Services",
    company: "Leading APAC Banking Group",
    challenge:
      "A major banking group with over 25,000 employees across Southeast Asia struggled with inconsistent leadership development programs that lacked personalization and measurable outcomes.",
    solution:
      "Deployed Zrutam's AI-adaptive Leadership Development Program combined with the IDP Tool powered by RSI™ to create individualized growth pathways for 500+ senior and mid-level leaders.",
    result:
      "40% improvement in leadership competency scores within 12 months. 85% of participants reported higher engagement with personalized learning paths compared to previous programs.",
    metrics: { improvement: "40%", leaders: "500+", satisfaction: "85%" },
  },
  {
    industry: "Technology & IT Services",
    company: "Enterprise IT Consulting Firm",
    challenge:
      "A fast-growing IT services firm in India needed to rapidly upskill 3,000 engineers for cloud-native technologies while retaining talent in a competitive market.",
    solution:
      "Implemented Zrutam's Upskilling & Reskilling platform with AI-powered skills assessment and custom e-learning modules contextualized for Indian technology teams.",
    result:
      "60% faster time-to-competency in cloud skills. Internal mobility increased by 35%, significantly reducing attrition among high-potential engineers.",
    metrics: { faster: "60%", mobility: "35%", engineers: "3,000" },
  },
  {
    industry: "Oil & Gas / Energy",
    company: "Middle East Energy Corporation",
    challenge:
      "A leading energy corporation in the Gulf region faced a talent pipeline gap as experienced leaders approached retirement, with no structured succession development framework.",
    solution:
      "Designed a comprehensive Custom E-Learning and Simulation program combined with 360-degree feedback and AI-driven leadership assessments tailored for the energy sector.",
    result:
      "Identified and accelerated development of 120 high-potential successors. Training completion rates rose from 45% to 92% with the immersive, scenario-based approach.",
    metrics: { successors: "120", completion: "92%", improvement: "2x" },
  },
];

export default function ClientsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-paper grain overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-96 bg-grid-dots opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-20">
          <FadeInSection>
            <SectionHeading
              as="h1"
              align="center"
              eyebrow="Clients"
              title={
                <>
                  Our <em className="italic text-teal-600">Clients</em>
                </>
              }
              lede="Trusted by forward-thinking enterprises across APAC to drive workforce transformation through AI-powered learning and development."
            />
          </FadeInSection>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 md:py-20 bg-paper-warm border-t border-navy-100">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-navy-600 text-sm font-semibold uppercase tracking-[0.18em] mb-10">
            Trusted across industries
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {CLIENT_LOGOS.map((logo) => (
              <div
                key={logo.alt}
                className={cardClasses(
                  false,
                  "flex items-center justify-center h-24 md:h-28 p-6"
                )}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={48}
                  className="h-9 md:h-11 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300"
                  style={{ width: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSlider />

      {/* Case Studies */}
      <section className="py-20 md:py-28 bg-paper-warm border-t border-navy-100">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <SectionHeading
              align="center"
              eyebrow="Proof"
              title={
                <>
                  Case <em className="italic text-teal-600">Studies</em>
                </>
              }
              lede="Real results from real partnerships. See how we have helped organizations achieve measurable impact."
            />
          </FadeInSection>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <FadeInSection key={study.industry} delay={index * 0.15}>
                <div className={cardClasses(true, "overflow-hidden")}>
                  <div className="p-8 md:p-10">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="px-3 py-1 bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium rounded-full">
                        {study.industry}
                      </span>
                      <span className="text-navy-600 text-sm">
                        {study.company}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Challenge */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                          </div>
                          <h3 className="font-semibold text-ink">Challenge</h3>
                        </div>
                        <p className="text-navy-600 text-sm leading-relaxed">
                          {study.challenge}
                        </p>
                      </div>

                      {/* Solution */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <h3 className="font-semibold text-ink">Solution</h3>
                        </div>
                        <p className="text-navy-600 text-sm leading-relaxed">
                          {study.solution}
                        </p>
                      </div>

                      {/* Result */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                          <h3 className="font-semibold text-ink">Result</h3>
                        </div>
                        <p className="text-navy-600 text-sm leading-relaxed">
                          {study.result}
                        </p>
                      </div>
                    </div>

                    {/* Metrics Bar */}
                    <div className="mt-8 pt-6 border-t border-navy-100">
                      <div className="flex flex-wrap gap-8">
                        {Object.entries(study.metrics).map(([key, value]) => (
                          <div key={key}>
                            <div className="font-display text-3xl text-amber-600">
                              {value}
                            </div>
                            <div className="text-xs text-navy-600 uppercase tracking-wider mt-1">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Join Our Growing Client Network"
        subtitle="See how Zrutam can transform your workforce development strategy."
        primaryCTA={{ text: "Book a Demo", href: "/contact/" }}
        secondaryCTA={{ text: "View Solutions", href: "/solutions/" }}
      />
    </>
  );
}
