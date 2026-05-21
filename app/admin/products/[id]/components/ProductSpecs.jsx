"use client";

import { Plus, X } from "lucide-react";

export default function ProductSpecs({
  specs,
  newSpec,
  onNewSpecChange,
  onAddSpec,
  onRemoveSpec,
  onUpdateSpec,
}) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Specifications</h3>
      <div className="space-y-3">
        {specs.map((spec, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="text"
              value={spec.key}
              onChange={(e) => onUpdateSpec(index, "key", e.target.value)}
              placeholder="Key"
              className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
            />
            <input
              type="text"
              value={spec.value}
              onChange={(e) => onUpdateSpec(index, "value", e.target.value)}
              placeholder="Value"
              className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
            />
            <button
              onClick={() => onRemoveSpec(index)}
              className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={newSpec.key}
            onChange={(e) => onNewSpecChange({ ...newSpec, key: e.target.value })}
            placeholder="Key"
            className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
          />
          <input
            type="text"
            value={newSpec.value}
            onChange={(e) =>
              onNewSpecChange({ ...newSpec, value: e.target.value })
            }
            placeholder="Value"
            className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
          />
          <button
            onClick={onAddSpec}
            className="p-2 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition-colors"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
