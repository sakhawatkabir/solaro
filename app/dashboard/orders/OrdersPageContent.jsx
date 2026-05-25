"use client";

import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Package, Truck, Clock, CheckCircle, XCircle } from "lucide-react";

const statusIcon = {
  DELIVERED: CheckCircle,
  SHIPPED: Truck,
  PROCESSING: Package,
  PENDING: Clock,
  CONFIRMED: Package,
  CANCELLED: XCircle,
};

const statusColor = {
  DELIVERED: "text-accent bg-accent/10",
  SHIPPED: "text-blue-600 bg-blue-50",
  PROCESSING: "text-primary bg-primary/10",
  PENDING: "text-ink-light bg-ink-faint/30",
  CONFIRMED: "text-blue-600 bg-blue-50",
  CANCELLED: "text-red-600 bg-red-50",
};

function formatPrice(amount) {
  return `৳${amount.toLocaleString()}`;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function OrdersPageContent({ initialData }) {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");

  // Invalidate cached orders on mount so fresh server initialData is used
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["user-orders"] });
  }, [queryClient]);

  const { data, isLoading } = useQuery({
    queryKey: ["user-orders", filter],
    queryFn: async () => {
      const statusParam = filter === "all" ? "" : filter;
      const res = await fetch(
        `/api/user/orders?limit=50&status=${statusParam}`,
      );
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
    initialData: filter === "all" ? initialData : undefined,
    staleTime: 5 * 60 * 1000,
  });

  const orders = data?.orders || [];
  const stats = data?.stats || { totalOrders: 0, totalSpent: 0 };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      <div className="animate-slide-up">
        <h1 className="text-2xl font-heading font-semibold text-ink text-balance">
          My Orders
        </h1>
        <p className="text-ink-mid text-sm mt-1">
          {stats.totalOrders} orders &middot; {formatPrice(stats.totalSpent)}{" "}
          total
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-cream rounded-lg p-1 w-fit animate-slide-up animate-stagger-1">
        {[
          "all",
          "pending",
          "processing",
          "shipped",
          "delivered",
          "cancelled",
        ].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 active:scale-[0.95] ${
              filter === f
                ? "bg-white text-ink shadow-sm"
                : "text-ink-light hover:text-ink hover:shadow-sm"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-ink-faint/50 p-4 animate-pulse"
            >
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-lg bg-ink/10"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-ink/10 rounded w-32"></div>
                  <div className="h-3 bg-ink/10 rounded w-48"></div>
                </div>
                <div className="h-6 bg-ink/10 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order, idx) => {
            const Icon = statusIcon[order.status] || Package;
            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-ink-faint/50 p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-accent/20 active:scale-[0.99] animate-slide-up"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-lg bg-cream flex items-center justify-center flex-shrink-0">
                      <Icon className="size-5 text-ink-light" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink">
                        {order.items[0]?.title || "Order"}
                      </div>
                      <div className="text-xs text-ink-light mt-0.5">
                        {formatDate(order.createdAt)} &middot;{" "}
                        {order.items.length} item(s)
                      </div>
                      <div className="text-xs text-ink-faint font-mono mt-0.5">
                        {order.orderNumber}
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-semibold text-ink">
                      {formatPrice(order.total)}
                    </div>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium capitalize ${statusColor[order.status]}`}
                    >
                      {order.status.toLowerCase()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          {orders.length === 0 && (
            <div className="text-center py-12 text-ink-light">
              <Package className="size-10 mx-auto mb-3 text-ink-faint" />
              <p className="text-sm">No orders found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
