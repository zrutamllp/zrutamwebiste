import { motion } from "framer-motion";

export function BottomCtaSection() {
  return (
    <motion.section
      className="text-center py-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 tracking-tight">
        Stop the Guesswork &mdash; Book a Demo
      </h2>
      <p className="text-slate-600 text-sm mb-6 max-w-xl mx-auto">
        See how Zrutam&apos;s 360-degree feedback platform can turn your Annual Value at Risk into measurable
        leadership growth.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="mailto:ceo@zrutam.com"
          className="inline-block bg-gradient-to-r from-amber to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-sm"
        >
          Book a Demo
        </a>
        <a
          href="/tools/360"
          className="text-sm font-semibold text-teal hover:text-teal-500 underline underline-offset-4 transition-colors"
        >
          Explore the 360 Tool
        </a>
      </div>
    </motion.section>
  );
}
