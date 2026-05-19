"use client";

import { Clock, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserActivityCard({ lastLogin, status }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Activity</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Activity className="w-4 h-4" />
            <span>Status</span>
          </div>
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
              status === "active"
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400",
            )}
          >
            {status === "active" ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Clock className="w-4 h-4" />
            <span>Last Login</span>
          </div>
          <span className="text-sm text-zinc-300">{lastLogin}</span>
        </div>
      </div>
    </div>
  );
}
