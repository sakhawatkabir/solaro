"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function RegisterPromo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.2 }}
      className="hidden lg:block"
    >
      <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
        <Image
          src="https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=1200&auto=format&fit=crop"
          alt="Solar installation"
          width={1200}
          height={1500}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/20 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="text-white font-heading font-semibold text-xl mb-2">
              Monitor Your System 24/7
            </div>
            <p className="text-white/80 text-sm">
              Real-time energy production, battery status, and savings tracking
              from anywhere.
            </p>
          </div>
        </div>
      </div>
    </m.div>
  );
}
