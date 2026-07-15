import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import FadeInSection from "@/components/FadeInSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { cardClasses } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Contact Us | Zrutam",
  description:
    "Get in touch with Zrutam to book a demo or discuss your organization's L&D goals. We respond within one business day.",
};

export default function ContactPage() {
  return (
    <section className="relative bg-paper grain overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-96 bg-grid-dots opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left column — heading + contact info */}
          <FadeInSection className="lg:col-span-2">
            <SectionHeading
              as="h1"
              eyebrow="Contact"
              title={
                <>
                  Let&apos;s <em className="italic text-teal-600">talk</em>
                </>
              }
              lede="Ready to transform your workforce? Tell us what you're working toward and we'll show you how Zrutam can drive measurable L&D outcomes."
            />

            <div className="space-y-8 -mt-2">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-navy-500 mb-2">
                  Email
                </h2>
                <a
                  href="mailto:ceo@zrutam.com"
                  className="text-ink font-medium hover:text-teal-600 transition-colors"
                >
                  ceo@zrutam.com
                </a>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-navy-500 mb-2">
                  Office
                </h2>
                <p className="text-ink font-medium">Bhubaneswar, India</p>
                <p className="text-navy-600 text-sm leading-relaxed mt-1">
                  Chandrabali House, Ground Floor,
                  <br />
                  Uttamundahunan, Janla, Khordha,
                  <br />
                  Bhubaneswar &ndash; 752054
                </p>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-navy-500 mb-2">
                  Working hours
                </h2>
                <p className="text-navy-600 text-sm leading-relaxed">
                  Monday &ndash; Friday: 9:00 AM &ndash; 6:00 PM IST
                  <br />
                  Saturday &ndash; Sunday: Closed
                </p>
              </div>

              <p className="text-navy-600 text-sm leading-relaxed border-l-2 border-teal-500 pl-4">
                We respond to every message within one business day &mdash;
                usually much sooner.
              </p>
            </div>
          </FadeInSection>

          {/* Right column — form */}
          <FadeInSection delay={0.15} className="lg:col-span-3">
            <div className={cardClasses(false, "p-8")}>
              <ContactForm />
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
