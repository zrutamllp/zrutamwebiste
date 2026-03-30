import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organizational Risk Calculator | Zrutam",
  description:
    "Calculate the hidden financial cost of underdeveloped frontline leadership. Free interactive tool for CHROs and HR Directors.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
