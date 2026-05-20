"use client";

import { cn } from "@/lib/utils";

export default function SettingsTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="border-b border-zinc-800">
      <nav className="flex gap-6 -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "pb-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === tab.id
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-zinc-400 hover:text-zinc-300 hover:border-zinc-700",
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
