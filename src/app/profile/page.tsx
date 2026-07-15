"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Briefcase,
  Award,
  TrendingUp,
  Users,
  Presentation,
  Globe,
  Cpu,
  Phone,
  ExternalLink,
  Target,
  Layers,
  Building2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Play,
  Gamepad2,
  Image as ImageIcon,
  MonitorPlay,
  Video,
  BarChart3,
  Trophy
} from 'lucide-react';
import { buttonClasses } from "@/components/ui/Button";
import { cardClasses } from "@/components/ui/Card";

// --- Animation Helper Components ---

const FadeIn = ({ children, delay = 0, className = "", direction = "up" }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = domRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(node);
    return () => { observer.unobserve(node); };
  }, []);

  const baseStyles = "transition-all duration-1000 ease-out will-change-transform";
  const hiddenStyles: Record<string, string> = {
    up: "opacity-0 translate-y-12",
    down: "opacity-0 -translate-y-12",
    left: "opacity-0 translate-x-12",
    right: "opacity-0 -translate-x-12",
    none: "opacity-0 scale-95"
  };
  const visibleStyles = "opacity-100 translate-y-0 translate-x-0 scale-100";

  return (
    <div
      ref={domRef}
      className={`${baseStyles} ${isVisible ? visibleStyles : hiddenStyles[direction]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Animated Counter Component ---

const AnimatedCounter = ({ end, suffix = "", prefix = "", duration = 2000 }: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => { observer.unobserve(node); };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};

// --- Custom Components ---

const CompanyLogo = ({ src, name, className = "", decorative = false }: { src: string; name: string; className?: string; decorative?: boolean }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) return <Building2 size={24} className="text-navy-400" aria-hidden={decorative || undefined} />;

  return (
    <img
      src={src}
      alt={decorative ? "" : `${name} logo`}
      className={`object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${className}`}
      onError={() => setHasError(true)}
    />
  );
};

const TimelineNode = ({ company, role, description, highlights, logoSrc, isCurrent }: {
  company: string;
  role: string;
  date?: string;
  description: string;
  highlights: string[];
  logoSrc: string;
  isCurrent: boolean;
}) => (
  <div className="relative pl-10 md:pl-0 w-full group">
    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-navy-200 -translate-x-1/2 group-last:bg-transparent"></div>
    <div className="md:hidden absolute left-3 top-0 bottom-0 w-px bg-navy-200 group-last:bg-transparent"></div>
    <div className={`absolute left-3 md:left-1/2 top-8 md:top-6 -translate-x-1/2 w-4 h-4 rounded-full border-4 box-content transition-all duration-500 z-10
      ${isCurrent ? 'bg-teal-600 border-teal-600/20 scale-110 md:scale-125' : 'bg-white border-navy-200 group-hover:border-teal-500 group-hover:scale-110'}`}>
    </div>
    <div className={`md:w-1/2 ${isCurrent ? 'md:pr-12 md:ml-0' : 'md:pl-12 md:ml-auto'} pb-12 md:pb-16`}>
      <FadeIn direction={isCurrent ? "right" : "left"} delay={100}>
        <div className={cardClasses(true, `p-6 md:p-8 ${isCurrent ? 'ring-1 ring-teal-300/70 relative overflow-hidden' : ''}`)}>

          {isCurrent && <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -mr-8 -mt-8 pointer-events-none" aria-hidden="true"></div>}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 relative z-10 gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
                <h3 className="font-display text-xl md:text-2xl text-ink">{company}</h3>
                {isCurrent && <span className="bg-teal-50 border border-teal-100 text-teal-700 text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full uppercase tracking-wider">Present Focus</span>}
              </div>
              <p className={`font-semibold text-sm md:text-base ${isCurrent ? 'text-teal-700' : 'text-navy-600'}`}>{role}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-navy-50 rounded-lg flex items-center justify-center p-2 border border-navy-100 shrink-0 self-start">
               <CompanyLogo src={logoSrc} name={company} />
            </div>
          </div>

          <p className="text-navy-600 mb-6 leading-relaxed text-sm md:text-[15px] relative z-10">{description}</p>

          <ul className="space-y-3 relative z-10">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-navy-600 items-start">
                <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${isCurrent ? 'text-teal-600' : 'text-navy-400'}`} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </div>
  </div>
);

// --- Media Showcase Components ---

const MediaCard = ({ type, title, subtitle, imageSrc, link }: {
  type: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  link: string;
}) => {
  const isVideo = type === 'video';
  const isGame = type === 'game';

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-ink border border-navy-100 shadow-card hover:shadow-lift transition-all duration-500 aspect-video cursor-pointer">
      <img src={imageSrc} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-500 transform
          ${isVideo ? 'bg-teal-600/90 text-white group-hover:scale-125' :
            isGame ? 'bg-amber-500/90 text-white group-hover:scale-125 group-hover:rotate-12' :
            'opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 bg-white/20 text-white'}`}>
          {isVideo && <Play size={24} className="ml-1 md:w-7 md:h-7" />}
          {isGame && <Gamepad2 size={24} className="md:w-7 md:h-7" />}
          {!isVideo && !isGame && <ImageIcon size={24} className="md:w-7 md:h-7" />}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="inline-flex items-center gap-1.5 px-2 md:px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md text-white text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 md:mb-3">
          {isVideo && <Video size={10} className="md:w-3 md:h-3" />}
          {isGame && <Gamepad2 size={10} className="md:w-3 md:h-3" />}
          {!isVideo && !isGame && <ImageIcon size={10} className="md:w-3 md:h-3" />}
          {type}
        </div>
        <h3 className="text-lg md:text-xl font-bold text-white mb-1 leading-tight">{title}</h3>
        <p className="text-navy-200 text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 hidden sm:block">{subtitle}</p>

        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-2 md:mt-4 text-xs md:text-sm font-semibold text-teal-200 hover:text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-500 delay-200">
          {isVideo ? 'Watch Video' : isGame ? 'Play Demo' : 'View Gallery'} <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

// --- Impact Metrics Data ---

const impactMetrics = [
  {
    icon: Briefcase,
    value: 20,
    suffix: "+",
    label: "Years of Experience",
    description: "Leading OD & talent strategy for Fortune 500 enterprises",
  },
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Leaders Developed",
    description: "Through executive coaching, LGIs, and immersive workshops",
  },
  {
    icon: Globe,
    value: 12,
    suffix: "+",
    label: "Countries Served",
    description: "Across India, Middle East, Southeast Asia, and beyond",
  },
  {
    icon: Trophy,
    value: 72,
    suffix: "K+",
    label: "Employees Impacted",
    description: "Enterprise-wide talent frameworks at scale across HSBC alone",
  },
];

// --- Main Page Component ---

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('all');

  // Media Data
  const mediaItems = [
    { type: 'video', tab: 'video', title: 'Global Leadership Offsite 2023', subtitle: 'Recap of the 500+ leader strategic alignment intervention.', imageSrc: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop', link: '#' },
    { type: 'game', tab: 'game', title: 'Leadership Escape Room', subtitle: 'A custom gamified simulation built for Coca-Cola talent assessment.', imageSrc: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop', link: '#' },
    { type: 'image', tab: 'workshop', title: 'Cultural Transformation Workshop', subtitle: 'Facilitating a large group intervention (LGI) for enterprise executives.', imageSrc: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop', link: '#' },
    { type: 'video', tab: 'video', title: 'First-Time Manager E-Learning', subtitle: 'Trailer for the AI-driven digital learning journey.', imageSrc: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop', link: '#' },
    { type: 'game', tab: 'game', title: 'Business Strategy Simulation', subtitle: 'Interactive multiplayer simulation for supply chain leaders.', imageSrc: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop', link: '#' },
    { type: 'image', tab: 'workshop', title: 'Executive Coaching Session', subtitle: 'High-touch strategic alignment with C-suite leadership.', imageSrc: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop', link: '#' },
  ];

  const filteredMedia = activeTab === 'all' ? mediaItems : mediaItems.filter(item => item.tab === activeTab);

  return (
    <div className="min-h-screen bg-paper font-sans selection:bg-ink selection:text-paper overflow-hidden text-navy-600">

      {/* Hero Section */}
      <section className="relative bg-paper grain overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24 px-4 md:px-6">
        <div
          className="absolute inset-x-0 top-0 h-96 bg-grid-dots opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-10 md:gap-12 items-center">
          <div className="lg:col-span-7">
            <FadeIn delay={100}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs md:text-sm font-semibold mb-6 md:mb-8">
                <Sparkles size={14} className="md:w-4 md:h-4" aria-hidden="true" /> Partner, Zrutam LLP &bull; OD Expert
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-ink text-balance mb-5 md:mb-6">
                Architecting <em className="italic text-teal-600">Leadership</em> & Organizational Scale.
              </h1>
            </FadeIn>
            <FadeIn delay={500}>
              <p className="text-lg md:text-xl text-navy-600 mb-8 md:mb-10 leading-relaxed max-w-2xl">
                Hi, I&apos;m Shobhraj Sharma. With 20+ years steering strategy for Fortune 500s, I deliver bespoke high-impact interventions, AI-driven learning ecosystems, and global succession pipelines for enterprise clients.
              </p>
            </FadeIn>
            <FadeIn delay={700}>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <a href="#portfolio" className={buttonClasses("primary", "group text-sm md:text-base")}>
                  See My Work in Action <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 mt-10 lg:mt-0">
            <FadeIn delay={600} direction="left">
              <div className="relative max-w-sm md:max-w-md mx-auto lg:mx-0">
                {/* Offset accent frame */}
                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border border-amber-500/70 hidden sm:block" aria-hidden="true"></div>

                <div className="aspect-square sm:aspect-[4/5] rounded-3xl overflow-hidden border border-navy-100 bg-navy-50 relative z-10 shadow-lift">
                  <img
                    src="/shobhraj.jpg"
                    alt="Shobhraj Sharma"
                    className="object-cover w-full h-full"
                  />

                  <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white/90 backdrop-blur-md border border-navy-100 p-3 md:p-4 rounded-xl flex items-center gap-3 md:gap-4 shadow-card">
                    <div className="bg-teal-50 p-2 md:p-3 rounded-lg text-teal-600">
                      <TrendingUp size={20} className="md:w-6 md:h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-ink font-bold text-lg md:text-xl">$8M+ ROI</div>
                      <div className="text-navy-600 text-[10px] md:text-xs uppercase tracking-wider font-semibold">In Strategic Savings</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Infinite Marquee Client Bar */}
      <section className="bg-paper-warm border-y border-navy-100 py-6 md:py-10 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-paper-warm to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-paper-warm to-transparent z-10"></div>
        <div className="flex w-[200%] animate-marquee hover:[animation-play-state:paused]">
          <div className="flex w-1/2 justify-around items-center px-4 md:px-8">
            <div className="hidden sm:block text-navy-600 font-semibold uppercase tracking-widest text-[10px] md:text-sm shrink-0 mr-4 md:mr-8">Trusted By Global Leaders</div>
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg" name="HSBC" className="h-5 md:h-8 px-2" />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" name="Amazon" className="h-6 md:h-10 px-2" />
            <CompanyLogo src="https://logo.clearbit.com/cdkglobal.com" name="CDK" className="h-6 md:h-10 px-2" />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" name="HP" className="h-6 md:h-10 px-2" />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" name="Coca-Cola" className="h-5 md:h-8 px-2" />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Vodafone_icon.svg" name="Vodafone" className="h-6 md:h-10 px-2" />
          </div>
          {/* Duplicate strip for the seamless loop — hidden from assistive tech */}
          <div className="flex w-1/2 justify-around items-center px-4 md:px-8" aria-hidden="true">
            <div className="hidden sm:block text-navy-600 font-semibold uppercase tracking-widest text-[10px] md:text-sm shrink-0 mr-4 md:mr-8">Trusted By Global Leaders</div>
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg" name="HSBC" className="h-5 md:h-8 px-2" decorative />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" name="Amazon" className="h-6 md:h-10 px-2" decorative />
            <CompanyLogo src="https://logo.clearbit.com/cdkglobal.com" name="CDK" className="h-6 md:h-10 px-2" decorative />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" name="HP" className="h-6 md:h-10 px-2" decorative />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" name="Coca-Cola" className="h-5 md:h-8 px-2" decorative />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Vodafone_icon.svg" name="Vodafone" className="h-6 md:h-10 px-2" decorative />
          </div>
        </div>
      </section>

      {/* --- MEDIA PORTFOLIO SECTION --- */}
      <section id="portfolio" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <p className="text-teal-600 font-semibold tracking-[0.18em] uppercase text-xs md:text-sm mb-2 md:mb-3">Interactive Portfolio</p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.1] text-ink mb-4 md:mb-6 tracking-tight">Impact in Action</h2>
            <p className="text-base md:text-lg text-navy-600 leading-relaxed">Explore videos of past offsites, play demos of custom business simulations, and view galleries of large group interventions.</p>
          </div>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
            {[
              { id: 'all', label: 'View All', icon: null },
              { id: 'video', label: 'Videos', icon: MonitorPlay },
              { id: 'game', label: 'Games', icon: Gamepad2 },
              { id: 'workshop', label: 'Gallery', icon: ImageIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                className={`flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${
                  activeTab === tab.id
                  ? 'bg-ink text-paper'
                  : 'border border-navy-200 text-navy-600 hover:border-ink hover:text-ink'
                }`}
              >
                {tab.icon && <tab.icon size={16} className="md:w-4 md:h-4" aria-hidden="true" />}
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredMedia.map((item, index) => (
            <FadeIn key={item.title} delay={index * 100}>
              <MediaCard {...item} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Services / High-Impact Interventions */}
      <section id="services" className="py-16 md:py-24 px-4 md:px-6 bg-paper-warm border-y border-navy-100">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 text-center md:text-left">
              <div className="max-w-2xl mx-auto md:mx-0">
                <p className="text-teal-600 font-semibold tracking-[0.18em] uppercase text-xs md:text-sm mb-2 md:mb-3">Core Offerings</p>
                <h2 className="font-display text-3xl md:text-5xl leading-[1.1] text-ink mb-3 md:mb-4 tracking-tight">High-Impact Solutions</h2>
                <p className="text-base md:text-lg text-navy-600 leading-relaxed">Comprehensive, enterprise-grade interventions delivered directly through Zrutam LLP.</p>
              </div>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              { icon: Presentation, title: "Large Group Interventions (LGI)", desc: "Aligning senior management with strategic goals through immersive, large-scale executive offsites." },
              { icon: Target, title: "First-Time Manager Programs", desc: "Equipping new leaders with foundational skills and behavioral insights to drive immediate team success." },
              { icon: Cpu, title: "Custom E-Learning & AI Journeys", desc: "Designing SCORM-compliant, AI-driven learning ecosystems and gamified digital experiences optimized for scale." },
              { icon: Layers, title: "360° Multirater & Psychometrics", desc: "Deploying proprietary assessment tools to identify competency gaps and build robust succession pipelines." },
              { icon: Users, title: "Executive Coaching & Facilitation", desc: "High-touch, personalized coaching for C-suite and senior leaders focusing on strategic alignment." },
              { icon: ArrowRight, title: "Succession Planning Models", desc: "Architecting global talent pipelines and comprehensive assessment frameworks to future-proof your bench." }
            ].map((service, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className={cardClasses(true, "p-6 md:p-8 group cursor-pointer h-full text-center md:text-left")}>
                  <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center mx-auto md:mx-0 mb-5 md:mb-6 group-hover:bg-ink group-hover:text-paper transition-colors">
                    <service.icon size={24} aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg md:text-xl mb-2 md:mb-3 text-ink group-hover:text-teal-700 transition-colors">{service.title}</h3>
                  <p className="text-navy-600 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* === IMPACT BY THE NUMBERS SECTION (dark band) === */}
      {/* ============================================ */}
      <section id="impact" className="py-20 md:py-32 px-4 md:px-6 bg-ink grain text-paper relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-teal-300 text-xs md:text-sm font-semibold mb-6">
                <BarChart3 size={14} aria-hidden="true" /> Measurable Outcomes
              </div>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-paper mb-5 tracking-tight leading-[1.1]">
                Impact by the <em className="italic text-amber-400">Numbers</em>
              </h2>
              <p className="text-base md:text-lg text-navy-300 leading-relaxed">
                Two decades of enterprise-grade results, measured in leaders developed, organizations transformed, and lasting ROI delivered.
              </p>
            </div>
          </FadeIn>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {impactMetrics.map((metric, idx) => (
              <FadeIn key={idx} delay={idx * 150} direction="up">
                <div className="relative group h-full">
                  {/* Card */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:bg-white/10 hover:border-white/20 transition-colors duration-500 h-full">
                    {/* Icon */}
                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-5 rounded-2xl bg-white/10 text-teal-300 flex items-center justify-center">
                      <metric.icon size={28} className="md:w-8 md:h-8" aria-hidden="true" />
                    </div>

                    {/* Animated Number */}
                    <div className="font-display text-4xl md:text-5xl lg:text-6xl text-amber-400 mb-2 tracking-tight">
                      <AnimatedCounter end={metric.value} suffix={metric.suffix} duration={2200 + idx * 200} />
                    </div>

                    {/* Label */}
                    <div className="text-sm md:text-base font-semibold text-paper uppercase tracking-wider mb-3">
                      {metric.label}
                    </div>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-navy-300 leading-relaxed">
                      {metric.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Bottom highlight bar */}
          <FadeIn delay={800}>
            <div className="mt-14 md:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
              <div className="flex items-center gap-3 text-navy-300">
                <div className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true"></div>
                <span className="text-sm font-medium">Fortune 500 Validated</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-navy-700" aria-hidden="true"></div>
              <div className="flex items-center gap-3 text-navy-300">
                <div className="w-2 h-2 rounded-full bg-teal-300" aria-hidden="true"></div>
                <span className="text-sm font-medium">$8M+ Strategic ROI</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-navy-700" aria-hidden="true"></div>
              <div className="flex items-center gap-3 text-navy-300">
                <div className="w-2 h-2 rounded-full bg-amber-400" aria-hidden="true"></div>
                <span className="text-sm font-medium">Cross-Industry Impact</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Vertical Timeline Experience */}
      <section id="experience" className="py-16 md:py-24 px-4 md:px-6 max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <p className="text-teal-600 font-semibold tracking-[0.18em] uppercase text-xs md:text-sm mb-2 md:mb-3">Track Record</p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.1] text-ink mb-4 md:mb-6 tracking-tight">Enterprise Capability</h2>
            <p className="text-base md:text-lg text-navy-600 leading-relaxed">A two-decade foundation of scaling organizational development for the world&apos;s leading brands.</p>
          </div>
        </FadeIn>

        <div className="relative py-6 md:py-10">
          <TimelineNode
            company="Zrutam LLP"
            role="Partner & Lead Consultant"
            logoSrc=""
            isCurrent={true}
            description="Leading the strategic direction of bespoke OD interventions, combining traditional high-touch facilitation with modern learning technologies for enterprise clients."
            highlights={[
              "Architecting bespoke leadership development workshops and executive offsites.",
              "Designing and deploying proprietary multirater (360) assessment tools and e-learning ecosystems.",
              "Conducting comprehensive organizational assessments and Large Group Interventions (LGI)."
            ]}
          />
          <TimelineNode
            company="CDK Global"
            role="Head of Learning & OD"
            logoSrc="https://logo.clearbit.com/cdkglobal.com"
            isCurrent={false}
            description="Directed comprehensive learning and talent development strategies for global engineering cohorts, focusing on skill proficiency and cultural transformation."
            highlights={[
              "Led Great Place to Work (GPTW) initiatives, driving measurable engagement improvements.",
              "Launched scalable AI-based assessment tools and 360-degree feedback systems.",
              "Designed AI-driven learning journeys to optimize engineering performance."
            ]}
          />
          <TimelineNode
            company="HSBC"
            role="Head of Strategy (Learning & OD)"
            logoSrc="https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg"
            isCurrent={false}
            description="Orchestrated global skill development frameworks and career management philosophies across a massive international footprint."
            highlights={[
              "Scaled talent strategies for a workforce of 72,000+ employees across 12 countries.",
              "Designed and established a global, organization-wide Academy of Excellence.",
              "Ensured integration of complex cultural nuances into unified performance standards."
            ]}
          />
          <TimelineNode
            company="Coca-Cola"
            role="Learning & Leadership Head"
            logoSrc="https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg"
            isCurrent={false}
            description="Managed multidisciplinary teams of designers and facilitators to optimize talent processes and digital learning platforms."
            highlights={[
              "Architected robust talent assessment centers and internal career mobility programs.",
              "Designed immersive learning experiences, including VR onboarding and leadership simulations."
            ]}
          />
          <TimelineNode
            company="HP Inc."
            role="Global Talent Architect"
            logoSrc="https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg"
            isCurrent={false}
            description="Partnered with senior leadership to design OD solutions, focusing on executive team development and enterprise capability."
            highlights={[
              "Established global skill academies supporting 55,000+ technical and non-technical employees.",
              "Facilitated strategic change management and deployed comprehensive Hi-Po leadership programs."
            ]}
          />
          <TimelineNode
            company="Amazon"
            role="Partner, Learning & Instructional Design"
            logoSrc="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            isCurrent={false}
            description="Collaborated with executive leadership to architect global learning programs that reinforced corporate culture and elevated organizational capability."
            highlights={[
              "Core architect in the design and rollout of enterprise succession models and assessment centers.",
              "Spearheaded comprehensive LMS infrastructure implementations to scale global initiatives."
            ]}
          />
        </div>
      </section>

      {/* Certifications & Tech Stack */}
      <section className="bg-paper-warm border-t border-navy-100 py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 relative z-10">
          <FadeIn delay={100} direction="right">
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-ink mb-6 md:mb-8 flex items-center gap-3"><Award className="text-teal-600" aria-hidden="true" /> Professional Certifications</h3>
              <ul className="space-y-3 md:space-y-4">
                {[
                  "Certified Professional in Talent & Development (ATD USA)",
                  "Organization Development (TISS)",
                  "Certified Psychometric Testing Professional (CAMI LONDON)",
                  "DISC & MBTI Certified (Strengthscape USA)",
                  "Leadership and Change Management (XLRI INDIA)",
                  "Digital Transformation (Berkeley Haas)"
                ].map((cert, idx) => (
                  <li key={idx} className={cardClasses(false, "flex items-center gap-3 p-3 md:p-4 text-navy-700 hover:border-teal-300 transition-colors text-sm md:text-base")}>
                    <div className="w-2 h-2 rounded-full bg-teal-600 shrink-0" aria-hidden="true"></div>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={300} direction="left">
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-ink mb-6 md:mb-8 flex items-center gap-3"><Cpu className="text-teal-600" aria-hidden="true" /> Technology & Innovation Stack</h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {["LMS / LXP / LRS Architecture", "AI-Based Assessments", "360-Feedback Tools", "Digital Transformation", "Instructional Design", "AI | Vibe Coding"].map((tech, idx) => (
                  <span key={idx} className="bg-white text-navy-600 border border-navy-200 px-4 md:px-5 py-2 md:py-3 rounded-xl text-xs md:text-sm font-medium hover:border-teal-500 hover:text-teal-700 transition-all shadow-card cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final Massive CTA */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-paper text-center relative">
        <FadeIn>
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-teal-50 text-teal-600 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 transform rotate-12 shadow-card">
              <Phone size={28} className="md:w-9 md:h-9 -rotate-12" aria-hidden="true" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-ink mb-4 md:mb-6 tracking-tight leading-[1.1]">Ready to architect your <br className="hidden sm:block"/><em className="italic text-teal-600">future organization?</em></h2>
            <p className="text-base md:text-xl text-navy-600 mb-8 md:mb-12">
              Let&apos;s schedule a brief consultation to discuss your cultural, leadership, or succession challenges.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <a href="mailto:shobhrajsharma@gmail.com" className={buttonClasses("primary", "text-base md:text-lg")}>
                Email Shobhraj
              </a>
              <a href="tel:+917770006300" className={buttonClasses("outline", "text-base md:text-lg")}>
                +91-7770006300
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
