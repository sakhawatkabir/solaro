"use client";

import { useState, useMemo } from "react";
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

  const { data: revenueData } = useQuery({
    queryKey: ["dashboard-revenue"],
    queryFn: () => getRevenueChartData(),
  });

  const { data: categoryData } = useQuery({
    queryKey: ["dashboard-categories"],
    queryFn: () => getCategoryChartData(),
  });

  const { data: recentOrders } = useQuery({
    queryKey: ["dashboard-recent-orders"],
    queryFn: () => getRecentOrders(),
  });

  const { data: recentLeads } = useQuery({
    queryKey: ["dashboard-recent-leads"],
    queryFn: () => getRecentLeads(),
  });

  const statCards = useMemo(
    () =>
      stats
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
        : [],
    [stats],
  );

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
          : statCards.map((stat, i) => (
              <StatCard key={stat.label} {...stat} icon={statIcons[i]} />
            ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart data={revenueData || []} />
        <CategoryChart data={categoryData || []} />
      </div>

      <RecentOrdersTable orders={recentOrders || []} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions />
        <RecentLeads leads={recentLeads || []} />
      </div>
    </div>
  );
}
