"use client";

import { Search } from "lucide-react";

export default function DistrictsFilters({
  search,
  onSearchChange,
  divisionFilter,
  onDivisionChange,
  coverageFilter,
  onCoverageChange,
  allDivisions,
  allCoverageOptions,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by district name..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
        />
      </div>
      <select
        value={divisionFilter}
        onChange={(e) => onDivisionChange(e.target.value)}
        className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-500/50 text-sm cursor-pointer"
      >
        {allDivisions.map((div) => (
          <option key={div} value={div} className="bg-zinc-900">
            {div === "all" ? "All Divisions" : div}
          </option>
        ))}
      </select>
      <select
        value={coverageFilter}
        onChange={(e) => onCoverageChange(e.target.value)}
        className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-500/50 text-sm cursor-pointer"
      >
        {allCoverageOptions.map((opt) => (
          <option key={opt} value={opt} className="bg-zinc-900">
            {opt === "all"
              ? "All Coverage"
              : opt === "covered"
                ? "Covered"
                : "Uncovered"}
          </option>
        ))}
      </select>
    </div>
  );
}
