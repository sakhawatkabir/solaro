"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCustomers(
  page = 1,
  limit = 20,
  search = "",
  status = "",
) {
  try {
    const where = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }
    if (status && status !== "all") {
      where.status = status;
    }

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.customer.count({ where }),
    ]);

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
    console.error("Get customers error:", error);
    throw new Error("Failed to fetch customers");
  }
}

export async function getCustomer(id) {
  try {
    const customer = await prisma.customer.findUnique({ where: { id } });
    return customer;
  } catch (error) {
    console.error("Get customer error:", error);
    return null;
  }
}

export async function createCustomer(data) {
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
    if (error.code === "P2002") {
      throw new Error("A customer with this email already exists");
    }
    throw new Error("Failed to update customer");
  }
}

export async function deleteCustomer(id) {
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
