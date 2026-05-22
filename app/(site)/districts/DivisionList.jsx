import { m } from "framer-motion";
import { MapPin, Search, Clock, Phone, Zap, CheckCircle, ChevronDown } from "lucide-react";

export default function DivisionList({
  isLoading,
  filteredDivisions,
  expandedDivision,
  setExpandedDivision,
}) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`skeleton-${i}`}
            className="bg-white rounded-2xl border border-ink/5 p-6 animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="size-10 bg-zinc-200 rounded-full" />
              <div className="space-y-2">
                <div className="h-5 w-32 bg-zinc-200 rounded" />
                <div className="h-4 w-24 bg-zinc-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredDivisions.length === 0) {
    return (
      <div className="text-center py-16">
        <Search size={48} className="text-ink-faint mx-auto mb-4" />
        <h3 className="text-xl font-heading font-semibold text-ink mb-2">
          No districts found
        </h3>
        <p className="text-ink-mid">
          Try searching with a different district name.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredDivisions.map((div, index) => (
        <m.div
          key={div.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="bg-white rounded-2xl border border-ink/5 overflow-hidden"
        >
          <button
            onClick={() =>
              setExpandedDivision(
                expandedDivision === div.name ? null : div.name,
              )
            }
            className="w-full flex items-center justify-between p-6 hover:bg-cream/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{div.icon}</span>
              <div className="text-left">
                <h3 className="text-xl font-heading font-semibold text-ink">
                  {div.name} Division
                </h3>
                <div className="flex items-center gap-4 text-sm text-ink-mid">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {div.districts.length} districts
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap size={14} />
                    {div.installations} installs
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
                <Clock size={14} className="text-accent" />
                <span className="text-sm font-medium text-accent">
                  {div.timeline}
                </span>
              </div>
              <ChevronDown
                size={20}
                className={`text-ink-light transition-transform ${
                  expandedDivision === div.name ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {expandedDivision === div.name && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-6 pb-6 border-t border-ink/5"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-6">
                {div.districts.map((district) => (
                  <div
                    key={district}
                    className="flex items-center gap-2 p-3 rounded-xl bg-cream/50 hover:bg-accent/5 transition-colors"
                  >
                    <CheckCircle
                      size={16}
                      className="text-accent flex-shrink-0"
                    />
                    <span className="text-sm text-ink">{district}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-cream rounded-xl border border-ink/5">
                <div className="flex items-start gap-3">
                  <Phone
                    size={20}
                    className="text-accent flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <div className="font-semibold text-ink text-sm">
                      {div.name} Regional Office
                    </div>
                    <div className="text-ink-mid text-sm">
                      Call: +880 1XXX-XXXXXX | Email: {div.name.toLowerCase()}
                      @solaro.com.bd
                    </div>
                    <div className="text-ink-light text-xs mt-1">
                      Installation timeline: {div.timeline} from order
                      confirmation
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          )}
        </m.div>
      ))}
    </div>
  );
}
