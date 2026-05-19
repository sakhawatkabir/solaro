"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ShoppingBag,
  DollarSign,
  Clock,
} from "lucide-react";
import { customers, recentOrders } from "../../data/mock";
import StatusBadge from "../../components/StatusBadge";

export default function CustomerDetailPage({ params }) {
  const customer = customers.find((c) => c.id === params.id);
  const customerOrders = recentOrders.filter(
    (o) => o.email === customer?.email,
  );

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Users className="w-16 h-16 text-zinc-700 mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">
          Customer Not Found
        </h2>
        <p className="text-sm text-zinc-400 mb-6">
          The customer you are looking for does not exist.
        </p>
        <Link
          href="/admin/customers"
          className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors text-sm font-medium"
        >
          Back to Customers
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <Link
          href="/admin/customers"
          className="hover:text-white transition-colors"
        >
          Customers
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-emerald-400 font-medium">{customer.name}</span>
      </div>

      {/* Profile header */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-emerald-400">
              {customer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{customer.name}</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Customer since {customer.joined}
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <Mail className="w-4 h-4 text-zinc-500" />
                {customer.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <Phone className="w-4 h-4 text-zinc-500" />
                {customer.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <MapPin className="w-4 h-4 text-zinc-500" />
                {customer.district}
              </div>
            </div>
          </div>
          <div className="flex gap-6 sm:flex-col sm:items-end">
            <div className="text-center sm:text-right">
              <div className="text-2xl font-bold text-emerald-400">
                ৳{customer.totalSpent.toLocaleString()}
              </div>
              <div className="text-xs text-zinc-400">Total Spent</div>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-2xl font-bold text-white">
                {customer.orders}
              </div>
              <div className="text-xs text-zinc-400">Orders</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <span className="text-sm text-zinc-400">Total Orders</span>
          </div>
          <div className="text-2xl font-bold text-white">{customer.orders}</div>
        </div>
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-zinc-400">Total Spent</span>
          </div>
          <div className="text-2xl font-bold text-white">
            ৳{customer.totalSpent.toLocaleString()}
          </div>
        </div>
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-zinc-400">Member Since</span>
          </div>
          <div className="text-lg font-bold text-white">{customer.joined}</div>
        </div>
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-orange-400" />
            <span className="text-sm text-zinc-400">District</span>
          </div>
          <div className="text-lg font-bold text-white">
            {customer.district}
          </div>
        </div>
      </div>

      {/* Order history */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800">
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <div>
            <h3 className="text-lg font-semibold text-white">Order History</h3>
            <p className="text-sm text-zinc-400">
              {customerOrders.length} order
              {customerOrders.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        {customerOrders.length === 0 ? (
          <div className="px-6 py-12 text-center text-zinc-500">
            <ShoppingBag className="w-10 h-10 mx-auto mb-3 text-zinc-700" />
            <p className="text-sm">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                    Order
                  </th>
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">
                    Product
                  </th>
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                    Amount
                  </th>
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {customerOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
                      >
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-sm text-zinc-300">
                        {order.product}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-white">
                        {order.amount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-sm text-zinc-400">
                        {order.date}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Back button */}
      <Link
        href="/admin/customers"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Customers
      </Link>
    </div>
  );
}
