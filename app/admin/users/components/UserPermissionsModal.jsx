"use client";

import { useState } from "react";
import { X, Shield, Check, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { permissionLabels } from "../../data/mock";

const allPermissions = [
  "orders",
  "products",
  "customers",
  "leads",
  "districts",
  "analytics",
  "users",
  "settings",
];

export default function UserPermissionsModal({ user, roles, onSave, onClose }) {
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [selectedPermissions, setSelectedPermissions] = useState(
    user.permissions.includes("all") ? allPermissions : [...user.permissions],
  );

  const isCustom = selectedRole === "custom";

  const handleRoleChange = (roleId) => {
    setSelectedRole(roleId);
    if (roleId === "super-admin") {
      setSelectedPermissions(["all"]);
    } else if (roleId === "manager") {
      setSelectedPermissions([
        "orders",
        "products",
        "customers",
        "leads",
        "analytics",
      ]);
    } else if (roleId === "editor") {
      setSelectedPermissions(["products", "leads"]);
    } else if (roleId === "support") {
      setSelectedPermissions(["orders", "customers", "leads", "districts"]);
    } else if (roleId === "viewer") {
      setSelectedPermissions(["analytics"]);
    }
  };

  const togglePermission = (perm) => {
    if (!isCustom) return;
    setSelectedPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm],
    );
  };

  const handleSave = () => {
    onSave({
      ...user,
      role: selectedRole,
      permissions:
        selectedRole === "super-admin" ? ["all"] : selectedPermissions,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-lg mx-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-emerald-400">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{user.name}</h3>
              <p className="text-sm text-zinc-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-3">
              Role
            </label>
            <div className="space-y-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleChange(role.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-xl border transition-colors text-left",
                    selectedRole === role.id
                      ? "border-emerald-500/50 bg-emerald-500/10"
                      : "border-zinc-800 bg-zinc-800/50 hover:bg-zinc-800",
                  )}
                >
                  <div>
                    <div className="text-sm font-medium text-zinc-200">
                      {role.label}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {role.description}
                    </div>
                  </div>
                  {selectedRole === role.id && (
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Permissions */}
          {isCustom && (
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                Permissions
              </label>
              <div className="grid grid-cols-2 gap-2">
                {allPermissions.map((perm) => (
                  <button
                    key={perm}
                    onClick={() => togglePermission(perm)}
                    className={cn(
                      "flex items-center gap-2 p-2.5 rounded-lg border text-sm transition-colors",
                      selectedPermissions.includes(perm)
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                        : "border-zinc-800 bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800",
                    )}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    {permissionLabels[perm]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Current Permissions Preview */}
          {!isCustom && selectedRole !== "super-admin" && (
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                Current Permissions
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedPermissions.map((perm) => (
                  <span
                    key={perm}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 text-xs text-zinc-300"
                  >
                    <Shield className="w-3 h-3" />
                    {permissionLabels[perm]}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
