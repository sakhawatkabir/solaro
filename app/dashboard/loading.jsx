export default function DashboardLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-ink/10 rounded" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 bg-ink/10 rounded-xl" />
        ))}
      </div>
      <div className="h-48 bg-ink/10 rounded-xl" />
    </div>
  );
}
