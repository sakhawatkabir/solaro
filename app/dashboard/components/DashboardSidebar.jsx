"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  X,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/app/context/AuthContext";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleSignOut = async () => {
    await logout();
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-3 px-4 h-14 border-b border-ink-faint">
        <div className="flex items-center justify-center size-8 rounded-lg bg-accent/10">
          <Sun className="size-4 text-accent" />
        </div>
        {(!collapsed || mobileOpen) && (
          <span className="text-base font-bold text-ink font-heading">
            SOLARO
          </span>
        )}
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto lg:hidden text-ink-light hover:text-ink"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => mobileOpen && setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-ink-light hover:text-ink hover:bg-cream",
              )}
            >
              <item.icon className="size-4 flex-shrink-0" />
              {(!collapsed || mobileOpen) && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t border-ink-faint space-y-0.5">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-ink-light hover:text-ink hover:bg-cream transition-colors w-full"
        >
          <ArrowLeft className="size-4 flex-shrink-0" />
          {(!collapsed || mobileOpen) && <span>Back to Site</span>}
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-ink-light hover:text-red-600 hover:bg-red-50 transition-colors w-full"
        >
          <LogOut className="size-4 flex-shrink-0" />
          {(!collapsed || mobileOpen) && <span>Sign Out</span>}
        </button>
        <div className="hidden lg:block">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full py-2 rounded-lg text-ink-light hover:text-ink hover:bg-cream transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="size-4" />
            ) : (
              <ChevronLeft className="size-4" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
