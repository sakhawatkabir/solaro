"use client";

export default function CustomerAddress({ formData, updateField }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Address
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Street Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => updateField("address", e.target.value)}
            placeholder="123 Main Street"
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              City
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="Dhaka"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              District
            </label>
            <input
              type="text"
              value={formData.district}
              onChange={(e) => updateField("district", e.target.value)}
              placeholder="Dhaka"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Postal Code
            </label>
            <input
              type="text"
              value={formData.postalCode}
              onChange={(e) => updateField("postalCode", e.target.value)}
              placeholder="1000"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
