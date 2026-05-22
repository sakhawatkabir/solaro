"use client";

import { m } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Sun,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function RegisterForm({ state, dispatch, onSubmit }) {
  const prefersReducedMotion = useReducedMotion();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  return (
    <m.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: transitionDuration }}
    >
      <div className="flex items-center gap-2 text-accent font-semibold text-sm tracking-widest uppercase mb-4">
        <Sun size={16} />
        Join SOLARO
      </div>
      <h1 className="text-4xl lg:text-5xl font-heading font-semibold text-ink mb-4">
        Create your <span className="text-accent italic">account</span>
      </h1>
      <p className="text-ink-mid text-lg mb-8">
        Start tracking your solar savings and manage your system from
        one dashboard.
      </p>

      {state.error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
          <span className="text-red-700 text-sm">{state.error}</span>
        </div>
      )}

      {state.success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
          <span className="text-green-700 text-sm">
            Account created! Please check your email to verify your
            account. Redirecting to login…
          </span>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label htmlFor="reg-name" className="block text-sm font-semibold text-ink mb-2">
            Full Name
          </label>
          <div className="relative">
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light" />
            <input
              id="reg-name"
              type="text"
              name="name"
              value={state.name}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
              placeholder="Rahim Ahmed"
            />
          </div>
        </div>

        <div>
          <label htmlFor="reg-email" className="block text-sm font-semibold text-ink mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light" />
            <input
              id="reg-email"
              type="email"
              name="email"
              value={state.email}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
              placeholder="rahim@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="reg-password" className="block text-sm font-semibold text-ink mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light" />
              <input
                id="reg-password"
                type={state.showPassword ? "text" : "password"}
                name="password"
                value={state.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
                placeholder="Min 8 characters"
              />
              <button
                type="button"
                onClick={() => dispatch({ type: "SET_FIELD", field: "showPassword", value: !state.showPassword })}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-light hover:text-ink transition-colors"
              >
                {state.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="reg-confirm-password" className="block text-sm font-semibold text-ink mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light" />
              <input
                id="reg-confirm-password"
                type={state.showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={state.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
                placeholder="Re-enter password"
              />
              <button
                type="button"
                onClick={() => dispatch({ type: "SET_FIELD", field: "showConfirm", value: !state.showConfirm })}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-light hover:text-ink transition-colors"
              >
                {state.showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="size-4 mt-0.5 rounded border-ink/20 text-accent focus:ring-accent/20"
          />
          <span className="text-sm text-ink-mid">
            I agree to the{" "}
            <Link href="/terms" className="text-accent font-semibold hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-accent font-semibold hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        <button
          type="submit"
          disabled={state.isLoading || state.success}
          className="w-full py-4 bg-accent hover:bg-accent-mid disabled:bg-accent/50 text-white font-semibold rounded-full transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
        >
          {state.isLoading ? (
            <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <span className="text-ink-mid">Already have an account? </span>
        <Link href="/login" className="text-accent font-semibold hover:underline">
          Sign in here
        </Link>
      </div>
    </m.div>
  );
}
