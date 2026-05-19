"use client";

import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserDangerZone({ userId, userName }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    setShowConfirm(false);
    router.push("/admin/users");
  };

  return (
    <div className="rounded-xl bg-zinc-900 border border-red-500/20 p-6">
      <h2 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h2>
      <p className="text-sm text-zinc-400 mb-4">
        Irreversible and destructive actions
      </p>
      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm font-medium transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete User
        </button>
      ) : (
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <p className="text-sm text-zinc-300">
              Delete <span className="font-medium text-white">{userName}</span>?
            </p>
          </div>
          <p className="text-xs text-zinc-500">
            This cannot be undone. All data associated with this user will be
            permanently removed.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
            >
              Confirm Delete
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
