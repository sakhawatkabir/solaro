"use client";

import { ArrowUpRight } from "lucide-react";
import StatusBadge from "./StatusBadge";

const recentLeads = [
  {
    name: "Anisur Rahman",
    interest: "5KW System",
    status: "new",
    date: "May 18",
  },
  {
    name: "Roksana Begum",
    interest: "3KW System",
    status: "contacted",
    date: "May 17",
  },
  {
    name: "Habib Ullah",
    interest: "10KW System",
    status: "quoted",
    date: "May 15",
  },
  {
    name: "Sabina Yasmin",
    interest: "Battery + Inverter",
    status: "new",
    date: "May 18",
  },
];

export default function RecentLeads() {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Recent Leads</h2>
        <a
          href="/admin/leads"
          className="text-sm text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
        >
          View all
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
      <div className="space-y-3">
        {recentLeads.map((lead) => (
          <div
            key={lead.name}
            className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <span className="text-xs font-semibold text-emerald-400">
                  {lead.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-white">
                  {lead.name}
                </div>
                <div className="text-xs text-zinc-500">{lead.interest}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={lead.status} />
              <span className="text-xs text-zinc-500 hidden sm:inline">
                {lead.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
