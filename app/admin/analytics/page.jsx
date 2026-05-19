"use client";

import { useState } from "react";
import {
  revenueData,
  categoryData,
  districts,
  products,
} from "../data/mock";
import AnalyticsHeader from "./components/AnalyticsHeader";
import RevenueChart from "../components/RevenueChart";
import CategoryChart from "../components/CategoryChart";
import OrdersChart from "./components/OrdersChart";
import DistrictRanking from "./components/DistrictRanking";
import ConversionMetrics from "./components/ConversionMetrics";
import TopProducts from "./components/TopProducts";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6m");

  const totalRevenue = revenueData.reduce((sum, m) => sum + m.revenue, 0);
  const totalOrders = revenueData.reduce((sum, m) => sum + m.orders, 0);
  const avgOrderValue =
    totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const sortedDistricts = [...districts]
    .filter((d) => d.orders > 0)
    .sort((a, b) => b.revenue - a.revenue);

  const topProducts = [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <AnalyticsHeader
        totalRevenue={totalRevenue}
        totalOrders={totalOrders}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
      />

      <ConversionMetrics
        totalRevenue={totalRevenue}
        totalOrders={totalOrders}
        avgOrderValue={avgOrderValue}
        revenueData={revenueData}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart data={revenueData} />
        <CategoryChart data={categoryData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrdersChart data={revenueData} />
        <DistrictRanking districts={sortedDistricts} />
      </div>

      <TopProducts products={topProducts} />
    </div>
  );
}
