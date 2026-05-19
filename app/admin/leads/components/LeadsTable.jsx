"use client";

import Link from "next/link";
import {
  Eye,
  Mail,
  MapPin,
  Calendar,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";
import StatusBadge from "@/app/admin/components/StatusBadge";

const statusOrder = ["new", "contacted", "quoted", "converted", "lost"];

export default function LeadsTable({ leads }) {
  if (leads.length === 0) {
    return (
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-12 text-center">
        <MessageSquare className="w-10 h-10 mx-auto mb-3 text-zinc-700" />
        <p className="text-sm text-zinc-500">No leads found</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Lead
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">
                Interest
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">
                Source
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">
                District
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Status
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">
                Date
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-zinc-800/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-emerald-400">
                        {lead.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-white">
                        {lead.name}
                      </span>
                      <p className="text-xs text-zinc-500">{lead.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className="text-sm text-zinc-300">{lead.interest}</span>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded-full capitalize">
                    {lead.source}
                  </span>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {lead.district}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {lead.date}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <a
                      href={`mailto:${lead.email}`}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-blue-400 hover:bg-zinc-800 transition-colors"
                      title="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    {lead.status !== "converted" && lead.status !== "lost" && (
                      <button
                        onClick={() => {
                          const nextIndex =
                            statusOrder.indexOf(lead.status) + 1;
                          if (nextIndex < statusOrder.length) {
                            console.log(
                              `Move ${lead.name} to ${statusOrder[nextIndex]}`,
                            );
                          }
                        }}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition-colors"
                        title="Advance to next stage"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
