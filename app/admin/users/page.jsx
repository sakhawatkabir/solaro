"use client";

import { useState } from "react";
import { adminUsers, roles } from "../data/mock";
import UsersHeader from "./components/UsersHeader";
import UsersFilters from "./components/UsersFilters";
import UsersTable from "./components/UsersTable";
import UserPermissionsModal from "./components/UserPermissionsModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

export default function UsersPage() {
  const [users, setUsers] = useState(adminUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const perPage = 8;

  const allRoles = ["all", ...roles.map((r) => r.id)];
  const allStatuses = ["all", "active", "inactive"];

  const filtered = users.filter((user) => {
    const matchSearch =
      search === "" ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || user.role === roleFilter;
    const matchStatus = statusFilter === "all" || user.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const activeCount = users.filter((u) => u.status === "active").length;
  const inactiveCount = users.length - activeCount;

  const handleOpenPermissions = (user) => {
    setSelectedUser(user);
    setShowPermissionsModal(true);
  };

  const handleSavePermissions = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
    );
    setShowPermissionsModal(false);
    setSelectedUser(null);
  };

  const handleOpenDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      <UsersHeader
        totalUsers={users.length}
        activeCount={activeCount}
        inactiveCount={inactiveCount}
      />

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

      <UsersTable
        users={paginated}
        currentPage={currentPage}
        totalPages={totalPages}
        perPage={perPage}
        totalFiltered={filtered.length}
        onPageChange={setCurrentPage}
        onPermissionsClick={handleOpenPermissions}
        onDeleteClick={handleOpenDelete}
      />

      {showPermissionsModal && selectedUser && (
        <UserPermissionsModal
          user={selectedUser}
          roles={roles}
          onSave={handleSavePermissions}
          onClose={() => {
            setShowPermissionsModal(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showDeleteModal && selectedUser && (
        <DeleteConfirmModal
          user={selectedUser}
          onConfirm={handleConfirmDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}
