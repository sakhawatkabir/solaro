export default function FormSkeleton({ fields = 4 }) {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-9 w-24 bg-zinc-800 rounded-lg" />
        <div className="h-9 w-28 bg-zinc-800 rounded-lg" />
      </div>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 space-y-5">
        {Array.from({ length: fields }).map((_, i) => (
          <div key={i}>
            <div className="h-3 w-24 bg-zinc-800 rounded mb-2" />
            <div className="h-10 bg-zinc-800 rounded-lg" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl bg-zinc-900 border border-zinc-800 p-6 space-y-5">
          {Array.from({ length: fields }).map((_, i) => (
            <div key={i}>
              <div className="h-3 w-24 bg-zinc-800 rounded mb-2" />
              <div className="h-10 bg-zinc-800 rounded-lg" />
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 space-y-4">
          <div className="h-32 bg-zinc-800 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
