"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Package } from "lucide-react";
import { getOrderById, updateOrder } from "@/app/actions/orders";
import OrderDetailHeader from "./components/OrderDetailHeader";
import OrderStatusCard from "./components/OrderStatusCard";
import OrderCustomerInfo from "./components/OrderCustomerInfo";
import OrderItems from "./components/OrderItems";

const statusOrder = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function OrderDetailPage({ params }) {
  const queryClient = useQueryClient();
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const { data: order, isLoading } = useQuery({
    queryKey: ["admin-order", params.id],
    queryFn: () => getOrderById(params.id),
  });

  const updateMutation = useMutation({
    mutationFn: (data) => updateOrder(params.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-order", params.id]);
      setShowStatusDropdown(false);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 border-3 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

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

  const handleStatusChange = (status) => {
    updateMutation.mutate({ status });
  };

  return (
    <div className="space-y-6">
      <OrderDetailHeader
        order={order}
        showStatusDropdown={showStatusDropdown}
        onToggleStatus={() => setShowStatusDropdown(!showStatusDropdown)}
        onStatusChange={handleStatusChange}
        statusOrder={statusOrder}
        isUpdating={updateMutation.isPending}
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
