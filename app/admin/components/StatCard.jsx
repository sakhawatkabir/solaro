"use client";

import { memo } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

const StatCard = memo(function StatCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
  description,
}) {
  const isUp = trend === "up";

  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="size-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
          <Icon className="size-5 text-emerald-400" />
        </div>
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
            isUp
              ? "text-emerald-400 bg-emerald-500/10"
              : "text-red-400 bg-red-500/10",
          )}
        >
          {isUp ? (
            <ArrowUpRight className="size-3" />
          ) : (
            <ArrowDownRight className="size-3" />
          )}
          {change}
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-zinc-400">{label}</div>
      <div className="text-xs text-zinc-500 mt-1">{description}</div>
    </div>
  );
});

export default StatCard;
