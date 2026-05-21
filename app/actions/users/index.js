"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { sendActivationEmail } from "@/app/actions/auth/activation";
import { requireAdmin } from "@/app/actions/server-auth";

export async function getUsers(
  page = 1,
  limit = 20,
  search = "",
  role = "",
  status = "",
) {
  await requireAdmin();
  try {
    const where = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }
    if (role && role !== "all") {
      where.role = role;
    }
    if (status && status !== "all") {
      where.status = status;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          status: true,
          permissions: true,
          lastLogin: true,
          createdAt: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Get users error:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function getUser(id) {
  await requireAdmin();
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        status: true,
        permissions: true,
        lastLogin: true,
        createdAt: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
}

export async function createUser(data) {
  await requireAdmin();
  try {
    const { name, email, role, status, permissions } = data;

    if (!email) {
      throw new Error("Email is required");
    }

    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        role: role || "VIEWER",
        status: status || "ACTIVE",
        permissions: permissions || ["analytics"],
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        permissions: true,
        createdAt: true,
      },
    });

    await sendActivationEmail(user.id);

    revalidatePath("/admin/users");
    return { success: true, user };
  } catch (error) {
    console.error("Create user error:", error);
    if (error.code === "P2002") {
      throw new Error("A user with this email already exists");
    }
    throw new Error("Failed to create user");
  }
}

export async function updateUser(id, data) {
  await requireAdmin();
  try {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) throw new Error("User not found");

    const updateData = {};

    if (data.role !== undefined) updateData.role = data.role;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.permissions !== undefined)
      updateData.permissions = data.permissions;

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        permissions: true,
        updatedAt: true,
      },
    });

    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${id}`);
    return { success: true, user };
  } catch (error) {
    console.error("Update user error:", error);
    throw new Error("Failed to update user");
  }
}

export async function deleteUser(id) {
  await requireAdmin();
  try {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) throw new Error("User not found");

    await prisma.user.delete({ where: { id } });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Delete user error:", error);
    throw new Error("Failed to delete user");
  }
}
