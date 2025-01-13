"use client";

import Faqs from "@/components/homePage/Faqs";
import HeroSection from "@/components/homePage/HeroSection";
import HowTo from "@/components/homePage/HowTo";


export default function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center">
    <HeroSection />
    <HowTo />
    <Faqs />
    </div>

  );
}
