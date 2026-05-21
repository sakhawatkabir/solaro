"use client";

import { Package, ArrowUpRight } from "lucide-react";

export default function OrdersHeader({ totalOrders, deliveredCount }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-white">Orders</h1>
        <p className="text-sm text-zinc-400 mt-1">{totalOrders} total orders</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg text-sm">
          <Package className="size-4" />
          <span className="font-semibold">{totalOrders}</span>
          <span className="text-zinc-400">orders</span>
        </div>
        {deliveredCount != null && (
          <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg text-sm">
            <ArrowUpRight className="size-4" />
            <span className="font-semibold">{deliveredCount}</span>
            <span className="text-zinc-400">delivered</span>
          </div>
        )}
      </div>
    </div>
  );
}
