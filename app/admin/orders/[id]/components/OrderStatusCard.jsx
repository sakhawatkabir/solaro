"use client";

import {
  Package,
  Clock,
  CheckCircle,
  Loader2,
  Truck,
  XCircle,
} from "lucide-react";
import StatusBadge from "../../../components/StatusBadge";

const timelineSteps = [
  { status: "PENDING", label: "Order Placed", icon: Clock },
  { status: "CONFIRMED", label: "Confirmed", icon: CheckCircle },
  { status: "PROCESSING", label: "Processing", icon: Loader2 },
  { status: "SHIPPED", label: "Shipped", icon: Truck },
  { status: "DELIVERED", label: "Delivered", icon: Package },
];

const statusOrder = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
];

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

export default function OrderStatusCard({ order }) {
  const currentStatusIndex = statusOrder.indexOf(order.status);
  const isCancelled = order.status === "CANCELLED";

  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Package className="size-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">
              {order.orderNumber}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <StatusBadge status={order.status.toLowerCase()} />
              <span className="text-sm text-zinc-400">
                {formatDate(order.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            {formatBDT(order.total)}
          </div>
          <div className="text-sm text-zinc-400">Total Amount</div>
        </div>
      </div>

      {!isCancelled && (
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <div className="flex items-center justify-between">
            {timelineSteps.map((step, i) => {
              const Icon = step.icon;
              const isActive = i <= currentStatusIndex;
              return (
                <div key={step.status} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`size-10 rounded-full flex items-center justify-center ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-zinc-800 text-zinc-600"
                      }`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <span
                      className={`text-xs mt-2 ${
                        isActive ? "text-zinc-300" : "text-zinc-600"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < timelineSteps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        i < currentStatusIndex
                          ? "bg-emerald-500/30"
                          : "bg-zinc-800"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isCancelled && (
        <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center gap-3 text-red-400">
          <XCircle className="size-5" />
          <span className="text-sm">This order has been cancelled.</span>
        </div>
      )}
    </div>
  );
}
