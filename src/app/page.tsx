import LandingHeader from "@/components/helpi-landing/LandingHeader";
import HeroSection, { TrustBand } from "@/components/helpi-landing/HeroSection";
import StepFlowSection from "@/components/helpi-landing/StepFlowSection";
import BenefitsGrid from "@/components/helpi-landing/BenefitsGrid";
import AppScreensCarousel from "@/components/helpi-landing/AppScreensCarousel";
import FAQAccordion from "@/components/helpi-landing/FAQAccordion";
import FinalCTA from "@/components/helpi-landing/FinalCTA";
import Footer from "@/components/helpi-landing/Footer";

import { HELPI_CONFIG } from "@/utils/constants";
import { steps } from "@/data/steps";
import { services } from "@/data/services";
import { faqs } from "@/data/faqs";

export default function Home() {
  return (
    <div className="min-h-screen bg-white pb-20 text-gray-900 sm:pb-0">
      <LandingHeader />
      <HeroSection {...HELPI_CONFIG.hero} />
      <TrustBand />
      <BenefitsGrid services={services} />
      <StepFlowSection steps={steps} />
      <AppScreensCarousel />
      <FAQAccordion faqs={faqs} />
      <FinalCTA {...HELPI_CONFIG.finalCTA} />
      <Footer />
    </div>
  );
}
