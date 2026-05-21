"use client";

import Link from "next/link";
import { Eye, Trash2, Users, Mail, Phone, Building } from "lucide-react";
import TablePagination from "../../components/TablePagination";

const statusColors = {
  NEW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  CONTACTED: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  QUALIFIED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  PROPOSAL: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  NEGOTIATION: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  WON: "bg-green-500/10 text-green-400 border-green-500/20",
  LOST: "bg-red-500/10 text-red-400 border-red-500/20",
};

const priorityColors = {
  LOW: "text-zinc-400",
  MEDIUM: "text-blue-400",
  HIGH: "text-orange-400",
  URGENT: "text-red-400",
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

export default function LeadsTable({
  leads,
  currentPage,
  totalPages,
  perPage,
  totalFiltered,
  onPageChange,
  onDelete,
}) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Lead
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                Contact
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">
                Source
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Status
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">
                Priority
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden xl:table-cell">
                Value
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {leads.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-zinc-500"
                >
                  <Users className="size-10 mx-auto mb-3 text-zinc-700" />
                  <p className="text-sm">No leads found</p>
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-emerald-400">
                          {lead.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="text-sm font-medium text-white hover:text-emerald-400 transition-colors"
                        >
                          {lead.name}
                        </Link>
                        {lead.company && (
                          <div className="flex items-center gap-1 text-xs text-zinc-500">
                            <Building className="size-3" />
                            {lead.company}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <Mail className="size-3" />
                        {lead.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <Phone className="size-3" />
                        {lead.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-xs text-zinc-400">
                      {sourceLabels[lead.source] || lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border ${
                        statusColors[lead.status] || statusColors.NEW
                      }`}
                    >
                      {lead.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className={`text-xs font-medium ${priorityColors[lead.priority] || priorityColors.MEDIUM}`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden xl:table-cell">
                    {lead.estimatedValue ? (
                      <span className="text-sm font-semibold text-white">
                        ৳{lead.estimatedValue.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      >
                        <Eye className="size-4" />
                      </Link>
                      <button
                        onClick={() => onDelete(lead.id)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={perPage}
          totalFiltered={totalFiltered}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
