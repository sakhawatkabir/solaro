"use client";

import { TrendingUp } from "lucide-react";

export default function AnalyticsHeader({
  totalRevenue,
  timeRange,
  onTimeRangeChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-white">Analytics</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Revenue and performance insights
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg text-sm">
          <TrendingUp className="size-4" />
          <span className="font-semibold">
            ৳{(totalRevenue / 100000).toFixed(1)}L
          </span>
          <span className="text-zinc-400">revenue</span>
        </div>
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
          {["30d", "3m", "6m", "1y"].map((range) => (
            <button
              key={range}
              onClick={() => onTimeRangeChange(range)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                timeRange === range
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
