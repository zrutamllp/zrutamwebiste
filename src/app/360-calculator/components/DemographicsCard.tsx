type NumberOrEmpty = number | "";

type DemographicsCardProps = {
  total: NumberOrEmpty;
  salary: NumberOrEmpty;
  senior: NumberOrEmpty;
  middle: NumberOrEmpty;
  flm: NumberOrEmpty;
  currency: "USD" | "INR";
  errorMsg: string;
  setTotal: (value: NumberOrEmpty) => void;
  setSalary: (value: NumberOrEmpty) => void;
  setSenior: (value: NumberOrEmpty) => void;
  setMiddle: (value: NumberOrEmpty) => void;
  setFlm: (value: NumberOrEmpty) => void;
  toggleCurrency: (target: "USD" | "INR") => void;
};

export function DemographicsCard({
  total,
  salary,
  senior,
  middle,
  flm,
  currency,
  errorMsg,
  setTotal,
  setSalary,
  setSenior,
  setMiddle,
  setFlm,
  toggleCurrency,
}: DemographicsCardProps) {
  return (
    <div className="bg-white/85 backdrop-blur-xl border border-black/[0.08] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.01)] p-5 sm:p-6 rounded-2xl relative z-10">
      <div className="flex items-center gap-3 mb-4 border-b border-slate-200 pb-3">
        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-slate-900 leading-tight">Company Demographics</h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-semibold text-slate-500 mb-1.5">
              Total Headcount
            </label>
            <input
              type="number"
              value={total}
              placeholder="Enter your headcount"
              onChange={(e) => setTotal(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-lg text-sm font-bold bg-white border border-slate-300 text-slate-900 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.02)] focus:outline-none focus:border-orange-500 focus:bg-orange-50/30 focus:ring-[3px] focus:ring-orange-500/20 transition-all placeholder:font-normal placeholder:text-slate-400"
            />
          </div>
          <div>
            <div className="flex justify-between items-end mb-1.5">
              <label className="block text-[10px] uppercase tracking-widest font-semibold text-slate-500">
                Avg. Base Salary
              </label>
              <div className="flex bg-slate-200 rounded p-0.5 border border-slate-300 items-center">
                <button
                  onClick={() => toggleCurrency("USD")}
                  className={`text-[9px] px-2 py-0.5 rounded-sm transition-all ${
                    currency === "USD"
                      ? "bg-white text-slate-800 font-bold shadow-sm"
                      : "text-slate-500 bg-transparent hover:text-slate-800"
                  }`}
                >
                  USD
                </button>
                <button
                  onClick={() => toggleCurrency("INR")}
                  className={`text-[9px] px-2 py-0.5 rounded-sm transition-all ${
                    currency === "INR"
                      ? "bg-white text-slate-800 font-bold shadow-sm"
                      : "text-slate-500 bg-transparent hover:text-slate-800"
                  }`}
                >
                  INR
                </button>
              </div>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                {currency === "USD" ? "$" : "\u20B9"}
              </span>
              <input
                type="number"
                value={salary}
                placeholder="Avg. frontline salary"
                onChange={(e) => setSalary(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full pl-7 pr-3 py-2.5 rounded-lg text-sm font-bold bg-white border border-slate-300 text-slate-900 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.02)] focus:outline-none focus:border-orange-500 focus:bg-orange-50/30 focus:ring-[3px] focus:ring-orange-500/20 transition-all placeholder:font-normal placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-1">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-semibold text-slate-500 mb-1.5">
              Top <span className="hidden sm:inline">(VP+)</span>
            </label>
            <input
              type="number"
              value={senior}
              placeholder="e.g. 50"
              onChange={(e) => setSenior(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg text-sm font-bold bg-white border border-slate-300 text-slate-900 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.02)] focus:outline-none focus:border-orange-500 focus:bg-orange-50/30 focus:ring-[3px] focus:ring-orange-500/20 transition-all placeholder:font-normal placeholder:text-slate-400"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-semibold text-slate-500 mb-1.5">
              Middle <span className="hidden sm:inline">(Dir)</span>
            </label>
            <input
              type="number"
              value={middle}
              placeholder="e.g. 200"
              onChange={(e) => setMiddle(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg text-sm font-bold bg-white border border-slate-300 text-slate-900 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.02)] focus:outline-none focus:border-orange-500 focus:bg-orange-50/30 focus:ring-[3px] focus:ring-orange-500/20 transition-all placeholder:font-normal placeholder:text-slate-400"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-semibold text-orange-600 mb-1.5 drop-shadow-sm">
              Frontline <span className="hidden sm:inline">(Mgrs)</span>
            </label>
            <input
              type="number"
              value={flm}
              placeholder="e.g. 350"
              onChange={(e) => setFlm(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg text-sm font-bold text-orange-600 border-orange-300 bg-orange-50 shadow-[inset_0_1px_3px_rgba(249,115,22,0.1)] focus:outline-none focus:border-orange-500 focus:ring-[3px] focus:ring-orange-500/20 transition-all placeholder:font-normal placeholder:text-slate-400 placeholder:text-orange-300"
            />
          </div>
        </div>

        {errorMsg && <p className="text-red-500 text-[11px] font-semibold mt-1">{errorMsg}</p>}
      </div>
    </div>
  );
}
