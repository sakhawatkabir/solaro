"use client";

import { useState } from "react";
import {
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Quote,
  ChevronRight,
} from "lucide-react";
import StatusBadge from "@/app/admin/components/StatusBadge";

const statusIcons = {
  new: MessageSquare,
  contacted: Clock,
  quoted: Quote,
  converted: CheckCircle,
  lost: XCircle,
};

const statusOrder = ["new", "contacted", "quoted", "converted", "lost"];

export default function LeadPipelineStatus({ currentStatus, onStatusChange }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const currentIndex = statusOrder.indexOf(currentStatus);

  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-zinc-400">Lead Pipeline</h3>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white text-xs transition-colors"
          >
            <StatusBadge status={currentStatus} />
            <span>Update</span>
            <ChevronRight className="w-3 h-3" />
          </button>
          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl z-10">
              {statusOrder.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    onStatusChange(status);
                    setShowDropdown(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 hover:bg-zinc-800 transition-colors ${
                    status === currentStatus
                      ? "text-emerald-400"
                      : "text-zinc-300"
                  }`}
                >
                  <StatusBadge status={status} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        {statusOrder.map((status, i) => {
          const Icon = statusIcons[status];
          const isActive = i <= currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className="flex items-center flex-1 group"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isCurrent
                      ? "bg-emerald-500 text-white ring-4 ring-emerald-500/20"
                      : isActive
                        ? "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20"
                        : "bg-zinc-800 text-zinc-600 group-hover:bg-zinc-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs mt-2 transition-colors ${
                    isCurrent
                      ? "text-emerald-400 font-medium"
                      : isActive
                        ? "text-zinc-300"
                        : "text-zinc-600"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
              {i < statusOrder.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-colors ${
                    i < currentIndex ? "bg-emerald-500/30" : "bg-zinc-800"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
