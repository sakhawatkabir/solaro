import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const perPage = parseInt(searchParams.get("perPage")) || 20;
    const type = searchParams.get("type") || "";
    const read = searchParams.get("read") || "";
    const search = searchParams.get("search") || "";

    const where = {};
    if (type && type !== "all") where.type = type;
    if (read === "true") where.read = true;
    if (read === "false") where.read = false;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ];
    }

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.notification.count({ where }),
    ]);

    const stats = await prisma.notification.groupBy({
      by: ["type"],
      _count: { _all: true },
    });

    const unreadCount = await prisma.notification.count({
      where: { read: false },
    });

    const typeStats = {};
    stats.forEach((s) => {
      typeStats[s.type] = s._count._all;
    });
    typeStats.unread = unreadCount;

    return NextResponse.json({
      notifications,
      total,
      stats: typeStats,
    });
  } catch (error) {
    console.error("[Admin Notifications GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    await prisma.notification.deleteMany({});
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Admin Notifications DELETE ALL]", error);
    return NextResponse.json(
      { error: "Failed to delete notifications" },
      { status: 500 },
    );
  }
}
