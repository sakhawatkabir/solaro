"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCustomer,
  getCustomerOrders,
  updateCustomerStatus,
  deleteCustomerUser,
} from "@/app/actions/customers";
import {
  ArrowLeft,
  Shield,
  ShoppingBag,
  Calendar,
  Clock,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StatusBadge from "../../components/StatusBadge";
import DetailSkeleton from "../../components/DetailSkeleton";

const statusColors = {
  ACTIVE: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  INACTIVE: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  SUSPENDED: "bg-red-500/10 text-red-400 border-red-500/20",
};

function formatBDT(amount) {
  return `৳${amount.toLocaleString("en-BD")}`;
}

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = params.id;

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusError, setStatusError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const { data: customer, isLoading } = useQuery({
    queryKey: ["admin-customer", id],
    queryFn: () => getCustomer(id),
    retry: false,
  });

  const { data: orders = [] } = useQuery({
    queryKey: ["admin-customer-orders", id],
    queryFn: () => getCustomerOrders(id),
    enabled: !!customer,
  });

  const statusMutation = useMutation({
    mutationFn: (newStatus) => updateCustomerStatus(id, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-customer", id] });
      queryClient.invalidateQueries({ queryKey: ["admin-customers"] });
      setSelectedStatus(null);
      setStatusError(null);
    },
    onError: (error) => {
      setStatusError(error.message || "Failed to update status");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteCustomerUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-customers"] });
      setDeleteDialogOpen(false);
      router.push("/admin/customers");
    },
    onError: (error) => {
      setDeleteError(error.message || "Failed to delete customer");
    },
  });

  if (isLoading) return <DetailSkeleton />;

  if (!customer) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-500">Customer not found</p>
        <Link
          href="/admin/customers"
          className="text-emerald-400 hover:text-emerald-300 text-sm mt-2 inline-block"
        >
          Back to customers
        </Link>
      </div>
    );
  }

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/customers"
          className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <div className="size-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <Shield className="size-6 text-emerald-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-white">
              {customer.name || "Unnamed Customer"}
            </h1>
            <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              VIEWER
            </span>
            <span
              className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border ${
                statusColors[customer.status] || statusColors.ACTIVE
              }`}
            >
              {customer.status}
            </span>
          </div>
          <p className="text-sm text-zinc-400">{customer.email}</p>
          {statusError && (
            <p className="text-xs text-red-400 mt-1">{statusError}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Status Update */}
          <select
            value={selectedStatus || customer.status || ""}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedStatus(value);
              setStatusError(null);
              statusMutation.mutate(value);
            }}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-500/50 text-sm cursor-pointer"
          >
            <option value="ACTIVE" className="bg-zinc-900 text-emerald-400">
              ACTIVE
            </option>
            <option value="INACTIVE" className="bg-zinc-900 text-zinc-400">
              INACTIVE
            </option>
            <option value="SUSPENDED" className="bg-zinc-900 text-red-400">
              SUSPENDED
            </option>
          </select>

          {/* Delete Dialog */}
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2 className="size-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="size-5 text-red-400" />
                  </div>
                  <div>
                    <DialogTitle>Delete Customer</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone.
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="py-2">
                <p className="text-sm text-zinc-300">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-white">
                    {customer.name || customer.email}
                  </span>
                  ? This will permanently remove their account and all
                  associated data.
                </p>
                {deleteError && (
                  <p className="text-xs text-red-400 mt-2">{deleteError}</p>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDeleteDialogOpen(false)}
                  disabled={deleteMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <ShoppingBag className="size-4 text-emerald-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">
            {customer.totalOrders}
          </p>
          <p className="text-xs text-zinc-500 mt-1">Total Orders</p>
        </div>
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <span className="text-emerald-400 font-bold text-sm">৳</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-white">
            {formatBDT(totalSpent)}
          </p>
          <p className="text-xs text-zinc-500 mt-1">Total Spent</p>
        </div>
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-9 rounded-lg bg-zinc-800 flex items-center justify-center">
              <Calendar className="size-4 text-zinc-400" />
            </div>
          </div>
          <p className="text-lg font-bold text-white">
            {customer.createdAt
              ? new Date(customer.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "—"}
          </p>
          <p className="text-xs text-zinc-500 mt-1">Member Since</p>
        </div>
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-9 rounded-lg bg-zinc-800 flex items-center justify-center">
              <Clock className="size-4 text-zinc-400" />
            </div>
          </div>
          <p className="text-lg font-bold text-white">
            {customer.lastLogin
              ? new Date(customer.lastLogin).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Never"}
          </p>
          <p className="text-xs text-zinc-500 mt-1">Last Login</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">Order History</h2>
          <p className="text-sm text-zinc-400">
            {orders.length} order{orders.length !== 1 ? "s" : ""} placed
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                  Order
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                  Total
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">
                  Payment
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-zinc-500"
                  >
                    <ShoppingBag className="size-8 mx-auto mb-2 text-zinc-700" />
                    <p className="text-sm">No orders placed yet</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-white">
                        {formatBDT(order.total)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status.toLowerCase()} />
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-sm text-zinc-400">
                        {order.paymentStatus === "PAID"
                          ? "Paid"
                          : order.paymentStatus === "UNPAID"
                            ? "Unpaid"
                            : order.paymentStatus === "PARTIAL"
                              ? "Partial"
                              : "Refunded"}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-sm text-zinc-400">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
