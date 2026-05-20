"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getOrders({
  page = 1,
  perPage = 10,
  search = "",
  status = "",
  paymentStatus = "",
} = {}) {
  const skip = (page - 1) * perPage;
  const where = {};

  if (search) {
    where.OR = [
      { orderNumber: { contains: search, mode: "insensitive" } },
      { customerName: { contains: search, mode: "insensitive" } },
      { customerEmail: { contains: search, mode: "insensitive" } },
    ];
  }

  if (status) {
    where.status = status;
  }

  if (paymentStatus) {
    where.paymentStatus = paymentStatus;
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: perPage,
    }),
    prisma.order.count({ where }),
  ]);

  return { orders, total, totalPages: Math.ceil(total / perPage) };
}

export async function getOrderById(id) {
  return prisma.order.findUnique({ where: { id } });
}

export async function createOrder(data) {
  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

  const subtotal = data.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const vat = Math.round(subtotal * ((data.vatRate || 0) / 100));
  const discount = data.discount || 0;
  const total = subtotal + vat - discount;

  const order = await prisma.order.create({
    data: {
      orderNumber,
      userId: data.userId || null,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone || null,
      district: data.district || null,
      items: data.items,
      subtotal,
      vat,
      discount,
      total,
      status: data.status || "PENDING",
      paymentMethod: data.paymentMethod || "COD",
      paymentStatus: data.paymentStatus || "UNPAID",
      shippingAddress: data.shippingAddress || null,
      notes: data.notes || null,
    },
  });

  revalidatePath("/admin/orders");
  return { success: true, order };
}

export async function updateOrder(id, data) {
  const order = await prisma.order.update({
    where: { id },
    data: {
      ...(data.status && { status: data.status }),
      ...(data.paymentStatus && { paymentStatus: data.paymentStatus }),
      ...(data.notes !== undefined && { notes: data.notes }),
      ...(data.shippingAddress !== undefined && {
        shippingAddress: data.shippingAddress,
      }),
    },
  });

  revalidatePath("/admin/orders");
  return { success: true, order };
}

export async function deleteOrder(id) {
  await prisma.order.delete({ where: { id } });
  revalidatePath("/admin/orders");
  return { success: true };
}

export async function getOrderStats() {
  const [totalOrders, totalRevenue, statusBreakdown, recentOrders] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({
        where: { status: { not: "CANCELLED" } },
        _sum: { total: true },
      }),
      prisma.order.groupBy({
        by: ["status"],
        _count: { _all: true },
      }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  return {
    totalOrders,
    totalRevenue: totalRevenue._sum.total || 0,
    statusBreakdown: statusBreakdown.map((s) => ({
      status: s.status,
      count: s._count._all,
    })),
    recentOrders,
  };
}
