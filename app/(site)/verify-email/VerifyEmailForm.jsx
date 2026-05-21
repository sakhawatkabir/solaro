"use client";

import { m } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Sun,
  ArrowRight,
  Mail,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useAuth } from "../../context/AuthContext";

export default function VerifyEmailForm() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState("");
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const { resendVerification } = useAuth();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  const token = searchParams.get("token");
  const resendEmail = searchParams.get("resend");

  useEffect(() => {
    if (resendEmail) {
      setEmail(resendEmail);
    }
  }, [resendEmail]);

  useEffect(() => {
    async function verify() {
      if (!token) {
        setStatus("idle");
        return;
      }

      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setStatus("success");
          setMessage(
            "Your email has been verified successfully! You can now sign in.",
          );
        } else {
          setStatus("error");
          setMessage(
            data.error ||
              "Verification failed. The token may be invalid or expired.",
          );
        }
      } catch {
        setStatus("error");
        setMessage("An error occurred during verification. Please try again.");
      }
    }

    verify();
  }, [token]);

  const handleResend = async (e) => {
    e.preventDefault();
    setResendError("");
    setResendSuccess(false);

    if (!email) {
      setResendError("Please enter your email address.");
      return;
    }

    setResendLoading(true);
    const result = await resendVerification(email);

    if (result.error) {
      setResendError(result.error);
    } else {
      setResendSuccess(true);
    }
    setResendLoading(false);
  };

  return (
    <section className="pt-32 pb-20 px-8 lg:px-16 min-h-screen flex items-center">
      <div className="max-w-md mx-auto w-full text-center">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: transitionDuration }}
        >
          {/* Loading state */}
          {status === "loading" && (
            <>
              <div className="flex items-center justify-center size-16 rounded-full bg-accent/10 mx-auto mb-6">
                <div className="size-8 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
              </div>
              <div className="flex items-center justify-center gap-2 text-accent font-semibold text-sm tracking-widest uppercase mb-4">
                <Sun size={16} />
                Verifying
              </div>
              <h1 className="text-3xl lg:text-4xl font-heading font-semibold text-ink mb-4">
                Verifying your <span className="text-accent italic">email</span>
              </h1>
              <p className="text-ink-mid text-lg">
                Please wait while we verify your email address...
              </p>
            </>
          )}

          {/* Success state */}
          {status === "success" && (
            <>
              <div className="flex items-center justify-center size-16 rounded-full bg-green-100 mx-auto mb-6">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <div className="flex items-center justify-center gap-2 text-green-600 font-semibold text-sm tracking-widest uppercase mb-4">
                <Sun size={16} />
                Verified
              </div>
              <h1 className="text-3xl lg:text-4xl font-heading font-semibold text-ink mb-4">
                Email <span className="text-green-500 italic">verified</span>
              </h1>
              <p className="text-ink-mid text-lg mb-8">{message}</p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 py-4 px-8 bg-accent hover:bg-accent-mid text-white font-semibold rounded-full transition-all shadow-lg shadow-accent/20"
              >
                Sign In Now
                <ArrowRight size={18} />
              </Link>
            </>
          )}

          {/* Error state (token present but invalid/expired) */}
          {status === "error" && (
            <>
              <div className="flex items-center justify-center size-16 rounded-full bg-red-100 mx-auto mb-6">
                <XCircle size={32} className="text-red-500" />
              </div>
              <div className="flex items-center justify-center gap-2 text-red-600 font-semibold text-sm tracking-widest uppercase mb-4">
                <Sun size={16} />
                Failed
              </div>
              <h1 className="text-3xl lg:text-4xl font-heading font-semibold text-ink mb-4">
                Verification <span className="text-red-500 italic">failed</span>
              </h1>
              <p className="text-ink-mid text-lg mb-8">{message}</p>

              {/* Resend form */}
              {!resendSuccess && (
                <div className="bg-ink/[0.03] border border-ink/10 rounded-2xl p-6 mb-6 text-left">
                  <p className="text-ink font-semibold mb-4">
                    Need a new verification link?
                  </p>
                  {resendError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-center gap-2">
                      <AlertCircle
                        size={16}
                        className="text-red-500 flex-shrink-0"
                      />
                      <span className="text-red-700 text-sm">
                        {resendError}
                      </span>
                    </div>
                  )}
                  <form onSubmit={handleResend} className="flex gap-3">
                    <div className="relative flex-1">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={resendLoading}
                      className="px-6 py-3 bg-accent hover:bg-accent-mid disabled:bg-accent/50 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
                    >
                      {resendLoading ? (
                        <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        "Resend"
                      )}
                    </button>
                  </form>
                </div>
              )}

              {resendSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                  <CheckCircle
                    size={18}
                    className="text-green-500 flex-shrink-0"
                  />
                  <span className="text-green-700 text-sm">
                    Verification email sent! Check your inbox.
                  </span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 py-4 px-8 bg-accent hover:bg-accent-mid text-white font-semibold rounded-full transition-all shadow-lg shadow-accent/20"
                >
                  Sign In
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 py-4 px-8 border-2 border-ink/10 hover:border-accent text-ink font-semibold rounded-full transition-all"
                >
                  Create Account
                </Link>
              </div>
            </>
          )}

          {/* Idle state (no token) */}
          {status === "idle" && (
            <>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-ink-mid hover:text-ink mb-8 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to login
              </Link>

              <div className="flex items-center justify-center gap-2 text-accent font-semibold text-sm tracking-widest uppercase mb-4">
                <Sun size={16} />
                Verify Email
              </div>

              <h1 className="text-3xl lg:text-4xl font-heading font-semibold text-ink mb-4">
                Verify your <span className="text-accent italic">email</span>
              </h1>

              <p className="text-ink-mid text-lg mb-8">
                Enter your email address and we&apos;ll send you a new
                verification link.
              </p>

              {resendError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3 text-left">
                  <AlertCircle
                    size={18}
                    className="text-red-500 flex-shrink-0"
                  />
                  <span className="text-red-700 text-sm">{resendError}</span>
                </div>
              )}

              {resendSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3 text-left">
                  <CheckCircle
                    size={18}
                    className="text-green-500 flex-shrink-0"
                  />
                  <span className="text-green-700 text-sm">
                    Verification email sent! Check your inbox.
                  </span>
                </div>
              )}

              {!resendSuccess && (
                <form onSubmit={handleResend} className="space-y-5 text-left">
                  <div>
                    <label
                      htmlFor="verify-email"
                      className="block text-sm font-semibold text-ink mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light"
                      />
                      <input
                        id="verify-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
                        placeholder="rahim@email.com"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={resendLoading}
                    className="w-full py-4 bg-accent hover:bg-accent-mid disabled:bg-accent/50 text-white font-semibold rounded-full transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
                  >
                    {resendLoading ? (
                      <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Send Verification Link"
                    )}
                  </button>
                </form>
              )}

              {resendSuccess && (
                <div className="mt-6">
                  <Link
                    href="/login"
                    className="text-accent font-semibold hover:underline"
                  >
                    Return to login
                  </Link>
                </div>
              )}
            </>
          )}
        </m.div>
      </div>
    </section>
  );
}
