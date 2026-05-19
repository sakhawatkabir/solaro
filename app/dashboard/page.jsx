"use client";

import Link from "next/link";
import {
  ShoppingBag,
  MapPin,
  Clock,
  ChevronRight,
  Package,
  Truck,
  CheckCircle,
  Wallet,
  Zap,
  TrendingUp,
} from "lucide-react";

const orders = [
  {
    id: "ORD-001",
    product: "Home Kit 5KW",
    amount: "৳3,50,000",
    status: "delivered",
    date: "May 18, 2026",
  },
  {
    id: "ORD-002",
    product: "Solar Panel 550W x4",
    amount: "৳84,000",
    status: "shipped",
    date: "May 10, 2026",
  },
  {
    id: "ORD-003",
    product: "Battery 10kWh",
    amount: "৳1,80,000",
    status: "processing",
    date: "Apr 28, 2026",
  },
];

const statusIcon = {
  delivered: CheckCircle,
  shipped: Truck,
  processing: Package,
  pending: Clock,
};

const statusColor = {
  delivered: "text-accent bg-accent/10",
  shipped: "text-blue-600 bg-blue-50",
  processing: "text-primary bg-primary/10",
  pending: "text-ink-light bg-ink-faint/30",
};

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold text-ink">
          Welcome back, Rahim
        </h1>
        <p className="text-ink-mid text-sm mt-1">
          Here's a summary of your account
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-ink-faint/50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-accent" />
            </div>
          </div>
          <div className="text-2xl font-heading font-semibold text-ink">3</div>
          <div className="text-sm text-ink-mid">Total Orders</div>
        </div>
        <div className="bg-white rounded-xl border border-ink-faint/50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="text-2xl font-heading font-semibold text-ink">
            ৳6,14,000
          </div>
          <div className="text-sm text-ink-mid">Total Spent</div>
        </div>
        <div className="bg-white rounded-xl border border-ink-faint/50 p-5 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-accent-light/10 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-accent-light" />
            </div>
          </div>
          <div className="text-2xl font-heading font-semibold text-accent">
            1
          </div>
          <div className="text-sm text-ink-mid">Delivered</div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-ink-faint/50">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-faint/50">
          <h2 className="text-base font-semibold text-ink">Recent Orders</h2>
          <Link
            href="/dashboard/orders"
            className="text-sm text-accent font-medium hover:underline flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-ink-faint/50">
          {orders.map((order) => {
            const Icon = statusIcon[order.status];
            return (
              <div key={order.id} className="px-5 py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-ink-light" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-ink truncate">
                    {order.product}
                  </div>
                  <div className="text-xs text-ink-light">{order.date}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-semibold text-ink">
                    {order.amount}
                  </div>
                  <span
                    className={`inline-block mt-0.5 px-2 py-0.5 rounded text-xs font-medium capitalize ${statusColor[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-xl border border-ink-faint/50 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-ink">Shipping Address</h2>
          <Link
            href="/dashboard/profile"
            className="text-sm text-accent font-medium hover:underline"
          >
            Edit
          </Link>
        </div>
        <div className="flex items-start gap-2 text-sm text-ink-mid">
          <MapPin className="w-4 h-4 text-ink-light mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium text-ink">Rahim Uddin</div>
            <div>House 42, Road 11, Banani</div>
            <div>Dhaka 1213, Bangladesh</div>
            <div className="text-ink-light mt-1">+880 1712-345678</div>
          </div>
        </div>
      </div>
    </div>
  );
}
