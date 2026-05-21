"use client";

const divisions = [
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

const solarPotentials = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "VERY_HIGH", label: "Very High" },
];

export default function DistrictBasicInfo({ formData, updateField }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        District Information
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-1.5"
              htmlFor="field-district-name-1"
            >
              District Name
            </label>
            <input
              id="field-district-name-1"
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g., Dhaka"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-1.5"
              htmlFor="field-division-2"
            >
              Division
            </label>
            <select
              id="field-division-2"
              value={formData.division}
              onChange={(e) => updateField("division", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50 text-sm cursor-pointer"
            >
              <option value="" className="bg-zinc-900">
                Select division
              </option>
              {divisions.map((div) => (
                <option key={div} value={div} className="bg-zinc-900">
                  {div}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-1.5"
              htmlFor="field-solar-potential-3"
            >
              Solar Potential
            </label>
            <select
              id="field-solar-potential-3"
              value={formData.solarPotential}
              onChange={(e) => updateField("solarPotential", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50 text-sm cursor-pointer"
            >
              {solarPotentials.map((p) => (
                <option key={p.value} value={p.value} className="bg-zinc-900">
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-1.5"
              htmlFor="field-avg-sun-hours-day-4"
            >
              Avg Sun Hours/Day
            </label>
            <input
              id="field-avg-sun-hours-day-4"
              type="number"
              step="0.1"
              value={formData.avgSunHours}
              onChange={(e) => updateField("avgSunHours", e.target.value)}
              placeholder="5.5"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-1.5"
              htmlFor="field-population-5"
            >
              Population
            </label>
            <input
              id="field-population-5"
              type="number"
              value={formData.population}
              onChange={(e) => updateField("population", e.target.value)}
              placeholder="1000000"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => updateField("coverage", !formData.coverage)}
            className={`
              relative w-11 h-6 rounded-full transition-colors
              ${formData.coverage ? "bg-emerald-500" : "bg-zinc-700"}
            `}
          >
            <span
              className={`
                absolute top-1 left-1 size-4 rounded-full bg-white transition-transform
                ${formData.coverage ? "translate-x-5" : "translate-x-0"}
              `}
            />
          </button>
          <span className="text-sm text-zinc-300">Service Coverage Active</span>
        </div>
      </div>
    </div>
  );
}
