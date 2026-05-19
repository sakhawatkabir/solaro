"use client";

import { useState } from "react";
import { recentOrders } from "../data/mock";
import OrdersHeader from "./components/OrdersHeader";
import OrderStatusSummary from "./components/OrderStatusSummary";
import OrderFilters from "./components/OrderFilters";
import OrdersTable from "./components/OrdersTable";

const allStatuses = [
  "all",
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const allDistricts = ["all", ...new Set(recentOrders.map((o) => o.district))];

  const filtered = recentOrders.filter((order) => {
    const matchSearch =
      search === "" ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || order.status === statusFilter;
    const matchDistrict =
      districtFilter === "all" || order.district === districtFilter;
    return matchSearch && matchStatus && matchDistrict;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const statusCounts = allStatuses
    .filter((s) => s !== "all")
    .map((s) => ({
      status: s,
      count: recentOrders.filter((o) => o.status === s).length,
    }));

  return (
    <div className="space-y-6">
      <OrdersHeader totalOrders={recentOrders.length} />

      <OrderStatusSummary
        statusCounts={statusCounts}
        activeFilter={statusFilter}
        onFilterChange={(status) => {
          setStatusFilter(status);
          setCurrentPage(1);
        }}
      />

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
        districtFilter={districtFilter}
        onDistrictChange={(val) => {
          setDistrictFilter(val);
          setCurrentPage(1);
        }}
        allStatuses={allStatuses}
        allDistricts={allDistricts}
      />

      <OrdersTable
        orders={paginated}
        currentPage={currentPage}
        totalPages={totalPages}
        perPage={perPage}
        totalFiltered={filtered.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
