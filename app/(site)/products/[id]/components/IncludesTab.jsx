"use client";

import { CheckCircle } from "lucide-react";

export default function IncludesTab({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8 text-ink-mid">
        No items information available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-center gap-4 p-4 rounded-xl bg-cream/50"
        >
          <div className="size-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <CheckCircle size={18} className="text-accent" />
          </div>
          <span className="text-ink">{item}</span>
        </div>
      ))}
    </div>
  );
}
