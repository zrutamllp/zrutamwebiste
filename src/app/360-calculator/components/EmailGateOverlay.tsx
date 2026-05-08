import { AnimatePresence, motion } from "framer-motion";

type EmailGateOverlayProps = {
  gateUnlocked: boolean;
  gateEmail: string;
  gateError: string;
  gateSubmitting: boolean;
  setGateEmail: (value: string) => void;
  setGateError: (value: string) => void;
  handleGateSubmit: () => void;
};

export function EmailGateOverlay({
  gateUnlocked,
  gateEmail,
  gateError,
  gateSubmitting,
  setGateEmail,
  setGateError,
  handleGateSubmit,
}: EmailGateOverlayProps) {
  return (
    <AnimatePresence>
      {!gateUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
          >
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Unlock the Risk Calculator</h2>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Enter your official work email to access the full interactive Organizational Risk Calculator.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                value={gateEmail}
                onChange={(e) => {
                  setGateEmail(e.target.value);
                  setGateError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleGateSubmit();
                }}
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-orange-500 focus:ring-[3px] focus:ring-orange-500/20 transition-all"
              />
              {gateError && <p className="text-red-500 text-xs font-medium text-left">{gateError}</p>}
              <button
                onClick={handleGateSubmit}
                disabled={gateSubmitting}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm"
              >
                {gateSubmitting ? "Please wait..." : "Access Calculator"}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-4">We respect your privacy. No spam, ever.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
