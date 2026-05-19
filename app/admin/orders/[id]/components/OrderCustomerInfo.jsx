"use client";

import { User, Mail, Phone, MapPin } from "lucide-react";

export default function OrderCustomerInfo({ order }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Customer</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <User className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{order.customer}</p>
            <p className="text-xs text-zinc-400">Customer</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-white">{order.email}</p>
            <p className="text-xs text-zinc-400">Email</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
            <Phone className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-white">+880 1XXX-XXXXXX</p>
            <p className="text-xs text-zinc-400">Phone</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <p className="text-sm text-white">{order.district}</p>
            <p className="text-xs text-zinc-400">Delivery District</p>
          </div>
        </div>
      </div>
    </div>
  );
}
