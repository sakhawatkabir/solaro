"use server";

import { prisma } from "@/lib/prisma";
import { pusher } from "@/lib/pusher";
import { requireAdmin, requireAuth } from "@/app/actions/server-auth";

export async function createNotification(data) {
  await requireAdmin();
  return createNotificationInternal(data);
}

export async function createNotificationInternal(data) {
  const notification = await prisma.notification.create({
    data: {
      type: data.type,
      title: data.title,
      message: data.message,
      link: data.link || null,
      userId: data.userId || null,
      read: false,
    },
  });

  try {
    await pusher.trigger("notifications", "new-notification", {
      id: notification.id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      link: notification.link,
      read: false,
      createdAt: notification.createdAt,
    });
  } catch (pusherError) {
    console.error("[Notification] Pusher error:", pusherError.message);
  }

  return notification;
}

export async function getUnreadCount(userId) {
  const user = await requireAuth();
  const where = { userId: userId || user.id, read: false };
  return prisma.notification.count({ where });
}

export async function getNotifications(userId, limit = 20) {
  const user = await requireAuth();
  const where = { userId: userId || user.id };
  return prisma.notification.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function markNotificationRead(id) {
  await requireAuth();
  return prisma.notification.update({
    where: { id },
    data: { read: true },
  });
}

export async function markAllNotificationsRead(userId) {
  const user = await requireAuth();
  const where = { userId: userId || user.id };
  return prisma.notification.updateMany({
    where,
    data: { read: true },
  });
}

export async function getAdminNotifications({
  page = 1,
  perPage = 20,
  type = "",
  read = "",
  search = "",
}) {
  await requireAdmin();

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

  const [notifications, total, stats, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.notification.count({ where }),
    prisma.notification.groupBy({
      by: ["type"],
      _count: { _all: true },
    }),
    prisma.notification.count({ where: { read: false } }),
  ]);

  const typeStats = {};
  stats.forEach((s) => {
    typeStats[s.type] = s._count._all;
  });
  typeStats.unread = unreadCount;

  return {
    notifications,
    total,
    stats: typeStats,
  };
}

export async function updateNotificationRead(id) {
  await requireAdmin();
  return prisma.notification.update({
    where: { id },
    data: { read: true },
  });
}

export async function deleteNotification(id) {
  await requireAdmin();
  await prisma.notification.delete({ where: { id } });
  return { success: true };
}

export async function deleteAllNotifications() {
  await requireAdmin();
  await prisma.notification.deleteMany({});
  return { success: true };
}

export async function markAllNotificationsReadAdmin() {
  await requireAdmin();
  await prisma.notification.updateMany({
    where: {},
    data: { read: true },
  });
  return { success: true };
}
