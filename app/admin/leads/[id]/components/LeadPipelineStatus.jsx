"use client";

import { MessageSquare, FileText } from "lucide-react";

export default function LeadPipelineStatus({ lead }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h3 className="text-sm font-medium text-zinc-400 mb-4">
        Message & Notes
      </h3>
      <div className="space-y-4">
        {lead.message && (
          <div className="bg-zinc-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="size-4 text-emerald-400" />
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Customer Message
              </span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {lead.message}
            </p>
          </div>
        )}
        {lead.notes && (
          <div className="bg-zinc-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="size-4 text-blue-400" />
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Internal Notes
              </span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {lead.notes}
            </p>
          </div>
        )}
        {!lead.message && !lead.notes && (
          <p className="text-sm text-zinc-500 text-center py-4">
            No message or notes
          </p>
        )}
      </div>
    </div>
  );
}
