import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { cardClasses } from "@/components/ui/Card";
import type { QuizLevel } from "../quizData";
import { slideClasses } from "./QuizPage";

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
    <div className={slideClasses(active)} id="slide-result">
      <div
        id="result-container"
        className="flex h-full w-full items-center justify-center p-4"
      >
        <div
          className={cardClasses(
            false,
            "mx-auto w-full max-w-md p-8 text-center sm:p-10"
          )}
        >
          <div
            className={`mx-auto mb-6 flex h-20 w-20 rotate-3 items-center justify-center rounded-2xl bg-gradient-to-br ${userLevel.color} text-white shadow-lift`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 2h8l1 4h3v2.5a6.5 6.5 0 01-5 6.371V16a4 4 0 01-8 0v-1.129A6.5 6.5 0 014 8.5V6h3l1-4zM7 6h10v2.5a4.5 4.5 0 01-3 4.33V14a2 2 0 01-4 0v-1.17A4.5 4.5 0 017 8.5V6z" />
            </svg>
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-teal-600">
            Your AI Level
          </p>
          <h2 className="font-display mb-6 text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
            {userLevel.title}
          </h2>
          <div className="mb-6 inline-flex items-center justify-center rounded-2xl border border-navy-100 bg-paper-warm px-6 py-3">
            <div className="text-left">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-navy-500">
                Total Score
              </span>
              <span className="text-3xl font-bold text-ink">
                {totalScore}
                <span className="text-xl font-semibold text-navy-400">
                  /{maxPossibleScore}
                </span>
              </span>
            </div>
          </div>
          <p className="mb-8 text-sm leading-relaxed text-navy-600 sm:text-base">
            {userLevel.description}
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/contact/?interest=ai-skills-assessment"
              className={buttonClasses("primary", "w-full")}
            >
              Assess your whole team
            </Link>
            <button
              type="button"
              onClick={onRetake}
              className={buttonClasses("outline", "w-full")}
            >
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
                <path d="M3 12a9 9 0 0114.97-6.364" />
                <path d="M3 12v5h5" />
                <path d="M21 12a9 9 0 00-8.97-8.364" />
              </svg>
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
