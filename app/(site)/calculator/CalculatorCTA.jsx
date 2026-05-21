"use client";

import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export default function CalculatorCTA() {
  return (
    <div className="bg-ink rounded-2xl p-8 text-center">
      <h3 className="text-2xl font-heading font-semibold text-white mb-4">
        Ready to Start Saving?
      </h3>
      <p className="text-ink-faint mb-6 max-w-xl mx-auto">
        Get a detailed quote with exact pricing for your home. Free site survey
        included.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/contact">
          <span className="px-8 py-4 bg-accent text-white rounded-full font-semibold hover:bg-accent-mid transition-colors inline-flex items-center gap-2">
            <Phone size={18} />
            Get Free Quote
          </span>
        </Link>
        <Link href="/products">
          <span className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors inline-flex items-center gap-2">
            Browse Products
            <ArrowRight size={18} />
          </span>
        </Link>
      </div>
    </div>
  );
}
