"use client";

import { useState } from "react";
import { Bell, Lock, Shield, Eye, EyeOff, Save } from "lucide-react";

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function Toggle({ checked, onChange }) {
    return (
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors ${
          checked ? "bg-accent" : "bg-ink-faint"
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    );
  }

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
            <Bell className="w-4 h-4 text-ink-light" />
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

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-xl border border-ink-faint/50">
        <div className="px-5 py-4 border-b border-ink-faint/50">
          <h2 className="text-base font-semibold text-ink flex items-center gap-2">
            <Shield className="w-4 h-4 text-ink-light" />
            Security
          </h2>
        </div>
        <div className="divide-y divide-ink-faint/50">
          <div className="flex items-center justify-between px-5 py-3">
            <div>
              <div className="text-sm font-medium text-ink">
                Two-Factor Authentication
              </div>
              <div className="text-xs text-ink-mid">
                Add an extra layer of security to your account
              </div>
            </div>
            <Toggle checked={twoFactor} onChange={setTwoFactor} />
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl border border-ink-faint/50">
        <div className="px-5 py-4 border-b border-ink-faint/50">
          <h2 className="text-base font-semibold text-ink flex items-center gap-2">
            <Lock className="w-4 h-4 text-ink-light" />
            Change Password
          </h2>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-mid mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                className="w-full px-3 py-2 pr-10 rounded-lg border border-ink-faint text-sm text-ink bg-cream focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
              <button
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-light"
              >
                {showCurrent ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-mid mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                className="w-full px-3 py-2 pr-10 rounded-lg border border-ink-faint text-sm text-ink bg-cream focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
              <button
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-light"
              >
                {showNew ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-mid mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                className="w-full px-3 py-2 pr-10 rounded-lg border border-ink-faint text-sm text-ink bg-cream focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
              <button
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-light"
              >
                {showConfirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent-mid text-white rounded-lg text-sm font-medium transition-colors">
              <Save className="w-3.5 h-3.5" />
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
