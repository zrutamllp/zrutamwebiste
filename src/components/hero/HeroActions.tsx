import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.28 }}
      className="flex flex-col sm:flex-row flex-wrap gap-4"
    >
      <Link
        href="/contact"
        className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-navy-50 text-white font-semibold text-base shadow-lg shadow-black/20 transition-all duration-200 hover:bg-navy-50/90 hover:shadow-teal/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
      >
        Book a Demo
        <svg
          className="ml-2 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
      <Link
        href="/solutions"
        className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/25 text-white font-semibold text-base bg-white/[0.03] backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-white/35"
      >
        Explore Solutions
      </Link>
    </motion.div>
  );
}
