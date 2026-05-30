export const SITE_NAME = "Zrutam";
export const SITE_URL = "https://www.zrutam.com";
export const SITE_DESCRIPTION =
  "AI-powered corporate L&D solutions for leadership development, upskilling, and reskilling across India, Middle East, and Southeast Asia.";

export const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Leadership Development", href: "/solutions/leadership-development" },
      { label: "IDP Tool (RSI™)", href: "/solutions/idp-tool" },
      { label: "Upskilling & Reskilling", href: "/solutions/upskilling-reskilling" },
      { label: "Custom E-Learning", href: "/solutions/custom-elearning" },
      { label: "AI Skills Assessment", href: "/solutions/ai-skills-assessment" },
      { label: "AI Mastery Quiz", href: "/solutions/quiz" },
      { label: "Accelerator", href: "/solutions/accelerator" },
    ],
  },
  {
    label: "Tools",
    href: "/tools/idp",
    children: [
      { label: "IDP Tool", href: "/tools/idp" },
      { label: "Zrutam 360", href: "/tools/360" },
      { label: "Risk Calculator", href: "/360-calculator" },
    ],
  },
  { label: "Clients", href: "/clients" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Profile", href: "/profile" },
];
