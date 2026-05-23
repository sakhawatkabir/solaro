"use client";

import { memo } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-zinc-400 mb-1">{label}</p>
        <p className="text-sm font-semibold text-emerald-400">
          ৳{payload[0].value.toLocaleString()}
        </p>
        <p className="text-xs text-zinc-400">
          {payload[0].payload.orders} orders
        </p>
      </div>
    );
  }
  return null;
};

const RevenueChart = memo(function RevenueChart({ data }) {
  const currentMonthRevenue = data[data.length - 1]?.revenue || 0;
  const previousMonthRevenue = data[data.length - 2]?.revenue || 0;
  const percentageChange =
    previousMonthRevenue > 0
      ? (
          ((currentMonthRevenue - previousMonthRevenue) /
            previousMonthRevenue) *
          100
        ).toFixed(1)
      : currentMonthRevenue > 0
        ? "100.0"
        : "0.0";
  const isPositive = parseFloat(percentageChange) >= 0;

  return (
    <div className="lg:col-span-2 rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Revenue</h2>
          <p className="text-sm text-zinc-400">Monthly revenue trend</p>
        </div>
        <div
          className={`flex items-center gap-2 ${isPositive ? "text-emerald-400" : "text-red-400"}`}
        >
          <ArrowUpRight
            className={`size-4 ${!isPositive ? "rotate-90" : ""}`}
          />
          <span className="text-sm font-semibold">
            {isPositive ? "+" : ""}
            {percentageChange}%
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#27272a"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            stroke="#71717a"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#71717a"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

export default RevenueChart;
