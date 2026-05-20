"use client";

import {
  ShoppingBag,
  Users,
  TrendingUp,
  MapPin,
  DollarSign,
  Percent,
} from "lucide-react";

const stats = [
  {
    label: "Total Products",
    key: "totalProducts",
    icon: ShoppingBag,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    label: "Total Customers",
    key: "totalCustomers",
    icon: Users,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Total Leads",
    key: "totalLeads",
    icon: TrendingUp,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    label: "District Coverage",
    key: "coverageRate",
    icon: MapPin,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    suffix: "%",
  },
];

export default function AnalyticsOverview({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const value =
          stat.key === "coverageRate"
            ? data[stat.key]?.toFixed(1) || "0"
            : data[stat.key]?.toLocaleString() || "0";

        return (
          <div
            key={stat.label}
            className="rounded-xl bg-zinc-900 border border-zinc-800 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">
              {stat.key === "coverageRate" ? `${value}%` : value}
            </p>
            <p className="text-sm text-zinc-400 mt-1">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
