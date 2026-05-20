"use client";

import { Users, UserPlus } from "lucide-react";
import Link from "next/link";

export default function UsersHeader({ totalUsers }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <Users className="w-6 h-6 text-emerald-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-sm text-zinc-400">
            {totalUsers} total user{totalUsers !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
      <Link
        href="/admin/users/new"
        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors"
      >
        <UserPlus className="w-4 h-4" />
        Add User
      </Link>
    </div>
  );
}
