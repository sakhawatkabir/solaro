export default function SiteLoading() {
  return (
    <div className="min-h-screen bg-cream pt-32 px-8 lg:px-16 max-w-[1400px] mx-auto animate-pulse">
      <div className="h-10 w-72 bg-ink-faint/30 rounded-lg mb-4" />
      <div className="h-5 w-96 bg-ink-faint/30 rounded mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-6">
            <div className="h-48 bg-ink-faint/20 rounded-xl mb-4" />
            <div className="h-5 w-3/4 bg-ink-faint/30 rounded mb-3" />
            <div className="h-4 w-1/2 bg-ink-faint/30 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
