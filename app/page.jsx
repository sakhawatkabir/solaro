import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import WhyGoSolar from "./components/WhyGoSolar";
import AppreciationSection from "./components/AppreciationSection";
import ServicesSection from "./components/ServicesSection";
import ProcessSection from "./components/ProcessSection";
import TestimonialSection from "./components/TestimonialSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream text-ink transition-colors duration-300 font-body">
      <Navigation />
      <HeroSection />
      <WhyGoSolar />

      <AppreciationSection />

      <ServicesSection />

      <ProcessSection />

      <TestimonialSection />

      <CTASection />

      <Footer />
    </div>
  );
}
