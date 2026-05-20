"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCustomers } from "@/app/actions/customers";
import CustomersHeader from "./components/CustomersHeader";
import CustomersFilters from "./components/CustomersFilters";
import CustomersTable from "./components/CustomersTable";

const allStatuses = ["all", "ACTIVE", "INACTIVE", "BLACKLISTED"];

export default function CustomersPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const { data: customersData, isLoading } = useQuery({
    queryKey: ["admin-customers", currentPage, search, statusFilter],
    queryFn: () => getCustomers(currentPage, perPage, search, statusFilter),
  });

  const customers = customersData?.customers || [];
  const pagination = customersData?.pagination || { totalPages: 0, total: 0 };

  return (
    <div className="space-y-6">
      <CustomersHeader totalCustomers={pagination.total} />

      <CustomersFilters
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
        <CustomersTable
          customers={customers}
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          perPage={perPage}
          totalFiltered={pagination.total}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
