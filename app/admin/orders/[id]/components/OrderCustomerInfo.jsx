"use client";

import { User, Mail, Phone, MapPin, Home } from "lucide-react";

export default function OrderCustomerInfo({ order }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Customer</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <User className="size-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {order.customerName}
            </p>
            <p className="text-xs text-zinc-400">Customer</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Mail className="size-5 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-white">{order.customerEmail}</p>
            <p className="text-xs text-zinc-400">Email</p>
          </div>
        </div>
        {order.customerPhone && (
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Phone className="size-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-white">{order.customerPhone}</p>
              <p className="text-xs text-zinc-400">Phone</p>
            </div>
          </div>
        )}
        {order.district && (
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-orange-500/10 flex items-center justify-center">
              <MapPin className="size-5 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-white">{order.district}</p>
              <p className="text-xs text-zinc-400">Delivery District</p>
            </div>
          </div>
        )}
        {order.shippingAddress && (
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
              <Home className="size-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-white">{order.shippingAddress}</p>
              <p className="text-xs text-zinc-400">Shipping Address</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
