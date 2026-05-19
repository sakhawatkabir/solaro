"use client";

import { Settings } from "lucide-react";

export default function SettingsHeader() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Settings</h1>
      <p className="text-sm text-zinc-400 mt-1">
        Manage your store configuration and preferences
      </p>
    </div>
  );
}
