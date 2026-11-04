"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export function WindowBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-white/10 px-4 py-3 text-xs text-navy-300">
      <span className="flex gap-1.5" aria-hidden="true">
        <i className="h-2.5 w-2.5 rounded-full bg-navy-600" />
        <i className="h-2.5 w-2.5 rounded-full bg-navy-600" />
        <i className="h-2.5 w-2.5 rounded-full bg-navy-600" />
      </span>
      {children}
    </div>
  );
}

/* Hero film: vertical phone video with audio. Browsers only autoplay muted,
   so it starts silent with a "Tap for sound" button. */
export default function GameReel() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduce) {
      v.pause();
      return;
    }
    v.play().catch(() => {});
  }, [reduce]);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) {
      v.volume = 1;
      v.play().catch(() => {});
    }
    setMuted(v.muted);
  };

  return (
    <figure className="w-full overflow-hidden rounded-2xl border border-white/5 bg-navy-900 text-left text-paper shadow-lift">
      <WindowBar>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-800 px-2.5 py-1 font-semibold text-paper">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-[0_0_0_3px_rgba(14,165,233,.25)]" />
          The Culture Table
        </span>
        <span className="flex-1" />
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 font-semibold text-navy-900 transition-colors hover:bg-amber-300"
        >
          {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          {muted ? "Tap for sound" : "Sound on"}
        </button>
      </WindowBar>
      <div className="flex justify-center bg-[radial-gradient(circle_at_50%_40%,#16324B,#071829_70%)]">
        <video
          ref={videoRef}
          src="/posh/posh-film.mp4"
          muted
          loop
          playsInline
          autoPlay={!reduce}
          controls
          preload="metadata"
          onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
          aria-label="The Culture Table: a short film on POSH training your team will actually want to play."
          className="block aspect-[9/16] max-h-[78vh] w-auto max-w-full bg-navy-900"
        />
      </div>
    </figure>
  );
}
