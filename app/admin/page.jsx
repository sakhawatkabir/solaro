"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, LayoutDashboard, Users, Percent } from "lucide-react";
import {
  getDashboardStats,
  getRevenueChartData,
  getCategoryChartData,
  getRecentOrders,
  getRecentLeads,
} from "@/app/actions/dashboard";
import DashboardHeader from "./components/DashboardHeader";
import StatCard from "./components/StatCard";
import RevenueChart from "./components/RevenueChart";
import CategoryChart from "./components/CategoryChart";
import RecentOrdersTable from "./components/RecentOrdersTable";
import QuickActions from "./components/QuickActions";
import RecentLeads from "./components/RecentLeads";

const statIcons = [TrendingUp, LayoutDashboard, Users, Percent];

function formatBDT(amount) {
  if (amount >= 100000) {
    const lakhs = (amount / 100000).toFixed(2);
    return `৳${lakhs}L`;
  }
  return `৳${amount.toLocaleString("en-BD")}`;
}

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState("30d");

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => getDashboardStats(),
  });

  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ["dashboard-revenue"],
    queryFn: () => getRevenueChartData(),
  });

  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryKey: ["dashboard-categories"],
    queryFn: () => getCategoryChartData(),
  });

  const { data: recentOrders, isLoading: ordersLoading } = useQuery({
    queryKey: ["dashboard-recent-orders"],
    queryFn: () => getRecentOrders(),
  });

  const { data: recentLeads, isLoading: leadsLoading } = useQuery({
    queryKey: ["dashboard-recent-leads"],
    queryFn: () => getRecentLeads(),
  });

  const statCards = stats
    ? [
        {
          label: "Total Revenue",
          value: formatBDT(stats.revenue),
          change: `${stats.revenueChange >= 0 ? "+" : ""}${stats.revenueChange}%`,
          trend: stats.revenueChange >= 0 ? "up" : "down",
          description: "Last 30 days",
        },
        {
          label: "Orders",
          value: stats.totalOrders.toString(),
          change: `${stats.ordersChange >= 0 ? "+" : ""}${stats.ordersChange}%`,
          trend: stats.ordersChange >= 0 ? "up" : "down",
          description: "Last 30 days",
        },
        {
          label: "Customers",
          value: stats.totalCustomers.toString(),
          change: `+${stats.newCustomers}`,
          trend: "up",
          description: "Total registered",
        },
        {
          label: "Conversion Rate",
          value: `${stats.conversionRate}%`,
          change: "—",
          trend: "up",
          description: "Lead to order",
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      <DashboardHeader dateRange={dateRange} setDateRange={setDateRange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 animate-pulse"
              >
                <div className="size-10 rounded-lg bg-zinc-800 mb-4" />
                <div className="h-8 w-24 bg-zinc-800 rounded mb-2" />
                <div className="h-4 w-16 bg-zinc-800 rounded mb-1" />
                <div className="h-3 w-20 bg-zinc-800 rounded" />
              </div>
            ))
          : Array.isArray(statCards)
            ? statCards.map((stat, i) => (
                <StatCard key={stat.label} {...stat} icon={statIcons[i]} />
              ))
            : null}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {revenueLoading ? (
          <div className="lg:col-span-2 rounded-xl bg-zinc-900 border border-zinc-800 p-6 animate-pulse">
            <div className="h-5 w-24 bg-zinc-800 rounded mb-1" />
            <div className="h-4 w-32 bg-zinc-800 rounded mb-6" />
            <div className="h-[280px] bg-zinc-800 rounded-lg" />
          </div>
        ) : (
          <RevenueChart data={revenueData || []} />
        )}
        {categoryLoading ? (
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 animate-pulse">
            <div className="h-5 w-28 bg-zinc-800 rounded mb-1" />
            <div className="h-4 w-24 bg-zinc-800 rounded mb-6" />
            <div className="h-[200px] bg-zinc-800 rounded-lg mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-zinc-800" />
                  <div className="h-4 flex-1 bg-zinc-800 rounded" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <CategoryChart data={categoryData || []} />
        )}
      </div>

      {ordersLoading ? (
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 animate-pulse">
          <div className="flex items-center justify-between p-6 border-b border-zinc-800">
            <div className="space-y-1">
              <div className="h-5 w-28 bg-zinc-800 rounded" />
              <div className="h-4 w-20 bg-zinc-800 rounded" />
            </div>
            <div className="h-4 w-16 bg-zinc-800 rounded" />
          </div>
          <div className="divide-y divide-zinc-800">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-6 px-6 py-4">
                <div className="h-4 w-20 bg-zinc-800 rounded" />
                <div className="h-4 w-32 bg-zinc-800 rounded" />
                <div className="h-4 w-40 bg-zinc-800 rounded hidden md:block" />
                <div className="h-4 w-16 bg-zinc-800 rounded hidden lg:block" />
                <div className="h-4 w-16 bg-zinc-800 rounded" />
                <div className="h-5 w-20 bg-zinc-800 rounded" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <RecentOrdersTable orders={recentOrders || []} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions />
        {leadsLoading ? (
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-5 w-24 bg-zinc-800 rounded" />
              <div className="h-4 w-16 bg-zinc-800 rounded" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-zinc-800" />
                    <div className="space-y-1.5">
                      <div className="h-4 w-28 bg-zinc-800 rounded" />
                      <div className="h-3 w-20 bg-zinc-800 rounded" />
                    </div>
                  </div>
                  <div className="h-5 w-16 bg-zinc-800 rounded" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <RecentLeads leads={recentLeads || []} />
        )}
      </div>
    </div>
  );
}
