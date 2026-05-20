"use client";

import { m } from "framer-motion";
import {
  Shield,
  ArrowLeft,
  Sun,
  AlertCircle,
  CheckCircle,
  Mail,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useAuth } from "../../context/AuthContext";

export default function TwoFactorPage() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const { verify2FA, resend2FACode } = useAuth();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;
  const inputRef = useRef(null);

  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      setError("No pending verification session. Please log in again.");
    } else {
      inputRef.current?.focus();
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("No pending verification session.");
      return;
    }

    if (code.length !== 6) {
      setError("Please enter a 6-digit code.");
      return;
    }

    setIsLoading(true);
    const result = await verify2FA(code);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    setSuccess(true);
    setIsLoading(false);
    setTimeout(() => {
      if (result.user.role === "VIEWER") {
        router.push("/dashboard");
      } else {
        router.push("/admin");
      }
    }, 1500);
  };

  const handleResend = async () => {
    if (!email) return;

    setIsResending(true);
    setError("");
    const result = await resend2FACode(email);

    if (result.error) {
      setError(result.error);
    }

    setIsResending(false);
  };

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCode(value);
  };

  return (
    <section className="pt-32 pb-20 px-8 lg:px-16 min-h-screen flex items-center">
      <div className="max-w-md mx-auto w-full">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: transitionDuration }}
        >
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-ink-mid hover:text-ink mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>

          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
            <Shield size={32} className="text-accent" />
          </div>

          <div className="flex items-center gap-2 text-accent font-semibold text-sm tracking-widest uppercase mb-4">
            <Sun size={16} />
            Two-Factor Authentication
          </div>

          <h1 className="text-3xl lg:text-4xl font-heading font-semibold text-ink mb-4">
            Check your <span className="text-accent italic">email</span>
          </h1>

          <p className="text-ink-mid text-lg mb-8">
            We&apos;ve sent a 6-digit verification code to{" "}
            <span className="font-semibold text-ink">{email}</span>
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
              <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
              <span className="text-green-700 text-sm">
                Verified! Redirecting to dashboard...
              </span>
            </div>
          )}

          {!success && email && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="2fa-code"
                  className="block text-sm font-semibold text-ink mb-2"
                >
                  Verification Code
                </label>
                <div className="relative">
                  <Shield
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light"
                  />
                  <input
                    id="2fa-code"
                    ref={inputRef}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={code}
                    onChange={handleCodeChange}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-ink/10 bg-white text-ink text-center text-2xl tracking-widest font-mono placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
                    placeholder="000000"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || code.length !== 6}
                className="w-full py-4 bg-accent hover:bg-accent-mid disabled:bg-accent/50 text-white font-semibold rounded-full transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Verify"
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-ink-mid">
              Didn&apos;t receive a code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-accent font-semibold hover:underline disabled:opacity-50"
              >
                {isResending ? "Sending..." : "Resend"}
              </button>
            </p>
          </div>
        </m.div>
      </div>
    </section>
  );
}
