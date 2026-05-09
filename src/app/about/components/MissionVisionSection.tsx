import FadeInSection from "@/shared/components/FadeInSection";

export default function MissionVisionSection() {
  return (
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
              <h2 className="text-3xl font-bold text-navy mb-4">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To be the leading AI-powered corporate L&amp;D partner for
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
              <h2 className="text-3xl font-bold text-navy mb-4">Our Mission</h2>
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
  );
}
