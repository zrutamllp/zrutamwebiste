"use client";

import { useState } from "react";
import {
  Award,
  TrendingUp,
  Users,
  Presentation,
  Cpu,
  Phone,
  Target,
  Layers,
  ArrowRight,
  Sparkles,
  Gamepad2,
  Image as ImageIcon,
  MonitorPlay,
  BarChart3,
} from "lucide-react";
import { AnimatedCounter } from "@/app/profile/components/AnimatedCounter";
import { CompanyLogo } from "@/app/profile/components/CompanyLogo";
import { FadeIn } from "@/app/profile/components/FadeIn";
import { MediaCard } from "@/app/profile/components/MediaCard";
import { ExperienceTimeline } from "@/app/profile/components/ExperienceTimeline";
import { impactMetrics } from "@/app/profile/constants";
import { marqueeCompanies, mediaItems, portfolioTabs, services, timelineNodes } from "@/app/profile/data/profileData";

// --- Main Page Component ---

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('all');

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
            {marqueeCompanies.map((company) => (
              <CompanyLogo key={company.name} src={company.src} name={company.name} className={company.className} />
            ))}
          </div>
          <div className="flex w-1/2 justify-around items-center px-4 md:px-8">
            <div className="hidden sm:block text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-sm shrink-0 mr-4 md:mr-8">Trusted By Global Leaders</div>
            {marqueeCompanies.map((company) => (
              <CompanyLogo key={company.name} src={company.src} name={company.name} className={company.className} />
            ))}
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
            {portfolioTabs.map((tab) => (
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
            {services.map((service, idx) => (
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

      <ExperienceTimeline nodes={timelineNodes} />

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