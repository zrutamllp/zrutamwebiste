import { buttonClasses } from "@/components/ui/Button";
import { cardClasses } from "@/components/ui/Card";
import { questions } from "../quizData";
import { slideClasses } from "./QuizPage";

type WelcomeSlideProps = {
  onStart: () => void;
  active: boolean;
};

export default function WelcomeSlide({ onStart, active }: WelcomeSlideProps) {
  return (
    <div className={slideClasses(active)} id="slide-0">
      <div
        className={cardClasses(
          false,
          "w-full max-w-md p-8 text-center sm:p-10"
        )}
      >
        <div className="mb-6 flex justify-center">
          <div className="flex h-24 w-24 rotate-6 items-center justify-center rounded-3xl border border-navy-100 bg-navy-50 shadow-inner transition-transform duration-300 hover:rotate-0">
            <svg
              viewBox="0 0 24 24"
              className="h-12 w-12 -rotate-6 text-teal-600 transition-transform duration-300 hover:rotate-0"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="6" y="3" width="12" height="4" rx="1.5" />
              <path d="M4 7h16v10a2 2 0 01-2 2h-2v2H8v-2H6a2 2 0 01-2-2V7z" />
              <circle cx="9" cy="12" r="1.5" fill="#FAF9F6" />
              <circle cx="15" cy="12" r="1.5" fill="#FAF9F6" />
              <rect x="8" y="15" width="8" height="1" rx="0.5" fill="#FAF9F6" />
            </svg>
          </div>
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-teal-600">
          Interactive Assessment
        </p>
        <h1 className="font-display mb-4 text-3xl leading-[1.1] tracking-tight text-ink sm:text-4xl">
          Discover your{" "}
          <em className="italic text-teal-600">AI level</em>
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-navy-600 sm:text-base">
          Take this quick {questions.length}-question interactive assessment to
          find out your true AI level. Are you a beginner or a prompt wizard?
        </p>
        <button
          type="button"
          onClick={onStart}
          className={buttonClasses("primary", "w-full text-base")}
        >
          Start Assessment
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
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
