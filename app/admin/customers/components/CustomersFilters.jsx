"use client";

import { Search } from "lucide-react";

export default function CustomersFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  allStatuses,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
        />
      </div>
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-500/50 text-sm cursor-pointer"
      >
        {allStatuses.map((status) => (
          <option key={status} value={status} className="bg-zinc-900">
            {status === "all" ? "All Status" : status.replace("_", " ")}
          </option>
        ))}
      </select>
    </div>
  );
}
