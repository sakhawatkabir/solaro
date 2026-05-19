"use client";

import Link from "next/link";
import { Shield, Eye, Mail, Clock, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { roles } from "../../data/mock";
import TablePagination from "../../components/TablePagination";

export default function UsersTable({
  users,
  currentPage,
  totalPages,
  perPage,
  totalFiltered,
  onPageChange,
  onPermissionsClick,
  onDeleteClick,
}) {
  const getRoleBadge = (roleId) => {
    const roleMap = {
      "super-admin": "bg-purple-500/10 text-purple-400",
      manager: "bg-blue-500/10 text-blue-400",
      editor: "bg-amber-500/10 text-amber-400",
      support: "bg-emerald-500/10 text-emerald-400",
      viewer: "bg-zinc-500/10 text-zinc-400",
      custom: "bg-pink-500/10 text-pink-400",
    };
    const matchedRole = roles.find((r) => r.id === roleId);
    return (
      <span
        className={cn(
          "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
          roleMap[roleId] || "bg-zinc-500/10 text-zinc-400",
        )}
      >
        {matchedRole ? matchedRole.label : roleId}
      </span>
    );
  };

  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                User
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Role
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Status
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                Last Login
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-zinc-500"
                >
                  <Shield className="w-10 h-10 mx-auto mb-3 text-zinc-700" />
                  <p className="text-sm">No users found</p>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-emerald-400">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white">
                          {user.name}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-zinc-500">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                        user.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400",
                      )}
                    >
                      {user.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                      <Clock className="w-3.5 h-3.5" />
                      {user.lastLogin}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onPermissionsClick(user)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition-colors"
                        title="Manage Permissions"
                      >
                        <Shield className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => onDeleteClick(user)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={perPage}
          totalFiltered={totalFiltered}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
