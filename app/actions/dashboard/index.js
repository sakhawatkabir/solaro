"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalRevenue,
    previousRevenue,
    totalOrders,
    previousOrders,
    totalCustomers,
    newCustomers,
    totalLeads,
    conversionRate,
  ] = await Promise.all([
    prisma.order.aggregate({
      where: {
        status: "DELIVERED",
        createdAt: { gte: thirtyDaysAgo },
      },
      _sum: { total: true },
    }),
    prisma.order.aggregate({
      where: {
        status: "DELIVERED",
        createdAt: {
          lt: thirtyDaysAgo,
          gte: new Date(thirtyDaysAgo.getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      },
      _sum: { total: true },
    }),
    prisma.order.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    }),
    prisma.order.count({
      where: {
        createdAt: {
          lt: thirtyDaysAgo,
          gte: new Date(thirtyDaysAgo.getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    }),
    prisma.customer.count(),
    prisma.customer.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    }),
    prisma.lead.count(),
    prisma.order.count({
      where: { status: "DELIVERED" },
    }),
  ]);

  const revenue = totalRevenue._sum.total || 0;
  const prevRevenue = previousRevenue._sum.total || 0;
  const revenueChange =
    prevRevenue > 0
      ? (((revenue - prevRevenue) / prevRevenue) * 100).toFixed(1)
      : "0.0";

  const ordersChange =
    totalOrders > 0 && previousOrders > 0
      ? (((totalOrders - previousOrders) / previousOrders) * 100).toFixed(1)
      : "0.0";

  const conversionRateValue =
    totalOrders > 0
      ? ((conversionRate / (totalOrders + totalLeads)) * 100).toFixed(1)
      : "0.0";

  return {
    revenue,
    revenueChange: parseFloat(revenueChange),
    totalOrders,
    ordersChange: parseFloat(ordersChange),
    totalCustomers,
    newCustomers,
    totalLeads,
    conversionRate: parseFloat(conversionRateValue),
  };
}

export async function getRevenueChartData() {
  const months = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
      23,
      59,
      59,
    );

    const result = await prisma.order.aggregate({
      where: {
        status: "DELIVERED",
        createdAt: { gte: startOfMonth, lte: endOfMonth },
      },
      _sum: { total: true },
      _count: true,
    });

    months.push({
      month: date.toLocaleString("en-US", { month: "short" }),
      revenue: result._sum.total || 0,
      orders: result._count,
    });
  }

  return months;
}

export async function getCategoryChartData() {
  const products = await prisma.product.findMany({
    select: {
      category: true,
      sales: true,
    },
  });

  const categoryTotals = {};
  let totalSales = 0;

  for (const product of products) {
    const cat = product.category;
    categoryTotals[cat] = (categoryTotals[cat] || 0) + product.sales;
    totalSales += product.sales;
  }

  const colors = {
    HOME_KIT: "#10b981",
    PANEL: "#34d399",
    BATTERY: "#6ee7b7",
    INVERTER: "#a7f3d0",
    ACCESSORY: "#d1fae5",
  };

  const labels = {
    HOME_KIT: "Home Kits",
    PANEL: "Panels",
    BATTERY: "Batteries",
    INVERTER: "Inverters",
    ACCESSORY: "Accessories",
  };

  return Object.entries(categoryTotals).map(([name, value]) => ({
    name: labels[name] || name,
    value: totalSales > 0 ? Math.round((value / totalSales) * 100) : 0,
    fill: colors[name] || "#10b981",
  }));
}

export async function getRecentOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
  });
}

export async function getRecentLeads() {
  return prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
}
