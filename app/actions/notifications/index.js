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
