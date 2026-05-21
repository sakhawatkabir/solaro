"use client";

import { Search, ChevronDown } from "lucide-react";

export default function ProductsFilters({
  search,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  allCategories,
  allStatuses,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
        />
      </div>
      <div className="flex gap-3">
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm focus:outline-none focus:border-emerald-500/50 cursor-pointer"
          >
            {allCategories.map((c) => (
              <option key={c} value={c} className="bg-zinc-900">
                {c === "all" ? "All Categories" : c.replace("_", " ")}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm focus:outline-none focus:border-emerald-500/50 cursor-pointer"
          >
            {allStatuses.map((s) => (
              <option key={s} value={s} className="bg-zinc-900">
                {s === "all"
                  ? "All Status"
                  : s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
