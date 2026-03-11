import { Metadata } from "next";
import { SOLUTIONS } from "@/lib/constants";
import SolutionDetailPage from "@/components/SolutionDetailPage";

const solution = SOLUTIONS.find((s) => s.slug === "ai-skills-assessment")!;

export const metadata: Metadata = {
  title: `${solution.title} | Zrutam`,
  description: solution.description,
  openGraph: {
    title: `${solution.title} | Zrutam`,
    description: solution.description,
  },
};

export default function AISkillsAssessmentPage() {
  return (
    <SolutionDetailPage
      solution={solution}
      longDescription="Making informed talent decisions requires accurate, real-time data about your workforce's capabilities. Zrutam's AI-Powered Skills Assessment platform goes beyond traditional assessments by using machine learning algorithms to identify skill gaps, predict future competency needs, and generate actionable insights that integrate directly with your existing LMS and HRIS infrastructure. The assessment results feed seamlessly into our IDP Tool and career path planning modules, creating a connected ecosystem where assessment data drives personalized development recommendations. HR analytics teams and CHROs gain access to comprehensive dashboards that reveal organizational skill landscapes, enabling strategic workforce planning that stays ahead of market demands."
    />
  );
}
