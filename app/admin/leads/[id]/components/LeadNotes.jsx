"use client";

export default function LeadNotes({ date }) {
  return (
    <div className="lg:col-span-2 rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Notes</h3>
      <textarea
        placeholder="Add notes about this lead..."
        rows={6}
        className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm resize-none"
      />
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800">
        <p className="text-xs text-zinc-500">Last updated: {date}</p>
        <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm font-medium transition-colors">
          Save Notes
        </button>
      </div>
    </div>
  );
}
