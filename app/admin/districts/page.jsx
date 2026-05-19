"use client";

import { useState } from "react";
import { districts } from "../data/mock";
import DistrictsHeader from "./components/DistrictsHeader";
import DistrictsSummary from "./components/DistrictsSummary";
import DistrictsFilters from "./components/DistrictsFilters";
import DistrictsTable from "./components/DistrictsTable";

export default function DistrictsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const allStatuses = ["all", "active", "inactive"];

  const filtered = districts.filter((district) => {
    const matchSearch =
      search === "" ||
      district.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && district.active) ||
      (statusFilter === "inactive" && !district.active);
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const totalOrders = districts.reduce((sum, d) => sum + d.orders, 0);
  const totalRevenue = districts.reduce((sum, d) => sum + d.revenue, 0);
  const activeCount = districts.filter((d) => d.active).length;

  return (
    <div className="space-y-6">
      <DistrictsHeader
        totalDistricts={districts.length}
        totalOrders={totalOrders}
        totalRevenue={totalRevenue}
      />

      <DistrictsSummary
        districts={districts}
        activeCount={activeCount}
        totalRevenue={totalRevenue}
      />

      <DistrictsFilters
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

      <DistrictsTable
        districts={paginated}
        currentPage={currentPage}
        totalPages={totalPages}
        perPage={perPage}
        totalFiltered={filtered.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
