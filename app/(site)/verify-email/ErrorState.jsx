"use client";

import { XCircle, Sun, Mail, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ErrorState({ message, state, dispatch, handleResend }) {
  return (
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

      {!state.resendSuccess && (
        <div className="bg-ink/[0.03] border border-ink/10 rounded-2xl p-6 mb-6 text-left">
          <p className="text-ink font-semibold mb-4">
            Need a new verification link?
          </p>
          {state.resendError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{state.resendError}</span>
            </div>
          )}
          <form onSubmit={handleResend} className="flex gap-3">
            <div className="relative flex-1">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light" />
              <input
                type="email"
                value={state.email}
                onChange={(e) => dispatch({ type: "SET_EMAIL", email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>
            <button
              type="submit"
              disabled={state.resendLoading}
              className="px-6 py-3 bg-accent hover:bg-accent-mid disabled:bg-accent/50 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
            >
              {state.resendLoading ? (
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Resend"
              )}
            </button>
          </form>
        </div>
      )}

      {state.resendSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
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
  );
}
