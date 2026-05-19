"use client";

import { Upload } from "lucide-react";

export default function ProductImages() {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Product Images
      </h3>
      <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-emerald-500/50 transition-colors cursor-pointer">
        <Upload className="w-8 h-8 text-zinc-500 mx-auto mb-3" />
        <p className="text-sm text-zinc-400">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-zinc-500 mt-1">PNG, JPG up to 5MB</p>
      </div>
    </div>
  );
}
