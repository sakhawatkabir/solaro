import { getFeaturedProducts } from "@/app/actions/products";
import HeroSection from "../components/HeroSection";
import WhyGoSolar from "../components/WhyGoSolar";
import AppreciationSection from "../components/AppreciationSection";
import FeaturedProducts from "../components/FeaturedProducts";
import ProcessSection from "../components/ProcessSection";
import TestimonialSection from "../components/TestimonialSection";
import CTASection from "../components/CTASection";

export default async function Home() {
  const initialProducts = await getFeaturedProducts(6);

  return (
    <>
      <HeroSection />
      <WhyGoSolar />
      <AppreciationSection />
      <FeaturedProducts initialData={initialProducts} />
      <ProcessSection />
      <TestimonialSection />
      <CTASection />
    </>
  );
}
