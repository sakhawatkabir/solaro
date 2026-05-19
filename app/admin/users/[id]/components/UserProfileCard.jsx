"use client";

import { Mail, User, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserProfileCard({ user, role }) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const roleBadgeMap = {
    "super-admin": "bg-purple-500/10 text-purple-400",
    manager: "bg-blue-500/10 text-blue-400",
    editor: "bg-amber-500/10 text-amber-400",
    support: "bg-emerald-500/10 text-emerald-400",
    viewer: "bg-zinc-500/10 text-zinc-400",
    custom: "bg-pink-500/10 text-pink-400",
  };

  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Profile</h2>
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-semibold text-emerald-400">
            {initials}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{user.name}</h3>
          <div className="flex items-center gap-1.5 text-sm text-zinc-400 mt-1">
            <Mail className="w-3.5 h-3.5" />
            {user.email}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span
              className={cn(
                "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                roleBadgeMap[user.role] || "bg-zinc-500/10 text-zinc-400",
              )}
            >
              <Shield className="w-3 h-3 mr-1" />
              {role?.label || user.role}
            </span>
            <span
              className={cn(
                "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                user.status === "active"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400",
              )}
            >
              {user.status === "active" ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
        <div>
          <div className="text-xs text-zinc-500 mb-1">User ID</div>
          <div className="text-sm font-mono text-zinc-300">{user.id}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500 mb-1">Role</div>
          <div className="text-sm text-zinc-300">
            {role?.label || user.role}
          </div>
        </div>
      </div>
    </div>
  );
}
