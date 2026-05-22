"use client";

import { m } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const faqs = [
  {
    q: "How long does installation take?",
    a: "Most residential installations are completed in 1-3 days depending on system size. Commercial projects may take 1-2 weeks.",
  },
  {
    q: "What warranties do you offer?",
    a: "25-year panel performance warranty, 5-year battery warranty, 5-year inverter warranty, and lifetime technical support.",
  },
  {
    q: "Do you help with net metering?",
    a: "Yes. We handle all DESA/DESCO net metering paperwork so you can sell excess power back to the grid.",
  },
  {
    q: "How much can I save monthly?",
    a: "Most customers save 40-70% on their electricity bill. A 3KW system typically saves ৳3,500/month.",
  },
  {
    q: "Do you serve rural areas?",
    a: "Yes. We cover all 64 districts including remote areas. Delivery timeline may be 7-14 days for remote locations.",
  },
  {
    q: "Are financing options available?",
    a: "Yes. We partner with several banks offering solar loans with competitive interest rates and flexible EMI plans.",
  },
];

export default function ContactFAQ() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="px-8 lg:px-16 pb-20">
      <div className="max-w-[1400px] mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center mb-12"
        >
          <div className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
            FAQ
          </div>
          <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-ink mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-ink-mid max-w-xl mx-auto">
            Quick answers to common questions about going solar in Bangladesh.
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {faqs.map((faq) => (
            <m.div
              key={faq.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl p-6 border border-ink/5 hover:shadow-md transition-shadow"
            >
              <h3 className="font-heading font-semibold text-ink mb-2">
                {faq.q}
              </h3>
              <p className="text-ink-mid text-sm leading-relaxed">{faq.a}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
