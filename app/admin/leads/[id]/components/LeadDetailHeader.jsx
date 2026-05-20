"use client";

import { Mail } from "lucide-react";
import StatusBadge from "@/app/admin/components/StatusBadge";

export default function LeadDetailHeader({ lead }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-bold text-emerald-400">
            {lead.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{lead.name}</h1>
          <div className="flex items-center gap-3 mt-1">
            <StatusBadge status={lead.status} />
            <span className="text-sm text-zinc-400">
              {lead.source} &middot; {new Date(lead.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <a
          href={`mailto:${lead.email}`}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-sm transition-colors"
        >
          <Mail className="w-4 h-4" />
          Email
        </a>
        <a
          href={`tel:${lead.phone}`}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-sm transition-colors"
        >
          Call
        </a>
      </div>
    </div>
  );
}
