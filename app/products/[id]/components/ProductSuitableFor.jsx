"use client";

import { CheckCircle } from "lucide-react";

export default function ProductSuitableFor({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="px-8 lg:px-16 pb-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-gradient-to-br from-accent to-accent-mid rounded-2xl p-8 lg:p-12 text-white">
          <h3 className="text-2xl lg:text-3xl font-heading font-semibold mb-6">
            Perfect For
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-white/10 rounded-xl p-4 backdrop-blur-sm"
              >
                <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
