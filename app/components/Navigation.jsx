"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Solar Panels", href: "#panels" },
    { name: "Complete Kits", href: "#kits" },
    { name: "Accessories", href: "#accessories" },
    { name: "Support", href: "#support" },
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
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <span className="text-ink-mid hover:text-ink font-medium text-[15px] transition-colors cursor-pointer">
                {link.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <button className="text-ink hover:text-accent transition-colors flex items-center gap-2 font-medium">
            <ShoppingCart size={20} />
            <span>Cart (0)</span>
          </button>
          <button className="px-6 py-3 bg-accent hover:bg-accent-mid text-white rounded-full font-semibold text-[15px] transition-colors cursor-pointer shadow-md shadow-accent/20">
            Shop Now
          </button>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <button className="text-ink">
            <ShoppingCart size={24} />
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
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button className="mt-8 px-6 py-4 bg-accent text-white rounded-full font-semibold text-center w-full">
                Shop Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
