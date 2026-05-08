"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";

type CompanyLogoProps = {
  src: string;
  name: string;
  className?: string;
};

export function CompanyLogo({ src, name, className = "" }: CompanyLogoProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) return <Building2 size={24} className="text-slate-400" />;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${name} logo`}
      className={`object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 ${className}`}
      onError={() => setHasError(true)}
    />
  );
}
