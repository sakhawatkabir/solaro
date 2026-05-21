import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId } = body;

    const where = userId ? { userId } : {};
    await prisma.notification.updateMany({
      where,
      data: { read: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Notifications Mark All Read]", error);
    return NextResponse.json({ error: "Failed to mark all as read" }, { status: 500 });
  }
}
