import { Cpu, Layers, Target, Users, ArrowRight, Presentation, Gamepad2, Image as ImageIcon, MonitorPlay } from "lucide-react";

export const mediaItems = [
  {
    type: "video",
    tab: "video",
    title: "Global Leadership Offsite 2023",
    subtitle: "Recap of the 500+ leader strategic alignment intervention.",
    imageSrc: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    link: "#",
  },
  {
    type: "game",
    tab: "game",
    title: "Leadership Escape Room",
    subtitle: "A custom gamified simulation built for Coca-Cola talent assessment.",
    imageSrc: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop",
    link: "#",
  },
  {
    type: "image",
    tab: "workshop",
    title: "Cultural Transformation Workshop",
    subtitle: "Facilitating a large group intervention (LGI) for enterprise executives.",
    imageSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    link: "#",
  },
  {
    type: "video",
    tab: "video",
    title: "First-Time Manager E-Learning",
    subtitle: "Trailer for the AI-driven digital learning journey.",
    imageSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    link: "#",
  },
  {
    type: "game",
    tab: "game",
    title: "Business Strategy Simulation",
    subtitle: "Interactive multiplayer simulation for supply chain leaders.",
    imageSrc: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    link: "#",
  },
  {
    type: "image",
    tab: "workshop",
    title: "Executive Coaching Session",
    subtitle: "High-touch strategic alignment with C-suite leadership.",
    imageSrc: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
    link: "#",
  },
];

export const marqueeCompanies = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg", name: "HSBC", className: "h-5 md:h-8 px-2" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", name: "Amazon", className: "h-6 md:h-10 px-2" },
  { src: "https://logo.clearbit.com/cdkglobal.com", name: "CDK", className: "h-6 md:h-10 px-2" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg", name: "HP", className: "h-6 md:h-10 px-2" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg", name: "Coca-Cola", className: "h-5 md:h-8 px-2" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Vodafone_icon.svg", name: "Vodafone", className: "h-6 md:h-10 px-2" },
];

export const portfolioTabs = [
  { id: "all", label: "View All", icon: null },
  { id: "video", label: "Videos", icon: MonitorPlay },
  { id: "game", label: "Games", icon: Gamepad2 },
  { id: "workshop", label: "Gallery", icon: ImageIcon },
];

export const services = [
  { icon: Presentation, title: "Large Group Interventions (LGI)", desc: "Aligning senior management with strategic goals through immersive, large-scale executive offsites." },
  { icon: Target, title: "First-Time Manager Programs", desc: "Equipping new leaders with foundational skills and behavioral insights to drive immediate team success." },
  { icon: Cpu, title: "Custom E-Learning & AI Journeys", desc: "Designing SCORM-compliant, AI-driven learning ecosystems and gamified digital experiences optimized for scale." },
  { icon: Layers, title: "360° Multirater & Psychometrics", desc: "Deploying proprietary assessment tools to identify competency gaps and build robust succession pipelines." },
  { icon: Users, title: "Executive Coaching & Facilitation", desc: "High-touch, personalized coaching for C-suite and senior leaders focusing on strategic alignment." },
  { icon: ArrowRight, title: "Succession Planning Models", desc: "Architecting global talent pipelines and comprehensive assessment frameworks to future-proof your bench." },
];

export const timelineNodes = [
  {
    company: "Zrutam LLP",
    role: "Partner & Lead Consultant",
    logoSrc: "",
    isCurrent: true,
    description:
      "Leading the strategic direction of bespoke OD interventions, combining traditional high-touch facilitation with modern learning technologies for enterprise clients.",
    highlights: [
      "Architecting bespoke leadership development workshops and executive offsites.",
      "Designing and deploying proprietary multirater (360) assessment tools and e-learning ecosystems.",
      "Conducting comprehensive organizational assessments and Large Group Interventions (LGI).",
    ],
  },
  {
    company: "CDK Global",
    role: "Head of Learning & OD",
    logoSrc: "https://logo.clearbit.com/cdkglobal.com",
    isCurrent: false,
    description:
      "Directed comprehensive learning and talent development strategies for global engineering cohorts, focusing on skill proficiency and cultural transformation.",
    highlights: [
      "Led Great Place to Work (GPTW) initiatives, driving measurable engagement improvements.",
      "Launched scalable AI-based assessment tools and 360-degree feedback systems.",
      "Designed AI-driven learning journeys to optimize engineering performance.",
    ],
  },
  {
    company: "HSBC",
    role: "Head of Strategy (Learning & OD)",
    logoSrc: "https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg",
    isCurrent: false,
    description:
      "Orchestrated global skill development frameworks and career management philosophies across a massive international footprint.",
    highlights: [
      "Scaled talent strategies for a workforce of 72,000+ employees across 12 countries.",
      "Designed and established a global, organization-wide Academy of Excellence.",
      "Ensured integration of complex cultural nuances into unified performance standards.",
    ],
  },
  {
    company: "Coca-Cola",
    role: "Learning & Leadership Head",
    logoSrc: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg",
    isCurrent: false,
    description:
      "Managed multidisciplinary teams of designers and facilitators to optimize talent processes and digital learning platforms.",
    highlights: [
      "Architected robust talent assessment centers and internal career mobility programs.",
      "Designed immersive learning experiences, including VR onboarding and leadership simulations.",
    ],
  },
  {
    company: "HP Inc.",
    role: "Global Talent Architect",
    logoSrc: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg",
    isCurrent: false,
    description:
      "Partnered with senior leadership to design OD solutions, focusing on executive team development and enterprise capability.",
    highlights: [
      "Established global skill academies supporting 55,000+ technical and non-technical employees.",
      "Facilitated strategic change management and deployed comprehensive Hi-Po leadership programs.",
    ],
  },
  {
    company: "Amazon",
    role: "Partner, Learning & Instructional Design",
    logoSrc: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    isCurrent: false,
    description:
      "Collaborated with executive leadership to architect global learning programs that reinforced corporate culture and elevated organizational capability.",
    highlights: [
      "Core architect in the design and rollout of enterprise succession models and assessment centers.",
      "Spearheaded comprehensive LMS infrastructure implementations to scale global initiatives.",
    ],
  },
];
