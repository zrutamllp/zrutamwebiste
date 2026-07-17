import { Metadata } from "next";

// page.tsx is a client component, so metadata lives here (same pattern as /360-calculator)
export const metadata: Metadata = {
  title: "Zrutam 360° Assessment | Zrutam",
  description:
    "Frictionless 10-15 minute 360-degree feedback built for frontline managers. Clear, prioritized insights instead of 40-page reports — starting at ₹1,999 per person.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
