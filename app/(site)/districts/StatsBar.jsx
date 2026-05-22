import { m } from "framer-motion";
import { Star } from "lucide-react";

export default function StatsBar({
  isLoading,
  totalDistricts,
  transitionDuration,
}) {
  return (
    <section className="px-8 lg:px-16 pb-16">
      <div className="max-w-[1400px] mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: transitionDuration, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 border border-ink/5 shadow-sm"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-heading font-semibold text-accent mb-1">
                {isLoading ? "…" : totalDistricts}
              </div>
              <div className="text-ink-mid text-sm">Districts Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-heading font-semibold text-accent mb-1">
                45,500+
              </div>
              <div className="text-ink-mid text-sm">
                Installations Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-heading font-semibold text-accent mb-1">
                4.9
              </div>
              <div className="flex items-center justify-center gap-1 text-ink-mid text-sm">
                <Star size={14} fill="currentColor" className="text-accent" />
                Average Rating
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-heading font-semibold text-accent mb-1">
                8
              </div>
              <div className="text-ink-mid text-sm">Regional Offices</div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
