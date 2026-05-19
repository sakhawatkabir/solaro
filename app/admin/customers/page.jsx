"use client";

import { useState } from "react";
import { customers } from "../data/mock";
import CustomersHeader from "./components/CustomersHeader";
import CustomersSummary from "./components/CustomersSummary";
import CustomersFilters from "./components/CustomersFilters";
import CustomersTable from "./components/CustomersTable";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const allDistricts = ["all", ...new Set(customers.map((c) => c.district))];

  const filtered = customers.filter((customer) => {
    const matchSearch =
      search === "" ||
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase());
    const matchDistrict =
      districtFilter === "all" || customer.district === districtFilter;
    return matchSearch && matchDistrict;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const totalSpent = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const totalOrders = customers.reduce((sum, c) => sum + c.orders, 0);

  return (
    <div className="space-y-6">
      <CustomersHeader
        totalCustomers={customers.length}
        totalSpent={totalSpent}
        totalOrders={totalOrders}
      />

      <CustomersSummary customers={customers} totalSpent={totalSpent} />

      <CustomersFilters
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        districtFilter={districtFilter}
        onDistrictChange={(val) => {
          setDistrictFilter(val);
          setCurrentPage(1);
        }}
        allDistricts={allDistricts}
      />

      <CustomersTable
        customers={paginated}
        currentPage={currentPage}
        totalPages={totalPages}
        perPage={perPage}
        totalFiltered={filtered.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
