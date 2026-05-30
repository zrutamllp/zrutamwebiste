import type { QuizQuestion } from "../quizData";

type QuestionSlideProps = {
  question: QuizQuestion;
  questionIndex: number;
  questionCount: number;
  currentSlideIndex: number;
  onSelect: (questionIndex: number, score: number) => void;
};

export default function QuestionSlide({
  question,
  questionIndex,
  questionCount,
  currentSlideIndex,
  onSelect,
}: QuestionSlideProps) {
  const active = currentSlideIndex === questionIndex + 1;

  return (
    <div className={`slide ${active ? "active" : ""}`} id={`slide-${questionIndex + 1}`}>
      <div className="flex flex-col w-full h-full max-w-4xl mx-auto py-8 sm:py-12">
        <div className="mb-8 mt-auto px-4 sm:px-8 text-center sm:text-left">
          <span className="inline-block text-indigo-600 font-bold tracking-widest text-xs uppercase mb-4 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Question {questionIndex + 1} of {questionCount}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
            {question.questionText}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-8 mb-auto pb-12 w-full max-w-4xl mx-auto">
          {question.options.map((option, optionIndex) => {
            const letter = String.fromCharCode(65 + optionIndex);
            return (
              <button
                key={option.text}
                type="button"
                onClick={() => onSelect(questionIndex, option.score)}
                className="w-full text-left bg-white p-4 sm:p-5 md:p-6 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1 transition-all duration-200 flex items-center gap-4 group"
              >
                <div className="w-10 h-10 min-w-[40px] rounded-xl bg-slate-100 group-hover:bg-indigo-600 flex items-center justify-center text-slate-500 group-hover:text-white font-bold transition-colors shadow-sm">
                  {letter}
                </div>
                <span className="text-base sm:text-lg font-medium text-slate-700 group-hover:text-slate-900">
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
