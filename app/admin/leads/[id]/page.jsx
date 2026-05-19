"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { leads } from "@/app/admin/data/mock";
import LeadBreadcrumb from "./components/LeadBreadcrumb";
import LeadDetailHeader from "./components/LeadDetailHeader";
import LeadPipelineStatus from "./components/LeadPipelineStatus";
import LeadInfoCard from "./components/LeadInfoCard";
import LeadNotes from "./components/LeadNotes";

export default function LeadDetailPage({ params }) {
  const lead = leads.find((l) => l.id === params.id);
  const [currentStatus, setCurrentStatus] = useState(lead?.status || "new");

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Users className="w-16 h-16 text-zinc-700 mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">
          Lead Not Found
        </h2>
        <p className="text-sm text-zinc-400 mb-6">
          The lead you are looking for does not exist.
        </p>
        <Link
          href="/admin/leads"
          className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors text-sm font-medium"
        >
          Back to Leads
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <LeadBreadcrumb name={lead.name} />
      <LeadDetailHeader lead={lead} currentStatus={currentStatus} />
      <LeadPipelineStatus
        currentStatus={currentStatus}
        onStatusChange={setCurrentStatus}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LeadInfoCard lead={lead} />
        <LeadNotes date={lead.date} />
      </div>
      <Link
        href="/admin/leads"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Leads
      </Link>
    </div>
  );
}
