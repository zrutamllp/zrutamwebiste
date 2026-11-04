"use client";

import { useState } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { WEB3FORMS_ACCESS_KEY } from "@/lib/constants";

const TOUR = [
  { k: "Join", img: "join-filled", t: "Join in seconds.", d: "Players enter a game code, pick their team, and choose one of the five roles.", a: "Join screen with game code, team, name and role filled in." },
  { k: "Team up", img: "team-setup", t: "Find your table.", d: "Each team fills its five seats, one player per role.", a: "Team setup screen showing five players on Team Alpha." },
  { k: "Lobby", img: "lobby", t: "Everyone at the tables.", d: "The lobby shows which teams are ready before the host starts.", a: "Tournament lobby with three teams ready around a table." },
  { k: "Quiz", img: "quiz-picked", t: "A 12-question baseline.", d: "A quick true-or-false read on what each player already knows.", a: "Pre-game quiz card with a workplace scenario and True or False buttons." },
  { k: "Mini-games", img: "mini-hub", t: "Earn your stake.", d: "A 15-minute session of team games to win extra coins.", a: "Mini-game hub listing Picture Slider, The Fake One, Word Hunt and Picture Quiz." },
  { k: "The table", img: "table", t: "12 rounds at the table.", d: "A real workplace case and four options, with the clock running.", a: "Poker table with a scenario in the centre and four answer options around it." },
  { k: "Clue cards", img: "clue", t: "Private clues.", d: "Some roles see a hint nobody else can, and must share it with the team.", a: "Private clue card shown to the Storyteller." },
  { k: "Bet", img: "betting", t: "Put coins on it.", d: "The Captain splits the stake across answers, within limits set for the round.", a: "Betting screen with coins placed on options A and C." },
  { k: "Reveal", img: "reveal", t: "The answer lands.", d: "See the right answer, coins won and lost, and how every team bet.", a: "Answer reveal with the correct option highlighted and coins won or lost." },
  { k: "Standings", img: "round-complete", t: "Every round moves the board.", d: "A live round tracker and leaderboard keep the competition going.", a: "Dashboard with a round tracker, table and leaderboard." },
  { k: "Final", img: "scores", t: "A winner at the end.", d: "Final standings, ranked by coins.", a: "Final standings podium with confetti." },
];

/* Join, Team up and Lobby are open; the rest unlock with a work email */
const FREE_SCREENS = 3;
const STORAGE_KEY = "zrutam_posh_tour_email";

const PERSONAL_DOMAINS = [
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.in", "ymail.com", "rocketmail.com",
  "outlook.com", "hotmail.com", "live.com", "msn.com", "icloud.com", "me.com", "mac.com",
  "aol.com", "proton.me", "protonmail.com", "rediffmail.com", "gmx.com", "mail.com", "yandex.com",
];

function emailError(value: string) {
  const v = value.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Enter a valid email address.";
  if (PERSONAL_DOMAINS.includes(v.split("@")[1])) {
    return "Please use your corporate email — personal addresses like Gmail aren't accepted.";
  }
  return "";
}

export default function ScreenTour() {
  const [i, setI] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const s = TOUR[i];
  const locked = !unlocked && i >= FREE_SCREENS;

  const select = (j: number) => {
    setI(j);
    // returning visitors who unlocked before skip the gate
    if (!unlocked && j >= FREE_SCREENS) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && !emailError(saved)) setUnlocked(true);
      } catch {
        // storage blocked — the gate just shows again
      }
    }
  };

  const unlock = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = emailError(email);
    setError(err);
    if (err) return;
    setSubmitting(true);
    const visitor = email.trim();
    try {
      // Web3Forms delivers to the inbox the key is registered with (ceo@zrutam.com, see DEPLOY.md)
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `POSH preview unlocked by ${visitor}`,
          from_name: "Zrutam website",
          replyto: visitor,
          email: visitor,
          company_domain: visitor.split("@")[1],
          message: `${visitor} entered their corporate email to unlock all Culture Table screen previews on the POSH page.`,
          page: window.location.href,
          unlocked_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
          source: "posh-screen-tour",
        }),
      });
    } catch {
      // silently continue — don't block user if webhook fails
    }
    try {
      localStorage.setItem(STORAGE_KEY, email.trim());
    } catch {
      // ignore
    }
    setUnlocked(true);
    setSubmitting(false);
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-5">
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Game screens">
        {TOUR.map((x, j) => (
          <button
            key={x.k}
            type="button"
            role="tab"
            aria-selected={j === i}
            onClick={() => select(j)}
            className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 text-sm transition-colors ${
              j === i
                ? "border-ink bg-ink font-semibold text-paper"
                : "border-navy-100 bg-white text-navy-600 hover:text-ink"
            }`}
          >
            {!unlocked && j >= FREE_SCREENS && (
              <Lock className="h-3.5 w-3.5 opacity-60" aria-label="Locked" />
            )}
            {x.k}
          </button>
        ))}
      </div>
      <figure className="overflow-hidden rounded-2xl bg-navy-900 shadow-lift">
        <div className="relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/posh/${s.img}.jpg`}
            alt={locked ? "" : s.a}
            width={1280}
            height={800}
            draggable={!locked}
            className={`block aspect-[16/10] h-auto w-full transition-[filter,transform] duration-500 ${
              locked ? "scale-110 blur-2xl brightness-75" : ""
            }`}
          />
          {locked && (
            <div className="absolute inset-0 grid place-items-center overflow-y-auto bg-navy-900/40 p-4">
              <form
                onSubmit={unlock}
                noValidate
                className="w-full max-w-md rounded-2xl border border-navy-100 bg-white p-6 text-left shadow-lift sm:p-7"
              >
                <span className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-teal-50">
                  <Lock className="h-5 w-5 text-teal-600" />
                </span>
                <h3 className="font-display text-2xl leading-tight text-ink">
                  See every screen of the game
                </h3>
                <p className="mt-2 text-sm text-navy-600">
                  Enter your corporate email to unlock the quiz, mini-games, table, betting and
                  results screens.
                </p>
                <label htmlFor="tour-email" className="mt-5 mb-1.5 block text-sm font-semibold text-ink">
                  Corporate email
                </label>
                <input
                  id="tour-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  aria-invalid={!!error}
                  aria-describedby={error ? "tour-email-error" : undefined}
                  className={`w-full rounded-xl border bg-paper px-4 py-3 text-base text-ink placeholder:text-navy-400 focus:outline-none focus:ring-2 ${
                    error
                      ? "border-amber-600 focus:ring-amber-100"
                      : "border-navy-200 focus:border-teal-500 focus:ring-teal-100"
                  }`}
                />
                {error && (
                  <p id="tour-email-error" role="alert" className="mt-2 text-sm text-amber-700">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className={buttonClasses("primary", "mt-4 w-full disabled:opacity-50")}
                >
                  {submitting ? "Unlocking…" : "Unlock all screens"} <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-3 text-xs text-navy-500">
                  We&apos;ll only use it to follow up about The Culture Table.
                </p>
              </form>
            </div>
          )}
        </div>
        <figcaption className="border-t border-white/10 px-5 py-4 text-navy-300">
          <strong className="mr-1 font-semibold text-amber-400">{s.t}</strong> {s.d}
        </figcaption>
      </figure>
    </div>
  );
}
