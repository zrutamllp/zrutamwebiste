"use client";

import { useState, useEffect } from "react";
import { buttonClasses } from "@/components/ui/Button";

const ACCESS_KEY = "REPLACE_WITH_WEB3FORMS_ACCESS_KEY"; // web3forms.com — free, takes 1 min

const INTERESTS = [
  "Book a Demo — Zrutam 360",
  "Book a Demo — IDP Tool",
  "Leadership Development",
  "Upskilling & Reskilling",
  "Custom E-Learning",
  "AI Skills Assessment",
  "General Inquiry",
];

// map ?interest= slugs (from solution/tool CTAs) to select options
const SLUG_TO_INTEREST: Record<string, string> = {
  "360": "Book a Demo — Zrutam 360",
  idp: "Book a Demo — IDP Tool",
  "idp-tool": "Book a Demo — IDP Tool",
  "leadership-development": "Leadership Development",
  "upskilling-reskilling": "Upskilling & Reskilling",
  "custom-elearning": "Custom E-Learning",
  "ai-skills-assessment": "AI Skills Assessment",
};

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [interest, setInterest] = useState(INTERESTS[6]);

  useEffect(() => {
    // static export: read query param client-side (useSearchParams would demand a Suspense boundary)
    const param = new URLSearchParams(window.location.search).get("interest");
    if (param && SLUG_TO_INTEREST[param.toLowerCase()]) {
      setInterest(SLUG_TO_INTEREST[param.toLowerCase()]);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          access_key: ACCESS_KEY,
          subject: `Zrutam website: ${data.interest}`,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="bg-teal-50 border border-teal-200 rounded-2xl p-10 text-center"
        role="status"
      >
        <p className="font-display text-2xl text-ink">
          Thank you — message received.
        </p>
        <p className="mt-2 text-navy-600">
          We&apos;ll get back to you within one business day.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-ink placeholder:text-navy-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100";
  const label = "text-sm font-medium text-ink mb-1.5 block";

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="contact-name" className={label}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your full name"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="contact-company" className={label}>
          Company
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          required
          autoComplete="organization"
          placeholder="Your organization"
          className={field}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="contact-email" className={label}>
          Work email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={field}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="contact-interest" className={label}>
          What are you interested in?
        </label>
        <select
          id="contact-interest"
          name="interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className={field}
        >
          {INTERESTS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="contact-message" className={label}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell us a little about your team and goals"
          className={field}
        />
      </div>

      {/* honeypot for spam bots */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className={buttonClasses(
            "primary",
            "w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
          )}
        >
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
        {status === "error" && (
          <p className="mt-4 text-sm text-red-700" role="status">
            Something went wrong — please email{" "}
            <a href="mailto:ceo@zrutam.com" className="underline">
              ceo@zrutam.com
            </a>{" "}
            directly.
          </p>
        )}
      </div>
    </form>
  );
}
