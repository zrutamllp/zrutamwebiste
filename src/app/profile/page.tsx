"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Briefcase,
  Award,
  TrendingUp,
  Users,
  Presentation,
  Globe,
  Cpu,
  ChevronRight,
  Mail,
  Phone,
  ExternalLink,
  Target,
  Layers,
  Building2,
  Quote,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Play,
  Gamepad2,
  Image as ImageIcon,
  MonitorPlay,
  Video,
  BarChart3,
  MapPin,
  GraduationCap,
  Trophy
} from 'lucide-react';

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

const CompanyLogo = ({ src, name, className = "" }: { src: string; name: string; className?: string }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) return <Building2 size={24} className="text-slate-400" />;

  return (
    <img
      src={src}
      alt={`${name} logo`}
      className={`object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 ${className}`}
      onError={() => setHasError(true)}
    />
  );
};

const TimelineNode = ({ company, role, date, description, highlights, logoSrc, isCurrent }: {
  company: string;
  role: string;
  date?: string;
  description: string;
  highlights: string[];
  logoSrc: string;
  isCurrent: boolean;
}) => (
  <div className="relative pl-10 md:pl-0 w-full group">
    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 group-last:bg-transparent"></div>
    <div className="md:hidden absolute left-3 top-0 bottom-0 w-px bg-slate-200 group-last:bg-transparent"></div>
    <div className={`absolute left-3 md:left-1/2 top-8 md:top-6 -translate-x-1/2 w-4 h-4 rounded-full border-4 box-content transition-all duration-500 z-10
      ${isCurrent ? 'bg-indigo-600 border-indigo-100 shadow-[0_0_15px_rgba(79,70,229,0.5)] scale-110 md:scale-125' : 'bg-white border-slate-300 group-hover:border-indigo-400 group-hover:scale-110'}`}>
    </div>
    <div className={`md:w-1/2 ${isCurrent ? 'md:pr-12 md:ml-0' : 'md:pl-12 md:ml-auto'} pb-12 md:pb-16`}>
      <FadeIn direction={isCurrent ? "right" : "left"} delay={100}>
        <div className={`bg-white p-6 md:p-8 rounded-2xl border transition-all duration-500 hover:shadow-2xl
          ${isCurrent ? 'border-indigo-300 shadow-xl shadow-indigo-100/50 relative overflow-hidden' : 'border-slate-100 shadow-sm hover:border-indigo-100'}`}>

          {isCurrent && <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 relative z-10 gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900">{company}</h3>
                {isCurrent && <span className="bg-indigo-100 text-indigo-700 text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full uppercase tracking-wider">Present Focus</span>}
              </div>
              <p className={`font-semibold text-sm md:text-base ${isCurrent ? 'text-indigo-600' : 'text-slate-600'}`}>{role}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-lg flex items-center justify-center p-2 border border-slate-100 shrink-0 self-start">
               <CompanyLogo src={logoSrc} name={company} />
            </div>
          </div>

          <p className="text-slate-600 mb-6 leading-relaxed text-sm md:text-[15px] relative z-10">{description}</p>

          <ul className="space-y-3 relative z-10">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-slate-600 items-start">
                <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${isCurrent ? 'text-indigo-500' : 'text-slate-400'}`} />
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
    <div className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 aspect-video cursor-pointer">
      <img src={imageSrc} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-500 transform
          ${isVideo ? 'bg-indigo-600/80 text-white group-hover:scale-125' :
            isGame ? 'bg-emerald-500/80 text-white group-hover:scale-125 group-hover:rotate-12' :
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
        <p className="text-slate-300 text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 hidden sm:block">{subtitle}</p>

        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-2 md:mt-4 text-xs md:text-sm font-semibold text-indigo-300 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
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
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-600",
  },
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Leaders Developed",
    description: "Through executive coaching, LGIs, and immersive workshops",
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-50",
    textColor: "text-cyan-600",
  },
  {
    icon: Globe,
    value: 12,
    suffix: "+",
    label: "Countries Served",
    description: "Across India, Middle East, Southeast Asia, and beyond",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    icon: Trophy,
    value: 72,
    suffix: "K+",
    label: "Employees Impacted",
    description: "Enterprise-wide talent frameworks at scale across HSBC alone",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
    textColor: "text-amber-600",
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
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden text-slate-900">

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float { 0%, 100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-20px) translateX(10px); } }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 30s linear infinite; }
        .hover-pause:hover { animation-play-state: paused; }
      `}} />

      {/* Hero Section */}
      <section className="pt-8 md:pt-16 pb-16 md:pb-24 px-4 md:px-6 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-indigo-600/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none opacity-50" style={{ animation: 'float 15s ease-in-out infinite' }}></div>
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none opacity-50" style={{ animation: 'float 18s ease-in-out infinite reverse' }}></div>
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-10 md:gap-12 items-center">
          <div className="lg:col-span-7">
            <FadeIn delay={100}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs md:text-sm font-semibold mb-6 md:mb-8 backdrop-blur-md">
                <Sparkles size={14} className="md:w-4 md:h-4" /> Partner, Zrutam LLP &bull; OD Expert
              </div>
            </FadeIn>
            <FadeIn delay={300}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.1] mb-5 md:mb-6 tracking-tight">
                Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">Leadership</span> & Organizational Scale.
              </h1>
            </FadeIn>
            <FadeIn delay={500}>
              <p className="text-lg md:text-xl text-slate-400 mb-8 md:mb-10 leading-relaxed max-w-2xl font-light">
                Hi, I&apos;m Shobhraj Sharma. With 20+ years steering strategy for Fortune 500s, I deliver bespoke high-impact interventions, AI-driven learning ecosystems, and global succession pipelines for enterprise clients.
              </p>
            </FadeIn>
            <FadeIn delay={700}>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <a href="#portfolio" className="bg-white text-slate-900 hover:bg-indigo-50 px-6 py-3.5 md:px-8 md:py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center group text-sm md:text-base">
                  See My Work in Action <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 mt-10 lg:mt-0">
            <FadeIn delay={600} direction="left">
              <div className="relative max-w-sm md:max-w-md mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-3xl transform rotate-3 scale-105 opacity-20 blur-lg hidden sm:block"></div>
                <div className="absolute inset-0 border border-white/10 rounded-3xl transform -rotate-2 scale-105 backdrop-blur-sm hidden sm:block"></div>

                <div className="aspect-square sm:aspect-[4/5] rounded-3xl overflow-hidden border border-white/20 bg-slate-800 relative z-10 shadow-2xl">
                  <img
                    src="/shobhraj.jpg"
                    alt="Shobhraj Sharma"
                    className="object-cover w-full h-full opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  />

                  <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white/10 backdrop-blur-md border border-white/20 p-3 md:p-4 rounded-xl flex items-center gap-3 md:gap-4">
                    <div className="bg-indigo-500/20 p-2 md:p-3 rounded-lg text-indigo-300">
                      <TrendingUp size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg md:text-xl">$8M+ ROI</div>
                      <div className="text-slate-300 text-[10px] md:text-xs uppercase tracking-wider font-semibold">In Strategic Savings</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Infinite Marquee Client Bar */}
      <section className="bg-white border-b border-slate-200 py-6 md:py-10 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        <div className="flex w-[200%] md:w-[200%] animate-scroll hover-pause">
          <div className="flex w-1/2 justify-around items-center px-4 md:px-8">
            <div className="hidden sm:block text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-sm shrink-0 mr-4 md:mr-8">Trusted By Global Leaders</div>
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg" name="HSBC" className="h-5 md:h-8 px-2" />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" name="Amazon" className="h-6 md:h-10 px-2" />
            <CompanyLogo src="https://logo.clearbit.com/cdkglobal.com" name="CDK" className="h-6 md:h-10 px-2" />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" name="HP" className="h-6 md:h-10 px-2" />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" name="Coca-Cola" className="h-5 md:h-8 px-2" />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Vodafone_icon.svg" name="Vodafone" className="h-6 md:h-10 px-2" />
          </div>
          <div className="flex w-1/2 justify-around items-center px-4 md:px-8">
            <div className="hidden sm:block text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-sm shrink-0 mr-4 md:mr-8">Trusted By Global Leaders</div>
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg" name="HSBC" className="h-5 md:h-8 px-2" />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" name="Amazon" className="h-6 md:h-10 px-2" />
            <CompanyLogo src="https://logo.clearbit.com/cdkglobal.com" name="CDK" className="h-6 md:h-10 px-2" />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" name="HP" className="h-6 md:h-10 px-2" />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" name="Coca-Cola" className="h-5 md:h-8 px-2" />
            <CompanyLogo src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Vodafone_icon.svg" name="Vodafone" className="h-6 md:h-10 px-2" />
          </div>
        </div>
      </section>

      {/* --- MEDIA PORTFOLIO SECTION --- */}
      <section id="portfolio" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <h4 className="text-indigo-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 md:mb-3">Interactive Portfolio</h4>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 md:mb-6 tracking-tight">Impact in Action</h2>
            <p className="text-base md:text-lg text-slate-600">Explore videos of past offsites, play demos of custom business simulations, and view galleries of large group interventions.</p>
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
                className={`flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
                }`}
              >
                {tab.icon && <tab.icon size={16} className="md:w-4 md:h-4" />}
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
      <section id="services" className="py-16 md:py-24 px-4 md:px-6 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 text-center md:text-left">
              <div className="max-w-2xl mx-auto md:mx-0">
                <h4 className="text-indigo-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 md:mb-3">Core Offerings</h4>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-3 md:mb-4 tracking-tight">High-Impact Solutions</h2>
                <p className="text-base md:text-lg text-slate-600">Comprehensive, enterprise-grade interventions delivered directly through Zrutam LLP.</p>
              </div>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              { icon: Presentation, title: "Large Group Interventions (LGI)", desc: "Aligning senior management with strategic goals through immersive, large-scale executive offsites." },
              { icon: Target, title: "First-Time Manager Programs", desc: "Equipping new leaders with foundational skills and behavioral insights to drive immediate team success." },
              { icon: Cpu, title: "Custom E-Learning & AI Journeys", desc: "Designing SCORM-compliant, AI-driven learning ecosystems and gamified digital experiences optimized for scale." },
              { icon: Layers, title: "360\u00B0 Multirater & Psychometrics", desc: "Deploying proprietary assessment tools to identify competency gaps and build robust succession pipelines." },
              { icon: Users, title: "Executive Coaching & Facilitation", desc: "High-touch, personalized coaching for C-suite and senior leaders focusing on strategic alignment." },
              { icon: ArrowRight, title: "Succession Planning Models", desc: "Architecting global talent pipelines and comprehensive assessment frameworks to future-proof your bench." }
            ].map((service, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-2xl transition-all duration-300 group cursor-pointer h-full text-center md:text-left">
                  <div className="w-12 h-12 bg-slate-50 text-indigo-600 rounded-lg flex items-center justify-center mx-auto md:mx-0 mb-5 md:mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <service.icon size={24} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-slate-900 group-hover:text-indigo-700 transition-colors">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* === NEW: IMPACT BY THE NUMBERS SECTION === */}
      {/* ============================================ */}
      <section id="impact" className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs md:text-sm font-semibold mb-6 backdrop-blur-md">
                <BarChart3 size={14} /> Measurable Outcomes
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-5 tracking-tight">
                Impact by the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">Numbers</span>
              </h2>
              <p className="text-base md:text-lg text-slate-400 leading-relaxed">
                Two decades of enterprise-grade results, measured in leaders developed, organizations transformed, and lasting ROI delivered.
              </p>
            </div>
          </FadeIn>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {impactMetrics.map((metric, idx) => (
              <FadeIn key={idx} delay={idx * 150} direction="up">
                <div className="relative group">
                  {/* Card */}
                  <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:bg-white/[0.08] hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.3)]">
                    {/* Icon */}
                    <div className={`w-14 h-14 md:w-16 md:h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <metric.icon size={28} className="text-white md:w-8 md:h-8" />
                    </div>

                    {/* Animated Number */}
                    <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 tracking-tight text-white">
                      <AnimatedCounter end={metric.value} suffix={metric.suffix} duration={2200 + idx * 200} />
                    </div>

                    {/* Label */}
                    <div className="text-sm md:text-base font-bold text-indigo-300 uppercase tracking-wider mb-3">
                      {metric.label}
                    </div>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
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
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                <span className="text-sm font-medium">Fortune 500 Validated</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-slate-700"></div>
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]"></div>
                <span className="text-sm font-medium">$8M+ Strategic ROI</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-slate-700"></div>
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
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
            <h4 className="text-indigo-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 md:mb-3">Track Record</h4>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 md:mb-6 tracking-tight">Enterprise Capability</h2>
            <p className="text-base md:text-lg text-slate-600">A two-decade foundation of scaling organizational development for the world&apos;s leading brands.</p>
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
      <section className="bg-slate-900 text-white py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-indigo-900/20 blur-[100px] md:blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 relative z-10">
          <FadeIn delay={100} direction="right">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center gap-3"><Award className="text-indigo-400" /> Professional Certifications</h3>
              <ul className="space-y-3 md:space-y-4">
                {[
                  "Certified Professional in Talent & Development (ATD USA)",
                  "Organization Development (TISS)",
                  "Certified Psychometric Testing Professional (CAMI LONDON)",
                  "DISC & MBTI Certified (Strengthscape USA)",
                  "Leadership and Change Management (XLRI INDIA)",
                  "Digital Transformation (Berkeley Haas)"
                ].map((cert, idx) => (
                  <li key={idx} className="flex items-center gap-3 bg-slate-800/50 p-3 md:p-4 rounded-xl border border-slate-700/50 shadow-sm hover:border-indigo-500/50 transition-colors text-sm md:text-base">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] shrink-0"></div>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={300} direction="left">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center gap-3"><Cpu className="text-indigo-400" /> Technology & Innovation Stack</h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {["LMS / LXP / LRS Architecture", "AI-Based Assessments", "360-Feedback Tools", "Digital Transformation", "Instructional Design", "AI | Vibe Coding"].map((tech, idx) => (
                  <span key={idx} className="bg-slate-800 text-indigo-300 border border-slate-700 px-4 md:px-5 py-2 md:py-3 rounded-xl text-xs md:text-sm font-medium hover:bg-indigo-900/50 hover:border-indigo-500/50 transition-all shadow-sm cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final Massive CTA */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-slate-50 to-white text-center relative border-t border-slate-200">
        <FadeIn>
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-100 text-indigo-600 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 transform rotate-12 shadow-xl shadow-indigo-100">
              <Phone size={28} className="md:w-9 md:h-9 -rotate-12" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">Ready to architect your <br className="hidden sm:block"/><span className="text-indigo-600">future organization?</span></h2>
            <p className="text-base md:text-xl text-slate-600 mb-8 md:mb-12">
              Let&apos;s schedule a brief consultation to discuss your cultural, leadership, or succession challenges.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <a href="mailto:shobhrajsharma@gmail.com" className="bg-slate-900 hover:bg-indigo-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg transition-all shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-1">
                Email Shobhraj
              </a>
              <a href="tel:+917770006300" className="bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg transition-all hover:-translate-y-1">
                +91-7770006300
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}