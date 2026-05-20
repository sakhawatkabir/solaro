"use client";

import { m } from "framer-motion";
import { Mail, ArrowLeft, Sun, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useAuth } from "../../context/AuthContext";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { forgotPassword } = useAuth();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setIsLoading(true);
    const result = await forgotPassword(email);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    setSuccess(true);
    setIsLoading(false);
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

          <div className="flex items-center gap-2 text-accent font-semibold text-sm tracking-widest uppercase mb-4">
            <Sun size={16} />
            Reset Password
          </div>

          <h1 className="text-3xl lg:text-4xl font-heading font-semibold text-ink mb-4">
            Forgot your <span className="text-accent italic">password</span>?
          </h1>

          <p className="text-ink-mid text-lg mb-8">
            No worries. Enter your email and we&apos;ll send you a link to reset
            it.
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
                If an account with that email exists, a reset link has been
                sent. Check your inbox.
              </span>
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="forgot-email"
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
                    id="forgot-email"
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
                disabled={isLoading}
                className="w-full py-4 bg-accent hover:bg-accent-mid disabled:bg-accent/50 text-white font-semibold rounded-full transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          )}

          {success && (
            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-accent font-semibold hover:underline"
              >
                Return to login
              </Link>
            </div>
          )}
        </m.div>
      </div>
    </section>
  );
}
