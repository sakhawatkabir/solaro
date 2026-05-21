"use client";

import { useAuth } from "@/app/context/AuthContext";
import { NotificationProvider } from "@/app/context/NotificationContext";

export default function NotificationWrapper({ children }) {
  const { user } = useAuth();
  return (
    <NotificationProvider userId={user?.id || null}>
      {children}
    </NotificationProvider>
  );
}
