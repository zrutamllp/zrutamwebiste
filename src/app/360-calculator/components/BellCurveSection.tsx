import { motion } from "framer-motion";

export function BellCurveSection() {
  return (
    <motion.section
      className="mt-8 bg-white/85 backdrop-blur-xl border border-slate-200 shadow-sm p-5 sm:p-8 rounded-2xl relative z-10 mb-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
        <div>
          <div className="inline-block bg-slate-100 text-slate-600 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 border border-slate-200">
            The Scalability Problem
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 tracking-tight">
            The &ldquo;Selected Few&rdquo; Fallacy
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mb-4 leading-relaxed">
            The traditional L&amp;D budget is dangerously top-heavy. Resources are stretched thin: the{" "}
            <strong className="text-green-600">Top 20%</strong> get generic vendor training, while HR exhausts time
            managing the <strong className="text-red-500">Bottom 10%</strong> on PIPs.
          </p>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-3 sm:p-4 mb-4 rounded-r-xl shadow-inner">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
              <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              The 70% Blind Spot
            </h4>
            <p className="text-[10px] sm:text-xs text-slate-700 mt-1 leading-relaxed">
              This leaves the massive <strong className="text-orange-600">70% core</strong> completely untouched.
              They don&apos;t qualify for limited training programs, yet they manage the vast majority of your
              workforce.
            </p>
          </div>

          <div className="text-xs text-slate-600 flex items-start gap-2.5 bg-green-50/50 p-3 rounded-lg border border-green-100">
            <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="leading-relaxed">
              <strong>The 360&deg; ROI:</strong> A scalable multi-rater survey covers this{" "}
              <em>entire untouched middle</em> for a fraction of the cost of your Annual Value at Risk.
            </span>
          </div>
        </div>

        <div className="relative w-full h-48 sm:h-64 rounded-xl border border-slate-200 bg-white overflow-hidden flex items-end shadow-inner mt-4 lg:mt-0">
          <div className="absolute inset-0 flex opacity-20">
            <div className="w-[15%] bg-red-500 border-r-2 border-white" />
            <div className="w-[65%] bg-orange-500 border-r-2 border-white" />
            <div className="w-[20%] bg-green-500" />
          </div>

          <svg viewBox="0 0 1000 300" className="absolute inset-0 w-full h-full z-10" preserveAspectRatio="none">
            <path
              d="M 0 0 L 1000 0 L 1000 300 L 0 300 Z M -50 300 C 200 300, 350 20, 500 20 C 650 20, 800 300, 1050 300 Z"
              fill="#ffffff"
              fillRule="evenodd"
            />
            <path
              d="M -50 300 C 200 300, 350 20, 500 20 C 650 20, 800 300, 1050 300"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="3"
              strokeDasharray="6,3"
            />
          </svg>

          <div className="absolute bottom-0 w-full flex text-center pb-3 z-20 items-end h-full">
            <div className="w-[15%] flex flex-col items-center justify-end h-full pb-2">
              <div className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded shadow-sm text-[8px] sm:text-[9px] font-bold mb-1.5 uppercase leading-tight border border-red-100">
                PIPs &amp;
                <br />
                Fired
              </div>
              <div className="font-black text-lg sm:text-xl text-red-600 drop-shadow-sm">10%</div>
            </div>

            <div className="w-[65%] flex flex-col items-center justify-end h-full pb-2 relative">
              <div className="absolute top-[30%] flex flex-col items-center">
                <div className="bg-slate-800 text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-full shadow-lg mb-1.5 border border-slate-700">
                  The Unseen Majority
                </div>
              </div>
              <div className="font-black text-3xl sm:text-4xl text-orange-500 drop-shadow-sm mb-0.5">70%</div>
              <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-slate-500 bg-white/90 px-2 py-0.5 rounded-full shadow-sm border border-slate-100">
                Untouched Middle
              </div>
            </div>

            <div className="w-[20%] flex flex-col items-center justify-end h-full pb-2">
              <div className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded shadow-sm text-[8px] sm:text-[9px] font-bold mb-1.5 uppercase leading-tight border border-green-100">
                Generic
                <br />
                Training
              </div>
              <div className="font-black text-lg sm:text-xl text-green-600 drop-shadow-sm">20%</div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
