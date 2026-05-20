"use client";

import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LeadFormHeader({ leadName, onSave, isSaving }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/leads"
          className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {leadName || "Lead Details"}
          </h1>
          <p className="text-sm text-zinc-400">View and manage lead information</p>
        </div>
      </div>
      <button
        onClick={onSave}
        disabled={isSaving}
        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white rounded-xl text-sm font-medium transition-colors"
      >
        {isSaving ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Save className="w-4 h-4" />
        )}
        {isSaving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
