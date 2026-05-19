"use client";

import {
  Clock,
  CheckCircle,
  Loader2,
  Truck,
  Package,
  XCircle,
} from "lucide-react";

const statusIcons = {
  pending: Clock,
  confirmed: CheckCircle,
  processing: Loader2,
  shipped: Truck,
  delivered: Package,
  cancelled: XCircle,
};

const statusColors = {
  pending: "text-yellow-400",
  confirmed: "text-blue-400",
  processing: "text-purple-400",
  shipped: "text-indigo-400",
  delivered: "text-emerald-400",
  cancelled: "text-red-400",
};

export default function OrderStatusSummary({
  statusCounts,
  activeFilter,
  onFilterChange,
}) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {statusCounts.map(({ status, count }) => {
        const Icon = statusIcons[status];
        return (
          <button
            key={status}
            onClick={() => onFilterChange(status)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-colors ${
              activeFilter === status
                ? "bg-emerald-500/10 border-emerald-500/20"
                : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
            }`}
          >
            <Icon className={`w-5 h-5 ${statusColors[status]}`} />
            <span className="text-lg font-bold text-white">{count}</span>
            <span className="text-xs text-zinc-400 capitalize">{status}</span>
          </button>
        );
      })}
    </div>
  );
}
