"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import { sendActivationEmail } from "@/app/actions/auth/activation";

const roles = [
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "MANAGER", label: "Manager" },
  { value: "EDITOR", label: "Editor" },
  { value: "SUPPORT", label: "Support" },
  { value: "VIEWER", label: "Viewer" },
  { value: "CUSTOM", label: "Custom" },
];

const statuses = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "SUSPENDED", label: "Suspended" },
];

export default function UserBasicInfo({ formData, updateField }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        User Information
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-1.5"
              htmlFor="field-name-1"
            >
              Name
            </label>
            <input
              id="field-name-1"
              type="text"
              value={formData.name}
              disabled
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700 text-zinc-500 text-sm cursor-not-allowed"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-1.5"
              htmlFor="field-email-2"
            >
              Email
            </label>
            <input
              id="field-email-2"
              type="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700 text-zinc-500 text-sm cursor-not-allowed"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-1.5"
              htmlFor="field-role-3"
            >
              Role
            </label>
            <select
              id="field-role-3"
              value={formData.role}
              onChange={(e) => updateField("role", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50 text-sm cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r.value} value={r.value} className="bg-zinc-900">
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-zinc-300 mb-1.5"
              htmlFor="field-status-4"
            >
              Status
            </label>
            <select
              id="field-status-4"
              value={formData.status}
              onChange={(e) => updateField("status", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50 text-sm cursor-pointer"
            >
              {statuses.map((s) => (
                <option key={s.value} value={s.value} className="bg-zinc-900">
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="pt-4 border-t border-zinc-800">
          <ResendActivation userId={formData.id} email={formData.email} />
        </div>
      </div>
    </div>
  );
}

function ResendActivation({ userId, email }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResend = async () => {
    if (!userId) return;
    setSending(true);
    try {
      await sendActivationEmail(userId);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  if (!userId) return null;

  return (
    <button
      type="button"
      onClick={handleResend}
      disabled={sending}
      className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800 text-zinc-300 rounded-xl text-sm font-medium transition-colors border border-zinc-700"
    >
      {sent ? (
        <>
          <CheckCircle className="size-4 text-emerald-400" />
          Sent to {email}
        </>
      ) : sending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Mail className="size-4" />
          Resend Activation Email
        </>
      )}
    </button>
  );
}
