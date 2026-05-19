"use client";

import { Phone } from "lucide-react";
import Link from "next/link";

export default function ProductCTA() {
  return (
    <section className="px-8 lg:px-16 pb-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-ink rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl lg:text-4xl font-heading font-semibold text-white mb-4">
            Need Help Choosing the Right System?
          </h3>
          <p className="text-ink-faint text-lg mb-8 max-w-2xl mx-auto">
            Our solar experts will assess your home, calculate your energy
            needs, and recommend the perfect system. Free consultation, no
            obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <span className="px-8 py-4 bg-accent text-white rounded-full font-semibold hover:bg-accent-mid transition-colors inline-block">
                Get Free Consultation
              </span>
            </Link>
            <a
              href="tel:+8801XXXXXXXXX"
              className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone size={18} />
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
