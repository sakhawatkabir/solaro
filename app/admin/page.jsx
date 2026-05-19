"use client";

import { useState } from "react";
import { TrendingUp, LayoutDashboard, Users, Percent } from "lucide-react";
import { stats, recentOrders, revenueData, categoryData } from "./data/mock";
import StatCard from "./components/StatCard";
import DashboardHeader from "./components/DashboardHeader";
import RevenueChart from "./components/RevenueChart";
import CategoryChart from "./components/CategoryChart";
import RecentOrdersTable from "./components/RecentOrdersTable";
import QuickActions from "./components/QuickActions";
import RecentLeads from "./components/RecentLeads";

const statIcons = [TrendingUp, LayoutDashboard, Users, Percent];

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState("30d");

  return (
    <div className="space-y-6">
      <DashboardHeader dateRange={dateRange} setDateRange={setDateRange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} icon={statIcons[i]} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart data={revenueData} />
        <CategoryChart data={categoryData} />
      </div>

      <RecentOrdersTable orders={recentOrders} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions />
        <RecentLeads />
      </div>
    </div>
  );
}
