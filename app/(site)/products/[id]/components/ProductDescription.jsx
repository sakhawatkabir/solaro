"use client";

export default function ProductDescription({ description }) {
  return (
    <section className="px-8 lg:px-16 pb-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white rounded-2xl p-8 border border-ink/5">
          <h3 className="text-2xl font-heading font-semibold text-ink mb-4">
            About This Product
          </h3>
          <p className="text-ink-mid leading-relaxed text-lg">{description}</p>
          <div className="mt-6 p-4 bg-cream rounded-xl border border-ink/5">
            <p className="text-sm text-ink-mid">
              <strong className="text-ink">Bangladesh Ready:</strong> All our
              systems are optimized for Bangladesh climate conditions — monsoon
              resistant, humidity protected, and designed for the tropical sun.
              We handle DESA/DESCO net metering paperwork so you can sell excess
              power back to the grid.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
