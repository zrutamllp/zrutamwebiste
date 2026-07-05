"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <section className="relative py-16 lg:py-24 bg-surface overflow-hidden">
      {/* Decorative giant quote */}
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 text-[200px] lg:text-[280px] leading-none
                   font-serif text-white/[0.03] select-none pointer-events-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="block text-teal-300 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Trusted by leading enterprises across India, Middle East, and Southeast Asia.
          </p>
        </div>

        {/* Slider */}
        <div
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[280px] sm:min-h-[240px]">
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
                <div className="glass-card p-8 sm:p-10 lg:p-12">
                  {/* Quote Mark */}
                  <div className="mb-6">
                    <svg
                      className="w-10 h-10 text-teal opacity-30"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391C0 7.905 3.748 4.039 9 3l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                    </svg>
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-gray-200 text-base sm:text-lg leading-relaxed mb-8">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    {/* Avatar placeholder */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal to-teal-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {current.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm sm:text-base">
                        {current.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {current.title}, {current.company}
                      </p>
                    </div>
                  </div>
                </div>
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
                    ? "w-8 h-2.5 bg-teal shadow-glow-teal"
                    : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-white/15 hover:border-teal/50
                         hover:text-teal-300 hover:shadow-glow-teal flex items-center justify-center
                         text-gray-400 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-white/15 hover:border-teal/50
                         hover:text-teal-300 hover:shadow-glow-teal flex items-center justify-center
                         text-gray-400 transition-all duration-300"
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
