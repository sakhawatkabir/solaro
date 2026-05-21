"use client";

import {
  Package,
  Tag,
  DollarSign,
  BarChart3,
  AlertTriangle,
} from "lucide-react";

export default function ProductInfo({ product }) {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Main info card */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="size-16 rounded-xl bg-zinc-800 flex items-center justify-center">
            <Package className="size-8 text-zinc-500" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">{product.name}</h1>
            <p className="text-sm text-zinc-400 mt-1">{product.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-zinc-800/50">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="size-4 text-emerald-400" />
              <span className="text-xs text-zinc-400">Price</span>
            </div>
            <span className="text-lg font-bold text-white">
              ৳{product.price.toLocaleString()}
            </span>
          </div>
          <div className="p-4 rounded-lg bg-zinc-800/50">
            <div className="flex items-center gap-2 mb-2">
              <Package className="size-4 text-blue-400" />
              <span className="text-xs text-zinc-400">Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-lg font-bold ${
                  product.stock < 10 ? "text-orange-400" : "text-white"
                }`}
              >
                {product.stock}
              </span>
              {product.stock < 10 && (
                <AlertTriangle className="size-4 text-orange-400" />
              )}
            </div>
          </div>
          <div className="p-4 rounded-lg bg-zinc-800/50">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="size-4 text-purple-400" />
              <span className="text-xs text-zinc-400">Sales</span>
            </div>
            <span className="text-lg font-bold text-white">
              {product.sales}
            </span>
          </div>
          <div className="p-4 rounded-lg bg-zinc-800/50">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="size-4 text-orange-400" />
              <span className="text-xs text-zinc-400">Category</span>
            </div>
            <span className="text-sm font-medium text-white">
              {product.category}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Description</h3>
        <p className="text-sm text-zinc-300 leading-relaxed">
          The {product.name} is a premium solar energy solution designed for
          Bangladeshi households. It provides reliable, clean energy that
          significantly reduces electricity bills while ensuring uninterrupted
          power supply during load shedding.
        </p>
      </div>

      {/* Specifications */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Specifications
        </h3>
        <div className="space-y-3">
          {[
            { label: "Capacity", value: product.name.split(" ").pop() },
            { label: "Warranty", value: "25 years" },
            { label: "Installation", value: "Free professional installation" },
            { label: "Delivery", value: "All 64 districts" },
            { label: "Panel Type", value: "Monocrystalline" },
            { label: "Efficiency", value: "21.5%" },
          ].map((spec) => (
            <div
              key={spec.label}
              className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0"
            >
              <span className="text-sm text-zinc-400">{spec.label}</span>
              <span className="text-sm text-white font-medium">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
