"use client";

import { LayoutDashboard, TrendingUp, Phone, Users } from "lucide-react";

const actions = [
  {
    label: "View Orders",
    href: "/admin/orders",
    icon: LayoutDashboard,
    color: "emerald",
  },
  {
    label: "Add Product",
    href: "/admin/products",
    icon: TrendingUp,
    color: "blue",
  },
  {
    label: "Manage Leads",
    href: "/admin/leads",
    icon: Phone,
    color: "purple",
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: Users,
    color: "orange",
  },
];

const colorMap = {
  emerald: {
    bg: "bg-emerald-500/10",
    hover: "group-hover:bg-emerald-500/20",
    text: "text-emerald-400",
  },
  blue: {
    bg: "bg-blue-500/10",
    hover: "group-hover:bg-blue-500/20",
    text: "text-blue-400",
  },
  purple: {
    bg: "bg-purple-500/10",
    hover: "group-hover:bg-purple-500/20",
    text: "text-purple-400",
  },
  orange: {
    bg: "bg-orange-500/10",
    hover: "group-hover:bg-orange-500/20",
    text: "text-orange-400",
  },
};

export default function QuickActions() {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const colors = colorMap[action.color];
          return (
            <a
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors group"
            >
              <div
                className={`size-10 rounded-lg ${colors.bg} flex items-center justify-center ${colors.hover} transition-colors`}
              >
                <action.icon className={`size-5 ${colors.text}`} />
              </div>
              <span className="text-sm text-zinc-300 group-hover:text-white">
                {action.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
