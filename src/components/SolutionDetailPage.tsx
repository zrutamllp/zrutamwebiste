import Link from "next/link";
import FadeInSection from "@/components/FadeInSection";


interface SolutionData {
  title: string;
  slug: string;
  shortTitle: string;
  description: string;
  icon: string;
  features: string[];
  targetAudience: string;
  highlight: string;
}

interface SolutionDetailPageProps {
  solution: SolutionData;
  longDescription: string;
}

export default function SolutionDetailPage({
  solution,
  longDescription,
}: SolutionDetailPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="gradient-navy py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link
              href="/solutions"
              className="inline-flex items-center text-teal hover:text-teal-200 text-sm font-medium mb-6 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Solutions
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {solution.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {solution.description}
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeInSection>
              <div>
                <h2 className="text-3xl font-bold text-navy mb-6">Overview</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {longDescription}
                </p>
              </div>
            </FadeInSection>

            {/* Key Highlight Callout */}
            <FadeInSection delay={0.2}>
              <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl p-8 border border-teal-200/50">
                <div className="w-12 h-12 bg-teal rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-navy mb-2">
                  Key Highlight
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {solution.highlight}
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <h2 className="text-3xl font-bold text-navy mb-12 text-center">
              Key Features
            </h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {solution.features.map((feature, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <div className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal/10 rounded-lg flex items-center justify-center mt-0.5">
                    <svg
                      className="w-5 h-5 text-teal"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{feature}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-navy mb-6">
                Who Is This For?
              </h2>
              <div className="bg-navy-50 rounded-2xl p-8">
                <div className="w-16 h-16 bg-amber/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-amber"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                </div>
                <p className="text-xl text-navy font-medium">
                  {solution.targetAudience}
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
              Schedule a personalized demo to see how {solution.shortTitle} can
              transform your organization.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-amber hover:bg-amber-600 text-navy font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-amber/25"
              >
                Book a Demo
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                Contact Sales
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
