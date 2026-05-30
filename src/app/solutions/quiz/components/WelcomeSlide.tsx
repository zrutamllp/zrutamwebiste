type WelcomeSlideProps = {
  onStart: () => void;
  active: boolean;
};

export default function WelcomeSlide({ onStart, active }: WelcomeSlideProps) {
  return (
    <div className={`slide ${active ? "active" : ""}`} id="slide-0">
      <div className="text-center max-w-md w-full bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl border border-slate-100">
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 rounded-3xl bg-indigo-50 flex items-center justify-center border border-indigo-100 shadow-inner transform rotate-12 transition-transform hover:rotate-0 duration-300">
            <svg
              viewBox="0 0 24 24"
              className="w-12 h-12 text-indigo-500 transform -rotate-12 hover:rotate-0 transition-transform duration-300"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="6" y="3" width="12" height="4" rx="1.5" />
              <path d="M4 7h16v10a2 2 0 01-2 2h-2v2H8v-2H6a2 2 0 01-2-2V7z" />
              <circle cx="9" cy="12" r="1.5" fill="white" />
              <circle cx="15" cy="12" r="1.5" fill="white" />
              <rect x="8" y="15" width="8" height="1" rx="0.5" fill="white" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-slate-800">
          Discover Your <br />
          <span className="text-gradient">AI Mastery</span>
        </h1>
        <p className="text-slate-500 mb-8 text-sm sm:text-base leading-relaxed">
          Take this quick 11-question interactive quiz to find out your true AI level. Are you a beginner or a prompt wizard?
        </p>
        <button
          type="button"
          onClick={onStart}
          className="w-full px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1 active:translate-y-0 text-lg flex justify-center items-center gap-3"
        >
          Start Quiz
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
