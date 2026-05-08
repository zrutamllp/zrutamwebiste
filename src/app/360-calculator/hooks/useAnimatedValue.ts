"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";

export function useAnimatedValue() {
  const rafRef = useRef<number | null>(null);
  const [display, setDisplay] = useState("$0");

  const animate = useCallback(
    (end: number, isCurrency: boolean, currency: string, duration = 1500) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      let start: number | null = null;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const current = Math.floor(easeOutQuad * end);
        setDisplay(isCurrency ? formatCurrency(current, currency) : current.toLocaleString());
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          setDisplay(isCurrency ? formatCurrency(end, currency) : end.toLocaleString());
        }
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [],
  );

  const setInstant = useCallback((value: number, isCurrency: boolean, currency: string) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setDisplay(isCurrency ? formatCurrency(value, currency) : value.toLocaleString());
  }, []);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { display, animate, setInstant };
}
