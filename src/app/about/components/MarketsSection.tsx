import FadeInSection from "@/shared/components/FadeInSection";
import markets from "../marketsData";

export default function MarketsSection() {
  return (
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
  );
}
