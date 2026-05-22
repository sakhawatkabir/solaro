"use client";

import { Sun, Mail, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function IdleState({ state, dispatch, handleResend }) {
  return (
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
        Enter your email address and we&apos;ll send you a new verification link.
      </p>

      {state.resendError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3 text-left">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
          <span className="text-red-700 text-sm">{state.resendError}</span>
        </div>
      )}

      {state.resendSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3 text-left">
          <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
          <span className="text-green-700 text-sm">
            Verification email sent! Check your inbox.
          </span>
        </div>
      )}

      {!state.resendSuccess && (
        <form onSubmit={handleResend} className="space-y-5 text-left">
          <div>
            <label htmlFor="verify-email" className="block text-sm font-semibold text-ink mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light" />
              <input
                id="verify-email"
                type="email"
                value={state.email}
                onChange={(e) => dispatch({ type: "SET_EMAIL", email: e.target.value })}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
                placeholder="rahim@email.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={state.resendLoading}
            className="w-full py-4 bg-accent hover:bg-accent-mid disabled:bg-accent/50 text-white font-semibold rounded-full transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
          >
            {state.resendLoading ? (
              <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Send Verification Link"
            )}
          </button>
        </form>
      )}

      {state.resendSuccess && (
        <div className="mt-6">
          <Link href="/login" className="text-accent font-semibold hover:underline">
            Return to login
          </Link>
        </div>
      )}
    </>
  );
}
