"use client";

import { DollarSign, Hash } from "lucide-react";

export default function ProductPricing({ formData, updateField }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Pricing & Stock</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Original Price (৳)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
            <input
              type="number"
              value={formData.originalPrice}
              onChange={(e) => updateField("originalPrice", e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Price (৳)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
            <input
              type="number"
              value={formData.price}
              onChange={(e) => updateField("price", e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Stock Quantity
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => updateField("stock", e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
