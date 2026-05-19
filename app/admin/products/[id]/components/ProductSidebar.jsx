"use client";

import { TrendingUp, Package, ShoppingCart, Calendar } from "lucide-react";

export default function ProductSidebar({ product }) {
  return (
    <div className="space-y-6">
      {/* Quick stats */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Performance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-zinc-400">Revenue</span>
            </div>
            <span className="text-sm font-semibold text-white">
              ৳{(product.price * product.sales).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-zinc-400">Units Sold</span>
            </div>
            <span className="text-sm font-semibold text-white">
              {product.sales}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-zinc-400">In Stock</span>
            </div>
            <span className="text-sm font-semibold text-white">
              {product.stock}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-zinc-400">Added</span>
            </div>
            <span className="text-sm text-white">Jan 2026</span>
          </div>
        </div>
      </div>

      {/* Stock bar */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
        <h3 className="text-sm font-semibold text-white mb-3">Stock Level</h3>
        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              product.stock < 10
                ? "bg-orange-400"
                : product.stock < 50
                  ? "bg-yellow-400"
                  : "bg-emerald-400"
            }`}
            style={{
              width: `${Math.min((product.stock / 100) * 100, 100)}%`,
            }}
          />
        </div>
        <p className="text-xs text-zinc-500 mt-2">
          {product.stock < 10
            ? "Low stock — consider restocking"
            : product.stock < 50
              ? "Moderate stock"
              : "Stock is healthy"}
        </p>
      </div>
    </div>
  );
}
