"use client";

import { useState } from "react";
import { Save, Shield, Key, Eye, EyeOff } from "lucide-react";

export default function SecuritySettings() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          Change Password
        </h2>
        <div className="space-y-5">
          <div>
            <label
              htmlFor="settings-current-password"
              className="block text-sm font-medium text-zinc-300 mb-1.5"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                id="settings-current-password"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-emerald-500/50"
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
          </div>
          <div>
            <label
              htmlFor="settings-new-password"
              className="block text-sm font-medium text-zinc-300 mb-1.5"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="settings-new-password"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-emerald-500/50"
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
              htmlFor="settings-confirm-password"
              className="block text-sm font-medium text-zinc-300 mb-1.5"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="settings-confirm-password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-emerald-500/50"
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
          </div>
          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors">
              <Key className="size-4" />
              Update Password
            </button>
          </div>
        </div>
      </div>

      {/* Security Options */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          Security Options
        </h2>
        <div className="space-y-5">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Shield className="size-5 text-zinc-400" />
              <div>
                <div className="text-sm font-medium text-zinc-200">
                  Two-Factor Authentication
                </div>
                <div className="text-xs text-zinc-500">
                  Add an extra layer of security to your account
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setTwoFactor(!twoFactor)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                twoFactor ? "bg-emerald-500" : "bg-zinc-700"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 size-5 bg-white rounded-full transition-transform ${
                  twoFactor ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          <div className="py-3 border-t border-zinc-800">
            <label
              htmlFor="settings-session-timeout"
              className="block text-sm font-medium text-zinc-300 mb-1.5"
            >
              Session Timeout (minutes)
            </label>
            <select
              id="settings-session-timeout"
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="w-48 px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-emerald-500/50 appearance-none cursor-pointer"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>
          </div>
          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors">
              <Save className="size-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
