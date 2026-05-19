export default function EnvironmentCard() {
  return (
    <div className="bg-gradient-to-br from-accent to-accent-mid rounded-3xl p-8 text-white relative overflow-hidden min-h-[400px] flex flex-col justify-between">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 size-32 border-4 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 size-24 border-4 border-white rounded-full"></div>
      </div>

      <div className="relative">
        <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
          Environmental Impact
        </div>

        <h3 className="text-4xl font-heading font-semibold mb-4">
          Reduce Carbon
          <br />
          Footprint
        </h3>
      </div>

      <div className="relative">
        <div className="flex items-end gap-4 mb-4">
          <div className="text-5xl font-bold">25</div>
          <div className="text-xl mb-2">tons CO₂/year</div>
        </div>
        <p className="text-white/90">
          Average carbon offset equivalent to planting 400 trees annually.
        </p>
      </div>
    </div>
  );
}
