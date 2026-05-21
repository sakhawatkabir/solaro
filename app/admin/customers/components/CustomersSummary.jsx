"use client";

import { Users, ShoppingBag, DollarSign, ArrowUpRight } from "lucide-react";

export default function CustomersSummary({ customers, totalSpent }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Users className="size-5 text-zinc-400" />
          <span className="text-sm text-zinc-400">Total</span>
        </div>
        <div className="text-2xl font-bold text-white">{customers.length}</div>
      </div>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingBag className="size-5 text-emerald-400" />
          <span className="text-sm text-zinc-400">Active Buyers</span>
        </div>
        <div className="text-2xl font-bold text-emerald-400">
          {customers.filter((c) => c.orders > 0).length}
        </div>
      </div>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="size-5 text-blue-400" />
          <span className="text-sm text-zinc-400">Avg. Spent</span>
        </div>
        <div className="text-2xl font-bold text-white">
          ৳{Math.round(totalSpent / customers.length).toLocaleString()}
        </div>
      </div>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-2">
          <ArrowUpRight className="size-5 text-purple-400" />
          <span className="text-sm text-zinc-400">New (30d)</span>
        </div>
        <div className="text-2xl font-bold text-purple-400">
          {customers.filter((c) => c.joined >= "2026-04-19").length}
        </div>
      </div>
    </div>
  );
}
