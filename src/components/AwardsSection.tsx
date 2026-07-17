"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";

const awards = [
  {
    year: "2026",
    title: "BW People L&D Excellence Awards",
    category: "Best Use of Simulations or Virtual Environments for Learning",
    medal: "Bronze",
    organizer: "BW Businessworld",
    edition: "2nd Annual",
  },
];

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0116.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.27 1.272m0 0a6.023 6.023 0 01-4 0m4 0a7.466 7.466 0 01.982 3.172M10.02 11a6.023 6.023 0 00-2.27-1.272" />
    </svg>
  );
}

function MedalBadge({ type }: { type: string }) {
  const colors: Record<string, { bg: string; text: string; ring: string; gradient: string }> = {
    Gold: {
      bg: "bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500",
      text: "text-ink",
      ring: "ring-amber-300/50",
      gradient: "from-amber-50 to-amber-100/50",
    },
    Silver: {
      bg: "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400",
      text: "text-gray-800",
      ring: "ring-gray-300/50",
      gradient: "from-gray-50 to-gray-100/50",
    },
    Bronze: {
      bg: "bg-gradient-to-br from-orange-300 via-amber-600 to-orange-700",
      text: "text-white",
      ring: "ring-orange-300/40",
      gradient: "from-orange-50 to-amber-50/50",
    },
  };
  const c = colors[type] || colors.Bronze;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${c.bg} ${c.text} text-xs font-bold uppercase tracking-wider ring-2 ${c.ring} shadow-sm`}>
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 1l2.928 5.856L19.856 8l-4.928 4.472L16.144 19 10 15.856 3.856 19l1.216-6.528L.144 8l6.928-1.144L10 1z" clipRule="evenodd" />
      </svg>
      {type}
    </div>
  );
}

export default function AwardsSection() {
  return (
    <section className="py-20 md:py-28 bg-paper-warm border-y border-navy-100 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 border border-amber-200 rounded-full mb-6">
            <TrophyIcon className="w-4 h-4 text-amber-700" />
            <span className="text-sm font-semibold text-amber-700">Award-Winning Excellence</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight text-ink text-balance mb-4">
            Awards &amp; <em className="italic text-teal-600">recognition</em>
          </h2>
          <p className="text-navy-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Recognized by industry leaders for innovation in corporate learning and development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="relative p-8 md:p-10 overflow-hidden">
                {/* Accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />

                <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
                  {/* Trophy visual */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-amber-50 flex items-center justify-center">
                      <TrophyIcon className="w-10 h-10 md:w-12 md:h-12 text-amber-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <MedalBadge type={award.medal} />
                      <span className="text-xs font-medium text-navy-500 uppercase tracking-wider">
                        {award.edition} &middot; {award.year}
                      </span>
                    </div>

                    <h3 className="font-display text-xl md:text-2xl text-ink mb-2">
                      {award.title}
                    </h3>

                    <p className="text-navy-600 text-base md:text-lg mb-3">
                      <span className="font-medium text-ink">Category:</span>{" "}
                      {award.category}
                    </p>

                    <p className="text-sm text-navy-500">
                      Presented by <span className="font-medium text-navy-600">{award.organizer}</span>
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Future awards note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-navy-600 mt-10"
        >
          Committed to setting new benchmarks in corporate learning &amp; development.
        </motion.p>
      </div>
    </section>
  );
}
