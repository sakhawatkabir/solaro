import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    await prisma.notification.updateMany({
      where: {},
      data: { read: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Admin Notifications Mark All Read]", error);
    return NextResponse.json(
      { error: "Failed to mark all as read" },
      { status: 500 },
    );
  }
}
