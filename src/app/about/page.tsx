import Image from "next/image";
import { Metadata } from "next";
import FadeInSection from "@/components/FadeInSection";
import CTABanner from "@/components/CTABanner";
import AwardsSection from "@/components/AwardsSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { cardClasses } from "@/components/ui/Card";

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
  },
  {
    title: "Impact",
    description:
      "Every solution we build is measured by its real-world business impact. We are obsessed with outcomes that move the needle for our clients.",
  },
  {
    title: "Integrity",
    description:
      "We build trust through transparency, data security, and honest partnerships. Our clients' success is our success, always.",
  },
  {
    title: "Inclusion",
    description:
      "We design learning experiences that work for diverse workforces across cultures, languages, and abilities throughout the APAC region.",
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

const team = [
  { name: "Team Member", role: "CEO & Founder" },
  { name: "Team Member", role: "CTO" },
  { name: "Team Member", role: "VP, Learning Design" },
  { name: "Team Member", role: "Head of AI & Product" },
];

export default function AboutPage() {
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
              eyebrow="Our story"
              title={
                <>
                  About <em className="italic text-teal-600">Zrutam</em>
                </>
              }
              lede="We are an AI-powered Learning and Development company on a mission to transform how enterprises build, grow, and retain talent across India, the Middle East, and Southeast Asia."
            />
          </FadeInSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-paper-warm border-t border-navy-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16">
            <FadeInSection>
              <div>
                <div className="inline-flex w-fit items-center justify-center bg-teal-50 text-teal-600 rounded-xl p-3 mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl md:text-3xl leading-[1.15] tracking-tight text-ink mb-4">
                  Our Vision
                </h2>
                <p className="text-navy-600 text-lg leading-relaxed">
                  To be the leading AI-powered corporate L&D partner for
                  enterprises across the APAC region, enabling every organization
                  to unlock the full potential of its workforce through
                  intelligent, personalized, and measurable learning experiences.
                </p>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <div>
                <div className="inline-flex w-fit items-center justify-center bg-amber-50 text-amber-600 rounded-xl p-3 mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl md:text-3xl leading-[1.15] tracking-tight text-ink mb-4">
                  Our Mission
                </h2>
                <p className="text-navy-600 text-lg leading-relaxed">
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

      {/* Values — numbered editorial rows */}
      <section className="py-20 md:py-28 bg-paper">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <SectionHeading
              eyebrow="Principles"
              title={
                <>
                  Our <em className="italic text-teal-600">Values</em>
                </>
              }
              lede="The principles that guide everything we build and every partnership we form."
            />
          </FadeInSection>
          <ol role="list" className="list-none max-w-4xl">
            {values.map((value, index) => (
              <li key={value.title}>
                <FadeInSection delay={index * 0.08}>
                  <div
                    className={`flex items-baseline gap-6 md:gap-10 py-6 md:py-8 ${
                      index < values.length - 1 ? "border-b border-navy-100" : ""
                    }`}
                  >
                    <span
                      className="font-display text-3xl text-navy-300 tabular-nums shrink-0"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl text-ink mb-2">
                        {value.title}
                      </h3>
                      <p className="text-navy-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </FadeInSection>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Awards */}
      <AwardsSection />

      {/* Team — founder portrait + roles */}
      <section className="py-20 md:py-28 bg-paper">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <FadeInSection>
              <div className="relative max-w-md mx-auto lg:mx-0">
                {/* Offset accent frame */}
                <div
                  className="absolute -bottom-5 -right-5 w-full h-full rounded-2xl border border-amber-500/70"
                  aria-hidden="true"
                />
                <div className="relative rounded-2xl overflow-hidden border border-navy-100 shadow-card bg-navy-50">
                  <Image
                    src="/shobhraj.jpg"
                    alt="Shobhraj Sharma, CEO & Founder of Zrutam"
                    width={560}
                    height={700}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.15}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600 mb-4">
                  The people
                </p>
                <h2 className="font-display text-3xl md:text-4xl leading-[1.1] tracking-tight text-ink mb-5">
                  Our Team
                </h2>
                <p className="text-navy-600 text-lg leading-relaxed">
                  A passionate team of L&D experts, technologists, and
                  strategists dedicated to transforming workforce development.
                </p>
                <ul role="list" className="mt-10 border-y border-navy-100 divide-y divide-navy-100">
                  {team.map((member) => (
                    <li
                      key={member.role}
                      className="flex items-center justify-between gap-4 py-4"
                    >
                      <span className="font-semibold text-ink">
                        {member.name}
                      </span>
                      <span className="text-sm text-navy-600 text-right">
                        {member.role}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Markets Served */}
      <section className="py-20 md:py-28 bg-paper-warm border-t border-navy-100">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <SectionHeading
              align="center"
              eyebrow="Where we work"
              title="Markets We Serve"
              lede="Delivering impact across three of the most dynamic economic regions in the world."
            />
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {markets.map((market, index) => (
              <FadeInSection key={market.region} delay={index * 0.15} className="h-full">
                <div className={cardClasses(true, "h-full p-8")}>
                  <div className="inline-flex w-fit items-center justify-center bg-teal-50 text-teal-600 rounded-xl p-3 mb-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl text-ink mb-3">
                    {market.region}
                  </h3>
                  <p className="text-navy-600 leading-relaxed mb-4">
                    {market.description}
                  </p>
                  <p className="text-sm text-navy-600">
                    <span className="font-semibold text-ink">Key cities:</span>{" "}
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
        primaryCTA={{ text: "Book a Demo", href: "/contact/" }}
        secondaryCTA={{ text: "Explore Solutions", href: "/solutions/" }}
      />
    </>
  );
}
