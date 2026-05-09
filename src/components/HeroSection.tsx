"use client";

import HeroActions from "./hero/HeroActions";
import HeroBackground from "./hero/HeroBackground";
import HeroBadge from "./hero/HeroBadge";
import HeroHeadline from "./hero/HeroHeadline";
import HeroLead from "./hero/HeroLead";
import HeroProgressCard from "./hero/HeroProgressCard";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center gradient-navy overflow-hidden">
      <HeroBackground />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          <div className="max-w-xl lg:max-w-lg xl:max-w-xl">
            <HeroBadge />
            <HeroHeadline />
            <HeroLead />
            <HeroActions />
          
          </div>

          <div className="w-full lg:flex lg:justify-end">
            <HeroProgressCard />
          </div>
        </div>
      </div>
    </section>
  );
}
