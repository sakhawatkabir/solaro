import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const group = searchParams.get("group") || "";

    const where = group ? { group } : {};
    const settings = await prisma.setting.findMany({ where });

    const result = {};
    settings.forEach((s) => {
      if (s.type === "number") result[s.key] = parseFloat(s.value);
      else if (s.type === "boolean") result[s.key] = s.value === "true";
      else result[s.key] = s.value;
    });

    return NextResponse.json({ settings: result });
  } catch (error) {
    console.error("Settings error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const results = [];

    for (const [key, value] of Object.entries(body)) {
      const setting = await prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
      results.push(setting);
    }

    return NextResponse.json({ success: true, settings: results });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
