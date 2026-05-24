"use client";

import Image from "next/image";
import { Package } from "lucide-react";

function formatBDT(amount) {
  return `৳${amount.toLocaleString("en-BD")}`;
}

export default function OrderItems({ order }) {
  const items = order.items || [];

  return (
    <div className="lg:col-span-2 rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Order Items</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/50"
          >
            <div className="flex items-center gap-3">
              <div className="size-16 rounded-xl bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Package className="size-7 text-zinc-500" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{item.name}</p>
                <p className="text-xs text-zinc-400">
                  Qty: {item.quantity} × {formatBDT(item.price)}
                </p>
              </div>
            </div>
            <span className="text-sm font-semibold text-white">
              {formatBDT(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-800 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Subtotal</span>
          <span className="text-white">{formatBDT(order.subtotal)}</span>
        </div>
        {order.vat > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">VAT</span>
            <span className="text-white">{formatBDT(order.vat)}</span>
          </div>
        )}
        {order.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Discount</span>
            <span className="text-red-400">-{formatBDT(order.discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-base font-semibold pt-2 border-t border-zinc-800">
          <span className="text-white">Total</span>
          <span className="text-emerald-400">{formatBDT(order.total)}</span>
        </div>
      </div>

      {order.notes && (
        <div className="mt-6 pt-4 border-t border-zinc-800">
          <h4 className="text-sm font-medium text-zinc-300 mb-2">Notes</h4>
          <p className="text-sm text-zinc-400">{order.notes}</p>
        </div>
      )}
    </div>
  );
}
