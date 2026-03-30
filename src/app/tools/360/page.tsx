"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  AlertTriangle,
  FileWarning,
  Brain,
  Upload,
  ClipboardList,
  BarChart3,
  Target,
  Layers,
  Users,
  FileText,
  LayoutDashboard,
  Bell,
  UserCog,
  Download,
  ShieldCheck,
  Radar,
  Grid3X3,
  BarChart2,
  AppWindow,
  MessageSquareQuote,
  Crosshair,
  Check,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const problemCards = [
  {
    icon: AlertTriangle,
    title: "Survey Fatigue",
    desc: "Average attention span: 47 seconds. Traditional 50-80 question assessments see massive dropout after 9 minutes on mobile.",
  },
  {
    icon: FileWarning,
    title: "The 50-Question Danger Zone",
    desc: "Satisfaction plummets from 91% to 56% once surveys cross 50 questions. Attention fail rates double.",
  },
  {
    icon: Brain,
    title: "40-Page Paralysis",
    desc: "Legacy tools generate paralyzing 40-page PDFs at $100-$500 per person. Impossible to scale for frontline managers.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Setup",
    desc: "Upload your CSV roster, configure from 5 competency frameworks, assign 4 rater types per participant.",
  },
  {
    icon: ClipboardList,
    title: "Survey",
    desc: "10-15 minute mobile-friendly assessments with different question wording per rater type. Auto-reminders on Day 3, 5, and 9.",
  },
  {
    icon: BarChart3,
    title: "Analyse",
    desc: "AI-powered 6-page infographic PDF: radar chart, item-level heatmap, self vs others gap analysis, Johari window, and qualitative verbatims.",
  },
  {
    icon: Target,
    title: "Act",
    desc: "Clear focus areas with development nudges. Prioritized insights, not paralyzing data dumps.",
  },
];

const features = [
  {
    icon: Layers,
    title: "5 Competency Frameworks",
    desc: "Customizable frameworks tailored to your organization\u2019s leadership model.",
  },
  {
    icon: Users,
    title: "4 Rater Types",
    desc: "Self, Direct Reports, Peers, and Supervisor with tailored question wording.",
  },
  {
    icon: FileText,
    title: "6-Page Infographic Report",
    desc: "Radar charts, heatmaps, Johari window, gap analysis, verbatims, and focus areas.",
  },
  {
    icon: LayoutDashboard,
    title: "Real-time Dashboard",
    desc: "Track survey completion rates and coverage across your organization live.",
  },
  {
    icon: Bell,
    title: "Smart Auto-Reminders",
    desc: "Automated nudges on Day 3, 5, and 9 to maximize response rates.",
  },
  {
    icon: UserCog,
    title: "Rater Management",
    desc: "Resend, replace, exclude, or remove raters with full audit trail.",
  },
  {
    icon: Download,
    title: "Bulk ZIP Download",
    desc: "Download all participant reports in one click for offline distribution.",
  },
  {
    icon: ShieldCheck,
    title: "DPDP/GDPR Compliant",
    desc: "Anonymized responses, audit logs, and privacy-first architecture.",
  },
];

const reportPages = [
  { icon: Radar, title: "Competency Overview", sub: "Radar chart" },
  { icon: Grid3X3, title: "Item-Level Heatmap", sub: "Grid heatmap" },
  { icon: BarChart2, title: "Self vs Others Gap", sub: "Bar chart" },
  { icon: AppWindow, title: "Johari Window", sub: "Window grid" },
  { icon: MessageSquareQuote, title: "Verbatim Feedback", sub: "Qualitative quotes" },
  { icon: Crosshair, title: "Focus Areas & Nudges", sub: "Development targets" },
];

const pricingChecklist = [
  "Multi-rater survey",
  "6-page PDF report",
  "Auto-reminders",
  "Real-time dashboard",
  "Rater management",
  "Bulk download",
];

const faqs = [
  {
    q: "What does the 360\u00B0 assessment include?",
    a: "A complete multi-rater feedback cycle: self-assessment plus feedback from direct reports, peers, and supervisors across 5 customizable competency frameworks. Each participant receives a 6-page infographic PDF report.",
  },
  {
    q: "How long does the survey take?",
    a: "10-15 minutes per rater. We\u2019ve stripped away redundant questions to stay in the high-quality response zone, avoiding the 50-question danger zone that destroys data accuracy.",
  },
  {
    q: "Is the feedback anonymous?",
    a: "Yes. All rater responses are fully anonymized. We are DPDP and GDPR compliant with complete audit logs for your compliance team.",
  },
  {
    q: "How do we get started?",
    a: "Send us your participant roster as a CSV file. We handle the entire setup \u2014 configuring competency frameworks, assigning rater types, and launching the survey. Typical setup takes 2-3 business days.",
  },
  {
    q: "Can we customize the competency framework?",
    a: "Absolutely. Choose from 5 built-in frameworks or work with our team to create a custom framework aligned to your organization\u2019s leadership model.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Zrutam360Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ====== Section 1 — Hero ====== */}
      <section className="gradient-navy min-h-[80vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-teal/5 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber/5 blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 border border-teal/20 rounded-full text-teal text-sm font-medium mb-8"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal" />
              </span>
              Now Live
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Enterprise-Grade 360° Feedback, Built for India&#39;s Frontline Leaders
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Run comprehensive multi-rater assessments at 1/10th the cost of
              global players. Frictionless 10-minute surveys. Actionable 6-page
              infographic reports. DPDP/GDPR compliant.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="mailto:ceo@zrutam.com"
                className="px-8 py-4 bg-amber hover:bg-amber-600 text-navy font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-amber/25 inline-flex items-center gap-2"
              >
                Book a Demo
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/360-calculator"
                className="px-8 py-4 border border-white/20 text-white hover:bg-white/5 font-semibold rounded-lg transition-all duration-200 inline-flex items-center gap-2"
              >
                Calculate Your Risk
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== Section 2 — Problem Statement ====== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Why 360° Feedback Is Broken
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Traditional assessment tools were designed for executives with
              unlimited budgets, not frontline managers who need quick, actionable
              insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problemCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-5">
                  <card.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Section 3 — How It Works ====== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From roster upload to actionable insights in four simple steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-teal/20" />

            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="w-14 h-14 bg-teal/10 border-2 border-teal/30 rounded-full flex items-center justify-center mx-auto mb-5 relative z-10 bg-gray-50">
                  <step.icon className="w-6 h-6 text-teal" />
                </div>
                <span className="inline-block text-xs font-bold text-teal bg-teal/10 px-3 py-1 rounded-full mb-3">
                  Step {i + 1}
                </span>
                <h3 className="text-lg font-semibold text-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Section 4 — Features Grid ====== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Everything You Need
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A complete 360° feedback platform, from survey launch to development
              action plans.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-teal/20 transition-all"
              >
                <div className="w-11 h-11 bg-teal/10 rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-teal" />
                </div>
                <h3 className="text-base font-semibold text-navy mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Section 5 — Sample Report Preview ====== */}
      <section className="py-20 gradient-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-teal/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your 6-Page Infographic Report
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Every participant receives a beautifully designed, actionable report
              — not a 40-page data dump.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {reportPages.map((page, i) => (
              <motion.div
                key={page.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors group"
              >
                <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-teal/20 transition-colors">
                  <page.icon className="w-6 h-6 text-teal" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  {page.title}
                </h3>
                <p className="text-xs text-gray-400">{page.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Section 6 — Pricing ====== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="bg-navy p-8 text-center">
              <p className="text-teal text-sm font-medium uppercase tracking-wider mb-2">
                Per Person Pricing
              </p>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-1">
                &#8377;1,999
              </h3>
              <p className="text-gray-400 text-sm">~$24 USD per person</p>
            </div>

            <div className="p-8">
              <ul className="space-y-3 mb-8">
                {pricingChecklist.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-teal flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="mailto:ceo@zrutam.com"
                className="block w-full text-center px-8 py-4 bg-amber hover:bg-amber-600 text-navy font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-amber/25"
              >
                Contact for Volume Pricing
              </a>

              <p className="text-center text-gray-400 text-xs mt-4">
                No setup fees. No per-organization licensing.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== Section 7 — FAQ ====== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-navy pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Section 8 — CTA Footer ====== */}
      <section className="py-20 gradient-navy relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-teal/5 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-amber/5 blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Ready to build data-driven leaders?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-xl mx-auto mb-10"
          >
            Join organizations across India, Dubai, and Singapore using Zrutam 360
            to develop their frontline.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="mailto:ceo@zrutam.com"
              className="px-8 py-4 bg-amber hover:bg-amber-600 text-navy font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-amber/25 inline-flex items-center gap-2"
            >
              Book a Demo
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href="/blog/why-legacy-360-assessments-fail"
              className="text-gray-300 hover:text-white font-medium transition-colors inline-flex items-center gap-2"
            >
              Read: Why Legacy Assessments Fail
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
