"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, User, LogOut, Settings, ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import DashboardSidebar from "./components/DashboardSidebar";
import { useAuth } from "@/app/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      replace("/login");
    }
  }, [loading, user, replace]);

  const handleSignOut = async () => {
    await logout();
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="size-8 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen bg-white border-r border-ink-faint transition-transform duration-300 lg:hidden w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <DashboardSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      </aside>

      <aside
        className={cn(
          "hidden lg:flex flex-col h-screen bg-white border-r border-ink-faint transition-all duration-300 sticky top-0",
          collapsed ? "w-16" : "w-60",
        )}
      >
        <DashboardSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-14 border-b border-ink-faint bg-white flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-ink-light hover:text-ink"
          >
            <Menu className="size-5" />
          </button>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors">
                  <div className="size-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-xs font-semibold text-accent">
                      {initials}
                    </span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-ink">
                    {user?.name || "User"}
                  </span>
                  <ChevronDown className="size-4 text-ink-light hidden sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white border-ink-faint text-ink"
              >
                <DropdownMenuLabel className="text-ink">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{user?.name || "User"}</span>
                    <span className="text-xs text-ink-mid font-normal">
                      {user?.email}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-ink-faint" />
                <DropdownMenuItem
                  asChild
                  className="text-ink-mid hover:bg-emerald-500/10 hover:text-accent cursor-pointer focus:bg-emerald-500/10 focus:text-accent"
                >
                  <Link href="/dashboard/profile">
                    <User className="size-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-ink-mid hover:bg-emerald-500/10 hover:text-accent cursor-pointer focus:bg-emerald-500/10 focus:text-accent"
                >
                  <Link href="/dashboard/settings">
                    <Settings className="size-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-ink-faint" />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer focus:bg-red-50 focus:text-red-700"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
