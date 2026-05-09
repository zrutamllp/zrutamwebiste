import { motion } from "framer-motion";
import { heroDashboardStats, heroProgressMetrics } from "./dashboardMetrics";

function TargetIcon() {
  return (
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
      <circle cx="12" cy="12" r="5" strokeWidth={1.5} />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function HeroProgressCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 36, y: 12 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto rounded-2xl border border-white/10 bg-white/[0.07] p-6 sm:p-8 shadow-2xl shadow-black/30 backdrop-blur-xl"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400/5 via-transparent to-amber/5 pointer-events-none" />

      <div className="relative flex items-start gap-4 mb-8">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-900/40">
          <TargetIcon />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Learning Progress
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">Real-time AI tracking</p>
        </div>
      </div>

      <ul className="relative space-y-5 mb-8">
        {heroProgressMetrics.map((row) => (
          <li key={row.label}>
            <div className="flex items-center justify-between gap-3 text-sm mb-2">
              <span className="text-slate-200 font-medium">{row.label}</span>
              <span className="text-teal-200 font-semibold tabular-nums">
                {row.value}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${row.barClass}`}
                initial={{ width: 0 }}
                animate={{ width: `${row.value}%` }}
                transition={{
                  duration: 1,
                  delay: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="relative grid grid-cols-2 gap-3">
        {heroDashboardStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl bg-black/25 border border-white/5 px-4 py-4 text-center"
          >
            <p className="text-2xl sm:text-3xl font-bold text-teal-300 tabular-nums">
              {stat.value}
            </p>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-500 mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
