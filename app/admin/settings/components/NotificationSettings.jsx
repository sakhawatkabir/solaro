"use client";

import { useState } from "react";
import { Save } from "lucide-react";

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="text-sm font-medium text-zinc-200">{label}</div>
        {description && (
          <div className="text-xs text-zinc-500 mt-0.5">{description}</div>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-emerald-500" : "bg-zinc-700"
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function NotificationSettings() {
  const [orderEmail, setOrderEmail] = useState(true);
  const [leadEmail, setLeadEmail] = useState(true);
  const [marketingEmail, setMarketingEmail] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [lowStockAlert, setLowStockAlert] = useState(true);
  const [lowStockThreshold, setLowStockThreshold] = useState("5");

  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-white mb-6">
        Notification Settings
      </h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">
            Order Notifications
          </h3>
          <div className="divide-y divide-zinc-800">
            <Toggle
              checked={orderEmail}
              onChange={setOrderEmail}
              label="Email on New Order"
              description="Send email notification when a new order is placed"
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">
            Lead Notifications
          </h3>
          <div className="divide-y divide-zinc-800">
            <Toggle
              checked={leadEmail}
              onChange={setLeadEmail}
              label="Email on New Lead"
              description="Send email when a new lead comes from calculator or contact form"
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">
            System Notifications
          </h3>
          <div className="divide-y divide-zinc-800">
            <Toggle
              checked={weeklyReport}
              onChange={setWeeklyReport}
              label="Weekly Report"
              description="Receive weekly sales and performance summary"
            />
            <Toggle
              checked={lowStockAlert}
              onChange={setLowStockAlert}
              label="Low Stock Alert"
              description="Get notified when product stock falls below threshold"
            />
          </div>
          {lowStockAlert && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Low Stock Threshold
              </label>
              <input
                type="number"
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(e.target.value)}
                className="w-32 px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end pt-4 border-t border-zinc-800">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
