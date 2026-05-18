"use client";

import { motion } from "framer-motion";

export default function AppreciationSection() {
  const stats = [
    {
      value: "25+",
      label: "Years of Warranty",
      description: "Full coverage for panels and installation",
    },
    {
      value: "10k+",
      label: "Homes Powered",
      description: "Across the country and growing daily",
    },
    {
      value: "100%",
      label: "Satisfaction",
      description: "Dedicated support team available 24/7",
    },
  ];

  return (
    <section className="bg-ink py-32 px-8 lg:px-16 text-cream">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24 max-w-4xl mx-auto"
        >
          <div className="text-accent font-semibold text-sm tracking-widest uppercase mb-6">
            Our Impact
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading leading-tight">
            We've helped homeowners and businesses transform their energy usage,
            saving money and{" "}
            <span className="italic text-accent">
              protecting the environment.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-cream/10 pt-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-6xl font-heading font-bold text-accent mb-4">
                {stat.value}
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">
                {stat.label}
              </h3>
              <p className="text-cream/70 font-body text-sm leading-relaxed max-w-xs mx-auto">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
