export default function AdminShellSkeleton() {
  return (
    <div className="flex min-h-screen bg-zinc-900">
      <aside className="hidden lg:flex flex-col h-screen bg-zinc-950 border-r border-zinc-800 w-[260px] sticky top-0 flex-shrink-0">
        <div className="p-4 border-b border-zinc-800">
          <div className="h-8 w-32 bg-zinc-800 rounded-lg animate-pulse" />
        </div>
        <div className="p-4 space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-9 bg-zinc-800 rounded-lg animate-pulse" />
          ))}
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-zinc-800 animate-pulse" />
            <div className="h-8 w-48 bg-zinc-800 rounded-lg animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-zinc-800 animate-pulse" />
            <div className="h-8 w-20 bg-zinc-800 rounded-lg animate-pulse" />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="h-8 w-48 bg-zinc-800 rounded-lg" />
              <div className="h-9 w-32 bg-zinc-800 rounded-lg" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-zinc-900 border border-zinc-800 p-6"
                >
                  <div className="size-10 rounded-lg bg-zinc-800 mb-4" />
                  <div className="h-8 w-24 bg-zinc-800 rounded mb-2" />
                  <div className="h-4 w-16 bg-zinc-800 rounded mb-1" />
                  <div className="h-3 w-20 bg-zinc-800 rounded" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 rounded-xl bg-zinc-900 border border-zinc-800 p-6">
                <div className="h-5 w-24 bg-zinc-800 rounded mb-1" />
                <div className="h-4 w-32 bg-zinc-800 rounded mb-6" />
                <div className="h-64 bg-zinc-800 rounded-lg" />
              </div>
              <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
                <div className="h-5 w-28 bg-zinc-800 rounded mb-1" />
                <div className="h-4 w-24 bg-zinc-800 rounded mb-6" />
                <div className="h-40 bg-zinc-800 rounded-lg" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
