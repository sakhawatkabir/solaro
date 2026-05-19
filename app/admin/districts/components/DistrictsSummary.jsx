"use client";

import { MapPin, CheckCircle, DollarSign, TrendingUp } from "lucide-react";

export default function DistrictsSummary({
  districts,
  activeCount,
  totalRevenue,
}) {
  const inactiveCount = districts.length - activeCount;
  const avgRevenue =
    activeCount > 0 ? Math.round(totalRevenue / activeCount) : 0;
  const topDistrict = [...districts].sort((a, b) => b.orders - a.orders)[0];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-zinc-400" />
          <span className="text-sm text-zinc-400">Total</span>
        </div>
        <div className="text-2xl font-bold text-white">{districts.length}</div>
      </div>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-sm text-zinc-400">Active</span>
        </div>
        <div className="text-2xl font-bold text-emerald-400">{activeCount}</div>
      </div>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-blue-400" />
          <span className="text-sm text-zinc-400">Avg Revenue</span>
        </div>
        <div className="text-2xl font-bold text-white">
          ৳{avgRevenue.toLocaleString()}
        </div>
      </div>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <span className="text-sm text-zinc-400">Top District</span>
        </div>
        <div className="text-lg font-bold text-purple-400 truncate">
          {topDistrict?.name}
        </div>
      </div>
    </div>
  );
}
