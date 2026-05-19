"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Edit2 } from "lucide-react";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Rahim Uddin");
  const [phone, setPhone] = useState("+880 1712-345678");
  const [address, setAddress] = useState(
    "House 42, Road 11, Banani, Dhaka 1213",
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-ink">
            Profile
          </h1>
          <p className="text-ink-mid text-sm mt-1">
            Manage your personal details
          </p>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ink-faint text-sm text-ink-mid hover:bg-cream transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5" />
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-ink-faint/50 divide-y divide-ink-faint/50">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4 p-5">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
            <span className="text-lg font-semibold text-accent">RU</span>
          </div>
          <div>
            <div className="font-semibold text-ink">{name}</div>
            <div className="text-sm text-ink-mid">rahim@email.com</div>
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-4 p-5">
          <div>
            <label className="block text-xs font-medium text-ink-light uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            {editing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-ink-faint text-sm text-ink bg-cream focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            ) : (
              <div className="flex items-center gap-2 text-sm text-ink">
                <User className="w-4 h-4 text-ink-light" />
                {name}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-light uppercase tracking-wider mb-1.5">
              Email
            </label>
            <div className="flex items-center gap-2 text-sm text-ink">
              <Mail className="w-4 h-4 text-ink-light" />
              rahim@email.com
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-light uppercase tracking-wider mb-1.5">
              Phone
            </label>
            {editing ? (
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-ink-faint text-sm text-ink bg-cream focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            ) : (
              <div className="flex items-center gap-2 text-sm text-ink">
                <Phone className="w-4 h-4 text-ink-light" />
                {phone}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-light uppercase tracking-wider mb-1.5">
              Address
            </label>
            {editing ? (
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-ink-faint text-sm text-ink bg-cream focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            ) : (
              <div className="flex items-center gap-2 text-sm text-ink">
                <MapPin className="w-4 h-4 text-ink-light" />
                {address}
              </div>
            )}
          </div>
        </div>

        {editing && (
          <div className="flex justify-end gap-2 p-5">
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-ink-mid hover:bg-cream transition-colors"
            >
              Cancel
            </button>
            <button className="px-4 py-2 rounded-lg bg-accent hover:bg-accent-mid text-white text-sm font-medium transition-colors">
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
