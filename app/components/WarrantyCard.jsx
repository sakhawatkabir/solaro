export default function WarrantyCard() {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden min-h-[400px] flex flex-col justify-between">
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {[...Array(64)].map((_, i) => (
            <div key={i} className="border border-white"></div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          Protection Plan
        </div>

        <h3 className="text-4xl font-heading font-bold mb-4">
          25-Year
          <br />
          Warranty
        </h3>
      </div>

      <div className="relative space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
          <span className="text-gray-300">Performance guarantee</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
          <span className="text-gray-300">Free maintenance included</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
          <span className="text-gray-300">24/7 customer support</span>
        </div>
      </div>
    </div>
  );
}
