"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { activateUser } from "@/app/actions/auth/activation";
import {
  Sun,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

export default function ActivateForm() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
      setError("Invalid activation link.");
      return;
    }

    setLoading(true);

    try {
      await activateUser(token, password);
      setSuccess(true);
      setTimeout(() => push("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="size-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="size-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-semibold text-white mb-2">
            Account Activated!
          </h1>
          <p className="text-zinc-400">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-12 rounded-xl bg-emerald-500/10 mb-4">
            <Sun className="size-6 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-semibold text-white">
            Activate Your Account
          </h1>
          <p className="text-zinc-400 mt-2">Set a password to get started</p>
        </div>

        {/* Form */}
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                <XCircle className="size-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white rounded-xl text-sm font-medium transition-colors"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Activate Account"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-zinc-500 mt-6">
          Didn't expect this email? You can safely ignore it.
        </p>
      </div>
    </div>
  );
}
