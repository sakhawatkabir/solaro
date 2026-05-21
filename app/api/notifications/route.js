import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function getUserFromSession() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken")?.value;
    if (!sessionToken) return null;

    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    });

    if (!session || new Date() > session.expires) {
      return null;
    }

    return session.user;
  } catch {
    return null;
  }
}

export async function GET(req) {
  try {
    const user = await getUserFromSession();
    const { searchParams } = new URL(req.url);
    const userIdParam = searchParams.get("userId");

    const userId = user?.id || userIdParam;

    const where = userId ? { userId } : {};
    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ notifications });
  } catch (error) {
    console.error("[Notifications GET]", error);
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { type, title, message, link, userId } = body;

    const notification = await prisma.notification.create({
      data: {
        type,
        title,
        message,
        link: link || null,
        userId: userId || null,
        read: false,
      },
    });

    return NextResponse.json({ notification });
  } catch (error) {
    console.error("[Notifications POST]", error);
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 });
  }
}
