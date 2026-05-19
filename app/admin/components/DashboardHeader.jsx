"use client";

export default function DashboardHeader({ dateRange, setDateRange }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Overview of your solar business performance
        </p>
      </div>
      <div className="flex items-center gap-2">
        {["7d", "30d", "90d", "1y"].map((range) => (
          <button
            key={range}
            onClick={() => setDateRange(range)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              dateRange === range
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
}
