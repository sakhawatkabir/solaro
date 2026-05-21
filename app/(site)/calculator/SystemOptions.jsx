"use client";

import { m } from "framer-motion";
import { useRef } from "react";
import { systemRecommendations } from "./data";

export default function SystemOptions({
  recommendedSystem,
  roofCapacity,
  prefersReducedMotion,
}) {
  const selectedRef = useRef(null);

  return (
    <div className="mb-8">
      <h3 className="text-xl font-heading font-semibold text-ink mb-6">
        All System Options
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemRecommendations.map((system) => {
          const isRecommended = system.kw === recommendedSystem.kw;
          const canFit = roofCapacity >= system.panels;
          return (
            <m.button
              key={system.kw}
              onClick={() => {
                selectedRef.current = system.kw;
              }}
              whileHover={prefersReducedMotion ? {} : { y: -3 }}
              className={`p-6 rounded-xl border-2 text-left transition-all ${
                isRecommended
                  ? "border-accent bg-accent/5 shadow-lg shadow-accent/10"
                  : "border-ink/10 bg-white hover:border-accent/30"
              } ${!canFit ? "opacity-50" : ""}`}
            >
              {isRecommended && (
                <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                  Recommended
                </div>
              )}
              <div className="font-heading font-semibold text-ink mb-1">
                {system.name}
              </div>
              <div className="text-xl font-semibold text-accent mb-3">
                ৳{system.price.toLocaleString("bn-BD")}
              </div>
              <div className="text-sm text-ink-mid mb-2">
                ৳{system.monthlySavings.toLocaleString()}/month savings
              </div>
              <div className="text-xs text-ink-light">
                {system.panels} panels • {system.battery} battery
              </div>
              {!canFit && (
                <div className="text-xs text-red-500 mt-2">
                  Needs {system.panels * 40} sq ft roof
                </div>
              )}
            </m.button>
          );
        })}
      </div>
    </div>
  );
}
