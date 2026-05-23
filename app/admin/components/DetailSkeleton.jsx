export default function DetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-zinc-800 rounded-lg" />
        <div className="h-9 w-32 bg-zinc-800 rounded-lg" />
      </div>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="size-12 rounded-full bg-zinc-800" />
          <div className="space-y-2">
            <div className="h-5 w-40 bg-zinc-800 rounded" />
            <div className="h-4 w-24 bg-zinc-800 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="h-3 w-20 bg-zinc-800 rounded mb-2" />
              <div className="h-5 w-32 bg-zinc-800 rounded" />
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 h-48" />
    </div>
  );
}
