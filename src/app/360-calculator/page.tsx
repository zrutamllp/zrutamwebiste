"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { AssumptionsCard } from "@/app/360-calculator/components/AssumptionsCard";
import { BellCurveSection } from "@/app/360-calculator/components/BellCurveSection";
import { BottomCtaSection } from "@/app/360-calculator/components/BottomCtaSection";
import { CalculatorStyles } from "@/app/360-calculator/components/CalculatorStyles";
import { DemographicsCard } from "@/app/360-calculator/components/DemographicsCard";
import { EmailGateOverlay } from "@/app/360-calculator/components/EmailGateOverlay";
import { ResultsPanel } from "@/app/360-calculator/components/ResultsPanel";
import { EXCHANGE_RATE, FORMSPREE_URL } from "@/app/360-calculator/constants";
import { useAnimatedValue } from "@/app/360-calculator/hooks/useAnimatedValue";

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
        headers: { 
          "Content-Type": "application/json", 
          Accept: "application/json" 
        },
        body: JSON.stringify({ 
          email, _subject: "New 360 Calculator Lead", 
          source: "360-calculator" 
        }),
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
      <CalculatorStyles />
      <EmailGateOverlay
        gateUnlocked={gateUnlocked}
        gateEmail={gateEmail}
        gateError={gateError}
        gateSubmitting={gateSubmitting}
        setGateEmail={setGateEmail}
        setGateError={setGateError}
        handleGateSubmit={handleGateSubmit}
      />

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
              <DemographicsCard
                total={total}
                salary={salary}
                senior={senior}
                middle={middle}
                flm={flm}
                currency={currency}
                errorMsg={errorMsg}
                setTotal={setTotal}
                setSalary={setSalary}
                setSenior={setSenior}
                setMiddle={setMiddle}
                setFlm={setFlm}
                toggleCurrency={toggleCurrency}
              />
              <AssumptionsCard
                pctIneffective={pctIneffective}
                pctFlight={pctFlight}
                pctTurnover={pctTurnover}
                pctProd={pctProd}
                setPctIneffective={setPctIneffective}
                setPctFlight={setPctFlight}
                setPctTurnover={setPctTurnover}
                setPctProd={setPctProd}
              />

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

            <ResultsPanel
              revealed={revealed}
              isDanger={isDanger}
              staffTotal={staffTotal}
              spanValue={spanValue}
              meterWidth={meterWidth}
              meterColor={meterColor}
              spanMsg={spanMsg}
              pctIneffective={pctIneffective}
              pctProd={pctProd}
              totalRiskDisplay={totalRiskAnim.display}
              prodRiskAnim={prodRiskAnim}
              turnoverRiskAnim={turnoverRiskAnim}
              flightNumAnim={flightNumAnim}
              affectedStaffAnim={affectedStaffAnim}
            />
          </div>

          <BellCurveSection />
          <BottomCtaSection />
        </div>
      </div>
    </>
  );
}
