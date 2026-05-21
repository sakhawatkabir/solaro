"use client";

import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function UserFormHeader({ isEdit, userName, onSave, isSaving }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/users"
          className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-white">
            {isEdit ? userName : "New User"}
          </h1>
          <p className="text-sm text-zinc-400">
            {isEdit ? "Edit user details" : "Add a new user"}
          </p>
        </div>
      </div>
      <button
        onClick={onSave}
        disabled={isSaving}
        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white rounded-xl text-sm font-medium transition-colors"
      >
        {isSaving ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Save className="size-4" />
        )}
        {isSaving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
