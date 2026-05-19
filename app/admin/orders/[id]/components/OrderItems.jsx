"use client";

import { Package } from "lucide-react";

export default function OrderItems({ order }) {
  return (
    <div className="lg:col-span-2 rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Order Items</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center">
              <Package className="w-6 h-6 text-zinc-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{order.product}</p>
              <p className="text-xs text-zinc-400">Qty: 1</p>
            </div>
          </div>
          <span className="text-sm font-semibold text-white">
            {order.amount}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-800 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Subtotal</span>
          <span className="text-white">{order.amount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Delivery</span>
          <span className="text-emerald-400">Free</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">VAT (5%)</span>
          <span className="text-white">৳0</span>
        </div>
        <div className="flex justify-between text-base font-semibold pt-2 border-t border-zinc-800">
          <span className="text-white">Total</span>
          <span className="text-emerald-400">{order.amount}</span>
        </div>
      </div>
    </div>
  );
}
