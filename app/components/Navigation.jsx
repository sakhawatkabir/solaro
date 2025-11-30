"use client";

import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../providers/ThemeProvider";

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
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
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-300 ${
          isHomePage
            ? isScrolled
              ? "bg-white/90 dark:bg-black/90 backdrop-blur-lg shadow-lg"
              : "bg-white/80 dark:bg-transparent backdrop-blur-sm"
            : "bg-white dark:bg-gray-900 shadow-md"
        }`}
      >
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-2xl font-heading font-bold cursor-pointer ${
              isHomePage
                ? "text-black dark:text-white"
                : "text-black dark:text-white"
            }`}
          >
            SOLARO
          </motion.div>
        </Link>

        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link, index) => (
            <Link key={link.name} href={link.href}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  isHomePage
                    ? pathname === link.href
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
                    : pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {link.name}
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="hidden lg:flex items-center gap-4"
        >
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full transition-all ${
              isHomePage
                ? "bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {theme === "dark" ? (
              <HiOutlineSun
                className={`w-5 h-5 ${
                  isHomePage
                    ? "text-black dark:text-white"
                    : "text-black dark:text-white"
                }`}
              />
            ) : (
              <HiOutlineMoon
                className={`w-5 h-5 ${
                  isHomePage
                    ? "text-black dark:text-white"
                    : "text-black dark:text-white"
                }`}
              />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
              isHomePage
                ? "bg-primary text-black hover:bg-primary/90"
                : "bg-primary text-black dark:text-black hover:bg-primary/90"
            }`}
          >
            Join Now
          </motion.button>
        </motion.div>

        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          className={`lg:hidden p-2 rounded-full transition-all ${
            isHomePage
              ? "bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X
              className={`w-6 h-6 ${
                isHomePage
                  ? "text-black dark:text-white"
                  : "text-black dark:text-white"
              }`}
            />
          ) : (
            <Menu
              className={`w-6 h-6 ${
                isHomePage
                  ? "text-black dark:text-white"
                  : "text-black dark:text-white"
              }`}
            />
          )}
        </motion.button>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-[88px] right-0 bottom-0 w-80 bg-black/95 dark:bg-black/95 backdrop-blur-lg z-40 lg:hidden"
          >
            <div className="flex flex-col h-full p-8">
              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-2 mb-8">
                {navLinks.map((link, index) => (
                  <Link key={link.name} href={link.href}>
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-4 rounded-xl text-left text-lg font-medium text-gray-300 dark:text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mt-auto space-y-4"
              >
                <motion.button
                  onClick={toggleTheme}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-between px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
                >
                  <span className="text-white font-medium">Theme</span>
                  {theme === "dark" ? (
                    <HiOutlineSun className="w-5 h-5 text-white" />
                  ) : (
                    <HiOutlineMoon className="w-5 h-5 text-white" />
                  )}
                </motion.button>

                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-4 rounded-xl bg-primary text-black font-semibold text-lg hover:bg-primary/90 transition-all"
                >
                  Join Now
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
