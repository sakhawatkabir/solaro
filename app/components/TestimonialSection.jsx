"use client";

import { useState } from "react";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "./Badge";

export default function TestimonialSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote:
        "We were tired of the rising electricity bills every month. After switching to solar with Solix, our bills dropped by nearly 70% within just three months.",
      name: "Amit Deb",
      location: "Homeowners, California",
      image: "https://i.pravatar.cc/400?u=amit-deb",
    },
    {
      quote:
        "The installation process was seamless and the team was incredibly professional. Our energy costs have decreased significantly and we're doing our part for the environment.",
      name: "Sarah Johnson",
      location: "Business Owner, Texas",
      image: "https://i.pravatar.cc/400?u=sarah-johnson",
    },
    {
      quote:
        "Best decision we ever made for our home. The savings are real and the system has been running flawlessly for over a year now.",
      name: "Michael Chen",
      location: "Homeowners, Arizona",
      image: "https://i.pravatar.cc/400?u=michael-chen",
    },
  ];

  const handlePrevious = () => {
    setCurrentTestimonial((prev) =>
      prev > 0 ? prev - 1 : testimonials.length - 1
    );
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) =>
      prev < testimonials.length - 1 ? prev + 1 : 0
    );
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="bg-white dark:bg-gray-950 py-20 px-8 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-12">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-black dark:text-white leading-tight">
              Join Thousands{" "}
              <span className="font-light text-gray-300 dark:text-gray-600">
                Who Switched to Solar
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="default"
              className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              TESTIMONIAL
            </Badge>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-500 dark:text-gray-400 text-base max-w-md mb-12"
        >
          We've helped homeowners and businesses transform their energy usage —
          saving money and protecting the environment at the same time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 lg:p-12 transition-colors duration-300"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-8 items-start"
            >
              <div className="w-full lg:w-72 aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between h-full min-h-[400px]">
                <div className="mb-6">
                  <Quote
                    className="w-12 h-12 text-gray-300 dark:text-gray-600"
                    strokeWidth={1.5}
                  />
                </div>

                <blockquote className="flex-1">
                  <p className="text-2xl lg:text-3xl font-heading text-black dark:text-white leading-relaxed mb-8">
                    {current.quote}
                  </p>

                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-black dark:text-white">
                      {current.name}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      {current.location}
                    </p>
                  </div>
                </blockquote>

                <div className="flex justify-end mt-6">
                  <Quote
                    className="w-12 h-12 text-gray-300 dark:text-gray-600 rotate-180"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-end gap-4 mt-8"
        >
          <motion.button
            onClick={handlePrevious}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 flex items-center justify-center transition-all bg-white dark:bg-gray-800"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </motion.button>
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-all shadow-lg shadow-primary/20 dark:shadow-primary/30"
            aria-label="Next testimonial"
          >
            <ArrowRight className="w-5 h-5 text-black" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
