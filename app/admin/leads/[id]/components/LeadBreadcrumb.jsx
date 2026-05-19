"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function LeadBreadcrumb({ name }) {
  return (
    <div className="flex items-center gap-2 text-sm text-zinc-400">
      <Link href="/admin/leads" className="hover:text-white transition-colors">
        Leads
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="text-emerald-400 font-medium">{name}</span>
    </div>
  );
}
