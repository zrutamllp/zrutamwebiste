"use client";

import { useEffect, useRef, useState } from "react";

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
};

export function FadeIn({ children, delay = 0, className = "", direction = "up" }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = domRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    observer.observe(node);
    return () => {
      observer.unobserve(node);
    };
  }, []);

  const baseStyles = "transition-all duration-1000 ease-out will-change-transform";
  const hiddenStyles: Record<string, string> = {
    up: "opacity-0 translate-y-12",
    down: "opacity-0 -translate-y-12",
    left: "opacity-0 translate-x-12",
    right: "opacity-0 -translate-x-12",
    none: "opacity-0 scale-95",
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
}
