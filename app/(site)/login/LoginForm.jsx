"use client";

import { m } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sun,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [requiresVerification, setRequiresVerification] = useState(false);
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const { login } = useAuth();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  useEffect(() => {
    const callbackError = searchParams.get("error");
    if (callbackError === "SessionExpired") {
      setError("Your session has expired. Please sign in again.");
    }
  }, [searchParams]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    const result = await login(email, password);

    if (result.error) {
      if (result.requiresVerification) {
        setRequiresVerification(true);
        setError("");
      } else {
        setRequiresVerification(false);
        setError(result.error);
      }
      setIsLoading(false);
      return;
    }

    setRequiresVerification(false);

    const callbackUrl = searchParams.get("callbackUrl");
    if (callbackUrl) {
      push(callbackUrl);
    } else if (result.user.role === "VIEWER") {
      push("/dashboard");
    } else {
      push("/admin");
    }
  };

  return (
    <>
      <section className="pt-32 pb-20 px-8 lg:px-16 min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Form */}
            <m.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: transitionDuration }}
            >
              <div className="flex items-center gap-2 text-accent font-semibold text-sm tracking-widest uppercase mb-4">
                <Sun size={16} />
                Welcome Back
              </div>
              <h1 className="text-4xl lg:text-5xl font-heading font-semibold text-ink mb-4">
                Sign in to your{" "}
                <span className="text-accent italic">account</span>
              </h1>
              <p className="text-ink-mid text-lg mb-8">
                Access your solar dashboard, track savings, and manage your
                system.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                  <AlertCircle
                    size={18}
                    className="text-red-500 flex-shrink-0"
                  />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              {requiresVerification && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <Mail
                    size={18}
                    className="text-amber-600 flex-shrink-0 mt-0.5"
                  />
                  <div className="text-sm">
                    <p className="text-amber-800 font-semibold mb-1">
                      Email not verified
                    </p>
                    <p className="text-amber-700 mb-2">
                      Please verify your email before signing in. Check your
                      inbox for the verification link.
                    </p>
                    <Link
                      href={`/verify-email?resend=${encodeURIComponent(email)}`}
                      className="text-accent font-semibold hover:underline"
                    >
                      Resend verification email
                    </Link>
                  </div>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="login-email"
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
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
                      placeholder="rahim@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="login-password"
                    className="block text-sm font-semibold text-ink mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light"
                    />
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-light hover:text-ink transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-ink/20 text-accent focus:ring-accent/20"
                    />
                    <span className="text-sm text-ink-mid">Remember me</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-accent font-semibold hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-accent hover:bg-accent-mid disabled:bg-accent/50 text-white font-semibold rounded-full transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <span className="text-ink-mid">
                  Don&apos;t have an account?{" "}
                </span>
                <Link
                  href="/register"
                  className="text-accent font-semibold hover:underline"
                >
                  Create one now
                </Link>
              </div>
            </m.div>

            {/* Right - Image / Promo */}
            <m.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: transitionDuration, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop"
                  alt="Solar panels on home"
                  width={1200}
                  height={1500}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <div className="text-white font-heading font-semibold text-xl mb-2">
                      Track Your Solar Savings
                    </div>
                    <p className="text-white/80 text-sm">
                      Monitor energy production, savings, and system health from
                      your dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </>
  );
}
