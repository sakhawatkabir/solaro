"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/app/actions/server-auth";

export async function getUserOrders(userId) {
  await requireAuth();
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
  await requireAuth();
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
