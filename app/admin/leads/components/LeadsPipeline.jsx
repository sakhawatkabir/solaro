"use client";

import { MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";

const statusIcons = {
  new: MessageSquare,
  contacted: Clock,
  quoted: () => (
    <svg
      className="size-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
      />
    </svg>
  ),
  converted: CheckCircle,
  lost: XCircle,
};

const statusColors = {
  new: "text-blue-400",
  contacted: "text-purple-400",
  quoted: "text-indigo-400",
  converted: "text-emerald-400",
  lost: "text-red-400",
};

export default function LeadsPipeline({
  statusCounts,
  activeFilter,
  onFilterChange,
}) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {statusCounts.map(({ status, count }) => {
        const Icon = statusIcons[status];
        return (
          <button
            key={status}
            onClick={() => onFilterChange(status)}
            className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border transition-colors ${
              activeFilter === status
                ? "bg-emerald-500/10 border-emerald-500/20"
                : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
            }`}
          >
            <Icon className={`size-5 ${statusColors[status]}`} />
            <span className="text-xl font-bold text-white">{count}</span>
            <span className="text-xs text-zinc-400 capitalize">{status}</span>
          </button>
        );
      })}
    </div>
  );
}
