"use client";

import Link from "next/link";
import { ChevronRight, Edit3, Trash2 } from "lucide-react";
import StatusBadge from "../../../components/StatusBadge";

export default function ProductDetailHeader({ product }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <Link
          href="/admin/products"
          className="hover:text-white transition-colors"
        >
          Products
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-emerald-400 font-medium">{product.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusBadge status={product.status} />
        <Link
          href={`/admin/products/${product.id}/edit`}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-sm transition-colors"
        >
          <Edit3 className="size-4" />
          Edit
        </Link>
        <button className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors">
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
}
