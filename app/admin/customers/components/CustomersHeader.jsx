"use client";

import { DollarSign, ShoppingBag } from "lucide-react";

export default function CustomersHeader({
  totalCustomers,
  totalSpent,
  totalOrders,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Customers</h1>
        <p className="text-sm text-zinc-400 mt-1">
          {totalCustomers} registered customers
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg text-sm">
          <DollarSign className="w-4 h-4" />
          <span className="font-semibold">
            ৳{(totalSpent / 1000).toFixed(0)}k
          </span>
          <span className="text-zinc-400">revenue</span>
        </div>
        <div className="flex items-center gap-1 text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-lg text-sm">
          <ShoppingBag className="w-4 h-4" />
          <span className="font-semibold">{totalOrders}</span>
          <span className="text-zinc-400">orders</span>
        </div>
      </div>
    </div>
  );
}
