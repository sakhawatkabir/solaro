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
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/app/context/AuthContext";

const statusIcon = {
  DELIVERED: CheckCircle,
  SHIPPED: Truck,
  PROCESSING: Package,
  PENDING: Clock,
  CONFIRMED: Package,
  CANCELLED: Clock,
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

export default function DashboardPageContent({ initialData }) {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["user-orders"],
    queryFn: async () => {
      const res = await fetch("/api/user/orders?limit=5");
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
    initialData,
    staleTime: 5 * 60 * 1000,
    enabled: !!user,
  });

  const orders = data?.orders || [];
  const stats = data?.stats || { totalOrders: 0, totalSpent: 0 };
  const delivered = orders.filter((o) => o.status === "DELIVERED").length;

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-ink/10 rounded w-48"></div>
          <div className="h-4 bg-ink/10 rounded w-64"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-ink/10 rounded-xl animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              ></div>
            ))}
          </div>
          <div
            className="h-48 bg-ink/10 rounded-xl animate-slide-up"
            style={{ animationDelay: "320ms" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="animate-slide-up">
        <h1 className="text-2xl font-heading font-semibold text-ink text-balance">
          Welcome back, {user?.name || "User"}
        </h1>
        <p className="text-ink-mid text-sm mt-1">
          Here's a summary of your account
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="group bg-white rounded-xl border border-ink-faint/50 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-accent/30 active:scale-[0.98] animate-slide-up animate-stagger-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="size-9 rounded-lg bg-accent/10 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
              <ShoppingBag className="size-4 text-accent" />
            </div>
          </div>
          <div className="text-2xl font-heading font-semibold text-ink tabular-nums">
            {stats.totalOrders}
          </div>
          <div className="text-sm text-ink-mid">Total Orders</div>
        </div>
        <div className="bg-white rounded-xl border border-ink-faint/50 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-accent/30 active:scale-[0.98] animate-slide-up animate-stagger-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wallet className="size-4 text-primary" />
            </div>
          </div>
          <div className="text-2xl font-heading font-semibold text-ink tabular-nums">
            {formatPrice(stats.totalSpent)}
          </div>
          <div className="text-sm text-ink-mid">Total Spent</div>
        </div>
        <div className="bg-white rounded-xl border border-ink-faint/50 p-5 col-span-2 sm:col-span-1 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-accent/30 active:scale-[0.98] animate-slide-up animate-stagger-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="size-9 rounded-lg bg-accent-light/10 flex items-center justify-center">
              <CheckCircle className="size-4 text-accent-light" />
            </div>
          </div>
          <div className="text-2xl font-heading font-semibold text-accent tabular-nums">
            {delivered}
          </div>
          <div className="text-sm text-ink-mid">Delivered</div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-ink-faint/50 transition-all duration-300 hover:shadow-md animate-slide-up animate-stagger-4">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-faint/50">
          <h2 className="text-base font-semibold text-ink">Recent Orders</h2>
          <Link
            href="/dashboard/orders"
            className="text-sm text-accent font-medium hover:underline hover:text-accent-mid flex items-center gap-1 transition-all duration-200 group"
          >
            View All
            <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="divide-y divide-ink-faint/50">
          {orders.length === 0 ? (
            <div className="px-5 py-8 text-center text-ink-light animate-fadeIn">
              <Package className="size-8 mx-auto mb-2 text-ink-faint" />
              <p className="text-sm">No orders yet</p>
              <Link
                href="/products"
                className="text-sm text-accent hover:underline mt-1 inline-block transition-all duration-200"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            orders.map((order, idx) => {
              const Icon = statusIcon[order.status] || Package;
              return (
                <Link
                  key={order.id}
                  href={`/dashboard/orders`}
                  className="px-5 py-4 flex items-center gap-4 transition-all duration-200 hover:bg-cream/80 hover:pl-6 active:bg-cream"
                >
                  <div className="size-10 rounded-lg bg-cream flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-105">
                    <Icon className="size-5 text-ink-light" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-ink truncate">
                      {order.items[0]?.title || "Order"}
                    </div>
                    <div className="text-xs text-ink-light">
                      {formatDate(order.createdAt)}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-semibold text-ink tabular-nums">
                      {formatPrice(order.total)}
                    </div>
                    <span
                      className={`inline-block mt-0.5 px-2 py-0.5 rounded text-xs font-medium capitalize transition-all duration-200 ${statusColor[order.status]}`}
                    >
                      {order.status.toLowerCase()}
                    </span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-xl border border-ink-faint/50 p-5 transition-all duration-300 hover:shadow-md animate-slide-up animate-stagger-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-ink">Shipping Address</h2>
          <Link
            href="/dashboard/profile"
            className="text-sm text-accent font-medium hover:underline hover:text-accent-mid transition-all duration-200"
          >
            Edit
          </Link>
        </div>
        <div className="flex items-start gap-2 text-sm text-ink-mid">
          <MapPin className="size-4 text-ink-light mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium text-ink">{user?.name || "User"}</div>
            <div>{user?.email || "No email"}</div>
            <div className="text-ink-light mt-1">
              Update your address in profile
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
