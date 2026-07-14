export default function Stat({
  value,
  label,
  dark = false,
}: {
  value: React.ReactNode; // animated number node from StatsCounter
  label: string;
  dark?: boolean;
}) {
  return (
    <div className="text-center">
      <div className={`font-display text-4xl md:text-6xl ${dark ? "text-amber-400" : "text-amber-600"}`}>
        {value}
      </div>
      <div className={`mt-2 text-sm uppercase tracking-[0.14em] ${dark ? "text-navy-300" : "text-navy-500"}`}>
        {label}
      </div>
    </div>
  );
}
