"use client";

import {
  Bell,
  Search,
  ChevronDown,
  Menu,
  User,
  Settings,
  LogOut,
  ArrowUpRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { logoutAction } from "@/app/actions/auth";

export default function Header({ onMenuClick }) {
  const { user } = useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const handleLogout = async () => {
    await logoutAction();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-30 flex items-center h-16 px-6 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-zinc-400 hover:text-white"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-300 placeholder:text-zinc-500 focus-visible:ring-emerald-500/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-zinc-400 hover:text-white"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 text-zinc-300 hover:text-white px-2 py-1.5 rounded-lg transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm font-medium">
                {user?.name || "User"}
              </span>
              <ChevronDown className="w-4 h-4 text-zinc-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-56 bg-zinc-900 text-zinc-100 border-zinc-800"
          >
            <div className="px-3 py-2 border-b border-zinc-800">
              <p className="text-sm font-medium text-white">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-zinc-400">{user?.email}</p>
              <p className="text-xs text-emerald-400 capitalize mt-0.5">
                {user?.role?.toLowerCase()?.replace("_", " ")}
              </p>
            </div>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/admin/profile" className="flex items-center w-full">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/admin/settings" className="flex items-center w-full">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/" className="flex items-center w-full">
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Back to Site
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              variant="destructive"
              className="cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
