"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  CheckCircle,
  AlertCircle,
  Shield,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function AdminProfilePage() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordFieldError, setPasswordFieldError] = useState("");
  const [confirmFieldError, setConfirmFieldError] = useState("");
  const [passwordFormError, setPasswordFormError] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveName = async () => {
    if (!name || name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }
    setError("");
    setSuccess("");
    setIsSaving(true);

    const result = await updateProfile({ name: name.trim() });

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(result.message || "Profile updated!");
      setEditing(false);
    }

    setIsSaving(false);
  };

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");
    setPasswordFieldError("");
    setConfirmFieldError("");
    setPasswordFormError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordFormError("All password fields are required.");
      return;
    }

    if (newPassword.length < 8) {
      setConfirmFieldError("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmFieldError("Passwords do not match.");
      return;
    }

    setIsSaving(true);

    const result = await updateProfile({
      password: currentPassword,
      newPassword,
    });

    if (result.error) {
      if (
        result.error.includes("incorrect") ||
        result.error.includes("current password")
      ) {
        setPasswordFieldError(result.error);
      } else {
        setError(result.error);
      }
    } else {
      setSuccess(result.message || "Password updated!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    setIsSaving(false);
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Profile</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Manage your account details and password
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
          <span className="text-red-400 text-sm">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" />
          <span className="text-emerald-400 text-sm">{success}</span>
        </div>
      )}

      {/* Profile Info */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
        <div className="flex items-center gap-4 p-6 border-b border-zinc-800">
          <div className="size-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <span className="text-xl font-semibold text-emerald-400">
              {initials}
            </span>
          </div>
          <div>
            <div className="text-lg font-semibold text-white">
              {user.name || "Unnamed User"}
            </div>
            <div className="text-sm text-zinc-400">{user.email}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-emerald-400 capitalize bg-emerald-500/10 px-2 py-0.5 rounded-full">
                {user.role?.toLowerCase()?.replace("_", " ")}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  user.status === "ACTIVE"
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-red-400 bg-red-500/10"
                }`}
              >
                {user.status?.toLowerCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label
              htmlFor="admin-profile-name"
              className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5"
            >
              Full Name
            </label>
            {editing ? (
              <input
                id="admin-profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
                autoFocus
              />
            ) : (
              <div className="flex items-center gap-2 text-sm text-white">
                <User className="size-4 text-zinc-500" />
                {user.name || "Not set"}
              </div>
            )}
          </div>

          <div>
            <label
              id="admin-profile-email-label"
              className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5"
            >
              Email
            </label>
            <div
              className="flex items-center gap-2 text-sm text-white"
              aria-labelledby="admin-profile-email-label"
            >
              <Mail className="size-4 text-zinc-500" />
              {user.email}
            </div>
          </div>

          <div>
            <label
              id="admin-profile-permissions-label"
              className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5"
            >
              Permissions
            </label>
            <div
              className="flex items-center gap-2 text-sm text-white"
              aria-labelledby="admin-profile-permissions-label"
            >
              <Shield className="size-4 text-zinc-500" />
              {user.permissions?.length > 0
                ? user.permissions.map((p) => p.replace(/_/g, " ")).join(", ")
                : "No permissions"}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            {editing ? (
              <>
                <button
                  onClick={() => {
                    setEditing(false);
                    setName(user.name || "");
                  }}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveName}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  {isSaving ? (
                    <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="size-3.5" />
                      Save
                    </>
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setEditing(true);
                  setName(user.name || "");
                }}
                className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                Edit Name
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Lock className="size-5 text-zinc-400" />
          Change Password
        </h3>

        {passwordFormError && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2">
            <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
            <span className="text-red-400 text-sm">{passwordFormError}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="admin-current-password"
              className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                id="admin-current-password"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setPasswordFieldError("");
                }}
                className={`w-full px-4 py-2.5 pr-10 rounded-xl bg-zinc-800 border text-white placeholder:text-zinc-500 focus:outline-none text-sm ${
                  passwordFieldError
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-zinc-700 focus:border-emerald-500/50"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showCurrent ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {passwordFieldError && (
              <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                <AlertCircle className="size-3" />
                {passwordFieldError}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5"
              htmlFor="admin-new-password"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="admin-new-password"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showNew ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label
              className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5"
              htmlFor="admin-confirm-password"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="admin-confirm-password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmFieldError("");
                }}
                className={`w-full px-4 py-2.5 pr-10 rounded-xl bg-zinc-800 border text-white placeholder:text-zinc-500 focus:outline-none text-sm ${
                  confirmFieldError
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-zinc-700 focus:border-emerald-500/50"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showConfirm ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {confirmFieldError && (
              <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                <AlertCircle className="size-3" />
                {confirmFieldError}
              </p>
            )}
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={handleChangePassword}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors"
            >
              {isSaving ? (
                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="size-3.5" />
                  Update Password
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
