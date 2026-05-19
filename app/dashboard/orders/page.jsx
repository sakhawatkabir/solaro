"use client";

import { useState } from "react";
import { Package, Truck, Clock, CheckCircle, XCircle } from "lucide-react";

const orders = [
  {
    id: "ORD-001",
    product: "Home Kit 5KW",
    amount: "৳3,50,000",
    status: "delivered",
    date: "May 18, 2026",
    items: 1,
  },
  {
    id: "ORD-002",
    product: "Solar Panel 550W x4",
    amount: "৳84,000",
    status: "shipped",
    date: "May 10, 2026",
    items: 4,
  },
  {
    id: "ORD-003",
    product: "Battery 10kWh",
    amount: "৳1,80,000",
    status: "processing",
    date: "Apr 28, 2026",
    items: 1,
  },
  {
    id: "ORD-004",
    product: "Inverter 5kW",
    amount: "৳65,000",
    status: "pending",
    date: "Apr 15, 2026",
    items: 1,
  },
];

const statusIcon = {
  delivered: CheckCircle,
  shipped: Truck,
  processing: Package,
  pending: Clock,
  cancelled: XCircle,
};

const statusColor = {
  delivered: "text-accent bg-accent/10",
  shipped: "text-blue-600 bg-blue-50",
  processing: "text-primary bg-primary/10",
  pending: "text-ink-light bg-ink-faint/30",
  cancelled: "text-red-600 bg-red-50",
};

export default function OrdersPage() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold text-ink">
          My Orders
        </h1>
        <p className="text-ink-mid text-sm mt-1">
          {orders.length} orders &middot; ৳6,79,000 total
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-cream rounded-lg p-1 w-fit">
        {["all", "pending", "processing", "shipped", "delivered"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === f
                ? "bg-white text-ink shadow-sm"
                : "text-ink-light hover:text-ink"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filtered.map((order) => {
          const Icon = statusIcon[order.status];
          return (
            <div
              key={order.id}
              className="bg-white rounded-xl border border-ink-faint/50 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-ink-light" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink">
                      {order.product}
                    </div>
                    <div className="text-xs text-ink-light mt-0.5">
                      {order.date} &middot; {order.items} item(s)
                    </div>
                    <div className="text-xs text-ink-faint font-mono mt-0.5">
                      {order.id}
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-semibold text-ink">
                    {order.amount}
                  </div>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium capitalize ${statusColor[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-ink-light">
            <Package className="w-10 h-10 mx-auto mb-3 text-ink-faint" />
            <p className="text-sm">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}
