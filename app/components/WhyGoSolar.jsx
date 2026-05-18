"use client";

import { motion } from "framer-motion";

export default function WhyGoSolar() {
  const benefits = [
    {
      number: "01",
      title: "Direct from Manufacturer",
      desc: "Cut out the middleman and save thousands. We ship premium grade solar panels directly from our warehouse to your door.",
    },
    {
      number: "02",
      title: "Easy DIY Installation",
      desc: "Our complete kits come with detailed instructions, wiring diagrams, and dedicated technical support for DIY homeowners.",
    },
    {
      number: "03",
      title: "Free Freight Shipping",
      desc: "Enjoy free residential freight shipping on all complete kit orders. We ensure your panels arrive safely and on time.",
    },
    {
      number: "04",
      title: "25-Year Warranty",
      desc: "Total peace of mind with an industry-leading 25-year performance warranty on all monocrystalline panels.",
    },
  ];

  return (
    <section
      className="bg-cream py-32 px-8 lg:px-16 border-t border-ink/5"
      id="why-buy-from-us"
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
              The Advantage
            </div>
            <h2 className="text-5xl lg:text-6xl font-heading font-bold text-ink leading-tight tracking-tight max-w-2xl">
              Why buy solar <span className="text-accent italic">from us?</span>
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
              We believe in democratizing solar energy. By offering premium
              equipment directly to consumers, we make clean energy affordable
              and accessible.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col border-t border-ink/10 pt-6"
            >
              <div className="font-heading text-3xl text-accent mb-6 font-bold">
                {benefit.number}
              </div>
              <h3 className="font-heading text-2xl font-bold text-ink mb-4">
                {benefit.title}
              </h3>
              <p className="font-body text-ink-mid leading-relaxed text-base">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
