"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/* "Watch" card that turns into the player on click — the 24 MB film only loads then */
export default function FilmCard() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <figure className="overflow-hidden rounded-2xl bg-navy-900 shadow-lift">
        <video
          src="/posh/posh-film.mp4"
          controls
          autoPlay
          playsInline
          className="block max-h-[75vh] w-full bg-navy-900"
          aria-label="POSH in 3 minutes, minus the boredom — Zrutam's short film on what a safe workplace looks like"
        />
      </figure>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group flex w-full items-center gap-4 rounded-2xl border border-navy-100 bg-gradient-to-br from-teal-50 to-white p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 sm:p-6"
    >
      <span className="grid h-14 w-14 flex-none place-items-center rounded-full bg-teal-500 text-white shadow-lift transition-transform group-hover:scale-105">
        <Play className="ml-0.5 h-6 w-6 fill-current" />
      </span>
      <span>
        <span className="font-display block text-lg leading-snug text-ink">
          Watch: POSH in 3 minutes, minus the boredom
        </span>
        <span className="mt-0.5 block text-sm text-navy-600">
          Our short film on what a safe workplace actually looks like.
        </span>
      </span>
    </button>
  );
}
