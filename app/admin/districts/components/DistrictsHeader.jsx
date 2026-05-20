"use client";

import { MapPin, Plus } from "lucide-react";
import Link from "next/link";

export default function DistrictsHeader({ totalDistricts }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <MapPin className="w-6 h-6 text-emerald-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Districts</h1>
          <p className="text-sm text-zinc-400">
            {totalDistricts} total district{totalDistricts !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <Link
        href="/admin/districts/new"
        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add District
      </Link>
    </div>
  );
}
