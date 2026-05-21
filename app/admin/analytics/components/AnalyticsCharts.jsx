"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
];

const categoryLabels = {
  HOME_KIT: "Home Kits",
  PANEL: "Panels",
  BATTERY: "Batteries",
  INVERTER: "Inverters",
  ACCESSORY: "Accessories",
};

const statusLabels = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  PROPOSAL: "Proposal",
  NEGOTIATION: "Negotiation",
  WON: "Won",
  LOST: "Lost",
};

const sourceLabels = {
  WEBSITE: "Website",
  REFERRAL: "Referral",
  SOCIAL_MEDIA: "Social",
  GOOGLE_ADS: "Google Ads",
  FACEBOOK_ADS: "Facebook",
  PHONE_CALL: "Phone",
  WALK_IN: "Walk-in",
  OTHER: "Other",
};

export default function AnalyticsCharts({ data }) {
  const categoryChartData = data.categoryData.map((item) => ({
    name: categoryLabels[item.category] || item.category,
    value: item.count,
  }));

  const statusChartData = data.statusData.map((item) => ({
    name: statusLabels[item.status] || item.status,
    value: item.count,
  }));

  const sourceChartData = data.sourceData.map((item) => ({
    name: sourceLabels[item.source] || item.source,
    value: item.count,
  }));

  const divisionChartData = data.divisionData.map((item) => ({
    name: item.division,
    districts: item.count,
    population: item.population / 1000000,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Products by Category */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Products by Category
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryChartData}>
              <XAxis dataKey="name" tick={{ fill: "#71717a", fontSize: 12 }} />
              <YAxis tick={{ fill: "#71717a", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Leads by Status */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Leads by Status
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {statusChartData.map((item, index) => (
                  <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-3 mt-2 justify-center">
          {statusChartData.map((item, i) => (
            <div
              key={item.name}
              className="flex items-center gap-1.5 text-xs text-zinc-400"
            >
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {/* Leads by Source */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Leads by Source
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sourceChartData} layout="vertical">
              <XAxis type="number" tick={{ fill: "#71717a", fontSize: 12 }} />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fill: "#71717a", fontSize: 12 }}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Districts by Division */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Districts by Division
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={divisionChartData}>
              <XAxis dataKey="name" tick={{ fill: "#71717a", fontSize: 11 }} />
              <YAxis tick={{ fill: "#71717a", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="districts"
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
                name="Districts"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
