"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/app/context/AuthContext";

const allowedAdminRoles = [
  "SUPER_ADMIN",
  "MANAGER",
  "EDITOR",
  "SUPPORT",
  "CUSTOM",
];

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !allowedAdminRoles.includes(user.role))) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || !user || !allowedAdminRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900">
        <div className="size-8 border-3 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-zinc-900">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={() => setMobileOpen(true)} />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
}
