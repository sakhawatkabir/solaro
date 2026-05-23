export default function TableSkeleton({ rows = 5, cols = 5, className = "" }) {
  return (
    <div
      className={`bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden animate-pulse ${className}`}
    >
      <div className="border-b border-zinc-800">
        <div className="flex gap-6 px-6 py-4">
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className="h-4 bg-zinc-800 rounded flex-1" />
          ))}
        </div>
      </div>
      <div className="divide-y divide-zinc-800/50">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-6 px-6 py-4 items-center">
            {Array.from({ length: cols }).map((_, c) => (
              <div
                key={c}
                className={`h-4 bg-zinc-800 rounded flex-1 ${c === 0 ? "max-w-[120px]" : ""}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
