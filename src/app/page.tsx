import HeroSection from "@/components/helpi-landing/HeroSection";
import StepFlowSection from "@/components/helpi-landing/StepFlowSection";
import BenefitsGrid from "@/components/helpi-landing/BenefitsGrid";
import AppScreensCarousel from "@/components/helpi-landing/AppScreensCarousel";
import StatsSection from "@/components/helpi-landing/StatsSection";
import TestimonialCarousel from "@/components/helpi-landing/TestimonialCarousel";
import FAQAccordion from "@/components/helpi-landing/FAQAccordion";
import FinalCTA from "@/components/helpi-landing/FinalCTA";
import Footer from "@/components/helpi-landing/Footer";

import { HELPI_CONFIG } from "@/utils/constants";
import { steps } from "@/data/steps";
import { benefits } from "@/data/benefits";
import { stats } from "@/data/stats";
import { testimonials } from "@/data/testimonials";
import { faqs } from "@/data/faqs";

export default function Home() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <HeroSection {...HELPI_CONFIG.hero} />
      <StepFlowSection steps={steps} />
      <BenefitsGrid benefits={benefits} />
      <AppScreensCarousel />
      <StatsSection stats={stats} />
      <TestimonialCarousel testimonials={testimonials} />
      <FAQAccordion faqs={faqs} />
      <FinalCTA {...HELPI_CONFIG.finalCTA} />
      <Footer />
    </div>
  );
}
