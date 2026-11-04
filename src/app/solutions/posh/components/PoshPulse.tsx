"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock,
  Compass,
  EyeOff,
  Flame,
  HeartHandshake,
  RotateCcw,
  Scale,
  Search,
  Share2,
  ShieldCheck,
  Footprints,
  Target,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { cardClasses } from "@/components/ui/Card";
import { WEB3FORMS_ACCESS_KEY } from "@/lib/constants";
import ConfettiCanvas from "@/app/solutions/quiz/components/ConfettiCanvas";
import FilmCard from "./FilmCard";
import {
  ACTION,
  KNOWLEDGE,
  ORDER,
  PROFILES,
  scoreAll,
  type Answer,
  type ProfileKey,
} from "../poshData";

type Screen = "hook" | "quiz" | "calc" | "reveal" | "gate" | "report";

const ICONS: Record<ProfileKey, LucideIcon> = {
  spectator: EyeOff,
  guesser: HeartHandshake,
  expert: Scale,
  champion: ShieldCheck,
};

/* quadrant reads Action ↑ / Knowledge → */
const QUADRANT: ProfileKey[] = ["guesser", "champion", "spectator", "expert"];

const CALC_LINES = [
  "Weighing your courage…",
  "Cross-examining your instincts…",
  "Consulting Section 2(n)…",
  "Polishing the mirror…",
];

const eyebrow = "text-sm font-semibold uppercase tracking-[0.18em] text-teal-600";

export default function PoshPulse() {
  const [screen, setScreen] = useState<Screen>("hook");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [calcLine, setCalcLine] = useState(0);
  const [meters, setMeters] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState("");
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const timers = useRef<number[]>([]);

  const result = answers.length === ORDER.length ? scoreAll(answers) : null;
  const profile = result ? PROFILES[result.key] : null;

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const go = (next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [screen, idx]);

  const start = () => {
    setIdx(0);
    setAnswers([]);
    setPicked(null);
    setMeters(false);
    setEmail("");
    setConsent(false);
    go("quiz");
  };

  const pick = (oi: number) => {
    if (picked !== null) return;
    setPicked(oi);
    const nextAnswers = [...answers, { ...ORDER[idx], pick: oi }];
    later(() => {
      setAnswers(nextAnswers);
      setPicked(null);
      if (idx + 1 < ORDER.length) {
        setIdx(idx + 1);
      } else {
        finish();
      }
    }, 330);
  };

  const finish = () => {
    go("calc");
    setCalcLine(0);
    CALC_LINES.slice(1).forEach((_, i) => later(() => setCalcLine(i + 1), 420 * (i + 1)));
    later(() => {
      go("reveal");
      later(() => setMeters(true), 50);
    }, 1500);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    later(() => setToast(""), 2600);
  };

  const share = async () => {
    if (!profile) return;
    const txt = `I'm ${profile.name} on the POSH Pulse Check by Zrutam. Where do you stand? Take the 3-minute mirror: ${window.location.href}`;
    try {
      await navigator.clipboard.writeText(txt);
      showToast("Copied! Paste it on LinkedIn");
    } catch {
      showToast("Couldn't copy — select the page link to share");
    }
  };

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

  const unlock = async () => {
    if (!validEmail || !consent || !result) return;
    setSubmitting(true);
    const visitor = email.trim();
    const name = PROFILES[result.key].name;
    try {
      // CEO notification only — the visitor is not emailed; their report shows on the page.
      // Web3Forms delivers to ceo@zrutam.com (see DEPLOY.md).
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `POSH Pulse Check completed by ${visitor}`,
          from_name: "Zrutam website",
          replyto: visitor,
          email: visitor,
          company_domain: visitor.split("@")[1],
          message: `${visitor} completed the POSH Pulse Check and unlocked their report. Profile: ${name}. Law knowledge ${result.k}/6, courage to act ${result.a}/8.`,
          profile: name,
          knowledge_score: `${result.k}/6`,
          action_score: `${result.a}/8`,
          page: window.location.href,
          completed_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
          source: "posh-pulse-check",
        }),
      });
    } catch {
      // silently continue — don't block user if webhook fails
    }
    setSubmitting(false);
    go("report");
    showToast("Report unlocked");
  };

  const ProfileIcon = result ? ICONS[result.key] : Sparkles;
  const step = ORDER[idx];
  const isK = step.type === "K";
  const data = isK ? KNOWLEDGE[step.i] : ACTION[step.i];
  const knowledgeAnswers = answers.filter((x) => x.type === "K");
  const actionAnswers = answers.filter((x) => x.type === "A");
  const misses = knowledgeAnswers.filter((x) => x.pick !== KNOWLEDGE[x.i].correct);

  return (
    <section className="relative overflow-hidden bg-paper pt-28 pb-24 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-60" />
      <ConfettiCanvas active={screen === "reveal" && result?.key === "champion"} />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        {/* HOOK */}
        {screen === "hook" && (
          <div className="animate-[fadeUp_.45s_ease_both]">
            <div className="mb-8 grid w-fit grid-cols-2 gap-2" aria-hidden="true">
              {(["spectator", "champion", "guesser", "expert"] as ProfileKey[]).map((k, i) => {
                const Icon = ICONS[k];
                return (
                  <div
                    key={k}
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-navy-100 bg-white shadow-card ${
                      ["-rotate-3", "rotate-3 translate-y-1.5", "rotate-2", "-rotate-3 translate-y-1"][i]
                    }`}
                  >
                    <Icon className={`h-7 w-7 ${PROFILES[k].text}`} strokeWidth={1.8} />
                  </div>
                );
              })}
            </div>
            <p className={`${eyebrow} mb-4`}>POSH Pulse Check</p>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-balance text-4xl leading-[1.05] tracking-tight text-ink outline-none sm:text-5xl lg:text-6xl"
            >
              Where do you stand with <em className="italic text-teal-600">POSH?</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-600">
              Everyone thinks they&apos;d do the right thing. Ten quick situations will tell
              you which of four profiles you actually are — and the one blind spot to fix.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { Icon: Clock, t: "3 minutes" },
                { Icon: Target, t: "10 situations" },
                { Icon: Compass, t: "4 profiles" },
              ].map(({ Icon, t }) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy-100 bg-white px-3 py-1.5 text-sm font-medium text-navy-600"
                >
                  <Icon className="h-4 w-4 text-teal-600" /> {t}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button type="button" onClick={start} className={buttonClasses("primary", "text-base")}>
                Show me the mirror <ArrowRight className="h-5 w-5" />
              </button>
              <span className="flex items-center gap-2 text-sm text-navy-500">
                <span className="h-2 w-2 rounded-full bg-teal-500" />
                No right-or-wrong shaming. Promise.
              </span>
            </div>
          </div>
        )}

        {/* QUIZ */}
        {screen === "quiz" && (
            <div key={idx} className="animate-[fadeUp_.35s_ease_both]">
              <div className="mb-6 flex items-center gap-4">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-navy-100">
                  <div
                    className="h-full rounded-full bg-teal-500 transition-[width] duration-300"
                    style={{ width: `${(idx / ORDER.length) * 100}%` }}
                  />
                </div>
                <span className="min-w-[3rem] text-right text-sm font-semibold tabular-nums text-navy-500">
                  {idx + 1}/{ORDER.length}
                </span>
              </div>
              <div className={cardClasses(false, "p-6 sm:p-8")}>
                <span
                  className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${
                    isK ? "bg-teal-50 text-teal-600" : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {isK ? "Scenario" : "Honesty check"}
                </span>
                <h2
                  ref={headingRef}
                  tabIndex={-1}
                  className="font-display text-balance mb-6 text-xl leading-snug text-ink outline-none sm:text-2xl"
                >
                  {data.q}
                </h2>
                <div className="flex flex-col gap-3">
                  {data.opts.map((txt, oi) => {
                    const on = picked === oi;
                    return (
                      <button
                        key={oi}
                        type="button"
                        onClick={() => pick(oi)}
                        className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left text-[15px] leading-snug transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${
                          on
                            ? "scale-[.99] border-teal-500 bg-teal-50 text-ink"
                            : "border-navy-100 bg-paper text-navy-700 hover:border-teal-400"
                        }`}
                      >
                        <span
                          className={`flex h-6 w-6 flex-none items-center justify-center rounded-md border text-xs font-bold ${
                            on ? "border-teal-500 bg-teal-500 text-white" : "border-navy-200 bg-white text-navy-600"
                          }`}
                        >
                          {"ABC"[oi]}
                        </span>
                        <span>{txt}</span>
                      </button>
                    );
                  })}
                </div>
                {!isK && (
                  <p className="mt-5 text-sm italic text-navy-500">
                    Nobody sees your answer. Pick what you&apos;d honestly do — not the brochure
                    version of you.
                  </p>
                )}
              </div>
            </div>
        )}

        {/* CALCULATING */}
        {screen === "calc" && (
          <div className="flex flex-col items-center gap-4 py-24 text-center" role="status">
            <div className="h-11 w-11 animate-spin rounded-full border-4 border-navy-100 border-t-teal-500" />
            <p className="text-navy-600">{CALC_LINES[calcLine]}</p>
          </div>
        )}

        {/* REVEAL */}
        {screen === "reveal" && result && profile && (
          <div className="animate-[fadeUp_.45s_ease_both]">
            <div className="mb-10 flex flex-col items-center gap-3 text-center">
              <ProfileIcon className={`h-16 w-16 ${profile.text}`} strokeWidth={1.6} />
              <p className={eyebrow}>You are</p>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className={`font-display text-4xl leading-tight tracking-tight outline-none sm:text-5xl ${profile.text}`}
              >
                {profile.name}
              </h2>
              <p className="max-w-md text-lg text-navy-600">{profile.tag}</p>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-3">
              <div className="flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-500 [writing-mode:vertical-rl] rotate-180">
                Action ↑
              </div>
              <div className="grid grid-cols-2 gap-3">
                {QUADRANT.map((k) => {
                  const Icon = ICONS[k];
                  const you = k === result.key;
                  return (
                    <div
                      key={k}
                      className={`flex min-h-[110px] flex-col items-center justify-center gap-1.5 rounded-2xl border bg-white p-4 text-center transition-all duration-300 ${
                        you ? `${PROFILES[k].border} scale-[1.03] border-2 shadow-lift` : "border-navy-100 opacity-50"
                      }`}
                    >
                      {you && (
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white ${PROFILES[k].bg}`}>
                          You
                        </span>
                      )}
                      <Icon className={`h-6 w-6 ${PROFILES[k].text}`} strokeWidth={1.9} />
                      <span className="font-display text-sm font-semibold leading-tight text-ink">
                        {PROFILES[k].short}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="col-start-2 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-500">
                Knowledge →
              </div>
            </div>

            <div className={cardClasses(false, "my-8 grid gap-5 p-6")}>
              {[
                { Icon: Scale, label: "Law knowledge", v: result.k, max: 6, bar: "bg-teal-500" },
                { Icon: Flame, label: "Courage to act", v: result.a, max: 8, bar: "bg-amber-500" },
              ].map(({ Icon, label, v, max, bar }) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm font-medium text-navy-700">
                    <span className="inline-flex items-center gap-2">
                      <Icon className="h-4 w-4 text-navy-500" /> {label}
                    </span>
                    <b className="tabular-nums text-ink">
                      {v}/{max}
                    </b>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-navy-100">
                    <div
                      className={`h-full rounded-full ${bar} transition-[width] duration-700 ease-out`}
                      style={{ width: meters ? `${(v / max) * 100}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <button type="button" onClick={() => go("gate")} className={buttonClasses("primary")}>
                Unlock my full report
              </button>
              <button type="button" onClick={share} className={buttonClasses("outline")}>
                <Share2 className="h-4 w-4" /> Share my profile
              </button>
              <button type="button" onClick={start} className={buttonClasses("outline")}>
                <RotateCcw className="h-4 w-4" /> Retake
              </button>
            </div>
          </div>
        )}

        {/* EMAIL GATE */}
        {screen === "gate" && (
          <div className={cardClasses(false, "mx-auto flex max-w-lg flex-col gap-5 p-6 sm:p-8 animate-[fadeUp_.45s_ease_both]")}>
            <div>
              <p className={`${eyebrow} mb-2`}>One step away</p>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="font-display text-3xl leading-tight text-ink outline-none"
              >
                Your full report is ready
              </h2>
            </div>
            <ul className="list-disc space-y-1.5 pl-5 text-navy-600">
              <li>What your answers quietly reveal about you</li>
              <li>Every question, your answer and the correct one — with the exact law behind each</li>
              <li>3 personal next steps for your profile</li>
            </ul>
            <div>
              <label htmlFor="posh-email" className="mb-1.5 block text-sm font-semibold text-ink">
                Work email
              </label>
              <input
                id="posh-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-navy-200 bg-paper px-4 py-3 text-base text-ink placeholder:text-navy-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
            </div>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-navy-600">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 flex-none accent-teal-600"
              />
              <span>
                I agree that Zrutam LLP may contact me about my results and send occasional POSH
                learning content. I can withdraw anytime via unsubscribe.
              </span>
            </label>
            <button
              type="button"
              onClick={unlock}
              disabled={!validEmail || !consent || submitting}
              className={buttonClasses("primary", "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none")}
            >
              {submitting ? "Unlocking…" : "Get my report"} <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go("reveal")}
              className="text-sm text-navy-500 underline underline-offset-4 hover:text-ink"
            >
              Maybe later — take me back
            </button>
          </div>
        )}

        {/* REPORT */}
        {screen === "report" && result && profile && (
            <div className="animate-[fadeUp_.45s_ease_both]">
              <p className={`${eyebrow} mb-3`}>Your POSH Pulse report</p>
              <div className="mb-8 flex items-center gap-4">
                <ProfileIcon className={`h-11 w-11 flex-none ${profile.text}`} strokeWidth={1.8} />
                <h2
                  ref={headingRef}
                  tabIndex={-1}
                  className={`font-display text-3xl leading-tight tracking-tight outline-none sm:text-4xl ${profile.text}`}
                >
                  {profile.name}
                </h2>
              </div>

              <div className="flex flex-col gap-5">
                <div className={cardClasses(false, "p-6")}>
                  <h3 className="font-display mb-3 flex items-center gap-2 text-xl text-ink">
                    <Sparkles className="h-5 w-5 text-teal-600" /> The mirror
                  </h3>
                  <p className="leading-relaxed text-navy-700">{profile.body}</p>
                </div>

                <div className={cardClasses(false, "p-6")}>
                  <h3 className="font-display mb-3 flex items-center gap-2 text-xl text-ink">
                    <Search className="h-5 w-5 text-teal-600" /> Your answers, decoded
                  </h3>
                  <p className="text-navy-600">
                    {misses.length === 0
                      ? "Clean sweep — 6/6 on the law. Your blind spot, if any, lives on the courage axis, not the knowledge one."
                      : `You got ${KNOWLEDGE.length - misses.length} of ${KNOWLEDGE.length} law scenarios right. Here's every question, your answer and what the Act actually says:`}
                  </p>
                  <ol className="mt-4 flex flex-col gap-3">
                    {knowledgeAnswers.map((m, n) => {
                      const d = KNOWLEDGE[m.i];
                      const right = m.pick === d.correct;
                      return (
                        <li
                          key={m.i}
                          className={`rounded-r-xl border-l-[3px] bg-paper px-4 py-3.5 ${
                            right ? "border-teal-500" : "border-amber-500"
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <b className="font-display text-ink">
                              {n + 1}. {d.label}
                            </b>
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                right ? "bg-teal-50 text-teal-700" : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              {right ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                              {right ? "Correct" : "Missed"}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-navy-700">{d.q}</p>
                          <dl className="mt-2.5 grid gap-1.5 text-sm sm:grid-cols-[8.5rem_1fr]">
                            <dt className="font-semibold text-navy-500">Your answer</dt>
                            <dd className={right ? "text-teal-700" : "text-amber-700"}>
                              {"ABC"[m.pick]}. {d.opts[m.pick]}
                            </dd>
                            {!right && (
                              <>
                                <dt className="font-semibold text-navy-500">Correct answer</dt>
                                <dd className="text-teal-700">
                                  {"ABC"[d.correct]}. {d.opts[d.correct]}
                                </dd>
                              </>
                            )}
                            <dt className="font-semibold text-navy-500">What the Act says</dt>
                            <dd className="text-navy-700">{d.law}</dd>
                          </dl>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <div className={cardClasses(false, "p-6")}>
                  <h3 className="font-display mb-3 flex items-center gap-2 text-xl text-ink">
                    <Flame className="h-5 w-5 text-teal-600" /> Your honesty checks
                  </h3>
                  <p className="text-navy-600">
                    No right or wrong here — these set your courage-to-act score ({result.a}/8).
                  </p>
                  <ol className="mt-4 flex flex-col gap-3">
                    {actionAnswers.map((m, n) => {
                      const d = ACTION[m.i];
                      return (
                        <li key={m.i} className="rounded-xl bg-paper px-4 py-3.5">
                          <p className="text-sm text-navy-700">
                            <b className="font-display text-ink">{n + 1}.</b> {d.q}
                          </p>
                          <p className="mt-1.5 text-sm">
                            <span className="font-semibold text-navy-500">Your answer: </span>
                            <span className="text-ink">
                              {"ABC"[m.pick]}. {d.opts[m.pick]}
                            </span>
                          </p>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <div className={cardClasses(false, "p-6")}>
                  <h3 className="font-display mb-4 flex items-center gap-2 text-xl text-ink">
                    <Footprints className="h-5 w-5 text-teal-600" /> Your 3 next steps
                  </h3>
                  <ol className="flex flex-col gap-3">
                    {profile.steps.map((s, i) => (
                      <li key={s} className="flex items-start gap-3 text-navy-700">
                        <span className="font-display flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-teal-50 font-semibold text-teal-600">
                          {i + 1}
                        </span>
                        <span className="pt-1">{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <FilmCard />

                <div className="flex flex-col items-center gap-4 rounded-2xl bg-ink px-6 py-10 text-center text-paper">
                  <h2 className="font-display text-balance text-2xl leading-tight sm:text-3xl">
                    Want your whole team profiled — and trained where it{" "}
                    <em className="italic text-teal-300">actually matters?</em>
                  </h2>
                  <p className="max-w-lg text-navy-200">
                    Zrutam runs POSH programs people don&apos;t sleep through: games, poker-table
                    debates, and this exact profile for every employee.
                  </p>
                  <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                    <Link
                      href="/contact/"
                      className={`${buttonClasses("primary")} w-full !bg-teal-500 !text-white hover:!bg-teal-600 sm:w-auto`}
                    >
                      Talk to Zrutam <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/solutions/posh/"
                      className={`${buttonClasses("outline")} w-full !border-navy-500 !text-paper hover:!border-paper sm:w-auto`}
                    >
                      Learn more about POSH
                    </Link>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={share} className={buttonClasses("outline")}>
                    <Share2 className="h-4 w-4" /> Share my profile
                  </button>
                  <button type="button" onClick={start} className={buttonClasses("outline")}>
                    <RotateCcw className="h-4 w-4" /> Retake the quiz
                  </button>
                </div>
              </div>
            </div>
        )}

        <p className="mt-14 text-center text-xs text-navy-500">
          A <strong>Zrutam LLP</strong> learning experience · Based on the POSH Act, 2013 · A
          self-reflection profile, not an assessment
        </p>
      </div>

      <div
        role="status"
        className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper shadow-lift transition-opacity ${
          toast ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {toast}
      </div>
    </section>
  );
}
