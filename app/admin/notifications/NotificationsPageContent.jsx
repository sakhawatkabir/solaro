"use client";

import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  Trash2,
  Check,
  Search,
  Filter,
  ArrowUpRight,
  Package,
  MessageSquare,
  Star,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  getAdminNotifications,
  updateNotificationRead,
  deleteNotification,
  deleteAllNotifications,
  markAllNotificationsReadAdmin,
} from "@/app/actions/notifications";

const typeIcons = {
  ORDER: Package,
  LEAD: MessageSquare,
  REVIEW: Star,
  SYSTEM: AlertCircle,
};

const typeColors = {
  ORDER: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  LEAD: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  REVIEW: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  SYSTEM: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function NotificationsPageContent({ initialData }) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 20;

  const isDefaultView =
    page === 1 && !search && typeFilter === "all" && statusFilter === "all";

  const { data, isLoading } = useQuery({
    queryKey: ["admin-notifications", page, typeFilter, statusFilter, search],
    queryFn: () =>
      getAdminNotifications({
        page,
        perPage,
        type: typeFilter,
        read: statusFilter,
        search,
      }),
    initialData: isDefaultView ? initialData : undefined,
  });

  const markReadMutation = useMutation({
    mutationFn: (id) => updateNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => markAllNotificationsReadAdmin(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const deleteAllMutation = useMutation({
    mutationFn: () => deleteAllNotifications(),
    onSuccess: () => {
      setConfirmClearAll(false);
      queryClient.invalidateQueries({ queryKey: ["admin-notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const notifications = data?.notifications || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / perPage);
  const unreadCount = data?.stats?.unread || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Notifications</h1>
          <p className="text-sm text-zinc-400 mt-1">
            {total} total notifications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg text-sm">
            <Bell className="size-4" />
            <span className="font-semibold">{total}</span>
            <span className="text-zinc-400">total</span>
          </div>
          {unreadCount > 0 && (
            <div className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg text-sm">
              <Bell className="size-4" />
              <span className="font-semibold">{unreadCount}</span>
              <span className="text-zinc-400">unread</span>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <Input
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-300 placeholder:text-zinc-500"
          />
        </div>
        <Select
          value={typeFilter}
          onValueChange={(val) => {
            setTypeFilter(val);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[160px] bg-zinc-900 border-zinc-800 text-zinc-300">
            <Filter className="size-4 mr-2" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="ORDER">Orders</SelectItem>
            <SelectItem value="LEAD">Leads</SelectItem>
            <SelectItem value="REVIEW">Reviews</SelectItem>
            <SelectItem value="SYSTEM">System</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={(val) => {
            setStatusFilter(val);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[160px] bg-zinc-900 border-zinc-800 text-zinc-300">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="false">Unread</SelectItem>
            <SelectItem value="true">Read</SelectItem>
          </SelectContent>
        </Select>
        {unreadCount > 0 && (
          <button
            onClick={() => markAllReadMutation.mutate()}
            disabled={markAllReadMutation.isPending}
            className="px-3 py-2 rounded-lg text-sm font-medium text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Check className="size-4" />
            {markAllReadMutation.isPending ? "Marking..." : "Mark all read"}
          </button>
        )}
        {total > 0 && (
          <button
            onClick={() => setConfirmClearAll(true)}
            className="px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="size-4" />
            Clear all
          </button>
        )}
      </div>

      {/* List */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="size-6 text-zinc-500 animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Bell className="size-12 text-zinc-700 mb-4" />
            <p className="text-zinc-500">No notifications found</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {notifications.map((n) => {
              const Icon = typeIcons[n.type] || Bell;
              return (
                <div
                  key={n.id}
                  className={`flex items-start gap-4 p-4 transition-colors hover:bg-zinc-800/50 ${
                    !n.read ? "bg-emerald-500/5" : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg flex-shrink-0 ${
                      typeColors[n.type] || typeColors.SYSTEM
                    }`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-white">
                        {n.title}
                      </p>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${
                          typeColors[n.type] || typeColors.SYSTEM
                        }`}
                      >
                        {n.type}
                      </Badge>
                      {!n.read && (
                        <Badge
                          variant="outline"
                          className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        >
                          Unread
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-zinc-400 mt-1">{n.message}</p>
                    <p className="text-xs text-zinc-500 mt-2">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {n.link && (
                      <button
                        onClick={() => (window.location.href = n.link)}
                        className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                        title="Go to source"
                      >
                        <ArrowUpRight className="size-4" />
                      </button>
                    )}
                    {!n.read && (
                      <button
                        onClick={() => markReadMutation.mutate(n.id)}
                        className="p-2 rounded-lg text-zinc-500 hover:text-emerald-400 hover:bg-zinc-800 transition-colors"
                        title="Mark as read"
                      >
                        <Check className="size-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setDeleteTarget(n.id)}
                      className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800">
            <p className="text-sm text-zinc-400">
              Showing {(page - 1) * perPage + 1} to{" "}
              {Math.min(page * perPage, total)} of {total}
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-white mb-2">
              Delete Notification
            </h3>
            <p className="text-sm text-zinc-400 mb-6">
              Are you sure you want to delete this notification? This action
              cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteMutation.mutate(deleteTarget);
                  setDeleteTarget(null);
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-500 transition-colors flex items-center gap-2"
              >
                <Trash2 className="size-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear all confirmation */}
      {confirmClearAll && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-white mb-2">
              Clear All Notifications
            </h3>
            <p className="text-sm text-zinc-400 mb-6">
              Are you sure you want to delete all {total} notifications? This
              action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmClearAll(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteAllMutation.mutate()}
                disabled={deleteAllMutation.isPending}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-500 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Trash2 className="size-4" />
                {deleteAllMutation.isPending ? "Deleting..." : "Clear All"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
