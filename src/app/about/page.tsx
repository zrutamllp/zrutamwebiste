import { Metadata } from "next";
import CTABanner from "@/shared/components/CTABanner";
import AwardsSection from "@/shared/components/AwardsSection";
import AboutHero from "./components/AboutHero";
import MissionVisionSection from "./components/MissionVisionSection";
import ValuesSection from "./components/ValuesSection";
import TeamSection from "./components/TeamSection";
import MarketsSection from "./components/MarketsSection";

export const metadata: Metadata = {
  title: "About Zrutam | AI-Powered L&D Company",
  description:
    "Zrutam is an AI-powered Learning & Development company transforming how enterprises develop talent across India, Middle East, and Southeast Asia.",
  openGraph: {
    title: "About Zrutam | AI-Powered L&D Company",
    description:
      "Transforming workforce development across APAC with AI-powered learning solutions.",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionVisionSection />
      <ValuesSection />
      <AwardsSection />
      <TeamSection />
      <MarketsSection />

      <CTABanner
        title="Ready to Transform Your Workforce?"
        subtitle="Partner with Zrutam to build a future-ready organization with AI-powered learning solutions."
        primaryCTA={{ text: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ text: "Explore Solutions", href: "/solutions" }}
      />
    </>
  );
}
