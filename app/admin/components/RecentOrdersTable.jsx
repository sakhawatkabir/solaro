"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function RecentOrdersTable({ orders }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800">
      <div className="flex items-center justify-between p-6 border-b border-zinc-800">
        <div>
          <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
          <p className="text-sm text-zinc-400">Latest customer orders</p>
        </div>
        <a
          href="/admin/orders"
          className="text-sm text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
        >
          View all
          <ArrowUpRight className="w-4 h-4" />
        </a>
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
                Product
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">
                District
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Amount
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {orders.slice(0, 5).map((order) => (
              <tr
                key={order.id}
                className="hover:bg-zinc-800/50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-emerald-400">
                    {order.id}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm text-white font-medium">
                      {order.customer}
                    </div>
                    <div className="text-xs text-zinc-500">{order.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-sm text-zinc-300">{order.product}</span>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {order.district}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-white">
                    {order.amount}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
