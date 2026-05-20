"use client";

export default function LeadNotes({ formData, updateField }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Notes
      </h3>
      <textarea
        value={formData.notes}
        onChange={(e) => updateField("notes", e.target.value)}
        placeholder="Add internal notes about this lead..."
        rows={4}
        className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm resize-none"
      />
    </div>
  );
}
