"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AdminShellSkeleton from "./components/AdminShellSkeleton";
import ContentFallback from "./components/ContentFallback";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/app/context/AuthContext";

const allowedAdminRoles = [
  "SUPER_ADMIN",
  "MANAGER",
  "EDITOR",
  "SUPPORT",
  "VIEWER",
  "CUSTOM",
];

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading } = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    document.body.style.backgroundColor = "#18181b";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    if (!loading && (!user || !allowedAdminRoles.includes(user.role))) {
      replace("/dashboard");
    }
  }, [user, loading, replace]);

  const handleMenuClick = useCallback(() => setMobileOpen(true), []);

  if (loading) {
    return <AdminShellSkeleton />;
  }

  if (!user || !allowedAdminRoles.includes(user.role)) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-zinc-900">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="flex-1 flex flex-col">
          <Header onMenuClick={handleMenuClick} />
          <main className="flex-1 overflow-y-auto p-6">
            <Suspense fallback={<ContentFallback />}>
              <div className="animate-fadeIn">{children}</div>
            </Suspense>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
