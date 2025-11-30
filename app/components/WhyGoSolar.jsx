"use client";

import { useState } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "./Badge";
import EnergyBalanceCard from "./EnergyBalanceCard";
import PropertyValueCard from "./PropertyValueCard";
import SavingsCard from "./SavingsCard";
import EnvironmentCard from "./EnvironmentCard";
import WarrantyCard from "./WarrantyCard";

export default function WhyGoSolar() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  const slides = [
    {
      cards: [
        { component: EnergyBalanceCard, key: "energy" },
        { component: PropertyValueCard, key: "property" },
      ],
    },
    {
      cards: [
        { component: SavingsCard, key: "savings" },
        { component: EnvironmentCard, key: "environment" },
      ],
    },
    {
      cards: [
        { component: WarrantyCard, key: "warranty" },
        { component: EnergyBalanceCard, key: "energy2" },
      ],
    },
    {
      cards: [
        { component: PropertyValueCard, key: "property2" },
        { component: SavingsCard, key: "savings2" },
      ],
    },
    {
      cards: [
        { component: EnvironmentCard, key: "environment2" },
        { component: WarrantyCard, key: "warranty2" },
      ],
    },
  ];

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 px-8 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Badge variant="primary" className="inline-flex">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              SELLER ENERGY COMPANY
            </Badge>

            <h2 className="text-5xl lg:text-6xl font-heading font-bold text-black dark:text-white">
              Why Go Solar?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-md"
          >
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
              Solar energy isn't just good for the planet — it's great for your
              wallet. With modern solar solutions, you can reduce electricity
              bills, increase home value, and enjoy clean energy for years to
              come.
            </p>
          </motion.div>
        </div>

        <div className="flex items-start gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start gap-8"
          >
            <motion.div
              key={currentSlide}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-6xl font-heading font-bold text-black dark:text-white"
            >
              0{currentSlide + 1}
              <span className="text-2xl text-gray-400 dark:text-gray-500 ml-1">
                /0{totalSlides}
              </span>
            </motion.div>

            <div className="flex gap-3">
              <motion.button
                onClick={handlePrevious}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-gray-400 dark:hover:border-gray-500 transition-all bg-white dark:bg-gray-800"
                aria-label="Previous slide"
              >
                <HiArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </motion.button>
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-all shadow-lg shadow-primary/20 dark:shadow-primary/30"
                aria-label="Next slide"
              >
                <HiArrowRight className="w-6 h-6 text-black" />
              </motion.button>
            </div>
          </motion.div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="wait">
              {slides[currentSlide].cards.map(
                ({ component: Component, key }, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Component />
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
