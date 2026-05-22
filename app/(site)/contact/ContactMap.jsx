"use client";

import { m } from "framer-motion";
import { Building2, MapPin, Clock, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function ContactMap() {
  const prefersReducedMotion = useReducedMotion();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  return (
    <m.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: transitionDuration }}
      className="space-y-6"
    >
      <div className="rounded-2xl overflow-hidden aspect-[4/3]">
        <Image
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop"
          alt="SOLARO office Dhaka"
          width={1200}
          height={900}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white rounded-2xl p-6 border border-ink/5">
        <div className="flex items-center gap-2 mb-4">
          <Building2 size={20} className="text-accent" />
          <h3 className="font-heading font-semibold text-ink">
            Head Office — Dhaka
          </h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-ink font-medium">45 Greenfield Street</div>
              <div className="text-ink-mid">Dhaka 1212, Bangladesh</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={16} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-ink font-medium">Office Hours</div>
              <div className="text-ink-mid">
                Saturday - Thursday: 9:00 AM - 6:00 PM
              </div>
              <div className="text-ink-mid">Friday: Closed</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-accent/5 rounded-2xl p-6 border border-accent/10">
        <h3 className="font-heading font-semibold text-ink mb-4">
          Why Talk to Us?
        </h3>
        <div className="space-y-3">
          {[
            "Free home energy assessment",
            "Custom system design for your roof",
            "No obligation, no pressure",
            "Honest savings estimates",
            "Net metering guidance included",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle size={16} className="text-accent flex-shrink-0" />
              <span className="text-ink-mid text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </m.div>
  );
}
