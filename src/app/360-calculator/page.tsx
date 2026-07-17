"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buttonClasses } from "@/components/ui/Button";
import { cardClasses } from "@/components/ui/Card";

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
        <span className="text-ink">{label}</span>
        <span className="text-teal-600 bg-teal-50 border border-teal-100 px-1.5 py-0.5 rounded text-[10px]">
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
        className="w-full accent-teal-500 custom-range"
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
          background: #0284c7;
          cursor: pointer;
          margin-top: -7px;
          box-shadow: 0 2px 5px rgba(2, 132, 199, 0.35);
          border: 2px solid white;
          transition: transform 0.1s;
        }
        .custom-range::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        .custom-range:focus-visible::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.35);
        }
        .custom-range::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: #e4ebf1;
          border-radius: 2px;
        }
        .custom-range::-moz-range-thumb {
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: #0284c7;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(2, 132, 199, 0.35);
        }
        .custom-range:focus-visible::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.35);
        }
        .custom-range::-moz-range-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: #e4ebf1;
          border-radius: 2px;
        }

        @keyframes pulse-danger {
          0% {
            box-shadow: 0 8px 24px -8px rgba(220, 38, 38, 0.15);
          }
          100% {
            box-shadow: 0 12px 36px -8px rgba(220, 38, 38, 0.3);
          }
        }
        .danger-glow {
          box-shadow: 0 8px 24px -8px rgba(220, 38, 38, 0.2);
          border-color: rgba(220, 38, 38, 0.35) !important;
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
            className="fixed inset-0 z-[100] bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-navy-100 rounded-2xl shadow-lift max-w-md w-full p-8 text-center"
            >
              <div className="w-14 h-14 bg-teal-50 border border-teal-100 rounded-xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="font-display text-2xl text-ink tracking-tight mb-2">
                Unlock the Risk Calculator
              </h2>
              <p className="text-navy-600 text-sm mb-6 leading-relaxed">
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
                  className="w-full px-4 py-3 rounded-xl border border-navy-200 bg-white text-ink placeholder:text-navy-400 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all"
                />
                {gateError && (
                  <p className="text-red-600 text-xs font-medium text-left">{gateError}</p>
                )}
                <button
                  onClick={handleGateSubmit}
                  disabled={gateSubmitting}
                  className={buttonClasses(
                    "primary",
                    "w-full text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0",
                  )}
                >
                  {gateSubmitting ? "Please wait..." : "Access Calculator"}
                </button>
              </div>
              <p className="text-[11px] text-navy-600 mt-4">
                We respect your privacy. No spam, ever.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-screen bg-paper grain text-ink overflow-x-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-8 lg:pb-12">
          {/* ---------- Header ---------- */}
          <motion.header
            className="text-center mb-10 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl leading-[1.05] tracking-tight text-ink text-balance mb-4">
              Organizational <em className="italic text-teal-600">Risk</em> Calculator
            </h1>
            <p className="text-navy-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
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
              <div className={cardClasses(false, "p-6 md:p-8 relative z-10")}>
                <div className="flex items-center gap-3 mb-4 border-b border-navy-100 pb-3">
                  <div className="w-7 h-7 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600 leading-tight">
                    Company Demographics
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Headcount & Salary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-semibold text-navy-600 mb-1.5">
                        Total Headcount
                      </label>
                      <input
                        type="number"
                        value={total}
                        placeholder="Enter your headcount"
                        onChange={(e) => setTotal(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-xl text-sm font-bold border border-navy-200 bg-white text-ink focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all placeholder:font-normal placeholder:text-navy-400"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-end mb-1.5">
                        <label className="block text-[10px] uppercase tracking-widest font-semibold text-navy-600">
                          Avg. Base Salary
                        </label>
                        <div className="flex bg-navy-50 rounded-full p-0.5 border border-navy-200 items-center">
                          <button
                            onClick={() => toggleCurrency("USD")}
                            className={`text-[9px] px-2 py-0.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-500 ${
                              currency === "USD"
                                ? "bg-ink text-paper font-bold shadow-card"
                                : "text-navy-600 bg-transparent hover:text-ink"
                            }`}
                          >
                            USD
                          </button>
                          <button
                            onClick={() => toggleCurrency("INR")}
                            className={`text-[9px] px-2 py-0.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-500 ${
                              currency === "INR"
                                ? "bg-ink text-paper font-bold shadow-card"
                                : "text-navy-600 bg-transparent hover:text-ink"
                            }`}
                          >
                            INR
                          </button>
                        </div>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-600 font-bold text-sm">
                          {currency === "USD" ? "$" : "\u20B9"}
                        </span>
                        <input
                          type="number"
                          value={salary}
                          placeholder="Avg. frontline salary"
                          onChange={(e) => setSalary(e.target.value === "" ? "" : Number(e.target.value))}
                          className="w-full pl-7 pr-3 py-2.5 rounded-xl text-sm font-bold border border-navy-200 bg-white text-ink focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all placeholder:font-normal placeholder:text-navy-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* The Pyramid */}
                  <div className="grid grid-cols-3 gap-3 pt-1">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-semibold text-navy-600 mb-1.5">
                        Top <span className="hidden sm:inline">(VP+)</span>
                      </label>
                      <input
                        type="number"
                        value={senior}
                        placeholder="e.g. 50"
                        onChange={(e) => setSenior(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl text-sm font-bold border border-navy-200 bg-white text-ink focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all placeholder:font-normal placeholder:text-navy-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-semibold text-navy-600 mb-1.5">
                        Middle <span className="hidden sm:inline">(Dir)</span>
                      </label>
                      <input
                        type="number"
                        value={middle}
                        placeholder="e.g. 200"
                        onChange={(e) => setMiddle(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl text-sm font-bold border border-navy-200 bg-white text-ink focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all placeholder:font-normal placeholder:text-navy-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-semibold text-amber-700 mb-1.5">
                        Frontline <span className="hidden sm:inline">(Mgrs)</span>
                      </label>
                      <input
                        type="number"
                        value={flm}
                        placeholder="e.g. 350"
                        onChange={(e) => setFlm(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl text-sm font-bold text-amber-700 border border-amber-300 bg-amber-50 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all placeholder:font-normal placeholder:text-amber-700/50"
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {errorMsg && (
                    <p className="text-red-600 text-[11px] font-semibold mt-1">{errorMsg}</p>
                  )}
                </div>
              </div>

              {/* Adjustable Assumptions */}
              <div className={cardClasses(false, "p-6 md:p-8 relative z-10")}>
                <div className="flex items-center gap-3 mb-4 border-b border-navy-100 pb-3">
                  <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
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
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600 leading-tight">
                      Adjust Assumptions
                    </h2>
                    <p className="text-[10px] text-navy-600 mt-0.5">
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
                  className={buttonClasses("primary", "w-full text-base font-bold tracking-wide")}
                >
                  Reveal Risk Exposure
                </button>
              )}
            </motion.div>

            {/* ====== RIGHT: OUTPUT PANEL ====== */}
            <div
              className={`lg:col-span-7 ${cardClasses(false, "p-5 sm:p-6")} relative z-20 flex flex-col lg:sticky lg:top-24 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                revealed
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-5 pointer-events-none"
              }`}
            >
              {/* Header row */}
              <div className="flex items-center justify-between border-b border-navy-100 pb-3 mb-4">
                <h2 className="font-display text-lg sm:text-xl text-ink flex items-center gap-2">
                  <span className="text-red-600">&#9888;&#65039;</span> The Executive Blind Spot
                </h2>
                <div className="text-[10px] sm:text-xs font-bold text-navy-600 bg-navy-50 px-2.5 py-1 rounded-full border border-navy-100 shrink-0">
                  Staff: <span className="text-ink">{staffTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Span of Control */}
              <div className="mb-5 bg-navy-50 p-3 rounded-xl border border-navy-100">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-navy-600">
                    Span of Control Risk
                  </h3>
                  <div className="text-lg sm:text-xl font-black text-ink leading-none">
                    1 : {spanValue.toFixed(1)}
                  </div>
                </div>
                <div className="w-full h-1.5 bg-navy-100 rounded overflow-hidden">
                  <div
                    className="h-full transition-all duration-1000"
                    style={{
                      width: `${meterWidth}%`,
                      backgroundColor: meterColor,
                    }}
                  />
                </div>
                <p className="text-[10px] text-navy-600 mt-1.5 italic">{spanMsg}</p>
              </div>

              {/* THE BIG SCARY NUMBER */}
              <div
                className={`bg-red-50 rounded-xl p-5 border border-red-200 text-center mb-4 relative overflow-hidden ${
                  isDanger && revealed ? "danger-glow" : ""
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-red-500" />
                <h3 className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-red-600 mb-1.5">
                  Annual Value at Risk (TVR)
                </h3>
                <p className="text-[10px] sm:text-xs text-navy-600 mb-2 max-w-sm mx-auto leading-relaxed">
                  If{" "}
                  <strong className="text-red-700 bg-red-100 px-1 rounded">
                    {pctIneffective}%
                  </strong>{" "}
                  of your Frontline Managers are unskilled, this is your estimated annual financial
                  exposure:
                </p>
                <div className="font-display text-4xl md:text-5xl text-amber-700 tracking-tight">
                  {totalRiskAnim.display}
                </div>
              </div>

              {/* Breakdown cards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Productivity Leakage */}
                <div className="bg-navy-50 p-3 rounded-xl border border-navy-100 relative overflow-hidden flex flex-col justify-center">
                  <h4 className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-navy-600 mb-0.5">
                    Productivity Leakage <span className="text-amber-600">*</span>
                  </h4>
                  <div className="text-lg sm:text-xl font-bold text-amber-700 leading-tight mb-0.5">
                    {prodRiskAnim.display}
                  </div>
                  <p className="text-[8px] sm:text-[9px] text-navy-600 leading-tight">
                    <strong>{pctProd}%</strong> salary waste across the{" "}
                    <strong className="text-amber-700 bg-amber-100 px-1 rounded">
                      {affectedStaffAnim.display}
                    </strong>{" "}
                    staff reporting to ineffective managers.
                  </p>
                </div>

                {/* Turnover Cost */}
                <div className="bg-navy-50 p-3 rounded-xl border border-navy-100 relative overflow-hidden flex flex-col justify-center">
                  <h4 className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-navy-600 mb-0.5">
                    Turnover Cost <span className="text-red-600">**</span>
                  </h4>
                  <div className="text-lg sm:text-xl font-bold text-red-600 leading-tight mb-0.5">
                    {turnoverRiskAnim.display}
                  </div>
                  <p className="text-[8px] sm:text-[9px] text-navy-600 leading-tight">
                    Replacing{" "}
                    <strong className="text-red-700 bg-red-100 px-1 rounded">
                      {flightNumAnim.display}
                    </strong>{" "}
                    frontline staff who quit due to their manager.
                  </p>
                </div>
              </div>

              {/* Methodology footnotes */}
              <div className="px-1 text-[9px] text-navy-600 leading-relaxed bg-navy-50 p-2 rounded-lg border border-navy-100 mt-auto">
                <span className="text-amber-600 font-bold">*</span>{" "}
                <strong>Gallup:</strong> Active disengagement costs ~20% of salary in lost
                productivity.
                <br />
                <span className="text-red-600 font-bold">**</span>{" "}
                <strong>SHRM &amp; DDI:</strong> Poor leadership drives ~33% flight risk. Replacement
                costs avg 50% of base salary.
              </div>
            </div>
          </div>

          {/* ====== BELL CURVE SECTION ====== */}
          <motion.section
            className={cardClasses(false, "mt-8 p-5 sm:p-8 relative z-10 mb-12")}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
              {/* Left: narrative */}
              <div>
                <div className="inline-block bg-navy-50 text-navy-600 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 border border-navy-100">
                  The Scalability Problem
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-ink mb-3 tracking-tight">
                  The &ldquo;Selected Few&rdquo; Fallacy
                </h3>
                <p className="text-navy-600 text-xs sm:text-sm mb-4 leading-relaxed">
                  The traditional L&amp;D budget is dangerously top-heavy. Resources are stretched
                  thin: the <strong className="text-green-600">Top 20%</strong> get generic vendor
                  training, while HR exhausts time managing the{" "}
                  <strong className="text-red-600">Bottom 10%</strong> on PIPs.
                </p>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-3 sm:p-4 mb-4 rounded-r-xl">
                  <h4 className="font-bold text-ink text-xs sm:text-sm flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-amber-600"
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
                  <p className="text-[10px] sm:text-xs text-navy-600 mt-1 leading-relaxed">
                    This leaves the massive <strong className="text-amber-700">70% core</strong>{" "}
                    completely untouched. They don&apos;t qualify for limited training programs, yet
                    they manage the vast majority of your workforce.
                  </p>
                </div>

                <div className="text-xs text-navy-700 flex items-start gap-2.5 bg-green-50 p-3 rounded-lg border border-green-200">
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
              <div className="relative w-full h-48 sm:h-64 rounded-xl border border-navy-100 bg-white overflow-hidden flex items-end mt-4 lg:mt-0">
                {/* Colored background segments */}
                <div className="absolute inset-0 flex opacity-20">
                  <div className="w-[15%] bg-red-500 border-r-2 border-white" />
                  <div className="w-[65%] bg-amber-500 border-r-2 border-white" />
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
                    fill="#FFFFFF"
                    fillRule="evenodd"
                  />
                  <path
                    d="M -50 300 C 200 300, 350 20, 500 20 C 650 20, 800 300, 1050 300"
                    fill="none"
                    stroke="#8AA0B5"
                    strokeWidth="3"
                    strokeDasharray="6,3"
                  />
                </svg>

                {/* Labels */}
                <div className="absolute bottom-0 w-full flex text-center pb-3 z-20 items-end h-full">
                  <div className="w-[15%] flex flex-col items-center justify-end h-full pb-2">
                    <div className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded shadow-sm text-[8px] sm:text-[9px] font-bold mb-1.5 uppercase leading-tight border border-red-200">
                      PIPs &amp;
                      <br />
                      Fired
                    </div>
                    <div className="font-black text-lg sm:text-xl text-red-600">
                      10%
                    </div>
                  </div>

                  <div className="w-[65%] flex flex-col items-center justify-end h-full pb-2 relative">
                    <div className="absolute top-[30%] flex flex-col items-center">
                      <div className="bg-ink text-paper text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-full shadow-card mb-1.5">
                        The Unseen Majority
                      </div>
                    </div>
                    <div className="font-black text-3xl sm:text-4xl text-amber-700 mb-0.5">
                      70%
                    </div>
                    <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-navy-600 bg-white/90 px-2 py-0.5 rounded-full shadow-sm border border-navy-100">
                      Untouched Middle
                    </div>
                  </div>

                  <div className="w-[20%] flex flex-col items-center justify-end h-full pb-2">
                    <div className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded shadow-sm text-[8px] sm:text-[9px] font-bold mb-1.5 uppercase leading-tight border border-green-200">
                      Generic
                      <br />
                      Training
                    </div>
                    <div className="font-black text-lg sm:text-xl text-green-600">
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
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 tracking-tight">
              Stop the <em className="italic text-teal-600">Guesswork</em> &mdash; Book a Demo
            </h2>
            <p className="text-navy-600 text-sm mb-6 max-w-xl mx-auto">
              See how Zrutam&apos;s 360-degree feedback platform can turn your Annual Value at Risk
              into measurable leadership growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/contact/?interest=360" className={buttonClasses("primary")}>
                Book a Demo
              </a>
              <a
                href="/tools/360"
                className="text-sm font-semibold text-teal-600 hover:text-teal-700 underline underline-offset-4 transition-colors rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
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
