type SliderRowProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
};

export function SliderRow({ label, value, min, max, step, onChange }: SliderRowProps) {
  return (
    <div>
      <div className="flex justify-between text-xs font-bold mb-1.5">
        <span className="text-slate-700">{label}</span>
        <span className="text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded text-[10px]">
          {value}%
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-orange-500 custom-range"
      />
    </div>
  );
}
