import { Search } from "lucide-react";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <section className="px-8 lg:px-16 pb-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative max-w-md">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light"
          />
          <input
            type="text"
            placeholder="Search your district…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-ink/10 rounded-full text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
          />
        </div>
      </div>
    </section>
  );
}
