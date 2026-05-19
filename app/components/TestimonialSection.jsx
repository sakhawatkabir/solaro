"use client";

import { m } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function TestimonialSection() {
  const prefersReducedMotion = useReducedMotion();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  const testimonials = [
    {
      quote:
        "Our DESA bill used to be ৳8,000 every month. After installing Solaro's 5kW kit, it dropped to under ৳2,000. During load shedding, we're the only house on the block with fans still running.",
      name: "Rahim Uddin",
      location: "Homeowner, Gulshan, Dhaka",
    },
    {
      quote:
        "I was skeptical about solar in Bangladesh, but the Solaro team handled everything — survey, installation, net metering. Their after-sales support in Dhaka is genuinely excellent.",
      name: "Farzana Akter",
      location: "Homeowner, Agrabad, Chattogram",
    },
  ];

  return (
    <section
      className="bg-white py-32 px-8 lg:px-16 border-t border-ink/5"
      id="reviews"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: transitionDuration }}
            className="flex-1"
          >
            <div className="text-accent font-semibold text-sm tracking-widest uppercase mb-6">
              Testimonials
            </div>
            <h2 className="text-5xl lg:text-6xl font-heading font-semibold text-ink leading-tight tracking-tight max-w-2xl">
              Join thousands of Bangladeshi families who{" "}
              <span className="text-accent italic">went solar.</span>
            </h2>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: transitionDuration, delay: 0.1 }}
            className="flex-1 lg:max-w-md pt-2 lg:pt-12"
          >
            <p className="text-ink-mid text-lg leading-relaxed font-body">
              From Dhaka to Sylhet, Chattogram to Khulna — homeowners across
              Bangladesh are cutting their electricity costs and living
              load-shedding free with Solaro.
            </p>
          </m.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {testimonials.map((t) => (
            <m.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <div className="text-accent text-6xl font-heading leading-none mb-6">
                "
              </div>
              <p className="text-2xl lg:text-3xl font-heading text-ink leading-relaxed mb-8 flex-1">
                {t.quote}
              </p>
              <div>
                <p className="text-base font-bold text-ink font-body uppercase tracking-wider">
                  {t.name}
                </p>
                <p className="text-sm text-ink-mid font-body">{t.location}</p>
              </div>
            </m.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
