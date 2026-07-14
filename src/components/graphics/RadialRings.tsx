export default function RadialRings({ className = "" }: { className?: string }) {
  const tickAngles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

  return (
    <svg
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Base concentric rings */}
      <circle cx="300" cy="300" r="240" fill="none" stroke="#0B2239" strokeOpacity="0.12" strokeWidth="1" />
      <circle cx="300" cy="300" r="190" fill="none" stroke="#0B2239" strokeOpacity="0.16" strokeWidth="1" />
      <circle cx="300" cy="300" r="140" fill="none" stroke="#0B2239" strokeOpacity="0.2" strokeWidth="1" />

      {/* Amber progress arc on the middle ring (~90 deg, starting at 12 o'clock) */}
      <circle
        cx="300"
        cy="300"
        r="190"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="298 896"
        transform="rotate(-90 300 300)"
      />

      {/* Teal arc on the outer ring (~40 deg, lower-left) */}
      <circle
        cx="300"
        cy="300"
        r="240"
        fill="none"
        stroke="#0EA5E9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="168 1340"
        transform="rotate(120 300 300)"
      />

      {/* Tick marks just outside the outer ring */}
      <g stroke="#0B2239" strokeOpacity="0.25" strokeWidth="1">
        {tickAngles.map((a) => (
          <line key={a} x1="300" y1="42" x2="300" y2="52" transform={`rotate(${a} 300 300)`} />
        ))}
      </g>

      {/* Accent nodes marking arc endpoints */}
      <circle cx="300" cy="110" r="5" fill="#F59E0B" />
      <circle cx="490" cy="300" r="4" fill="#F59E0B" fillOpacity="0.7" />
      <circle cx="300" cy="160" r="4" fill="#0284C7" />
    </svg>
  );
}
