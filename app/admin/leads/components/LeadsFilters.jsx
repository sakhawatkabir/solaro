"use client";

import { Search, ChevronDown } from "lucide-react";

const statusOrder = ["new", "contacted", "quoted", "converted", "lost"];
const sourceOptions = ["all", "calculator", "contact", "referral", "social"];

export default function LeadsFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sourceFilter,
  onSourceChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
        />
      </div>
      <div className="flex gap-3">
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm focus:outline-none focus:border-emerald-500/50 cursor-pointer"
          >
            <option value="all" className="bg-zinc-900">
              All Status
            </option>
            {statusOrder.map((s) => (
              <option key={s} value={s} className="bg-zinc-900">
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={sourceFilter}
            onChange={(e) => onSourceChange(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm focus:outline-none focus:border-emerald-500/50 cursor-pointer"
          >
            {sourceOptions.map((s) => (
              <option key={s} value={s} className="bg-zinc-900">
                {s === "all"
                  ? "All Sources"
                  : s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
