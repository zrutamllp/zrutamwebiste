"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Coins, Layers, MessagesSquare, Sparkles, type LucideIcon } from "lucide-react";

const WORDS: { w: string; Icon: LucideIcon; tile: string }[] = [
  { w: "play.", Icon: Layers, tile: "bg-teal-500" },
  { w: "debate.", Icon: MessagesSquare, tile: "bg-ink" },
  { w: "bet on.", Icon: Coins, tile: "bg-amber-500" },
  { w: "remember.", Icon: Sparkles, tile: "bg-teal-600" },
];

/* Hero headline ending: icon tile + word that cycles every 2.4s */
export default function WordRotator() {
  const [i, setI] = useState(0);
  const [out, setOut] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let swap: number | undefined;
    const tick = window.setInterval(() => {
      setOut(true);
      swap = window.setTimeout(() => {
        setI((n) => (n + 1) % WORDS.length);
        setOut(false);
      }, 330);
    }, 2400);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(swap);
    };
  }, [reduce]);

  const { w, Icon, tile } = WORDS[i];
  return (
    <span className="inline-flex items-center gap-[0.18em] align-bottom">
      <span
        className={`inline-grid h-[0.92em] w-[0.92em] flex-none place-items-center rounded-[0.22em] text-white shadow-lift transition-all duration-500 ${tile} ${
          i % 2 ? "rotate-6" : "-rotate-6"
        }`}
      >
        <Icon className="h-[58%] w-[58%]" strokeWidth={2} />
      </span>
      <em
        className={`inline-block italic text-teal-600 transition-all duration-300 ${
          out ? "-translate-y-[0.3em] opacity-0 blur-sm" : "translate-y-0 opacity-100"
        }`}
      >
        {w}
      </em>
    </span>
  );
}
