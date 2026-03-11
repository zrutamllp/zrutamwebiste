import Image from "next/image";
import { Metadata } from "next";
import FadeInSection from "@/components/FadeInSection";
import CTABanner from "@/components/CTABanner";

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
      "Deployed Zrutam's AI-adaptive Leadership Development Program combined with the IDP Tool powered by RSI\u2122 to create individualized growth pathways for 500+ senior and mid-level leaders.",
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
      <section className="gradient-navy py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Clients
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Trusted by forward-thinking enterprises across APAC to drive
            workforce transformation through AI-powered learning and
            development.
          </p>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm font-medium uppercase tracking-wider mb-10">
            Trusted across industries
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
            {CLIENT_LOGOS.map((logo) => (
              <div key={logo.alt} className="flex items-center justify-center h-12">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={48}
                  className="h-9 md:h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Case Studies
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Real results from real partnerships. See how we have helped
                organizations achieve measurable impact.
              </p>
            </div>
          </FadeInSection>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <FadeInSection key={study.industry} delay={index * 0.15}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-8 md:p-10">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="px-3 py-1 bg-teal/10 text-teal text-sm font-medium rounded-full">
                        {study.industry}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {study.company}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Challenge */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                          </div>
                          <h3 className="font-semibold text-navy">Challenge</h3>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {study.challenge}
                        </p>
                      </div>

                      {/* Solution */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <h3 className="font-semibold text-navy">Solution</h3>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {study.solution}
                        </p>
                      </div>

                      {/* Result */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                          <h3 className="font-semibold text-navy">Result</h3>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {study.result}
                        </p>
                      </div>
                    </div>

                    {/* Metrics Bar */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <div className="flex flex-wrap gap-8">
                        {Object.entries(study.metrics).map(([key, value]) => (
                          <div key={key}>
                            <div className="text-2xl font-bold text-teal">
                              {value}
                            </div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">
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
        primaryCTA={{ text: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ text: "View Solutions", href: "/solutions" }}
      />
    </>
  );
}
