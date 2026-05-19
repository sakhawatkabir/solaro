"use client";

import {
  Package,
  Clock,
  CheckCircle,
  Loader2,
  Truck,
} from "lucide-react";
import StatusBadge from "../../../components/StatusBadge";

const timelineSteps = [
  { status: "pending", label: "Order Placed", icon: Clock },
  { status: "confirmed", label: "Confirmed", icon: CheckCircle },
  { status: "processing", label: "Processing", icon: Loader2 },
  { status: "shipped", label: "Shipped", icon: Truck },
  { status: "delivered", label: "Delivered", icon: Package },
];

const statusOrder = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
];

export default function OrderStatusCard({ order }) {
  const currentStatusIndex = statusOrder.indexOf(order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Package className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{order.id}</h1>
            <div className="flex items-center gap-3 mt-1">
              <StatusBadge status={order.status} />
              <span className="text-sm text-zinc-400">{order.date}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{order.amount}</div>
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
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-zinc-800 text-zinc-600"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
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
    </div>
  );
}
