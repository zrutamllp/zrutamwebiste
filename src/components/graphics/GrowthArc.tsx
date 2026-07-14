import { useId } from "react";

export default function GrowthArc({ className = "" }: { className?: string }) {
  const patternId = `growth-arc-grid-${useId()}`;

  return (
    <svg
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Subtle dotted grid backdrop */}
      <defs>
        <pattern id={patternId} width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1.5" fill="#0B2239" fillOpacity="0.1" />
        </pattern>
      </defs>
      <rect x="40" y="30" width="520" height="330" fill={`url(#${patternId})`} />

      {/* Ascending curve, bottom-left to top-right */}
      <path
        d="M 60 340 C 220 330 330 230 540 70"
        fill="none"
        stroke="#0B2239"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Baseline hint */}
      <line x1="60" y1="340" x2="540" y2="340" stroke="#0B2239" strokeOpacity="0.12" strokeWidth="1" />

      {/* Nodes along the curve (computed on the cubic) */}
      <circle cx="60" cy="340" r="4" fill="#0284C7" />
      <circle cx="173" cy="316" r="5" fill="#0EA5E9" />
      <circle cx="304" cy="247" r="5" fill="#0EA5E9" />
      <circle cx="425" cy="159" r="5" fill="#0284C7" />
      {/* Topmost node — amber */}
      <circle cx="540" cy="70" r="7" fill="#F59E0B" />
      <circle cx="540" cy="70" r="13" fill="none" stroke="#F59E0B" strokeOpacity="0.4" strokeWidth="1" />
    </svg>
  );
}
