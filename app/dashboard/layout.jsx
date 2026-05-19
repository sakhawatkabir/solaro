"use client";

import { useState } from "react";
import { Menu, User, LogOut, Settings, ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import DashboardSidebar from "./components/DashboardSidebar";
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
            <Menu className="w-5 h-5" />
          </button>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-xs font-semibold text-accent">
                      RU
                    </span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-ink">
                    Rahim Uddin
                  </span>
                  <ChevronDown className="w-4 h-4 text-ink-light hidden sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white border-ink-faint text-ink"
              >
                <DropdownMenuLabel className="text-ink">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">Rahim Uddin</span>
                    <span className="text-xs text-ink-mid font-normal">
                      rahim@email.com
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-ink-faint" />
                <DropdownMenuItem
                  asChild
                  className="text-ink-mid hover:bg-emerald-500/10 hover:text-accent cursor-pointer focus:bg-emerald-500/10 focus:text-accent"
                >
                  <Link href="/dashboard/profile">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-ink-mid hover:bg-emerald-500/10 hover:text-accent cursor-pointer focus:bg-emerald-500/10 focus:text-accent"
                >
                  <Link href="/dashboard/settings">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-ink-faint" />
                <DropdownMenuItem className="text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer focus:bg-red-50 focus:text-red-700">
                  <LogOut className="w-4 h-4" />
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
