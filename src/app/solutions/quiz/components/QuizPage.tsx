"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { levels, questions, type QuizLevel } from "../quizData";
import ProgressBar from "./ProgressBar";
import WelcomeSlide from "./WelcomeSlide";
import QuestionSlide from "./QuestionSlide";
import ResultSlide from "./ResultSlide";
import ConfettiCanvas from "./ConfettiCanvas";

const maxPossibleScore = questions.length * 2;

export default function QuizPage() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [shouldCelebrate, setShouldCelebrate] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const answeredCount =
    currentSlideIndex > 0 && currentSlideIndex <= questions.length
      ? currentSlideIndex - 1
      : questions.length;

  const progress =
    currentSlideIndex > questions.length
      ? 100
      : (answeredCount / questions.length) * 100;

  const totalScore = useMemo(
    () => Object.values(userAnswers).reduce((sum, score) => sum + score, 0),
    [userAnswers]
  );

  const userLevel: QuizLevel = useMemo(() => {
    return (
      levels.find(
        (level) => totalScore >= level.minScore && totalScore <= level.maxScore
      ) ?? levels[0]
    );
  }, [totalScore]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (currentSlideIndex === questions.length + 1) {
      setShouldCelebrate(totalScore >= maxPossibleScore * 0.75);
    }
  }, [currentSlideIndex, totalScore]);

  const handleStart = () => {
    setCurrentSlideIndex(1);
  };

  const handleSelect = (questionIndex: number, score: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: score }));
    timeoutRef.current = window.setTimeout(() => {
      setCurrentSlideIndex((prev) => prev + 1);
    }, 250);
  };

  const handleRetake = () => {
    setUserAnswers({});
    setCurrentSlideIndex(0);
    setShouldCelebrate(false);
  };

  return (
    <div className="grain min-h-screen w-full overflow-hidden bg-paper pt-24 md:pt-28">
      <ProgressBar progress={progress} />
      <div
        id="quizContainer"
        className="relative mx-auto w-full max-w-6xl px-2 sm:px-6"
        style={{ minHeight: "calc(100vh - 7rem)" }}
      >
        <WelcomeSlide onStart={handleStart} active={currentSlideIndex === 0} />

        {questions.map((question, index) => (
          <QuestionSlide
            key={question.questionText}
            question={question}
            questionIndex={index}
            questionCount={questions.length}
            currentSlideIndex={currentSlideIndex}
            onSelect={handleSelect}
          />
        ))}

        <ResultSlide
          userLevel={userLevel}
          totalScore={totalScore}
          maxPossibleScore={maxPossibleScore}
          onRetake={handleRetake}
          active={currentSlideIndex > questions.length}
        />
      </div>
      <ConfettiCanvas active={shouldCelebrate} />
    </div>
  );
}
