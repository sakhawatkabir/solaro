"use client";

import Link from "next/link";
import { ChevronRight, Download } from "lucide-react";
import StatusBadge from "../../../components/StatusBadge";

export default function OrderDetailHeader({
  order,
  showStatusDropdown,
  onToggleStatus,
  onStatusChange,
  statusOrder,
  isUpdating,
}) {
  const isCancelled = order.status === "CANCELLED";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <Link
          href="/admin/orders"
          className="hover:text-white transition-colors"
        >
          Orders
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-emerald-400 font-medium">
          {order.orderNumber}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white text-sm transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
        {!isCancelled && (
          <div className="relative">
            <button
              onClick={onToggleStatus}
              disabled={isUpdating}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-sm transition-colors disabled:opacity-50"
            >
              <StatusBadge status={order.status.toLowerCase()} />
              <span>Update</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            {showStatusDropdown && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl z-10">
                {statusOrder.map((status) => (
                  <button
                    key={status}
                    onClick={() => onStatusChange(status)}
                    disabled={isUpdating}
                    className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 hover:bg-zinc-800 transition-colors disabled:opacity-50 ${
                      status === order.status
                        ? "text-emerald-400"
                        : "text-zinc-300"
                    }`}
                  >
                    <StatusBadge status={status.toLowerCase()} />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
