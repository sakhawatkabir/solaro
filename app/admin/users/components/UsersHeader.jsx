"use client";

import { CheckCircle, XCircle } from "lucide-react";

export default function UsersHeader({ activeCount, inactiveCount }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Manage admin users and permissions
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg text-sm">
          <CheckCircle className="w-4 h-4" />
          <span className="font-semibold">{activeCount}</span>
          <span className="text-zinc-400">active</span>
        </div>
        <div className="flex items-center gap-1 text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg text-sm">
          <XCircle className="w-4 h-4" />
          <span className="font-semibold">{inactiveCount}</span>
          <span className="text-zinc-400">inactive</span>
        </div>
      </div>
    </div>
  );
}
