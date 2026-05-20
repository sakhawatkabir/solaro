"use client";

import Link from "next/link";
import { Eye, Trash2, MapPin, Sun, Users } from "lucide-react";
import TablePagination from "../../components/TablePagination";

const potentialColors = {
  LOW: "text-zinc-400",
  MEDIUM: "text-yellow-400",
  HIGH: "text-orange-400",
  VERY_HIGH: "text-emerald-400",
};

export default function DistrictsTable({
  districts,
  currentPage,
  totalPages,
  perPage,
  totalFiltered,
  onPageChange,
  onDelete,
}) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                District
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Division
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">
                Solar Potential
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                Sun Hours
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">
                Population
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Coverage
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {districts.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-zinc-500"
                >
                  <MapPin className="w-10 h-10 mx-auto mb-3 text-zinc-700" />
                  <p className="text-sm">No districts found</p>
                </td>
              </tr>
            ) : (
              districts.map((district) => (
                <tr
                  key={district.id}
                  className="hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-zinc-500" />
                      </div>
                      <Link
                        href={`/admin/districts/${district.id}`}
                        className="text-sm font-medium text-white hover:text-emerald-400 transition-colors"
                      >
                        {district.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-zinc-300">
                      {district.division}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <div className="flex items-center gap-1.5">
                      <Sun className="w-4 h-4" />
                      <span
                        className={`text-sm font-medium ${potentialColors[district.solarPotential] || potentialColors.MEDIUM}`}
                      >
                        {district.solarPotential.replace("_", " ")}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {district.avgSunHours ? (
                      <span className="text-sm text-zinc-300">
                        {district.avgSunHours}h/day
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    {district.population ? (
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-zinc-500" />
                        <span className="text-sm text-zinc-300">
                          {district.population.toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border ${
                        district.coverage
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                      }`}
                    >
                      {district.coverage ? "Covered" : "Uncovered"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/districts/${district.id}`}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => onDelete(district.id)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={perPage}
          totalFiltered={totalFiltered}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
