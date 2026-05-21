"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/app/actions/server-auth";

export async function getUserOrders() {
  const user = await requireAuth();

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
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

export async function getUserOrderStats() {
  const user = await requireAuth();

  const [count, revenue, deliveredCount] = await Promise.all([
    prisma.order.count({ where: { userId: user.id } }),
    prisma.order.aggregate({
      where: { userId: user.id },
      _sum: { total: true },
    }),
    prisma.order.count({
      where: { userId: user.id, status: "DELIVERED" },
    }),
  ]);

  return {
    totalOrders: count,
    totalSpent: revenue._sum.total || 0,
    delivered: deliveredCount,
  };
}
