"use client";

import { Save, RotateCcw, CheckCircle, Loader2, AlertCircle } from "lucide-react";

export default function SettingsHeader({
  onSave,
  onReset,
  isSaving,
  isSuccess,
  error,
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Manage your application settings
        </p>
      </div>
      <div className="flex items-center gap-3">
        {isSuccess && (
          <div className="flex items-center gap-2 text-emerald-400 text-sm">
            <CheckCircle className="size-4" />
            Saved!
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="size-4" />
            {error}
          </div>
        )}
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-sm font-medium transition-colors border border-zinc-700"
        >
          <RotateCcw className="size-4" />
          Reset
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white rounded-xl text-sm font-medium transition-colors"
        >
          {isSaving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          Save Changes
        </button>
      </div>
    </div>
  );
}
