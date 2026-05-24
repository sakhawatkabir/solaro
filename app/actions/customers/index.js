"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/app/actions/server-auth";

export async function getCustomers(
  page = 1,
  limit = 20,
  search = "",
  status = "",
) {
  await requireAdmin();
  try {
    const where = {
      role: "VIEWER",
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }
    if (status && status !== "all") {
      where.status = status;
    }

    const [viewerUsers, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          status: true,
          role: true,
          lastLogin: true,
          createdAt: true,
          _count: { select: { orders: true } },
        },
      }),
      prisma.user.count({ where }),
    ]);

    const userIds = viewerUsers.map((u) => u.id);
    const orderAggs =
      userIds.length > 0
        ? await prisma.order.groupBy({
            by: ["userId"],
            where: { userId: { in: userIds } },
            _sum: { total: true },
          })
        : [];
    const spentMap = {};
    orderAggs.forEach((agg) => {
      if (agg.userId) spentMap[agg.userId] = agg._sum.total || 0;
    });

    const customers = viewerUsers.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      status: u.status,
      role: u.role,
      totalOrders: u._count.orders,
      totalSpent: spentMap[u.id] || 0,
    }));

    return {
      customers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Get viewer users error:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function getCustomer(id) {
  await requireAdmin();
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        role: true,
        lastLogin: true,
        createdAt: true,
        _count: { select: { orders: true } },
      },
    });
    if (!user) return null;

    const orderAgg = await prisma.order.groupBy({
      by: ["userId"],
      where: { userId: id },
      _sum: { total: true },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      role: user.role,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      totalOrders: user._count.orders,
      totalSpent: orderAgg[0]?._sum.total || 0,
    };
  } catch (error) {
    console.error("Get customer error:", error);
    return null;
  }
}

export async function getCustomerOrders(id) {
  await requireAdmin();
  try {
    const orders = await prisma.order.findMany({
      where: { userId: id },
      orderBy: { createdAt: "desc" },
    });
    return orders;
  } catch (error) {
    console.error("Get customer orders error:", error);
    return [];
  }
}

export async function updateCustomerStatus(id, status) {
  await requireAdmin();
  try {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) throw new Error("Customer not found");

    const user = await prisma.user.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        role: true,
      },
    });

    revalidatePath("/admin/customers");
    revalidatePath(`/admin/customers/${id}`);
    return { success: true, user };
  } catch (error) {
    console.error("Update customer status error:", error);
    throw new Error("Failed to update status");
  }
}

export async function deleteCustomerUser(id) {
  await requireAdmin();
  try {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) throw new Error("Customer not found");

    await prisma.user.delete({ where: { id } });

    revalidatePath("/admin/customers");
    return { success: true };
  } catch (error) {
    console.error("Delete customer user error:", error);
    throw new Error("Failed to delete customer");
  }
}

export async function createCustomer(data) {
  await requireAdmin();
  try {
    const { name, email, phone, address, city, district, postalCode, notes } =
      data;

    if (!name || !email) {
      throw new Error("Name and email are required");
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone: phone || null,
        address: address || null,
        city: city || null,
        district: district || null,
        postalCode: postalCode || null,
        notes: notes || null,
      },
    });

    revalidatePath("/admin/customers");
    return { success: true, customer };
  } catch (error) {
    console.error("Create customer error:", error);
    if (error.code === "P2002") {
      throw new Error("A customer with this email already exists");
    }
    throw new Error("Failed to create customer");
  }
}

export async function updateCustomer(id, data) {
  await requireAdmin();
  try {
    const existing = await prisma.customer.findUnique({ where: { id } });
    if (!existing) throw new Error("Customer not found");

    const updateData = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.city !== undefined) updateData.city = data.city;
    if (data.district !== undefined) updateData.district = data.district;
    if (data.postalCode !== undefined) updateData.postalCode = data.postalCode;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.notes !== undefined) updateData.notes = data.notes;

    const customer = await prisma.customer.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/customers");
    revalidatePath(`/admin/customers/${id}`);
    return { success: true, customer };
  } catch (error) {
    console.error("Update customer error:", error);
    throw new Error("Failed to update customer");
  }
}

export async function deleteCustomer(id) {
  await requireAdmin();
  try {
    const existing = await prisma.customer.findUnique({ where: { id } });
    if (!existing) throw new Error("Customer not found");

    await prisma.customer.delete({ where: { id } });

    revalidatePath("/admin/customers");
    return { success: true };
  } catch (error) {
    console.error("Delete customer error:", error);
    throw new Error("Failed to delete customer");
  }
}
