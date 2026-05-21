"use client";

const statuses = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "BLACKLISTED", label: "Blacklisted" },
];

export default function CustomerBasicInfo({ formData, updateField }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Basic Information
      </h3>
      <div className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-zinc-300 mb-1.5"
            htmlFor="field-full-name-1"
          >
            Full Name
          </label>
          <input
            id="field-full-name-1"
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="e.g., John Doe"
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-1.5"
              htmlFor="field-email-2"
            >
              Email
            </label>
            <input
              id="field-email-2"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="john@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-1.5"
              htmlFor="field-phone-3"
            >
              Phone
            </label>
            <input
              id="field-phone-3"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+880 1XXX-XXXXXX"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
            />
          </div>
        </div>
        <div>
          <label
            className="block text-sm font-medium text-zinc-300 mb-1.5"
            htmlFor="field-status-4"
          >
            Status
          </label>
          <select
            id="field-status-4"
            value={formData.status}
            onChange={(e) => updateField("status", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50 text-sm cursor-pointer"
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value} className="bg-zinc-900">
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
