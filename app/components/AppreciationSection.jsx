"use client";

import { m } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function AppreciationSection() {
  const prefersReducedMotion = useReducedMotion();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  const stats = [
    {
      value: "25+",
      label: "Years of Warranty",
      description: "Full coverage for panels, inverter, and installation",
    },
    {
      value: "5,000+",
      label: "Homes Powered",
      description: "Across all 64 districts of Bangladesh",
    },
    {
      value: "100%",
      label: "Satisfaction",
      description: "Local support team in Dhaka, available 24/7",
    },
  ];

  return (
    <section className="bg-ink py-32 px-8 lg:px-16 text-cream">
      <div className="max-w-[1400px] mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: transitionDuration }}
          className="text-center mb-24 max-w-4xl mx-auto"
        >
          <div className="text-accent font-semibold text-sm tracking-widest uppercase mb-6">
            Our Impact
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading leading-tight">
            We've helped thousands of Bangladeshi families take control of
            their energy costs and say goodbye to{" "}
            <span className="italic text-accent">
              load shedding forever.
            </span>
          </h2>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-cream/10 pt-16">
          {stats.map((stat) => (
            <m.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-6xl font-heading font-semibold text-accent mb-4">
                {stat.value}
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">
                {stat.label}
              </h3>
              <p className="text-cream/70 font-body text-sm leading-relaxed max-w-xs mx-auto">
                {stat.description}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
