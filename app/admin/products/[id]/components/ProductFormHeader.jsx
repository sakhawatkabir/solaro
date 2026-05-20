"use client";

import Link from "next/link";
import { ChevronRight, X, Save } from "lucide-react";

export default function ProductFormHeader({
  isEdit,
  productName,
  onSave,
  isSaving,
}) {
  return (
    <>
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <Link
          href="/admin/products"
          className="hover:text-white transition-colors"
        >
          Products
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-emerald-400 font-medium">
          {isEdit ? productName : "New Product"}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            {isEdit ? `Editing ${productName}` : "Create a new product listing"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/products"
            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 text-zinc-300 rounded-lg hover:text-white text-sm transition-colors"
          >
            <X className="w-4 h-4" />
            Cancel
          </Link>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 text-sm font-medium transition-colors"
          >
            {isSaving ? (
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isEdit ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </div>
    </>
  );
}
