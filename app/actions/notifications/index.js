"use server";

import { prisma } from "@/lib/prisma";
import { pusher } from "@/lib/pusher";

export async function createNotification(data) {
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
  const where = userId ? { userId, read: false } : { read: false };
  return prisma.notification.count({ where });
}

export async function getNotifications(userId, limit = 20) {
  const where = userId ? { userId } : {};
  return prisma.notification.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function markNotificationRead(id) {
  return prisma.notification.update({
    where: { id },
    data: { read: true },
  });
}

export async function markAllNotificationsRead(userId) {
  const where = userId ? { userId } : {};
  return prisma.notification.updateMany({
    where,
    data: { read: true },
  });
}
