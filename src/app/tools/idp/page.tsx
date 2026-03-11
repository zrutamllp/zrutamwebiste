import { Metadata } from "next";
import Link from "next/link";
import FadeInSection from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: "IDP Tool powered by RSI\u2122 | Zrutam",
  description:
    "Zrutam's IDP Tool powered by the proprietary RSI\u2122 Career Driver Assessment. White-labeled, LMS-integrated Individual Development Plan platform.",
  openGraph: {
    title: "IDP Tool powered by RSI\u2122 | Zrutam",
    description:
      "White-labeled, LMS-integrated Individual Development Plan tool powered by the proprietary RSI\u2122 Career Driver Assessment.",
  },
};

export default function IDPToolProductPage() {
  const features = [
    {
      title: "RSI\u2122 Career Driver Assessment",
      description:
        "Our proprietary Role-Skill-Interest assessment identifies each employee's unique career drivers for personalized development plans.",
      icon: (
        <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
    },
    {
      title: "White-Label Ready",
      description:
        "Fully customizable branding with your company logo, colors, and domain. Your employees see your brand, powered by our technology.",
      icon: (
        <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      ),
    },
    {
      title: "LMS Integration",
      description:
        "Seamless integration with popular LMS platforms via API. Works with Cornerstone, SAP SuccessFactors, Moodle, and more.",
      icon: (
        <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      ),
    },
    {
      title: "Downloadable IDP Reports",
      description:
        "Generate branded PDF reports with development goals, timelines, and action plans that employees can share with their managers.",
      icon: (
        <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      title: "Secure & Compliant",
      description:
        "Enterprise-grade security with data encryption, role-based access control, and compliance with regional data protection regulations.",
      icon: (
        <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      title: "Analytics Dashboard",
      description:
        "Track IDP completion rates, skill development progress, and organizational learning trends through real-time analytics.",
      icon: (
        <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Assess",
      description:
        "Employees take the RSI\u2122 Career Driver Assessment to identify their unique Role, Skill, and Interest drivers.",
    },
    {
      step: "02",
      title: "Plan",
      description:
        "AI generates personalized Individual Development Plans with targeted goals, learning recommendations, and timelines.",
    },
    {
      step: "03",
      title: "Grow",
      description:
        "Employees execute their plans with integrated learning resources while managers track progress through analytics dashboards.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="gradient-navy py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-teal/5 blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-amber/5 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal/10 border border-teal/20 rounded-full text-teal text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              Proprietary Technology
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              IDP Tool{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-teal-200">
                powered by RSI&trade;
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10">
              The only white-labeled Individual Development Plan platform built
              on a proprietary career driver assessment. Give your employees a
              personalized growth roadmap powered by AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-amber hover:bg-amber-600 text-navy font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-amber/25"
              >
                Start Free Trial
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                Request a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Everything You Need for Employee Development
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                A comprehensive platform that transforms how your organization
                approaches individual development planning.
              </p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FadeInSection key={feature.title} delay={index * 0.1}>
                <div className="bg-gray-50 rounded-xl p-8 hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-teal/20 group">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                How It Works
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Three simple steps to transform employee development at your
                organization.
              </p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((item, index) => (
              <FadeInSection key={item.step} delay={index * 0.15}>
                <div className="relative text-center">
                  <div className="text-7xl font-bold text-teal/10 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 -right-4 w-8">
                      <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                  Integrates with Your Existing Stack
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  The IDP Tool connects seamlessly with your existing HR
                  technology ecosystem through REST APIs and pre-built
                  connectors.
                </p>
                <div className="space-y-4">
                  {[
                    "Learning Management Systems (LMS)",
                    "Human Resource Information Systems (HRIS)",
                    "Single Sign-On (SSO) via SAML/OAuth",
                    "Performance Management Platforms",
                    "Talent Marketplace Solutions",
                  ].map((integration) => (
                    <div key={integration} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{integration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <div className="bg-gradient-to-br from-navy to-navy-50 rounded-2xl p-8 md:p-12">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Cornerstone",
                    "SAP SuccessFactors",
                    "Moodle",
                    "Workday",
                    "BambooHR",
                    "Custom LMS",
                  ].map((platform) => (
                    <div
                      key={platform}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10"
                    >
                      <span className="text-white/80 text-sm font-medium">
                        {platform}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Employee Development?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
              Join leading enterprises across APAC who use the IDP Tool to drive
              personalized employee growth at scale.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-amber hover:bg-amber-600 text-navy font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-amber/25 text-lg"
            >
              Start Free Trial
            </Link>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
