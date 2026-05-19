"use client";

import { Trash2 } from "lucide-react";

export default function ProductDangerZone() {
  return (
    <div className="rounded-xl bg-zinc-900 border border-red-500/20 p-6">
      <h3 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h3>
      <p className="text-sm text-zinc-400 mb-4">
        Once deleted, this product cannot be recovered.
      </p>
      <button className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 text-sm font-medium transition-colors">
        <Trash2 className="w-4 h-4" />
        Delete Product
      </button>
    </div>
  );
}
