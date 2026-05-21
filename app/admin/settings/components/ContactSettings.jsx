"use client";

export default function ContactSettings({ settings, onChange }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 mt-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Contact Information
      </h3>
      <div className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-zinc-300 mb-1.5"
            htmlFor="field-contact-email-1"
          >
            Contact Email
          </label>
          <input
            id="field-contact-email-1"
            type="email"
            value={settings.contactEmail || ""}
            onChange={(e) => onChange("contactEmail", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-zinc-300 mb-1.5"
            htmlFor="field-contact-phone-2"
          >
            Contact Phone
          </label>
          <input
            id="field-contact-phone-2"
            type="tel"
            value={settings.contactPhone || ""}
            onChange={(e) => onChange("contactPhone", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-zinc-300 mb-1.5"
            htmlFor="field-contact-address-3"
          >
            Contact Address
          </label>
          <textarea
            id="field-contact-address-3"
            value={settings.contactAddress || ""}
            onChange={(e) => onChange("contactAddress", e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm resize-none"
          />
        </div>
      </div>
    </div>
  );
}
