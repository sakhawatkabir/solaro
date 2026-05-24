"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, Users, Shield, Trash2 } from "lucide-react";
import { deleteCustomerUser } from "@/app/actions/customers";

const statusColors = {
  ACTIVE: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  INACTIVE: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  SUSPENDED: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function CustomersTable({ customers }) {
  const queryClient = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteCustomerUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-customers"] });
      setDeleteTarget(null);
      setDeleteError(null);
    },
    onError: (error) => {
      setDeleteError(error.message || "Failed to delete customer");
    },
  });
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Customer
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
                  colSpan={5}
                  className="px-6 py-12 text-center text-zinc-500"
                >
                  <Users className="size-10 mx-auto mb-3 text-zinc-700" />
                  <p className="text-sm">No customers found</p>
                </td>
              </tr>
            ) : (
              customers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                        <Shield className="size-4 text-emerald-400" />
                      </div>
                      <div>
                        <Link
                          href={`/admin/customers/${user.id}`}
                          className="text-sm font-medium text-white hover:text-emerald-400 transition-colors"
                        >
                          {user.name || "Unnamed Customer"}
                        </Link>
                        {user.role && (
                          <span className="inline-flex ml-2 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            VIEWER
                          </span>
                        )}
                        <p className="text-xs text-zinc-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-white">{user.totalOrders}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-white">
                      ৳{user.totalSpent.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border ${
                        statusColors[user.status] || statusColors.ACTIVE
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/customers/${user.id}`}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      >
                        <Eye className="size-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteTarget(user.id)}
                        className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Delete Confirmation Modal */}
      {deleteTarget && (() => {
        const target = customers.find((c) => c.id === deleteTarget);
        if (!target) return null;
        return (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold text-white mb-2">
                Delete Customer
              </h3>
              <p className="text-sm text-zinc-400 mb-4">
                Are you sure you want to delete this customer? This action
                cannot be undone.
              </p>

              {/* User Info Card */}
              <div className="rounded-lg bg-zinc-800/50 border border-zinc-700 p-5 mb-5 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                    <Shield className="size-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {target.name || "Unnamed Customer"}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">{target.email}</p>
                  </div>
                </div>
                <div className="h-px bg-zinc-700/50" />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium border ${
                      statusColors[target.status] || statusColors.ACTIVE
                    }`}
                  >
                    {target.status}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    VIEWER
                  </span>
                  <span className="text-zinc-400">
                    <span className="text-zinc-500">Orders:</span> {target.totalOrders}
                  </span>
                  <span className="text-zinc-400">
                    <span className="text-zinc-500">Spent:</span> ৳{target.totalSpent.toLocaleString()}
                  </span>
                </div>
              </div>

              {deleteError && (
                <p className="text-xs text-red-400 mb-4">{deleteError}</p>
              )}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setDeleteTarget(null);
                    setDeleteError(null);
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteMutation.mutate(deleteTarget)}
                  disabled={deleteMutation.isPending}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-500 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 className="size-4" />
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
