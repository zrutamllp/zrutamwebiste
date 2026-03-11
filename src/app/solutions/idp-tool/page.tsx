import { Metadata } from "next";
import { SOLUTIONS } from "@/lib/constants";
import SolutionDetailPage from "@/components/SolutionDetailPage";

const solution = SOLUTIONS.find((s) => s.slug === "idp-tool")!;

export const metadata: Metadata = {
  title: `${solution.title} | Zrutam`,
  description: solution.description,
  openGraph: {
    title: `${solution.title} | Zrutam`,
    description: solution.description,
  },
};

export default function IDPToolPage() {
  return (
    <SolutionDetailPage
      solution={solution}
      longDescription="The Zrutam IDP Tool is built on our proprietary RSI (Role-Skill-Interest) Career Driver Assessment, a unique intellectual property that sets us apart in the market. This white-labeled platform integrates seamlessly with your existing LMS and HR systems, enabling employees to create personalized Individual Development Plans that align their career aspirations with organizational goals. The RSI assessment identifies three critical career drivers for each individual, generating data-driven recommendations for skill development, role transitions, and learning pathways. Organizations can brand the experience as their own while benefiting from Zrutam's AI engine, downloadable goal reports, and secure data hosting that meets enterprise compliance requirements."
    />
  );
}
