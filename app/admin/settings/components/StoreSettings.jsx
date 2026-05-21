"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export default function StoreSettings() {
  const [currency, setCurrency] = useState("BDT");
  const [timezone, setTimezone] = useState("Asia/Dhaka");
  const [orderPrefix, setOrderPrefix] = useState("ORD");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("10000");

  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Store Settings</h2>
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-1.5"
              htmlFor="field-currency-1"
            >
              Currency
            </label>
            <select
              id="field-currency-1"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-emerald-500/50 appearance-none cursor-pointer"
            >
              <option value="BDT">BDT (৳) - Bangladeshi Taka</option>
              <option value="USD">USD ($) - US Dollar</option>
              <option value="EUR">EUR (€) - Euro</option>
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-1.5"
              htmlFor="field-timezone-2"
            >
              Timezone
            </label>
            <select
              id="field-timezone-2"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-emerald-500/50 appearance-none cursor-pointer"
            >
              <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-1.5"
              htmlFor="field-order-id-prefix-3"
            >
              Order ID Prefix
            </label>
            <input
              id="field-order-id-prefix-3"
              type="text"
              value={orderPrefix}
              onChange={(e) => setOrderPrefix(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-1.5"
              htmlFor="field-free-shipping-threshold-4"
            >
              Free Shipping Threshold (৳)
            </label>
            <input
              id="field-free-shipping-threshold-4"
              type="number"
              value={freeShippingThreshold}
              onChange={(e) => setFreeShippingThreshold(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        </div>
        <div className="flex justify-end pt-4 border-t border-zinc-800">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors">
            <Save className="size-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
