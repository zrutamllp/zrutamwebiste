import { Metadata } from "next";
import { SOLUTIONS } from "@/lib/constants";
import SolutionDetailPage from "@/components/SolutionDetailPage";

const solution = SOLUTIONS.find((s) => s.slug === "custom-elearning")!;

export const metadata: Metadata = {
  title: `${solution.title} | Zrutam`,
  description: solution.description,
  openGraph: {
    title: `${solution.title} | Zrutam`,
    description: solution.description,
  },
};

export default function CustomELearningPage() {
  return (
    <SolutionDetailPage
      solution={solution}
      longDescription="Generic off-the-shelf training content often fails to resonate with diverse APAC workforces. Zrutam's Custom E-Learning and Simulations service creates immersive, scenario-based learning experiences specifically contextualized for your industry, culture, and regional market. We leverage industry-leading tools including Articulate Storyline, Camtasia, Eleven Labs AI voice synthesis, and Canva to produce high-quality microlearning modules, interactive simulations, and gamified training experiences. From compliance training to soft skills development, every piece of content is designed to maximize engagement and knowledge retention through real-world scenarios that learners recognize and relate to."
    />
  );
}
