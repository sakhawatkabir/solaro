"use client";

import { Search, ChevronDown } from "lucide-react";

export default function CustomersFilters({
  search,
  onSearchChange,
  districtFilter,
  onDistrictChange,
  allDistricts,
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
      <div className="relative">
        <select
          value={districtFilter}
          onChange={(e) => onDistrictChange(e.target.value)}
          className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm focus:outline-none focus:border-emerald-500/50 cursor-pointer"
        >
          {allDistricts.map((d) => (
            <option key={d} value={d} className="bg-zinc-900">
              {d === "all" ? "All Districts" : d}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
      </div>
    </div>
  );
}
