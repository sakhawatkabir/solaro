"use client";

export default function BusinessSettings({ settings, onChange }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 mt-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Business Settings
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-1.5"
              htmlFor="field-currency-1"
            >
              Currency
            </label>
            <input
              id="field-currency-1"
              type="text"
              value={settings.currency || ""}
              onChange={(e) => onChange("currency", e.target.value)}
              placeholder="BDT"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-1.5"
              htmlFor="field-currency-symbol-2"
            >
              Currency Symbol
            </label>
            <input
              id="field-currency-symbol-2"
              type="text"
              value={settings.currencySymbol || ""}
              onChange={(e) => onChange("currencySymbol", e.target.value)}
              placeholder="৳"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
            />
          </div>
        </div>
        <div>
          <label
            className="block text-sm font-medium text-zinc-300 mb-1.5"
            htmlFor="field-vat-rate-3"
          >
            VAT Rate (%)
          </label>
          <input
            id="field-vat-rate-3"
            type="number"
            value={settings.vatRate ?? 0}
            onChange={(e) => onChange("vatRate", e.target.value)}
            placeholder="0"
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
