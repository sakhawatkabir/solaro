"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin, requireAuth } from "@/app/actions/server-auth";

export async function getActiveDistricts(limit = 100) {
  try {
    const districts = await prisma.district.findMany({
      where: { coverage: true },
      orderBy: { name: "asc" },
      take: limit,
    });

    return districts;
  } catch (error) {
    return [];
  }
}

export async function getDistricts(
  page = 1,
  limit = 20,
  search = "",
  division = "",
  coverage = "",
) {
  await requireAdmin();
  try {
    const where = {};

    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }
    if (division && division !== "all") {
      where.division = division;
    }
    if (coverage === "covered") {
      where.coverage = true;
    } else if (coverage === "uncovered") {
      where.coverage = false;
    }

    const [districts, total] = await Promise.all([
      prisma.district.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: "asc" },
      }),
      prisma.district.count({ where }),
    ]);

    return {
      districts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Get districts error:", error);
    throw new Error("Failed to fetch districts");
  }
}

export async function getDistrict(id) {
  await requireAdmin();
  try {
    const district = await prisma.district.findUnique({ where: { id } });
    return district;
  } catch (error) {
    console.error("Get district error:", error);
    return null;
  }
}

export async function createDistrict(data) {
  await requireAdmin();
  try {
    const {
      name,
      division,
      solarPotential,
      coverage,
      population,
      avgSunHours,
    } = data;

    if (!name || !division) {
      throw new Error("Name and division are required");
    }

    const district = await prisma.district.create({
      data: {
        name,
        division,
        solarPotential: solarPotential || "MEDIUM",
        coverage: coverage || false,
        population: population ? parseInt(population) : null,
        avgSunHours: avgSunHours ? parseFloat(avgSunHours) : null,
      },
    });

    revalidatePath("/admin/districts");
    return { success: true, district };
  } catch (error) {
    console.error("Create district error:", error);
    if (error.code === "P2002") {
      throw new Error("A district with this name already exists");
    }
    throw new Error("Failed to create district");
  }
}

export async function updateDistrict(id, data) {
  await requireAdmin();
  try {
    const existing = await prisma.district.findUnique({ where: { id } });
    if (!existing) throw new Error("District not found");

    const updateData = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.division !== undefined) updateData.division = data.division;
    if (data.solarPotential !== undefined)
      updateData.solarPotential = data.solarPotential;
    if (data.coverage !== undefined) updateData.coverage = data.coverage;
    if (data.population !== undefined)
      updateData.population = data.population
        ? parseInt(data.population)
        : null;
    if (data.avgSunHours !== undefined)
      updateData.avgSunHours = data.avgSunHours
        ? parseFloat(data.avgSunHours)
        : null;

    const district = await prisma.district.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/districts");
    revalidatePath(`/admin/districts/${id}`);
    return { success: true, district };
  } catch (error) {
    console.error("Update district error:", error);
    if (error.code === "P2002") {
      throw new Error("A district with this name already exists");
    }
    throw new Error("Failed to update district");
  }
}

export async function deleteDistrict(id) {
  await requireAdmin();
  try {
    const existing = await prisma.district.findUnique({ where: { id } });
    if (!existing) throw new Error("District not found");

    await prisma.district.delete({ where: { id } });

    revalidatePath("/admin/districts");
    return { success: true };
  } catch (error) {
    console.error("Delete district error:", error);
    throw new Error("Failed to delete district");
  }
}
