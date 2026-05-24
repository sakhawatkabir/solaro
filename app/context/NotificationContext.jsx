"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PusherClient from "pusher-js";

const NotificationContext = createContext();

let pusherInstance = null;

function getPusher() {
  if (!pusherInstance && process.env.NEXT_PUBLIC_PUSHER_KEY) {
    pusherInstance = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "ap2",
    });
  }
  return pusherInstance;
}

export function NotificationProvider({ children, userId }) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [localOverrides, setLocalOverrides] = useState([]);

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

  const localNotifications = useMemo(() => {
    const server = notificationData?.notifications || [];
    const overrideMap = new Map(localOverrides.map((n) => [n.id, n]));

    const merged = server.map((n) => overrideMap.get(n.id) || n);

    for (const n of localOverrides) {
      if (!merged.some((m) => m.id === n.id)) {
        merged.push(n);
      }
    }

    return merged;
  }, [notificationData, localOverrides]);

  useEffect(() => {
    const pusher = getPusher();
    if (!pusher) return;

    const channel = pusher.subscribe("notifications");

    const handler = (data) => {
      setLocalOverrides((prev) => {
        const exists = prev.some((n) => n.id === data.id);
        if (exists) return prev;
        return [data, ...prev];
      });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    };

    const onConnected = () => {
      channel.bind("new-notification", handler);
    };

    if (pusher.connection.state === "connected") {
      channel.bind("new-notification", handler);
    } else {
      pusher.connection.bind("connected", onConnected);
    }

    return () => {
      channel.unbind("new-notification", handler);
      pusher.connection.unbind("connected", onConnected);
      pusher.unsubscribe("notifications");
    };
  }, [userId, queryClient]);

  const markAsRead = useCallback(
    async (id) => {
      setLocalOverrides((prev) => {
        const exists = prev.some((n) => n.id === id);
        if (exists) {
          return prev.map((n) => (n.id === id ? { ...n, read: true } : n));
        }
        const serverItem = notificationData?.notifications?.find(
          (n) => n.id === id,
        );
        if (serverItem) {
          return [...prev, { ...serverItem, read: true }];
        }
        return prev;
      });

      try {
        await fetch(`/api/notifications/${id}`, {
          method: "PATCH",
          credentials: "include",
        });
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      } catch (e) {
        console.error("[Notification] Failed to mark as read:", e);
      }
    },
    [notificationData, queryClient],
  );

  const markAllAsRead = useCallback(async () => {
    setLocalOverrides((prev) => {
      const server = notificationData?.notifications || [];
      const alreadyOverridden = new Set(prev.map((n) => n.id));
      const unreadServerItems = [];
      for (const n of server) {
        if (!n.read && !alreadyOverridden.has(n.id)) {
          unreadServerItems.push({ ...n, read: true });
        }
      }
      return [...prev.map((n) => ({ ...n, read: true })), ...unreadServerItems];
    });

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
  }, [notificationData, userId, queryClient]);

  const unreadCount = localNotifications.filter((n) => !n.read).length;

  const contextValue = useMemo(
    () => ({
      notifications: localNotifications,
      unreadCount,
      isOpen,
      setIsOpen,
      markAsRead,
      markAllAsRead,
    }),
    [
      localNotifications,
      unreadCount,
      isOpen,
      markAsRead,
      markAllAsRead,
      setIsOpen,
    ],
  );

  return (
    <NotificationContext.Provider value={contextValue}>
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
