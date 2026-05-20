"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const defaultSettings = [
  { key: "siteName", value: "Solaro", type: "string", group: "general" },
  {
    key: "siteTagline",
    value: "Solar Energy Management",
    type: "string",
    group: "general",
  },
  {
    key: "contactEmail",
    value: "info@solaro.com",
    type: "string",
    group: "contact",
  },
  {
    key: "contactPhone",
    value: "+880 1700-000000",
    type: "string",
    group: "contact",
  },
  {
    key: "contactAddress",
    value: "Dhaka, Bangladesh",
    type: "string",
    group: "contact",
  },
  { key: "currency", value: "BDT", type: "string", group: "business" },
  { key: "currencySymbol", value: "৳", type: "string", group: "business" },
  { key: "vatRate", value: "0", type: "number", group: "business" },
];

export async function getSettings(group = "") {
  try {
    const where = group ? { group } : {};
    const settings = await prisma.setting.findMany({ where });

    const result = {};
    settings.forEach((s) => {
      if (s.type === "number") result[s.key] = parseFloat(s.value);
      else if (s.type === "boolean") result[s.key] = s.value === "true";
      else result[s.key] = s.value;
    });

    return result;
  } catch (error) {
    console.error("Get settings error:", error);
    throw new Error("Failed to fetch settings");
  }
}

export async function updateSetting(key, value) {
  try {
    const setting = await prisma.setting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    });

    revalidatePath("/admin/settings");
    return { success: true, setting };
  } catch (error) {
    console.error("Update setting error:", error);
    throw new Error("Failed to update setting");
  }
}

export async function updateSettings(updates) {
  try {
    const results = [];

    for (const [key, value] of Object.entries(updates)) {
      const setting = await prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
      results.push(setting);
    }

    revalidatePath("/admin/settings");
    return { success: true, settings: results };
  } catch (error) {
    console.error("Update settings error:", error);
    throw new Error("Failed to update settings");
  }
}

export async function resetSettings() {
  try {
    await prisma.setting.deleteMany();

    for (const setting of defaultSettings) {
      await prisma.setting.create({ data: setting });
    }

    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Reset settings error:", error);
    throw new Error("Failed to reset settings");
  }
}
