"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "@/app/actions/customers";
import CustomersHeader from "./components/CustomersHeader";
import CustomersFilters from "./components/CustomersFilters";
import CustomersTable from "./components/CustomersTable";
import TableSkeleton from "../components/TableSkeleton";

const allStatuses = ["all", "ACTIVE", "INACTIVE", "SUSPENDED"];

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const perPage = 9999;

  const { data: customersData, isLoading } = useQuery({
    queryKey: ["admin-customers", search, statusFilter],
    queryFn: () => getCustomers(1, perPage, search, statusFilter),
  });

  const customers = customersData?.customers || [];
  const total = customersData?.pagination?.total || 0;

  return (
    <div className="space-y-6">
      <CustomersHeader totalCustomers={total} />

      <CustomersFilters
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
        }}
        statusFilter={statusFilter}
        onStatusChange={(val) => {
          setStatusFilter(val);
        }}
        allStatuses={allStatuses}
      />

      {isLoading ? (
        <TableSkeleton rows={5} cols={5} />
      ) : (
        <CustomersTable customers={customers} />
      )}
    </div>
  );
}
