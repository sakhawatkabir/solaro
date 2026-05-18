"use client";

import { motion } from "framer-motion";

export default function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "We were tired of the rising electricity bills every month. After switching to solar with Solaro, our bills dropped by nearly 70% within just three months.",
      name: "Amit Deb",
      location: "Homeowner, California",
    },
    {
      quote:
        "The freight shipping was incredibly fast and everything was packaged perfectly. The DIY instructions in their kit made it so easy to get our off-grid cabin running.",
      name: "Sarah Johnson",
      location: "Off-Grid Enthusiast, Texas",
    },
  ];

  return (
    <section
      className="bg-white py-32 px-8 lg:px-16 border-t border-ink/5"
      id="reviews"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="text-accent font-semibold text-sm tracking-widest uppercase mb-6">
              Testimonials
            </div>
            <h2 className="text-5xl lg:text-6xl font-heading font-bold text-ink leading-tight tracking-tight max-w-2xl">
              Join thousands who{" "}
              <span className="text-accent italic">switched to solar.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 lg:max-w-md pt-2 lg:pt-12"
          >
            <p className="text-ink-mid text-lg leading-relaxed font-body">
              We've helped homeowners and businesses transform their energy
              usage — saving money and protecting the environment at the same
              time.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {testimonials.map((t, idx) => (
            <motion.blockquote
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
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
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
