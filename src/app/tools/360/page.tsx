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
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/ui/SectionHeading";
import { buttonClasses } from "@/components/ui/Button";
import { cardClasses } from "@/components/ui/Card";
import RadialRings from "@/components/graphics/RadialRings";

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
    desc: "Customizable frameworks tailored to your organization’s leadership model.",
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
    q: "What does the 360° assessment include?",
    a: "A complete multi-rater feedback cycle: self-assessment plus feedback from direct reports, peers, and supervisors across 5 customizable competency frameworks. Each participant receives a 6-page infographic PDF report.",
  },
  {
    q: "How long does the survey take?",
    a: "10-15 minutes per rater. We’ve stripped away redundant questions to stay in the high-quality response zone, avoiding the 50-question danger zone that destroys data accuracy.",
  },
  {
    q: "Is the feedback anonymous?",
    a: "Yes. All rater responses are fully anonymized. We are DPDP and GDPR compliant with complete audit logs for your compliance team.",
  },
  {
    q: "How do we get started?",
    a: "Send us your participant roster as a CSV file. We handle the entire setup — configuring competency frameworks, assigning rater types, and launching the survey. Typical setup takes 2-3 business days.",
  },
  {
    q: "Can we customize the competency framework?",
    a: "Absolutely. Choose from 5 built-in frameworks or work with our team to create a custom framework aligned to your organization’s leadership model.",
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
      <section className="relative bg-paper grain overflow-hidden">
        <div
          className="absolute inset-y-0 right-0 w-1/2 bg-grid-dots opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] hidden lg:block"
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 border border-teal-100 rounded-full text-teal-600 text-sm font-medium mb-8"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" />
                </span>
                Now Live
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink text-balance mb-6"
              >
                Enterprise-Grade 360° Feedback, Built for India&#39;s{" "}
                <em className="italic text-teal-600">Frontline Leaders</em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-navy-600 leading-relaxed max-w-xl mb-10"
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
                className="flex flex-col sm:flex-row gap-4"
              >
                <a href="/contact/?interest=360" className={buttonClasses("primary")}>
                  Book a Demo
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link href="/360-calculator" className={buttonClasses("outline")}>
                  Calculate Your Risk
                </Link>
              </motion.div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <RadialRings className="w-full max-w-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* ====== Section 2 — Problem Statement ====== */}
      <section className="py-20 md:py-28 bg-paper-warm border-t border-navy-100">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              align="center"
              eyebrow="The problem"
              title={
                <>
                  Why 360° Feedback Is{" "}
                  <em className="italic text-teal-600">Broken</em>
                </>
              }
              lede="Traditional assessment tools were designed for executives with unlimited budgets, not frontline managers who need quick, actionable insights."
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problemCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cardClasses(true, "h-full p-8")}
              >
                <div className="inline-flex w-fit items-center justify-center bg-amber-50 text-amber-600 rounded-xl p-3 mb-5">
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl text-ink mb-3">
                  {card.title}
                </h3>
                <p className="text-navy-600 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Section 3 — How It Works ====== */}
      <section className="py-20 md:py-28 bg-paper">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              eyebrow="How it works"
              title={
                <>
                  Roster to{" "}
                  <em className="italic text-teal-600">insight</em>
                </>
              }
              lede="From roster upload to actionable insights in four simple steps."
            />
          </motion.div>

          <ol role="list" className="list-none max-w-4xl">
            {steps.map((step, i) => (
              <li key={step.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`flex items-baseline gap-6 md:gap-10 py-6 md:py-7 ${
                    i < steps.length - 1 ? "border-b border-navy-100" : ""
                  }`}
                >
                  <span
                    className="font-display text-3xl md:text-4xl text-navy-300 tabular-nums shrink-0"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center bg-teal-50 text-teal-600 rounded-lg p-1.5">
                        <step.icon className="w-4 h-4" />
                      </span>
                      <h3 className="font-display text-2xl text-ink">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-navy-600 text-lg leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ====== Section 4 — Features Grid ====== */}
      <section className="py-20 md:py-28 bg-paper-warm border-t border-navy-100">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              align="center"
              eyebrow="Features"
              title={
                <>
                  Everything You{" "}
                  <em className="italic text-teal-600">Need</em>
                </>
              }
              lede="A complete 360° feedback platform, from survey launch to development action plans."
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cardClasses(true, "h-full p-6")}
              >
                <div className="inline-flex w-fit items-center justify-center bg-teal-50 text-teal-600 rounded-xl p-2.5 mb-4">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg text-ink mb-2">
                  {f.title}
                </h3>
                <p className="text-navy-600 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Section 5 — Sample Report Preview ====== */}
      <section className="py-20 md:py-28 bg-paper">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              align="center"
              eyebrow="Sample report"
              title={
                <>
                  Your 6-Page{" "}
                  <em className="italic text-teal-600">Infographic Report</em>
                </>
              }
              lede="Every participant receives a beautifully designed, actionable report — not a 40-page data dump."
            />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {reportPages.map((page, i) => (
              <motion.div
                key={page.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cardClasses(true, "h-full p-5 text-center")}
              >
                <div className="inline-flex items-center justify-center bg-teal-50 text-teal-600 rounded-xl p-3 mx-auto mb-4">
                  <page.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-sm text-ink mb-1">
                  {page.title}
                </h3>
                <p className="text-xs text-navy-600">{page.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Section 6 — Pricing ====== */}
      <section className="py-20 md:py-28 bg-paper-warm border-t border-navy-100">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cardClasses(false, "max-w-lg mx-auto overflow-hidden")}
          >
            <div className="bg-paper border-b border-navy-100 p-8 text-center">
              <p className="text-teal-600 text-sm font-semibold uppercase tracking-[0.18em] mb-2">
                Enterprise Pricing
              </p>
              <h3 className="font-display text-4xl md:text-5xl text-amber-700 mb-1">
                Contact Us
              </h3>
              <p className="text-navy-600 text-sm">Custom pricing based on volume</p>
            </div>

            <div className="p-8">
              <ul className="space-y-3 mb-8">
                {pricingChecklist.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-ink">
                    <Check className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/contact/?interest=360"
                className={buttonClasses("primary", "w-full")}
              >
                Contact for Volume Pricing
              </a>

              <p className="text-center text-navy-600 text-xs mt-4">
                No setup fees. No per-organization licensing.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== Section 7 — FAQ ====== */}
      <section className="py-20 md:py-28 bg-paper">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              align="center"
              eyebrow="FAQ"
              title="Frequently Asked Questions"
            />
          </motion.div>

          <div className="max-w-2xl mx-auto border-t border-navy-100">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border-b border-navy-100"
              >
                <h3>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full flex items-center justify-between py-5 text-left rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                  >
                    <span className="font-semibold text-ink pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-navy-400 flex-shrink-0 transition-transform duration-200 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                {openFaq === i && (
                  <div
                    id={`faq-panel-${i}`}
                    className="pb-5 text-navy-600 leading-relaxed"
                  >
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Section 8 — CTA Footer ====== */}
      <CTABanner
        title={
          <>
            Ready to build{" "}
            <em className="italic text-amber-400">data-driven</em> leaders?
          </>
        }
        subtitle="Join organizations across India, Dubai, and Singapore using Zrutam 360 to develop their frontline."
        primaryCTA={{ text: "Book a Demo", href: "/contact/?interest=360" }}
        secondaryCTA={{
          text: "Read: Why Legacy Assessments Fail",
          href: "/blog/why-legacy-360-assessments-fail",
        }}
      />
    </>
  );
}
