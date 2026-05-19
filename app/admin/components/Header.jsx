"use client";

import { Bell, Search, ChevronDown } from "lucide-react";
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

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-6 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <Input
          placeholder="Search..."
          className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-300 placeholder:text-zinc-500 focus-visible:ring-emerald-500/50"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-4">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-zinc-400 hover:text-white"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-zinc-300 hover:text-white"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  SK
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm font-medium">
                Sakhawat
              </span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-zinc-900 border-zinc-800"
          >
            <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800 focus:text-white cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800 focus:text-white cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800 focus:text-white cursor-pointer">
              <Link href="/" className="w-full">
                Back to Site
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
