"use client";

import { memo } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import StatusBadge from "./StatusBadge";

function formatBDT(amount) {
  return `৳${amount.toLocaleString("en-BD")}`;
}

function getOrderItems(items) {
  if (!items || !Array.isArray(items)) return "—";
  return items.map((item) => item.name).join(", ");
}

const RecentOrdersTable = memo(function RecentOrdersTable({ orders }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800">
      <div className="flex items-center justify-between p-6 border-b border-zinc-800">
        <div>
          <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
          <p className="text-sm text-zinc-400">Latest customer orders</p>
        </div>
        <Link
          href="/admin/orders"
          className="text-sm text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
        >
          View all
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
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
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-zinc-500"
                >
                  No orders yet
                </td>
              </tr>
            ) : (
              orders.slice(0, 5).map((order) => (
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
                        {order.customerName}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {order.customerEmail}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-sm text-zinc-300 max-w-xs truncate block">
                      {getOrderItems(order.items)}
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default RecentOrdersTable;
