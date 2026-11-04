"use client";

import { useState } from "react";
import { WindowBar } from "./GameReel";

const BANK = 250;
const STEP = 50;
const CORRECT = "A";
/* two rival teams: one has 100 on A, the other 100 on C */
const RIVALS: Record<string, number> = { A: 100, C: 100 };
const OPTIONS = [
  { id: "A", text: "Check in privately with the teammate, and let them know they can raise it with the Internal Committee." },
  { id: "B", text: "Call it out in the group chat straight away." },
  { id: "C", text: "Ignore it. It's only a joke." },
  { id: "D", text: "Forward screenshots of the chat to the whole team." },
];
const START: Record<string, number> = { A: 150, B: 100, C: 0, D: 0 };

function Coin() {
  return (
    <span className="h-4 w-4 flex-none rounded-full bg-[radial-gradient(circle_at_35%_30%,#FDE68A,#F59E0B_55%,#B45309)] shadow-[inset_0_0_0_2px_rgba(120,70,10,.35)]" />
  );
}

export default function BetDemo() {
  const [bets, setBets] = useState(START);
  const [revealed, setRevealed] = useState(false);

  const placed = OPTIONS.reduce((s, o) => s + bets[o.id], 0);
  const left = BANK - placed;

  // Same rule as the game: winners keep their stake and share the losing pool by stake size.
  const mine = bets[CORRECT];
  const lost = OPTIONS.filter((o) => o.id !== CORRECT).reduce(
    (s, o) => s + bets[o.id] + (RIVALS[o.id] || 0),
    0
  );
  const won = mine ? Math.floor((mine / (mine + (RIVALS[CORRECT] || 0))) * lost) : 0;
  const lostMine = placed - mine;
  const net = won - lostMine;

  const change = (id: string, d: number) =>
    setBets((b) => {
      if (d > 0 && placed + STEP <= BANK) return { ...b, [id]: b[id] + STEP };
      if (d < 0 && b[id] >= STEP) return { ...b, [id]: b[id] - STEP };
      return b;
    });

  const reset = () => {
    setBets(START);
    setRevealed(false);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-navy-900 text-paper shadow-lift">
      <WindowBar>
        <span className="rounded-full bg-navy-800 px-2.5 py-1 font-semibold text-paper">Try it yourself</span>
        <span className="flex-1" />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-800 px-2.5 py-1 font-semibold tabular-nums text-paper">
          <Coin /> {BANK} coins to play
        </span>
      </WindowBar>
      <div className="grid gap-4 p-5 sm:p-6">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-300">
          Scenario · Employee track
        </span>
        <p className="font-display text-lg leading-snug">
          A colleague keeps making &ldquo;jokes&rdquo; about a teammate&apos;s appearance in team
          chats. What&apos;s the right first step?
        </p>
        <ul className="grid gap-2">
          {OPTIONS.map((o) => {
            const win = revealed && o.id === CORRECT;
            const lose = revealed && o.id !== CORRECT;
            return (
              <li
                key={o.id}
                className={`grid grid-cols-[auto_1fr] items-center gap-3 rounded-xl border p-3 transition-all sm:grid-cols-[auto_1fr_auto] ${
                  win ? "border-teal-400 bg-teal-400/15" : "border-transparent bg-navy-800"
                } ${lose ? "opacity-50" : ""}`}
              >
                <span
                  className={`font-display grid h-7 w-7 place-items-center rounded-lg text-sm font-semibold ${
                    win ? "bg-teal-400 text-navy-900" : "bg-navy-700"
                  }`}
                >
                  {o.id}
                </span>
                <span className="min-w-0 text-sm leading-snug">{o.text}</span>
                <span className="col-span-2 flex items-center justify-end gap-2 sm:col-span-1">
                  <button
                    type="button"
                    onClick={() => change(o.id, -1)}
                    disabled={revealed || !bets[o.id]}
                    aria-label={`Remove ${STEP} coins from option ${o.id}`}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-navy-700 text-lg hover:border-amber-400 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    −
                  </button>
                  <span className="flex w-6 flex-col-reverse" aria-hidden="true">
                    {Array.from({ length: bets[o.id] / STEP }, (_, k) => (
                      <i key={k} className="-mt-[3px] block h-[7px] w-6 rounded-[50%] border border-amber-700 bg-gradient-to-b from-amber-400 to-amber-600" />
                    ))}
                  </span>
                  <span className="font-display min-w-[3ch] text-right font-semibold tabular-nums text-amber-400">
                    {bets[o.id]}
                  </span>
                  <button
                    type="button"
                    onClick={() => change(o.id, 1)}
                    disabled={revealed || left < STEP}
                    aria-label={`Add ${STEP} coins to option ${o.id}`}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-navy-700 text-lg hover:border-amber-400 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    +
                  </button>
                </span>
                {revealed && (win ? true : bets[o.id] > 0) && (
                  <span
                    className={`col-span-2 text-sm font-semibold sm:col-span-3 ${
                      win ? "text-teal-300" : "text-navy-300"
                    }`}
                  >
                    {win
                      ? bets[o.id]
                        ? `Correct. +${won} coins, and your ${bets[o.id]} stake comes back.`
                        : "Correct answer."
                      : `-${bets[o.id]} coins.`}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm" aria-live="polite">
            {revealed ? (
              "Round settled"
            ) : (
              <>
                Coins left to place:{" "}
                <strong className="font-display tabular-nums text-amber-400">{left}</strong>
              </>
            )}
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={reset}
              className="min-h-10 rounded-full border border-white/15 px-4 text-sm font-semibold hover:border-navy-400"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => setRevealed(true)}
              disabled={revealed}
              className="min-h-10 rounded-full bg-amber-400 px-4 text-sm font-semibold text-navy-900 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Reveal answer
            </button>
          </div>
        </div>
        {revealed && (
          <div className="rounded-xl bg-navy-800 px-4 py-3.5 text-sm leading-relaxed" aria-live="polite">
            {!mine ? (
              <>
                You didn&apos;t back <strong className="text-amber-400">A</strong>, so you lost {lostMine} coins.{" "}
              </>
            ) : (
              <>
                You won <strong className="text-amber-400">{won}</strong> from the losing bets
                {lostMine ? ` and lost ${lostMine} on wrong answers` : ""}. Net result:{" "}
                <strong className="text-amber-400">
                  {net >= 0 ? "+" : ""}
                  {net} coins
                </strong>
                .{" "}
              </>
            )}
            Why A: a private, supportive check-in comes first, and the teammate should know the
            Internal Committee is there for them.
          </div>
        )}
        <p className="text-xs text-navy-400">
          Simplified example with two rival teams: one has 100 coins on A, the other 100 on C.
          Payouts use the same rule as the game.
        </p>
      </div>
    </div>
  );
}
