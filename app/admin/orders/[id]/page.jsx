"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { recentOrders } from "../../data/mock";
import OrderDetailHeader from "./components/OrderDetailHeader";
import OrderStatusCard from "./components/OrderStatusCard";
import OrderCustomerInfo from "./components/OrderCustomerInfo";
import OrderItems from "./components/OrderItems";

const statusOrder = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
];

export default function OrderDetailPage({ params }) {
  const order = recentOrders.find((o) => o.id === params.id);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Package className="w-16 h-16 text-zinc-700 mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">
          Order Not Found
        </h2>
        <p className="text-sm text-zinc-400 mb-6">
          The order you are looking for does not exist.
        </p>
        <Link
          href="/admin/orders"
          className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors text-sm font-medium"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OrderDetailHeader
        order={order}
        showStatusDropdown={showStatusDropdown}
        onToggleStatus={() => setShowStatusDropdown(!showStatusDropdown)}
        statusOrder={statusOrder}
      />

      <OrderStatusCard order={order} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <OrderCustomerInfo order={order} />
        <OrderItems order={order} />
      </div>

      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </Link>
    </div>
  );
}
