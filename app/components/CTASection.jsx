"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="bg-cream py-32 px-8 lg:px-16 border-t border-ink/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative rounded-2xl overflow-hidden bg-ink min-h-[500px] flex items-center">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1548614945-8c704da88432?q=80&w=2000&auto=format&fit=crop"
              alt="Beautiful solar home"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent"></div>
          </div>

          <div className="relative z-10 p-12 lg:p-24 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6 tracking-tight">
                Ready to build your{" "}
                <span className="text-primary italic">solar setup?</span>
              </h2>
              <p className="text-cream/80 text-lg leading-relaxed mb-10 font-body max-w-md">
                Join the renewable revolution. Browse our catalog of premium
                solar panels, inverters, and complete DIY kits.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-primary hover:bg-primary/90 text-ink font-semibold rounded font-body text-base transition-colors cursor-pointer shadow-lg">
                  Shop All Products
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
