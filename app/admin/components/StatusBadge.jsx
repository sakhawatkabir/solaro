"use client";

import { cn } from "@/lib/utils";

const statusStyles = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  confirmed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  processing: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  shipped: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  contacted: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  quoted: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  converted: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  lost: "bg-red-500/10 text-red-400 border-red-500/20",
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  ACTIVE: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  draft: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  DRAFT: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  "out-of-stock": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  OUT_OF_STOCK: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export default function StatusBadge({ status }) {
  const style =
    statusStyles[status] || "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";

  const label = status ? status.replace("_", " ").toLowerCase() : status;

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize",
        style,
      )}
    >
      {label}
    </span>
  );
}
