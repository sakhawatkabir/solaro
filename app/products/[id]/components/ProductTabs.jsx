"use client";

import { m } from "framer-motion";
import { useState } from "react";
import SpecsTab from "./SpecsTab";
import IncludesTab from "./IncludesTab";
import SavingsTab from "./SavingsTab";

const tabs = [
  { id: "specs", label: "Specifications" },
  { id: "includes", label: "What is Included" },
  { id: "savings", label: "Savings Breakdown" },
];

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("specs");

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="flex gap-1 border-b border-ink/10 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 font-semibold text-sm transition-all relative ${
              activeTab === tab.id
                ? "text-accent"
                : "text-ink-light hover:text-ink"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
            )}
          </button>
        ))}
      </div>

      <m.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-8 border border-ink/5"
      >
        {activeTab === "specs" && <SpecsTab specs={product.specs} />}
        {activeTab === "includes" && <IncludesTab items={product.includes} />}
        {activeTab === "savings" && product.savings && (
          <SavingsTab savings={product.savings} />
        )}
      </m.div>
    </div>
  );
}
