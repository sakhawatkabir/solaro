"use client";

import { Leaf } from "lucide-react";

export default function EnvironmentalImpact({ co2Offset, monthlyGeneration }) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Leaf size={20} className="text-green-600" />
        <span className="font-semibold text-green-800">
          Environmental Impact
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-700">
            {Math.round(co2Offset * 12).toLocaleString()} kg
          </div>
          <div className="text-sm text-green-600">CO₂ offset per year</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-700">
            {Math.round((co2Offset * 12) / 20)}
          </div>
          <div className="text-sm text-green-600">Trees equivalent</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-700">
            {Math.round((monthlyGeneration * 12) / 1000).toLocaleString()} MWh
          </div>
          <div className="text-sm text-green-600">Clean energy per year</div>
        </div>
      </div>
    </div>
  );
}
