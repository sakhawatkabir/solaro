"use client";

export default function GeneralSettings({ settings, onChange }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 mt-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        General Settings
      </h3>
      <div className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-zinc-300 mb-1.5"
            htmlFor="field-site-name-1"
          >
            Site Name
          </label>
          <input
            id="field-site-name-1"
            type="text"
            value={settings.siteName || ""}
            onChange={(e) => onChange("siteName", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-zinc-300 mb-1.5"
            htmlFor="field-site-tagline-2"
          >
            Site Tagline
          </label>
          <input
            id="field-site-tagline-2"
            type="text"
            value={settings.siteTagline || ""}
            onChange={(e) => onChange("siteTagline", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
