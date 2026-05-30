import { Metadata } from "next";
import QuizPage from "./components/QuizPage";

export const metadata: Metadata = {
  title: "AI Mastery Quiz | Zrutam",
  description:
    "Discover your AI Mastery level with our interactive quiz and learn where you stand in prompt engineering, hallucinations, model knowledge, and more.",
};

export default function QuizRoutePage() {
  return <QuizPage />;
}
