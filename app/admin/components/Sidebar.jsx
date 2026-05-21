"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  Users,
  MessageSquare,
  Star,
  MapPin,
  BarChart3,
  UserCog,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Sun,
  X,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/app/context/AuthContext";

const allNavItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    permission: null,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ClipboardList,
    permission: "orders",
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: ShoppingBag,
    permission: "products",
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: Users,
    permission: "customers",
  },
  {
    label: "Leads",
    href: "/admin/leads",
    icon: MessageSquare,
    permission: "leads",
  },
  {
    label: "Reviews",
    href: "/admin/reviews",
    icon: Star,
    permission: "products",
  },
  {
    label: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
    permission: null,
  },
  {
    label: "Districts",
    href: "/admin/districts",
    icon: MapPin,
    permission: "districts",
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    permission: "analytics",
  },
  { label: "Users", href: "/admin/users", icon: UserCog, permission: "users" },
  {
    label: "Profile",
    href: "/admin/profile",
    icon: User,
    permission: null,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    permission: "settings",
  },
];

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const userPermissions = user?.permissions || [];
  const navItems = allNavItems.filter(
    (item) => !item.permission || userPermissions.includes(item.permission),
  );

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-zinc-800">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500/10">
          <Sun className="w-5 h-5 text-emerald-400" />
        </div>
        {(!collapsed || mobileOpen) && (
          <span className="text-lg font-bold text-white tracking-tight">
            SOLARO
          </span>
        )}
        {/* Mobile close button */}
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto lg:hidden text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => mobileOpen && setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800",
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {(!collapsed || mobileOpen) && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle (desktop only) */}
      <div className="hidden lg:block p-3 border-t border-zinc-800">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen bg-zinc-950 border-r border-zinc-800 transition-transform duration-300 lg:hidden w-[260px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col h-screen bg-zinc-950 border-r border-zinc-800 transition-all duration-300 sticky top-0",
          collapsed ? "w-[68px]" : "w-[260px]",
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
