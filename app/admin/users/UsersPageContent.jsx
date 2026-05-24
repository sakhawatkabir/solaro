"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, deleteUser } from "@/app/actions/users";
import UsersHeader from "./components/UsersHeader";
import UsersFilters from "./components/UsersFilters";
import UsersTable from "./components/UsersTable";
import TableSkeleton from "../components/TableSkeleton";

const allRoles = [
  "all",
  "SUPER_ADMIN",
  "MANAGER",
  "EDITOR",
  "SUPPORT",
  "VIEWER",
  "CUSTOM",
];
const allStatuses = ["all", "ACTIVE", "INACTIVE", "SUSPENDED"];

export default function UsersPageContent({ initialData }) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const isDefaultView =
    currentPage === 1 &&
    !search &&
    roleFilter === "all" &&
    statusFilter === "all";

  const { data: usersData, isLoading } = useQuery({
    queryKey: ["admin-users", currentPage, search, roleFilter, statusFilter],
    queryFn: () =>
      getUsers(currentPage, perPage, search, roleFilter, statusFilter),
    initialData: isDefaultView ? initialData : undefined,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });

  const users = usersData?.users || [];
  const pagination = usersData?.pagination || { totalPages: 0, total: 0 };

  return (
    <div className="space-y-6">
      <UsersHeader totalUsers={pagination.total} />

      <UsersFilters
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        roleFilter={roleFilter}
        onRoleChange={(val) => {
          setRoleFilter(val);
          setCurrentPage(1);
        }}
        statusFilter={statusFilter}
        onStatusChange={(val) => {
          setStatusFilter(val);
          setCurrentPage(1);
        }}
        allRoles={allRoles}
        allStatuses={allStatuses}
      />

      {isLoading ? (
        <TableSkeleton rows={5} cols={5} />
      ) : (
        <UsersTable
          users={users}
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          perPage={perPage}
          totalFiltered={pagination.total}
          onPageChange={setCurrentPage}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      )}
    </div>
  );
}
