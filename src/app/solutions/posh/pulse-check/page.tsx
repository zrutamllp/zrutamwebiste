import { Metadata } from "next";
import PoshPulse from "../components/PoshPulse";

export const metadata: Metadata = {
  title: "POSH Pulse Check | Zrutam",
  description:
    "Where do you stand with POSH? Ten quick workplace situations reveal which of four profiles you are — and the one blind spot to fix.",
  openGraph: {
    title: "POSH Pulse Check | Zrutam",
    description:
      "Ten quick workplace situations reveal which of four POSH profiles you are — and the one blind spot to fix.",
  },
};

export default function PoshPage() {
  return <PoshPulse />;
}
