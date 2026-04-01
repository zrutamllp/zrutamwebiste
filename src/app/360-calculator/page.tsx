"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */
const EXCHANGE_RATE = 83;

/* Formspree endpoint — create a free form at https://formspree.io and paste your form ID below */
const FORMSPREE_URL = "https://formspree.io/f/mbdpkgdz";

/* ------------------------------------------------------------------ */
/*  Currency formatter                                                 */
/* ------------------------------------------------------------------ */
function formatCurrency(value: number, currency: string): string {
  if (currency === "USD") {
    if (value >= 1_000_000) return "$" + (value / 1_000_000).toFixed(2) + "M";
    return "$" + value.toLocaleString("en-US");
  }
  // INR
  if (value >= 10_000_000) return "\u20B9" + (value / 10_000_000).toFixed(2) + " Cr";
  if (value >= 100_000) return "\u20B9" + (value / 100_000).toFixed(2) + " L";
  return "\u20B9" + value.toLocaleString("en-IN");
}

/* ------------------------------------------------------------------ */
/*  Animated number hook                                               */
/* ------------------------------------------------------------------ */
function useAnimatedValue() {
  const rafRef = useRef<number | null>(null);
  const [display, setDisplay] = useState("$0");

  const animate = useCallback(
    (end: number, isCurrency: boolean, currency: string, duration = 1500) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      let start: number | null = null;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const current = Math.floor(easeOutQuad * end);
        setDisplay(isCurrency ? formatCurrency(current, currency) : current.toLocaleString());
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          setDisplay(isCurrency ? formatCurrency(end, currency) : end.toLocaleString());
        }
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [],
  );

  const setInstant = useCallback((value: number, isCurrency: boolean, currency: string) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setDisplay(isCurrency ? formatCurrency(value, currency) : value.toLocaleString());
  }, []);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { display, animate, setInstant };
}

/* ------------------------------------------------------------------ */
/*  Range slider label component                                       */
/* ------------------------------------------------------------------ */
function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs font-bold mb-1.5">
        <span className="text-slate-700">{label}</span>
        <span className="text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded text-[10px]">
          {value}%
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-orange-500 custom-range"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */
export default function CalculatorPage() {
  /* --- email gate --- */
  const [gateEmail, setGateEmail] = useState("");
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const [gateError, setGateError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("zrutam_calc_email")) {
      setGateUnlocked(true);
    }
  }, []);

  const handleGateSubmit = async () => {
    const email = gateEmail.trim();
    if (!email) {
      setGateError("Please enter your email.");
      return;
    }
    // basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setGateError("Please enter a valid email address.");
      return;
    }
    // block personal emails
    const personal = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com", "mail.com", "protonmail.com"];
    const domain = email.split("@")[1]?.toLowerCase();
    if (personal.includes(domain)) {
      setGateError("Please use your official work email.");
      return;
    }
    setGateError("");
    setGateSubmitting(true);
    try {
      await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, _subject: "New 360 Calculator Lead", source: "360-calculator" }),
      });
    } catch {
      // silently continue — don't block user if webhook fails
    }
    localStorage.setItem("zrutam_calc_email", email);
    setGateUnlocked(true);
    setGateSubmitting(false);
  };

  /* --- inputs --- */
  const [total, setTotal] = useState<number | "">("");
  const [salary, setSalary] = useState<number | "">("");
  const [senior, setSenior] = useState<number | "">("");
  const [middle, setMiddle] = useState<number | "">("");
  const [flm, setFlm] = useState<number | "">("");

  const [pctIneffective, setPctIneffective] = useState(30);
  const [pctFlight, setPctFlight] = useState(33);
  const [pctTurnover, setPctTurnover] = useState(50);
  const [pctProd, setPctProd] = useState(20);

  const [currency, setCurrencyState] = useState<"USD" | "INR">("USD");

  /* --- output state --- */
  const [revealed, setRevealed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /* --- calculated display values (non-animated) --- */
  const [staffTotal, setStaffTotal] = useState(0);
  const [spanValue, setSpanValue] = useState(0);


  /* --- animated values --- */
  const totalRiskAnim = useAnimatedValue();
  const prodRiskAnim = useAnimatedValue();
  const turnoverRiskAnim = useAnimatedValue();
  const flightNumAnim = useAnimatedValue();
  const affectedStaffAnim = useAnimatedValue();

  /* ---- core calculation ---- */
  const numTotal = typeof total === "number" ? total : 0;
  const numSalary = typeof salary === "number" ? salary : 0;
  const numSenior = typeof senior === "number" ? senior : 0;
  const numMiddle = typeof middle === "number" ? middle : 0;
  const numFlm = typeof flm === "number" ? flm : 0;

  const runCalculations = useCallback(
    (animate: boolean, currencyOverride?: string) => {
      const cur = currencyOverride ?? currency;
      const staff = numTotal - (numSenior + numMiddle + numFlm);

      if (staff < 0 || numFlm <= 0) {
        setErrorMsg(
          numFlm <= 0
            ? "Error: Must have at least 1 Frontline Manager."
            : "Error: Managers exceed total headcount.",
        );
        return;
      }
      setErrorMsg("");

      const span = staff / numFlm;
      const ineffectiveFLMs = Math.ceil(numFlm * (pctIneffective / 100));
      const affectedStaff = Math.round(ineffectiveFLMs * span);
      const totalFlightRisk = Math.round(affectedStaff * (pctFlight / 100));
      const turnoverCost = totalFlightRisk * (numSalary * (pctTurnover / 100));
      const prodLoss = affectedStaff * (numSalary * (pctProd / 100));
      const totalRisk = turnoverCost + prodLoss;

      setStaffTotal(staff);
      setSpanValue(span);


      if (animate) {
        totalRiskAnim.animate(totalRisk, true, cur);
        prodRiskAnim.animate(prodLoss, true, cur);
        turnoverRiskAnim.animate(turnoverCost, true, cur);
        flightNumAnim.animate(totalFlightRisk, false, cur);
        affectedStaffAnim.animate(affectedStaff, false, cur);
      } else {
        totalRiskAnim.setInstant(totalRisk, true, cur);
        prodRiskAnim.setInstant(prodLoss, true, cur);
        turnoverRiskAnim.setInstant(turnoverCost, true, cur);
        flightNumAnim.setInstant(totalFlightRisk, false, cur);
        affectedStaffAnim.setInstant(affectedStaff, false, cur);
      }

      if (!revealed) setRevealed(true);
    },
    [
      numTotal, numSenior, numMiddle, numFlm, numSalary, currency,
      pctIneffective, pctFlight, pctTurnover, pctProd,
      revealed,
      totalRiskAnim, prodRiskAnim, turnoverRiskAnim, flightNumAnim, affectedStaffAnim,
    ],
  );

  /* live recalc after reveal */
  const firstReveal = useRef(false);
  useEffect(() => {
    if (firstReveal.current) {
      runCalculations(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numTotal, numSenior, numMiddle, numFlm, numSalary, pctIneffective, pctFlight, pctTurnover, pctProd]);

  /* --- currency toggle --- */
  const toggleCurrency = (target: "USD" | "INR") => {
    if (target === currency) return;
    let newSalary = numSalary;
    if (target === "INR") {
      newSalary = Math.round(numSalary * EXCHANGE_RATE);
    } else {
      newSalary = Math.round(numSalary / EXCHANGE_RATE);
    }
    setSalary(newSalary);
    setCurrencyState(target);
    if (firstReveal.current) {
      // recalc with new currency+salary immediately
      const staff = numTotal - (numSenior + numMiddle + numFlm);
      if (staff >= 0 && numFlm > 0) {
        const span = staff / numFlm;
        const ineffectiveFLMs = Math.ceil(numFlm * (pctIneffective / 100));
        const affectedStaff = Math.round(ineffectiveFLMs * span);
        const totalFlightRisk = Math.round(affectedStaff * (pctFlight / 100));
        const turnoverCost = totalFlightRisk * (newSalary * (pctTurnover / 100));
        const prodLoss = affectedStaff * (newSalary * (pctProd / 100));
        const totalRisk = turnoverCost + prodLoss;

        setStaffTotal(staff);
        setSpanValue(span);
  

        totalRiskAnim.setInstant(totalRisk, true, target);
        prodRiskAnim.setInstant(prodLoss, true, target);
        turnoverRiskAnim.setInstant(turnoverCost, true, target);
        flightNumAnim.setInstant(totalFlightRisk, false, target);
        affectedStaffAnim.setInstant(affectedStaff, false, target);
      }
    }
  };

  /* --- span meter helpers --- */
  const meterWidth = Math.min((spanValue / 25) * 100, 100);
  const meterColor =
    spanValue <= 7 ? "#22c55e" : spanValue <= 12 ? "#eab308" : "#ef4444";
  const spanMsg =
    spanValue <= 7
      ? "Healthy span of control. Active coaching possible."
      : spanValue <= 12
        ? "Moderate risk. Managers stretched; coaching drops."
        : "CRITICAL RISK. Purely administrative; unguided teams.";
  const isDanger = spanValue > 12;

  /* ---- handle first reveal ---- */
  const handleReveal = () => {
    firstReveal.current = true;
    runCalculations(true);
  };

  /* ================================================================ */
  /*  JSX                                                              */
  /* ================================================================ */
  return (
    <>
      {/* Custom range slider styles */}
      <style jsx global>{`
        .custom-range {
          -webkit-appearance: none;
          width: 100%;
          background: transparent;
        }
        .custom-range:focus {
          outline: none;
        }
        .custom-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
          margin-top: -7px;
          box-shadow: 0 2px 5px rgba(249, 115, 22, 0.4);
          border: 2px solid white;
          transition: transform 0.1s;
        }
        .custom-range::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        .custom-range::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: #cbd5e1;
          border-radius: 2px;
        }
        .custom-range::-moz-range-thumb {
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(249, 115, 22, 0.4);
        }
        .custom-range::-moz-range-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: #cbd5e1;
          border-radius: 2px;
        }

        @keyframes pulse-danger {
          0% {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.1),
              inset 0 0 10px rgba(239, 68, 68, 0.05);
          }
          100% {
            box-shadow: 0 0 40px rgba(239, 68, 68, 0.2),
              inset 0 0 20px rgba(239, 68, 68, 0.1);
          }
        }
        .danger-glow {
          box-shadow: 0 0 40px rgba(239, 68, 68, 0.15),
            inset 0 0 20px rgba(239, 68, 68, 0.05);
          border-color: rgba(239, 68, 68, 0.3) !important;
          animation: pulse-danger 3s infinite alternate;
        }
      `}</style>

      {/* ========== EMAIL GATE OVERLAY ========== */}
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
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Unlock the Risk Calculator
              </h2>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Enter your official work email to access the full interactive
                Organizational Risk Calculator.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  value={gateEmail}
                  onChange={(e) => { setGateEmail(e.target.value); setGateError(""); }}
                  onKeyDown={(e) => { if (e.key === "Enter") handleGateSubmit(); }}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-orange-500 focus:ring-[3px] focus:ring-orange-500/20 transition-all"
                />
                {gateError && (
                  <p className="text-red-500 text-xs font-medium text-left">{gateError}</p>
                )}
                <button
                  onClick={handleGateSubmit}
                  disabled={gateSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                >
                  {gateSubmitting ? "Please wait..." : "Access Calculator"}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-4">
                We respect your privacy. No spam, ever.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
        {/* Ambient background blobs */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-300/40 rounded-full mix-blend-multiply blur-[100px]" />
          <div
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full mix-blend-multiply blur-[120px] transition-all duration-1000"
            style={{
              backgroundColor:
                revealed && isDanger ? "rgba(239,68,68,0.15)" : "rgba(239,68,68,0)",
            }}
          />
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28 pb-8 lg:pb-12">
          {/* ---------- Header ---------- */}
          <motion.header
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">
              Organizational Risk Calculator
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm lg:text-base max-w-2xl mx-auto">
              Enter your workforce demographics and adjust the behavioral assumptions below. This
              tool algorithmically exposes the hidden financial risks carried by your frontline
              leadership layer.
            </p>
          </motion.header>

          {/* ---------- Main grid ---------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ====== LEFT: INPUT PANEL ====== */}
            <motion.div
              className="lg:col-span-5 flex flex-col gap-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Company Demographics */}
              <div className="bg-white/85 backdrop-blur-xl border border-black/[0.08] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.01)] p-5 sm:p-6 rounded-2xl relative z-10">
                <div className="flex items-center gap-3 mb-4 border-b border-slate-200 pb-3">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">
                    Company Demographics
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Headcount & Salary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-semibold text-slate-500 mb-1.5">
                        Total Headcount
                      </label>
                      <input
                        type="number"
                        value={total}
                        placeholder="Enter your headcount"
                        onChange={(e) => setTotal(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-lg text-sm font-bold bg-white border border-slate-300 text-slate-900 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.02)] focus:outline-none focus:border-orange-500 focus:bg-orange-50/30 focus:ring-[3px] focus:ring-orange-500/20 transition-all placeholder:font-normal placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-end mb-1.5">
                        <label className="block text-[10px] uppercase tracking-widest font-semibold text-slate-500">
                          Avg. Base Salary
                        </label>
                        <div className="flex bg-slate-200 rounded p-0.5 border border-slate-300 items-center">
                          <button
                            onClick={() => toggleCurrency("USD")}
                            className={`text-[9px] px-2 py-0.5 rounded-sm transition-all ${
                              currency === "USD"
                                ? "bg-white text-slate-800 font-bold shadow-sm"
                                : "text-slate-500 bg-transparent hover:text-slate-800"
                            }`}
                          >
                            USD
                          </button>
                          <button
                            onClick={() => toggleCurrency("INR")}
                            className={`text-[9px] px-2 py-0.5 rounded-sm transition-all ${
                              currency === "INR"
                                ? "bg-white text-slate-800 font-bold shadow-sm"
                                : "text-slate-500 bg-transparent hover:text-slate-800"
                            }`}
                          >
                            INR
                          </button>
                        </div>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                          {currency === "USD" ? "$" : "\u20B9"}
                        </span>
                        <input
                          type="number"
                          value={salary}
                          placeholder="Avg. frontline salary"
                          onChange={(e) => setSalary(e.target.value === "" ? "" : Number(e.target.value))}
                          className="w-full pl-7 pr-3 py-2.5 rounded-lg text-sm font-bold bg-white border border-slate-300 text-slate-900 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.02)] focus:outline-none focus:border-orange-500 focus:bg-orange-50/30 focus:ring-[3px] focus:ring-orange-500/20 transition-all placeholder:font-normal placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* The Pyramid */}
                  <div className="grid grid-cols-3 gap-3 pt-1">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-semibold text-slate-500 mb-1.5">
                        Top <span className="hidden sm:inline">(VP+)</span>
                      </label>
                      <input
                        type="number"
                        value={senior}
                        placeholder="e.g. 50"
                        onChange={(e) => setSenior(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg text-sm font-bold bg-white border border-slate-300 text-slate-900 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.02)] focus:outline-none focus:border-orange-500 focus:bg-orange-50/30 focus:ring-[3px] focus:ring-orange-500/20 transition-all placeholder:font-normal placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-semibold text-slate-500 mb-1.5">
                        Middle <span className="hidden sm:inline">(Dir)</span>
                      </label>
                      <input
                        type="number"
                        value={middle}
                        placeholder="e.g. 200"
                        onChange={(e) => setMiddle(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg text-sm font-bold bg-white border border-slate-300 text-slate-900 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.02)] focus:outline-none focus:border-orange-500 focus:bg-orange-50/30 focus:ring-[3px] focus:ring-orange-500/20 transition-all placeholder:font-normal placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-semibold text-orange-600 mb-1.5 drop-shadow-sm">
                        Frontline <span className="hidden sm:inline">(Mgrs)</span>
                      </label>
                      <input
                        type="number"
                        value={flm}
                        placeholder="e.g. 350"
                        onChange={(e) => setFlm(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg text-sm font-bold text-orange-600 border-orange-300 bg-orange-50 shadow-[inset_0_1px_3px_rgba(249,115,22,0.1)] focus:outline-none focus:border-orange-500 focus:ring-[3px] focus:ring-orange-500/20 transition-all placeholder:font-normal placeholder:text-slate-400 placeholder:text-orange-300"
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {errorMsg && (
                    <p className="text-red-500 text-[11px] font-semibold mt-1">{errorMsg}</p>
                  )}
                </div>
              </div>

              {/* Adjustable Assumptions */}
              <div className="bg-slate-50/80 backdrop-blur-xl border border-black/[0.08] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.01)] p-5 sm:p-6 rounded-2xl relative z-10">
                <div className="flex items-center gap-3 mb-4 border-b border-slate-200 pb-3">
                  <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 leading-tight">
                      Adjust Assumptions
                    </h2>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Anchored to industry benchmarks.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <SliderRow
                    label="Ineffective Managers"
                    value={pctIneffective}
                    min={5}
                    max={60}
                    onChange={setPctIneffective}
                  />
                  <SliderRow
                    label="Flight Risk (Attrition)"
                    value={pctFlight}
                    min={10}
                    max={60}
                    onChange={setPctFlight}
                  />
                  <SliderRow
                    label="Cost to Replace (Turnover)"
                    value={pctTurnover}
                    min={20}
                    max={150}
                    step={5}
                    onChange={setPctTurnover}
                  />
                  <SliderRow
                    label="Productivity Leakage"
                    value={pctProd}
                    min={5}
                    max={40}
                    onChange={setPctProd}
                  />
                </div>
              </div>

              {/* Reveal button */}
              {!revealed && (
                <button
                  onClick={handleReveal}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black text-base py-3.5 rounded-xl shadow-[0_4px_15px_rgba(239,68,68,0.3)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.4)] transition-all transform hover:-translate-y-1"
                >
                  REVEAL RISK EXPOSURE
                </button>
              )}
            </motion.div>

            {/* ====== RIGHT: OUTPUT PANEL ====== */}
            <div
              className={`lg:col-span-7 bg-white/85 backdrop-blur-xl border border-slate-200 shadow-lg p-5 sm:p-6 rounded-2xl relative z-20 flex flex-col lg:sticky lg:top-6 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                revealed
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-5 pointer-events-none"
              }`}
            >
              {/* Header row */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-red-500">&#9888;&#65039;</span> The Executive Blind Spot
                </h2>
                <div className="text-[10px] sm:text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 shadow-sm shrink-0">
                  Staff: <span className="text-slate-900">{staffTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Span of Control */}
              <div className="mb-5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-slate-500">
                    Span of Control Risk
                  </h3>
                  <div className="text-lg sm:text-xl font-black text-slate-900 leading-none">
                    1 : {spanValue.toFixed(1)}
                  </div>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded shadow-inner overflow-hidden">
                  <div
                    className="h-full transition-all duration-1000"
                    style={{
                      width: `${meterWidth}%`,
                      backgroundColor: meterColor,
                    }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1.5 italic">{spanMsg}</p>
              </div>

              {/* THE BIG SCARY NUMBER */}
              <div
                className={`bg-red-50/80 rounded-xl p-5 border border-red-100 text-center mb-4 relative overflow-hidden shadow-sm ${
                  isDanger && revealed ? "danger-glow" : ""
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500" />
                <h3 className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-slate-600 mb-1.5">
                  Annual Value at Risk (TVR)
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-600 mb-2 max-w-sm mx-auto leading-relaxed">
                  If{" "}
                  <strong className="text-slate-900 bg-red-100 px-1 rounded">
                    {pctIneffective}%
                  </strong>{" "}
                  of your Frontline Managers are unskilled, this is your estimated annual financial
                  exposure:
                </p>
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-red-600 drop-shadow-sm tracking-tight">
                  {totalRiskAnim.display}
                </div>
              </div>

              {/* Breakdown cards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Productivity Leakage */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute right-0 top-0 w-12 h-12 bg-orange-100 rounded-full blur-xl -mr-4 -mt-4" />
                  <h4 className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-0.5">
                    Productivity Leakage <span className="text-orange-500">*</span>
                  </h4>
                  <div className="text-lg sm:text-xl font-bold text-orange-500 leading-tight mb-0.5">
                    {prodRiskAnim.display}
                  </div>
                  <p className="text-[8px] sm:text-[9px] text-slate-500 leading-tight">
                    <strong>{pctProd}%</strong> salary waste across the{" "}
                    <strong className="text-slate-900 bg-orange-50 px-1 rounded">
                      {affectedStaffAnim.display}
                    </strong>{" "}
                    staff reporting to ineffective managers.
                  </p>
                </div>

                {/* Turnover Cost */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute right-0 top-0 w-12 h-12 bg-red-100 rounded-full blur-xl -mr-4 -mt-4" />
                  <h4 className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-0.5">
                    Turnover Cost <span className="text-red-500">**</span>
                  </h4>
                  <div className="text-lg sm:text-xl font-bold text-red-500 leading-tight mb-0.5">
                    {turnoverRiskAnim.display}
                  </div>
                  <p className="text-[8px] sm:text-[9px] text-slate-500 leading-tight">
                    Replacing{" "}
                    <strong className="text-slate-900 bg-red-50 px-1 rounded">
                      {flightNumAnim.display}
                    </strong>{" "}
                    frontline staff who quit due to their manager.
                  </p>
                </div>
              </div>

              {/* Methodology footnotes */}
              <div className="px-1 text-[9px] text-slate-500 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100 mt-auto">
                <span className="text-orange-500 font-bold">*</span>{" "}
                <strong>Gallup:</strong> Active disengagement costs ~20% of salary in lost
                productivity.
                <br />
                <span className="text-red-500 font-bold">**</span>{" "}
                <strong>SHRM &amp; DDI:</strong> Poor leadership drives ~33% flight risk. Replacement
                costs avg 50% of base salary.
              </div>
            </div>
          </div>

          {/* ====== BELL CURVE SECTION ====== */}
          <motion.section
            className="mt-8 bg-white/85 backdrop-blur-xl border border-slate-200 shadow-sm p-5 sm:p-8 rounded-2xl relative z-10 mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
              {/* Left: narrative */}
              <div>
                <div className="inline-block bg-slate-100 text-slate-600 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 border border-slate-200">
                  The Scalability Problem
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                  The &ldquo;Selected Few&rdquo; Fallacy
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mb-4 leading-relaxed">
                  The traditional L&amp;D budget is dangerously top-heavy. Resources are stretched
                  thin: the <strong className="text-green-600">Top 20%</strong> get generic vendor
                  training, while HR exhausts time managing the{" "}
                  <strong className="text-red-500">Bottom 10%</strong> on PIPs.
                </p>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-3 sm:p-4 mb-4 rounded-r-xl shadow-inner">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    The 70% Blind Spot
                  </h4>
                  <p className="text-[10px] sm:text-xs text-slate-700 mt-1 leading-relaxed">
                    This leaves the massive <strong className="text-orange-600">70% core</strong>{" "}
                    completely untouched. They don&apos;t qualify for limited training programs, yet
                    they manage the vast majority of your workforce.
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
                    <em>entire untouched middle</em> for a fraction of the cost of your Annual Value
                    at Risk.
                  </span>
                </div>
              </div>

              {/* Right: bell curve graphic */}
              <div className="relative w-full h-48 sm:h-64 rounded-xl border border-slate-200 bg-white overflow-hidden flex items-end shadow-inner mt-4 lg:mt-0">
                {/* Colored background segments */}
                <div className="absolute inset-0 flex opacity-20">
                  <div className="w-[15%] bg-red-500 border-r-2 border-white" />
                  <div className="w-[65%] bg-orange-500 border-r-2 border-white" />
                  <div className="w-[20%] bg-green-500" />
                </div>

                {/* SVG bell curve mask */}
                <svg
                  viewBox="0 0 1000 300"
                  className="absolute inset-0 w-full h-full z-10"
                  preserveAspectRatio="none"
                >
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

                {/* Labels */}
                <div className="absolute bottom-0 w-full flex text-center pb-3 z-20 items-end h-full">
                  <div className="w-[15%] flex flex-col items-center justify-end h-full pb-2">
                    <div className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded shadow-sm text-[8px] sm:text-[9px] font-bold mb-1.5 uppercase leading-tight border border-red-100">
                      PIPs &amp;
                      <br />
                      Fired
                    </div>
                    <div className="font-black text-lg sm:text-xl text-red-600 drop-shadow-sm">
                      10%
                    </div>
                  </div>

                  <div className="w-[65%] flex flex-col items-center justify-end h-full pb-2 relative">
                    <div className="absolute top-[30%] flex flex-col items-center">
                      <div className="bg-slate-800 text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-full shadow-lg mb-1.5 border border-slate-700">
                        The Unseen Majority
                      </div>
                    </div>
                    <div className="font-black text-3xl sm:text-4xl text-orange-500 drop-shadow-sm mb-0.5">
                      70%
                    </div>
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
                    <div className="font-black text-lg sm:text-xl text-green-600 drop-shadow-sm">
                      20%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ====== BOTTOM CTA ====== */}
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
              See how Zrutam&apos;s 360-degree feedback platform can turn your Annual Value at Risk
              into measurable leadership growth.
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
        </div>
      </div>
    </>
  );
}
