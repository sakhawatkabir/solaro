"use client";

import { useState } from "react";
import {
  Bell,
  Lock,
  Shield,
  Eye,
  EyeOff,
  Save,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full transition-colors ${
        checked ? "bg-accent" : "bg-ink-faint"
      }`}
    >
      <div
        className={`absolute top-0.5 left-0.5 size-4 bg-white rounded-full shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const [emailNotif, setEmailNotif] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setIsSaving(true);

    const result = await updateProfile({
      password: currentPassword,
      newPassword,
    });

    if (result.error) {
      setPasswordError(result.error);
    } else {
      setPasswordSuccess(result.message || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    setIsSaving(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold text-ink">
          Settings
        </h1>
        <p className="text-ink-mid text-sm mt-1">Manage your preferences</p>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-ink-faint/50">
        <div className="px-5 py-4 border-b border-ink-faint/50">
          <h2 className="text-base font-semibold text-ink flex items-center gap-2">
            <Bell className="size-4 text-ink-light" />
            Notifications
          </h2>
        </div>
        <div className="divide-y divide-ink-faint/50">
          <div className="flex items-center justify-between px-5 py-3">
            <div>
              <div className="text-sm font-medium text-ink">
                Email Notifications
              </div>
              <div className="text-xs text-ink-mid">
                Receive updates via email
              </div>
            </div>
            <Toggle checked={emailNotif} onChange={setEmailNotif} />
          </div>
          <div className="flex items-center justify-between px-5 py-3">
            <div>
              <div className="text-sm font-medium text-ink">Order Updates</div>
              <div className="text-xs text-ink-mid">
                Shipping and delivery alerts
              </div>
            </div>
            <Toggle checked={orderUpdates} onChange={setOrderUpdates} />
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="bg-white rounded-xl border border-ink-faint/50">
        <div className="px-5 py-4 border-b border-ink-faint/50">
          <h2 className="text-base font-semibold text-ink flex items-center gap-2">
            <Shield className="size-4 text-ink-light" />
            Security
          </h2>
        </div>
        <div className="px-5 py-4">
          <div className="text-sm text-ink-mid">
            Account status:{" "}
            <span className="font-medium text-ink capitalize">
              {user?.status?.toLowerCase()}
            </span>
          </div>
          <div className="text-sm text-ink-mid mt-1">
            Email verified: <span className="font-medium text-ink">Yes</span>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl border border-ink-faint/50">
        <div className="px-5 py-4 border-b border-ink-faint/50">
          <h2 className="text-base font-semibold text-ink flex items-center gap-2">
            <Lock className="size-4 text-ink-light" />
            Change Password
          </h2>
        </div>
        <form onSubmit={handlePasswordChange} className="p-5 space-y-4">
          {passwordError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{passwordError}</span>
            </div>
          )}
          {passwordSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
              <span className="text-green-700 text-sm">{passwordSuccess}</span>
            </div>
          )}
          <div>
            <label
              className="block text-sm font-medium text-ink-mid mb-1"
              htmlFor="field-current-password-201"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                id="field-current-password-201"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 rounded-lg border border-ink-faint text-sm text-ink bg-cream focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-light"
              >
                {showCurrent ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-ink-mid mb-1"
              htmlFor="field-new-password-202"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="field-new-password-202"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 rounded-lg border border-ink-faint text-sm text-ink bg-cream focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-light"
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
              className="block text-sm font-medium text-ink-mid mb-1"
              htmlFor="field-confirm-new-password-203"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="field-confirm-new-password-203"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 rounded-lg border border-ink-faint text-sm text-ink bg-cream focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-light"
              >
                {showConfirm ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent-mid disabled:bg-accent/50 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {isSaving ? (
                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="size-3.5" />
                  Update Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
