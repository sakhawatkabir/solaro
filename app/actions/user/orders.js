"use server";

import { prisma } from "@/lib/prisma";

export async function getUserOrders(userId) {
  if (!userId) return { orders: [], stats: {} };

  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const delivered = orders.filter((o) => o.status === "DELIVERED").length;

  return {
    orders,
    stats: { totalOrders, totalSpent, delivered },
  };
}

export async function getUserOrderStats(userId) {
  if (!userId) return { totalOrders: 0, totalSpent: 0, delivered: 0 };

  const [count, revenue, deliveredCount] = await Promise.all([
    prisma.order.count({ where: { userId } }),
    prisma.order.aggregate({
      where: { userId },
      _sum: { total: true },
    }),
    prisma.order.count({
      where: { userId, status: "DELIVERED" },
    }),
  ]);

  return {
    totalOrders: count,
    totalSpent: revenue._sum.total || 0,
    delivered: deliveredCount,
  };
}
