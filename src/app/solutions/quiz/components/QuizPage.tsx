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
    <div className="min-h-screen w-screen overflow-hidden bg-slate-50">
      <ProgressBar progress={progress} />
      <div id="quizContainer" className="relative w-full min-h-screen">
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

      <style jsx global>{`
        .progress-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 6px;
          background-color: #e2e8f0;
          z-index: 50;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          width: 0%;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          pointer-events: none;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          box-sizing: border-box;
          overflow-y: auto;
        }

        .slide.active {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
          z-index: 10;
        }

        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }

        .text-gradient {
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-image: linear-gradient(90deg, #4f46e5, #ec4899);
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
