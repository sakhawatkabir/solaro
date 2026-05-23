export default function AdminShellSkeleton() {
  return (
    <div className="flex min-h-screen bg-zinc-900">
      <aside className="hidden lg:flex flex-col h-screen bg-zinc-950 border-r border-zinc-800 w-[260px] sticky top-0 flex-shrink-0" />
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-zinc-800 bg-zinc-900 flex items-center px-6">
          <div className="size-8 rounded-lg bg-zinc-800 animate-pulse" />
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 animate-pulse">
            <div className="h-8 w-48 bg-zinc-800 rounded-lg" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-zinc-800 rounded-xl" />
              ))}
            </div>
            <div className="h-64 bg-zinc-800 rounded-xl" />
          </div>
        </main>
      </div>
    </div>
  );
}
