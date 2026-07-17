import type { QuizQuestion } from "../quizData";
import { slideClasses } from "./QuizPage";

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
    <div className={slideClasses(active)} id={`slide-${questionIndex + 1}`}>
      <div className="mx-auto flex h-full w-full max-w-4xl flex-col py-8 sm:py-12">
        <div className="mb-8 mt-auto px-4 text-center sm:px-8 sm:text-left">
          <span className="mb-4 inline-block rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-teal-600">
            Question {questionIndex + 1} of {questionCount}
          </span>
          <h2 className="font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl md:text-4xl">
            {question.questionText}
          </h2>
        </div>
        <div className="mx-auto mb-auto grid w-full max-w-4xl grid-cols-1 gap-4 px-4 pb-12 sm:grid-cols-2 sm:px-8">
          {question.options.map((option, optionIndex) => {
            const letter = String.fromCharCode(65 + optionIndex);
            return (
              <button
                key={option.text}
                type="button"
                onClick={() => onSelect(questionIndex, option.score)}
                className="group flex w-full items-center gap-4 rounded-2xl border border-navy-200 bg-white p-4 text-left shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-teal-500 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 sm:p-5 md:p-6"
              >
                <div className="flex h-10 w-10 min-w-[40px] items-center justify-center rounded-xl bg-navy-50 font-semibold text-navy-500 shadow-sm transition-colors group-hover:bg-ink group-hover:text-paper">
                  {letter}
                </div>
                <span className="text-base font-medium text-navy-700 group-hover:text-ink sm:text-lg">
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
