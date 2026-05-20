"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Edit2,
  Save,
  CheckCircle,
  AlertCircle,
  Shield,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { user, loading, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (loading) {
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
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const handleSave = async () => {
    if (!name || name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccess("");

    const result = await updateProfile({ name: name.trim() });

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(result.message || "Profile updated successfully!");
      setEditing(false);
    }

    setIsSaving(false);
  };

  const handleEdit = () => {
    setName(user.name || "");
    setEditing(true);
    setError("");
    setSuccess("");
  };

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
          onClick={editing ? () => setEditing(false) : handleEdit}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ink-faint text-sm text-ink-mid hover:bg-cream transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5" />
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
          <span className="text-green-700 text-sm">{success}</span>
        </div>
      )}

      <div className="bg-white rounded-xl border border-ink-faint/50 divide-y divide-ink-faint/50">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4 p-5">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
            <span className="text-lg font-semibold text-accent">
              {initials}
            </span>
          </div>
          <div>
            <div className="font-semibold text-ink">
              {user.name || "Unnamed User"}
            </div>
            <div className="text-sm text-ink-mid">{user.email}</div>
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
                autoFocus
              />
            ) : (
              <div className="flex items-center gap-2 text-sm text-ink">
                <User className="w-4 h-4 text-ink-light" />
                {user.name || "Not set"}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-light uppercase tracking-wider mb-1.5">
              Email
            </label>
            <div className="flex items-center gap-2 text-sm text-ink">
              <Mail className="w-4 h-4 text-ink-light" />
              {user.email}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-light uppercase tracking-wider mb-1.5">
              Role
            </label>
            <div className="flex items-center gap-2 text-sm text-ink capitalize">
              <Shield className="w-4 h-4 text-ink-light" />
              {user.role?.toLowerCase()}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-light uppercase tracking-wider mb-1.5">
              Status
            </label>
            <div className="text-sm text-ink capitalize">
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                  user.status === "ACTIVE"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    user.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                {user.status?.toLowerCase()}
              </span>
            </div>
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
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent-mid disabled:bg-accent/50 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {isSaving ? (
                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
