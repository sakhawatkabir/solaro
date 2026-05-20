"use client";

import { Users, TrendingUp } from "lucide-react";

export default function LeadsHeader({ totalLeads }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-emerald-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-sm text-zinc-400">
            {totalLeads} total lead{totalLeads !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
