"use client";

import { Shield } from "lucide-react";
import { permissionLabels } from "../../../data/mock";

export default function UserPermissionsDetail({ permissions, role }) {
  const displayPermissions = permissions.includes("all")
    ? Object.keys(permissionLabels).filter((p) => p !== "all")
    : permissions;

  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Permissions</h2>
      {permissions.includes("all") ? (
        <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">
              Full Access
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            This user has unrestricted access to all areas of the admin panel.
          </p>
        </div>
      ) : (
        <div>
          <div className="text-xs text-zinc-500 mb-3">
            Assigned via <span className="text-zinc-300">{role?.label}</span>{" "}
            role
          </div>
          <div className="grid grid-cols-2 gap-2">
            {displayPermissions.map((perm) => (
              <div
                key={perm}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-800/50 border border-zinc-800 text-sm text-zinc-300"
              >
                <Shield className="size-3.5 text-emerald-400" />
                {permissionLabels[perm]}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
