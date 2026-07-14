"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/constants";
import Stat from "@/components/ui/Stat";

function AnimatedNumber({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative bg-ink grain py-20 md:py-28 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 lg:divide-x lg:divide-navy-700">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Stat
                dark
                value={
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                }
                label={stat.label}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
