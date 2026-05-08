"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FadeIn } from "./FadeIn";
import { TimelineNode } from "./TimelineNode";

type TimelineNodeData = {
  company: string;
  role: string;
  description: string;
  highlights: string[];
  logoSrc: string;
  isCurrent: boolean;
};

type ExperienceTimelineProps = {
  nodes: TimelineNodeData[];
};

export function ExperienceTimeline({ nodes }: ExperienceTimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [indicatorTop, setIndicatorTop] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndicator = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const parentRect = track.getBoundingClientRect();
    const viewportCenterY = window.innerHeight * 0.5;

    let bestIdx = 0;
    let bestDist = Infinity;

    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      const r = row.getBoundingClientRect();
      const cy = r.top + r.height / 2;
      const dist = Math.abs(cy - viewportCenterY);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });

    const activeRow = rowRefs.current[bestIdx];
    if (!activeRow) return;

    const unclampedTop = viewportCenterY - parentRect.top;
    const clampedTop = Math.max(0, Math.min(parentRect.height, unclampedTop));
    setIndicatorTop(clampedTop);
    setActiveIndex(bestIdx);
  }, []);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("scroll", updateIndicator, { passive: true });
    window.addEventListener("resize", updateIndicator);
    return () => {
      window.removeEventListener("scroll", updateIndicator);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator, nodes.length]);

  return (
    <section id="experience" className="py-16 md:py-24 px-4 md:px-6 max-w-5xl mx-auto">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <h4 className="text-indigo-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 md:mb-3">
            Track Record
          </h4>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 md:mb-6 tracking-tight">
            Enterprise Capability
          </h2>
          <p className="text-base md:text-lg text-slate-600">
            A two-decade foundation of scaling organizational development for the world&apos;s leading brands.
          </p>
        </div>
      </FadeIn>

      <div ref={trackRef} className="relative py-6 md:py-10">
        {/* Center rail + scroll-synced active dot (desktop) */}
        <div
          className="hidden md:block pointer-events-none absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 z-0"
          aria-hidden
        />
        <div
          className="hidden md:block pointer-events-none absolute left-1/2 -translate-x-1/2 z-20 w-4 h-4 rounded-full border-4 box-border bg-indigo-600 border-indigo-100 shadow-[0_0_15px_rgba(79,70,229,0.45)] scale-110 md:scale-125 transition-[top] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            top: indicatorTop ?? 0,
            transform: "translate(-50%, -50%)",
            opacity: indicatorTop === null ? 0 : 1,
          }}
          aria-hidden
        />

        {/* Mobile rail + scroll-synced active dot */}
        <div className="md:hidden pointer-events-none absolute left-3 top-0 bottom-0 w-px bg-slate-200 z-0" aria-hidden />
        <div
          className="md:hidden pointer-events-none absolute left-3 z-20 w-4 h-4 rounded-full border-4 box-border bg-indigo-600 border-indigo-100 shadow-[0_0_15px_rgba(79,70,229,0.45)] transition-[top] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            top: indicatorTop ?? 0,
            transform: "translate(-50%, -50%)",
            opacity: indicatorTop === null ? 0 : 1,
          }}
          aria-hidden
        />

        {nodes.map((node, index) => (
          <div
            key={node.company}
            ref={(el) => {
              rowRefs.current[index] = el;
            }}
            className="relative z-10"
          >
            <TimelineNode {...node} alignLeft={index % 2 === 0} isActive={index === activeIndex} />
          </div>
        ))}
      </div>
    </section>
  );
}
