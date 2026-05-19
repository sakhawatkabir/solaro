"use client";

import { MapPin, ShoppingBag, Truck, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import TablePagination from "../../components/TablePagination";

export default function DistrictsTable({
  districts,
  currentPage,
  totalPages,
  perPage,
  totalFiltered,
  onPageChange,
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
                Status
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Delivery
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">
                Orders
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {districts.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-zinc-500"
                >
                  <MapPin className="w-10 h-10 mx-auto mb-3 text-zinc-700" />
                  <p className="text-sm">No districts found</p>
                </td>
              </tr>
            ) : (
              districts.map((district) => (
                <tr
                  key={district.name}
                  className="hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-emerald-400" />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {district.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                        district.active
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400",
                      )}
                    >
                      {district.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm">
                      {district.deliveryAvailable ? (
                        <>
                          <Truck className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-zinc-300">Available</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-zinc-600" />
                          <span className="text-zinc-500">Unavailable</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-zinc-300">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="font-medium">{district.orders}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-white">
                      ৳{district.revenue.toLocaleString()}
                    </span>
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
