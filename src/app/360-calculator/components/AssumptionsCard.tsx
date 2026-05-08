import { SliderRow } from "./SliderRow";

type AssumptionsCardProps = {
  pctIneffective: number;
  pctFlight: number;
  pctTurnover: number;
  pctProd: number;
  setPctIneffective: (value: number) => void;
  setPctFlight: (value: number) => void;
  setPctTurnover: (value: number) => void;
  setPctProd: (value: number) => void;
};

export function AssumptionsCard({
  pctIneffective,
  pctFlight,
  pctTurnover,
  pctProd,
  setPctIneffective,
  setPctFlight,
  setPctTurnover,
  setPctProd,
}: AssumptionsCardProps) {
  return (
    <div className="bg-slate-50/80 backdrop-blur-xl border border-black/[0.08] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.01)] p-5 sm:p-6 rounded-2xl relative z-10">
      <div className="flex items-center gap-3 mb-4 border-b border-slate-200 pb-3">
        <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">Adjust Assumptions</h2>
          <p className="text-[10px] text-slate-500 mt-0.5">Anchored to industry benchmarks.</p>
        </div>
      </div>

      <div className="space-y-4">
        <SliderRow
          label="Ineffective Managers"
          value={pctIneffective}
          min={5}
          max={60}
          onChange={setPctIneffective}
        />
        <SliderRow
          label="Flight Risk (Attrition)"
          value={pctFlight}
          min={10}
          max={60}
          onChange={setPctFlight}
        />
        <SliderRow
          label="Cost to Replace (Turnover)"
          value={pctTurnover}
          min={20}
          max={150}
          step={5}
          onChange={setPctTurnover}
        />
        <SliderRow
          label="Productivity Leakage"
          value={pctProd}
          min={5}
          max={40}
          onChange={setPctProd}
        />
      </div>
    </div>
  );
}
