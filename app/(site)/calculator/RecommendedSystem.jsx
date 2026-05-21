"use client";

import { TrendingUp, CheckCircle } from "lucide-react";

export default function RecommendedSystem({
  system,
  dailyGeneration,
  monthlyGeneration,
  monthlyUsage,
}) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-ink/5 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp size={20} className="text-accent" />
        <h3 className="text-xl font-heading font-semibold text-ink">
          Recommended System
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-accent font-semibold text-sm tracking-widest uppercase mb-2">
            {system.name}
          </div>
          <div className="text-4xl font-heading font-semibold text-ink mb-4">
            ৳{system.price.toLocaleString("bn-BD")}
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle size={16} className="text-accent" />
              <span>{system.panels} x 550W Panels</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle size={16} className="text-accent" />
              <span>{system.battery} Battery</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle size={16} className="text-accent" />
              <span>{system.suitable}</span>
            </div>
          </div>
        </div>

        <div className="bg-cream rounded-xl p-6">
          <h4 className="font-semibold text-ink mb-4">System Output</h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-ink-mid">Daily Generation</span>
              <span className="font-semibold">
                {dailyGeneration.toFixed(1)} kWh
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ink-mid">Monthly Generation</span>
              <span className="font-semibold">
                {monthlyGeneration.toFixed(0)} kWh
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ink-mid">Your Usage</span>
              <span className="font-semibold">
                {monthlyUsage.toFixed(0)} kWh/month
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ink-mid">Coverage</span>
              <span className="font-semibold text-accent">
                {Math.min(
                  Math.round((monthlyGeneration / monthlyUsage) * 100),
                  100,
                )}
                %
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ink-mid">Roof Required</span>
              <span className="font-semibold">{system.panels * 40} sq ft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
