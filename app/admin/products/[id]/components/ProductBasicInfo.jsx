"use client";

import RichTextEditor from "./RichTextEditor";

const categories = [
  { value: "HOME_KIT", label: "Home Kits" },
  { value: "PANEL", label: "Panels" },
  { value: "BATTERY", label: "Batteries" },
  { value: "INVERTER", label: "Inverters" },
  { value: "ACCESSORY", label: "Accessories" },
];
const statuses = [
  { value: "ACTIVE", label: "Active" },
  { value: "DRAFT", label: "Draft" },
  { value: "OUT_OF_STOCK", label: "Out of Stock" },
];

export default function ProductBasicInfo({ formData, updateField }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Basic Information
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Product Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="e.g., 5KW Solar Home Kit"
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => updateField("category", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50 text-sm cursor-pointer"
            >
              {categories.map((cat) => (
                <option
                  key={cat.value}
                  value={cat.value}
                  className="bg-zinc-900"
                >
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Status
            </label>
            <select
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
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Badge
          </label>
          <input
            type="text"
            value={formData.badge}
            onChange={(e) => updateField("badge", e.target.value)}
            placeholder="e.g., Best Seller, New"
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            Description
          </label>
          <RichTextEditor
            value={formData.description}
            onChange={(html) => updateField("description", html)}
            placeholder="Write product description..."
          />
        </div>
      </div>
    </div>
  );
}
