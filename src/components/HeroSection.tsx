"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const HEADLINE_WORDS = ["Transform", "Your", "Workforce", "with"];

const wordContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.25 },
  },
};

const wordItem = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
};

const STAT_CHIPS = [
  { value: "10,000+", label: "Leaders Trained", top: "22%", right: "4%", delay: 0.9 },
  { value: "97%", label: "Completion Rate", top: "48%", right: "14%", delay: 1.1 },
  { value: "8+", label: "Countries Served", top: "70%", right: "2%", delay: 1.3 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-surface overflow-hidden">
      {/* Background: dot grid + aurora blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-dots opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="aurora-blob animate-aurora-1 -top-40 -right-20 w-[600px] h-[600px] bg-teal/15" />
        <div className="aurora-blob animate-aurora-2 top-1/3 -left-40 w-[500px] h-[500px] bg-sky-600/10" />
        <div
          className="aurora-blob animate-aurora-1 -bottom-60 right-1/4 w-[550px] h-[550px] bg-amber/[0.07]"
          style={{ animationDelay: "-9s" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent" />
      </div>

      {/* Floating stat chips (desktop only) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none" aria-hidden="true">
        {STAT_CHIPS.map((chip) => (
          <motion.div
            key={chip.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: chip.delay, ease: "easeOut" }}
            className="absolute"
            style={{ top: chip.top, right: chip.right }}
          >
            <div
              className="glass-card px-5 py-3.5 animate-float-slow shadow-glow-teal"
              style={{ animationDelay: `${chip.delay * -2}s` }}
            >
              <div className="text-xl font-extrabold text-gradient">{chip.value}</div>
              <div className="text-xs text-gray-400 font-medium">{chip.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/5 border border-white/10 backdrop-blur rounded-full text-teal-300 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
              </span>
              AI-Powered Corporate L&D
            </span>
          </motion.div>

          <motion.h1
            variants={wordContainer}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
          >
            {HEADLINE_WORDS.map((word) => (
              <motion.span key={word} variants={wordItem} className="inline-block mr-[0.25em]">
                {word}
              </motion.span>
            ))}
            <motion.span
              variants={wordItem}
              className="inline-block text-transparent bg-clip-text bg-[linear-gradient(110deg,#5EEAD4,45%,#0EA5E9,55%,#5EEAD4)] bg-[length:200%_100%] animate-shimmer"
            >
              AI-Powered Learning
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
          >
            Empowering organizations across India, Middle East, and Southeast
            Asia with next-generation leadership development, upskilling, and
            reskilling solutions driven by artificial intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber hover:bg-amber-400 text-navy font-semibold rounded-lg transition-all duration-300 shadow-glow-amber hover:-translate-y-1 text-base"
            >
              Book a Demo
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
              className="inline-flex items-center justify-center px-8 py-4 glass-card !rounded-lg text-white font-semibold hover:border-teal/40 hover:bg-white/[0.08] transition-all duration-300 text-base"
            >
              Explore Solutions
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-teal"
          />
        </div>
      </motion.div>
    </section>
  );
}
