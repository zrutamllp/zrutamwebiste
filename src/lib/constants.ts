export const SITE_NAME = "Zrutam";
export const SITE_URL = "https://www.zrutam.com";
export const SITE_DESCRIPTION =
  "AI-powered corporate L&D solutions for leadership development, upskilling, and reskilling across India, Middle East, and Southeast Asia.";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions", children: [
    { label: "Leadership Development", href: "/solutions/leadership-development" },
    { label: "IDP Tool (RSI\u2122)", href: "/solutions/idp-tool" },
    { label: "Upskilling & Reskilling", href: "/solutions/upskilling-reskilling" },
    { label: "Custom E-Learning", href: "/solutions/custom-elearning" },
    { label: "AI Skills Assessment", href: "/solutions/ai-skills-assessment" },
  ]},
  { label: "Tools", href: "/tools/idp", children: [
    { label: "IDP Tool", href: "/tools/idp" },
    { label: "Zrutam 360", href: "/tools/360" },
  ]},
  { label: "Clients", href: "/clients" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SOLUTIONS = [
  {
    title: "Leadership Development Programs",
    slug: "leadership-development",
    shortTitle: "Leadership Development",
    description: "AI-adaptive learning paths, scenario simulations, and executive coaching for mid-to-large enterprises.",
    icon: "leadership",
    features: [
      "AI-adaptive learning paths tailored to individual leadership styles",
      "Scenario-based simulations for real-world decision making",
      "Executive coaching and mentorship programs",
      "360-degree feedback integration",
      "Measurable ROI tracking and analytics",
    ],
    targetAudience: "CHROs, L&D Heads at mid-to-large enterprises",
    highlight: "Highest search volume in APAC L&D market",
  },
  {
    title: "IDP Tool (Proprietary RSI\u2122)",
    slug: "idp-tool",
    shortTitle: "IDP Tool",
    description: "White-labeled, LMS-integrated Individual Development Plan tool powered by our proprietary RSI\u2122 Career Driver Assessment.",
    icon: "idp",
    features: [
      "RSI\u2122 Career Driver Assessment \u2014 unique IP",
      "White-labeled for your organization",
      "LMS integration ready",
      "Downloadable IDP goals and branded experience",
      "Secure data hosting and compliance",
    ],
    targetAudience: "HR Teams, L&D Managers",
    highlight: "Most defensible differentiator",
  },
  {
    title: "Upskilling & Reskilling Solutions",
    slug: "upskilling-reskilling",
    shortTitle: "Upskilling & Reskilling",
    description: "Skills-first approach to internal mobility, competency mapping, and workforce transformation.",
    icon: "upskilling",
    features: [
      "Skills-first workforce transformation",
      "Internal mobility and career pathing",
      "Competency mapping and gap analysis",
      "Aligned with WEF 2027 workforce projections",
      "Integration with existing HRIS systems",
    ],
    targetAudience: "CHROs, Talent Development Leaders",
    highlight: "Nearly 50% of global workforce needs upskilling by 2027 (WEF)",
  },
  {
    title: "Custom E-Learning & Simulations",
    slug: "custom-elearning",
    shortTitle: "Custom E-Learning",
    description: "Scenario-based, immersive, APAC-context content with microlearning modules and gamification.",
    icon: "elearning",
    features: [
      "Scenario-based immersive content",
      "APAC-contextualized learning experiences",
      "Built with Articulate, Camtasia, Eleven Labs, Canva",
      "Microlearning modules for on-the-go training",
      "Gamification elements for engagement",
    ],
    targetAudience: "L&D Teams, Training Managers",
    highlight: "Immersive, APAC-context content",
  },
  {
    title: "AI-Powered Skills Assessment",
    slug: "ai-skills-assessment",
    shortTitle: "AI Skills Assessment",
    description: "Real-time skill gap identification and analytics that integrates with your existing LMS/HRIS.",
    icon: "assessment",
    features: [
      "Real-time skill gap identification",
      "Advanced analytics and reporting",
      "Integrates with existing LMS/HRIS",
      "Feeds into IDP Tool and career path planning",
      "AI-powered recommendations",
    ],
    targetAudience: "HR Analytics Teams, CHROs",
    highlight: "Real-time skill gap identification and analytics",
  },
];

export const STATS = [
  { value: 500, suffix: "+", label: "Leaders Trained" },
  { value: 50, suffix: "+", label: "Corporate Clients" },
  { value: 12, suffix: "+", label: "Countries Served" },
  { value: 95, suffix: "%", label: "Client Satisfaction" },
];

export const BLOG_POSTS = [
  {
    slug: "why-idps-fail-and-how-to-fix-them",
    title: "Why IDPs Fail \u2014 And How to Fix Them",
    excerpt: "Individual Development Plans are a cornerstone of talent development, yet most fail to deliver results. Discover the common pitfalls and actionable strategies to make IDPs work.",
    category: "IDP & Career Development",
    date: "2026-03-01",
    readTime: "6 min read",
    keyword: "IDP tool for HR",
  },
  {
    slug: "upskilling-vs-reskilling-what-chros-need-to-know",
    title: "Upskilling vs Reskilling: What CHROs Need to Know in 2025",
    excerpt: "The distinction between upskilling and reskilling matters more than ever. Learn how forward-thinking CHROs are building skills-first organizations.",
    category: "Upskilling & Reskilling",
    date: "2026-02-20",
    readTime: "7 min read",
    keyword: "upskilling reskilling India",
  },
  {
    slug: "ai-in-leadership-development-india-market",
    title: "AI in Leadership Development: India Market Perspective",
    excerpt: "India's leadership development market is undergoing an AI revolution. Explore how enterprises are leveraging AI to build their next generation of leaders.",
    category: "Leadership",
    date: "2026-02-10",
    readTime: "8 min read",
    keyword: "leadership development AI India",
  },
  {
    slug: "how-to-measure-ld-roi-practical-guide",
    title: "How to Measure L&D ROI: A Practical Guide",
    excerpt: "Proving the ROI of learning and development initiatives is one of the biggest challenges for L&D professionals. Here is a practical framework.",
    category: "L&D Strategy",
    date: "2026-01-28",
    readTime: "5 min read",
    keyword: "L&D ROI measurement",
  },
  {
    slug: "building-skills-first-organisation-apac",
    title: "Building a Skills-First Organisation in APAC",
    excerpt: "The shift from role-based to skills-based talent management is reshaping how APAC organizations attract, develop, and retain talent.",
    category: "Upskilling & Reskilling",
    date: "2026-01-15",
    readTime: "6 min read",
    keyword: "skills-first talent strategy APAC",
  },
];
