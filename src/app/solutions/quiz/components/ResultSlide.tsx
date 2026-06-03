import type { QuizLevel } from "../quizData";

type ResultSlideProps = {
  userLevel: QuizLevel;
  totalScore: number;
  maxPossibleScore: number;
  onRetake: () => void;
  active: boolean;
};

export default function ResultSlide({
  userLevel,
  totalScore,
  maxPossibleScore,
  onRetake,
  active,
}: ResultSlideProps) {
  return (
    <div className={`slide ${active ? "active" : ""}`} id="slide-result">
      <div id="result-container" className="flex items-center justify-center w-full h-full p-4">
        <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 max-w-md w-full mx-auto text-center transform transition-all duration-500 scale-100 animate-fade-in-up">
          <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${userLevel.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-100 text-white transform rotate-3`}>
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 2h8l1 4h3v2.5a6.5 6.5 0 01-5 6.371V16a4 4 0 01-8 0v-1.129A6.5 6.5 0 014 8.5V6h3l1-4zM7 6h10v2.5a4.5 4.5 0 01-3 4.33V14a2 2 0 01-4 0v-1.17A4.5 4.5 0 017 8.5V6z" />
            </svg>
          </div>
          <p className="text-slate-400 uppercase tracking-widest text-xs font-bold mb-2">Your AI Level</p>
          <h2 className={`text-3xl sm:text-4xl font-extrabold mb-6 bg-gradient-to-r ${userLevel.color} text-transparent bg-clip-text leading-tight`}>
            {userLevel.title}
          </h2>
          <div className="inline-flex justify-center items-center mb-6 bg-slate-50 rounded-2xl px-6 py-3 border border-slate-100">
            <div className="text-left">
              <span className="text-slate-400 text-xs font-bold uppercase block mb-1">Total Score</span>
              <span className="text-3xl font-black text-slate-800">
                {totalScore}
                <span className="text-xl text-slate-400 font-bold">/{maxPossibleScore}</span>
              </span>
            </div>
          </div>
          <p className="text-slate-600 mb-8 leading-relaxed text-sm sm:text-base">
            {userLevel.description}
          </p>
          <button
            type="button"
            onClick={onRetake}
            className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-lg transition-all hover:shadow-xl flex items-center justify-center gap-2"
          >
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
              <path d="M3 12a9 9 0 0114.97-6.364" />
              <path d="M3 12v5h5" />
              <path d="M21 12a9 9 0 00-8.97-8.364" />
            </svg>
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
