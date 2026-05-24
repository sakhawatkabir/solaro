"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import OrdersHeader from "./components/OrdersHeader";
import OrderStatusSummary from "./components/OrderStatusSummary";
import OrderFilters from "./components/OrderFilters";
import OrdersTable from "./components/OrdersTable";
import TableSkeleton from "../components/TableSkeleton";

const allStatuses = [
  "all",
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function OrdersPageContent({ initialData }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["admin-orders", currentPage, search, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage,
        perPage,
        ...(search && { search }),
        ...(statusFilter !== "all" && { status: statusFilter }),
      });
      const res = await fetch(`/api/admin/orders?${params}`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
    initialData:
      currentPage === 1 && !search && statusFilter === "all"
        ? initialData
        : undefined,
  });

  const orders = ordersData?.orders || [];
  const total = ordersData?.pagination?.total || 0;
  const totalPages = ordersData?.pagination?.totalPages || 1;

  const statusCounts = [
    {
      status: "PENDING",
      count: orders.filter((o) => o.status === "PENDING").length,
    },
    {
      status: "CONFIRMED",
      count: orders.filter((o) => o.status === "CONFIRMED").length,
    },
    {
      status: "PROCESSING",
      count: orders.filter((o) => o.status === "PROCESSING").length,
    },
    {
      status: "SHIPPED",
      count: orders.filter((o) => o.status === "SHIPPED").length,
    },
    {
      status: "DELIVERED",
      count: orders.filter((o) => o.status === "DELIVERED").length,
    },
    {
      status: "CANCELLED",
      count: orders.filter((o) => o.status === "CANCELLED").length,
    },
  ].filter((s) => s.count > 0);

  return (
    <div className="space-y-6">
      <OrdersHeader
        totalOrders={total}
        deliveredCount={orders.filter((o) => o.status === "DELIVERED").length}
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
        <TableSkeleton rows={5} cols={6} />
      ) : (
        <OrdersTable
          orders={orders}
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={perPage}
          totalFiltered={total}
          onPageChange={setCurrentPage}
          search={search}
          statusFilter={statusFilter}
        />
      )}
    </div>
  );
}
