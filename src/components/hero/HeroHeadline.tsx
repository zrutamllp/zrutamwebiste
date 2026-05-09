import { motion } from "framer-motion";

export default function HeroHeadline() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.08 }}
      className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-7xl font-bold text-white leading-[1.12] mb-6 text-balance"
    >
      Transform Your Workforce with{" "}
      <span className="text-teal-200 italic font-semibold">AI-Powered</span>{" "}
      Learning
    </motion.h1>
  );
}
