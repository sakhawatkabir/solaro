"use client";

import { memo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const PieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-sm font-semibold text-white">{payload[0].name}</p>
        <p className="text-xs text-zinc-400">{payload[0].value}% of sales</p>
      </div>
    );
  }
  return null;
};

const CategoryChart = memo(function CategoryChart({ data }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Sales by Category</h2>
        <p className="text-sm text-zinc-400">Product distribution</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<PieTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-2 mt-4">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="size-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-sm text-zinc-300">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-white">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default CategoryChart;
