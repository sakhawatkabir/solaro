"use client";

import { Shield } from "lucide-react";

export default function CustomersHeader({ totalCustomers }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <Shield className="size-6 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-white">Customers</h1>
          <p className="text-sm text-zinc-400">
            {totalCustomers} customer{totalCustomers !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
