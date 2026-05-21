"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, MapPin, Calendar, Package, Trash2 } from "lucide-react";
import StatusBadge from "../../components/StatusBadge";
import TablePagination from "../../components/TablePagination";
import { deleteOrder } from "@/app/actions/orders";

function formatBDT(amount) {
  return `৳${amount.toLocaleString("en-BD")}`;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function OrdersTable({
  orders,
  currentPage,
  totalPages,
  perPage,
  totalFiltered,
  onPageChange,
  onDeleteSuccess,
}) {
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDelete = async (order) => {
    setDeletingId(order.id);
    const result = await deleteOrder(order.id);
    if (result.success) {
      setConfirmDelete(null);
      if (onDeleteSuccess) onDeleteSuccess();
    }
    setDeletingId(null);
  };

  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Order
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Customer
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                Items
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">
                District
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Total
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Status
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">
                Date
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-12 text-center text-zinc-500"
                >
                  <Package className="size-10 mx-auto mb-3 text-zinc-700" />
                  <p className="text-sm">No orders found</p>
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
                    >
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-white font-medium">
                        {order.customerName || "—"}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {order.customerEmail || "—"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-sm text-zinc-300 max-w-xs truncate block">
                      {order.itemsSummary || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                      <MapPin className="size-3.5" />
                      {order.district || "—"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-white">
                      {formatBDT(order.total)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status.toLowerCase()} />
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                      <Calendar className="size-3.5" />
                      {formatDate(order.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-400 transition-colors"
                      >
                        <Eye className="size-4" />
                      </Link>
                      <button
                        onClick={() => setConfirmDelete(order)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 transition-colors"
                        title="Delete order"
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

      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={perPage}
          totalFiltered={totalFiltered}
          onPageChange={onPageChange}
        />
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-white mb-2">
              Delete Order
            </h3>
            <p className="text-sm text-zinc-400 mb-6">
              Are you sure you want to delete order{" "}
              <span className="text-emerald-400 font-mono">
                {confirmDelete.orderNumber}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                disabled={deletingId === confirmDelete.id}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-500 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                {deletingId === confirmDelete.id ? (
                  <>
                    <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="size-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
