"use client";

import { CheckCircle2 } from "lucide-react";
import { CompanyLogo } from "./CompanyLogo";
import { FadeIn } from "./FadeIn";

type TimelineNodeProps = {
  company: string;
  role: string;
  description: string;
  highlights: string[];
  logoSrc: string;
  isCurrent: boolean;
  /** Even index -> left column, odd -> right (desktop). */
  alignLeft: boolean;
  isActive?: boolean;
};

export function TimelineNode({ company, role, description, highlights, logoSrc, isCurrent, alignLeft, isActive = false }: TimelineNodeProps) {
  return (
    <div className="relative pl-10 md:pl-0 w-full group">
      {/* Per-step markers (neutral); active highlight is the shared scroll-synced dot in ExperienceTimeline */}
      <div
        className={`absolute left-3 md:left-1/2 top-8 md:top-6 -translate-x-1/2 w-4 h-4 rounded-full border-4 box-content z-10 bg-white transition-all duration-500
          ${
            isActive
              ? "border-indigo-500 scale-110 shadow-[0_0_0_6px_rgba(79,70,229,0.14)]"
              : "border-slate-300 group-hover:border-indigo-400 group-hover:scale-110"
          }`}
        aria-hidden
      />
      <div className={`md:w-1/2 ${alignLeft ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"} pb-12 md:pb-16`}>
        <FadeIn direction={alignLeft ? "right" : "left"} delay={100}>
          <div
            className={`bg-white p-6 md:p-8 rounded-2xl border transition-all duration-500
          ${
            isCurrent
              ? "border-indigo-300 shadow-xl shadow-indigo-100/50 relative overflow-hidden"
              : "border-slate-100 shadow-sm hover:border-indigo-100"
          }
          ${isActive ? "ring-2 ring-indigo-300/70 shadow-xl shadow-indigo-100/70 border-indigo-200" : ""}`}
          >
            {isCurrent && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 relative z-10 gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900">{company}</h3>
                  {isCurrent && (
                    <span className="bg-indigo-100 text-indigo-700 text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full uppercase tracking-wider">
                      Present Focus
                    </span>
                  )}
                </div>
                <p className={`font-semibold text-sm md:text-base ${isCurrent ? "text-indigo-600" : "text-slate-600"}`}>
                  {role}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-lg flex items-center justify-center p-2 border border-slate-100 shrink-0 self-start">
                <CompanyLogo src={logoSrc} name={company} />
              </div>
            </div>

            <p className="text-slate-600 mb-6 leading-relaxed text-sm md:text-[15px] relative z-10">{description}</p>

            <ul className="space-y-3 relative z-10">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-slate-600 items-start">
                  <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${isCurrent ? "text-indigo-500" : "text-slate-400"}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
