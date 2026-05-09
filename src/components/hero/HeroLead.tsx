import { motion } from "framer-motion";

export default function HeroLead() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.18 }}
      className="text-base sm:text-lg md:text-xl text-slate-400 max-w-xl mb-10 leading-relaxed"
    >
      Empowering organizations across India, Middle East, and Southeast Asia
      with next-generation leadership development, upskilling, and reskilling
      solutions driven by artificial intelligence.
    </motion.p>
  );
}
