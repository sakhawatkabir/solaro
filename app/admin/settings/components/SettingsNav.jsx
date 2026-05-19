"use client";

import { cn } from "@/lib/utils";

export default function SettingsNav({
  sections,
  activeSection,
  onSectionChange,
}) {
  return (
    <nav className="lg:w-56 flex-shrink-0">
      <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={cn(
              "px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-left",
              activeSection === section.id
                ? "bg-emerald-500/10 text-emerald-400"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800",
            )}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
