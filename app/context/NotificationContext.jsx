"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PusherClient from "pusher-js";

const NotificationContext = createContext();

let pusherInstance = null;
let pusherRefCount = 0;

export function NotificationProvider({ children, userId }) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState([]);

  const { data: notificationData } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await fetch(`/api/notifications?userId=${userId || ""}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch notifications");
      return res.json();
    },
    enabled: !!userId,
  });

  useEffect(() => {
    if (notificationData?.notifications) {
      setLocalNotifications(notificationData.notifications);
    }
  }, [notificationData]);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_PUSHER_KEY) {
      return;
    }

    let channel;
    let cancelled = false;

    if (!pusherInstance) {
      pusherInstance = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "ap2",
      });
    }
    pusherRefCount++;

    const bindChannel = () => {
      if (cancelled) return;
      channel = pusherInstance.subscribe("notifications");
      channel.bind("new-notification", (data) => {
        if (cancelled) return;
        setLocalNotifications((prev) => {
          const exists = prev.some((n) => n.id === data.id);
          if (exists) return prev;
          return [data, ...prev];
        });
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      });
    };

    if (pusherInstance.connection.state === "connected") {
      bindChannel();
    } else {
      pusherInstance.connection.bind("connected", bindChannel);
    }

    return () => {
      cancelled = true;
      if (channel) {
        channel.unbind_all();
        channel.unsubscribe();
      }
      pusherRefCount--;
      if (pusherRefCount <= 0 && pusherInstance) {
        pusherInstance.disconnect();
        pusherInstance = null;
        pusherRefCount = 0;
      }
    };
  }, [userId, queryClient]);

  const markAsRead = async (id) => {
    setLocalNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

    try {
      await fetch(`/api/notifications/${id}`, {
        method: "PATCH",
        credentials: "include",
      });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    } catch (e) {
      console.error("[Notification] Failed to mark as read:", e);
    }
  };

  const markAllAsRead = async () => {
    setLocalNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

    try {
      await fetch("/api/notifications/mark-all-read", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    } catch (e) {
      console.error("[Notification] Failed to mark all as read:", e);
    }
  };

  const unreadCount = localNotifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications: localNotifications,
        unreadCount,
        isOpen,
        setIsOpen,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationProvider",
    );
  }
  return context;
}
