"use client";

import Link from "next/link";
import { ShoppingBag, TrendingUp, MapPin } from "lucide-react";

const statusColors = {
  NEW: "bg-blue-500/10 text-blue-400",
  CONTACTED: "bg-purple-500/10 text-purple-400",
  QUALIFIED: "bg-emerald-500/10 text-emerald-400",
  PROPOSAL: "bg-yellow-500/10 text-yellow-400",
  NEGOTIATION: "bg-orange-500/10 text-orange-400",
  WON: "bg-green-500/10 text-green-400",
  LOST: "bg-red-500/10 text-red-400",
};

export default function AnalyticsTables({ data }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Top Products */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBag className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">Top Products</h3>
        </div>
        <div className="space-y-3">
          {data.topProducts.map((product, i) => (
            <div
              key={product.id}
              className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-zinc-500 w-4">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">
                    {product.name}
                  </p>
                  <p className="text-xs text-zinc-500">
                    ৳{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold text-emerald-400">
                {product.sales} sales
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Leads */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Recent Leads</h3>
        </div>
        <div className="space-y-3">
          {data.recentLeads.map((lead) => (
            <div
              key={lead.id}
              className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-white">{lead.name}</p>
                <p className="text-xs text-zinc-500">{lead.email}</p>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[lead.status] || ""}`}
              >
                {lead.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Districts */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-semibold text-white">Top Districts</h3>
        </div>
        <div className="space-y-3">
          {data.topDistricts.map((district, i) => (
            <div
              key={district.id}
              className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-zinc-500 w-4">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">
                    {district.name}
                  </p>
                  <p className="text-xs text-zinc-500">{district.division}</p>
                </div>
              </div>
              <span className="text-xs text-zinc-400">
                {(district.population / 1000000).toFixed(1)}M
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
