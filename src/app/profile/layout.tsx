import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shobhraj Sharma | Partner, Zrutam LLP – OD & Leadership Expert",
  description:
    "20+ years architecting leadership development, AI-driven learning ecosystems, and global succession pipelines for Fortune 500 enterprises.",
  openGraph: {
    title: "Shobhraj Sharma | Partner, Zrutam LLP",
    description:
      "20+ years architecting leadership development and organizational scale for Fortune 500 enterprises.",
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout renders children WITHOUT the site's Navbar/Footer
  // so the profile page can have its own standalone design
  return <>{children}</>;
}
