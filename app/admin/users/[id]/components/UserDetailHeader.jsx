"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UserDetailHeader({ userName }) {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/admin/users"
        className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
      >
        <ArrowLeft className="size-5" />
      </Link>
      <div>
        <h1 className="text-2xl font-semibold text-white">User Details</h1>
        <p className="text-sm text-zinc-400 mt-1">{userName}</p>
      </div>
    </div>
  );
}
