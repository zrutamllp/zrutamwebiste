import { Metadata } from "next";
import FadeInSection from "@/components/FadeInSection";
import CTABanner from "@/components/CTABanner";
import AwardsSection from "@/components/AwardsSection";

export const metadata: Metadata = {
  title: "About Zrutam | AI-Powered L&D Company",
  description:
    "Zrutam is an AI-powered Learning & Development company transforming how enterprises develop talent across India, Middle East, and Southeast Asia.",
  openGraph: {
    title: "About Zrutam | AI-Powered L&D Company",
    description:
      "Transforming workforce development across APAC with AI-powered learning solutions.",
  },
};

const values = [
  {
    title: "Innovation",
    description:
      "We leverage cutting-edge AI and technology to create learning experiences that adapt, personalize, and evolve with every interaction.",
    icon: (
      <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    title: "Impact",
    description:
      "Every solution we build is measured by its real-world business impact. We are obsessed with outcomes that move the needle for our clients.",
    icon: (
      <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Integrity",
    description:
      "We build trust through transparency, data security, and honest partnerships. Our clients' success is our success, always.",
    icon: (
      <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Inclusion",
    description:
      "We design learning experiences that work for diverse workforces across cultures, languages, and abilities throughout the APAC region.",
    icon: (
      <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

const markets = [
  {
    region: "India",
    description:
      "Our home market and the fastest-growing corporate L&D segment globally. We serve enterprises across major metros and tier-2 cities.",
    cities: "Mumbai, Bangalore, Delhi NCR, Hyderabad, Chennai",
  },
  {
    region: "Middle East",
    description:
      "Supporting the ambitious Vision 2030 agendas across the Gulf region with culturally-adapted leadership and skills development programs.",
    cities: "Dubai, Abu Dhabi, Riyadh, Doha",
  },
  {
    region: "Southeast Asia",
    description:
      "Enabling workforce transformation across one of the world's most dynamic and diverse economic regions.",
    cities: "Singapore, Kuala Lumpur, Bangkok, Jakarta",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              About Zrutam
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              We are an AI-powered Learning and Development company on a
              mission to transform how enterprises build, grow, and retain
              talent across India, the Middle East, and Southeast Asia.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <FadeInSection>
              <div>
                <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-navy mb-4">
                  Our Vision
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To be the leading AI-powered corporate L&D partner for
                  enterprises across the APAC region, enabling every organization
                  to unlock the full potential of its workforce through
                  intelligent, personalized, and measurable learning experiences.
                </p>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <div>
                <div className="w-12 h-12 bg-amber/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-navy mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To empower organizations with AI-driven learning tools and
                  frameworks that make leadership development, skills assessment,
                  and career growth accessible, personalized, and impactful. We
                  bridge the gap between ambitious talent strategies and
                  measurable business outcomes.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Our Values
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                The principles that guide everything we build and every
                partnership we form.
              </p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <FadeInSection key={value.title} delay={index * 0.1}>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 text-center h-full">
                  <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <AwardsSection />

      {/* Team Placeholder */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Our Team
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                A passionate team of L&D experts, technologists, and
                strategists dedicated to transforming workforce development.
              </p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Team Member", role: "CEO & Founder" },
              { name: "Team Member", role: "CTO" },
              { name: "Team Member", role: "VP, Learning Design" },
              { name: "Team Member", role: "Head of AI & Product" },
            ].map((member, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-navy">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Markets Served */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
                Markets We Serve
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Delivering impact across three of the most dynamic economic
                regions in the world.
              </p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {markets.map((market, index) => (
              <FadeInSection key={market.region} delay={index * 0.15}>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal to-teal-500 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-3">
                    {market.region}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {market.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Key cities:</span>{" "}
                    {market.cities}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Transform Your Workforce?"
        subtitle="Partner with Zrutam to build a future-ready organization with AI-powered learning solutions."
        primaryCTA={{ text: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ text: "Explore Solutions", href: "/solutions" }}
      />
    </>
  );
}
