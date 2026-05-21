"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsOpen } = useCart();
  const { user, logout, loading } = useAuth();

  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "Calculator", href: "/calculator" },
    { name: "Districts", href: "/districts" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isUserMenuOpen) {
      const handleClick = () => setIsUserMenuOpen(false);
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [isUserMenuOpen]);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 transition-all duration-300 font-body animate-nav-in bg-cream/95 backdrop-blur-md ${
          isScrolled
            ? "border-b border-black/5 shadow-sm py-4"
            : "py-6"
        }`}
      >
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="size-6 rounded-full bg-primary"></div>
            <span className="text-2xl font-heading font-semibold text-ink tracking-tight">
              Solaro.
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href}>
                <span
                  className={`font-medium text-[15px] transition-colors cursor-pointer ${
                    isActive
                      ? "text-accent font-semibold"
                      : "text-ink-mid hover:text-ink"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => setIsOpen(true)}
            className="text-ink hover:text-accent transition-colors flex items-center gap-2 font-medium relative"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-3 size-5 bg-accent text-white text-xs rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>

          {loading ? (
            <div className="size-5 border-2 border-ink/20 border-t-ink rounded-full animate-spin" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUserMenuOpen(!isUserMenuOpen);
                }}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="size-9 rounded-full bg-accent text-white flex items-center justify-center text-sm font-semibold">
                  {initials}
                </div>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <m.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-ink/10 py-2"
                  >
                    <div className="px-4 py-3 border-b border-ink/10">
                      <p className="text-sm font-semibold text-ink truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-ink-light truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-mid hover:bg-ink/5 hover:text-ink transition-colors"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-mid hover:bg-ink/5 hover:text-ink transition-colors"
                    >
                      <User size={16} />
                      Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-mid hover:bg-ink/5 hover:text-ink transition-colors"
                    >
                      <Settings size={16} />
                      Settings
                    </Link>
                    {user.role !== "VIEWER" && (
                      <Link
                        href="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-mid hover:bg-ink/5 hover:text-ink transition-colors border-t border-ink/10 mt-1 pt-2"
                      >
                        <Settings size={16} />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-ink/10 mt-1 pt-2"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/login">
              <span className="text-ink hover:text-accent transition-colors flex items-center gap-2 font-medium">
                <User size={20} />
              </span>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <button onClick={() => setIsOpen(true)} className="text-ink relative">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 size-4 bg-accent text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-ink"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[72px] z-40 bg-cream flex flex-col p-8 lg:hidden font-body"
          >
            <div className="flex flex-col gap-6 text-xl font-medium text-ink">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={isActive ? "text-accent font-semibold" : ""}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-ink/10 mt-2">
                {loading ? (
                  <div className="size-5 border-2 border-ink/20 border-t-ink rounded-full animate-spin mx-auto" />
                ) : user ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="size-10 rounded-full bg-accent text-white flex items-center justify-center text-sm font-semibold">
                        {initials}
                      </div>
                      <div>
                        <p className="font-semibold text-ink">{user.name}</p>
                        <p className="text-sm text-ink-light">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="block py-2 text-ink-mid hover:text-ink transition-colors">
                        Dashboard
                      </span>
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="block py-2 text-ink-mid hover:text-ink transition-colors">
                        Profile
                      </span>
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="block py-2 text-ink-mid hover:text-ink transition-colors">
                        Settings
                      </span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        logout();
                      }}
                      className="block py-2 text-red-600 hover:text-red-700 transition-colors mt-2"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="flex items-center gap-2 text-ink-mid hover:text-ink transition-colors">
                      <User size={20} />
                      Sign In / Register
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
