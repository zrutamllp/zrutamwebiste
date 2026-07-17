import { Metadata } from "next";
import Link from "next/link";
import FadeInSection from "@/components/FadeInSection";
import Button, { buttonBase } from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { cardClasses } from "@/components/ui/Card";
import NetworkMotif from "@/components/graphics/NetworkMotif";

export const metadata: Metadata = {
  title: "IDP Tool powered by RSI™ | Zrutam",
  description:
    "Zrutam's IDP Tool powered by the proprietary RSI™ Career Driver Assessment. White-labeled, LMS-integrated Individual Development Plan platform.",
  openGraph: {
    title: "IDP Tool powered by RSI™ | Zrutam",
    description:
      "White-labeled, LMS-integrated Individual Development Plan tool powered by the proprietary RSI™ Career Driver Assessment.",
  },
};

export default function IDPToolProductPage() {
  const features = [
    {
      title: "RSI™ Career Driver Assessment",
      description:
        "Our proprietary Role-Skill-Interest assessment identifies each employee's unique career drivers for personalized development plans.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
    },
    {
      title: "White-Label Ready",
      description:
        "Fully customizable branding with your company logo, colors, and domain. Your employees see your brand, powered by our technology.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      ),
    },
    {
      title: "LMS Integration",
      description:
        "Seamless integration with popular LMS platforms via API. Works with Cornerstone, SAP SuccessFactors, Moodle, and more.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      ),
    },
    {
      title: "Downloadable IDP Reports",
      description:
        "Generate branded PDF reports with development goals, timelines, and action plans that employees can share with their managers.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      title: "Secure & Compliant",
      description:
        "Enterprise-grade security with data encryption, role-based access control, and compliance with regional data protection regulations.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      title: "Analytics Dashboard",
      description:
        "Track IDP completion rates, skill development progress, and organizational learning trends through real-time analytics.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
        "Employees take the RSI™ Career Driver Assessment to identify their unique Role, Skill, and Interest drivers.",
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
      <section className="relative bg-paper grain overflow-hidden">
        <div
          className="absolute inset-y-0 right-0 w-1/2 bg-grid-dots opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] hidden lg:block"
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600 mb-6">
                Proprietary Technology
              </p>
              <h1 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-ink text-balance mb-6">
                IDP Tool{" "}
                <em className="italic text-teal-600">powered by RSI&trade;</em>
              </h1>
              <p className="text-lg md:text-xl text-navy-600 leading-relaxed max-w-xl mb-10">
                The only white-labeled Individual Development Plan platform built
                on a proprietary career driver assessment. Give your employees a
                personalized growth roadmap powered by AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact">Start Free Trial</Button>
                <Button href="/contact" variant="outline">
                  Request a Demo
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <NetworkMotif className="w-full max-w-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 md:py-28 bg-paper-warm border-t border-navy-100">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <SectionHeading
              align="center"
              eyebrow="Platform"
              title="Everything You Need for Employee Development"
              lede="A comprehensive platform that transforms how your organization approaches individual development planning."
            />
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FadeInSection key={feature.title} delay={index * 0.1} className="h-full">
                <div className={cardClasses(true, "h-full p-8")}>
                  <div className="inline-flex w-fit items-center justify-center bg-teal-50 text-teal-600 rounded-xl p-3 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-xl text-ink mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-navy-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — numbered editorial rows */}
      <section className="py-20 md:py-28 bg-paper">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <SectionHeading
              eyebrow="How it works"
              title={
                <>
                  Three steps to{" "}
                  <em className="italic text-teal-600">growth</em>
                </>
              }
              lede="Three simple steps to transform employee development at your organization."
            />
          </FadeInSection>
          <ol role="list" className="list-none max-w-4xl">
            {steps.map((item, index) => (
              <li key={item.step}>
                <FadeInSection delay={index * 0.1}>
                  <div
                    className={`flex items-baseline gap-6 md:gap-10 py-6 md:py-7 ${
                      index < steps.length - 1 ? "border-b border-navy-100" : ""
                    }`}
                  >
                    <span
                      className="font-display text-3xl md:text-4xl text-navy-300 tabular-nums shrink-0"
                      aria-hidden="true"
                    >
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl text-ink mb-2">
                        {item.title}
                      </h3>
                      <p className="text-navy-600 text-lg leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </FadeInSection>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 md:py-28 bg-paper-warm border-t border-navy-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <FadeInSection>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600 mb-4">
                  Integrations
                </p>
                <h2 className="font-display text-3xl md:text-4xl leading-[1.1] tracking-tight text-ink mb-6">
                  Integrates with Your Existing Stack
                </h2>
                <p className="text-navy-600 text-lg leading-relaxed mb-8">
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
                      <div className="w-6 h-6 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-ink">{integration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <div className="bg-navy-50 border border-navy-100 rounded-2xl p-8 md:p-12">
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
                      className="bg-white border border-navy-100 rounded-lg shadow-card p-4 text-center"
                    >
                      <span className="text-navy-600 text-sm font-medium">
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
      <section className="bg-paper py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative bg-ink grain rounded-3xl px-6 py-16 sm:px-12 lg:py-20 overflow-hidden">
            <svg
              viewBox="0 0 400 400"
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 w-[320px] h-[320px]"
            >
              <circle cx="200" cy="200" r="190" fill="none" stroke="#FAF9F6" strokeOpacity="0.08" strokeWidth="1" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="#FAF9F6" strokeOpacity="0.1" strokeWidth="1" />
              <circle cx="200" cy="200" r="90" fill="none" stroke="#F59E0B" strokeOpacity="0.25" strokeWidth="1" />
            </svg>
            <FadeInSection>
              <div className="relative max-w-3xl mx-auto text-center">
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-paper tracking-tight leading-[1.1] text-balance mb-4">
                  Ready to Transform Employee Development?
                </h2>
                <p className="text-lg sm:text-xl text-navy-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join leading enterprises across APAC who use the IDP Tool to
                  drive personalized employee growth at scale.
                </p>
                <Link
                  href="/contact"
                  className={`${buttonBase} px-7 py-3.5 bg-paper text-ink hover:bg-white hover:shadow-lift hover:-translate-y-0.5`}
                >
                  Start Free Trial
                </Link>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>
    </>
  );
}
