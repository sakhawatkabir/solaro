import { Search } from "lucide-react";

export default function ReviewsFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  ratingFilter,
  onRatingChange,
  allStatuses,
  allRatings,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search reviews..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-500/50 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-500 uppercase tracking-wider">Status</span>
        <div className="flex gap-1 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
          {allStatuses.map((s) => (
            <button
              key={s}
              onClick={() => onStatusChange(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                statusFilter === s
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-500 uppercase tracking-wider">Rating</span>
        <div className="flex gap-1 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
          {allRatings.map((r) => (
            <button
              key={r}
              onClick={() => onRatingChange(r)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                ratingFilter === r
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {r === "all" ? "All" : `${r}★`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
