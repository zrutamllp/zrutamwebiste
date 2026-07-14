"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import NetworkMotif from "@/components/graphics/NetworkMotif";

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative bg-paper grain overflow-hidden">
      {/* Faint dot grid behind the motif, fading toward the center */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-grid-dots opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] hidden lg:block"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
          {/* Copy column */}
          <div>
            <motion.p
              variants={rise}
              initial="hidden"
              animate="visible"
              className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600 mb-6"
            >
              AI-Powered Corporate L&amp;D
            </motion.p>

            <motion.h1
              variants={rise}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="font-display text-5xl md:text-7xl leading-[1.05] tracking-tight text-ink text-balance mb-6"
            >
              Transform your workforce with{" "}
              <em className="italic text-teal-600">intelligent</em> learning
            </motion.h1>

            <motion.p
              variants={rise}
              initial="hidden"
              animate="visible"
              custom={0.25}
              className="text-lg md:text-xl text-navy-600 leading-relaxed max-w-xl mb-10"
            >
              Empowering organizations across India, Middle East, and Southeast
              Asia with next-generation leadership development, upskilling, and
              reskilling solutions driven by artificial intelligence.
            </motion.p>

            <motion.div
              variants={rise}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button href="/contact/">Book a Demo</Button>
              <Button href="/solutions/" variant="outline">
                Explore Solutions
              </Button>
            </motion.div>
          </div>

          {/* Motif column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <NetworkMotif className="w-full max-w-md lg:max-w-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
