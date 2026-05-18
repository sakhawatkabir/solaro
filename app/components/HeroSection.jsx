"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-cream pt-32 pb-16">
      <div className="w-full max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left - Text */}
          <div className="flex-1 flex flex-col justify-center lg:pr-12 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-accent font-semibold text-sm tracking-widest uppercase mb-6"
            >
              Premium Grade Equipment
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-ink mb-8 tracking-tight"
            >
              High-efficiency <br className="hidden lg:block" />
              <span className="text-accent italic">solar panels.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-lg md:text-xl text-ink-mid leading-relaxed mb-12 max-w-[500px] mx-auto lg:mx-0"
            >
              Shop industry-leading monocrystalline solar panels and complete
              DIY kits. Direct from the manufacturer to your door.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16"
            >
              <button className="px-8 py-4 bg-accent hover:bg-accent-mid text-white rounded font-body font-semibold text-base transition-colors cursor-pointer">
                Shop Panels
              </button>
              <button className="px-8 py-4 bg-transparent text-ink border border-ink hover:bg-black/5 rounded font-body font-semibold text-base transition-colors cursor-pointer">
                View Complete Kits
              </button>
            </motion.div>
          </div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative rounded-2xl overflow-hidden shadow-2xl w-full"
            style={{ aspectRatio: "4/5", maxHeight: "700px" }}
          >
            <img
              src="https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=2074&auto=format&fit=crop"
              alt="High efficiency solar panels"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Minimalist Data Card overlay */}
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded max-w-[250px] shadow-lg">
              <div className="font-body text-sm text-ink-mid mb-2">
                Highest Rated Output
              </div>
              <div className="font-heading text-4xl font-bold text-accent">
                400W
              </div>
              <div className="font-body text-xs text-ink mt-2">
                Monocrystalline Cell
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
