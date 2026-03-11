"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Zrutam360Page() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="gradient-navy min-h-[80vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-teal/5 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber/5 blur-3xl animate-pulse" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber/10 border border-amber/20 rounded-full text-amber text-sm font-medium mb-8"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber" />
              </span>
              Coming Soon
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Zrutam 360
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl md:text-3xl text-teal font-semibold mb-4"
            >
              Multi-Rater Feedback Tool
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm font-medium mb-8"
            >
              Powered by AWSRD
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              A comprehensive 360-degree feedback platform designed for
              modern organizations. Get holistic performance insights from
              peers, managers, direct reports, and self-assessments, all
              powered by advanced analytics.
            </motion.p>

            {/* Email Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="max-w-md mx-auto"
            >
              {submitted ? (
                <div className="bg-teal/10 border border-teal/20 rounded-xl p-6 text-center">
                  <svg
                    className="w-12 h-12 text-teal mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-white font-medium text-lg">
                    You are on the list!
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    We will notify you when Zrutam 360 launches.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-5 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-amber hover:bg-amber-600 text-navy font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-amber/25 whitespace-nowrap"
                  >
                    Notify Me
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              What to Expect
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Zrutam 360 is being built with the same AI-first philosophy that
              powers our IDP Tool.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Multi-Rater Feedback",
                description:
                  "Collect feedback from managers, peers, direct reports, and external stakeholders in a structured format.",
              },
              {
                title: "AI-Powered Insights",
                description:
                  "Advanced analytics that surface patterns, blind spots, and development opportunities from feedback data.",
              },
              {
                title: "Custom Competency Models",
                description:
                  "Build feedback assessments around your organization's unique competency framework and values.",
              },
              {
                title: "Action Planning",
                description:
                  "Automated development recommendations that integrate directly with the Zrutam IDP Tool.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-teal font-bold">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expected Launch */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Expected Launch: Q3 2026
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto mb-8">
            We are currently in beta testing with select enterprise partners.
            Sign up above to be the first to know when we launch publicly.
          </p>
          <Link
            href="/tools/idp"
            className="inline-flex items-center text-teal hover:text-teal-500 font-medium transition-colors"
          >
            Explore our IDP Tool in the meantime
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
