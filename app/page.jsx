"use client";

import { motion } from "framer-motion";
import Navigation from "./components/Navigation";
import Badge from "./components/Badge";
import MembersBadge from "./components/MembersBadge";
import WhyGoSolar from "./components/WhyGoSolar";
import AppreciationSection from "./components/AppreciationSection";
import ServicesSection from "./components/ServicesSection";
import ProcessSection from "./components/ProcessSection";
import TestimonialSection from "./components/TestimonialSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  const energyTypes = [
    "Tidal Energy",
    "Wind power",
    "Solar energy",
    "Biomass energy",
    "Geothermal energy",
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Navigation />

      <div className="relative overflow-hidden bg-white dark:bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1714610877277-ce7cc5e2c0ce?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
            alt="Solar panel truck by Callum Eddings on Unsplash"
            className="w-full h-full object-cover opacity-50 dark:opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/50 to-white/30 dark:from-black/80 dark:via-black/50 dark:to-transparent"></div>
        </div>

        <div className="relative z-10">
          <div className="container mx-auto px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <MembersBadge />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Badge variant="primary" className="inline-flex">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                    TOP SELLER ENERGY COMPANY
                  </Badge>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-6xl lg:text-7xl font-heading font-bold leading-tight text-black dark:text-white"
                >
                  Smart <span className="text-primary">Energy</span>
                  <br />
                  Starts Here.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-gray-600 dark:text-gray-400 text-lg max-w-xl leading-relaxed"
                >
                  Switch to solar and start saving today. Get high-quality solar
                  panels, expert installation, long-term support all designed to
                  help you live smarter and greener.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-primary hover:bg-primary/90 text-black dark:text-black font-semibold rounded-full transition-all shadow-lg shadow-primary/20"
                  >
                    Get Started
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-black dark:text-white font-semibold rounded-full backdrop-blur-sm transition-all border border-gray-300 dark:border-white/10"
                  >
                    Learn More
                  </motion.button>
                </motion.div>
              </div>

              <div className="flex flex-col items-end gap-4">
                {energyTypes.map((type, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  >
                    <Badge variant="tag">{type}</Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
