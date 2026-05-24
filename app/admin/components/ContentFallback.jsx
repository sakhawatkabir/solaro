export default function ContentFallback() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page title area */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-zinc-800 rounded-lg" />
        <div className="h-9 w-32 bg-zinc-800 rounded-lg" />
      </div>

      {/* Generic card grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl bg-zinc-900 border border-zinc-800 p-6"
          >
            <div className="h-5 w-32 bg-zinc-800 rounded mb-3" />
            <div className="h-4 w-48 bg-zinc-800 rounded mb-2" />
            <div className="h-4 w-40 bg-zinc-800 rounded" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 w-28 bg-zinc-800 rounded" />
          <div className="h-4 w-20 bg-zinc-800 rounded" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 py-3 border-b border-zinc-800 last:border-0"
          >
            <div className="h-4 w-24 bg-zinc-800 rounded" />
            <div className="h-4 w-32 bg-zinc-800 rounded" />
            <div className="h-4 w-40 bg-zinc-800 rounded hidden sm:block" />
            <div className="h-4 w-16 bg-zinc-800 rounded hidden md:block" />
            <div className="h-6 w-20 bg-zinc-800 rounded ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
