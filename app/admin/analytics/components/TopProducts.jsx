"use client";

import { ShoppingBag } from "lucide-react";

export default function TopProducts({ products }) {
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);

  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Top Products</h2>
          <p className="text-sm text-zinc-400">Best sellers by sales volume</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider pb-3">
                Product
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider pb-3 hidden sm:table-cell">
                Category
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider pb-3">
                Sales
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider pb-3 hidden md:table-cell">
                Price
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider pb-3">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {products.map((product, index) => (
              <tr
                key={product.id}
                className="hover:bg-zinc-800/50 transition-colors"
              >
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-emerald-400">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-white">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 hidden sm:table-cell">
                  <span className="text-sm text-zinc-400">
                    {product.category}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1.5 text-sm text-zinc-300">
                    <ShoppingBag className="size-3.5" />
                    <span className="font-medium">{product.sales}</span>
                  </div>
                </td>
                <td className="py-3 hidden md:table-cell">
                  <span className="text-sm text-zinc-400">
                    ৳{product.price.toLocaleString()}
                  </span>
                </td>
                <td className="py-3">
                  <span className="text-sm font-semibold text-white">
                    ৳{((product.sales * product.price) / 1000).toFixed(0)}k
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
