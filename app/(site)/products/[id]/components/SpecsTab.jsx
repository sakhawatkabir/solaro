"use client";

import {
  Zap,
  Sun,
  Battery,
  Clock,
  Home,
  Shield,
  Star,
  Truck,
} from "lucide-react";

const specIcons = {
  panels: Sun,
  inverter: Zap,
  battery: Battery,
  backupTime: Clock,
  coverage: Home,
  warranty: Shield,
  power: Zap,
  efficiency: Star,
  cells: Sun,
  dimensions: Home,
  weight: Truck,
  capacity: Battery,
  type: Battery,
  cycles: Clock,
  voltage: Zap,
  bms: Shield,
  mppt: Zap,
  input: Zap,
  output: Zap,
};

export default function SpecsTab({ specs }) {
  if (!specs || Object.keys(specs).length === 0) {
    return (
      <div className="text-center py-8 text-ink-mid">
        No specifications available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(specs).map(([key, value]) => {
        const Icon = specIcons[key] || Zap;
        return (
          <div
            key={key}
            className="flex items-start gap-4 p-4 rounded-xl bg-cream/50"
          >
            <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Icon size={20} className="text-accent" />
            </div>
            <div>
              <div className="text-xs text-ink-light uppercase tracking-wider mb-1">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </div>
              <div className="text-ink font-medium">{value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
