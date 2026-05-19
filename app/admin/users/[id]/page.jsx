"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminUsers, roles } from "../../data/mock";
import UserDetailHeader from "./components/UserDetailHeader";
import UserProfileCard from "./components/UserProfileCard";
import UserPermissionsDetail from "./components/UserPermissionsDetail";
import UserActivityCard from "./components/UserActivityCard";
import UserDangerZone from "./components/UserDangerZone";

export default function UserDetailPage({ params }) {
  const router = useRouter();
  const user = adminUsers.find((u) => u.id === params?.id);

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-zinc-400">User not found</p>
      </div>
    );
  }

  const matchedRole = roles.find((r) => r.id === user.role);

  return (
    <div className="space-y-6">
      <UserDetailHeader userName={user.name} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <UserProfileCard user={user} role={matchedRole} />
          <UserPermissionsDetail
            permissions={user.permissions}
            role={matchedRole}
          />
        </div>

        <div className="space-y-6">
          <UserActivityCard lastLogin={user.lastLogin} status={user.status} />
          <UserDangerZone userId={user.id} userName={user.name} />
        </div>
      </div>
    </div>
  );
}
