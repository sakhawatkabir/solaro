"use client";

import { CheckCircle } from "lucide-react";

export default function LeadsHeader({ totalLeads, convertedCount }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
        <p className="text-sm text-zinc-400 mt-1">
          {totalLeads} messages from website contact form
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg text-sm">
          <CheckCircle className="w-4 h-4" />
          <span className="font-semibold">{convertedCount}</span>
          <span className="text-zinc-400">converted</span>
        </div>
      </div>
    </div>
  );
}
