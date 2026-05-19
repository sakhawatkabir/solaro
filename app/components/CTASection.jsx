"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sun, Phone } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function CTASection() {
  const prefersReducedMotion = useReducedMotion();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  return (
    <section className="py-20 px-8 lg:px-16 bg-cream">
      <div className="max-w-[1400px] mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: transitionDuration }}
          className="bg-gradient-to-br from-accent to-accent-mid rounded-3xl overflow-hidden relative"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 size-96 bg-white rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
            <div className="absolute bottom-0 left-0 size-64 bg-white rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />
          </div>

          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <div className="flex items-center gap-2 text-white/80 font-semibold text-sm tracking-widest uppercase mb-4">
                  <Sun size={16} />
                  Start Saving Today
                </div>
                <h2 className="text-4xl lg:text-5xl font-heading font-semibold text-white leading-tight mb-6">
                  Ready to go{" "}
                  <span className="italic text-primary">
                    solar in Bangladesh?
                  </span>
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
                  Get a free site survey and custom quote for your home. Serving
                  all 64 districts with free delivery and professional
                  installation.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact">
                    <span className="px-8 py-4 bg-white text-accent hover:bg-cream font-semibold rounded-full transition-colors inline-flex items-center gap-2 shadow-lg">
                      Get Free Quote
                      <ArrowRight size={18} />
                    </span>
                  </Link>
                  <Link href="/calculator">
                    <span className="px-8 py-4 bg-white/10 text-white border border-white/30 hover:bg-white/20 font-semibold rounded-full transition-colors inline-flex items-center gap-2">
                      <Phone size={18} />
                      Calculate Savings
                    </span>
                  </Link>
                </div>
              </div>

              {/* Right Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl lg:text-4xl font-heading font-semibold text-white mb-1">
                    45,500+
                  </div>
                  <div className="text-white/70 text-sm">Homes Powered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl lg:text-4xl font-heading font-semibold text-white mb-1">
                    64
                  </div>
                  <div className="text-white/70 text-sm">Districts Covered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl lg:text-4xl font-heading font-semibold text-white mb-1">
                    70%
                  </div>
                  <div className="text-white/70 text-sm">Bill Reduction</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl lg:text-4xl font-heading font-semibold text-white mb-1">
                    25yr
                  </div>
                  <div className="text-white/70 text-sm">Panel Warranty</div>
                </div>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
