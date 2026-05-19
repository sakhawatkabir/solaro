"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function ProcessSection() {
  const prefersReducedMotion = useReducedMotion();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  const steps = [
    {
      title: "Free Site Survey",
      description:
        "Our team visits your home to assess roof space, sunlight exposure, and your electricity usage. Completely free, no obligation.",
    },
    {
      title: "Custom System Design",
      description:
        "We design a system tailored to your needs — whether you want to reduce bills or go fully off-grid during load shedding.",
    },
    {
      title: "Delivery & Installation",
      description:
        "We deliver to your doorstep anywhere in BD and our certified installers set up everything. Usually done in 1-2 days.",
    },
    {
      title: "Start Saving",
      description:
        "Your system starts generating power from day one. Monitor output via mobile app. We handle net metering with DESA/DESCO.",
    },
  ];

  return (
    <section className="bg-cream py-32 px-8 lg:px-16" id="process">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <m.div
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: transitionDuration }}
            className="flex-1 w-full"
          >
            <div className="aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2000&auto=format&fit=crop"
                alt="Solar Panel Installation"
                width={2000}
                height={2500}
                className="w-full h-full object-cover"
              />
            </div>
          </m.div>

          <div className="flex-1 space-y-16">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: transitionDuration }}
            >
              <div className="text-accent font-semibold text-sm tracking-widest uppercase mb-6">
                How It Works
              </div>
              <h2 className="text-5xl lg:text-6xl font-heading font-semibold text-ink leading-tight">
                From survey to savings, <br />
                <span className="text-accent italic">in just 3 days.</span>
              </h2>
            </m.div>

            <div className="space-y-12">
              {steps.map((step) => (
                <m.div
                  key={step.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex gap-8 items-start group cursor-pointer"
                >
                  <div className="text-3xl font-heading font-semibold text-ink-mid group-hover:text-accent transition-colors">
                    0{steps.indexOf(step) + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-semibold text-ink mb-3 group-hover:text-accent transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-ink-mid text-base leading-relaxed font-body">
                      {step.description}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
