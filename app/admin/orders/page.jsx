"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders, getOrderStats } from "@/app/actions/orders";
import OrdersHeader from "./components/OrdersHeader";
import OrderStatusSummary from "./components/OrderStatusSummary";
import OrderFilters from "./components/OrderFilters";
import OrdersTable from "./components/OrdersTable";

const allStatuses = [
  "all",
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["admin-orders", currentPage, search, statusFilter],
    queryFn: () =>
      getOrders({
        page: currentPage,
        perPage,
        search,
        status: statusFilter === "all" ? "" : statusFilter,
      }),
  });

  const { data: stats } = useQuery({
    queryKey: ["admin-order-stats"],
    queryFn: () => getOrderStats(),
  });

  const orders = ordersData?.orders || [];
  const total = ordersData?.total || 0;
  const totalPages = ordersData?.totalPages || 1;

  const statusCounts =
    stats?.statusBreakdown.map((s) => ({
      status: s.status,
      count: s.count,
    })) || [];

  return (
    <div className="space-y-6">
      <OrdersHeader
        totalOrders={stats?.totalOrders || 0}
        deliveredCount={
          stats?.statusBreakdown.find((s) => s.status === "DELIVERED")?.count
        }
      />

      {statusCounts.length > 0 && (
        <OrderStatusSummary
          statusCounts={statusCounts}
          activeFilter={statusFilter}
          onFilterChange={(status) => {
            setStatusFilter(status);
            setCurrentPage(1);
          }}
        />
      )}

      <OrderFilters
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        statusFilter={statusFilter}
        onStatusChange={(val) => {
          setStatusFilter(val);
          setCurrentPage(1);
        }}
        allStatuses={allStatuses}
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-3 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      ) : (
        <OrdersTable
          orders={orders}
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={perPage}
          totalFiltered={total}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
