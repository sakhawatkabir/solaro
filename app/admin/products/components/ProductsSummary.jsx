"use client";

export default function ProductsSummary({ products, totalStock }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <div className="text-2xl font-bold text-white">{products.length}</div>
        <div className="text-sm text-zinc-400">Total Products</div>
      </div>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <div className="text-2xl font-bold text-emerald-400">
          {products.filter((p) => p.status === "active").length}
        </div>
        <div className="text-sm text-zinc-400">Active</div>
      </div>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <div className="text-2xl font-bold text-white">{totalStock}</div>
        <div className="text-sm text-zinc-400">Total Stock</div>
      </div>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <div className="text-2xl font-bold text-orange-400">
          {products.filter((p) => p.stock < 10).length}
        </div>
        <div className="text-sm text-zinc-400">Low Stock</div>
      </div>
    </div>
  );
}
