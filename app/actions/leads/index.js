"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createNotification } from "@/app/actions/notifications";

export async function getLeads(
  page = 1,
  limit = 20,
  search = "",
  status = "",
  source = "",
  priority = "",
) {
  try {
    const where = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ];
    }
    if (status && status !== "all") {
      where.status = status;
    }
    if (source && source !== "all") {
      where.source = source;
    }
    if (priority && priority !== "all") {
      where.priority = priority;
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.lead.count({ where }),
    ]);

    return {
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Get leads error:", error);
    throw new Error("Failed to fetch leads");
  }
}

export async function getLead(id) {
  try {
    const lead = await prisma.lead.findUnique({ where: { id } });
    return lead;
  } catch (error) {
    console.error("Get lead error:", error);
    return null;
  }
}

export async function createLead(data) {
  try {
    const {
      name,
      email,
      phone,
      company,
      message,
      source,
      priority,
      estimatedValue,
      notes,
    } = data;

    if (!name || !email || !phone) {
      throw new Error("Name, email, and phone are required");
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        company: company || null,
        message: message || null,
        source: source || "WEBSITE",
        priority: priority || "MEDIUM",
        estimatedValue: estimatedValue ? parseInt(estimatedValue) : null,
        notes: notes || null,
      },
    });

    revalidatePath("/admin/leads");
    return { success: true, lead };
  } catch (error) {
    console.error("Create lead error:", error);
    throw new Error("Failed to create lead");
  }
}

export async function updateLead(id, data) {
  try {
    const existing = await prisma.lead.findUnique({ where: { id } });
    if (!existing) throw new Error("Lead not found");

    const updateData = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.company !== undefined) updateData.company = data.company;
    if (data.message !== undefined) updateData.message = data.message;
    if (data.source !== undefined) updateData.source = data.source;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.priority !== undefined) updateData.priority = data.priority;
    if (data.assignedTo !== undefined) updateData.assignedTo = data.assignedTo;
    if (data.estimatedValue !== undefined)
      updateData.estimatedValue = data.estimatedValue
        ? parseInt(data.estimatedValue)
        : null;
    if (data.notes !== undefined) updateData.notes = data.notes;

    const lead = await prisma.lead.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/leads");
    revalidatePath(`/admin/leads/${id}`);
    return { success: true, lead };
  } catch (error) {
    console.error("Update lead error:", error);
    throw new Error("Failed to update lead");
  }
}

export async function deleteLead(id) {
  try {
    const existing = await prisma.lead.findUnique({ where: { id } });
    if (!existing) throw new Error("Lead not found");

    await prisma.lead.delete({ where: { id } });

    revalidatePath("/admin/leads");
    return { success: true };
  } catch (error) {
    console.error("Delete lead error:", error);
    throw new Error("Failed to delete lead");
  }
}

export async function submitContactLead(data) {
  try {
    const { firstName, lastName, email, phone, service, message, district } =
      data;

    if (!firstName || !email || !phone || !service || !message?.trim()) {
      return {
        success: false,
        error: "Please fill in your name, contact details, and a message.",
      };
    }

    const lead = await prisma.lead.create({
      data: {
        name: `${firstName} ${lastName || ""}`.trim(),
        email,
        phone,
        message: message || null,
        source: "WEBSITE",
        priority: "MEDIUM",
        notes: `Service: ${service}\nDistrict: ${district || "N/A"}`,
      },
    });

    await createNotification({
      type: "LEAD",
      title: `New Contact Lead`,
      message: `${firstName} ${lastName || ""} submitted a contact form inquiry`,
      link: `/admin/leads`,
    });

    return { success: true, lead };
  } catch (error) {
    console.error("Submit contact lead error:", error);
    return {
      success: false,
      error: "Failed to submit your message. Please try again.",
    };
  }
}
