"use client";

import Link from "next/link";
import { Plus, Package } from "lucide-react";

export default function ProductsHeader({
  totalProducts,
  totalStock,
  totalSales,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Products</h1>
        <p className="text-sm text-zinc-400 mt-1">
          {totalProducts} products · {totalStock} total stock
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg text-sm">
          <Package className="w-4 h-4" />
          <span className="font-semibold">{totalSales}</span>
          <span className="text-zinc-400">sales</span>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>
    </div>
  );
}
