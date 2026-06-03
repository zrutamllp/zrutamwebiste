import { Metadata } from "next";
import QuizPage from "./components/QuizPage";

export const metadata: Metadata = {
  title: "AI Assessment | Zrutam",
  description:
    "Discover your AI readiness with our interactive assessment and learn where you stand in prompt engineering, hallucinations, model knowledge, and more.",
};

export default function QuizRoutePage() {
  return <QuizPage />;
}
