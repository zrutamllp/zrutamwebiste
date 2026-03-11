import { Metadata } from "next";
import { SOLUTIONS } from "@/lib/constants";
import SolutionDetailPage from "@/components/SolutionDetailPage";

const solution = SOLUTIONS.find((s) => s.slug === "upskilling-reskilling")!;

export const metadata: Metadata = {
  title: `${solution.title} | Zrutam`,
  description: solution.description,
  openGraph: {
    title: `${solution.title} | Zrutam`,
    description: solution.description,
  },
};

export default function UpskillingReskillingPage() {
  return (
    <SolutionDetailPage
      solution={solution}
      longDescription="With nearly fifty percent of the global workforce needing upskilling by 2027 according to the World Economic Forum, organizations can no longer afford a reactive approach to talent development. Zrutam's Upskilling and Reskilling Solutions take a skills-first approach to workforce transformation, combining AI-driven competency mapping with strategic internal mobility pathways. Our platform identifies skill gaps across your organization in real time, recommends targeted learning interventions, and tracks progress toward skill proficiency goals. By aligning workforce capabilities with business strategy, we help CHROs and talent development leaders build agile, future-ready teams that can adapt to rapid market changes across India, the Middle East, and Southeast Asia."
    />
  );
}
