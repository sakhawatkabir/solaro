"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import StatusBadge from "./StatusBadge";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function getLeadInterest(lead) {
  if (lead.estimatedValue) {
    return `৳${lead.estimatedValue.toLocaleString("en-BD")}`;
  }
  return lead.source?.toLowerCase() || "website";
}

export default function RecentLeads({ leads }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Recent Leads</h2>
        <Link
          href="/admin/leads"
          className="text-sm text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
        >
          View all
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
      <div className="space-y-3">
        {leads.length === 0 ? (
          <div className="py-8 text-center text-zinc-500 text-sm">
            No leads yet
          </div>
        ) : (
          leads.slice(0, 5).map((lead) => (
            <div
              key={lead.id}
              className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-full bg-emerald-500/10 flex items-center justify-center">
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
                  <div className="text-xs text-zinc-500">
                    {getLeadInterest(lead)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={lead.status.toLowerCase()} />
                <span className="text-xs text-zinc-500 hidden sm:inline">
                  {formatDate(lead.createdAt)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
