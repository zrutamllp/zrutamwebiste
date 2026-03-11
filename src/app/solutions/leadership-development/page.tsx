import { Metadata } from "next";
import { SOLUTIONS } from "@/lib/constants";
import SolutionDetailPage from "@/components/SolutionDetailPage";

const solution = SOLUTIONS.find((s) => s.slug === "leadership-development")!;

export const metadata: Metadata = {
  title: `${solution.title} | Zrutam`,
  description: solution.description,
  openGraph: {
    title: `${solution.title} | Zrutam`,
    description: solution.description,
  },
};

export default function LeadershipDevelopmentPage() {
  return (
    <SolutionDetailPage
      solution={solution}
      longDescription="In today's fast-evolving business landscape, developing effective leaders is no longer optional. Zrutam's Leadership Development Programs leverage cutting-edge AI to create adaptive learning paths that respond to each leader's unique strengths, gaps, and growth trajectory. Our platform combines scenario-based simulations drawn from real APAC business contexts, executive coaching from seasoned industry leaders, and 360-degree feedback integration to provide a holistic development experience. Whether you are grooming first-time managers or preparing C-suite successors, our programs deliver measurable improvements in leadership effectiveness, team performance, and organizational outcomes. With the highest search volume in the APAC L&D market, leadership development remains the cornerstone of enterprise talent strategy."
    />
  );
}
