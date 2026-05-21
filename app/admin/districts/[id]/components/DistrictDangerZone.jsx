"use client";

import { Trash2, AlertTriangle } from "lucide-react";

export default function DistrictDangerZone({ onDelete }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-red-500/20 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-10 rounded-xl bg-red-500/10 flex items-center justify-center">
          <AlertTriangle className="size-5 text-red-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Danger Zone</h3>
          <p className="text-sm text-zinc-400">Irreversible actions</p>
        </div>
      </div>
      <button
        onClick={onDelete}
        className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-medium transition-colors border border-red-500/20"
      >
        <Trash2 className="size-4" />
        Delete District
      </button>
    </div>
  );
}
