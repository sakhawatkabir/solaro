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
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { push } = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const { register } = useAuth();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);

    const result = await register(formData.name, formData.email, formData.password);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    setSuccess(true);
    setIsLoading(false);
    setTimeout(() => {
      push("/login");
    }, 3000);
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
                Join SOLARO
              </div>
              <h1 className="text-4xl lg:text-5xl font-heading font-semibold text-ink mb-4">
                Create your <span className="text-accent italic">account</span>
              </h1>
              <p className="text-ink-mid text-lg mb-8">
                Start tracking your solar savings and manage your system from
                one dashboard.
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

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                  <CheckCircle
                    size={18}
                    className="text-green-500 flex-shrink-0"
                  />
                  <span className="text-green-700 text-sm">
                    Account created! Please check your email to verify your account. Redirecting to login...
                  </span>
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="reg-name"
                    className="block text-sm font-semibold text-ink mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light"
                    />
                    <input
                      id="reg-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
                      placeholder="Rahim Ahmed"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="reg-email"
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
                      id="reg-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
                      placeholder="rahim@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="reg-password"
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
                        id="reg-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
                        placeholder="Min 8 characters"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-light hover:text-ink transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="reg-confirm-password"
                      className="block text-sm font-semibold text-ink mb-2"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light"
                      />
                      <input
                        id="reg-confirm-password"
                        type={showConfirm ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
                        placeholder="Re-enter password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-light hover:text-ink transition-colors"
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
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
                    <Link
                      href="/terms"
                      className="text-accent font-semibold hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-accent font-semibold hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isLoading || success}
                  className="w-full py-4 bg-accent hover:bg-accent-mid disabled:bg-accent/50 text-white font-semibold rounded-full transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
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
                <Link
                  href="/login"
                  className="text-accent font-semibold hover:underline"
                >
                  Sign in here
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
                  src="https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=1200&auto=format&fit=crop"
                  alt="Solar installation"
                  width={1200}
                  height={1500}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <div className="text-white font-heading font-semibold text-xl mb-2">
                      Monitor Your System 24/7
                    </div>
                    <p className="text-white/80 text-sm">
                      Real-time energy production, battery status, and savings
                      tracking from anywhere.
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
