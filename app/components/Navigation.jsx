"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsOpen } = useCart();

  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
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

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-6 transition-all duration-300 font-body ${
          isScrolled
            ? "bg-cream/95 backdrop-blur-md border-b border-black/5 shadow-sm py-4"
            : "bg-transparent"
        }`}
      >
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-6 h-6 rounded-full bg-primary"></div>
            <span className="text-2xl font-heading font-bold text-ink tracking-tight">
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
            <span>Cart ({totalItems})</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-3 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <Link href="/contact">
            <span className="px-6 py-3 bg-accent hover:bg-accent-mid text-white rounded-full font-semibold text-[15px] transition-colors cursor-pointer shadow-md shadow-accent/20">
              Get Free Quote
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="text-ink relative"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[10px] rounded-full flex items-center justify-center font-bold">
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
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
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
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="mt-8 px-6 py-4 bg-accent text-white rounded-full font-semibold text-center w-full block">
                  Get Free Quote
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
