"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCustomers } from "@/app/actions/customers";
import CustomersHeader from "./components/CustomersHeader";
import CustomersFilters from "./components/CustomersFilters";
import CustomersTable from "./components/CustomersTable";
import TableSkeleton from "../components/TableSkeleton";

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
        <TableSkeleton rows={5} cols={5} />
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
