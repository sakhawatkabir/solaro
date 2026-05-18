"use client";

import { motion } from "framer-motion";

export default function ProcessSection() {
  const steps = [
    {
      title: "Calculate Your Needs",
      description:
        "Use our online calculator to determine how many panels and batteries you need for your home.",
    },
    {
      title: "Select Your Equipment",
      description:
        "Choose from our premium selection of monocrystalline panels, inverters, and complete kits.",
    },
    {
      title: "Fast, Free Freight",
      description:
        "We carefully package your solar equipment and ship it directly to your residence via free freight.",
    },
    {
      title: "DIY or Hire a Pro",
      description:
        "Install it yourself with our comprehensive guides, or hire a local contractor to mount your new system.",
    },
  ];

  return (
    <section className="bg-cream py-32 px-8 lg:px-16" id="process">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <div className="aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2000&auto=format&fit=crop"
                alt="Solar Panel Installation"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <div className="flex-1 space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-accent font-semibold text-sm tracking-widest uppercase mb-6">
                How It Works
              </div>
              <h2 className="text-5xl lg:text-6xl font-heading font-bold text-ink leading-tight">
                From our warehouse, <br />
                <span className="text-accent italic">to your roof.</span>
              </h2>
            </motion.div>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-8 items-start group cursor-pointer"
                >
                  <div className="text-3xl font-heading font-bold text-ink-mid group-hover:text-accent transition-colors">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-ink mb-3 group-hover:text-accent transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-ink-mid text-base leading-relaxed font-body">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
