"use client";

import Link from "next/link";
import { Eye, Edit3, Trash2, Users, Mail, Phone, MapPin } from "lucide-react";
import TablePagination from "../../components/TablePagination";

const statusColors = {
  ACTIVE: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  INACTIVE: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  BLACKLISTED: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function CustomersTable({
  customers,
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
                Customer
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                Contact
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">
                Location
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Orders
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Spent
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Status
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {customers.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-zinc-500"
                >
                  <Users className="size-10 mx-auto mb-3 text-zinc-700" />
                  <p className="text-sm">No customers found</p>
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-emerald-400">
                          {customer.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <Link
                          href={`/admin/customers/${customer.id}`}
                          className="text-sm font-medium text-white hover:text-emerald-400 transition-colors"
                        >
                          {customer.name}
                        </Link>
                        <p className="text-xs text-zinc-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <Mail className="size-3" />
                        {customer.email}
                      </div>
                      {customer.phone && (
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                          <Phone className="size-3" />
                          {customer.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    {customer.city ? (
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <MapPin className="size-3" />
                        {customer.city}
                        {customer.district && `, ${customer.district}`}
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-white">
                      {customer.totalOrders}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-white">
                      ৳{customer.totalSpent.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border ${
                        statusColors[customer.status] || statusColors.ACTIVE
                      }`}
                    >
                      {customer.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/customers/${customer.id}`}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      >
                        <Eye className="size-4" />
                      </Link>
                      <Link
                        href={`/admin/customers/${customer.id}`}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition-colors"
                      >
                        <Edit3 className="size-4" />
                      </Link>
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
