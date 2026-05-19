"use client";

import { ShoppingBag, TrendingUp, TrendingDown } from "lucide-react";

export default function ConversionMetrics({
  totalRevenue,
  totalOrders,
  avgOrderValue,
  revenueData,
}) {
  const currentMonth = revenueData[revenueData.length - 1];
  const prevMonth = revenueData[revenueData.length - 2];
  const revenueGrowth = prevMonth
    ? ((currentMonth.revenue - prevMonth.revenue) / prevMonth.revenue) * 100
    : 0;
  const orderGrowth = prevMonth
    ? ((currentMonth.orders - prevMonth.orders) / prevMonth.orders) * 100
    : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingBag className="w-5 h-5 text-zinc-400" />
          <span className="text-sm text-zinc-400">Total Revenue</span>
        </div>
        <div className="text-2xl font-bold text-white">
          ৳{(totalRevenue / 1000).toFixed(0)}k
        </div>
        <div className="flex items-center gap-1 mt-1">
          {revenueGrowth >= 0 ? (
            <TrendingUp className="w-3 h-3 text-emerald-400" />
          ) : (
            <TrendingDown className="w-3 h-3 text-red-400" />
          )}
          <span
            className={`text-xs font-medium ${
              revenueGrowth >= 0 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {revenueGrowth >= 0 ? "+" : ""}
            {revenueGrowth.toFixed(1)}%
          </span>
          <span className="text-xs text-zinc-500">vs last month</span>
        </div>
      </div>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingBag className="w-5 h-5 text-blue-400" />
          <span className="text-sm text-zinc-400">Total Orders</span>
        </div>
        <div className="text-2xl font-bold text-white">{totalOrders}</div>
        <div className="flex items-center gap-1 mt-1">
          {orderGrowth >= 0 ? (
            <TrendingUp className="w-3 h-3 text-emerald-400" />
          ) : (
            <TrendingDown className="w-3 h-3 text-red-400" />
          )}
          <span
            className={`text-xs font-medium ${
              orderGrowth >= 0 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {orderGrowth >= 0 ? "+" : ""}
            {orderGrowth.toFixed(1)}%
          </span>
          <span className="text-xs text-zinc-500">vs last month</span>
        </div>
      </div>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingBag className="w-5 h-5 text-purple-400" />
          <span className="text-sm text-zinc-400">Avg Order Value</span>
        </div>
        <div className="text-2xl font-bold text-white">
          ৳{avgOrderValue.toLocaleString()}
        </div>
      </div>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingBag className="w-5 h-5 text-amber-400" />
          <span className="text-sm text-zinc-400">This Month</span>
        </div>
        <div className="text-2xl font-bold text-white">
          ৳{currentMonth.revenue.toLocaleString()}
        </div>
        <div className="text-xs text-zinc-500 mt-1">
          {currentMonth.orders} orders in {currentMonth.month}
        </div>
      </div>
    </div>
  );
}
