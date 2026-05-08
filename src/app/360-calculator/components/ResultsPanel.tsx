type AnimatedValue = {
  display: string;
};

type ResultsPanelProps = {
  revealed: boolean;
  isDanger: boolean;
  staffTotal: number;
  spanValue: number;
  meterWidth: number;
  meterColor: string;
  spanMsg: string;
  pctIneffective: number;
  pctProd: number;
  totalRiskDisplay: string;
  prodRiskAnim: AnimatedValue;
  turnoverRiskAnim: AnimatedValue;
  flightNumAnim: AnimatedValue;
  affectedStaffAnim: AnimatedValue;
};

export function ResultsPanel({
  revealed,
  isDanger,
  staffTotal,
  spanValue,
  meterWidth,
  meterColor,
  spanMsg,
  pctIneffective,
  pctProd,
  totalRiskDisplay,
  prodRiskAnim,
  turnoverRiskAnim,
  flightNumAnim,
  affectedStaffAnim,
}: ResultsPanelProps) {
  return (
    <div
      className={`lg:col-span-7 bg-white/85 backdrop-blur-xl border border-slate-200 shadow-lg p-5 sm:p-6 rounded-2xl relative z-20 flex flex-col lg:sticky lg:top-6 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        revealed ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-5 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="text-red-500">&#9888;&#65039;</span> The Executive Blind Spot
        </h2>
        <div className="text-[10px] sm:text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 shadow-sm shrink-0">
          Staff: <span className="text-slate-900">{staffTotal.toLocaleString()}</span>
        </div>
      </div>

      <div className="mb-5 bg-slate-50 p-3 rounded-xl border border-slate-100">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-slate-500">
            Span of Control Risk
          </h3>
          <div className="text-lg sm:text-xl font-black text-slate-900 leading-none">1 : {spanValue.toFixed(1)}</div>
        </div>
        <div className="w-full h-1.5 bg-slate-200 rounded shadow-inner overflow-hidden">
          <div
            className="h-full transition-all duration-1000"
            style={{
              width: `${meterWidth}%`,
              backgroundColor: meterColor,
            }}
          />
        </div>
        <p className="text-[10px] text-slate-500 mt-1.5 italic">{spanMsg}</p>
      </div>

      <div
        className={`bg-red-50/80 rounded-xl p-5 border border-red-100 text-center mb-4 relative overflow-hidden shadow-sm ${
          isDanger && revealed ? "danger-glow" : ""
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500" />
        <h3 className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-slate-600 mb-1.5">
          Annual Value at Risk (TVR)
        </h3>
        <p className="text-[10px] sm:text-xs text-slate-600 mb-2 max-w-sm mx-auto leading-relaxed">
          If{" "}
          <strong className="text-slate-900 bg-red-100 px-1 rounded">{pctIneffective}%</strong> of your Frontline
          Managers are unskilled, this is your estimated annual financial exposure:
        </p>
        <div className="text-4xl sm:text-5xl md:text-6xl font-black text-red-600 drop-shadow-sm tracking-tight">
          {totalRiskDisplay}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-center">
          <div className="absolute right-0 top-0 w-12 h-12 bg-orange-100 rounded-full blur-xl -mr-4 -mt-4" />
          <h4 className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-0.5">
            Productivity Leakage <span className="text-orange-500">*</span>
          </h4>
          <div className="text-lg sm:text-xl font-bold text-orange-500 leading-tight mb-0.5">{prodRiskAnim.display}</div>
          <p className="text-[8px] sm:text-[9px] text-slate-500 leading-tight">
            <strong>{pctProd}%</strong> salary waste across the{" "}
            <strong className="text-slate-900 bg-orange-50 px-1 rounded">{affectedStaffAnim.display}</strong> staff
            reporting to ineffective managers.
          </p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-center">
          <div className="absolute right-0 top-0 w-12 h-12 bg-red-100 rounded-full blur-xl -mr-4 -mt-4" />
          <h4 className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-0.5">
            Turnover Cost <span className="text-red-500">**</span>
          </h4>
          <div className="text-lg sm:text-xl font-bold text-red-500 leading-tight mb-0.5">{turnoverRiskAnim.display}</div>
          <p className="text-[8px] sm:text-[9px] text-slate-500 leading-tight">
            Replacing <strong className="text-slate-900 bg-red-50 px-1 rounded">{flightNumAnim.display}</strong>{" "}
            frontline staff who quit due to their manager.
          </p>
        </div>
      </div>

      <div className="px-1 text-[9px] text-slate-500 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100 mt-auto">
        <span className="text-orange-500 font-bold">*</span> <strong>Gallup:</strong> Active disengagement costs ~20%
        of salary in lost productivity.
        <br />
        <span className="text-red-500 font-bold">**</span> <strong>SHRM &amp; DDI:</strong> Poor leadership drives ~33%
        flight risk. Replacement costs avg 50% of base salary.
      </div>
    </div>
  );
}
