"use client";

import { MapPin } from "lucide-react";

export default function DistrictRanking({ districts }) {
  const maxRevenue = districts.length > 0 ? districts[0].revenue : 1;

  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Top Districts</h2>
        <p className="text-sm text-zinc-400">Revenue by location</p>
      </div>
      <div className="space-y-4">
        {districts.map((district, index) => {
          const barWidth = (district.revenue / maxRevenue) * 100;
          return (
            <div key={district.name}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-500 w-4">
                    {index + 1}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-zinc-400" />
                    <span className="text-sm text-zinc-300">
                      {district.name}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-500">
                    {district.orders} orders
                  </span>
                  <span className="text-sm font-semibold text-white">
                    ৳{(district.revenue / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>
              <div className="ml-6 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
