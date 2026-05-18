"use client";

import { motion } from "framer-motion";

export default function WhyGoSolar() {
  const benefits = [
    {
      number: "01",
      title: "Direct from Manufacturer",
      desc: "No middlemen, no inflated prices. We import premium solar panels directly and deliver to your doorstep anywhere in Bangladesh.",
    },
    {
      number: "02",
      title: "Beat Load Shedding",
      desc: "Never suffer through scheduled blackouts again. Our battery-backed kits keep your fans, lights, and WiFi running 24/7.",
    },
    {
      number: "03",
      title: "Free Delivery Nationwide",
      desc: "We deliver and install across all 64 districts — from Dhaka to Cox's Bazar, Sylhet to Khulna. No hidden transport costs.",
    },
    {
      number: "04",
      title: "25-Year Warranty",
      desc: "Industry-leading 25-year performance warranty on all panels. Local after-sales support from our Dhaka service center.",
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
              Why go solar <span className="text-accent italic">in Bangladesh?</span>
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
              Bangladesh gets 250+ days of sunshine per year — one of the highest
              in South Asia. With rising electricity costs and frequent load
              shedding, solar isn't just green, it's the smartest investment
              you'll make for your home.
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
