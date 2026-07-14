export default function NetworkMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Concentric orbit rings */}
      <circle cx="300" cy="300" r="120" fill="none" stroke="#0B2239" strokeOpacity="0.2" strokeWidth="1" />
      <circle cx="300" cy="300" r="190" fill="none" stroke="#0B2239" strokeOpacity="0.15" strokeWidth="1" />
      <circle cx="300" cy="300" r="260" fill="none" stroke="#0B2239" strokeOpacity="0.12" strokeWidth="1" />

      {/* Hairline connections between nodes */}
      <g stroke="#0B2239" strokeOpacity="0.25" strokeWidth="1" fill="none">
        <line x1="300" y1="300" x2="420" y2="300" />
        <line x1="300" y1="300" x2="215" y2="215" />
        <line x1="300" y1="300" x2="300" y2="490" />
        <line x1="420" y1="300" x2="434" y2="166" />
        <line x1="215" y1="215" x2="110" y2="300" />
        <line x1="110" y1="300" x2="101" y2="467" />
        <line x1="300" y1="490" x2="484" y2="484" />
        <line x1="434" y1="166" x2="300" y2="40" />
      </g>

      {/* Nodes — gentle float */}
      <g className="animate-float-slow">
        {/* center */}
        <circle cx="300" cy="300" r="7" fill="#0EA5E9" />
        {/* inner ring (r = 120) */}
        <circle cx="420" cy="300" r="5" fill="#F59E0B" />
        <circle cx="215" cy="215" r="5" fill="#0284C7" />
        {/* middle ring (r = 190) */}
        <circle cx="434" cy="166" r="6" fill="#0EA5E9" />
        <circle cx="110" cy="300" r="4" fill="#0B2239" />
        <circle cx="300" cy="490" r="5" fill="#F59E0B" />
        {/* outer ring (r = 260) */}
        <circle cx="300" cy="40" r="4" fill="#0EA5E9" />
        <circle cx="484" cy="484" r="4" fill="#0B2239" />
        <circle cx="101" cy="467" r="5" fill="#0EA5E9" />
        <circle cx="53" cy="220" r="3" fill="#F59E0B" fillOpacity="0.7" />
        <circle cx="550" cy="228" r="3" fill="#0EA5E9" fillOpacity="0.6" />
      </g>
    </svg>
  );
}
