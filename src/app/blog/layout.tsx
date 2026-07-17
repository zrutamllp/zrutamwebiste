import { Metadata } from "next";

// page.tsx is a client component (category filter state), so metadata lives here
export const metadata: Metadata = {
  title: "Blog & Insights | Zrutam",
  description:
    "Expert perspectives on leadership development, upskilling, AI in L&D, and workforce transformation across APAC.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
