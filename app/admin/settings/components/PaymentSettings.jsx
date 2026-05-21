"use client";

import { useState } from "react";
import { Save, CreditCard, Building2, Smartphone } from "lucide-react";
import PaymentMethod from "./PaymentMethod";

export default function PaymentSettings() {
  const [cashOnDelivery, setCashOnDelivery] = useState(true);
  const [bankTransfer, setBankTransfer] = useState(true);
  const [bkash, setBkash] = useState(true);
  const [nagad, setNagad] = useState(false);
  const [rocket, setRocket] = useState(false);

  const [accountName, setAccountName] = useState("SOLARO Energy Ltd.");
  const [accountNumber, setAccountNumber] = useState("XXXX-XXXX-XXXX");
  const [bankName, setBankName] = useState("Dutch-Bangla Bank");
  const [branch, setBranch] = useState("Gulshan Branch");

  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h2 className="text-lg font-semibold text-white mb-6">
        Payment Settings
      </h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">
            Payment Methods
          </h3>
          <div className="space-y-3">
            <PaymentMethod
              icon={CreditCard}
              name="Cash on Delivery"
              description="Customer pays when order is delivered"
              enabled={cashOnDelivery}
              onToggle={setCashOnDelivery}
            />
            <PaymentMethod
              icon={Building2}
              name="Bank Transfer"
              description="Direct bank transfer to company account"
              enabled={bankTransfer}
              onToggle={setBankTransfer}
            />
            <PaymentMethod
              icon={Smartphone}
              name="bKash"
              description="Mobile payment via bKash"
              enabled={bkash}
              onToggle={setBkash}
            />
            <PaymentMethod
              icon={Smartphone}
              name="Nagad"
              description="Mobile payment via Nagad"
              enabled={nagad}
              onToggle={setNagad}
            />
            <PaymentMethod
              icon={Smartphone}
              name="Rocket"
              description="Mobile payment via DBBL Rocket"
              enabled={rocket}
              onToggle={setRocket}
            />
          </div>
        </div>
        {bankTransfer && (
          <div>
            <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">
              Bank Account Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Account Name
                  </label>
                  <input
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Branch
                  </label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
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
