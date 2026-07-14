"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Zrutam transformed our leadership pipeline. Their AI-driven IDP tool helped us identify and develop high-potential leaders across three countries in record time.",
    name: "Fouzia Kumar",
    title: "Global Learning Head",
    company: "HSBC",
  },
  {
    quote:
      "The custom e-learning modules were exactly what we needed -- contextualized for our APAC workforce and engaging enough to drive real completion rates. Our L&D ROI improved significantly.",
    name: "Ahmed Al-Rashid",
    title: "VP of Talent Development",
    company: "Vi, Mumbai",
  },
  {
    quote:
      "Their skills assessment platform gave us real-time visibility into capability gaps we did not even know existed. It has become an essential part of our workforce planning strategy.",
    name: "Shilpa Uniyal",
    title: "Learning Head",
    company: "Amazon UK",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
};

export default function TestimonialSlider() {
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback(
    (newDirection: number) => {
      setActiveIndex(([prev]) => {
        const next = (prev + newDirection + testimonials.length) % testimonials.length;
        return [next, newDirection];
      });
    },
    []
  );

  const goToSlide = (index: number) => {
    setActiveIndex(([prev]) => [index, index > prev ? 1 : -1]);
  };

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, [isPaused, paginate]);

  const current = testimonials[activeIndex];

  return (
    <section className="relative py-20 md:py-28 bg-paper overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title={
            <>
              What our clients <em className="italic text-teal-600">say</em>
            </>
          }
          lede="Trusted by leading enterprises across India, Middle East, and Southeast Asia."
        />

        {/* Slider */}
        <div
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[540px] sm:min-h-[420px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Card hover={false} className="h-full p-8 sm:p-10 lg:p-12">
                  {/* Oversized decorative quote mark */}
                  <div
                    className="font-display text-navy-200 text-7xl leading-none select-none mb-2"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-ink text-xl md:text-2xl leading-relaxed mb-8">
                    {current.quote}
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    {/* Avatar placeholder */}
                    <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 font-display text-lg shrink-0">
                      {current.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-ink text-sm sm:text-base">
                        {current.name}
                      </p>
                      <p className="text-navy-500 text-sm">
                        {current.title}, {current.company}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 h-2.5 bg-ink"
                    : "w-2.5 h-2.5 bg-navy-200 hover:bg-navy-300"
                }`}
              />
            ))}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-navy-200 text-navy-600
                         hover:border-ink hover:text-ink flex items-center justify-center
                         transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-navy-200 text-navy-600
                         hover:border-ink hover:text-ink flex items-center justify-center
                         transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
